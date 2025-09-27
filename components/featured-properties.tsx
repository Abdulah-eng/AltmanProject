"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Bed, Bath, Square, Heart, Search } from "lucide-react"
import Link from "next/link"
import { IDXWidget } from "@/components/idx-widget"

interface FeaturedPropertiesProps {
  properties?: any[] | null
}

export function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  // Use static featured properties since we can't fetch from iframe
  const featuredProperties = [
    {
      id: "1",
      title: "Beverly Hills Estate",
      price: 12500000,
      address: "123 Beverly Hills Dr, Beverly Hills, CA 90210",
      bedrooms: 6,
      bathrooms: 8,
      square_feet: 8500,
      status: "FOR SALE",
      image: "/api/placeholder/400/300",
      description: "Stunning luxury estate with panoramic city views and resort-style amenities."
    },
    {
      id: "2", 
      title: "Malibu Oceanfront Villa",
      price: 18500000,
      address: "456 Pacific Coast Hwy, Malibu, CA 90265",
      bedrooms: 5,
      bathrooms: 7,
      square_feet: 6200,
      status: "FOR SALE",
      image: "/api/placeholder/400/300",
      description: "Exclusive beachfront property with private beach access and infinity pool."
    },
    {
      id: "3",
      title: "Hollywood Hills Modern",
      price: 8500000,
      address: "789 Hollywood Hills Dr, Hollywood Hills, CA 90069",
      bedrooms: 4,
      bathrooms: 5,
      square_feet: 4800,
      status: "FOR SALE", 
      image: "/api/placeholder/400/300",
      description: "Contemporary hillside home with smart home technology and city views."
    },
    {
      id: "4",
      title: "Santa Monica Penthouse",
      price: 6500000,
      address: "321 Ocean Ave, Santa Monica, CA 90401",
      bedrooms: 3,
      bathrooms: 4,
      square_feet: 3200,
      status: "FOR SALE",
      image: "/api/placeholder/400/300",
      description: "High-rise luxury penthouse with ocean views and resort-style amenities."
    },
    {
      id: "5",
      title: "Newport Beach Harbor View",
      price: 9500000,
      address: "654 Harbor View Dr, Newport Beach, CA 92660",
      bedrooms: 5,
      bathrooms: 6,
      square_feet: 5800,
      status: "FOR SALE",
      image: "/api/placeholder/400/300",
      description: "Coastal luxury home with harbor views and private yacht access."
    },
    {
      id: "6",
      title: "Laguna Beach Art Villa",
      price: 7200000,
      address: "987 Art District Way, Laguna Beach, CA 92651",
      bedrooms: 4,
      bathrooms: 5,
      square_feet: 4200,
      status: "FOR SALE",
      image: "/api/placeholder/400/300",
      description: "Artist-inspired residence with gallery spaces and oceanfront terraces."
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
    <section className="py-12 sm:py-16 md:py-20 bg-black overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider mb-6 sm:mb-8">FEATURED PROPERTIES</h2>
          <div className="w-16 h-px bg-[#D4AF37] mx-auto"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed mt-6">
            Discover the finest luxury properties across Los Angeles and Orange County with Don Adams as your expert guide.
          </p>
        </div>
        
        {/* Featured Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {featuredProperties.map((property) => (
            <Card key={property.id} className="bg-gray-900 border-gray-800 hover:border-[#D4AF37] transition-all group overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-48 sm:h-64 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Square className="w-8 h-8 text-[#D4AF37]" />
                      </div>
                      <p className="text-sm text-gray-300 font-medium">Luxury Property</p>
                      <p className="text-xs text-gray-400 mt-1">{property.title}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                    <Badge className="bg-[#D4AF37] text-black hover:bg-[#B8941F] border-0 text-xs sm:text-sm">
                      {property.status}
                    </Badge>
                  </div>
                  
                  {/* Price */}
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                    <div className="bg-black/80 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-lg">
                      <span className="text-[#D4AF37] font-bold text-base sm:text-lg">{formatPrice(property.price)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {property.title}
                  </h3>
                  
                  <div className="flex items-center text-gray-400 mb-3 sm:mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-xs sm:text-sm">{property.address}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex items-center text-gray-400">
                      <Bed className="w-4 h-4 mr-1" />
                      <span className="text-xs sm:text-sm">{property.bedrooms}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Bath className="w-4 h-4 mr-1" />
                      <span className="text-xs sm:text-sm">{property.bathrooms}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Square className="w-4 h-4 mr-1" />
                      <span className="text-xs sm:text-sm">{property.square_feet.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{property.description}</p>
                  
                  <Button asChild className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black text-sm sm:text-base">
                    <Link href="/idx">SEARCH SIMILAR PROPERTIES</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8 sm:mt-12">
          <Button asChild size="lg" className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base mr-4">
            <Link href="/idx">SEARCH ALL PROPERTIES</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base">
            <Link href="/listings">VIEW ALL LISTINGS</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
