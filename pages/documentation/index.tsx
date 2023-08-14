'use client'

import fs from 'fs';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import DocumentationScreen from "@/src/screens/documentation/Documentation.screen"
import Head from "next/head"

export default function DocumentationPage({ content }: { content: string }) {
  return (
    <>
      <Head>
        <title>Documentation | AgentLang Hub</title>
      </Head>
    </>
  )
}

export async function getServerSideProps() {
  return { redirect: { permanent: false, destination: "/documentation/introduction" }, props: {} };    
}
