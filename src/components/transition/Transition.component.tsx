import { useRouter } from "next/router";
import { useEffect } from "react";
import { Container, Progress } from "./Transition.styles";

export function Transition() {

    const router = useRouter();
    let previousUrl = "";

    useEffect(() => {
        router.events.on("routeChangeStart", handleRouteChangeStart);
        router.events.on("routeChangeComplete", handleRouteChangeComplete);

        return () => {
            router.events.off("routeChangeStart", handleRouteChangeStart);
            router.events.off("routeChangeComplete", handleRouteChangeComplete);
        };
    }, []);

    const handleRouteChangeStart = (url: string): void => {
        if (url === previousUrl) {
            return;
        }

        previousUrl = url;
        showTransition();
    }

    const handleRouteChangeComplete = (url: string): void => {
        setTimeout(hideTransition, 100);
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