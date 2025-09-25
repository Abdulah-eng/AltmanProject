"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { IDXWidget } from "@/components/idx-widget"

export default function OrangeCountyListingsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>
        <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-wide mb-4 sm:mb-6 text-center sm:text-left">Orange County Properties</h1>
          
          <IDXWidget 
            title=""
            height={900}
            showTitle={false}
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}