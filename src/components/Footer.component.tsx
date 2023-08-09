import { styled } from "styled-components"
import { Button, PageWrapper } from "./Components.styles";
import Link from "next/link";

export default function Footer() {

    return (
        <Container>
            <PageWrapper>
                <Content>
                    <Column>
                        <Logo href="/">Agent<Thin>Lang</Thin></Logo>
                        <Description>A brand new user-friendly programming language designed to simulate agent-based models</Description>
                        <Button href="/sandbox">Try for free</Button>
                    </Column>

                    <span />

                    <Column>
                        <Heading href="/documentation">Documentation</Heading>
                        <Item href="/documentation">Introduction</Item>
                        <Item href="/documentation">Software Specification</Item>
                        <Item href="/documentation">Language Design</Item>
                        <Item href="/documentation">Code Sandbox</Item>
                    </Column>

                    <Column>
                        <Heading href="/sandbox">Code Sandbox</Heading>
                        <Item href="/sandbox">Example Programs</Item>
                        <Item href="/sandbox">Code Editor</Item>
                        <Item href="/sandbox">Table Editor</Item>
                        <Item href="/sandbox">Visualisation</Item>
                    </Column>
                        
                    <Column>
                        <Heading href="/about">About</Heading>
                        <Item href="/about">Our Story</Item>
                        <Item href="/about">Aim of the Project</Item>
                        <Item href="/about">Contact Us</Item>
                    </Column>
                </Content>
            </PageWrapper>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: rgba(0, 0, 0, 0.1);
`;

const Content = styled.div`
    width: 100%;

    display: grid;
    grid-template-columns: 270px 50px 1fr 1fr 1fr;
    gap: 50px;

    padding: 75px 0px 100px 0px;
`;

const Column = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const Logo = styled(Link)`
    display: inline-block;

    color: black;
    font-size: 20px;
    font-weight: 700;
    line-height: 100%;

    text-decoration: none;
`;

const Thin = styled.span`
    font-weight: 400;
`;

const Description = styled.p`
    color: black;
    font-size: 15px;
    font-weight: 400;
    line-height: 200%;

    margin: 15px 0px;
`;

const Item = styled(Link)`
    display: inline-block;
    width: 100%;

    color: black;
    font-size: 15px;
    font-weight: 400;
    line-height: 100%;

    text-decoration: none;

    padding: 11px;
    margin-top: -11px;
    margin-bottom: 11px;

    cursor: pointer;
    transition: all 100ms;

    border-radius: 3px;

    &:hover {
        background-color: rgba(0, 0, 0, 0.07);
    }
`;

const Heading = styled(Item)`
    font-weight: 800;

    margin-bottom: 10px;

    &:hover {
        background-color: transparent;
    }
`;