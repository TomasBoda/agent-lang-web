import { useEffect } from "react";
import styled from "styled-components";

export default function VisualisationView({ agents }: { agents: any[] }) {

    useEffect(() => {
        drawAgents();
    }, [agents]);

    function drawAgents(): void {
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

                const xValue = x.value;
                const yValue = y.value;
                const colouredValue = coloured?.value ?? false;

                if (colouredValue === true) {
                    context.fillStyle = "#DE3C4B"
                } else {
                    context.fillStyle = "#FFFFFF"
                }
                
                context.fillRect(xValue, yValue, 10, 10);
            }
        }
    }

    return <Canvas id="canvas" width="550" height="550"></Canvas>;
}


const Canvas = styled.canvas`
    background-color: rgba(255, 255, 255, 0.05);

    border-radius: 3px;
`;