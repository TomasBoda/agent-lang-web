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

export const Spacer = styled.div`
    flex: 1;
`;