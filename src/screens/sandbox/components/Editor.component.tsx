import styled from "styled-components";
import Navigation from "./Navigation.component";
import CodeEditor from "../views/CodeEditor.view";
import Visualisation from "../views/Visualisation.view";
import Spreadsheet from "../views/Spreadsheet.view";
import { Toolbar } from "./Toolbar.component";
import { useInterpreter, useView } from "../hooks";

export default function Editor() {

    const { view } = useView();

    const Router = ({ children }: { children: any }) => {
        return children[view];
    }

    return (
        <Container>
            <Toolbar />
            <Navigation />
            <Content>
                <Router>
                    <CodeEditor />
                    <Spreadsheet />
                    <Visualisation />
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