import { styled } from "styled-components";
import VisualisationView from "./Visualisation.view";
import { useEffect, useState } from "react";
import {Button, InputField} from "@/src/components/Components.styles";
import CodeEditor from "@/src/screens/sandbox/CodeEditor.component";
import {Subscription} from "rxjs";
import {Interpreter, InterpreterConfiguration} from "@/agent-lang-interpreter";
import {Examples} from "@/src/lib/examples";

export default function SandboxScreen() {

    const [agents, setAgents] = useState<any[]>([]);
    const [code, setCode] = useState("");

    const [running, setRunning] = useState(false);
    const [error, setError] = useState("");

    const [step, setStep] = useState(0);
    const [steps, setSteps] = useState(10000);
    const [delay, setDelay] = useState(20);

    function updateAgents(newAgents: any[]): void {
        setAgents(newAgents);
    }

    useEffect(() => {
        let subscription: Subscription;

        if (running) {
            updateAgents([]);
            setError("");

            const interpreter: Interpreter = new Interpreter();
            const config: InterpreterConfiguration = { steps, delay, width: 550, height: 550 };

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
            <Panel style={{ padding: 30, backgroundColor: "black" }}>
                <VisualisationView agents={agents} />

                {!running && error !== "" && <Error>{error}</Error>}

                <Status>
                    <Label>Step</Label>
                    <InputField type="text" disabled={running} value={running ? step + " / " + steps : steps} onChange={e => e.target.value.trim() === "" ? setSteps(0) : setSteps(parseInt(e.target.value))} pattern="[0-9]*" />
                    <Label>Delay</Label>
                    <InputField type="text" disabled={running} value={delay} onChange={e => e.target.value.trim() === "" ? setDelay(0) : setDelay(parseInt(e.target.value))} pattern="[0-9]*" />
                </Status>

                <Button href="" onClick={() => setRunning(previous => !previous)}>{running ? "Stop" : "Run"}</Button>
            </Panel>

            <Panel>
                <Toolbar>
                    <ToolbarHeading>Example programs:</ToolbarHeading>

                    {Examples.ALL.map(example => <ToolbarItem onClick={() => setCode(example.code)}>{example.label}</ToolbarItem>)}
                </Toolbar>

                <CodeEditor code={code} setCode={setCode} />
            </Panel>
        </Container>
    )
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: grid;
  grid-template-columns: 610px 1fr;
`;

const Panel = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  background-color: #0A1128;
`;

const Toolbar = styled.div`
  width: 100%;
  
  display: flex;
  flex-direction: row;
  align-items: center;
  
  padding: 15px;
  
  background-color: rgba(255, 255, 255, 0.05);
`;

const ToolbarHeading = styled.h3`
  color: white;
  font-size: 14px;
  font-weight: 600;
  
  margin-right: 20px;
`;

const ToolbarItem = styled.div`
  color: white;
  font-size: 13px;
  
  padding: 10px 15px;
  margin-right: 15px;
  
  background-color: rgba(255, 255, 255, 0.1);
  
  transition: all 100ms;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
`;

const Error = styled.span`
  color: #DE3C4B;
  font-size: 16px;
  font-weight: 400;
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