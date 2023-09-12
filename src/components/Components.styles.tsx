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
    max-width: 1500px;
`;

export const Button = styled(Link)`
  display: inline-block;

  color: white;
  font-size: 13px;
  font-weight: 500;
  line-height: 100%;

  text-decoration: none;

  padding: 15px 30px;

  border-radius: 5px;

  cursor: pointer;
  transition: all 100ms;
  border: 2px solid transparent;

  background-color: #DE3C4B;

  &:hover {
    background-color: #b02c3a;
  }
`;

export const InputField = styled.input`
    color: white;
    font-size: 13px;
    font-weight: 400;
    line-height: 100%;

    padding: 7px;

    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    outline: none;

    border-radius: 3px;

    &:disabled {
        cursor: not-allowed;
    }
`;