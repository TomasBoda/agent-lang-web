import styled from "styled-components";
import CodeEditor from "./CodeEditor.component";
import { Button, ButtonOutline } from "@/src/components/Components.styles";
import { useEffect, useState } from "react";
import { Interpreter, InterpreterConfiguration } from "@/agent-lang-interpreter/src";
import { Subscription } from "rxjs";

export default function CodeView({ updateAgents }: { updateAgents: (agents: any[]) => void }) {

    const [code, setCode] = useState(`agent person 10 {
        const speed = 5;
        variable angle: random(0, 2 * pi()) = angle + choice(-0.1, 0.1);
    
        variable x: random(50, 350) = (x + speed * cos(angle)) % 400;
        variable y: random(50, 350) = (y + speed * sin(angle)) % 400;
    
        const distance = 30;
    
        variable people: empty() = agents(person);
        dynamic closePeople = filter(people => p => sqrt((p.x - x) * (p.x - x) + (p.y - y) * (p.y - y)) <= distance);
        dynamic closeInfected = filter(closePeople => c => c.infected == true);
    
        const timespan = 50;
        variable remaining: timespan = if infected then remaining - 1 else timespan;
        const probability = 0.5;
    
        variable infected: choice(true, false) = (infected and remaining > 0) or (count(closeInfected) > 0 and random(0, 1) <= probability);
    
        dynamic alive = infected;
}
    `);
    const [subscription, setSubscription] = useState<Subscription | undefined>(undefined);
    const [running, setRunning] = useState(false);
    const [error, setError] = useState<string>("");
    const [step, setStep] = useState(0);

    const steps = 1000;
    const delay = 100;

    function interpret(): void {
        subscription?.unsubscribe();
        updateAgents([]);
        setError("");

        const interpreter: Interpreter = new Interpreter();
        const config: InterpreterConfiguration = { steps, delay };

        setRunning(true);

        const interpreterSubscription = interpreter.interpret(code, config).subscribe(output => {
            console.log(output);

            if (output.status.code !== 0) {
                setError(output.status.message ?? "Unknown error");
                stopInterpreter();
                return;
            }

            updateAgents(output.output?.agents ?? []);
            setStep(output.output?.step ?? 0);
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
            <Label>Step {step}/{steps}</Label>
            <Label>Delay is {delay} milliseconds</Label>
            <Label>{error}</Label>
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

const Label = styled.p`
    color: black;

    margin: 10px 0px;
`;