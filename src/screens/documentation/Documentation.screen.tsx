import { styled } from "styled-components";
import SidePanel from "./Sidepanel.component";
import { Breadcrumb } from "@/pages/documentation/[...slug]";
import Breadcrumbs from "@/src/components/Breadcrumbs.component";
import {PageWrapper} from "@/src/components/Components.styles";

export default function DocumentationScreen({ markdown, breadcrumbs }: { markdown: string, breadcrumbs: Breadcrumb[] }) {

    return (
        <Container>
            <PageWrapper>
                <Content>
                    <SidePanel />
                    <DocsPage>
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                        <HTML className="markdown" dangerouslySetInnerHTML={{ __html: markdown }} />
                    </DocsPage>
                </Content>
            </PageWrapper>
        </Container>
    )
}

const Container = styled.div`
  width: 100%;
    
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: auto 1fr;
  gap: 50px;

  align-items: start;

  padding: 50px 100px;
`;

const DocsPage = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const HTML = styled.div`
    margin-top: 30px;
`;