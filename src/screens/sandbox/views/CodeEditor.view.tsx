import { styled } from "styled-components"
import Editor from 'react-simple-code-editor';
import Language from "../../../language/language";
import { useEffect, useState } from "react";
import { useCodeService } from "../services";

export default function CodeEditor() {

    const codeService = useCodeService();

    const [label, setLabel] = useState("");
    const [code, setCode] = useState("");
    const [steps, setSteps] = useState(0);
    const [delay, setDelay] = useState(0);

    Language.initialize();
    const editorStyle = { width: "100%", lineHeight: "150%", color: "white" };

    useEffect(() => {
        subscribeToCodeService();
    }, [codeService]);

    function subscribeToCodeService(): void {
        codeService?.getCode().subscribe(data => {
            setLabel(data.label);
            setCode(data.code);
            setSteps(data.steps);
            setDelay(data.delay);
        });
    }

    function updateCode(code: string): void {
        codeService?.setCode(label, code, steps, delay);
    }

    return (
        <Container>
            <Wrapper>
                <Editor
                    value={code}
                    onValueChange={code => updateCode(code)}
                    highlight={(code) => Language.highlightWithLineNumbers(code)}
                    tabSize={4}
                    className="editor step-4"
                    textareaClassName="editor-textarea"
                    style={editorStyle}
                    placeholder="Enter code here..."
                />
            </Wrapper>
        </Container>
    )
}

const Container = styled.div`
    height: 100%;
    width: 100%;

    background-color: white;
    background-color: rgb(10, 10, 10);

    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    overflow: hidden;
`;

const Wrapper = styled.div`
    width: 100%;
    height: 100%;

    overflow: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`;