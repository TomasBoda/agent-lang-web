
import { useEffect, useState } from "react";
import { useServices } from ".";

export const useView = () => {

    const { viewService }  = useServices();

    const [view, setView] = useState<number>(0);

    useEffect(() => {
        const viewSubscription = viewService.get().subscribe(view => setView(view));

        return () => {
            viewSubscription?.unsubscribe();
        }
    }, []);

    return { view };
}