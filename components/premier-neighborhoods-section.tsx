"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Home, TrendingUp } from "lucide-react"
import Link from "next/link"

interface PremierNeighborhoodsSectionProps {
  neighborhoods?: any[] | null
}

export function PremierNeighborhoodsSection({ neighborhoods }: PremierNeighborhoodsSectionProps) {
  const featuredNeighborhoods = [
    {
      name: "Beverly Hills",
      description: "Luxury estates and iconic properties in the heart of Los Angeles",
      priceRange: "$2M - $50M+",
      properties: "150+",
      image: "/api/placeholder/400/300"
    },
    {
      name: "Hollywood Hills",
      description: "Stunning hillside homes with panoramic city views",
      priceRange: "$1.5M - $25M+",
      properties: "200+",
      image: "/api/placeholder/400/300"
    },
    {
      name: "Malibu",
      description: "Beachfront estates and ocean-view properties",
      priceRange: "$3M - $100M+",
      properties: "80+",
      image: "/api/placeholder/400/300"
    },
    {
      name: "Santa Monica",
      description: "Modern condos and beach-close luxury homes",
      priceRange: "$1M - $15M+",
      properties: "120+",
      image: "/api/placeholder/400/300"
    },
    {
      name: "Newport Beach",
      description: "Coastal luxury with harbor views and beach access",
      priceRange: "$2M - $40M+",
      properties: "90+",
      image: "/api/placeholder/400/300"
    },
    {
      name: "Laguna Beach",
      description: "Artistic community with dramatic coastline properties",
      priceRange: "$1.8M - $30M+",
      properties: "70+",
      image: "/api/placeholder/400/300"
    }
  ]

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

          {/* Featured Neighborhoods Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredNeighborhoods.map((neighborhood, index) => (
              <Card key={neighborhood.name} className="bg-gray-800 border-gray-700 shadow-2xl hover:shadow-[#D4AF37]/20 transition-all duration-300 group">
                <CardContent className="p-0 overflow-hidden">
                  {/* Image */}
                  <div className="w-full h-48 bg-gradient-to-br from-gray-700 to-gray-900 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <MapPin className="w-12 h-12 mx-auto mb-2 text-[#D4AF37]" />
                        <h3 className="text-xl font-bold">{neighborhood.name}</h3>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                      {neighborhood.name}
                    </h3>
                    <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                      {neighborhood.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-black rounded-lg p-3 text-center">
                        <div className="text-xs text-gray-400 mb-1">PRICE RANGE</div>
                        <div className="text-sm font-bold text-[#D4AF37]">{neighborhood.priceRange}</div>
                      </div>
                      <div className="bg-black rounded-lg p-3 text-center">
                        <div className="text-xs text-gray-400 mb-1">AVAILABLE</div>
                        <div className="text-sm font-bold text-white">{neighborhood.properties}</div>
                      </div>
                    </div>
                    
                    <Button asChild className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold">
                      <Link href="/listings/los-angeles">View Properties</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Button asChild size="lg" className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold px-8 py-4 mr-4">
              <Link href="/idx">SEARCH PROPERTIES BY NEIGHBORHOOD</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black px-8 py-4">
              <Link href="/listings">VIEW ALL LISTINGS</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}