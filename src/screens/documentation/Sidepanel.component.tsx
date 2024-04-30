import styled from "styled-components";
import Link from "next/link";
import { Logo } from "@/src/components/logo";
import { documentation } from "@/src/documentation/documentation";

export default function SidePanel() {

    return (
        <Container>
            <Content>
                <LogoContainer>
                    <Logo />
                </LogoContainer>

                {documentation.map(({ header, items }) =>
                    <Section>
                        <HeadingItem href={header.slug}>{header.label}</HeadingItem>
                        {items.map(item =>
                            <Item href={item.slug}>{item.label}</Item>    
                        )}
                    </Section>    
                )}
            </Content>
        </Container>
    )
}

const Container = styled.div`
    width: 260px;

    padding-right: 60px;

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

const Content = styled.div`
    width: 100%;
    height: auto;

    display: grid;
    grid-template-columns: auto;
    gap: 15px;
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