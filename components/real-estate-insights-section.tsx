"use client"

import { Button } from "@/components/ui/button"
import { IDXEmbed } from "@/components/idx-embed"
import Link from "next/link"

export function RealEstateInsightsSection() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-white text-4xl md:text-6xl font-bold tracking-wider mb-8">REAL ESTATE INSIGHTS</h2>
          <div className="w-16 h-px bg-[#D4AF37] mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Expert analysis, market trends, and valuable insights to guide your real estate decisions.
          </p>
        </div>

        <IDXEmbed className="bg-white rounded-lg overflow-hidden shadow-xl" scriptId="idx-home-insights" />

        <div className="text-center mt-10">
          <Button asChild size="lg" className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold px-8 py-4">
            <Link href="/real-estate-insights">VIEW ALL INSIGHTS</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
