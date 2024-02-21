import styled, { keyframes } from "styled-components";

export const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
  
    width: 100vw;
    height: 3px;

    z-index: 200;
  
    overflow: hidden;
  
    display: none;
`;

export const animation = keyframes`
    0% {
      transform:  translateX(0) scaleX(0);
    }
    40% {
      transform:  translateX(0) scaleX(0.3);
    }
    100% {
      transform:  translateX(100%) scaleX(0.5);
    }
`;

export const Progress = styled.div`
    width: 100%;
    height: 100%;
  
    animation: ${animation} 700ms infinite linear;
    transform-origin: 0 50%;

    background-color: #DE3C4B;
`;