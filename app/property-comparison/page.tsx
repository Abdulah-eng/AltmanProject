"use client"

import { useState } from "react"
import { ArrowLeft, Search, Filter, BarChart3, Home, MapPin, DollarSign, Bed, Bath, Square, Star, Heart, Share2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Property {
  id: string
  title: string
  price: number
  address: string
  beds: number
  baths: number
  sqft: number
  image: string
  features: string[]
  description: string
  status: "For Sale" | "Sold" | "Pending"
  yearBuilt: number
  lotSize: string
  propertyType: string
}

const sampleProperties: Property[] = [
  {
    id: "1",
    title: "Luxury Beverly Hills Estate",
    price: 8500000,
    address: "123 Beverly Hills Dr, Beverly Hills, CA 90210",
    beds: 6,
    baths: 8,
    sqft: 8500,
    image: "/placeholder.svg?height=400&width=600&text=Luxury+Estate",
    features: ["Pool", "Wine Cellar", "Home Theater", "Gym", "Chef's Kitchen", "Smart Home"],
    description: "Stunning luxury estate in the heart of Beverly Hills featuring panoramic city views, custom finishes, and world-class amenities.",
    status: "For Sale",
    yearBuilt: 2020,
    lotSize: "1.2 acres",
    propertyType: "Single Family"
  },
  {
    id: "2",
    title: "Modern Malibu Beach House",
    price: 12500000,
    address: "456 Pacific Coast Hwy, Malibu, CA 90265",
    beds: 5,
    baths: 6,
    sqft: 7200,
    image: "/placeholder.svg?height=400&width=600&text=Beach+House",
    features: ["Ocean View", "Private Beach Access", "Rooftop Deck", "Gourmet Kitchen", "Home Office", "Guest House"],
    description: "Spectacular beachfront property with direct ocean access, contemporary design, and premium finishes throughout.",
    status: "For Sale",
    yearBuilt: 2019,
    lotSize: "0.8 acres",
    propertyType: "Single Family"
  },
  {
    id: "3",
    title: "Bel Air Contemporary Villa",
    price: 9800000,
    address: "789 Bel Air Rd, Los Angeles, CA 90077",
    beds: 7,
    baths: 9,
    sqft: 9200,
    image: "/placeholder.svg?height=400&width=600&text=Contemporary+Villa",
    features: ["City Views", "Infinity Pool", "Wine Room", "Art Gallery", "Chef's Kitchen", "Smart Home", "Garden"],
    description: "Architectural masterpiece in prestigious Bel Air featuring cutting-edge design, premium materials, and breathtaking city views.",
    status: "For Sale",
    yearBuilt: 2021,
    lotSize: "1.5 acres",
    propertyType: "Single Family"
  }
]

export default function PropertyComparisonPage() {
  const [selectedProperties, setSelectedProperties] = useState<Property[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showPropertySelector, setShowPropertySelector] = useState(false)

  const addProperty = (property: Property) => {
    if (selectedProperties.length < 3 && !selectedProperties.find(p => p.id === property.id)) {
      setSelectedProperties([...selectedProperties, property])
    }
  }

  const removeProperty = (propertyId: string) => {
    setSelectedProperties(selectedProperties.filter(p => p.id !== propertyId))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const filteredProperties = sampleProperties.filter(property =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.address.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Button variant="ghost" asChild className="mb-8 text-[#D4AF37] hover:text-white hover:bg-[#D4AF37]/10 transition-all duration-300">
              <Link href="/"><ArrowLeft className="w-4 h-4 mr-2" />Back to Home</Link>
            </Button>
            <div className="animate-fade-in-up">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-wide">PROPERTY COMPARISON</h1>
              <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Compare up to 3 luxury properties side-by-side to make informed decisions. 
                Analyze features, prices, amenities, and more to find your perfect home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Property Comparison Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Property Selection */}
            <div className="animate-fade-in-up">
              <Card className="bg-gray-900 border-gray-800 shadow-2xl mb-12">
                <CardHeader className="border-b border-gray-800">
                  <CardTitle className="flex items-center gap-3 text-xl font-bold text-white">
                    <BarChart3 className="w-6 h-6 text-[#D4AF37]" />
                    Property Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Compare Properties Side-by-Side</h2>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                      Select up to 3 properties to compare features, prices, and amenities using our hybrid AI-powered feature detection.
                    </p>
                  </div>

                  {/* Selected Properties Display */}
                  {selectedProperties.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-white mb-4">Selected Properties ({selectedProperties.length}/3)</h3>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {selectedProperties.map((property) => (
                          <Card key={property.id} className="bg-gray-800 border-gray-700 relative">
                            <CardContent className="p-4">
                              <button
                                onClick={() => removeProperty(property.id)}
                                className="absolute top-2 right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-700 transition-colors"
                              >
                                ×
                              </button>
                              <div className="w-full h-32 bg-gray-700 rounded mb-3"></div>
                              <h4 className="font-semibold text-white text-sm mb-1">{property.title}</h4>
                              <p className="text-[#D4AF37] font-bold text-sm">{formatCurrency(property.price)}</p>
                              <p className="text-gray-400 text-xs">{property.address}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Property Selector */}
                  {showPropertySelector && (
                    <div className="mb-8">
                      <div className="flex gap-4 mb-4">
                        <div className="flex-1 relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                          <Input
                            placeholder="Search properties..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-gray-800 border-gray-700 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                          />
                        </div>
                        <Button
                          variant="outline"
                          className="border-gray-700 text-gray-300 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                        >
                          <Filter className="w-4 h-4 mr-2" />
                          Filters
                        </Button>
                      </div>

                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                        {filteredProperties.map((property) => (
                          <Card 
                            key={property.id} 
                            className={`bg-gray-800 border-gray-700 cursor-pointer transition-all duration-300 hover:border-[#D4AF37] ${
                              selectedProperties.find(p => p.id === property.id) ? 'border-[#D4AF37] bg-gray-700' : ''
                            }`}
                            onClick={() => addProperty(property)}
                          >
                            <CardContent className="p-4">
                              <div className="w-full h-32 bg-gray-700 rounded mb-3"></div>
                              <h4 className="font-semibold text-white text-sm mb-1">{property.title}</h4>
                              <p className="text-[#D4AF37] font-bold text-sm">{formatCurrency(property.price)}</p>
                              <p className="text-gray-400 text-xs mb-2">{property.address}</p>
                              <div className="flex items-center gap-4 text-xs text-gray-400">
                                <span className="flex items-center gap-1">
                                  <Bed className="w-3 h-3" />
                                  {property.beds}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Bath className="w-3 h-3" />
                                  {property.baths}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Square className="w-3 h-3" />
                                  {property.sqft.toLocaleString()}
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="text-center">
                    {selectedProperties.length === 0 ? (
                      <Button
                        onClick={() => setShowPropertySelector(!showPropertySelector)}
                        className="bg-[#D4AF37] text-black hover:bg-[#B8941F] transition-all duration-300 font-bold px-8 py-4 text-lg"
                      >
                        {showPropertySelector ? 'HIDE PROPERTY SELECTOR' : 'SELECT PROPERTIES TO COMPARE'}
                      </Button>
                    ) : (
                      <div className="space-y-4">
                        <Button
                          onClick={() => setShowPropertySelector(!showPropertySelector)}
                          variant="outline"
                          className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 font-bold px-6 py-3 mr-4"
                        >
                          {showPropertySelector ? 'HIDE SELECTOR' : 'ADD MORE PROPERTIES'}
                        </Button>
                        <Button
                          className="bg-[#D4AF37] text-black hover:bg-[#B8941F] transition-all duration-300 font-bold px-8 py-4 text-lg"
                        >
                          COMPARE SELECTED PROPERTIES
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Property Comparison Table */}
            {selectedProperties.length > 0 && (
              <div className="animate-fade-in-up animate-stagger-1">
                <Card className="bg-gray-900 border-gray-800 shadow-2xl">
                  <CardHeader className="border-b border-gray-800">
                    <CardTitle className="text-xl font-bold text-white">Detailed Comparison</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-800">
                            <th className="text-left p-4 text-gray-300 font-medium">Features</th>
                            {selectedProperties.map((property) => (
                              <th key={property.id} className="text-center p-4 text-white font-semibold min-w-[250px]">
                                {property.title}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-800">
                            <td className="p-4 text-gray-300 font-medium">Price</td>
                            {selectedProperties.map((property) => (
                              <td key={property.id} className="text-center p-4">
                                <div className="text-[#D4AF37] font-bold text-lg">{formatCurrency(property.price)}</div>
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b border-gray-800">
                            <td className="p-4 text-gray-300 font-medium">Address</td>
                            {selectedProperties.map((property) => (
                              <td key={property.id} className="text-center p-4">
                                <div className="text-gray-300 text-sm">{property.address}</div>
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b border-gray-800">
                            <td className="p-4 text-gray-300 font-medium">Bedrooms</td>
                            {selectedProperties.map((property) => (
                              <td key={property.id} className="text-center p-4">
                                <div className="text-white font-semibold">{property.beds}</div>
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b border-gray-800">
                            <td className="p-4 text-gray-300 font-medium">Bathrooms</td>
                            {selectedProperties.map((property) => (
                              <td key={property.id} className="text-center p-4">
                                <div className="text-white font-semibold">{property.baths}</div>
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b border-gray-800">
                            <td className="p-4 text-gray-300 font-medium">Square Feet</td>
                            {selectedProperties.map((property) => (
                              <td key={property.id} className="text-center p-4">
                                <div className="text-white font-semibold">{property.sqft.toLocaleString()}</div>
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b border-gray-800">
                            <td className="p-4 text-gray-300 font-medium">Year Built</td>
                            {selectedProperties.map((property) => (
                              <td key={property.id} className="text-center p-4">
                                <div className="text-white font-semibold">{property.yearBuilt}</div>
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b border-gray-800">
                            <td className="p-4 text-gray-300 font-medium">Lot Size</td>
                            {selectedProperties.map((property) => (
                              <td key={property.id} className="text-center p-4">
                                <div className="text-white font-semibold">{property.lotSize}</div>
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b border-gray-800">
                            <td className="p-4 text-gray-300 font-medium">Property Type</td>
                            {selectedProperties.map((property) => (
                              <td key={property.id} className="text-center p-4">
                                <div className="text-white font-semibold">{property.propertyType}</div>
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b border-gray-800">
                            <td className="p-4 text-gray-300 font-medium">Status</td>
                            {selectedProperties.map((property) => (
                              <td key={property.id} className="text-center p-4">
                                <Badge 
                                  className={`${
                                    property.status === 'For Sale' ? 'bg-green-600' : 
                                    property.status === 'Sold' ? 'bg-red-600' : 'bg-yellow-600'
                                  } text-white`}
                                >
                                  {property.status}
                                </Badge>
                              </td>
                            ))}
                          </tr>
                          <tr>
                            <td className="p-4 text-gray-300 font-medium">Features</td>
                            {selectedProperties.map((property) => (
                              <td key={property.id} className="text-center p-4">
                                <div className="space-y-2">
                                  {property.features.map((feature, index) => (
                                    <Badge key={index} variant="outline" className="border-[#D4AF37] text-[#D4AF37] text-xs">
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Need Help Choosing?</h2>
              <p className="text-lg text-gray-300 mb-12 leading-relaxed">
                Don Adams can provide expert guidance on property selection, market analysis, and help you understand the unique benefits of each property.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-[#D4AF37] text-black hover:bg-[#B8941F] transition-all duration-300 font-bold px-8 py-3">
                  SCHEDULE CONSULTATION
                </Button>
                <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 font-bold px-8 py-3">
                  VIEW MORE PROPERTIES
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
