'use client'

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import DocumentationScreen from '@/src/screens/documentation/Documentation.screen';
import { Breadcrumb } from '@/src/components/breadcrumbs';
import { Header } from '@/src/components/header';
import { DocumentContent, DocumentEntry, DocumentItem, documentation, findDocument, findNextDocument, getBreadcrumbs, getDocuments } from '@/src/documentation/documentation';

export default function DocumentationSubPage({ document, nextDocument }: { document: DocumentContent; nextDocument: DocumentItem | undefined; }) {

    const { title, html, breadcrumbs } = document;

    return (
        <>
            <Header title={title + " | AgentLang"} />
            <DocumentationScreen html={html} breadcrumbs={breadcrumbs} nextDocument={nextDocument} />
        </>
    )
}

export async function getServerSideProps({ params }: { params: any }) {
    const slugs = params.slug;
    const slugPath = slugs.join("/");

    const documents = getDocuments(documentation);

    const document: DocumentItem = findDocument(documents, slugPath) ?? documents[0];
    const nextDocument: DocumentItem | undefined = findNextDocument(documents, document);
    const breadcrumbs: Breadcrumb[] = getBreadcrumbs(documents, slugs);

    try {
        const documentPath = path.join(process.cwd(), "public", document.path);
        const file = fs.readFileSync(documentPath, "utf8");
        const { content } = matter(file);

        const result = await unified().use(remarkParse).use(remarkHtml).process(content);
        const documentContent: DocumentContent = {
            title: document.label,
            html: result.toString(),
            breadcrumbs
        };

        return { props: { document: documentContent, nextDocument } };
    } catch (error) {
        return { redirect: { permanent: false, destination: "/" }, props: {} };
    }
}