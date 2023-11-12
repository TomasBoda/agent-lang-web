import { Interpreter, InterpreterConfiguration } from "@/agent-lang-interpreter/src";
import Button from "@/src/components/Button.component";
import { InputField } from "@/src/components/Components.styles";
import { useEffect, useState } from "react";
import { Subscription } from "rxjs";
import styled from "styled-components";

export default function Visualisation({ code }: { code: string }) {

    let subscription: Subscription;

    const [agents, setAgents] = useState<any[]>([]);
    const [running, setRunning] = useState(false);
    const [error, setError] = useState("");
    const [step, setStep] = useState(0);
    const [steps, setSteps] = useState(10000);
    const [delay, setDelay] = useState(20);

    useEffect(() => {
        interpret();
        return () => subscription?.unsubscribe();
    }, [running]);

    useEffect(() => {
        render();
    }, [agents]);

    function interpret(): void {
        if (running) {
            setAgents([]);
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

                setAgents(currentAgents);
                setStep(currentStep);

                if (currentStep === steps - 1) {
                    setRunning(false);
                }
            });
        }
    }

    function render(): void {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        if (!canvas) return;
        const context = canvas.getContext("2d");
        if (!context) return;

        context.clearRect(0, 0, canvas.width, canvas.height);

        for (const agent of agents) {
            const variables = agent.variables;

            if (variables["x"] && variables["y"]) {
                interface RuntimeValue {
                    type: any;
                    value: any;
                }
                
                const x: RuntimeValue = variables["x"] as unknown as RuntimeValue;
                const y: RuntimeValue = variables["y"] as unknown as RuntimeValue;
                const coloured: RuntimeValue = variables["coloured"] as unknown as RuntimeValue;

                const xValue = x?.value;
                const yValue = y?.value;
                const colouredValue = coloured?.value ?? false;

                if (!xValue || !yValue) {
                    continue;
                }

                context.fillStyle = colouredValue ? "#DE3C4B" : "#FFFFFF";
                context.fillRect(xValue, yValue, 10, 10);
            }
        }
    }

    return (
        <Container>
            <CanvasContainer>
                <Canvas id="canvas" width="500" height="500"></Canvas>;
            </CanvasContainer>

            {!running && error !== "" && <Error>{error}</Error>}

            <Status>
                <Label>Step</Label>
                <InputField type="text" disabled={running} value={running ? step + " / " + steps : steps} onChange={e => e.target.value.trim() === "" ? setSteps(0) : setSteps(parseInt(e.target.value))} pattern="[0-9]*" />
                <Label>Delay</Label>
                <InputField type="text" disabled={running} value={delay} onChange={e => e.target.value.trim() === "" ? setDelay(0) : setDelay(parseInt(e.target.value))} pattern="[0-9]*" />
            </Status>

            <Button size="small" onClick={() => setRunning(previous => !previous)}>{running ? "Stop" : "Run"}</Button>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    padding: 20px;
`;

const CanvasContainer = styled.div``;

const Canvas = styled.canvas`
    background-color: rgba(255, 255, 255, 0.05);

    border-radius: 3px;
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