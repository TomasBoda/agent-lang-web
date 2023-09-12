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

export const ButtonContrast = styled(Link)`
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

export const Button = styled(Link)`
    display: inline-block;

    color: ${props => props.color === "white" ? "black" : "white"};
    font-size: 13px;
    font-weight: 500;
    line-height: 100%;

    text-decoration: none;

    padding: 12px 20px;

    border-radius: 3px;

    cursor: pointer;
    transition: all 100ms;
    border: 2px solid transparent;

    background-color: ${props => props.color === "white" ? "white" : "black"};

    &:hover {
        color: ${props => props.color === "white" ? "white" : "black"};
        background-color: transparent;
        border: 2px solid ${props => props.color === "white" ? "white" : "black"};
    }
`;

export const ButtonOutline = styled(Button)`
    color: ${props => props.color === "white" ? "white" : "black"};
    background-color: transparent;
    border: 2px solid ${props => props.color === "white" ? "white" : "black"};

  &:hover {
    background-color: transparent;
  }
`;

export const GradientBackground = styled.div`
  background: -webkit-linear-gradient(-70deg, #2188ff 0%, #804eda 100%);
`;

export const Gradient = styled(GradientBackground)`
    display: inline-block;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
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