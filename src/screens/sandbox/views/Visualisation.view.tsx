import { useEffect, useState } from "react";
import styled from "styled-components";
import { useCodeService } from "../services";
import { InterpreterStatus, useInterpreterService } from "../services/interpreter.service";

export default function Visualisation() {

    const codeService = useCodeService();
    const interpreterService = useInterpreterService();

    const [code, setCode] = useState("");
    const [agents, setAgents] = useState<any[]>([]);
    const [status, setStatus] = useState(InterpreterStatus.STOPPED);
    const [error, setError] = useState("");

    useEffect(() => {
        subscribeToCodeService();
        subscribeToInterpreterService();
    }, [codeService, interpreterService]);

    useEffect(() => {
        render();
    }, [agents]);

    useEffect(() => {
        if (status === InterpreterStatus.STOPPED || status === InterpreterStatus.RUNNING) {
            setAgents([]);
        }
    }, [status]);

    function subscribeToCodeService(): void {
        codeService?.getCode().subscribe(data => {
            setCode(data.code);
            setAgents([]);
        });
    }

    function subscribeToInterpreterService(): void {
        interpreterService?.getStatus().subscribe(status => setStatus(status));

        interpreterService?.get().subscribe(output => {
            if (output.status.code !== 0) {
                setError(output.status.message ?? "Unknown error");
                interpreterService?.reset();
            } else {
                setError("");
            }

            setAgents(output.output?.agents ?? []);
        });
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

            {status !== InterpreterStatus.RUNNING && error !== "" && <Error>{error}</Error>}
        </Container>
    );
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 500px 1fr;
    gap: 30px;
    align-items: flex-start;
`;

const CanvasContainer = styled.div`
    
`;

const Canvas = styled.canvas`
    background-color: rgba(255, 255, 255, 0.05);

    border-radius: 3px;
`;

const Error = styled.span`
  color: #DE3C4B;
  font-size: 14px;
  font-weight: 400;
`;