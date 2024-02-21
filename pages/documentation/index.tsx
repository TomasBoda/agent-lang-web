'use client'

import { Header } from "@/src/components/header"

export default function DocumentationPage() {
  return (
    <>
      <Header title="Documentation | AgentLang" />
    </>
  )
}

export async function getServerSideProps() {
  return { redirect: { permanent: false, destination: "/documentation/introduction" }, props: {} };    
}
