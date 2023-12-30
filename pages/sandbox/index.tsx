'use client'

import SandboxScreen from "@/src/screens/sandbox/Sandbox.screen"
import Head from "next/head"

export default function SandboxPage() {
  return (
    <>
      <Head>
        <title>Sandbox | AgentLang</title>
      </Head>
      
      <SandboxScreen />
    </>
  )
}
