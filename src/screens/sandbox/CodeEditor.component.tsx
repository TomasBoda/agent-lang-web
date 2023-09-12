import { useEffect } from "react";
import { styled } from "styled-components"
import $ from "jquery";

export default function CodeEditor({ code, setCode }: { code: string; setCode: (code: string) => void }) {

    const syntax = {
        keywords: ["agent", "const", "variable", "dynamic", "if", "else", "then"],
        functions: ["width", "height", "min", "max", "agents", "empty", "pi", "prob", "count", "filter", "step", "random", "choice", "sqrt", "abs", "floor", "ceil", "round", "sin", "cos", "tan"],
        booleans: ["true", "false"],
        logical: ["and", "or"],
    };

    useEffect(() => {
        provideCode(code);
        initializeSyntaxHighlighting();
        highlight();
    }, []);

    useEffect(() => {
        provideCode(code);
        highlight();
    }, [code]);

    function getHighlightedCode(text: string) {
        const keywordsRegex = new RegExp(`\\b(?:${syntax.keywords.join('|')})\\b`, 'g');
        const functionsRegex = new RegExp(`\\b(?:${syntax.functions.join('|')})\\b`, 'g');
        const booleansRegex = new RegExp(`\\b(?:${syntax.booleans.join('|')})\\b`, 'g');
        const logicalRegex = new RegExp(`\\b(?:${syntax.logical.join('|')})\\b`, 'g');
        const numbersRegex = /-?\d+(\.\d+)?/g;

        text = text.replace(/\n$/g, '\n\n')
            .replace(keywordsRegex, '<mark class="highlight-keyword">$&</mark>')
            .replace(functionsRegex, '<mark class="highlight-function">$&</mark>')
            .replace(booleansRegex, '<mark class="highlight-boolean">$&</mark>')
            .replace(logicalRegex, '<mark class="highlight-logical">$&</mark>')
            .replace(numbersRegex, '<mark class="highlight-number">$&</mark>');

        return text;
    }

    function highlight(): void {
        let $highlights = $('#highlights');
        let $textarea = $('#textarea');

        let text = $textarea.val();
        let highlightedText = getHighlightedCode(text as string);
        $highlights.html(highlightedText);
    }

    function provideCode(source: string): void {
        let $textarea = $('#textarea');
        $textarea.val(source);
    }

    function initializeSyntaxHighlighting(): void {
        let $backdrop = $('#backdrop');
        let $textarea = $('#textarea');
    
        function handleScroll() {
            let scrollTop = $textarea.scrollTop();
            $backdrop.scrollTop(scrollTop as number);

            let scrollLeft = $textarea.scrollLeft();
            $backdrop.scrollLeft(scrollLeft as number);  
        }
    
        function bindEvents() {
            $textarea.on({ 'input': highlight, 'scroll': handleScroll });
        }
    
        bindEvents();
    }

    function handleTabIdent(event: any): void {
        const { value, selectionStart, selectionEnd } = event.target;

        if (event.keyCode === 9) {
            event.preventDefault();
  
            const updatedValue = value.substring(0, selectionStart) + '\t' + value.substring(selectionEnd);
            const newCursorPosition = selectionStart + 1;
  
            event.target.value = updatedValue;
            event.target.setSelectionRange(newCursorPosition, newCursorPosition);
        }

        if (event.key === "(") {
            event.preventDefault();
                
            const updatedValue = value.substring(0, selectionStart) + '()' + value.substring(selectionEnd);
            const newCursorPosition = selectionStart + 1;

            event.target.value = updatedValue;
            event.target.setSelectionRange(newCursorPosition, newCursorPosition);
        }

        highlight();
    }

    return (
        <Container id="container">
            <Backdrop id="backdrop">
                <Highlights id="highlights" />
            </Backdrop>

            <TextArea
                id="textarea"
                spellCheck={false}
                onKeyDown={handleTabIdent}
                onChange={(event) => setCode(event.target.value)}
                placeholder="Start writing code...">
            </TextArea>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100%;

    display: block;
    margin: 0 auto;
    transform: translateZ(0);
    -webkit-text-size-adjust: none;
`;

const Backdrop = styled.div`
    width: 100%;
    height: 100%;

    position: absolute;
    z-index: 2;
    overflow: auto;
    pointer-events: none;
    transition: transform 1s;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const Highlights = styled.div`
    width: 100%;

    padding: 20px;
    font: 18px/30px 'Ubuntu Mono', monospace;
    font-weight: 400;
    letter-spacing: 0;

    white-space: pre-wrap;
    word-wrap: break-word;
    color: transparent;
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 100%;
  
    color: rgb(220, 220, 220);
    font: 18px/30px 'Ubuntu Mono', monospace;
    font-weight: 400;
    letter-spacing: 0;
  
    padding: 20px;
    margin: 0;

    display: block;
    position: absolute;
    z-index: 1;
    background-color: transparent;
    overflow: auto;
    resize: none;
    transition: transform 1s;
    outline: none;

    border: none;

    &::-webkit-scrollbar {
        display: none;
    }
`;