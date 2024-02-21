import { Button } from "@/src/components/button";
import { InputField } from "@/src/components/Components.styles";
import styled from "styled-components";
import { InterpreterStatus } from "../services/interpreter.service";
import { MessageType } from "@/src/services/message.service";
import { ErrorModel, Formatter } from "@/agent-lang-interpreter/src";
import { useCode, useInterpreter, useServices, useStatus, useView } from "../hooks";

export function Toolbar() {

    const { storageService, codeService, viewService, interpreterService, messageService } = useServices();

    const { codeItem } = useCode();
    const { label, code, steps, delay } = codeItem;
    const { view } = useView();
    const { status } = useStatus();
    const { output } = useInterpreter();
    const step = output.output?.step ?? 0;

    function updateLabel(label: string): void {
        codeService.set({ label });
    }

    function updateSteps(steps: number): void {
        codeService.set({ steps });
        storageService.save(label, code, steps, delay);
    }

    function updateDelay(delay: number): void {
        codeService.set({ delay });
        storageService.save(label, code, steps, delay);
    }

    function start(): void {
        build(() => {
            interpreterService.initialize(code, steps, delay);
            interpreterService.start();

            if (view === 0) {
                viewService.set(2);
            }
        });
    }

    function reset(): void {
        interpreterService.reset();
    }

    function pause(): void {
        interpreterService.pause();
    }

    function resume(): void {
        interpreterService.resume();

        if (view === 0) {
            viewService.set(2);
        }
    }

    function next(): void {
        interpreterService.step();

        if (view === 0) {
            viewService.set(2);
        }
    }

    function save(): void {
        if (label.trim() === "") {
            messageService.showMessage(MessageType.Failure, "Label cannot be empty");
            return;
        }

        if (code.trim() === "") {
            messageService.showMessage(MessageType.Failure, "Source code cannot be empty");
            return;
        }

        storageService.save(label, code, steps, delay);
        messageService.showMessage(MessageType.Success, `Simulation ${label} saved successfully`);
    }

    function remove(): void {
        storageService.remove(label);
        codeService.reset();
        viewService.set(0);

        messageService.showMessage(MessageType.Success, "Item was successfully deleted");
    }

    function build(callback?: () => void): void {
        if (code.trim() === "") {
            messageService.showMessage(MessageType.Failure, "Source code cannot be empty");
            return;
        }

        try {
            const formattedCode = Formatter.getFormatted(code);
            codeService.set({ code: formattedCode });
            messageService.showMessage(MessageType.Success, "Build succeeded");
            callback?.();
        } catch (error) {
            messageService.showMessage(MessageType.Failure, (error as ErrorModel).toString());
        }
    }

    const showStartButton = status === InterpreterStatus.STOPPED;
    const showResetButton = status === InterpreterStatus.RUNNING || status === InterpreterStatus.PAUSED;
    const showPauseButton = status === InterpreterStatus.RUNNING;
    const showResumeButton = status === InterpreterStatus.PAUSED;
    const showNextButton = status === InterpreterStatus.STOPPED || status === InterpreterStatus.PAUSED;
    const showBuildButton = status === InterpreterStatus.STOPPED;

    return (
        <Edit>
            <LabelField
                type="text"
                value={label}
                onChange={(e) => updateLabel(e.target.value)}
                placeholder="Enter project label..."
            />

            <Controls>
                <InputField
                    type="text"
                    disabled={status === InterpreterStatus.RUNNING}
                    value={status !== InterpreterStatus.STOPPED ? step + " / " + steps : steps}
                    onChange={e => e.target.value.trim() === "" ? updateSteps(0) : updateSteps(parseInt(e.target.value))}
                    pattern="[0-9]*"
                />
                <InputField
                    type="text"
                    disabled={status === InterpreterStatus.RUNNING}
                    value={delay}
                    onChange={e => e.target.value.trim() === "" ? updateDelay(0) : updateDelay(parseInt(e.target.value))}
                    pattern="[0-9]*"
                />

                <Buttons>
                    <Icon onClick={() => showResumeButton ? resume() : start()} src="/assets/icon-start-green.svg" $disabled={!showStartButton && !showResumeButton} />
                    <Icon onClick={() => pause()} src="/assets/icon-pause.svg" $disabled={!showPauseButton} />
                    <Icon onClick={() => reset()} src="/assets/icon-stop-red.svg" $disabled={!showResetButton} />
                    <Icon onClick={() => next()} src="/assets/icon-step.svg" $disabled={!showNextButton} />
                    <Icon onClick={() => build()} src="/assets/icon-build.svg" $disabled={!showBuildButton} />
                </Buttons>
            </Controls>

            <Button size="small" onClick={() => save()}>Save</Button>
            <Button size="small" onClick={() => remove()}>Remove</Button>
        </Edit>
    )
}

const Edit = styled.div`
    display: grid;
    grid-template-columns: 1fr auto auto auto;
    gap: 10px;
    align-items: center;

    padding: 15px 20px;
`;

const LabelField = styled.input`
    color: white;
    font-size: 16px;
    font-weight: 500;

    border: none;
    outline: none;

    background-color: transparent;
`;

const Controls = styled.div`
    display: grid;
    grid-template-columns: auto auto auto;
    gap: 10px;
    align-items: center;
`;

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`;

const Icon = styled.img<{ $disabled: boolean }>`
    width: 20px;
    height: 18px;

    margin: 0px 5px;

    cursor: ${props => props.$disabled ? "not-allowed" : "pointer"};
    filter: ${props => props.$disabled && "grayscale(100%)"};
`;