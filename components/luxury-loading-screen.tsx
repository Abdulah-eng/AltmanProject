"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface LuxuryLoadingScreenProps {
  isLoading?: boolean
  message?: string
}

export default function LuxuryLoadingScreen({ 
  isLoading = true, 
  message = "Loading..." 
}: LuxuryLoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [currentMessage, setCurrentMessage] = useState(message)

  const loadingMessages = [
    "Preparing your luxury experience...",
    "Loading exclusive properties...",
    "Connecting to premium services...",
    "Almost ready...",
  ]

  useEffect(() => {
    if (!isLoading) return

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    // Cycle through messages
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => {
        const currentIndex = loadingMessages.indexOf(prev)
        const nextIndex = (currentIndex + 1) % loadingMessages.length
        return loadingMessages[nextIndex]
      })
    }, 1500)

    return () => {
      clearInterval(progressInterval)
      clearInterval(messageInterval)
    }
  }, [isLoading])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black loading-screen">
      {/* Animated background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>
        </div>
      </div>

      {/* Main loading content */}
      <div className="relative z-10 text-center">
        {/* Logo */}
        <div className="mb-8 animate-pulse-gold">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 md:w-32 md:h-32 relative animate-float">
              <Image
                src="/logo.png.png"
                alt="Homes of Hollywood Logo"
                fill
                className="object-contain animate-glow"
              />
            </div>
          </div>
        </div>

        {/* Loading message */}
        <div className="mb-8">
          <p className="text-lg md:text-xl text-gray-300 font-light tracking-wide animate-pulse">
            {currentMessage}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64 md:w-80 mx-auto mb-8">
          <div className="relative h-1 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full loading-progress rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
            </div>
          </div>
          <div className="mt-2 text-right">
            <span className="text-sm text-[#D4AF37] font-medium animate-pulse-gold">
              {Math.round(Math.min(progress, 100))}%
            </span>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="flex justify-center space-x-4 mb-8">
          <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
        </div>

        {/* Luxury accent line */}
        <div className="mt-8">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto animate-shimmer"></div>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[#D4AF37] opacity-50 loading-corner"></div>
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-[#D4AF37] opacity-50 loading-corner"></div>
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-[#D4AF37] opacity-50 loading-corner"></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[#D4AF37] opacity-50 loading-corner"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-[#D4AF37] rounded-full animate-ping opacity-60" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-[#D4AF37] rounded-full animate-ping opacity-60" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-[#D4AF37] rounded-full animate-ping opacity-60" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-[#D4AF37] rounded-full animate-ping opacity-60" style={{ animationDelay: '3s' }}></div>
      </div>
    </div>
  )
} 