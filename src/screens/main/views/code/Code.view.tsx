import styled from "styled-components";
import CodeEditor from "./CodeEditor.component";
import { Button, ButtonOutline } from "@/src/components/Components.styles";
import { useEffect, useState } from "react";
import { Interpreter, InterpreterConfiguration } from "@/agent-lang-interpreter/src";
import { Subscription } from "rxjs";

export default function CodeView({ updateAgents }: { updateAgents: (agents: any[]) => void }) {

    const [code, setCode] = useState("agent person 10 {\n\tvariable x: random(0, 390) = (x + choice(-10, 10)) % 400;\n\tvariable y: random(0, 390) = (y + choice(-10, 10)) % 400;\n\n\tdynamic alive = x <= 200;\n}");
    const [subscription, setSubscription] = useState<Subscription | undefined>(undefined);
    const [running, setRunning] = useState(false);
    const [error, setError] = useState<string>("");

    function interpret(): void {
        subscription?.unsubscribe();
        updateAgents([]);
        setError("");

        const interpreter: Interpreter = new Interpreter();
        const config: InterpreterConfiguration = { steps: 1000, delay: 100 };

        setRunning(true);

        const interpreterSubscription = interpreter.interpret(code, config).subscribe(output => {
            console.log(output);

            if (output.status.code !== 0) {
                setError(output.status.message ?? "Unknown error");
                stopInterpreter();
            }

            updateAgents(output.output?.agents ?? []);
        });

        setSubscription(interpreterSubscription);
    }

    function stopInterpreter(): void {
        subscription?.unsubscribe();
        setRunning(false);
    }

    function toggleInterpreter(): void {
        if (running) {
            stopInterpreter();
        } else {
            interpret();
        }
    }

    return (
        <Container>
            <CodeEditor code={code} setCode={setCode} />
            <Error>{error}</Error>
            <Button href="" onClick={toggleInterpreter}>{running ? "Stop" : "Run"}</Button>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    padding: 50px 0px;
`;

const Error = styled.p`
    color: black;

    margin: 10px 0px;
`;