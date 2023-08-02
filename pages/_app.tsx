import Layout from "@/src/components/Layout.component";
import StyledComponentsRegistry from "@/src/lib/registry";
import "@/styles/app.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StyledComponentsRegistry>
        <Layout>
            <Component {...pageProps} />
        </Layout>
    </StyledComponentsRegistry>
  )
}
