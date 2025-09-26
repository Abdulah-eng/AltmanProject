"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Bed, Bath, Square, Star, Users, TrendingUp, Shield, Calendar, Mountain } from "lucide-react"
import Link from "next/link"

export default function HollywoodHillsPage() {
  const neighborhoodInfo = {
    name: "Hollywood Hills",
    description: "Hollywood Hills is a prestigious residential area known for its stunning hillside homes, panoramic city views, and proximity to the entertainment industry. This exclusive neighborhood offers privacy, luxury, and some of the most spectacular views in Los Angeles.",
    population: "18,000",
    medianHomePrice: "$2.8M",
    averageDaysOnMarket: "40",
    walkScore: "35",
    crimeRate: "Very Low",
    schools: "Excellent",
    highlights: [
      "Panoramic city and ocean views",
      "Celebrity residences and privacy",
      "Hillside architecture and design",
      "Proximity to entertainment industry",
      "Exclusive gated communities",
      "Luxury hillside living"
    ],
    localAttractions: [
      "Hollywood Sign",
      "Griffith Observatory",
      "Runyon Canyon Park",
      "Hollywood Bowl",
      "Mulholland Drive",
      "Franklin Canyon Park"
    ]
  }

  const featuredProperties = [
    {
      id: "3",
      title: "Hollywood Hills Modern",
      price: 8500000,
      address: "789 Hollywood Hills Dr, Hollywood Hills, CA 90069",
      bedrooms: 4,
      bathrooms: 5,
      square_feet: 4800,
      status: "FOR SALE",
      image: "/api/placeholder/400/300"
    },
    {
      id: "11",
      title: "Hillside Estate with Views",
      price: 12000000,
      address: "123 Mulholland Dr, Hollywood Hills, CA 90069",
      bedrooms: 5,
      bathrooms: 6,
      square_feet: 6200,
      status: "FOR SALE",
      image: "/api/placeholder/400/300"
    },
    {
      id: "12",
      title: "Modern Hillside Villa",
      price: 6800000,
      address: "456 Laurel Canyon Blvd, Hollywood Hills, CA 90069",
      bedrooms: 3,
      bathrooms: 4,
      square_feet: 3800,
      status: "FOR SALE",
      image: "/api/placeholder/400/300"
    }
  ]

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`
    }
    return `$${price.toLocaleString()}`
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-wide">
                {neighborhoodInfo.name}
              </h1>
              <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                {neighborhoodInfo.description}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold px-8 py-4">
                  <Link href="/idx">Search Properties</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black px-8 py-4">
                  <Link href="/contact">Contact Agent</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Neighborhood Stats */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-white text-center mb-12">Neighborhood Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-800 rounded-lg p-6 text-center">
                  <Users className="w-8 h-8 mx-auto mb-3 text-[#D4AF37]" />
                  <div className="text-2xl font-bold text-white mb-1">{neighborhoodInfo.population}</div>
                  <div className="text-gray-400">Population</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-6 text-center">
                  <TrendingUp className="w-8 h-8 mx-auto mb-3 text-[#D4AF37]" />
                  <div className="text-2xl font-bold text-white mb-1">{neighborhoodInfo.medianHomePrice}</div>
                  <div className="text-gray-400">Median Home Price</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-6 text-center">
                  <Calendar className="w-8 h-8 mx-auto mb-3 text-[#D4AF37]" />
                  <div className="text-2xl font-bold text-white mb-1">{neighborhoodInfo.averageDaysOnMarket}</div>
                  <div className="text-gray-400">Days on Market</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-6 text-center">
                  <Shield className="w-8 h-8 mx-auto mb-3 text-[#D4AF37]" />
                  <div className="text-2xl font-bold text-white mb-1">{neighborhoodInfo.crimeRate}</div>
                  <div className="text-gray-400">Crime Rate</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Highlights & Attractions */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-8">Neighborhood Highlights</h2>
                  <div className="space-y-4">
                    {neighborhoodInfo.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-[#D4AF37] rounded-full mr-4"></div>
                        <span className="text-gray-300">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-8">Local Attractions</h2>
                  <div className="space-y-4">
                    {neighborhoodInfo.localAttractions.map((attraction, index) => (
                      <div key={index} className="flex items-center">
                        <MapPin className="w-5 h-5 text-[#D4AF37] mr-4" />
                        <span className="text-gray-300">{attraction}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Properties */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-white text-center mb-12">Featured Properties in {neighborhoodInfo.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProperties.map((property) => (
                  <Card key={property.id} className="bg-gray-800 border-gray-700 shadow-2xl hover:shadow-[#D4AF37]/20 transition-all duration-300 group">
                    <CardContent className="p-0 overflow-hidden">
                      <div className="w-full h-48 bg-gradient-to-br from-gray-700 to-gray-900 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-transparent"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center text-white">
                            <Mountain className="w-12 h-12 mx-auto mb-2 text-[#D4AF37]" />
                            <p className="text-sm text-gray-300">Hillside Property</p>
                          </div>
                        </div>
                        <Badge className="absolute top-4 left-4 bg-[#D4AF37] text-black font-bold px-3 py-1">
                          {property.status}
                        </Badge>
                        <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-2 rounded-lg">
                          <span className="text-[#D4AF37] font-bold">{formatPrice(property.price)}</span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                          {property.title}
                        </h3>
                        <div className="flex items-center text-gray-400 mb-4">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span className="text-sm">{property.address}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                          <div className="flex items-center">
                            <Bed className="w-4 h-4 mr-1" />
                            <span>{property.bedrooms}</span>
                          </div>
                          <div className="flex items-center">
                            <Bath className="w-4 h-4 mr-1" />
                            <span>{property.bathrooms}</span>
                          </div>
                          <div className="flex items-center">
                            <Square className="w-4 h-4 mr-1" />
                            <span>{property.square_feet.toLocaleString()}</span>
                          </div>
                        </div>
                        
                        <Button asChild className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold">
                          <Link href={`/properties/${property.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <Button asChild size="lg" className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold px-8 py-4">
                  <Link href="/idx">View All Properties in {neighborhoodInfo.name}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
