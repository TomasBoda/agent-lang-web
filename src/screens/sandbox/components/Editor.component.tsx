import { useEffect, useState } from "react";
import styled from "styled-components";
import Navigation from "./Navigation.component";
import CodeEditor from "../views/CodeEditor.view";
import Visualisation from "../views/Visualisation.view";
import { useViewService } from "../services";
import Spreadsheet from "../views/Spreadsheet.view";
import { Toolbar } from "./Toolbar.component";
import { InterpreterStatus, useInterpreterService } from "../services/interpreter.service";
import { Agent, InterpreterOutput } from "@/agent-lang-interpreter/src/interpreter/interpreter.types";

export default function Editor() {

    const viewService = useViewService();
    const interpreterService = useInterpreterService();

    const [view, setView] = useState(0);

    const views: JSX.Element[] = [
        <CodeEditor />,
        <Spreadsheet />,
        <Visualisation />
    ];

    useEffect(() => {
        const viewSubscription = viewService?.getView().subscribe(data => setView(data));

        return () => {
            viewSubscription?.unsubscribe();
        }
    }, []);

    function CurrentView() {
        return views[view];
    }

    return (
        <Container>
            <Toolbar />
            <Navigation />
            <Content>
                <CurrentView />
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