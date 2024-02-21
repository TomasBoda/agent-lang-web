import styled from "styled-components";

export const Container = styled.div`
    position: fixed;
    left: calc(50vw - 200px);
    bottom: 30px;

    width: 400px;

    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 15px;
    align-items: center;

    padding: 15px;

    border-radius: 5px;
    background-color: black;

    transition: all 500ms;

    display: none;
`;

export const Icon = styled.img`
    width: 18px;
    height: 18px;
`;

export const Text = styled.div`
    color: white;
    font-size: 12px;
`;

export const IconClose = styled.img`
    width: 8px;
    height: 8px;

    cursor: pointer;
`;