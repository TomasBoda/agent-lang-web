import { styled } from "styled-components";
import CodeView from "./views/code/Code.view";
import VisualisationView from "./views/visualisation/Visualisation.view";

export default function MainScreen() {

    return (
        <Container>
            <CodeView />
            <VisualisationView />
        </Container>
    )
}

const Container = styled.div`
    width: 100%;

    display: grid;
    grid-template-columns: 1fr 1fr;
`;