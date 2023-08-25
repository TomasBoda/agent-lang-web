import styled from "styled-components";
import CodeEditor from "./CodeEditor.component";
import { Button, InputField } from "@/src/components/Components.styles";
import { useEffect, useState } from "react";
import { Interpreter, InterpreterConfiguration } from "@/agent-lang-interpreter/src";
import { Subscription } from "rxjs";

export default function CodeView({ updateAgents }: { updateAgents: (agents: any[]) => void }) {

    const [code, setCode] = useState(`agent person 30 {
        const speed = 3;
        variable angle: random(0, 2 * pi()) = angle + choice(-0.1, 0.1);

        dynamic shouldStay = prob(0.5);
    
        dynamic xNew = (x + speed * cos(angle)) % 400;
        dynamic yNew = (y + speed * sin(angle)) % 400;
    
        variable x: random(50, 350) = if shouldStay then x else xNew;
        variable y: random(50, 350) = if shouldStay then y else yNew;
    
        const distance = 20;
    
        dynamic people = agents(person);
        dynamic closePeople = filter(people => p => sqrt((p.x - x) * (p.x - x) + (p.y - y) * (p.y - y)) <= distance);
        dynamic closeInfected = filter(closePeople => c => c.infected == true);
    
        const timespan = 200;
        variable remaining: timespan = if infected then remaining - 1 else timespan;

        dynamic shouldInfect = prob(0.4);
    
        variable infected: prob(0.5) = (infected and remaining > 0) or (count(closeInfected) > 0 and shouldInfect);
    
        variable alive: false = infected;
}
    `);

    const [running, setRunning] = useState(false);
    const [error, setError] = useState("");

    const [step, setStep] = useState(0);
    const [steps, setSteps] = useState(10000);
    const [delay, setDelay] = useState(20);

    useEffect(() => {
        let subscription: Subscription;

        if (running) {
            updateAgents([]);
            setError("");

            const interpreter: Interpreter = new Interpreter();
            const config: InterpreterConfiguration = { steps, delay };

            subscription = interpreter.interpret(code, config).subscribe(output => {
                if (output.status.code !== 0) {
                    const errorMessage = output.status.message ?? "Unknown error";

                    setError(errorMessage);
                    setRunning(false);
                }

                const currentAgents = output.output?.agents ?? [];
                const currentStep = output.output?.step ?? 0;

                updateAgents(currentAgents);
                setStep(currentStep);

                if (currentStep === steps - 1) {
                    setRunning(false);
                }
            });
        }

        return () => {
            if (subscription) {
                subscription.unsubscribe();
            }
        }
    }, [running]);

    return (
        <Container>
            <CodeEditor code={code} setCode={setCode} />

            {error !== "" && <Error>{error}</Error>}
            <Status>
                <Label>Step</Label>
                <InputField type="text" disabled={running} value={running ? step + " / " + steps : steps} onChange={e => e.target.value.trim() === "" ? setSteps(0) : setSteps(parseInt(e.target.value))} pattern="[0-9]*" />
                <Label>Delay</Label>
                <InputField type="text" disabled={running} value={delay} onChange={e => e.target.value.trim() === "" ? setDelay(0) : setDelay(parseInt(e.target.value))} pattern="[0-9]*" />
            </Status>
            
            <Button href="" onClick={() => setRunning(previous => !previous)}>{running ? "Stop" : "Run"}</Button>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const Status = styled.div`
    display: grid;
    grid-template-columns: 60px auto;
    gap: 10px;

    align-items: center;

    margin: 20px 0;
`;

const Label = styled.p`
    color: black;
    font-size: 15px;
    line-height: 100%;

    margin: 0;
    padding: 0;
`;

const Error = styled.p`
    color: #d04141;
    font-size: 15px;
    line-height: 100%;

    margin-top: 20px;
`;