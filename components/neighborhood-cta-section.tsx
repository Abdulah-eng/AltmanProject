"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function NeighborhoodCTASection() {
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-black border border-gray-800 rounded-lg p-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Left Content - Text */}
              <div className="text-center lg:text-left">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-wide">
                  Find Your Perfect Neighborhood
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Explore all Los Angeles communities with Don Adams as your guide.
                </p>
              </div>
              
              {/* Right Content - Button */}
              <div className="flex-shrink-0">
                <Button 
                  variant="outline" 
                  className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 font-bold px-8 py-4 text-lg rounded-lg"
                >
                  VIEW ALL NEIGHBORHOODS
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
