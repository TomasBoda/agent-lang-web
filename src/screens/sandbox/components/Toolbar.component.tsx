import styled from "styled-components";

export default function Toolbar({ view, setView }: { view: number, setView: (view: number) => void }) {

    const views: string[] = [ "Code", "Spreadsheet", "Visualisation" ];

    return (
        <Container>
            {views.map((item, index) =>
                <Item $selected={index === view} onClick={() => setView(index)}>{item}</Item>
            )}
        </Container>
    )
}

const Container = styled.div`
    width: 100%;

    display: grid;
    grid-template-columns: auto auto auto;
    justify-content: flex-start;
    align-items: center;

    padding: 0px 15px;

    border-bottom: 1px solid rgb(30, 30, 30);
`;

const Item = styled.div<{ $selected: boolean }>`
    color: white;
    font-size: 12px;
    font-weight: 500;
    
    padding: 10px;

    cursor: pointer;

    border-top: 2px solid transparent;
    border-bottom: ${props => props.$selected ? "2px solid white" : "2px solid transparent"};
`;