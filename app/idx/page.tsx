"use client"

import { useEffect, useRef, useState } from "react"
import Script from "next/script"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function IDXPage() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const [iframeHeight, setIframeHeight] = useState<number>(900)

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
      setIframeHeight((h) => Math.min(Math.max(h + 1, 900), 5000))
    }, 5000)

    return () => {
      window.removeEventListener("message", handleMessage)
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="min-h-screen">
      <Header />
      <main className="bg-black text-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-wide mb-6">MLS Search</h1>

          {/* Load the IDX widget script non-blocking */}
          <Script
            src="https://www.themls.com/IDXNET/Scripts/idxwidget.js"
            strategy="afterInteractive"
          />

          <div className="w-full">
            <iframe
              ref={iframeRef}
              id="idxFrame"
              style={{ padding: 0, margin: 0, border: "0px solid transparent", backgroundColor: "transparent" }}
              frameBorder="0"
              scrolling="no"
              src="https://www.themls.com/IDXNET/Default.aspx?wid=2HIXcRDKgSk4aOwjkP4O%2fZCt5J4ydMgyNbBLdRbZy7JB4CIBf352FgEQLEQL"
              width="100%"
              height={iframeHeight}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


