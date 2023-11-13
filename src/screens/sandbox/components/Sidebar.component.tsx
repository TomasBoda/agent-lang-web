import styled from "styled-components";
import { useEffect, useState } from "react";
import { Spacer } from "@/src/components/Components.styles";
import Button from "@/src/components/Button.component";
import { useCodeService, useStorageService, useViewService } from "../services";
import { CodeItem } from "../model";
import Link from "next/link";

export default function Sidebar() {

    const storageService = useStorageService();
    const codeService = useCodeService();
    const viewService = useViewService();

    const [items, setItems] = useState<CodeItem[]>([]);

    useEffect(() => {
        subscribe();
    }, [storageService]);

    function subscribe(): void {
        storageService?.getAll().subscribe(data => setItems(data));
    }

    function select(item: CodeItem): void {
        codeService?.setCode(item.label, item.code, item.steps, item.delay);
        viewService?.setView(0);
    }

    function reset(): void {
        codeService?.setEmpty();
        viewService?.setView(0);
    }

    function start(item: CodeItem, event: any): void {
        event.stopPropagation();
        codeService?.setCode(item.label, item.code, item.steps, item.delay);
        viewService?.setView(2);
    }

    function remove(item: CodeItem, event: any): void {
        event.stopPropagation();
        storageService?.remove(item.label);
        codeService?.setEmpty();
        viewService?.setView(0);
    }

    function sort(array: CodeItem[]): CodeItem[] {
        return array.sort((a, b) => a.label.localeCompare(b.label));
    }

    function getMessage(): string {
        if (items.length === 0) {
            return "No projects"
        } else {
            if (items.length === 1) {
                return `${items.length} project`;
            } else {
                return `${items.length} projects`;
            }
        }
    }

    return (
        <Container>
            <Header href="/">
                <span style={{ fontWeight: 700 }}>Agent</span>Lang
            </Header>

            <Message>{getMessage()}</Message>

            {items.length > 0 &&
                <ListWrapper>
                    <List>
                        {sort(items).map((item, index) =>
                            <Item key={index} onClick={() => select(item)}>
                                {item.label}
                                <Icon onClick={(e) => start(item, e)} src="/assets/icon-start.svg" />
                                <Icon onClick={(e) => remove(item, e)} src="/assets/icon-remove.svg" />
                            </Item>
                        )}
                    </List>
                </ListWrapper>
            }

            <Spacer />

            <Footer>
                <Button className="step-2" size="small" onClick={() => reset()}>New simulation</Button>
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

const Message = styled.span`
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
    grid-template-columns: 1fr auto auto;
    gap: 1px;
    align-items: center;

    padding: 15px;
    margin: 5px 15px;

    border-radius: 3px;

    background-color: rgba(255, 255, 255, 0.03);

    cursor: pointer;
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