import { styled } from "styled-components";
import SidePanel from "./Sidepanel.component";
import { Breadcrumbs } from "@/src/components/breadcrumbs";
import { PageWrapper } from "@/src/components/Components.styles";
import { Breadcrumb } from "@/src/components/breadcrumbs";
import { useEffect, useState } from "react";
import { Language } from "@/src/language";
import { useRouter } from "next/router";

export default function DocumentationScreen({ html, breadcrumbs }: { html: string, breadcrumbs: Breadcrumb[] }) {

    const [loaded, setLoaded] = useState(false);
    const [content, setContent] = useState("");

    const router = useRouter();

    useEffect(() => {
        if (router.asPath === "/documentation/introduction/installation-and-usage") {
            setContent(html);
            setLoaded(true);
            return;
        }

        Language.initialize();
        
        const container = document.createElement("div");
        container.innerHTML = html;

        const blocks = container.querySelectorAll("pre");

        for (let i = 0; i < blocks.length; i++) {
            const code = blocks[i].innerText;
            blocks[i].innerHTML = Language.highlight(code);
        }

        setContent(container.innerHTML);
        setLoaded(true);
    }, [html]);

    return (
        <Container>
            <PageWrapper>
                <Content>
                    <SidePanel />
                    <DocsPage>
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                        {loaded && <HTML className="markdown" dangerouslySetInnerHTML={{ __html: content }} />}
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
  padding-left: 310px;

  position: relative;
`;

const DocsPage = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    padding-left: 100px;
`;

const HTML = styled.div`
    margin-top: 30px;
`;