import styled from "styled-components";
import Navigation from "./Navigation.component";
import CodeEditor from "../views/CodeEditor.view";
import Visualisation from "../views/Visualisation.view";
import Spreadsheet from "../views/Spreadsheet.view";
import { Toolbar } from "./Toolbar.component";
import { useInterpreter, useServices, useView } from "../hooks";
import { useEffect } from "react";

export default function Editor() {

    const { interpreterService } = useServices();

    const { view } = useView();
    const { output } = useInterpreter();

    const Router = ({ children }: { children: any }) => {
        return children[view];
    }

    useEffect(() => {
        setVisualisationDimensions();
        window.addEventListener("resize", onWindowResize);

        return () => {
            window.removeEventListener("resize", onWindowResize);
        }
    }, []);

    function onWindowResize(event: any): void {
        interpreterService.reset();
    }

    function setVisualisationDimensions(): void {
        const content = document.getElementById("content");

        if (!content) {
            return;
        }

        const width = content.clientWidth - 40;
        const height = content.clientHeight - 40;

        interpreterService.setDimensions(width, height);
    }

    return (
        <Container>
            <Toolbar />
            <Navigation />
            <Content id="content">
                <Router>
                    <CodeEditor />
                    <Spreadsheet output={output} />
                    <Visualisation output={output} />
                </Router>
            </Content>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100%;

    max-height: calc(100vh - 30px) !important;
    min-height: calc(100vh - 30px) !important;

    display: flex;
    flex-direction: column;

    border-radius: 5px;

    background-color: rgb(10, 10, 10);
`;

const Content = styled.div`
    width: 100%;
    max-width: calc(100vw - 350px - 45px);
    height: 100%;

    padding: 20px;

    overflow: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`;