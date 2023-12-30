import styled from "styled-components";
import { MessageType } from "@/src/services/message.service";
import { useServices } from "../../hooks";
import { CodeItem } from "../../model";

export default function Item({ item }: { item: CodeItem }) {

    const { label } = item;

    const { storageService, codeService, viewService, interpreterService, messageService } = useServices();

    function select(): void {
        codeService.set(item);
        viewService.set(0);
        interpreterService.reset();
    }

    function remove(event: any): void {
        event.stopPropagation();

        storageService.remove(label);
        codeService.reset();
        viewService.set(0);

        messageService.showMessage(MessageType.Success, "Item was successfully deleted");
    }

    return (
        <Container onClick={() => select()}>
            {label}
            <Icon onClick={(e) => remove(e)} src="/assets/icon-remove.svg" />
        </Container>
    )
}

const Container = styled.div`
    color: white;
    font-size: 12px;
    font-weight: 400;

    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1px;
    align-items: center;

    padding: 15px;
    margin: 5px 15px;

    border-radius: 3px;

    background-color: rgba(255, 255, 255, 0.03);

    cursor: pointer;

    transition: all 100ms;

    &:hover {
        background-color: rgba(255, 255, 255, 0.08);
    }
`;

const Icon = styled.img`
    height: 22px;
    opacity: 0.7;

    padding: 6px;
    border-radius: 3px;

    transition: all 100ms;

    &:hover {
        opacity: 1;
        background-color: rgba(255, 255, 255, 0.1);
    }
`;