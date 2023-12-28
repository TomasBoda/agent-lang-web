
import { useEffect, useState } from "react";
import { useServices } from ".";
import { InterpreterOutput } from "@/agent-lang-interpreter/src/interpreter/interpreter.types";

export const useInterpreter = () => {

    const { interpreterService }  = useServices();
    
    const [output, setOutput] = useState<InterpreterOutput>({ status: { code: 0 } });

    useEffect(() => {
        const interpreterSubscription = interpreterService.get().subscribe(output => setOutput(output));

        return () => {
            interpreterSubscription?.unsubscribe();
        }
    }, []);

    return { output };
}