import { createContext, useContext } from "react";
import { BehaviorSubject, Observable } from "rxjs";
import { Interpreter, Program, InterpreterConfiguration, InterpreterOutput } from "@/agent-lang-interpreter/src";

export enum InterpreterStatus {
    STOPPED = "Stopped",
    RUNNING = "Running",
    PAUSED = "Paused",
}

export class InterpreterService {

    private sourceCode: string = "";
    private config: InterpreterConfiguration = { steps: 10000, delay: 20, width: 500, height: 500 };

    private interpreter: Interpreter = new Interpreter();

    private status: InterpreterStatus = InterpreterStatus.STOPPED;
    private statusSubject = new BehaviorSubject(InterpreterStatus.STOPPED);

    public initialize(sourceCode: string, steps: number, delay: number): void {
        this.sourceCode = sourceCode;
        this.config = { ...this.config, steps, delay };
        this.interpreter.build(this.sourceCode, this.config);
    }

    public setDimensions(width: number, height: number) {
        this.config.width = width;
        this.config.height = height;
    }

    public getDimensions(): { width: number, height: number } {
        return { width: this.config.width, height: this.config.height };
    }

    public rebuild(): void {
        this.interpreter.rebuild();
    }

    public start(): void {
        if (this.status === InterpreterStatus.RUNNING) {
            return;
        }

        this.interpreter.start();
        this.setStatus(InterpreterStatus.RUNNING);
    }

    public reset(): void {
        if (this.status === InterpreterStatus.STOPPED) {
            return;
        }

        this.interpreter.reset();
        this.setStatus(InterpreterStatus.STOPPED);
    }

    public pause(): void {
        if (this.status === InterpreterStatus.PAUSED || this.status === InterpreterStatus.STOPPED) {
            return;
        }

        this.interpreter.pause();
        this.setStatus(InterpreterStatus.PAUSED);
    }

    public resume(): void {
        if (this.status === InterpreterStatus.RUNNING || this.status === InterpreterStatus.STOPPED) {
            return;
        }

        this.interpreter.resume();
        this.setStatus(InterpreterStatus.RUNNING);
    }

    public step(): void {
        this.setStatus(InterpreterStatus.PAUSED);
        this.interpreter.step();
    }

    public get(): Observable<InterpreterOutput> {
        return this.interpreter.get(this.sourceCode, this.config);
    }

    public getStatus(): Observable<InterpreterStatus> {
        return this.statusSubject.asObservable();
    }

    private setStatus(status: InterpreterStatus): void {
        this.status = status;
        this.statusSubject.next(status);
    }

    public getProgram(): Program {
        return this.interpreter.getProgram();
    }

    public setProgram(program: Program): void {
        this.interpreter.setProgram(program);
    }
}

const InterpreterContext = createContext<InterpreterService>(new InterpreterService());

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