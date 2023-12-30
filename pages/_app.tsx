import Layout from "@/src/components/Layout.component";
import StyledComponentsRegistry from "@/src/utils/registry";
import type { AppProps } from "next/app";
import Head from "next/head";

import "@/styles/app.css";
import "@/styles/font.css";
import "@/styles/code.css";
import "@/styles/documentation.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StyledComponentsRegistry>
        <Layout>
            <Component {...pageProps} />
        </Layout>
    </StyledComponentsRegistry>
  )
}
