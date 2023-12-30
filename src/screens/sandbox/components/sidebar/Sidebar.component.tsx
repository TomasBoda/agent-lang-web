import styled from "styled-components";
import Button from "@/src/components/Button.component";
import Link from "next/link";
import { Spacer } from "@/src/components/Components.styles";
import { CodeItem } from "../../model";
import { MessageType } from "@/src/services/message.service";
import { useItems, useServices } from "../../hooks";
import { useEffect, useState } from "react";
import ItemList from "./ItemList.component";

export default function Sidebar() {

    const { codeService, viewService } = useServices();
    const { items } = useItems();

    function reset(): void {
        codeService.reset();
        viewService.set(0);
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
            <ItemList items={items} />

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

const Footer = styled.div`
    padding: 20px;
`;