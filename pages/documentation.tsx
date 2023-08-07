'use client'

import fs from 'fs';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import DocumentationScreen from "@/src/screens/documentation/Documentation.screen"
import Head from "next/head"

export default function MainPage({ content }: { content: string }) {
  return (
    <>
      <Head>
        <title>Documentation | AgentLang Hub</title>
      </Head>
      
      <DocumentationScreen markdown={content} />
    </>
  )
}

export async function getStaticProps() {
    // Replace 'sample.md' with the actual filename of your Markdown file.
    const markdownFilePath = "DOCUMENTATION.md";
  
    try {
      const fileContents = fs.readFileSync(markdownFilePath, 'utf8');
      const { content } = matter(fileContents);
  
      // Parse Markdown to HTML
      const result = await unified()
        .use(remarkParse)
        .use(remarkHtml)
        .process(content);
  
      return {
        props: {
          content: result.toString(),
        },
      };
    } catch (error) {
      console.error('Error reading Markdown file:', error);
      return {
        props: {
          content: '',
        },
      };
    }
  }
