import { createContext, useContext } from "react";
import { BehaviorSubject, Observable } from "rxjs";
import { CodeItem, CodeItemPartial } from "../model";

export class CodeService {

    private static DEFAULT: CodeItem = { label: "", code: "", steps: 10000, delay: 20 };
    private static CURRENT: CodeItem = CodeService.DEFAULT;

    private codeSubject: BehaviorSubject<CodeItem> =  new BehaviorSubject(CodeService.DEFAULT);

    public set(codeItemPartial: CodeItemPartial): void {
        const codeItem: CodeItem = { ...CodeService.CURRENT, ...codeItemPartial };
        this.codeSubject.next(codeItem);
        CodeService.CURRENT = codeItem;
    }

    public get(): Observable<CodeItem> {
        return this.codeSubject.asObservable();
    }

    public reset(): void {
        this.codeSubject.next(CodeService.DEFAULT);
        CodeService.CURRENT = CodeService.DEFAULT;
    }
}

const CodeContext = createContext<CodeService>(new CodeService());

export const CodeProvider = ({ children, codeService }: { children: any, codeService: CodeService }) => {
    return (
        <CodeContext.Provider value={codeService}>
            {children}
        </CodeContext.Provider>
    )
}

export const useCodeService = () => {
    return useContext(CodeContext);
}