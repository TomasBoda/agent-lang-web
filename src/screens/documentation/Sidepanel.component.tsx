import styled from "styled-components";
import Link from "next/link";

export default function SidePanel() {

    return (
        <Container>
            <Section>
                <HeadingItem href="">Introduction</HeadingItem>
                <Item href="">Agent-based Modeling</Item>
                <Item href="">Installation</Item>
                <Item href="">Usage</Item>
            </Section>

            <Section>
                <HeadingItem href="">Software Specification</HeadingItem>
                <Item href="">Aim of the Project</Item>
                <Item href="">Main Functionality</Item>
                <Item href="">Interpreter</Item>
            </Section>
            
            <Section>
                <HeadingItem href="">Language Design</HeadingItem>
                <Item href="">Agents</Item>
                <Item href="">Datatypes</Item>
                <Item href="">Variables</Item>
                <Item href="">Conditional Statements</Item>
                <Item href="">Standard Library</Item>
            </Section>

            <Section>
                <HeadingItem href="">Code Sandbox</HeadingItem>
                <Item href="">Main Features</Item>
                <Item href="">Usage</Item>
                <Item href="">Visualisation</Item>
            </Section>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;

    position: sticky;
    top: 50px;

    padding-right: 60px;

    display: grid;
    grid-template-columns: auto;
    gap: 15px;

    border-right: 1px solid lightgray;
`;

const Section = styled.div`
    display: grid;
    grid-template-columns: auto;
`;

const Item = styled(Link)`
    display: inline-block;

    color: black;
    font-size: 13px;
    font-weight: 400;
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
    font-size: 15px;
    font-weight: 800;

    margin-bottom: 5px;

    &:hover {
        background-color: transparent;
    }
`;