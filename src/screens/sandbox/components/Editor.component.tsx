import { useStorageService } from "@/src/screens/sandbox/services/storage.service";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Toolbar from "./Toolbar.component";
import CodeEditor from "../views/CodeEditor.view";
import { useCodeService } from "../services/code.service";
import Button from "@/src/components/Button.component";
import Visualisation from "../views/Visualisation.view";
import { useViewService } from "../services";
import { useInterpreterService } from "../services/interpreter.service";
import { InputField } from "@/src/components/Components.styles";
import Spreadsheet from "../views/Spreadsheet.view";

export default function Editor() {

    const storageService = useStorageService();
    const codeService = useCodeService();
    const viewService = useViewService();
    const interpreterService = useInterpreterService();

    const [label, setLabel] = useState("");
    const [code, setCode] = useState("");
    const [steps, setSteps] = useState(0);
    const [delay, setDelay] = useState(0);

    const [view, setView] = useState(0);

    const [step, setStep] = useState(0);
    const [running, setRunning] = useState(false);

    useEffect(() => {
        subscribeToCodeService();
    }, [codeService]);

    useEffect(() => {
        subscribeToViewService();
    }, [viewService]);

    useEffect(() => {
        subscribeToInterpreterService();
    }, [interpreterService]);

    function subscribeToCodeService(): void {
        codeService?.getCode().subscribe(data => {
            setLabel(data.label);
            setCode(data.code);
            setSteps(data.steps);
            setDelay(data.delay);
        });
    }

    function subscribeToViewService(): void {
        viewService?.getView().subscribe(data => setView(data));
    }

    function subscribeToInterpreterService(): void {
        interpreterService?.getRunning().subscribe(running => setRunning(running));
        
        interpreterService?.getOutput().subscribe(output => {
            setStep(output.output?.step ?? 0);
        });
    }

    function start(): void {
        interpreterService?.start(code);
        viewService?.setView(2);
    }

    function stop(): void {
        interpreterService?.stop();
    }

    function save(): void {
        if (label.trim() === "" || code.trim() === "") {
            return;
        }

        storageService?.save(label, code, steps, delay);
    }

    function remove(): void {
        storageService?.remove(label);
        codeService?.setEmpty();
    }

    return (
        <Container>
            <Edit>
                <LabelField className="step-3" type="text" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Enter project label..." />

                <Controls>
                    <InputField type="text" disabled={true || running} value={running ? step + " / " + steps : steps} onChange={e => e.target.value.trim() === "" ? setSteps(0) : setSteps(parseInt(e.target.value))} pattern="[0-9]*" />
                    <InputField type="text" disabled={true || running} value={delay} onChange={e => e.target.value.trim() === "" ? setDelay(0) : setDelay(parseInt(e.target.value))} pattern="[0-9]*" />
                    <Icon onClick={() => running ? stop() : start()} src={running ? "/assets/icon-stop-red.svg" : "/assets/icon-start-green.svg"} />
                </Controls>

                <Button className="step-5" size="small" onClick={() => save()}>Save</Button>
                <Button className="step-6" size="small" onClick={() => remove()}>Remove</Button>
            </Edit>

            <Toolbar />
            
            <Content>
                {view === 0 && <CodeEditor code={code} setCode={setCode} />}
                {view === 1 && <Spreadsheet />}
                {view === 2 && <Visualisation code={code} />}
            </Content>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100%;

    max-height: calc(100vh - 30px) !important;
    min-height: calc(100vh - 30px) !important;

    display: flex;
    flex-direction: column;

    border-radius: 5px;

    background-color: rgb(10, 10, 10);
`;

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

const Icon = styled.img`
    width: 20px;
    height: 18px;

    margin: 0px 10px;

    cursor: pointer;
`;

const Content = styled.div`
    width: 100%;
    max-width: calc(100vw - 350px - 45px);
    height: 100%;

    padding: 20px;

    overflow: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`;