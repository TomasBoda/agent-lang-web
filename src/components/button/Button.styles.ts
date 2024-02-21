import styled from "styled-components";
import { ButtonSizeType } from "./Button.component";
import Link from "next/link";

export const PlainButton = styled.div<{ $size: ButtonSizeType }>`
    display: inline-block;

    color: white;
    font-size: ${props => props.$size === "small" ? "10px" : "13px"};
    font-weight: 500;
    line-height: 100%;

    text-decoration: none;

    padding: 15px 30px;
    padding: ${props => props.$size === "small" ? "8px 16px" : "15px 30px"};

    border-radius: 5px;

    cursor: pointer;
    transition: all 100ms;
    border: 2px solid transparent;

    background-color: #DE3C4B;

    &:hover {
        background-color: #b02c3a;
    }
`;

export const LinkButton = styled(Link)<{ $size: ButtonSizeType }>`
    display: inline-block;

    color: white;
    font-size: ${props => props.$size === "small" ? "10px" : "13px"};
    font-weight: 500;
    line-height: 100%;

    text-decoration: none;

    padding: 15px 30px;
    padding: ${props => props.$size === "small" ? "8px 16px" : "15px 30px"};

    border-radius: 5px;

    cursor: pointer;
    transition: all 100ms;
    border: 2px solid transparent;

    background-color: #DE3C4B;

    &:hover {
        background-color: #b02c3a;
    }
`;