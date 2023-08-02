import Link from "next/link";
import styled from "styled-components";

export const PageContainer = styled.div`
    width: 100vw;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const PageWrapper = styled.div`
    width: 100%;
    max-width: 1200px;
`;

export const Button = styled(Link)`
    color: white;
    font-size: 13px;
    font-weight: 500;
    line-height: 100%;

    text-decoration: none;

    padding: 12px 20px;

    border-radius: 3px;

    cursor: pointer;
    transition: all 100ms;
    border: 2px solid transparent;

    background-color: black;

    &:hover {
        color: black;
        background-color: white;
        border: 2px solid black;
    }
`;

export const ButtonOutline = styled(Button)`
    color: black;
    background-color: white;
    border: 2px solid black;
`;

export const Gradient = styled.span`
    background: -webkit-linear-gradient(-70deg, #2188ff 0%, #804eda 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
`;