import styled from "styled-components";
import { useViewService } from "../services";
import { useEffect, useState } from "react";

export default function Toolbar() {

    const [view, setView] = useState(0);
    const viewService = useViewService();
    const views: string[] = [ "Code", "Spreadsheet", "Visualisation" ];

    useEffect(() => {
        console.log(viewService);
        viewService?.getView().subscribe(data => setView(data));
    }, [viewService]);

    function changeView(view: number): void {
        viewService?.setView(view);
    }

    return (
        <Container>
            {views.map((item, index) =>
                <Item $selected={index === view} onClick={() => changeView(index)}>{item}</Item>
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