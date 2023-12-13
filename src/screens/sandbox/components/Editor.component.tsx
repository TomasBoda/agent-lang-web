import { useEffect, useState } from "react";
import styled from "styled-components";
import Navigation from "./Navigation.component";
import CodeEditor from "../views/CodeEditor.view";
import Visualisation from "../views/Visualisation.view";
import { useCodeService, useViewService } from "../services";
import Spreadsheet from "../views/Spreadsheet.view";
import { Toolbar } from "./Toolbar.component";
import { InterpreterStatus, useInterpreterService } from "../services/interpreter.service";
import { InterpreterOutput } from "@/agent-lang-interpreter/src/interpreter/interpreter.types";
import { Subscription } from "rxjs/internal/Subscription";
import { MessageType, useMessageService } from "@/src/services/message.service";

export default function Editor() {

    const codeService = useCodeService();
    const viewService = useViewService();
    const interpreterService = useInterpreterService();
    const messageService = useMessageService();

    let interpreterSubscription: Subscription | undefined;

    const [output, setOutput] = useState<InterpreterOutput>({ status: { code: 0 } });
    const [status, setStatus] = useState<InterpreterStatus>(InterpreterStatus.STOPPED);

    const [view, setView] = useState(0);

    useEffect(() => {
        if (output.status.code !== 0) {
            if (status === InterpreterStatus.RUNNING) {
                messageService?.showMessage(MessageType.Failure, output.status.message ?? "Unkown error");
            }

            interpreterService?.reset();
        }
    }, [output]);

    useEffect(() => {
        const viewSubscription = viewService?.getView().subscribe(data => setView(data));
        const statusSubscription = interpreterService?.getStatus().subscribe(data => setStatus(data));
        const codeSubscription = codeService?.getCode().subscribe(() => initInterpreterSubscription());

        return () => {
            viewSubscription?.unsubscribe();
            statusSubscription?.unsubscribe();
            codeSubscription?.unsubscribe();
            interpreterSubscription?.unsubscribe();
        }
    }, []);

    function initInterpreterSubscription(): void {
        interpreterSubscription = interpreterService?.get().subscribe(data => setOutput(data));
    }

    return (
        <Container>
            <Toolbar />
            <Navigation />
            <Content>
                {view === 0 && <CodeEditor />}
                {view === 1 && <Spreadsheet status={status} output={output} />}
                {view === 2 && <Visualisation status={status} output={output} />}
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