"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Bed, Bath, Square, Calendar, ArrowLeft, Phone, Mail, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface PropertyDetailPageProps {
  params: {
    id: string
  }
}

export default function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const [property, setProperty] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const properties = {
    "1": {
      id: "1",
      title: "Beverly Hills Estate",
      price: 12500000,
      address: "123 Beverly Hills Dr, Beverly Hills, CA 90210",
      bedrooms: 6,
      bathrooms: 8,
      square_feet: 8500,
      status: "FOR SALE",
      year_built: 2018,
      lot_size: "1.2 acres",
      property_type: "Single Family",
      description: "Stunning luxury estate with panoramic city views and resort-style amenities. This magnificent property features a grand entrance, formal living and dining rooms, gourmet kitchen with top-of-the-line appliances, master suite with private balcony, and a resort-style pool and spa area.",
      features: [
        "Panoramic city views",
        "Resort-style pool and spa",
        "Gourmet kitchen with marble countertops",
        "Master suite with private balcony",
        "Formal living and dining rooms",
        "3-car garage",
        "Smart home technology",
        "Private gated entrance"
      ],
      images: [
        "/api/placeholder/800/600",
        "/api/placeholder/800/600", 
        "/api/placeholder/800/600",
        "/api/placeholder/800/600"
      ]
    },
    "2": {
      id: "2",
      title: "Malibu Oceanfront Villa",
      price: 18500000,
      address: "456 Pacific Coast Hwy, Malibu, CA 90265",
      bedrooms: 5,
      bathrooms: 7,
      square_feet: 6200,
      status: "FOR SALE",
      year_built: 2020,
      lot_size: "0.8 acres",
      property_type: "Single Family",
      description: "Exclusive beachfront property with private beach access and infinity pool. This architectural masterpiece offers direct ocean access, floor-to-ceiling windows, open-concept living, and multiple outdoor entertaining areas.",
      features: [
        "Direct beach access",
        "Infinity pool with ocean views",
        "Floor-to-ceiling windows",
        "Open-concept living",
        "Multiple outdoor entertaining areas",
        "Private beach access",
        "Modern architecture",
        "Oceanfront location"
      ],
      images: [
        "/api/placeholder/800/600",
        "/api/placeholder/800/600",
        "/api/placeholder/800/600",
        "/api/placeholder/800/600"
      ]
    },
    "3": {
      id: "3",
      title: "Hollywood Hills Modern",
      price: 8500000,
      address: "789 Hollywood Hills Dr, Hollywood Hills, CA 90069",
      bedrooms: 4,
      bathrooms: 5,
      square_feet: 4800,
      status: "FOR SALE",
      year_built: 2019,
      lot_size: "0.6 acres",
      property_type: "Single Family",
      description: "Contemporary hillside home with smart home technology and city views. This modern masterpiece features clean lines, expansive glass walls, and seamless indoor-outdoor living.",
      features: [
        "Smart home technology",
        "City views",
        "Expansive glass walls",
        "Indoor-outdoor living",
        "Modern architecture",
        "Hillside location",
        "Private deck",
        "2-car garage"
      ],
      images: [
        "/api/placeholder/800/600",
        "/api/placeholder/800/600",
        "/api/placeholder/800/600",
        "/api/placeholder/800/600"
      ]
    },
    "4": {
      id: "4",
      title: "Santa Monica Penthouse",
      price: 6500000,
      address: "321 Ocean Ave, Santa Monica, CA 90401",
      bedrooms: 3,
      bathrooms: 4,
      square_feet: 3200,
      status: "FOR SALE",
      year_built: 2021,
      lot_size: "N/A",
      property_type: "Condo",
      description: "High-rise luxury penthouse with ocean views and resort-style amenities. This stunning residence offers panoramic ocean and city views, premium finishes, and access to building amenities.",
      features: [
        "Ocean views",
        "Penthouse location",
        "Premium finishes",
        "Building amenities",
        "Concierge service",
        "Rooftop access",
        "2 parking spaces",
        "Private elevator"
      ],
      images: [
        "/api/placeholder/800/600",
        "/api/placeholder/800/600",
        "/api/placeholder/800/600",
        "/api/placeholder/800/600"
      ]
    },
    "5": {
      id: "5",
      title: "Newport Beach Harbor View",
      price: 9500000,
      address: "654 Harbor View Dr, Newport Beach, CA 92660",
      bedrooms: 5,
      bathrooms: 6,
      square_feet: 5800,
      status: "FOR SALE",
      year_built: 2017,
      lot_size: "0.9 acres",
      property_type: "Single Family",
      description: "Coastal luxury home with harbor views and private yacht access. This elegant property offers sophisticated living with water views, outdoor entertaining spaces, and access to the harbor.",
      features: [
        "Harbor views",
        "Private yacht access",
        "Outdoor entertaining spaces",
        "Waterfront location",
        "Elegant finishes",
        "3-car garage",
        "Private dock",
        "Coastal architecture"
      ],
      images: [
        "/api/placeholder/800/600",
        "/api/placeholder/800/600",
        "/api/placeholder/800/600",
        "/api/placeholder/800/600"
      ]
    },
    "6": {
      id: "6",
      title: "Laguna Beach Art Villa",
      price: 7200000,
      address: "987 Art District Way, Laguna Beach, CA 92651",
      bedrooms: 4,
      bathrooms: 5,
      square_feet: 4200,
      status: "FOR SALE",
      year_built: 2016,
      lot_size: "0.7 acres",
      property_type: "Single Family",
      description: "Artist-inspired residence with gallery spaces and oceanfront terraces. This unique property combines artistic flair with luxury living, featuring custom art spaces and stunning ocean views.",
      features: [
        "Artist-inspired design",
        "Gallery spaces",
        "Oceanfront terraces",
        "Custom art spaces",
        "Ocean views",
        "Unique architecture",
        "Private garden",
        "2-car garage"
      ],
      images: [
        "/api/placeholder/800/600",
        "/api/placeholder/800/600",
        "/api/placeholder/800/600",
        "/api/placeholder/800/600"
      ]
    }
  }

  useEffect(() => {
    const propertyData = properties[params.id as keyof typeof properties]
    if (propertyData) {
      setProperty(propertyData)
    }
    setLoading(false)
  }, [params.id])

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
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">Loading property details...</div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
            <Button asChild>
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-gray-400">
            <Link href="/" className="hover:text-[#D4AF37]">Home</Link>
            <span className="mx-2">{">"}</span>
            <Link href="/listings" className="hover:text-[#D4AF37]">Properties</Link>
            <span className="mx-2">{">"}</span>
            <span>{property.title}</span>
          </div>
        </div>

        {/* Property Images */}
        <div className="container mx-auto px-4 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="lg:col-span-2">
              <div className="relative h-96 lg:h-[500px] bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Square className="w-8 h-8" />
                    </div>
                    <p className="text-lg">Property Image</p>
                  </div>
                </div>
                <Badge className="absolute top-4 left-4 bg-[#D4AF37] text-black font-bold px-3 py-1">
                  {property.status}
                </Badge>
                <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-2 rounded-lg">
                  <span className="text-[#D4AF37] font-bold text-xl">{formatPrice(property.price)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="container mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">{property.title}</h1>
              <div className="flex items-center text-gray-400 mb-6">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{property.address}</span>
              </div>

              {/* Property Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <Bed className="w-6 h-6 mx-auto mb-2 text-[#D4AF37]" />
                  <div className="text-2xl font-bold text-white">{property.bedrooms}</div>
                  <div className="text-sm text-gray-400">Bedrooms</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <Bath className="w-6 h-6 mx-auto mb-2 text-[#D4AF37]" />
                  <div className="text-2xl font-bold text-white">{property.bathrooms}</div>
                  <div className="text-sm text-gray-400">Bathrooms</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <Square className="w-6 h-6 mx-auto mb-2 text-[#D4AF37]" />
                  <div className="text-2xl font-bold text-white">{property.square_feet.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Sq Ft</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <Calendar className="w-6 h-6 mx-auto mb-2 text-[#D4AF37]" />
                  <div className="text-2xl font-bold text-white">{property.year_built}</div>
                  <div className="text-sm text-gray-400">Year Built</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Description</h2>
                <p className="text-gray-300 leading-relaxed">{property.description}</p>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-[#D4AF37] rounded-full mr-3"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-[#D4AF37] mb-2">{formatPrice(property.price)}</div>
                    <div className="text-gray-400">Asking Price</div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Property Type:</span>
                      <span className="text-white">{property.property_type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Lot Size:</span>
                      <span className="text-white">{property.lot_size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className="text-[#D4AF37] font-semibold">{property.status}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold">
                      <Phone className="w-4 h-4 mr-2" />
                      Contact Agent
                    </Button>
                    <Button variant="outline" className="w-full border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black">
                      <Mail className="w-4 h-4 mr-2" />
                      Schedule Tour
                    </Button>
                    <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Property
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
