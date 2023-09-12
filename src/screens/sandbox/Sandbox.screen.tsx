import { styled } from "styled-components";
import VisualisationView from "./Visualisation.view";
import { useEffect, useState } from "react";
import {ButtonContrast, InputField, PageWrapper} from "@/src/components/Components.styles";
import CodeEditor from "@/src/screens/sandbox/CodeEditor.component";
import {Subscription} from "rxjs";
import {Interpreter, InterpreterConfiguration} from "@/agent-lang-interpreter";

export default function SandboxScreen() {

    const [agents, setAgents] = useState<any[]>([]);
    const [code, setCode] = useState(`agent person 30 {
        const speed = 3;
        variable angle: random(0, 2 * pi()) = angle + choice(-0.1, 0.1);

        dynamic shouldStay = prob(0.5);
    
        dynamic xNew = (x + speed * cos(angle)) % 600;
        dynamic yNew = (y + speed * sin(angle)) % 600;
    
        variable x: random(50, 550) = if shouldStay then x else xNew;
        variable y: random(50, 550) = if shouldStay then y else yNew;
    
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

    function updateAgents(newAgents: any[]): void {
        setAgents(newAgents);
    }

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
            <Left>
                <CodeEditor code={code} setCode={setCode} />
            </Left>

            <Right>
                <VisualisationView agents={agents} />

                <Status>
                    <Label>Step</Label>
                    <InputField type="text" disabled={running} value={running ? step + " / " + steps : steps} onChange={e => e.target.value.trim() === "" ? setSteps(0) : setSteps(parseInt(e.target.value))} pattern="[0-9]*" />
                    <Label>Delay</Label>
                    <InputField type="text" disabled={running} value={delay} onChange={e => e.target.value.trim() === "" ? setDelay(0) : setDelay(parseInt(e.target.value))} pattern="[0-9]*" />
                </Status>

                <ButtonContrast style={{ margin: 20, marginTop: 0 }} href="" onClick={() => setRunning(previous => !previous)}>{running ? "Stop" : "Run"}</ButtonContrast>
            </Right>

            {/*
            <PageWrapper>
                <Content>
                    <CodeView updateAgents={updateAgents} />
                    <VisualisationView agents={agents} />
                </Content>
            </PageWrapper>
            */}
        </Container>
    )
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
`;

const Left = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  
  background-color: #0A1128;
`;

const Right = styled.div`
  width: 550px;
  
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  background-color: black;
`;

const Status = styled.div`
    display: grid;
    grid-template-columns: 60px auto;
    gap: 10px;

    align-items: center;

    margin: 20px;
`;

const Label = styled.p`
    color: white;
    font-size: 13px;
    font-weight: 400;
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