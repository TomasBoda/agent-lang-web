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

            if (variables["x"] && variables["y"] && typeof variables["x"] === "number" && typeof variables["y"] === "number") {
                const x = variables["x"];
                const y = variables["y"];

                const alive = variables["alive"];

                if (alive) {
                    context.fillStyle = "#FF0000"
                } else {
                    context.fillStyle = "#000000"
                }
                
                context.fillRect(x, y, 10, 10);
            }
        }
    }

    return (
        <Container>
            <Canvas id="canvas" width="400" height="400"></Canvas>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100%;

    padding: 50px 0px;
`;

const Canvas = styled.canvas`
    border: 1px solid lightgray;
    border-radius: 5px;

    background-color: white;
`;