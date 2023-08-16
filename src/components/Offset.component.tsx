import {useEffect} from "react";
import styled from "styled-components";

export default function Offset() {

    useEffect(() => {
        updateHeaderOffset();
    }, []);

    function updateHeaderOffset(): void {
        let header = document.getElementById("header");
        let offset = document.getElementById("offset");

        if (!header || !offset) {
            return;
        }

        const height = header.offsetHeight;
        offset.style.height = height + 21 + "px";
    }

    return (
        <Container id="offset" />
    )
}

const Container = styled.div`
  display: inline-block;
  width: 100%;
  height: 0;
`;