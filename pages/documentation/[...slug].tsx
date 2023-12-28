'use client'

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import Head from "next/head";
import DocumentationScreen from '@/src/screens/documentation/Documentation.screen';
import { Breadcrumb, DocumentContent, Document, documents, findDocument, getBreadcrumbs } from "@/src/lib/documentation";

export default function DocumentationSubPage({ document }: { document: DocumentContent }) {
    return (
        <>
            <Head>
                <title>{document.title} | Documentation</title>
            </Head>

            <DocumentationScreen
                html={document.html}
                breadcrumbs={document.breadcrumbs}
            />
        </>
    )
}

export async function getServerSideProps({ params }: { params: any }) {
    const slugs = params.slug;
    const slugPath = slugs.join("/");

    const document: Document = findDocument(slugPath) ?? documents[0];
    const breadcrumbs: Breadcrumb[] = getBreadcrumbs(slugs);

    try {
        const documentPath = path.join(process.cwd(), "public", document.document);
        const file = fs.readFileSync(documentPath, "utf8");
        const { content } = matter(file);

        const result = await unified().use(remarkParse).use(remarkHtml).process(content);
        const documentContent: DocumentContent = {
            title: document.title,
            html: result.toString(),
            breadcrumbs
        };

        return {
            props: {
                document: documentContent,
            },
        };
    } catch (error) {
        return { redirect: { permanent: false, destination: "/" }, props: {} };
    }
}