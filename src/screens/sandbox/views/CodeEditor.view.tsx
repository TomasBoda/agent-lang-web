import { styled } from "styled-components"
import Editor from 'react-simple-code-editor';
import Language from "../../../language/language";
import { useCode, useServices } from "../hooks";
import { useEffect } from "react";

export default function CodeEditor() {

    Language.initialize();

    const { codeService, storageService } = useServices();

    const { codeItem } = useCode();
    const { code } = codeItem;

    function updateCode(newCode: string): void {
        codeService.set({ code: newCode });
        save(newCode);
    }

    function save(code: string): void {
        if (code.trim() === "") {
            return;
        }

        const { label, steps, delay } = codeItem;
        storageService.save(label, code, steps, delay);
    }

    function highlightCode(code: string): string {
        return Language.highlightWithLineNumbers(code);
    }

    return (
        <Container>
            <Wrapper>
                <Editor
                    value={code}
                    onValueChange={updateCode}
                    highlight={highlightCode}
                    tabSize={4}
                    className="editor"
                    textareaClassName="editor-textarea"
                    style={{ width: "100%", lineHeight: "150%", color: "white" }}
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