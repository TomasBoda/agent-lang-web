import { createContext, useContext } from 'react';
import { Observable, Subject } from 'rxjs';
import { CodeItem } from '../model';

export class StorageService {

    private storageSubject: Subject<CodeItem[]> =  new Subject();
    private storageObservable: Observable<CodeItem[]> = this.storageSubject.asObservable();

    public initialize(): void {
        this.next();
    }
    
    public save(label: string, code: string, steps: number, delay: number): void {
        const key = this.getKey(label);
        const value: CodeItem = { label, code, steps, delay, updatedAt: new Date() };

        localStorage.setItem(key, JSON.stringify(value));
        this.next();
    }

    public remove(label: string) {
        const key = this.getKey(label);
        localStorage.removeItem(key);
        this.next();
    }

    public get(label: string): CodeItem | undefined {
        const key = this.getKey(label);
        const value = localStorage.getItem(key);

        if (!value) {
            return undefined;
        }

        return JSON.parse(value) as CodeItem;
    }

    public getAll(): Observable<CodeItem[]> {
        return this.storageObservable;
    }

    private getAllItems(): CodeItem[] {
        const length = localStorage.length;
        const items: CodeItem[] = [];

        for (let i = 0; i < length; i++) {
            const label = localStorage.key(i) as string;

            if (label.includes("item-")) {
                const value = localStorage.getItem(label) as string;
                items.push(JSON.parse(value) as CodeItem);
            }
        }

        return items;
    }

    private next(): void {
        this.storageSubject.next(this.getAllItems());
    }

    private getKey(label: string): string {
        return `item-${label}`;
    }
}

const StorageContext = createContext<StorageService>(new StorageService());

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