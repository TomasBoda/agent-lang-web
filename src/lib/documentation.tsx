
export interface DocumentContent {
    title: string;
    html: string;
    breadcrumbs: Breadcrumb[];
}

export interface Document {
    title: string;
    slug: string;
    document: string;
}

export interface Breadcrumb {
    title: string;
    path: string;
}

export function findDocument(slugPath: string): Document | undefined {
    for (const document of documents) {
        if (document.slug === slugPath) {
            return document;
        }
    }

    return undefined;
}

export function getBreadcrumbs(slugs: string[]): Breadcrumb[] {
    const breadcrumbs: Breadcrumb[] = [];

    for (let i = 0; i < slugs.length; i++) {
        const path = slugs.slice(0, i + 1).join("/");
        const doc = findDocument(path);

        if (doc !== undefined) {
            breadcrumbs.push({
                title: doc.title,
                path: "/documentation/" + doc.slug
            });
        }
    }

    return breadcrumbs;
}

export const documents: Document[] = [
    {
        title: "Introduction",
        slug: "introduction",
        document: "documentation/introduction/introduction.md",
    },
    {
        title: "What is AgentLang",
        slug: "introduction/what-is-agent-lang",
        document: "documentation/introduction/what-is-agent-lang.md",
    },
    {
        title: "Agent-based modeling",
        slug: "introduction/agent-based-modeling",
        document: "documentation/introduction/agent-based-modeling.md",
    },
    {
        title: "Installation and Usage",
        slug: "introduction/installation-and-usage",
        document: "documentation/introduction/installation-and-usage.md",
    },
    // -------------------------------------------------------------------
    {
        title: "Software Specification",
        slug: "software-specification",
        document: "documentation/software-specification/software-specification.md"
    },
    {
        title: "Project Description",
        slug: "software-specification/project-description",
        document: "documentation/software-specification/project-description.md",
    },
    {
        title: "Technologies",
        slug: "software-specification/technologies",
        document: "documentation/software-specification/technologies.md",
    },
    {
        title: "Aim of the Project",
        slug: "software-specification/aim-of-the-project",
        document: "documentation/software-specification/aim-of-the-project.md",
    },
    {
        title: "Main Functionality",
        slug: "software-specification/main-functionality",
        document: "documentation/software-specification/main-functionality.md",
    },
    // -------------------------------------------------------------------
    {
        title: "Language Design",
        slug: "language-design",
        document: "documentation/language-design/language-design.md"
    },
    {
        title: "Data Types",
        slug: "language-design/data-types",
        document: "documentation/language-design/data-types.md",
    },
    {
        title: "Properties",
        slug: "language-design/properties",
        document: "documentation/language-design/properties.md",
    },
    {
        title: "Agents",
        slug: "language-design/agents",
        document: "documentation/language-design/agents.md",
    },
    {
        title: "Conditional Expressions",
        slug: "language-design/conditional-expressions",
        document: "documentation/language-design/conditional-expressions.md",
    },
    {
        title: "Built-in Functions",
        slug: "language-design/built-in-functions",
        document: "documentation/language-design/built-in-functions.md",
    },
    // -------------------------------------------------------------------
    {
        title: "Code Sandbox",
        slug: "code-sandbox",
        document: "documentation/code-sandbox/code-sandbox.md"
    },
    {
        title: "Main Features",
        slug: "code-sandbox/main-features",
        document: "documentation/code-sandbox/main-features.md"
    },
    {
        title: "Code Editor",
        slug: "code-sandbox/code-editor",
        document: "documentation/code-sandbox/code-editor.md"
    },
    {
        title: "Table Editor",
        slug: "code-sandbox/table-editor",
        document: "documentation/code-sandbox/table-editor.md"
    },
    {
        title: "Visualisation",
        slug: "code-sandbox/visualisation",
        document: "documentation/code-sandbox/visualisation.md"
    },
]