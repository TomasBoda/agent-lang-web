import Prism from "prismjs";
import { keywords } from "./keywords";

export class Language {

    private static languageCode = "agentlang";

    public static initialize(): void {
        Prism.languages[Language.languageCode] = {
            "comment": keywords.comments,
            "keyword": keywords.keywords,
            "condition": keywords.conditions,
            "function": keywords.functions,
            "boolean": keywords.booleans,
            "logical": keywords.logical,
            "number": keywords.numbers,
            "operator": keywords.operators,
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