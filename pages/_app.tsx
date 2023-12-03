import Layout from "@/src/components/Layout.component";
import StyledComponentsRegistry from "@/src/lib/registry";
import type { AppProps } from "next/app";
import Head from "next/head";

import "@/styles/app.css";
import "@/styles/font.css";
import "@/styles/code.css";
import "@/styles/documentation.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StyledComponentsRegistry>
        <Head>
          <script src="https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js"></script>
        </Head>
        <Layout>
            <Component {...pageProps} />
        </Layout>
    </StyledComponentsRegistry>
  )
}
