import Link from "next/link";
import styled from "styled-components";

export default function Logo() {

    return (
        <Container href="/">
            <Bold>Agent</Bold>Lang
        </Container>
    )
}

const Container = styled(Link)`
  color: white;
  font-size: 20px;
  font-weight: 200;
  line-height: 100%;
  text-decoration: none;
`;

const Bold = styled.span`
    font-weight: 700;
`;