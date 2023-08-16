import { useEffect, useState } from "react";
import { styled } from "styled-components"
import $ from "jquery";

export default function CodeEditor({ code, setCode }: { code: string; setCode: (code: string) => void }) {

    const placeholder = `Start typing code...\n\nFor example:\n    agent person 10 {\n        const age = ...\n    }`

    useEffect(() => {
        initializeSyntaxHighlighting();
    }, []);

    function initializeSyntaxHighlighting(): void {
        var $backdrop = $('#backdrop');
        var $highlights = $('#highlights');
        var $textarea = $('#textarea');

        $textarea.val(code);

        var ua = window.navigator.userAgent.toLowerCase();
        var isIE = !!ua.match(/msie|trident\/7|edge/);
        var isWinPhone = ua.indexOf('windows phone') !== -1;
        var isIOS = !isWinPhone && !!ua.match(/ipad|iphone|ipod/);

        function applyHighlights(text: string) {
            const keywords = ["agent", "const", "variable", "dynamic", "if", "else", "then"];
            const functions = ["agents", "empty", "pi", "prob", "count", "filter", "step", "random", "choice", "sqrt", "abs", "floor", "ceil", "round", "sin", "cos", "tan"];
            const booleans = ["true", "false"];
            const logical = ["and", "or"];

            const keywordsRegex = new RegExp(`\\b(?:${keywords.join('|')})\\b`, 'g');
            const functionsRegex = new RegExp(`\\b(?:${functions.join('|')})\\b`, 'g');
            const booleansRegex = new RegExp(`\\b(?:${booleans.join('|')})\\b`, 'g');
            const logicalRegex = new RegExp(`\\b(?:${logical.join('|')})\\b`, 'g');
            const numbersRegex = /-?\d+(\.\d+)?/g;

            text = text.replace(/\n$/g, '\n\n')
                .replace(keywordsRegex, '<mark class="highlight-keyword">$&</mark>')
                .replace(functionsRegex, '<mark class="highlight-function">$&</mark>')
                .replace(booleansRegex, '<mark class="highlight-boolean">$&</mark>')
                .replace(logicalRegex, '<mark class="highlight-logical">$&</mark>')
                .replace(numbersRegex, '<mark class="highlight-number">$&</mark>');;
            
                if (isIE) text = text.replace(/ /g, ' <wbr>');

            return text;
        }

        function handleInput() {
            var text = $textarea.val();
            var highlightedText = applyHighlights(text as string);
            $highlights.html(highlightedText);
        }
    
        function handleScroll() {
            var scrollTop = $textarea.scrollTop();
            $backdrop.scrollTop(scrollTop as number);
    
            var scrollLeft = $textarea.scrollLeft();
            $backdrop.scrollLeft(scrollLeft as number);  
        }

        function fixIOS() {
            $highlights.css({ 'padding-left': '+=3px', 'padding-right': '+=3px' });
        }
    
        function bindEvents() {
            $textarea.on({ 'input': handleInput, 'scroll': handleScroll });
        }

        if (isIOS) fixIOS();
    
        bindEvents();
        handleInput();
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

        if (event.key === "Enter") {
            if (value[selectionStart - 1] === "{") {
                event.preventDefault();
                
                const updatedValue = value.substring(0, selectionStart) + '\n\n}' + value.substring(selectionEnd);
                const newCursorPosition = selectionStart + 1;
    
                event.target.value = updatedValue;
                event.target.setSelectionRange(newCursorPosition, newCursorPosition);
            }
        }

        if (event.key === "(") {
            event.preventDefault();
                
            const updatedValue = value.substring(0, selectionStart) + '()' + value.substring(selectionEnd);
            const newCursorPosition = selectionStart + 1;

            event.target.value = updatedValue;
            event.target.setSelectionRange(newCursorPosition, newCursorPosition);
        }
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
                placeholder={placeholder}>
            </TextArea>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 600px;

    display: block;
    margin: 0 auto;
    transform: translateZ(0);
    -webkit-text-size-adjust: none;

    border: 1px solid lightgray;
    border-radius: 5px;

    background-color: white;
`;

const Backdrop = styled.div`
    width: 100%;
    height: 600px;

    position: absolute;
    z-index: 1;
    overflow: auto;
    pointer-events: none;
    transition: transform 1s;

    border-radius: 5px;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const Highlights = styled.div`
    width: 100%;

    padding: 20px;
    font: 15px/30px 'Poppins', sans-serif;
    letter-spacing: 1px;

    white-space: pre-wrap;
    word-wrap: break-word;
    color: transparent;
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 600px;

    color: black;

    padding: 20px;
    font: 15px/30px 'Poppins', sans-serif;
    letter-spacing: 1px;

    display: block;
    position: absolute;
    z-index: 2;
    margin: 0;
    border-radius: 0;
    background-color: transparent;
    overflow: auto;
    resize: none;
    transition: transform 1s;
    outline: none;

    border: none;
    border-radius: 5px;

    &::-webkit-scrollbar {
        display: none;
    }
`;