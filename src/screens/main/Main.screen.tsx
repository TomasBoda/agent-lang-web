import { styled } from "styled-components";
import CodeView from "./views/code/Code.view";
import VisualisationView from "./views/visualisation/Visualisation.view";
import { useEffect, useState } from "react";

export default function MainScreen() {

    const [agents, setAgents] = useState<any[]>([]);

    function updateAgents(newAgents: any[]): void {
        setAgents(newAgents);
    }

    return (
        <Container>
            <CodeView updateAgents={updateAgents} />
            <VisualisationView agents={agents} />
        </Container>
    )
}

const Container = styled.div`
    width: 100%;

    display: grid;
    grid-template-columns: 1fr auto;
    gap: 50px;
`;