import { useMessageService } from "../../services/message.service";
import { Container, Icon, IconClose, Text } from "./Message.styles";

export function Message() {

    const messageService = useMessageService();

    function close(): void {
        messageService.hideMessage();
    }

    return (
        <Container id="message">
            <Icon />
            <Text />
            <IconClose
                onClick={() => close()}
                src="/assets/icon-close.svg"
            />
        </Container>
    )
}