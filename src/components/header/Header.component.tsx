import Head from "next/head"

export function Header({ title }: { title: string }) {
    return (
        <Head>
            <title>{title}</title>
        </Head>
    )
}