"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { getFeaturedProperties, getAllProperties, Property, formatPrice } from "@/lib/property-utils"

export function PropertyCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    try {
      console.log("Fetching properties...")
      
      // First, let's get all properties to see what we have
      const allProperties = await getAllProperties()
      console.log("All properties in database:", allProperties)
      
      // Then get featured properties
      const featuredProperties = await getFeaturedProperties()
      console.log("Featured properties:", featuredProperties)
      
      // For now, let's show ALL properties to debug
      setProperties(allProperties)
      
      console.log("Properties set for carousel:", allProperties.length)
    } catch (error) {
      console.error('Error fetching properties:', error)
    } finally {
      setLoading(false)
    }
  }

  const nextSlide = () => {
    if (properties.length === 0) return
    setCurrentSlide((prev) => (prev + 1) % properties.length)
  }

  const prevSlide = () => {
    if (properties.length === 0) return
    setCurrentSlide((prev) => (prev - 1 + properties.length) % properties.length)
  }

  useEffect(() => {
    if (properties.length === 0) return
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [properties.length])

  const getVisibleProperties = () => {
    if (properties.length === 0) return []
    const visible = []
    for (let i = 0; i < Math.min(3, properties.length); i++) {
      const index = (currentSlide + i) % properties.length
      visible.push(properties[index])
    }
    return visible
  }

  if (loading) {
    return (
      <section className="relative h-screen bg-black overflow-hidden flex items-center justify-center">
        <div className="text-white text-xl">Loading properties...</div>
      </section>
    )
  }

  if (properties.length === 0) {
    return (
      <section className="relative h-screen bg-black overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-4">No properties available</div>
          <div className="text-gray-400 text-sm">
            Add properties through the admin dashboard
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative h-screen bg-black overflow-hidden">
      {/* Background Properties */}
      <div className="absolute inset-0">
        {properties.map((property, index) => (
          <div
            key={property.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-30" : "opacity-0"
            }`}
          >
            <Image 
              src={property.image_url || "/placeholder.svg?height=600&width=800&text=Property Image"} 
              alt={property.title} 
              fill 
              className="object-cover" 
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="lg"
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 text-white hover:text-[#D4AF37] hover:bg-black/20 w-16 h-16"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-8 h-8" />
      </Button>

      <Button
        variant="ghost"
        size="lg"
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 text-white hover:text-[#D4AF37] hover:bg-black/20 w-16 h-16"
        onClick={nextSlide}
      >
        <ChevronRight className="w-8 h-8" />
      </Button>

      {/* Property Cards */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {getVisibleProperties().map((property, index) => (
              <div
                key={`${property.id}-${currentSlide}`}
                className={`relative group cursor-pointer animate-fade-in-up animate-stagger-${index + 1} ${
                  property.featured ? "md:col-span-1 md:row-span-2" : ""
                }`}
              >
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={property.image_url || "/placeholder.svg?height=600&width=800&text=Property Image"}
                    alt={property.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300" />

                  {/* Property Info */}
                  <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                    <div className="flex justify-between items-start">
                      <div className="bg-[#D4AF37] text-black px-3 py-1 text-sm font-bold tracking-wide">
                        {property.status === 'for_sale' ? 'FOR SALE' : property.status.toUpperCase()}
                      </div>
                      {property.featured && (
                        <div className="bg-white/20 text-white px-2 py-1 text-xs rounded">
                          FEATURED
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="text-2xl font-bold mb-2 tracking-wide">{property.address}</div>
                      <div className="text-lg text-gray-300 mb-4">{property.city}</div>
                      <div className="text-sm text-gray-400 mb-2">
                        {property.bedrooms} BD | {property.bathrooms} BA | {property.square_feet.toLocaleString()} SQFT
                      </div>
                      <div className="text-3xl font-bold text-[#D4AF37] mb-4">{formatPrice(property.price)}</div>
                      <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold px-6 py-2 tracking-wide">
                        VIEW DETAILS
                      </Button>
                    </div>
                  </div>

                  {/* Gold border for featured property - only on hover */}
                  {property.featured && (
                    <div className="absolute inset-0 border-4 border-[#D4AF37] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {properties.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-[#D4AF37]" : "bg-white/50 hover:bg-white/70"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      {/* Debug Info (remove this later) */}
      <div className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded text-xs">
        Showing {properties.length} properties
      </div>
    </section>
  )
}
