import { createContext, useContext } from 'react';
import { Observable, Subject } from 'rxjs';
import { CodeItem } from '../model';

const StorageContext = createContext<StorageService | null>(null);

export const StorageProvider = ({ children, storageService }: { children: any, storageService: StorageService }) => {
    return (
        <StorageContext.Provider value={storageService}>
            {children}
        </StorageContext.Provider>
    )
}

export const useStorageService = () => {
    return useContext(StorageContext);
}

export class StorageService {

    private storageSubject: Subject<CodeItem[]> =  new Subject();
    private storageObservable: Observable<CodeItem[]> = this.storageSubject.asObservable();

    public initialize(): void {
        this.next();
    }
    
    public save(label: string, code: string): void {
        localStorage.setItem("item-" + label, code);
        this.next();
    }

    public remove(label: string) {
        localStorage.removeItem("item-" + label);
        this.next();
    }

    public get(label: string): CodeItem | undefined {
        const code = localStorage.getItem("item-" + label);

        if (!code) {
            return undefined;
        }

        return { label: label.substring(5, label.length), code } as CodeItem;
    }

    public getAll(): Observable<CodeItem[]> {
        return this.storageObservable;
    }

    private getAllItems(): CodeItem[] {
        const length = localStorage.length;
        const items: CodeItem[] = [];

        for (let i = 0; i < length; i++) {
            const label = localStorage.key(i) as string;
            const code = localStorage.getItem(label) as string;

            if (label.includes("item-")) {
                items.push({ label: label.substring(5, label.length), code });
            }
        }

        return items;
    }

    private next(): void {
        this.storageSubject.next(this.getAllItems());
    }
}