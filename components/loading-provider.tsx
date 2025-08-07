"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { usePathname } from "next/navigation"
import LuxuryLoadingScreen from "./luxury-loading-screen"

interface LoadingContextType {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  showLoading: (message?: string) => void
  hideLoading: () => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function useLoading() {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider")
  }
  return context
}

interface LoadingProviderProps {
  children: ReactNode
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState("Loading...")
  const pathname = usePathname()

  // Show loading on route changes
  useEffect(() => {
    setIsLoading(true)
    setLoadingMessage("Preparing your luxury experience...")
    
    // Hide loading after a short delay to allow page to load
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [pathname])

  const showLoading = (message?: string) => {
    setLoadingMessage(message || "Loading...")
    setIsLoading(true)
  }

  const hideLoading = () => {
    setIsLoading(false)
  }

  const value = {
    isLoading,
    setIsLoading,
    showLoading,
    hideLoading,
  }

  return (
    <LoadingContext.Provider value={value}>
      {children}
      <LuxuryLoadingScreen isLoading={isLoading} message={loadingMessage} />
    </LoadingContext.Provider>
  )
} 