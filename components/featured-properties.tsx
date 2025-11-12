"use client"

import { Button } from "@/components/ui/button"
import { IDXEmbed } from "@/components/idx-embed"
import Link from "next/link"

export function FeaturedProperties() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-black overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider mb-6 sm:mb-8">
            FEATURED PROPERTIES
          </h2>
          <div className="w-16 h-px bg-[#D4AF37] mx-auto"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed mt-6">
            Discover the finest luxury properties across Los Angeles and Orange County with Don Adams as your expert
            guide.
          </p>
        </div>

        <IDXEmbed className="bg-white rounded-lg overflow-hidden shadow-xl" scriptId="idx-home-featured-properties" />

        <div className="text-center mt-8 sm:mt-12">
          <Button
            asChild
            size="lg"
            className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base mr-4"
          >
            <Link href="/idx">SEARCH ALL PROPERTIES</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base"
          >
            <Link href="/listings">VIEW ALL LISTINGS</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
