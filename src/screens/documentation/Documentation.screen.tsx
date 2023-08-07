import { styled } from "styled-components";
import SidePanel from "./Sidepanel.component";

export default function DocumentationScreen({ markdown }: { markdown: string }) {

    return (
        <Container>
            <SidePanel />
            <Content className="markdown" dangerouslySetInnerHTML={{ __html: markdown }} />
        </Container>
    )
}

const Container = styled.div`
    width: 100%;

    display: grid;
    grid-template-columns: 250px auto;
    gap: 50px;

    align-items: start;

    padding: 50px 0px;
`;

const Content = styled.div``;