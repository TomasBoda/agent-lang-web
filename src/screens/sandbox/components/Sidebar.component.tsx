import styled from "styled-components";
import { useEffect, useState } from "react";
import { Spacer } from "@/src/components/Components.styles";
import Button from "@/src/components/Button.component";
import { useCodeService, useStorageService } from "../services";
import { CodeItem } from "../model";

export default function Sidebar() {

    const storageService = useStorageService();
    const codeService = useCodeService();

    const [items, setItems] = useState<CodeItem[]>([]);

    useEffect(() => {
        subscribe();
    }, [storageService]);

    function subscribe(): void {
        storageService?.getAll().subscribe(data => setItems(data));
    }

    function select(item: CodeItem): void {
        codeService?.setCode(item.label, item.code);
    }

    function reset(): void {
        codeService?.setEmpty();
    }

    return (
        <Container>
            <Header>
                <span style={{ fontWeight: 700 }}>Agent</span>Lang
            </Header>

            {items.length === 0 ? <Empty>No projects</Empty> :
                <List>
                    {items.map((item, index) => <Item key={index} onClick={() => select(item)}>{item.label}</Item>)}
                </List>
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

    display: flex;
    flex-direction: column;

    border-radius: 5px;

    background-color: white;
    background-color: rgb(10, 10, 10);
`;

const Header = styled.div`
  color: white;
  font-size: 20px;
  font-weight: 200;
  line-height: 100%;

  padding: 20px;
`;

const Empty = styled.span`
    color: rgba(255, 255, 255, 0.7);
    font-size: 12px;
    font-weight: 300;
    
    margin: 20px;
`;

const List = styled.div`
    flex: 1;

    overflow: scroll;
`;

const Item = styled.div`
    color: white;
    font-size: 12px;
    font-weight: 400;

    padding: 15px;
    margin: 10px 15px;

    border-radius: 3px;

    background-color: rgba(255, 255, 255, 0.03);

    cursor: pointer;
`;

const Footer = styled.div`
    padding: 20px;
`;