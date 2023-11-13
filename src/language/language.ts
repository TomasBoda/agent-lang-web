import Prism from "prismjs";

export default class Language {

    private static languageCode = "agentlang";
    
    private static syntax = {
        keywords: ["agent", "property", "const"],
        condition: ["if", "then", "else"],
        function: ["width", "height", "min", "max", "agents", "empty", "pi", "prob", "count", "filter", "step", "random", "choice", "sqrt", "abs", "floor", "ceil", "round", "sin", "cos", "tan", "index"],
        booleans: ["true", "false"],
        logical: ["and", "or"],
    };

    public static initialize(): void {
        Prism.languages[Language.languageCode] = {
            "keyword": new RegExp(`\\b(?:${Language.syntax.keywords.join('|')})\\b`, 'g'),
            "condition": new RegExp(`\\b(?:${Language.syntax.condition.join('|')})\\b`, 'g'),
            "function": new RegExp(`\\b(?:${Language.syntax.function.join('|')})\\b`, 'g'),
            "boolean": new RegExp(`\\b(?:${Language.syntax.booleans.join('|')})\\b`, 'g'),
            "logical": new RegExp(`\\b(?:${Language.syntax.logical.join('|')})\\b`, 'g'),
            "number": /-?\d+(\.\d+)?/g,
            "operator": /\+|\-|\*|\/|\%|\<|\<\=|\>|\>\=|\=|\=\=|\=\>/g,
        };
    }

    public static highlight(code: string): string {
        return Prism.highlight(code, Prism.languages[Language.languageCode], Language.languageCode);
    }

    public static highlightWithLineNumbers(code: string): string {
        return Language.highlight(code)
            .split("\n")
            .map((line, i) => `<span class='code-line-number'>${i + 1}</span>${line}`)
            .join("\n");
    }
}