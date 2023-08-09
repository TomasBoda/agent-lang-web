import { styled } from "styled-components";
import SidePanel from "./Sidepanel.component";
import { Breadcrumb } from "@/pages/documentation/[...slug]";
import Breadcrumbs from "@/src/components/Breadcrumbs.component";

export default function DocumentationScreen({ markdown, breadcrumbs }: { markdown: string, breadcrumbs: Breadcrumb[] }) {

    return (
        <Container>
            <SidePanel />
            <Content>
                <Breadcrumbs breadcrumbs={breadcrumbs} />
                <HTML className="markdown" dangerouslySetInnerHTML={{ __html: markdown }} />
            </Content>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;

    display: grid;
    grid-template-columns: auto 1fr;
    gap: 50px;

    align-items: start;

    padding: 50px 0px;
`;

const Content = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const HTML = styled.div`
    margin-top: 30px;
`;