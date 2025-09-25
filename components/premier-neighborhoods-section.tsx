"use client"

import { IDXWidget } from "@/components/idx-widget"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface PremierNeighborhoodsSectionProps {
  neighborhoods?: any[] | null
}

export function PremierNeighborhoodsSection({ neighborhoods }: PremierNeighborhoodsSectionProps) {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-wide">
              PREMIER NEIGHBORHOODS
            </h2>
            <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover the most desirable neighborhoods across Los Angeles and the surrounding metro area with Don Adams as your expert guide.
            </p>
          </div>

          {/* IDX Widget for Neighborhood Search */}
          <div className="mb-8">
            <IDXWidget 
              title=""
              height={600}
              showTitle={false}
            />
                    </div>
                    
          {/* Quick Links to Popular Neighborhoods */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-8">Popular Neighborhoods</h3>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Button asChild variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black">
                <Link href="/listings/los-angeles">Beverly Hills</Link>
              </Button>
              <Button asChild variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black">
                <Link href="/listings/los-angeles">Hollywood Hills</Link>
              </Button>
              <Button asChild variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black">
                <Link href="/listings/los-angeles">Malibu</Link>
              </Button>
              <Button asChild variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black">
                <Link href="/listings/los-angeles">Santa Monica</Link>
              </Button>
              <Button asChild variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black">
                <Link href="/listings/orange-county">Newport Beach</Link>
              </Button>
              <Button asChild variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black">
                <Link href="/listings/orange-county">Laguna Beach</Link>
              </Button>
            </div>
            
            <Button asChild size="lg" className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold px-8 py-4">
              <Link href="/idx">EXPLORE ALL NEIGHBORHOODS</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}