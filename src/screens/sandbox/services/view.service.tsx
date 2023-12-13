import { createContext, useContext } from "react";
import { BehaviorSubject, Observable } from "rxjs";

export class ViewService {

    private viewSubject: BehaviorSubject<number> =  new BehaviorSubject(0);
    private viewObservable: Observable<number> = this.viewSubject.asObservable();

    public setView(view: number): void {
        this.viewSubject.next(view);
    }

    public getView(): Observable<number> {
        return this.viewObservable;
    }
}

const ViewContext = createContext<ViewService>(new ViewService());

export const ViewProvider = ({ children, viewService }: { children: any, viewService: ViewService }) => {
    return (
        <ViewContext.Provider value={viewService}>
            {children}
        </ViewContext.Provider>
    )
}

export const useViewService = () => {
    return useContext(ViewContext);
}