import styled from "styled-components";
import { InterpreterStatus, useInterpreterService } from "../services/interpreter.service";
import { useEffect, useState } from "react";
import { Agent, InterpreterOutput } from "@/agent-lang-interpreter/src/interpreter/interpreter.types";
import { AgentValue, AgentsValue, BooleanValue, NumberValue, RuntimeValue, ValueType } from "@/agent-lang-interpreter/src/runtime/runtime.types";
import { ParserUtil } from "@/agent-lang-interpreter/src/parser/parser-util";
import { Program } from "@/agent-lang-interpreter/src/parser/parser.types";
import Editor from 'react-simple-code-editor';
import Language from "@/src/language/language";
import Button from "@/src/components/Button.component";
import { useCodeService } from "../services";

export default function Spreadsheet({ output, status }: { output: InterpreterOutput, status: InterpreterStatus }) {

    const interpreterService = useInterpreterService();
    const codeService = useCodeService();

    const [agents, setAgents] = useState<Agent[]>([]);

    const [editing, setEditing] = useState(false);
    const [agentIdentifier, setAgentIdentifier] = useState("");
    const [variableIdentifier, setVariableIdentifier] = useState("");
    const [variableCode, setVariableCode] = useState("");

    // general code data
    const [label, setLabel] = useState("");
    const [code, setCode] = useState("");
    const [steps, setSteps] = useState(0);
    const [delay, setDelay] = useState(0);

    useEffect(() => {
        setAgents(output.output?.agents ?? []);
    }, [output]);

    useEffect(() => {
        if (status !== InterpreterStatus.PAUSED) {
            setAgents([]);
        }
    }, [status]);

    useEffect(() => {
        const codeSubscription = codeService.getCode().subscribe(data => {
            setLabel(data.label);
            setCode(data.code);
            setSteps(data.steps);
            setDelay(data.delay);
        });

        return () => {
            codeSubscription.unsubscribe();
        }
    }, []);

    function editProperty(agentIdentifier: string, variableIdentifier: string): void {
        setEditing(true);
        setAgentIdentifier(agentIdentifier);
        setVariableIdentifier(variableIdentifier);
        
        const program = interpreterService.getProgram() as Program;
        const code = ParserUtil.getVariableCode(program, agentIdentifier, variableIdentifier);
        setVariableCode(code!);
    }

    function saveEditDialog(): void {
        const variableDeclaration = ParserUtil.codeToAst(variableCode);
        const program = interpreterService.getProgram() as Program;
        const newProgram = ParserUtil.updateVariableInProgram(program, variableDeclaration, agentIdentifier, variableIdentifier);

        interpreterService.setProgram(newProgram);
        interpreterService.rebuild();

        // TODO: update code in code editor
        codeService.setCode(label, ParserUtil.astToCode(newProgram), steps, delay);
    }

    function cancelEditDialog(): void {
        setEditing(false);
    }

    function getAgentTypes(): Agent[][] {
        const agentTypes: { [key: string]: Agent[] } = {};

        agents.forEach((agent: Agent) => {
            if (agentTypes.hasOwnProperty(agent.identifier)) {
                agentTypes[agent.identifier].push(agent);
            } else {
                agentTypes[agent.identifier] = [agent];
            }
        });

        return Object.values(agentTypes);
    }

    function getAgentPropertyList(agents: Agent[]): string[] {
        if (agents.length === 0) {
            return [];
        }

        const agent: Agent = agents[0];
        return Object.keys(agent.variables);
    }

    function getAgentPropertyValues(agent: Agent): any[] {
        return Object.values(agent.variables);
    }

    function getPropertyType(property: RuntimeValue): string {
        switch (property.type) {
            case ValueType.Number: {
                return "N";
            }
            case ValueType.Boolean: {
                return "B";
            }
            case ValueType.Agent: {
                return "Agent";
            }
            case ValueType.Agents: {
                return "List";
            }
            default:
                return "?"
        }
    }

    function getPropertyValue(property: RuntimeValue): string {
        switch (property.type) {
            case ValueType.Number: {
                const value: number = (property as NumberValue).value;
                return value.toString();
            }
            case ValueType.Boolean: {
                const value: boolean = (property as BooleanValue).value;
                return value.toString();
            }
            case ValueType.Agent: {
                const value: Agent = (property as AgentValue).value;
                return value.identifier.toString();
            }
            case ValueType.Agents: {
                const value: Agent[] = (property as AgentsValue).value;
                return value.length.toString();
            }
            default:
                return "Unknown"
        }
    }

    function isBoolean(property: RuntimeValue): boolean {
        return property.type === ValueType.Boolean;
    }

    function getBooleanValue(property: RuntimeValue): boolean {
        return (property as BooleanValue).value;
    }

    return (
        <Container>
            {editing &&
                <EditorContainer>
                    <Editor
                        value={variableCode}
                        onValueChange={code => setVariableCode(code)}
                        highlight={(code) => Language.highlightWithLineNumbers(code)}
                        tabSize={4}
                        className="editor"
                        textareaClassName="editor-textarea"
                        style={{ width: "100%", lineHeight: "150%", color: "white" }}
                        placeholder="Edit property..."
                    />
                    <EditorControls>
                        <Button size="small" onClick={() => saveEditDialog()}>Save</Button>
                        <Button size="small" onClick={() => cancelEditDialog()}>Cancel</Button>
                    </EditorControls>
                </EditorContainer>
            }

            {getAgentTypes().length === 0 && <Message>No data to show</Message>}

            {getAgentTypes().map((agents: Agent[]) =>
                <TableWrapper>
                    <Title>{agents[0].identifier}</Title>

                    <Table>
                        <thead>
                            <Row>
                                {getAgentPropertyList(agents).map(property => <Heading onClick={() => editProperty(agents[0].identifier, property)}>{property}</Heading>)}
                            </Row>
                        </thead>

                        <tbody>
                            {agents.map((agent: Agent) =>
                                <Row>
                                    {getAgentPropertyValues(agent).map((property: RuntimeValue) =>
                                        <Column>
                                            <Value>
                                                <Tag>{getPropertyType(property)}</Tag>        
                                                {isBoolean(property) ?
                                                    <Boolean $color={getBooleanValue(property) ? "green" : "red"}>
                                                        {getBooleanValue(property).toString()}
                                                    </Boolean>
                                                :
                                                    getPropertyValue(property)
                                                }            
                                            </Value>
                                        </Column>    
                                    )}
                                </Row>
                            )}
                        </tbody>
                    </Table>
                </TableWrapper>
            )}
        </Container>
    )
}

