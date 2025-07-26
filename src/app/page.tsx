'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import LoadingScreen from '@/components/UI/LoadingScreen'

// Importa o SpaceScene dinamicamente para evitar SSR issues
const SpaceScene = dynamic(() => import('@/components/SpaceScene'), {
  ssr: false,
  loading: () => <LoadingScreen />
})

export default function Home() {
  return (
    <main className="w-full h-screen relative overflow-hidden bg-black">
      <Suspense fallback={<LoadingScreen />}>
        <SpaceScene />
      </Suspense>
    </main>
  )
}