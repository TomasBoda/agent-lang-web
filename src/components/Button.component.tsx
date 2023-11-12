import Link from "next/link";
import styled, { css } from "styled-components";

type ButtonSizeType = "small" | "large";

export default function Button({ children, size, href, onClick }: { children: any, size: ButtonSizeType, href?: string, onClick?: () => void }) {

    if (href) {
        return <LinkButton $size={size} href={href} onClick={onClick}>{children}</LinkButton>;
    }

    return <PlainButton $size={size} onClick={onClick}>{children}</PlainButton>;
}

const PlainButton = styled.div<{ $size: ButtonSizeType }>`
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

const LinkButton = styled(Link)<{ $size: ButtonSizeType }>`
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