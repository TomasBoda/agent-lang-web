import styled from "styled-components";
import Button from "@/src/components/Button.component";
import Link from "next/link";
import { Spacer } from "@/src/components/Components.styles";
import { useItems, useServices } from "../../hooks";
import { useEffect, useState } from "react";
import ItemList from "./ItemList.component";
import { Examples } from "@/src/utils/examples";
import Logo from "@/src/components/Logo.component";

export default function Sidebar() {

    const { storageService, codeService, viewService } = useServices();
    const { items } = useItems();

    useEffect(() => {
        initializeExamples();
    }, []);

    function reset(): void {
        codeService.reset();
        viewService.set(0);
    }

    function initializeExamples(): void {
        for (const example of Examples.ALL) {
            if (!storageService.get(example.label)) {
                const { label, code, steps, delay } = example;
                storageService.save(label, code, steps, delay);
            }
        }
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
            <LogoContainer>
                <Logo />
            </LogoContainer>

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

const LogoContainer = styled.div`
    margin: 20px;
    margin-bottom: 0px;
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