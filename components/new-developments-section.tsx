"use client"

import { MapPin, ArrowRight, Building2, Calendar, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface NewDevelopmentsSectionProps {
  developments?: any[] | null
}

export function NewDevelopmentsSection({ developments }: NewDevelopmentsSectionProps) {
  const featuredDevelopments = [
    {
      name: "The Residences at Beverly Hills",
      description: "Ultra-luxury condominiums with panoramic city views and world-class amenities",
      location: "Beverly Hills, CA",
      priceRange: "$3M - $15M",
      status: "Pre-Construction",
      units: "45",
      completion: "2025"
    },
    {
      name: "Malibu Oceanfront Estates",
      description: "Exclusive beachfront properties with private beach access and infinity pools",
      location: "Malibu, CA",
      priceRange: "$8M - $50M",
      status: "Under Construction",
      units: "12",
      completion: "2024"
    },
    {
      name: "Hollywood Hills Modern Collection",
      description: "Contemporary hillside homes with smart home technology and city views",
      location: "Hollywood Hills, CA",
      priceRange: "$2M - $8M",
      status: "Pre-Construction",
      units: "28",
      completion: "2025"
    },
    {
      name: "Santa Monica Tower",
      description: "High-rise luxury condos with ocean views and resort-style amenities",
      location: "Santa Monica, CA",
      priceRange: "$1.5M - $6M",
      status: "Under Construction",
      units: "120",
      completion: "2024"
    },
    {
      name: "Newport Coast Villas",
      description: "Coastal luxury villas with harbor views and private yacht access",
      location: "Newport Beach, CA",
      priceRange: "$4M - $20M",
      status: "Pre-Construction",
      units: "18",
      completion: "2026"
    },
    {
      name: "Laguna Beach Art District",
      description: "Artist-inspired residences with gallery spaces and oceanfront terraces",
      location: "Laguna Beach, CA",
      priceRange: "$2.5M - $12M",
      status: "Under Construction",
      units: "22",
      completion: "2025"
    }
  ]

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-wide">
              NEW DEVELOPMENTS
            </h2>
            <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover the most exclusive pre-construction and newly completed luxury developments across Los Angeles.
            </p>
          </div>

          {/* Development Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredDevelopments.map((development, index) => (
              <Card key={development.name} className="bg-gray-800 border-gray-700 shadow-2xl hover:shadow-[#D4AF37]/20 transition-all duration-300 group">
                <CardContent className="p-0 overflow-hidden">
                  {/* Image with Badge */}
                  <div className="w-full h-48 bg-gradient-to-br from-gray-700 to-gray-900 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Building2 className="w-12 h-12 mx-auto mb-2 text-[#D4AF37]" />
                        <h3 className="text-lg font-bold">{development.name}</h3>
                      </div>
                    </div>
                    
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-[#D4AF37] text-black font-bold px-3 py-1 text-xs">
                        {development.status}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#D4AF37]" />
                      <span className="text-[#D4AF37] text-sm font-medium">{development.location}</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                      {development.name}
                    </h3>
                    <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                      {development.description}
                    </p>
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-black rounded-lg p-3 text-center">
                        <div className="text-xs text-gray-400 mb-1">PRICE RANGE</div>
                        <div className="text-sm font-bold text-[#D4AF37]">{development.priceRange}</div>
                      </div>
                      <div className="bg-black rounded-lg p-3 text-center">
                        <div className="text-xs text-gray-400 mb-1">UNITS</div>
                        <div className="text-sm font-bold text-white">{development.units}</div>
                      </div>
                    </div>
                    
                    <div className="bg-black rounded-lg p-3 text-center mb-4">
                      <div className="text-xs text-gray-400 mb-1">COMPLETION</div>
                      <div className="text-sm font-bold text-white">{development.completion}</div>
                    </div>
                    
                    <Button asChild className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold">
                      <Link href="/new-developments">View Development</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Button asChild size="lg" className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold px-8 py-4 mr-4">
              <Link href="/new-developments">VIEW ALL DEVELOPMENTS</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black px-8 py-4">
              <Link href="/idx">SEARCH NEW CONSTRUCTION PROPERTIES</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
