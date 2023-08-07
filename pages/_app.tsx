import Layout from "@/src/components/Layout.component";
import StyledComponentsRegistry from "@/src/lib/registry";
import "@/styles/app.css";
import type { AppProps } from "next/app";
import Head from "next/head";

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
