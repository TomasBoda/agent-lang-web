import Button from "@/src/components/Button.component";
import { InputField } from "@/src/components/Components.styles";
import styled from "styled-components";
import { useCodeService, useStorageService, useViewService } from "../services";
import { InterpreterStatus, useInterpreterService } from "../services/interpreter.service";
import { useEffect, useState } from "react";
import { CodeItem } from "../model";

export function Toolbar() {

    // services
    const storageService = useStorageService();
    const codeService = useCodeService();
    const viewService = useViewService();
    const interpreterService = useInterpreterService();

    // general code data
    const [label, setLabel] = useState("");
    const [code, setCode] = useState("");
    const [steps, setSteps] = useState(0);
    const [delay, setDelay] = useState(0);

    // current interpreter data
    const [step, setStep] = useState(0);
    const [status, setStatus] = useState(InterpreterStatus.STOPPED);

    // current view
    const [view, setView] = useState(0);

    useEffect(() => {
        const codeSubscription = codeService?.getCode().subscribe(data => { setCodeData(data); setInterpreterData(data); });
        const statusSubscription = interpreterService?.getStatus().subscribe(status => setStatus(status));
        const interpreterSubscription = interpreterService?.get().subscribe(output => setStep(output.output?.step ?? 0));
        const viewSubscription = viewService?.getView().subscribe(view => setView(view));

        return () => {
            codeSubscription?.unsubscribe();
            statusSubscription?.unsubscribe();
            interpreterSubscription?.unsubscribe();
            viewSubscription?.unsubscribe();
        }
    }, []);

    function setCodeData(item: CodeItem): void {
        setLabel(item.label);
        setCode(item.code);
        setSteps(item.steps);
        setDelay(item.delay);
    }

    function setInterpreterData(item: CodeItem): void {
        interpreterService?.initialize(item.code, item.steps, item.delay);
    }

    function updateLabel(label: string): void {
        codeService?.setCode(label, code, steps, delay);
    }

    function updateSteps(steps: number): void {
        codeService?.setCode(label, code, steps, delay);
    }

    function updateDelay(delay: number): void {
        codeService?.setCode(label, code, steps, delay);
    }

    function start(): void {
        interpreterService?.start();
        viewService?.setView(2);
    }

    function reset(): void {
        interpreterService?.reset();
    }

    function pause(): void {
        interpreterService?.pause();
    }

    function resume(): void {
        interpreterService?.resume();

        if (view === 0) {
            viewService?.setView(2);
        }
    }

    function next(): void {
        interpreterService?.step();

        if (view === 0) {
            viewService?.setView(2);
        }
    }

    function save(): void {
        if (label.trim() === "") {
            // TODO: custom dialog
            alert("Label cannot be empty");
            return;
        }

        if (code.trim() === "") {
            // TODO: custom dialog
            alert("Code cannot be empty");
            return;
        }

        storageService?.save(label, code, steps, delay);
    }

    function remove(): void {
        storageService?.remove(label);
        codeService?.setEmpty();
    }

    const showStartButton = () => status === InterpreterStatus.STOPPED;
    const showResetButton = () => status === InterpreterStatus.RUNNING || status === InterpreterStatus.PAUSED;
    const showPauseButton = () => status === InterpreterStatus.RUNNING;
    const showResumeButton = () => status === InterpreterStatus.PAUSED;
    const showNextButton = () => status === InterpreterStatus.STOPPED || status === InterpreterStatus.PAUSED;

    return (
        <Edit>
            <LabelField
                type="text"
                value={label}
                onChange={(e) => updateLabel(e.target.value)}
                placeholder="Enter project label..."
                className="step-3"
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
                    {showStartButton() && <Icon onClick={() => start()} src="/assets/icon-start-green.svg" />}
                    {showPauseButton() && <Icon onClick={() => pause()} src="/assets/icon-pause.svg" />}
                    {showResetButton() && <Icon onClick={() => reset()} src="/assets/icon-stop-red.svg" />}
                    {showResumeButton() && <Icon onClick={() => resume()} src="/assets/icon-start-green.svg" />}
                    {showNextButton() && <Icon onClick={() => next()} src="/assets/icon-step.svg" />}
                </Buttons>
            </Controls>

            <Button className="step-5" size="small" onClick={() => save()}>Save</Button>
            <Button className="step-6" size="small" onClick={() => remove()}>Remove</Button>
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

const Icon = styled.img`
    width: 20px;
    height: 18px;

    margin: 0px 5px;

    cursor: pointer;
`;