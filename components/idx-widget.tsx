"use client"

import { useEffect, useRef, useState } from "react"
import Script from "next/script"

interface IDXWidgetProps {
  title?: string
  height?: number
  showTitle?: boolean
  className?: string
}

export function IDXWidget({ 
  title = "MLS Search", 
  height = 900, 
  showTitle = true,
  className = ""
}: IDXWidgetProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const [iframeHeight, setIframeHeight] = useState<number>(height)

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Optionally handle postMessage from IDX if they provide it in future
      if (typeof event.data === "object" && event.data && "height" in event.data) {
        const next = Number((event.data as any).height)
        if (!Number.isNaN(next) && next > 300) setIframeHeight(next)
      }
    }
    window.addEventListener("message", handleMessage)
    const interval = setInterval(() => {
      // Fallback: gently grow the iframe to avoid scrollbars if content expands
      setIframeHeight((h) => Math.min(Math.max(h + 1, height), 5000))
    }, 5000)

    return () => {
      window.removeEventListener("message", handleMessage)
      clearInterval(interval)
    }
  }, [height])

  return (
    <div className={`w-full ${className}`}>
      {/* Load the IDX widget script non-blocking */}
      <Script
        src="https://www.themls.com/IDXNET/Scripts/idxwidget.js"
        strategy="afterInteractive"
      />

      {showTitle && (
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-wide mb-4 sm:mb-6 text-center sm:text-left text-white">
          {title}
        </h2>
      )}

      <div className="w-full overflow-hidden relative">
        <div 
          className="w-full"
          style={{
            touchAction: "pan-x pan-y pinch-zoom",
            WebkitOverflowScrolling: "touch"
          }}
        >
          <iframe
            ref={iframeRef}
            id="idxFrame"
            style={{ 
              padding: 0, 
              margin: 0, 
              border: "0px solid transparent", 
              backgroundColor: "transparent",
              width: "100%",
              minHeight: `${height}px`,
              touchAction: "manipulation",
              pointerEvents: "auto",
              display: "block"
            }}
            frameBorder="0"
            scrolling="auto"
            allow="geolocation; microphone; camera"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
            src="https://www.themls.com/IDXNET/Default.aspx?wid=2HIXcRDKgSk4aOwjkP4O%2fZCt5J4ydMgyNbBLdRbZy7JB4CIBf352FgEQLEQL"
            width="100%"
            height={iframeHeight}
          />
        </div>
      </div>
    </div>
  )
}
