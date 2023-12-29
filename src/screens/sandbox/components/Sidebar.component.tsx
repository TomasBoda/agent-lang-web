import styled from "styled-components";
import Button from "@/src/components/Button.component";
import Link from "next/link";
import { Spacer } from "@/src/components/Components.styles";
import { CodeItem } from "../model";
import { MessageType } from "@/src/services/message.service";
import { useItems, useServices } from "../hooks";

export default function Sidebar() {

    const { storageService, codeService, viewService, interpreterService, messageService } = useServices();
    const { items } = useItems();

    function select(item: CodeItem): void {
        codeService.set(item);
        viewService.set(0);
        interpreterService.reset();
    }

    function reset(): void {
        codeService.reset();
        viewService.set(0);
    }

    function remove(item: CodeItem, event: any): void {
        event.stopPropagation();

        storageService.remove(item.label);
        codeService.reset();
        viewService.set(0);

        messageService.showMessage(MessageType.Success, "Item was successfully deleted");
    }

    function sort(array: CodeItem[]): CodeItem[] {
        return array.sort((a, b) => a.label.localeCompare(b.label));
    }

    function getItemCountLabel(): string {
        if (items.length === 0) {
            return "No projects"
        } else if (items.length === 1) {
                return `${items.length} project`;
        } else {
            return `${items.length} projects`;
        }
    }

    return (
        <Container>
            <Header href="/">
                <span style={{ fontWeight: 700 }}>Agent</span>Lang
            </Header>

            <ItemCountLabel>{getItemCountLabel()}</ItemCountLabel>

            {items.length > 0 &&
                <ListWrapper>
                    <List>
                        {sort(items).map((item, index) =>
                            <Item key={index} onClick={() => select(item)}>
                                {item.label}
                                <Icon onClick={(e) => remove(item, e)} src="/assets/icon-remove.svg" />
                            </Item>
                        )}
                    </List>
                </ListWrapper>
            }

            <Spacer />

            <Footer>
                <Button size="small" onClick={() => reset()}>New simulation</Button>
            </Footer>
        </Container>
    )
}

const Container = styled.div`
    width: 350px;
    height: 100%;
    max-height: calc(100vh - 30px);

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr auto;
    
    border-radius: 5px;

    background-color: white;
    background-color: rgb(10, 10, 10);
`;

const Header = styled(Link)`
  color: white;
  font-size: 20px;
  font-weight: 200;
  line-height: 100%;
  text-decoration: none;

  padding: 20px;
`;

const ItemCountLabel = styled.span`
    color: rgba(255, 255, 255, 0.7);
    font-size: 12px;
    font-weight: 300;
    
    margin: 20px;
`;

const ListWrapper = styled.div`
    overflow: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
`;

const Item = styled.div`
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

const Footer = styled.div`
    padding: 20px;
`;