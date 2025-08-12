"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function PropertyComparisonSection() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-wide">
              COMPARE PROPERTIES
            </h2>
            <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Compare luxury properties side-by-side to make informed decisions about your next home.
            </p>
          </div>

          {/* Property Comparison Feature */}
          <div className="animate-fade-in-up animate-stagger-1">
            <div className="text-left mb-8">
              <h3 className="text-2xl font-bold text-white">Property Comparison</h3>
            </div>
            
            <Card className="bg-gray-800 border-gray-700 shadow-2xl">
              <CardContent className="p-12 text-center">
                <h4 className="text-2xl font-bold text-white mb-6">
                  Compare Properties Side-by-Side
                </h4>
                <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Select up to 3 properties to compare features, prices, and amenities using our hybrid AI-powered feature detection.
                </p>
                <Button className="bg-[#D4AF37] text-black hover:bg-[#B8941F] transition-all duration-300 font-bold px-8 py-4 text-lg">
                  SELECT PROPERTIES TO COMPARE
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
