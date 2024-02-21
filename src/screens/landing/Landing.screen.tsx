import styled from "styled-components";
import Link from "next/link";
import { Button } from "@/src/components/button";
import { Logo } from "@/src/components/logo";

export default function LandingScreen() {

    return (
        <Container>
            <Left>
                <LogoContainer>
                  <Logo />
                </LogoContainer>

                <Title>
                  Agent-based<br /><span style={{ color: "#034078", fontWeight: 700 }}>modeling</span> <span style={{ color: "#034078", fontWeight: 300 }}>from<br />a new</span> perspective
                </Title>
            
                <Credits>
                  Made by <Redirect href="https://tomasboda.dev">Tomas Boda</Redirect>
                </Credits>
            </Left>

            <Right>
                <Heading>Get started</Heading>
                
                <ButtonPanel>
                    <Button size="large" href="/sandbox">Try for free</Button>
                    <Button size="large" href="/documentation">Documentation</Button>
                </ButtonPanel>

                <Link href="https://github.com/TomasBoda/agent-lang">
                    <Icon src="/assets/logo-github-white.svg" />
                </Link>
            </Right>
        </Container>
    )
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  
  display: flex;
`;

const Left = styled.div`
  flex: 1;
  
  position: relative;
  
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  
  padding: 50px;
  
  background-color: #0A1128;
`;

const LogoContainer = styled.div`
    position: absolute;
    left: 0;
    top: 0;

    margin: 30px 50px;
`;

const Credits = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;

  margin: 30px 50px;

  color: white;
  font-size: 12px;
  font-weight: 400;

  opacity: 0.8;
`;

const Redirect = styled(Link)`
  color: white;

  &:hover {
    text-decoration-style: wavy;
  }
`;

const Title = styled.h1`
  color: white;
  font-size: 55px;
  font-weight: 600;
  line-height: 140%;
`;

const Right = styled.div`
  width: 550px;
  
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  
  padding: 50px;
  
  background-color: black;
`;

const Heading = styled.h2`
  color: white;
  font-size: 40px;
  font-weight: 400;
  
  margin-bottom: 20px;
`;

const ButtonPanel = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 15px;
`;

const Icon = styled.img`
    color: white;

    width: 30px;
    height: 30px;
  
    margin-top: 35px;
  
    cursor: pointer;
`;