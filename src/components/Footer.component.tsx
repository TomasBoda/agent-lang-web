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
                        <Button href="/sandbox" color="white">Try for free</Button>
                    </Column>

                    <span />

                    <Column>
                        <Heading href="/documentation">Documentation</Heading>
                        <Item href="/documentation">Introduction</Item>
                        <Item href="/documentation/software-specification">Software Specification</Item>
                        <Item href="/documentation/language-design">Language Design</Item>
                        <Item href="/documentation/code-sandbox">Code Sandbox</Item>
                    </Column>

                    <Column>
                        <Heading href="/sandbox">Code Sandbox</Heading>
                        <Item href="/documentation/code-sandbox/code-editor">Code Editor</Item>
                        <Item href="/documentation/code-sandbox/table-editor">Table Editor</Item>
                        <Item href="/documentation/code-sandbox/visualisation">Visualisation</Item>
                    </Column>
                        
                    <Column>
                        <Heading href="/about">About</Heading>
                        <Item href="/documentation/project-specification/aim-of-the-project">Aim of the project</Item>
                        <Item href="https://github.com/TomasBoda/agent-lang-interpreter">AgentLang GitHub</Item>
                        <Item href="mailto: tominoboda@gmail.com">Contact Us</Item>
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

    background-color: rgb(20, 20, 20);
`;

const Content = styled.div`
    width: 100%;

    display: grid;
    grid-template-columns: 270px 50px auto auto auto;
    gap: 50px;

    padding: 100px;
`;

const Column = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const Logo = styled(Link)`
    display: inline-block;

    color: white;
    font-size: 20px;
    font-weight: 700;
    line-height: 100%;

    text-decoration: none;
`;

const Thin = styled.span`
    font-weight: 300;
`;

const Description = styled.p`
    color: rgba(255, 255, 255, 0.5);
    font-size: 15px;
    font-weight: 300;
    line-height: 200%;

    margin: 20px 0;
`;

const Item = styled(Link)`
    display: inline-block;
    width: 100%;

    color: rgba(255, 255, 255, 0.5);
    font-size: 15px;
    font-weight: 300;
    line-height: 100%;

    text-decoration: none;

    padding: 11px;
    margin-top: -11px;
    margin-bottom: 11px;

    cursor: pointer;
    transition: all 100ms;

    border-radius: 3px;

    &:hover {
        color: white;
        background-color: rgba(0, 0, 0, 0.07);
    }
`;

const Heading = styled(Item)`
    color: white;
    font-weight: 800;

    margin-bottom: 15px;

    &:hover {
        background-color: transparent;
    }
`;