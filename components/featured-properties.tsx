"use client"

import { IDXWidget } from "@/components/idx-widget"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface FeaturedPropertiesProps {
  properties?: any[] | null
}

export function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-black overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider mb-6 sm:mb-8">FEATURED PROPERTIES</h2>
          <div className="w-16 h-px bg-[#D4AF37] mx-auto"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed mt-6">
            Search and explore the latest luxury properties across Los Angeles with our comprehensive MLS search.
          </p>
        </div>
        
        <IDXWidget 
          title=""
          height={800}
          showTitle={false}
          className="mb-8"
        />
        
        <div className="text-center mt-8 sm:mt-12">
          <Button asChild size="lg" className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base">
            <Link href="/idx">VIEW ALL PROPERTIES</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
