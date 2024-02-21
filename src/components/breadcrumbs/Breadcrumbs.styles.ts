import Link from "next/link";
import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const Item = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const Label = styled(Link)`
    display: inline-block;

    color: rgba(255, 255, 255, 0.5);
    font-size: 12px;
    font-weight: 400;
    line-height: 100%;

    text-decoration: none;
    transition: all 150ms;

    &:hover {
        color: white;
    }
`;

export const Slash = styled.span`
    color: rgba(255, 255, 255, 0.5);
    font-size: 10px;
    font-weight: 400;
    line-height: 100%;

    margin: 0px 5px;
`;