import { Breadcrumb } from "../components/breadcrumbs";

export function getDocuments(documentation: DocumentEntry[]): DocumentItem[] {
    const documents: DocumentItem[] = [];

    for (const entry of documentation) {
        const { header, items } = entry;

        documents.push(header);

        for (const document of items) {
            documents.push(document);
        }
    }

    return documents;
}

export function findDocument(documents: DocumentItem[], slugPath: string): DocumentItem | undefined {
    return documents.find(document => document.slug === slugPath);
}

export function findNextDocument(documents: DocumentItem[], document: DocumentItem): DocumentItem | undefined {
    for (let i = 0; i < documents.length; i++) {
        if (documents[i].path === document.path) {
            if (i == documents.length - 1) {
                return undefined;
            } else {
                return documents[i + 1];
            }
        }
    }

    return undefined;
}

export function getBreadcrumbs(documents: DocumentItem[], slugs: string[]): Breadcrumb[] {
    const breadcrumbs: Breadcrumb[] = [];

    for (let i = 0; i < slugs.length; i++) {
        const path = slugs.slice(0, i + 1).join("/");
        const doc = findDocument(documents, path);

        if (doc !== undefined) {
            breadcrumbs.push({
                title: doc.label,
                path: "/documentation/" + doc.slug
            });
        }
    }

    return breadcrumbs;
}

export interface DocumentContent {
    title: string;
    html: string;
    breadcrumbs: Breadcrumb[];
}

export interface DocumentItem {
    label: string;
    path: string;
    slug: string;
}

export interface DocumentEntry {
    header: DocumentItem;
    items: DocumentItem[];
}

export const documentation: DocumentEntry[] = [
    {
        header: {
            label: "Introduction",
            path: "/documentation/introduction/introduction.md",
            slug: "introduction"
        },
        items: [
            {
                label: "What is AgentLang",
                path: "/documentation/introduction/what-is-agent-lang.md",
                slug: "introduction/what-is-agent-lang"
            },
            {
                label: "Agent-based Modeling",
                path: "/documentation/introduction/agent-based-modeling.md",
                slug: "introduction/agent-based-modeling"
            },
            {
                label: "Installation and Usage",
                path: "/documentation/introduction/installation-and-usage.md",
                slug: "introduction/installation-and-usage"
            }
        ]
    },
    {
        header: {
            label: "Declarations",
            path: "/documentation/declarations/declarations.md",
            slug: "declarations"
        },
        items: [
            {
                label: "Agents",
                path: "/documentation/declarations/agents.md",
                slug: "declarations/agents"
            },
            {
                label: "Properties",
                path: "/documentation/declarations/properties.md",
                slug: "declarations/properties"
            },
            {
                label: "Global Variables",
                path: "/documentation/declarations/global-variables.md",
                slug: "declarations/global-variables"
            }
        ]
    },
    {
        header: {
            label: "Data Types",
            path: "/documentation/data-types/data-types.md",
            slug: "data-types"
        },
        items: [
            {
                label: "Numeric Literal",
                path: "/documentation/data-types/numeric-literal.md",
                slug: "data-types/numeric-literal"
            },
            {
                label: "Boolean Literal",
                path: "/documentation/data-types/boolean-literal.md",
                slug: "data-types/boolean-literal"
            },
            {
                label: "Agent List",
                path: "/documentation/data-types/agent-list.md",
                slug: "data-types/agent-list"
            },
            {
                label: "Agent Object",
                path: "/documentation/data-types/agent-object.md",
                slug: "data-types/agent-object"
            },
            {
                label: "Null",
                path: "/documentation/data-types/null.md",
                slug: "data-types/null"
            }
        ]
    },
    {
        header: {
            label: "Expressions",
            path: "/documentation/expressions/expressions.md",
            slug: "expressions"
        },
        items: [
            {
                label: "Binary Expression",
                path: "/documentation/expressions/binary-expression.md",
                slug: "expressions/binary-expression"
            },
            {
                label: "Unary Expression",
                path: "/documentation/expressions/unary-expression.md",
                slug: "expressions/unary-expression"
            },
            {
                label: "Logical Expression",
                path: "/documentation/expressions/logical-expression.md",
                slug: "expressions/logical-expression"
            },
            {
                label: "Relational Expression",
                path: "/documentation/expressions/relational-expression.md",
                slug: "expressions/relational-expression"
            },
            {
                label: "Conditional Expression",
                path: "/documentation/expressions/conditional-expression.md",
                slug: "expressions/conditional-expression"
            },
            {
                label: "Otherwise Expression",
                path: "/documentation/expressions/otherwise-expression.md",
                slug: "expressions/otherwise-expression"
            },
            {
                label: "Set Comprehension Expression",
                path: "/documentation/expressions/set-comprehension-expression.md",
                slug: "expressions/set-comprehension-expression"
            }
        ]
    },
    {
        header: {
            label: "Core Library",
            path: "/documentation/core-library/core-library.md",
            slug: "core-library"
        },
        items: [
            {
                label: "Mathematical Functions",
                path: "/documentation/core-library/mathematical-functions.md",
                slug: "core-library/mathematical-functions"
            },
            {
                label: "Agent Manipulation Functions",
                path: "/documentation/core-library/agent-manipulation-functions.md",
                slug: "core-library/agent-manipulation-functions"
            },
            {
                label: "Utility Functions",
                path: "/documentation/core-library/utility-functions.md",
                slug: "core-library/utility-functions"
            },
            {
                label: "Special Functions",
                path: "/documentation/core-library/special-functions.md",
                slug: "core-library/special-functions"
            }
        ]
    }
]