import {Button, ButtonOutline, Gradient, PageWrapper} from "@/src/components/Components.styles";
import styled from "styled-components";

export default function IntroView() {

    return (
        <Container>
            <PageWrapper>
                <Content>
                    <InfoPanel>
                        <Title>Agent-based<br />modeling from<br />a new <Gradient>perspective</Gradient></Title>
                        <Text>A brand new user-friendly programming language<br />designed to simulate agent-based models</Text>

                        <ButtonPanel>
                            <Button href="/sandbox">Try for free</Button>
                            <ButtonOutline href="/documentation">Documentation</ButtonOutline>
                        </ButtonPanel>
                    </InfoPanel>

                    <ImagePanel>
                        <ExampleImage src="/assets/example-3.png" />
                    </ImagePanel>
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

    //background-color: rgba(0, 0, 0, 0.1);
`;

const Content = styled.div`
    width: 100%;
    flex: 1;

    display: flex;
    flex-direction: row;
    align-items: center;

    padding: 50px 100px;
`;

const InfoPanel = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const Title = styled.h2`
    color: black;
    font-size: 55px;
    font-weight: 800;
    line-height: 120%;
`;

const Text = styled.p`
    color: gray;
    font-size: 17px;
    font-weight: 300;
    line-height: 180%;

    margin: 10px 0px 25px 0px;
`;

const ButtonPanel = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    gap: 10px;
`;

const ImagePanel = styled.div`
    flex: 1;

    padding: 20px 0px 20px 100px;
`;

const ExampleImage = styled.img`
    width: 100%;
`;