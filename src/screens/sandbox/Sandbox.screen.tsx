import { styled } from "styled-components";
import Sidebar from "./components/sidebar/Sidebar.component";
import Editor from "./components/Editor.component";
import { Message } from "@/src/components/message";
import { ServiceProvider } from "./ServiceProvider";

export default function SandboxScreen() {
    
    return (
        <ServiceProvider>
            <Container>
                <Sidebar />
                <Editor />
            </Container>
            <Message />
        </ServiceProvider>
    )
}

const Container = styled.div`
    width: 100vw;
    min-width: 100vw;
    max-width: 100vw;
    height: 100vh;
    min-height: 100vh;
    max-height: 100vh;

    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 15px;

    padding: 15px;

    background-color: black;
`;