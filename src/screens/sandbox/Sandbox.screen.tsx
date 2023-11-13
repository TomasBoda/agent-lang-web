import { styled } from "styled-components";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar.component";
import Editor from "./components/Editor.component";
import { CodeProvider, CodeService, StorageProvider, StorageService, ViewProvider, ViewService } from "./services";

import dynamic from "next/dynamic";
const Tour = dynamic(
  () => import("../../components/Tour.component"),
  { ssr: false }
);

export default function SandboxScreen() {

    const storageService = new StorageService();
    const codeService = new CodeService();
    const viewService = new ViewService();

    useEffect(() => {
        storageService.initialize();
    }, []);

    return (
        <StorageProvider storageService={storageService}>
            <CodeProvider codeService={codeService}>
                <ViewProvider viewService={viewService}>
                    <Tour />
                    <Container>
                        <Sidebar />
                        <Editor />
                    </Container>
                </ViewProvider>
            </CodeProvider>
        </StorageProvider>
    )
}

const Container = styled.div`
  width: 100vw;
  min-width: 100vw;
  max-width: 100vw;
  height: 100vh;
  min-height: 100vh;
  max-height: 100vh;

  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 15px;

  padding: 15px;

  background-color: black;
`;