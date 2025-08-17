"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Bed, Bath, Square, DollarSign } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getFeaturedProperties, Property } from "@/lib/property-utils"

interface FeaturedPropertiesProps {
  properties?: Property[] | null
}

export function FeaturedProperties({ properties: propProperties }: FeaturedPropertiesProps) {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (propProperties) {
      // Use properties passed from parent
      setProperties(propProperties)
      setLoading(false)
    } else {
      // Fallback to fetching own data
      fetchFeaturedProperties()
    }
  }, [propProperties])

  const fetchFeaturedProperties = async () => {
    try {
      setLoading(true)
      const featuredProps = await getFeaturedProperties(6)
      setProperties(featuredProps)
    } catch (error) {
      console.error('Error fetching featured properties:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`
    }
    return `$${price.toLocaleString()}`
  }

  if (loading) {
    return (
      <section className="py-12 sm:py-16 md:py-20 bg-black overflow-x-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider mb-6 sm:mb-8">FEATURED PROPERTIES</h2>
            <div className="w-16 h-px bg-[#D4AF37] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div key={index} className="bg-gray-900 rounded-lg overflow-hidden animate-pulse">
                <div className="h-48 sm:h-64 bg-gray-800"></div>
                <div className="p-4 sm:p-6">
                  <div className="h-6 bg-gray-800 rounded mb-2"></div>
                  <div className="h-4 bg-gray-800 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (properties.length === 0) {
    return (
      <section className="py-12 sm:py-16 md:py-20 bg-black overflow-x-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider mb-6 sm:mb-8">FEATURED PROPERTIES</h2>
          <div className="w-16 h-px bg-[#D4AF37] mx-auto mb-6 sm:mb-8"></div>
          <div className="text-gray-400 text-base sm:text-lg">No featured properties available at the moment.</div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-black overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider mb-6 sm:mb-8">FEATURED PROPERTIES</h2>
          <div className="w-16 h-px bg-[#D4AF37] mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {properties.map((property) => (
            <Card key={property.id} className="bg-gray-900 border-gray-800 hover:border-[#D4AF37] transition-all group overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-48 sm:h-64 overflow-hidden">
                  <Image
                    src={property.image_url || "/placeholder.jpg"}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.jpg"
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                    <Badge className="bg-[#D4AF37] text-black hover:bg-[#B8941F] border-0 text-xs sm:text-sm">
                      {property.status.replace('_', ' ').toUpperCase()}
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
                    <span className="text-xs sm:text-sm">{property.address}, {property.city}, {property.state}</span>
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
                  
                  <Button asChild className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black text-sm sm:text-base">
                    <Link href={`/listings/${property.id}`}>VIEW DETAILS</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8 sm:mt-12">
          <Button asChild size="lg" className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base">
            <Link href="/listings">VIEW ALL PROPERTIES</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
