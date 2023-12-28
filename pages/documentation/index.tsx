'use client'

import Head from "next/head"

export default function DocumentationPage() {
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
