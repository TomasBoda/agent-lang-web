import {Button, ButtonOutline, Gradient, PageWrapper} from "@/src/components/Components.styles";
import Link from "next/link";
import styled from "styled-components";
import IntroView from "@/src/screens/landing/views/Intro.view";
import ContactView from "@/src/components/Contact.view";

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