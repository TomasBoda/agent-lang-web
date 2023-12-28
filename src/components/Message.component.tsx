import { useEffect } from "react";
import styled from "styled-components"
import { useMessageService } from "../services/message.service";

export default function Message() {

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

const Container = styled.div`
    position: fixed;
    left: calc(50vw - 200px);
    bottom: 30px;

    width: 400px;

    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 15px;
    align-items: center;

    padding: 15px;

    border-radius: 5px;
    background-color: black;

    transition: all 500ms;

    display: none;
`;

const Icon = styled.img`
    width: 18px;
    height: 18px;
`;

const Text = styled.div`
    color: white;
    font-size: 12px;
`;

const IconClose = styled.img`
    width: 8px;
    height: 8px;

    cursor: pointer;
`;