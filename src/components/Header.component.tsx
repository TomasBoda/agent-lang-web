import { styled } from "styled-components"
import { Button, PageWrapper } from "./Components.styles";
import Link from "next/link";
import Transition from "@/src/components/Transition.component";

export default function Header() {

    return (
        <Container id="header">
            <Wrapper>
                <PageWrapper>
                    <Content>
                        <Logo href="/">Agent<Thin>Lang</Thin></Logo>

                        <Menu>
                            <Item href="/">Home</Item>
                            <Item href="/documentation">Documentation</Item>
                            <Item href="mailto: tominoboda@gmail.com">Contact</Item>
                            <Item href="https://github.com/TomasBoda/agent-lang-interpreter">
                                <Icon src="/assets/logo-github.svg" />
                            </Item>
                            <HeaderButton href="/sandbox">Try for free</HeaderButton>
                        </Menu>
                    </Content>
                </PageWrapper>

                <Transition />
            </Wrapper>
        </Container>
    )
}

const Container = styled.div`
    position: fixed;
    left: 0;
    top: 0;
  
    z-index: 100;
  
    width: 100%;

    border-bottom: 1px solid lightgray;
    background-color: white;
`;

const Wrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  
  width: 100%;
`;

const Content = styled.div`
    width: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    padding: 10px 100px;
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