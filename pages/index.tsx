'use client'

import { Header } from "@/src/components/header"
import LandingScreen from "@/src/screens/landing/Landing.screen"

export default function MainPage() {
  return (
    <>
      <Header title="AgentLang" />
      <LandingScreen />
    </>
  )
}
