import { styled } from "styled-components"
import Editor from 'react-simple-code-editor';
import Language from "../../../language/language";

export default function CodeEditor({ code, setCode }: { code: string; setCode: (code: string) => void }) {

    Language.initialize();

    const editorStyle = { width: "100%", lineHeight: "150%", color: "white" };

    return (
        <Container>
            <Wrapper>
                <Editor
                    value={code}
                    onValueChange={code => setCode(code)}
                    highlight={(code) => Language.highlightWithLineNumbers(code)}
                    tabSize={4}
                    className="editor step-4"
                    textareaClassName="editor-textarea"
                    style={editorStyle}
                />
            </Wrapper>
        </Container>
    )
}

const Container = styled.div`
    height: 100%;
    width: 100%;

    padding: 20px;

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