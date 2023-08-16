import styled, { keyframes } from "styled-components";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {GradientBackground} from "@/src/components/Components.styles";

export default function Transition() {

    const router = useRouter();

    useEffect(() => {
        router.events.on('routeChangeStart', handleRouteChangeStart);
        router.events.on('routeChangeComplete', handleRouteChangeComplete);

        updateTransitionPosition();

        return () => {
            router.events.off('routeChangeStart', handleRouteChangeStart);
            router.events.off('routeChangeComplete', handleRouteChangeComplete);
        };
    }, []);

    const handleRouteChangeStart = (url: string): void => {
        showTransition();
    }

    const handleRouteChangeComplete = (url: string): void => {
        setTimeout(hideTransition, 100);
        //hideTransition();
    }

    function updateTransitionPosition(): void {
        let header = document.getElementById("header");
        let transition = document.getElementById("transition");

        if (!header || !transition) {
            return;
        }

        const height = header.offsetHeight;
        transition.style.top = height + 21 + "px";
    }

    return (
        <Container id="transition">
            <Progress />
        </Container>
    )
}

export function showTransition(): void {
    let transition = document.getElementById("transition");

    if (!transition) {
        return;
    }

    transition.style.display = "inline-block";
}

export function hideTransition(): void {
    let transition = document.getElementById("transition");

    if (!transition) {
        return;
    }

    transition.style.display = "none";
}

const Container = styled.div`
    position: fixed;
    left: 0;
    top: 0;

    width: 100vw;
    height: 3px;

    z-index: 200;
  
    overflow: hidden;
  
    display: none;
`;

const animation = keyframes`
    0% {
      transform:  translateX(0) scaleX(0);
    }
    40% {
      transform:  translateX(0) scaleX(0.3);
    }
    100% {
      transform:  translateX(100%) scaleX(0.5);
    }
`;

const Progress = styled.div`
    width: 100%;
    height: 100%;
  
    animation: ${animation} 700ms infinite linear;
    transform-origin: 0 50%;

    background-color: #2188ff;
`;