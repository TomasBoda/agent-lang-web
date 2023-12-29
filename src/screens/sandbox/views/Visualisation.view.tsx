import { useEffect } from "react";
import styled from "styled-components";
import { InterpreterStatus } from "../services/interpreter.service";
import { useCode, useInterpreter, useServices, useStatus } from "../hooks";
import { MessageType } from "@/src/services/message.service";
import { InterpreterOutput } from "@/agent-lang-interpreter/src/interpreter/interpreter.types";

export default function Visualisation({ output }: { output: InterpreterOutput }) {

    const { interpreterService, messageService } = useServices();

    const { status } = useStatus();

    let agents = output.output?.agents ?? [];

    const { codeItem } = useCode();

    useEffect(() => {
        const { status } = output;

        if (status.code !== 0) {
            interpreterService.reset();
            messageService.showMessage(MessageType.Failure, status.message ?? "Unknown error");
            return;
        }

        agents = output.output?.agents ?? [];
        render();
    }, [output]);

    useEffect(() => {
        if (status !== InterpreterStatus.PAUSED) {
            agents = [];
        }
    }, [status]);

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