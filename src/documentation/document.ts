import { Breadcrumb } from "@/src/components/breadcrumbs";

export interface Document {
    title: string;
    slug: string;
    document: string;
}

export interface DocumentContent {
    title: string;
    html: string;
    breadcrumbs: Breadcrumb[];
}