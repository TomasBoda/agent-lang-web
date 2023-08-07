import { styled } from "styled-components";

export default function DocumentationScreen({ markdown }: { markdown: string }) {

    return (
        <Container>
            <Content className="markdown" dangerouslySetInnerHTML={{ __html: markdown }} />
        </Container>
    )
}

const Container = styled.div`
    width: 100%;

    padding: 50px 0px;
`;

const Content = styled.div``;