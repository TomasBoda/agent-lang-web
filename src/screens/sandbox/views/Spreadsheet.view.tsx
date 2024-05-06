import styled from "styled-components";
import { useState } from "react";
import { Formatter, Program, ParserUtil, Agent, InterpreterOutput, AgentValue, AgentsValue, BooleanValue, NumberValue, RuntimeValue, ValueType, VariableType, ColourValue } from "@/agent-lang-interpreter";
import Editor from 'react-simple-code-editor';
import { Language } from "@/src/language";
import { Button } from "@/src/components/button";
import { useServices } from "../hooks";
import { MessageType } from "@/src/services/message.service";
import { InputField } from "@/src/components/Components.styles";

export default function Spreadsheet({ output }: { output: InterpreterOutput }) {

    const { codeService, interpreterService, messageService } = useServices();

    let agents = output.output?.agents ?? [];

    const [variableEditing, setVariableEditing] = useState(false);
    const [agentIdentifier, setAgentIdentifier] = useState("");
    const [variableIdentifier, setVariableIdentifier] = useState("");
    const [variableCode, setVariableCode] = useState("");

    const [valueEditing, setValueEditing] = useState(false);
    const [valueAgentIndex, setValueAgentIndex] = useState(0);
    const [valuePropertyIndex, setValuePropertyIndex] = useState(0);
    const [valueAgentIdentifier, setValueAgentIdentifier] = useState("");
    const [value, setValue] = useState<any>({});

    function openValueEditDialog(agent: Agent, property: any, agentIndex: number, propertyIndex: number): void {
        // TODO: handle other datatypes (not only numbers)
        if (property.type !== ValueType.Number) {
            setValueEditing(false);
            messageService.showMessage(MessageType.Failure, "Only numeric values can be updated");
            return;
        }
        
        setValueEditing(true);
        setValueAgentIndex(agentIndex);
        setValuePropertyIndex(propertyIndex);
        setValueAgentIdentifier(agent.identifier);
        setValue(property.value);
    }
    
    function saveValueEditDialog(): void {
        let numericValue;

        try {
            numericValue = parseFloat(value.trim());
        } catch (error) {
            messageService.showMessage(MessageType.Failure, "Value is not in numeric format");
            return;
        }

        if ((value as string).includes(".")) {
            if ((value as string).split(".").length > 2) {
                messageService.showMessage(MessageType.Failure, "Value is not in numeric format");
                return;
            }

            if ((value as string).split(".")[1].length > 2) {
                messageService.showMessage(MessageType.Failure, "Value must have maximum of two decimal places");
                return;
            }
        }

        const propertyIdentifier = getAgentPropertyList(agents)[valuePropertyIndex];

        interpreterService.updateAgentValue(valueAgentIndex, propertyIdentifier, numericValue);
        interpreterService.rebuild();
    
        closeValueEditDialog();
    }

    function closeValueEditDialog(): void {
        setValueEditing(false);
    }

    function openVariableEditDialog(agentIdentifier: string, variableIdentifier: string): void {
        setVariableEditing(true);

        setAgentIdentifier(agentIdentifier);
        setVariableIdentifier(variableIdentifier);
        
        const program = interpreterService.getProgram() as Program;
        const code = ParserUtil.getVariableCode(program, agentIdentifier, variableIdentifier);
        setVariableCode(code!);
    }

    function saveVariableEditDialog(): void {
        const variableDeclaration = ParserUtil.codeToAst(variableCode);

        if (variableDeclaration.variableType === VariableType.Const) {
            messageService.showMessage(MessageType.Failure, `Constant property cannot be updated during simulation runtime`);
            return;
        }

        const program = interpreterService.getProgram() as Program;
        const newProgram = ParserUtil.updateVariableInProgram(program, variableDeclaration, agentIdentifier, variableIdentifier);

        interpreterService.setProgram(newProgram);
        interpreterService.rebuild();

        const newCode = ParserUtil.astToCode(newProgram);
        const formattedCode = Formatter.getFormatted(newCode);

        codeService.set({ code: formattedCode });

        messageService.showMessage(MessageType.Success, `Property '${variableIdentifier}' successfuly updated`);

        cancelVariableEditDialog();
    }

    function cancelVariableEditDialog(): void {
        setVariableEditing(false);
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
            case ValueType.Colour: {
                return "C";
            }
            default:
                return "?"
        }
    }

    function getPropertyValue(property: RuntimeValue): string {
        switch (property.type) {
            case ValueType.Number: {
                const value: number = (property as NumberValue).value;
                return value.toFixed(2).toString();
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
            case ValueType.Colour: {
                const value = (property as ColourValue).value;
                return `(${value.red}, ${value.green}, ${value.blue})`;
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
            {variableEditing &&
                <EditorContainer>
                    <EditorTitle>Update Property</EditorTitle>
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
                        <Button size="small" onClick={() => saveVariableEditDialog()}>Save</Button>
                        <Button size="small" onClick={() => cancelVariableEditDialog()}>Cancel</Button>
                    </EditorControls>
                </EditorContainer>
            }

            {getAgentTypes().length === 0 && <Message>No data to show</Message>}

            {getAgentTypes().map((agents: Agent[], agentsIndex: number) =>
                <TableWrapper key={agentsIndex}>
                    <Title>{agents[0].identifier}</Title>

                    <Table>
                        <thead>
                            <Row>
                                {getAgentPropertyList(agents).map((property: string, propertyIndex: number) =>
                                    <Heading key={propertyIndex} onClick={() => openVariableEditDialog(agents[0].identifier, property)}>{property}</Heading>
                                )}
                            </Row>
                        </thead>

                        <tbody>
                            {agents.map((agent: Agent, agentIndex: number) =>
                                <Row key={agentIndex}>
                                    {getAgentPropertyValues(agent).map((property: RuntimeValue, propertyIndex: number) =>
                                        valueEditing && valueAgentIndex === agentIndex && valuePropertyIndex === propertyIndex ?
                                        <Column key={propertyIndex}>
                                            <Value>
                                                <InputField type="text" value={value.toString()} onChange={(e) => setValue(e.target.value)} />
                                                <Button size="small" onClick={() => saveValueEditDialog()}>Save</Button>
                                            </Value>
                                        </Column>
                                        :
                                        <Column key={propertyIndex}>
                                            <Value onClick={() => openValueEditDialog(agent, property, agentIndex, propertyIndex)}>
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

const EditorTitle = styled.p`
    color: white;
    font-size: 15px;
    font-weight: 600;

    margin-bottom: 20px;
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

    border-radius: 5px;
    transition: all 50ms;

    cursor: pointer;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        border-bottom: 1px solid transparent;
    }
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
    transition: all 50ms;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;