'use client'

import LandingScreen from "@/src/screens/landing/Landing.screen"
import Head from "next/head"

export default function MainPage() {
  return (
    <>
      <Head>
        <title>AgentLang Hub</title>
      </Head>
      
      <LandingScreen />
    </>
  )
}
