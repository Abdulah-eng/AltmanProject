"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Neighborhood {
  name: string
  description: string
  propertyCount: number
  image: string
}

const neighborhoods: Neighborhood[] = [
  {
    name: "Hollywood Hills",
    description: "Prestigious hillside living with stunning city views",
    propertyCount: 24,
    image: "/images/hollywood-hills.jpg"
  },
  {
    name: "Beverly Hills",
    description: "Iconic luxury and exclusivity in a world-renowned location",
    propertyCount: 18,
    image: "/images/beverly-hills.jpg"
  },
  {
    name: "Bel Air",
    description: "Private estates and gated mansions in a serene setting",
    propertyCount: 15,
    image: "/images/bel-air.jpg"
  }
]

export function PremierNeighborhoodsSection() {
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

          {/* Neighborhood Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8 animate-fade-in-up animate-stagger-1">
            {neighborhoods.map((neighborhood, index) => (
              <Card key={neighborhood.name} className="bg-gray-800 border-gray-700 shadow-2xl hover:shadow-[#D4AF37]/20 transition-all duration-300 group">
                <CardContent className="p-0 overflow-hidden">
                  {/* Image Placeholder */}
                  <div className="w-full h-48 bg-gray-900 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                      {neighborhood.name}
                    </h3>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {neighborhood.description}
                    </p>
                    <Badge className="bg-[#D4AF37] text-black hover:bg-[#B8941F] text-sm font-bold px-3 py-1">
                      {neighborhood.propertyCount} Properties
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