const Container = styled.div`
    width: 100%;

    display: grid;
    grid-template-columns: 100%;
    gap: 20px;
    justify-content: flex-start;
    align-items: flex-start;
`;

const EditorContainer = styled.div`
    width: 100%;
`;

const EditorControls = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    gap: 10px;
    justify-content: flex-start;

    margin: 30px 0px;
`;

const Message = styled.p`
    color: rgba(255, 255, 255, 0.5);
    font-size: 12px;
    font-weight: 300;
`;

const TableWrapper = styled.div`
    overflow-x: scroll;
`;

const Title = styled.div`
    color: white;
    font-size: 20px;
    font-weight: 700;

    margin-left: 15px;
    margin-bottom: 10px;
`;

const Table = styled.table`
    width: 100%;
    border-spacing: 10px;
`;

const Row = styled.tr`
    width: 100%;
`;

const Column = styled.td`
    color: white;

    white-space: nowrap;

    min-width: 130px;
    width: auto;
    padding: 10px 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Value = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    gap: 10px;
    align-items: center;
    justify-content: flex-start;

    color: rgb(220, 220, 220);
    font-family: 'Menlo Regular', monospace !important;
    font-size: 13px;
`;

const Tag = styled.div`
    color: rgb(220, 220, 220);
    font-size: 11px;
    font-weight: 600;

    padding: 4px 8px;
    border-radius: 8px;

    background-color: rgba(255, 255, 255, 0.1);
`;

const Boolean = styled.div<{ $color: "green" | "red" }>`
    color: white;
    font-family: 'Menlo Regular', monospace !important;
    font-size: 10px;
    font-weight: 700;

    padding: 8px 12px;
    border-radius: 5px;

    background-color: ${props => props.$color === "green" ? "#559C6D" : "#DE3C4B"};
`;

const Heading = styled.th`
    color: white;
    font-family: 'Menlo Regular', monospace !important;
    font-size: 12px;
    font-weight: 500;

    white-space: nowrap;

    padding: 10px;
    border-radius: 10px;

    background-color: rgb(30, 30, 30);

    cursor: pointer;
`;