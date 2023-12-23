import { MessageProvider, MessageService } from "@/src/services/message.service";
import { CodeService, StorageService, ViewService, InterpreterService, StorageProvider, CodeProvider, ViewProvider, InterpreterProvider } from "./services";
import { useEffect } from "react";

export const ServiceProvider = ({ children }: { children: any }) => {
    const storageService = new StorageService();
    const codeService = new CodeService();
    const viewService = new ViewService();
    const interpreterService = new InterpreterService();
    const messageService = new MessageService();

    useEffect(() => {
        storageService.initialize();
    }, []);

    return (
        <MessageProvider messageService={messageService}>
            <StorageProvider storageService={storageService}>
                <CodeProvider codeService={codeService}>
                    <ViewProvider viewService={viewService}>
                        <InterpreterProvider interpreterService={interpreterService}>
                            {children}
                        </InterpreterProvider>
                    </ViewProvider>
                </CodeProvider>
            </StorageProvider>
        </MessageProvider>
    )
}