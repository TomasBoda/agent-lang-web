import { createContext, useContext } from "react";
import { BehaviorSubject, Observable } from "rxjs";
import { CodeItem } from "../model";

const CodeContext = createContext<CodeService | null>(null);

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

export class CodeService {

    private codeSubject: BehaviorSubject<CodeItem> =  new BehaviorSubject({ label: "", code: "" });
    private codeObservable: Observable<CodeItem> = this.codeSubject.asObservable();

    public setCode(label: string, code: string): void {
        this.codeSubject.next({ label, code });
    }

    public setEmpty(): void {
        this.codeSubject.next({ label: "", code: "" });
    }

    public getCode(): Observable<CodeItem> {
        return this.codeObservable;
    }
}