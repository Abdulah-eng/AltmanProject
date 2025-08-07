"use client"

import { useEffect, useState } from "react"
import LuxuryLoadingScreen from "./luxury-loading-screen"

interface PageLoadingProps {
  children: React.ReactNode
  loadingMessage?: string
  minLoadingTime?: number
}

export default function PageLoading({ 
  children, 
  loadingMessage = "Loading page content...",
  minLoadingTime = 800 
}: PageLoadingProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, minLoadingTime)

    return () => clearTimeout(timer)
  }, [minLoadingTime])

  if (isLoading) {
    return <LuxuryLoadingScreen isLoading={true} message={loadingMessage} />
  }

  return <>{children}</>
} 