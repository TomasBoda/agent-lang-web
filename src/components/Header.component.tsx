import { styled } from "styled-components"
import { Button, Gradient, PageWrapper } from "./Components.styles";
import Link from "next/link";

export default function Header() {

    return (
        <Container>
            <PageWrapper>
                <Content>
                    <Logo href="/">Agent<Thin>Lang</Thin></Logo>
                
                    <Menu>
                        <Item href="/">Home</Item>
                        <Item href="/">Documentation</Item>
                        <Item href="/">About</Item>
                        <Item href="/">
                            <Icon src="/assets/logo-github.svg" />
                        </Item>
                        <HeaderButton href="/sandbox">Try for free</HeaderButton>
                    </Menu>
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

    border-bottom: 1px solid lightgray;
    background-color: white;
`;

const Content = styled.div`
    width: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    padding: 10px;
`;

const Logo = styled(Link)`
    color: black;
    font-size: 20px;
    font-weight: 700;
    line-height: 100%;

    text-decoration: none;
`;

const Thin = styled.span`
    font-weight: 400;
`;

const Menu = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Item = styled(Link)`
    color: black;
    font-size: 14px;
    font-weight: 400;
    line-height: 100%;

    text-decoration: none;

    padding: 12px 15px;
    margin: 0px 3px;

    cursor: pointer;
    transition: all 100ms;

    border-radius: 3px;

    &:hover {
        background-color: rgba(0, 0, 0, 0.07);
    }
`;

const Icon = styled.img`
    color: black;

    width: 22px;
    height: 22px;

    margin: -5px;
`;

const HeaderButton = styled(Button)`
    margin-left: 15px;
`;