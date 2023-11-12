import { useStorageService } from "@/src/screens/sandbox/services/storage.service";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Toolbar from "./Toolbar.component";
import CodeEditor from "../views/CodeEditor.view";
import { useCodeService } from "../services/code.service";
import Button from "@/src/components/Button.component";
import VisualisationView from "../views/Visualisation.view";
import { Subscription } from "rxjs";
import { Interpreter, InterpreterConfiguration } from "@/agent-lang-interpreter/src";
import { InputField } from "@/src/components/Components.styles";

export default function Editor() {

    const storageService = useStorageService();
    const codeService = useCodeService();

    const [agents, setAgents] = useState<any[]>([]);
    const [running, setRunning] = useState(false);
    const [error, setError] = useState("");
    const [step, setStep] = useState(0);
    const [steps, setSteps] = useState(10000);
    const [delay, setDelay] = useState(20);

    const [label, setLabel] = useState("");
    const [code, setCode] = useState("");

    const [view, setView] = useState(0);

    useEffect(() => {
        subscribe();
    }, [codeService]);

    function subscribe(): void {
        codeService?.getCode().subscribe(data => {
            setLabel(data.label);
            setCode(data.code);
            setView(0);
        });
    }

    function save(): void {
        if (label.trim() === "" || code.trim() === "") {
            return;
        }

        storageService?.save(label, code);
    }

    function remove(): void {
        storageService?.remove(label);
        codeService?.setEmpty();
    }

    function updateAgents(newAgents: any[]): void {
        setAgents(newAgents);
    }

    useEffect(() => {
        let subscription: Subscription;

        if (running) {
            updateAgents([]);
            setError("");

            const interpreter: Interpreter = new Interpreter();
            const config: InterpreterConfiguration = { steps, delay, width: 500, height: 500 };

            subscription = interpreter.interpret(code, config).subscribe(output => {
                if (output.status.code !== 0) {
                    const errorMessage = output.status.message ?? "Unknown error";

                    setError(errorMessage);
                    setRunning(false);
                }

                const currentAgents = output.output?.agents ?? [];
                const currentStep = output.output?.step ?? 0;

                updateAgents(currentAgents);
                setStep(currentStep);

                if (currentStep === steps - 1) {
                    setRunning(false);
                }
            });
        }

        return () => {
            if (subscription) {
                subscription.unsubscribe();
            }
        }
    }, [running]);

    return (
        <Container>
            <Edit>
                <LabelField type="text" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Enter project label..." />
                <Button size="small" onClick={() => save()}>Save</Button>
                <Button size="small" onClick={() => remove()}>Remove</Button>
            </Edit>

            <Toolbar view={view} setView={setView} />
            
            {view === 0 && <CodeEditor code={code} setCode={setCode} />}
            {view === 2 &&
                <Visualisation>
                    <VisualisationView agents={agents} />

                    {!running && error !== "" && <Error>{error}</Error>}

                    <Status>
                        <Label>Step</Label>
                        <InputField type="text" disabled={running} value={running ? step + " / " + steps : steps} onChange={e => e.target.value.trim() === "" ? setSteps(0) : setSteps(parseInt(e.target.value))} pattern="[0-9]*" />
                        <Label>Delay</Label>
                        <InputField type="text" disabled={running} value={delay} onChange={e => e.target.value.trim() === "" ? setDelay(0) : setDelay(parseInt(e.target.value))} pattern="[0-9]*" />
                    </Status>

                    <Button size="small" onClick={() => setRunning(previous => !previous)}>{running ? "Stop" : "Run"}</Button>
                </Visualisation>
            }
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
    grid-template-columns: 1fr auto auto;
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

const Visualisation = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    padding: 20px;
`;

const Error = styled.span`
  color: #DE3C4B;
  font-size: 14px;
  font-weight: 400;

  margin-top: 10px;
`;

const Status = styled.div`
    display: grid;
    grid-template-columns: 60px auto;
    gap: 10px;

    align-items: center;
  
    margin: 20px 0px;
`;

const Label = styled.p`
    color: white;
    font-size: 13px;
    font-weight: 400;
    line-height: 100%;

    margin: 0;
    padding: 0;
`;