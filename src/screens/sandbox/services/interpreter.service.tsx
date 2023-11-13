import { createContext, useContext } from "react";
import { BehaviorSubject, Observable } from "rxjs";
import { InterpreterConfiguration, InterpreterOutput } from "@/agent-lang-interpreter/src/interpreter/interpreter.types";
import { Interpreter } from "@/agent-lang-interpreter/src";

const InterpreterContext = createContext<InterpreterService | null>(null);

export const InterpreterProvider = ({ children, interpreterService }: { children: any, interpreterService: InterpreterService }) => {
    return (
        <InterpreterContext.Provider value={interpreterService}>
            {children}
        </InterpreterContext.Provider>
    )
}

export const useInterpreterService = () => {
    return useContext(InterpreterContext);
}

export class InterpreterService {

    private subscription: any;

    private interpreter: Interpreter = new Interpreter();
    private config: InterpreterConfiguration = { steps: 10000, delay: 20, width: 500, height: 500 };

    private interpreterSubject: BehaviorSubject<InterpreterOutput> = new BehaviorSubject({ status: { code: 0 } });
    private interpreterObservable: Observable<InterpreterOutput> = this.interpreterSubject.asObservable();

    private runningSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private runningObservable: Observable<boolean> = this.runningSubject.asObservable();

    public start(code: string): void {
        this.interpret(code);
        this.runningSubject.next(true);
    }

    public stop(): void {
        this.unsubscribe();
        this.runningSubject.next(false);
    }

    public getRunning(): Observable<boolean> {
        return this.runningObservable;
    }

    public getOutput(): Observable<InterpreterOutput> {
        return this.interpreterObservable;
    }

    private interpret(code: string) {
        this.subscription = this.interpreter.interpret(code, this.config).subscribe(output => {
            this.interpreterSubject.next(output);

            if (output.output?.step === this.config.steps - 1) {
                this.stop();
            }
        });
    }

    private unsubscribe(): void {
        this.subscription?.unsubscribe();
        this.subscription = undefined;
    }
}