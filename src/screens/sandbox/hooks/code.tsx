
import { useEffect, useState } from "react";
import { CodeItem } from "../model";
import { useServices } from ".";

export const useCode = () => {

    const { codeService }  = useServices();

    const [codeItem, setCodeItem] = useState<CodeItem>({ label: "", code: "", steps: 10000, delay: 20 });

    useEffect(() => {
        const codeSubscription = codeService.get().subscribe((item: CodeItem) => setCodeItem(item));

        return () => {
            codeSubscription?.unsubscribe();
        }
    }, []);

    return { codeItem };
}