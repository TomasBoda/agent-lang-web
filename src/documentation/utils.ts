import { Document } from "./document";
import { Breadcrumb } from "@/src/components/breadcrumbs";

export function findDocument(documents: Document[], slugPath: string): Document | undefined {
    return documents.find(document => document.slug === slugPath);
}

export function getBreadcrumbs(documents: Document[], slugs: string[]): Breadcrumb[] {
    const breadcrumbs: Breadcrumb[] = [];

    for (let i = 0; i < slugs.length; i++) {
        const path = slugs.slice(0, i + 1).join("/");
        const doc = findDocument(documents, path);

        if (doc !== undefined) {
            breadcrumbs.push({
                title: doc.title,
                path: "/documentation/" + doc.slug
            });
        }
    }

    return breadcrumbs;
}