"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bed, Bath, Square, MapPin, Heart, Search, SlidersHorizontal } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getProperties, Property, formatPrice, getStatusDisplay } from "@/lib/property-utils"
import { getImageByKey, ImageData } from "@/lib/image-utils"

export default function ListingsPage() {
  const [sortBy, setSortBy] = useState("price-desc")
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
  const [heroImage, setHeroImage] = useState<ImageData | null>(null)

  useEffect(() => {
    fetchProperties()
  }, [])

  useEffect(() => {
    sortProperties()
  }, [properties, sortBy])

  const fetchProperties = async () => {
    try {
      console.log("Fetching properties for listings page...")
      const allProperties = await getProperties()
      console.log("Properties found:", allProperties)
      setProperties(allProperties)

      // Fetch hero image
      const hero = await getImageByKey('hero_image')
      if (hero) setHeroImage(hero)
    } catch (error) {
      console.error('Error fetching properties:', error)
    } finally {
      setLoading(false)
    }
  }

  const sortProperties = () => {
    let sorted = [...properties]
    
    switch (sortBy) {
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price)
        break
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price)
        break
      case "newest":
        sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case "oldest":
        sorted.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
        break
      default:
        break
    }
    
    setFilteredProperties(sorted)
  }

  const getHeroImageUrl = () => {
    return heroImage?.url || "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-nfS94mDfBEddcWOUgjmLLL83ujHoRh.png"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white text-xl">Loading properties...</div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={getHeroImageUrl()}
            alt={heroImage?.alt_text || "Luxury Real Estate Hero"}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Breadcrumb */}
        <div className="absolute top-32 left-8 z-10 text-white text-sm tracking-wide">
          <Link href="/" className="hover:text-[#D4AF37]">
            HOME
          </Link>
          <span className="mx-2">{">"}</span>
          <span>LISTINGS</span>
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <div className="text-[#D4AF37] text-lg tracking-[0.3em] mb-4">LUXURY REAL ESTATE</div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-wider mb-8">
              <span className="border-l-4 border-[#D4AF37] pl-8">LISTINGS</span>
            </h1>
          </div>
        </div>

        {/* Search Bar */}
        <div className="absolute bottom-20 left-8 z-10">
          <div className="flex items-center space-x-4">
            <div className="text-white text-lg tracking-[0.2em]">SEARCH LISTINGS</div>
            <div className="w-8 h-0.5 bg-[#D4AF37]"></div>
            <Search className="w-6 h-6 text-[#D4AF37]" />
          </div>
        </div>

        {/* Side Navigation */}
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-20">
          <div className="flex flex-col space-y-4">
            <div className="bg-[#D4AF37] text-black px-4 py-8 text-sm font-bold tracking-[0.2em] writing-mode-vertical">
              FOR SALE
            </div>
            <div className="bg-transparent border border-white text-white px-4 py-8 text-sm font-bold tracking-[0.2em] writing-mode-vertical hover:bg-white hover:text-black transition-colors">
              FOR LEASE
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-6">
              <div className="text-white text-sm tracking-wide">
                SHOWING <span className="text-[#D4AF37] font-bold">{filteredProperties.length}</span> PROPERTIES
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-white text-sm tracking-wide">SORT BY:</div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-black border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black border-gray-700">
                  <SelectItem value="price-desc" className="text-white hover:text-[#D4AF37]">
                    PRICE DESC
                  </SelectItem>
                  <SelectItem value="price-asc" className="text-white hover:text-[#D4AF37]">
                    PRICE ASC
                  </SelectItem>
                  <SelectItem value="newest" className="text-white hover:text-[#D4AF37]">
                    NEWEST
                  </SelectItem>
                  <SelectItem value="oldest" className="text-white hover:text-[#D4AF37]">
                    OLDEST
                  </SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                className="bg-transparent border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                FILTERS
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          {filteredProperties.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-white text-2xl mb-4">No properties found</div>
              <div className="text-gray-400 text-lg">
                Check back soon for new luxury properties
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <Card
                  key={property.id}
                  className="bg-gray-900 border-gray-800 hover:border-[#D4AF37] transition-all duration-300 group overflow-hidden"
                >
                  <div className="relative">
                    <Image
                      src={property.image_url || "/placeholder.svg?height=300&width=400&text=Property Image"}
                      alt={property.title}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />

                    {/* Status Badge */}
                    <Badge
                      className={`absolute top-4 left-4 ${
                        property.status === "for_sale"
                          ? "bg-[#D4AF37] text-black"
                          : "bg-transparent border border-white text-white"
                      }`}
                    >
                      {getStatusDisplay(property.status)}
                    </Badge>

                    {/* Featured Badge */}
                    {property.featured && (
                      <Badge className="absolute top-4 right-16 bg-white text-black">
                        FEATURED
                      </Badge>
                    )}

                    {/* Heart Icon */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>

                    {/* Property Details Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="text-2xl font-bold text-[#D4AF37] mb-2">{formatPrice(property.price)}</div>
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-[#D4AF37] transition-colors">
                        {property.title}
                      </h3>
                      <div className="flex items-center text-gray-300 mb-4">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{property.address}</span>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <div className="flex items-center">
                        <Bed className="w-4 h-4 mr-1" />
                        <span>{property.bedrooms} BD</span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="w-4 h-4 mr-1" />
                        <span>{property.bathrooms} BA</span>
                      </div>
                      <div className="flex items-center">
                        <Square className="w-4 h-4 mr-1" />
                        <span>{property.square_feet?.toLocaleString()} SQFT</span>
                      </div>
                    </div>

                    {property.description && (
                      <p className="text-gray-300 text-sm mb-6 line-clamp-2">{property.description}</p>
                    )}

                    <Button
                      asChild
                      className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold tracking-wide"
                    >
                      <Link href={`/listings/${property.id}`}>VIEW DETAILS</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .writing-mode-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </div>
  )
}
