
import Link from "next/link";
import styled from "styled-components";
import {Breadcrumb} from "@/src/utils/documentation";

export default function Breadcrumbs({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) {

    function isNotLast(index: number): boolean {
        return index !== breadcrumbs.length - 1;
    }

    return (
        <Container>
            {breadcrumbs.map((item: Breadcrumb, index: number) => (
                <Item key={index}>
                    <Label href={item.path}>{item.title}</Label>
                    {isNotLast(index) && <Divider />}
                </Item>
            ))}
        </Container>
    )
}

const Divider = () => {
    return <Slash>/</Slash>
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

const Slash = styled.span`
    color: rgba(255, 255, 255, 0.5);
    font-size: 10px;
    font-weight: 400;
    line-height: 100%;

    margin: 0px 5px;
`;