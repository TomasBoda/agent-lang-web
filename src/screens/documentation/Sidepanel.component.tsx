import styled from "styled-components";
import Link from "next/link";
import Head from "next/head";
import { Logo } from "@/src/components/logo";

export default function SidePanel() {

    return (
        <Container>
            <LogoContainer>
                <Logo />
            </LogoContainer>

            <Section>
                <HeadingItem href="/documentation/introduction">Introduction</HeadingItem>
                <Item href="/documentation/introduction/what-is-agent-lang">What is AgentLang</Item>
                <Item href="/documentation/introduction/agent-based-modeling">Agent-based modeling</Item>
                <Item href="/documentation/introduction/installation-and-usage">Installation and Usage</Item>
            </Section>

            <Section>
                <HeadingItem href="/documentation/software-specification">Software Specification</HeadingItem>
                <Item href="/documentation/software-specification/project-description">Project Description</Item>
                <Item href="/documentation/software-specification/technologies">Technologies</Item>
                <Item href="/documentation/software-specification/aim-of-the-project">Aim of the Project</Item>
                <Item href="/documentation/software-specification/main-functionality">Main Functionality</Item>
            </Section>
            
            <Section>
                <HeadingItem href="/documentation/language-design">Language Design</HeadingItem>
                <Item href="/documentation/language-design/data-types">Data Types</Item>
                <Item href="/documentation/language-design/properties">Properties</Item>
                <Item href="/documentation/language-design/agents">Agents</Item>
                <Item href="/documentation/language-design/conditional-expressions">Conditional Expressions</Item>
                <Item href="/documentation/language-design/built-in-functions">Built-in Functions</Item>
            </Section>

            <Section>
                <HeadingItem href="/documentation/code-sandbox">Code Sandbox</HeadingItem>
                <Item href="/documentation/code-sandbox/code-editor">Code Editor</Item>
                <Item href="/documentation/code-sandbox/table-editor">Table Editor</Item>
                <Item href="/documentation/code-sandbox/visualisation">Visualisation</Item>
            </Section>
        </Container>
    )
}

const Container = styled.div`
    width: 260px;

    padding-right: 60px;

    display: grid;
    grid-template-columns: auto;
    gap: 15px;

    border-right: 1px solid rgba(255, 255, 255, 0.2);

    position: fixed;
    left: 100px;
    top: 0px;

    padding: 50px 0px 50px 0px;

    height: calc(100vh);
    overflow: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const LogoContainer = styled.div`
    margin-bottom: 15px;
`;

const Section = styled.div`
    display: grid;
    grid-template-columns: auto;
`;

const Item = styled(Link)`
    display: inline-block;

    color: rgba(255, 255, 255, 0.6);
    font-size: 13px;
    font-weight: 300;
    line-height: 100%;

    text-decoration: none;

    padding: 8px 10px;
    margin-left: -10px;

    cursor: pointer;
    transition: all 100ms;

    border-radius: 3px;

    &:hover {
        background-color: rgba(0, 0, 0, 0.07);
    }
`;

const HeadingItem = styled(Item)`
    color: white;
    font-size: 15px;
    font-weight: 700;

    margin-bottom: 5px;

    &:hover {
        background-color: transparent;
    }
`;