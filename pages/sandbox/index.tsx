'use client'

import { Header } from "@/src/components/header"
import SandboxScreen from "@/src/screens/sandbox/Sandbox.screen"

export default function SandboxPage() {
  return (
    <>
      <Header title="Sandbox | AgentLang" />
      <SandboxScreen />
    </>
  )
}
