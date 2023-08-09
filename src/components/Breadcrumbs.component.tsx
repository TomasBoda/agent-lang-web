import { Breadcrumb } from "@/pages/documentation/[...slug]";
import Link from "next/link";
import styled from "styled-components";

export default function Breadcrumbs({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) {

    return (
        <Container>
            {breadcrumbs.map((item: Breadcrumb, index: number) => (
                <Item>
                    <Label href={item.path}>{item.title}</Label>
                    {index !== breadcrumbs.length - 1 && <Slash>/</Slash>}
                </Item>
            ))}
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Item = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Label = styled(Link)`
    display: inline-block;

    color: rgba(0, 0, 0, 0.5);
    font-size: 12px;
    font-weight: 400;
    line-height: 100%;

    text-decoration: none;
    transition: all 150ms;

    &:hover {
        color: black;
    }
`;

const Slash = styled.span`
    color: rgba(0, 0, 0, 0.5);
    font-size: 10px;
    font-weight: 400;
    line-height: 100%;

    margin: 0px 5px;
`;