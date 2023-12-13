import { createContext, useContext } from "react";

export enum MessageType {
    Success = "Success",
    Failure = "Failure"
};

export class MessageService {

    private readonly id = "message";

    public showMessage(type: MessageType, text: string): void {
        const container = this.getMessageContainer()!;

        this.getMessageText()!.innerHTML = text;
        this.getMessageIcon()!.setAttribute("src", this.getMessageIconSrc(type));

        container.style.transition = "none";
        container.style.display = "grid";
        container.style.bottom = `-${container.offsetHeight}px`;

        setTimeout(() => {
            container.style.transition = "all 500ms";
        }, 200);

        setTimeout(() => {
            container.style.bottom = "30px";
        }, 220);

        setTimeout(() => {
            this.hideMessage();
        }, 5000);
    }

    public hideMessage(): void {
        const container = this.getMessageContainer()!;
        container.style.bottom = `-${container.offsetHeight}px`;
    }

    private getMessageContainer(): HTMLElement | null {
        return document.getElementById(this.id);
    }

    private getMessageIcon(): HTMLElement | null {
        return this.getMessageContainer()?.children.item(0) as HTMLElement;
    }

    private getMessageText(): HTMLElement | null {
        return this.getMessageContainer()?.children.item(1) as HTMLElement;
    }

    private getMessageIconSrc(type: MessageType): string {
        switch (type) {
            case MessageType.Success: {
                return "/assets/icon-success.svg";
            }
            case MessageType.Failure: {
                return "/assets/icon-failed.svg";
            }
            default: {
                return "";
            }
        }
    }
}

const MessageContext = createContext<MessageService>(new MessageService());

export const MessageProvider = ({ children, messageService }: { children: any, messageService: MessageService }) => {
    return (
        <MessageContext.Provider value={messageService}>
            {children}
        </MessageContext.Provider>
    )
}

export const useMessageService = () => {
    return useContext(MessageContext);
}