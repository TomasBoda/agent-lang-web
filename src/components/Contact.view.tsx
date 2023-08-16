import {Button, ButtonOutline, Gradient, GradientBackground, PageWrapper} from "@/src/components/Components.styles";
import styled from "styled-components";

export default function ContactView() {

    return (
        <Container>
            <PageWrapper>
                <Content>
                    <Title>Shoot us a message</Title>
                    <Text>Write us a message in case you need help with setting up AgentLang in your<br />environment or wish to contribute to the AgentLang community.</Text>

                    <ButtonPanel>
                        <Button color="white" href="">Contact</Button>
                        <ButtonOutline color="white" href="">Get Help</ButtonOutline>
                    </ButtonPanel>
                </Content>
            </PageWrapper>
        </Container>
    )
}

const Container = styled(GradientBackground)`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Content = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 100px;
`;

const Title = styled.h2`
    color: white;
    font-size: 45px;
    font-weight: 800;
    line-height: 120%;
`;

const Text = styled.p`
    color: rgba(255, 255, 255, 0.7);
    font-size: 18px;
    font-weight: 300;
    line-height: 150%;
    text-align: center;

    margin: 30px 0;
`;

const ButtonPanel = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    gap: 10px;
`;