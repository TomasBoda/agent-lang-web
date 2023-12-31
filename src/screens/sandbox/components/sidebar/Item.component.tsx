import styled from "styled-components";
import { MessageType } from "@/src/services/message.service";
import { useServices } from "../../hooks";
import { CodeItem } from "../../model";
import { getFormattedDate } from "@/src/utils/datetime";
import { Spacer } from "@/src/components/Components.styles";

export default function Item({ item }: { item: CodeItem }) {

    const { label, updatedAt } = item;

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
            <Label>{label}</Label>
            <Date>{getFormattedDate(updatedAt as unknown as string)}</Date>
            <Icon onClick={(e) => remove(e)} src="/assets/icon-remove.svg" />
        </Container>
    )
}

const Container = styled.div`
    color: white;
    font-size: 12px;
    font-weight: 400;

    display: grid;
    grid-template-columns: 1fr auto auto;
    gap: 10px;
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

const Label = styled.span``;

const Date = styled.span`
    color: rgba(255, 255, 255, 0.5);
    font-size: 10px;
    font-weight: 400;
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