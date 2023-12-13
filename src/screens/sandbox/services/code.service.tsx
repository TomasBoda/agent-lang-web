import { createContext, useContext } from "react";
import { BehaviorSubject, Observable } from "rxjs";
import { CodeItem } from "../model";

export class CodeService {

    private static DEFAULT: CodeItem = { label: "", code: "", steps: 10000, delay: 20 };

    private codeSubject: BehaviorSubject<CodeItem> =  new BehaviorSubject(CodeService.DEFAULT);
    private codeObservable: Observable<CodeItem> = this.codeSubject.asObservable();

    public setCode(label: string, code: string, steps: number, delay: number): void {
        this.codeSubject.next({ label, code, steps, delay });
    }

    public setEmpty(): void {
        this.codeSubject.next(CodeService.DEFAULT);
    }

    public getCode(): Observable<CodeItem> {
        return this.codeObservable;
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