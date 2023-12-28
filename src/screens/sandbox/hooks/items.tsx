import { useEffect, useState } from "react";
import { CodeItem } from "../model";
import { useStorageService } from "../services";
import { useServices } from ".";

export const useItems = () => {

    const { storageService } = useServices();

    const [items, setItems] = useState<CodeItem[]>([]);

    useEffect(() => {
        const storageSubscription = storageService.getAll().subscribe(data => setItems(data));

        return () => {
            storageSubscription?.unsubscribe();
        }
    }, []);

    return { items };
}