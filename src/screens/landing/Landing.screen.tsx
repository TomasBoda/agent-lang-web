import styled from "styled-components";
import IntroView from "@/src/screens/landing/views/Intro.view";

export default function LandingScreen() {

    return (
        <Container>
            <IntroView />
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
`;