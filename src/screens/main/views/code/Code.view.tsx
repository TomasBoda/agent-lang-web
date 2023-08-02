import styled from "styled-components";
import CodeEditor from "./CodeEditor.component";

export default function CodeView() {
    return (
        <Container>
            <CodeEditor />
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100%;

    padding: 50px 0px;
`;