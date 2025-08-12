"use client"

import { MapPin, Bed, Bath, Square, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Property {
  id: string
  title: string
  location: string
  price: string
  beds: number
  baths: number
  sqft: number
  image: string
  featured: boolean
}

const featuredProperties: Property[] = [
  {
    id: "1",
    title: "Stunning Hollywood Hills Modern Estate",
    location: "Hollywood Hills",
    price: "$8.75M",
    beds: 5,
    baths: 6,
    sqft: 6500,
    image: "/placeholder.svg?height=400&width=600&text=Hollywood+Hills+Estate",
    featured: true
  },
  {
    id: "2",
    title: "Beverly Hills Luxury Mansion",
    location: "Beverly Hills",
    price: "$15.75M",
    beds: 6,
    baths: 8,
    sqft: 8200,
    image: "/placeholder.svg?height=400&width=600&text=Beverly+Hills+Mansion",
    featured: true
  },
  {
    id: "3",
    title: "Sunset Strip Contemporary",
    location: "West Hollywood",
    price: "$6.00M",
    beds: 4,
    baths: 5,
    sqft: 4200,
    image: "/placeholder.svg?height=400&width=600&text=Sunset+Strip+Contemporary",
    featured: true
  }
]

export function FeaturedProperties() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-wide">
              FEATURED PROPERTIES
            </h2>
            <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover our handpicked selection of luxury properties across Los Angeles
            </p>
          </div>

          {/* Properties Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProperties.map((property, index) => (
              <div key={property.id} className={`animate-fade-in-up animate-stagger-${(index % 3) + 1}`}>
                <Card className="bg-gray-800 border-gray-700 shadow-2xl hover:border-[#D4AF37]/50 transition-all duration-300 h-full">
                  <CardContent className="p-0 h-full flex flex-col">
                    {/* Property Image */}
                    <div className="relative">
                      <div className="w-full h-64 bg-gray-700 rounded-t-lg"></div>
                      
                      {/* Price Overlay */}
                      <div className="absolute bottom-3 left-3 text-white">
                        <span className="text-2xl font-bold">{property.price}</span>
                        <span className="text-[#D4AF37] text-3xl ml-1">$</span>
                      </div>
                      
                      {/* Featured Badge */}
                      {property.featured && (
                        <Badge className="absolute bottom-3 right-3 bg-[#D4AF37] text-black font-bold text-xs px-3 py-1">
                          FEATURED
                        </Badge>
                      )}
                    </div>

                    {/* Property Details */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Location */}
                      <div className="flex items-center gap-2 text-[#D4AF37] mb-3">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-medium">{property.location}</span>
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-4 flex-1 leading-tight">
                        {property.title}
                      </h3>
                      
                      {/* Property Specs */}
                      <div className="flex items-center gap-6 mb-6 text-sm text-gray-300">
                        <span className="flex items-center gap-1">
                          <Bed className="w-4 h-4" />
                          {property.beds} Beds
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath className="w-4 h-4" />
                          {property.baths} Baths
                        </span>
                        <span className="flex items-center gap-1">
                          <Square className="w-4 h-4" />
                          {property.sqft.toLocaleString()} sq ft
                        </span>
                      </div>
                      
                      {/* View Details Link */}
                      <Link
                        href={`/property/${property.id}`}
                        className="inline-flex items-center text-[#D4AF37] hover:text-white transition-colors font-medium mt-auto"
                      >
                        View Details
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* View All Properties Button */}
          <div className="text-center animate-fade-in-up">
            <Button className="bg-[#D4AF37] text-black hover:bg-[#B8941F] transition-all duration-300 font-bold px-8 py-4 text-lg">
              VIEW ALL PROPERTIES
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
