import { styled } from "styled-components";
import CodeView from "./views/code/Code.view";
import VisualisationView from "./views/visualisation/Visualisation.view";
import { useEffect, useState } from "react";
import {PageWrapper} from "@/src/components/Components.styles";

export default function SandboxScreen() {

    const [agents, setAgents] = useState<any[]>([]);

    function updateAgents(newAgents: any[]): void {
        setAgents(newAgents);
    }

    return (
        <Container>
            <PageWrapper>
                <Content>
                    <CodeView updateAgents={updateAgents} />
                    <VisualisationView agents={agents} />
                </Content>
            </PageWrapper>
        </Container>
    )
}

const Container = styled.div`
  width: 100%;
  
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
    width: 100%;

    display: grid;
    grid-template-columns: 1fr auto;
    gap: 50px;
  
    padding: 50px 100px;
`;