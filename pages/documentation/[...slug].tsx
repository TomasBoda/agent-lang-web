'use client'

import fs from 'fs';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import Head from "next/head";
import DocumentationScreen from '@/src/screens/documentation/Documentation.screen';

export interface DocumentContent {
    title: string;
    html: string;
    breadcrumbs: Breadcrumb[];
}

export interface Document {
    title: string;
    path: string;
    document: string;
}

const documents: Document[] = [
    {
        title: "Introduction",
        path: "introduction",
        document: "documentation/introduction/introduction.md",
    },
    {
        title: "What is AgentLang",
        path: "introduction/what-is-agent-lang",
        document: "documentation/introduction/what-is-agent-lang.md",
    },
    {
        title: "Agent-based modeling",
        path: "introduction/agent-based-modeling",
        document: "documentation/introduction/agent-based-modeling.md",
    },
    {
        title: "Installation and Usage",
        path: "introduction/installation-and-usage",
        document: "documentation/introduction/installation-and-usage.md",
    },
    // -------------------------------------------------------------------
    {
        title: "Software Specification",
        path: "software-specification",
        document: "documentation/software-specification/software-specification.md"
    },
    {
        title: "Project Description",
        path: "software-specification/project-description",
        document: "documentation/software-specification/project-description.md",
    },
    {
        title: "Technologies",
        path: "software-specification/technologies",
        document: "documentation/software-specification/technologies.md",
    },
    {
        title: "Aim of the Project",
        path: "software-specification/aim-of-the-project",
        document: "documentation/software-specification/aim-of-the-project.md",
    },
    {
        title: "Main Functionality",
        path: "software-specification/main-functionality",
        document: "documentation/software-specification/main-functionality.md",
    },
    // -------------------------------------------------------------------
    {
        title: "Language Design",
        path: "language-design",
        document: "documentation/language-design/language-design.md"
    },
    {
        title: "Data Types",
        path: "language-design/data-types",
        document: "documentation/language-design/data-types.md",
    },
    {
        title: "Properties",
        path: "language-design/properties",
        document: "documentation/language-design/properties.md",
    },
    {
        title: "Agents",
        path: "language-design/agents",
        document: "documentation/language-design/agents.md",
    },
    {
        title: "Conditional Expressions",
        path: "language-design/conditional-expressions",
        document: "documentation/language-design/conditional-expressions.md",
    },
    {
        title: "Built-in Functions",
        path: "language-design/built-in-functions",
        document: "documentation/language-design/built-in-functions.md",
    },
    // -------------------------------------------------------------------
    {
        title: "Code Sandbox",
        path: "code-sandbox",
        document: "documentation/code-sandbox/code-sandbox.md"
    },
    {
        title: "Main Features",
        path: "code-sandbox/main-features",
        document: "documentation/code-sandbox/main-features.md"
    },
    {
        title: "Code Editor",
        path: "code-sandbox/code-editor",
        document: "documentation/code-sandbox/code-editor.md"
    },
    {
        title: "Table Editor",
        path: "code-sandbox/table-editor",
        document: "documentation/code-sandbox/table-editor.md"
    },
    {
        title: "Visualisation",
        path: "code-sandbox/visualisation",
        document: "documentation/code-sandbox/visualisation.md"
    },
]

export default function DocumentationSubPage({ content }: { content: DocumentContent }) {

    return (
        <div>
            <Head>
                <title>{content.title} | Documentation</title>
            </Head>

            <DocumentationScreen markdown={content.html} breadcrumbs={content.breadcrumbs} />
        </div>
    )
}

function findDocument(slugPath: string): Document | undefined {
    for (const document of documents) {
        if (document.path === slugPath) {
            return document;
        }
    }

    return undefined;
}

export interface Breadcrumb {
    title: string;
    path: string;
}

function getBreadcrumbs(slugs: string[]): Breadcrumb[] {
    const breadcrumbs: Breadcrumb[] = [];

    for (let i = 0; i < slugs.length; i++) {
        const path = slugs.slice(0, i + 1).join("/");
        const doc = findDocument(path);

        if (doc !== undefined) {
            breadcrumbs.push({
                title: doc.title,
                path: "/documentation/" + doc.path
            });
        }
    }

    return breadcrumbs;
}

export async function getServerSideProps({ query, params }: { query: any, params: any }) {
    const slugs = params.slug;
    const slugPath = slugs.join("/");

    const document: Document | undefined = findDocument(slugPath) ?? documents[0];
    const breadcrumbs: Breadcrumb[] = getBreadcrumbs(slugs);
  
    try {
      const fileContents = fs.readFileSync(document.document, 'utf8');
      const { content } = matter(fileContents);
  
      // Parse Markdown to HTML
      const result = await unified()
        .use(remarkParse)
        .use(remarkHtml)
        .process(content);
  
      return {
        props: {
          content: {
            title: document.title,
            html: result.toString(),
            breadcrumbs
        },
        },
      };
    } catch (error) {
      return {
        props: {
            content: {
                title: "",
                html: "",
                breadcrumbs: []
            },
        },
      };
    }
}