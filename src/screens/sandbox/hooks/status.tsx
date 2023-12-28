
import { useEffect, useState } from "react";
import { useServices } from ".";
import { InterpreterStatus } from "../services";

export const useStatus = () => {

    const { interpreterService }  = useServices();

    const [status, setStatus] = useState<InterpreterStatus>(InterpreterStatus.STOPPED);

    useEffect(() => {
        const statusSubscription = interpreterService.getStatus().subscribe(status => setStatus(status));

        return () => {
            statusSubscription?.unsubscribe();
        }
    }, []);

    return { status };
}