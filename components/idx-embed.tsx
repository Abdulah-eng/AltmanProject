"use client"

import Script from "next/script"
import { useCallback, useEffect, useRef } from "react"

interface IDXEmbedProps {
  className?: string
  height?: number
}

declare global {
  interface Window {
    ihfKestrel?: {
      render: () => HTMLElement
    }
    __ihfScriptLoaded?: boolean
  }
}

export function IDXEmbed({ className = "", height = 800 }: IDXEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasRenderedRef = useRef(false)

  const renderWidget = useCallback(() => {
    if (hasRenderedRef.current) return
    const ihf = typeof window !== "undefined" ? window.ihfKestrel : undefined
    if (ihf && typeof ihf.render === "function" && containerRef.current) {
      try {
        const widget = ihf.render()
        if (widget) {
          containerRef.current.innerHTML = ""
          containerRef.current.appendChild(widget)
          hasRenderedRef.current = true
        }
      } catch (error) {
        console.error("Failed to render IDX widget:", error)
      }
    }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      renderWidget()
    }, 500)

    return () => {
      clearInterval(timer)
    }
  }, [renderWidget])

  return (
    <div className={className}>
      <div ref={containerRef} style={{ minHeight: height }} />
      <Script
        src="https://www.themls.com/IDXNET/Scripts/idxwidget.js"
        strategy="afterInteractive"
        onReady={() => {
          window.__ihfScriptLoaded = true
          renderWidget()
        }}
      />
    </div>
  )
}


