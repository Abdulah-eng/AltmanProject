"use client"

import { useState } from "react"
import { ArrowLeft, Search, Filter, MapPin, Bed, Bath, Square, ChevronDown, X, ArrowRight, ArrowLeft as ArrowLeftIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Property {
  id: string
  mlsNumber: string
  address: string
  city: string
  price: number
  beds: number
  baths: number
  sqft: number
  image: string
  description: string
  features: string[]
}

const sampleProperties: Property[] = [
  {
    id: "1",
    mlsNumber: "MLS001",
    address: "1234 Hollywood Blvd",
    city: "Hollywood",
    price: 2850000,
    beds: 4,
    baths: 3.5,
    sqft: 3200,
    image: "/placeholder.svg?height=300&width=400&text=Hollywood+Home",
    description: "Stunning Hollywood Hills home with city views, modern amenities, and luxury finishes throughout.",
    features: ["Pool", "City View", "Gourmet Kitchen", "Smart Home"]
  },
  {
    id: "2",
    mlsNumber: "MLS002",
    address: "2567 Rodeo Drive",
    city: "Beverly Hills",
    price: 4850000,
    beds: 5,
    baths: 6,
    sqft: 4800,
    image: "/placeholder.svg?height=300&width=400&text=Beverly+Hills+Estate",
    description: "Luxurious Beverly Hills estate featuring designer finishes, pool, and private garden.",
    features: ["Pool", "Garden", "Wine Cellar", "Home Theater"]
  },
  {
    id: "3",
    mlsNumber: "MLS003",
    address: "800 Sunset Plaza",
    city: "West Hollywood",
    price: 3250000,
    beds: 3,
    baths: 3.5,
    sqft: 2800,
    image: "/placeholder.svg?height=300&width=400&text=Sunset+Plaza+Home",
    description: "Contemporary West Hollywood home with open floor plan and premium finishes.",
    features: ["Open Floor Plan", "Premium Finishes", "Balcony", "Garage"]
  },
  {
    id: "4",
    mlsNumber: "MLS004",
    address: "1234 Mulholland Dr",
    city: "Studio City",
    price: 1950000,
    beds: 4,
    baths: 3,
    sqft: 2600,
    image: "/placeholder.svg?height=300&width=400&text=Studio+City+Home",
    description: "Beautiful Studio City home with canyon views and updated kitchen and bathrooms.",
    features: ["Canyon View", "Updated Kitchen", "Hardwood Floors", "Fireplace"]
  },
  {
    id: "5",
    mlsNumber: "MLS005",
    address: "5678 Laurel Canyon Blvd",
    city: "Laurel Canyon",
    price: 3450000,
    beds: 5,
    baths: 4.5,
    sqft: 3800,
    image: "/placeholder.svg?height=300&width=400&text=Laurel+Canyon+Home",
    description: "Architectural Laurel Canyon home with stunning views and custom design elements.",
    features: ["Architectural Design", "Canyon Views", "Custom Finishes", "Pool"]
  },
  {
    id: "6",
    mlsNumber: "MLS006",
    address: "8901 Sunset Blvd",
    city: "Brentwood",
    price: 4250000,
    beds: 6,
    baths: 7,
    sqft: 5200,
    image: "/placeholder.svg?height=300&width=400&text=Brentwood+Estate",
    description: "Magnificent Brentwood estate with tennis court, pool, and guest house.",
    features: ["Tennis Court", "Pool", "Guest House", "Wine Cellar"]
  },
  {
    id: "7",
    mlsNumber: "MLS007",
    address: "321 Malibu Colony Rd",
    city: "Malibu",
    price: 24950000,
    beds: 5,
    baths: 6,
    sqft: 5500,
    image: "/placeholder.svg?height=300&width=400&text=Malibu+Colony+Home",
    description: "Beachfront Malibu Colony home with direct sand access. Features include a gourmet kitchen, home theater, and panoramic ocean views.",
    features: ["Beachfront", "Ocean View", "Gourmet Kitchen", "Home Theater"]
  },
  {
    id: "8",
    mlsNumber: "MLS008",
    address: "654 Silver Lake Blvd",
    city: "Silver Lake",
    price: 2195000,
    beds: 3,
    baths: 2.5,
    sqft: 2400,
    image: "/placeholder.svg?height=300&width=400&text=Silver+Lake+Home",
    description: "Beautifully renovated mid-century modern home with reservoir views, original details, and updated amenities.",
    features: ["Mid-Century Modern", "Reservoir View", "Original Details", "Updated"]
  },
  {
    id: "9",
    mlsNumber: "MLS009",
    address: "987 Beverly Grove Pl",
    city: "Beverly Grove",
    price: 3295000,
    beds: 4,
    baths: 4.5,
    sqft: 3600,
    image: "/placeholder.svg?height=300&width=400&text=Beverly+Grove+Home",
    description: "Brand new construction in Beverly Grove featuring an open floor plan, designer finishes, and smart home technology.",
    features: ["New Construction", "Open Floor Plan", "Designer Finishes", "Smart Home"]
  }
]

export default function MLSListingsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [priceMin, setPriceMin] = useState("")
  const [priceMax, setPriceMax] = useState("")
  const [beds, setBeds] = useState("")
  const [baths, setBaths] = useState("")
  const [propertyType, setPropertyType] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>(["Luxury", "Pool", "View", "New Construction"])
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState("Newest")

  const propertiesPerPage = 6
  const totalPages = Math.ceil(sampleProperties.length / propertiesPerPage)

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const filteredProperties = sampleProperties.filter(property => {
    const matchesSearch = property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.mlsNumber.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesPrice = (!priceMin || property.price >= parseInt(priceMin)) &&
                        (!priceMax || property.price <= parseInt(priceMax))
    
    const matchesBeds = !beds || property.beds >= parseInt(beds)
    const matchesBaths = !baths || property.baths >= parseFloat(baths)
    
    return matchesSearch && matchesPrice && matchesBeds && matchesBaths
  })

  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * propertiesPerPage,
    currentPage * propertiesPerPage
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
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-wide">MLS LISTINGS</h1>
              <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Search the latest MLS listings across Los Angeles and find your dream home. Get exclusive access to off-market properties through Don Adams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="animate-fade-in-up">
              <Card className="bg-gray-900 border-gray-800 shadow-2xl">
                <CardContent className="p-8">
                  {/* Search Inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
                    <div className="md:col-span-2 relative">
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <Input
                        placeholder="Location, Address, MLS#"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pr-10 bg-gray-800 border-gray-700 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                      />
                    </div>
                    
                    <Select value={priceMin} onValueChange={setPriceMin}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]">
                        <SelectValue placeholder="Price (Min)" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="">Any</SelectItem>
                        <SelectItem value="500000">$500K</SelectItem>
                        <SelectItem value="1000000">$1M</SelectItem>
                        <SelectItem value="2000000">$2M</SelectItem>
                        <SelectItem value="5000000">$5M</SelectItem>
                        <SelectItem value="10000000">$10M</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={priceMax} onValueChange={setPriceMax}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]">
                        <SelectValue placeholder="Price (Max)" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="">Any</SelectItem>
                        <SelectItem value="1000000">$1M</SelectItem>
                        <SelectItem value="2000000">$2M</SelectItem>
                        <SelectItem value="5000000">$5M</SelectItem>
                        <SelectItem value="10000000">$10M</SelectItem>
                        <SelectItem value="50000000">$50M</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={beds} onValueChange={setBeds}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]">
                        <SelectValue placeholder="Beds" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="">Any</SelectItem>
                        <SelectItem value="1">1+</SelectItem>
                        <SelectItem value="2">2+</SelectItem>
                        <SelectItem value="3">3+</SelectItem>
                        <SelectItem value="4">4+</SelectItem>
                        <SelectItem value="5">5+</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={baths} onValueChange={setBaths}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]">
                        <SelectValue placeholder="Baths" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="">Any</SelectItem>
                        <SelectItem value="1">1+</SelectItem>
                        <SelectItem value="1.5">1.5+</SelectItem>
                        <SelectItem value="2">2+</SelectItem>
                        <SelectItem value="2.5">2.5+</SelectItem>
                        <SelectItem value="3">3+</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={propertyType} onValueChange={setPropertyType}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="">Any</SelectItem>
                        <SelectItem value="single-family">Single Family</SelectItem>
                        <SelectItem value="condo">Condo</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                        <SelectItem value="multi-family">Multi-Family</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Active Filters */}
                  {activeFilters.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {activeFilters.map((filter) => (
                        <Badge
                          key={filter}
                          variant="outline"
                          className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                        >
                          {filter}
                          <button
                            onClick={() => removeFilter(filter)}
                            className="ml-2 hover:text-[#D4AF37]"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Search Button */}
                  <div className="text-center">
                    <Button className="bg-[#D4AF37] text-black hover:bg-[#B8941F] transition-all duration-300 font-bold px-8 py-4 text-lg">
                      <Filter className="w-5 h-5 mr-2" />
                      SEARCH PROPERTIES
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Results Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <div className="text-white mb-4 md:mb-0">
                Showing <span className="font-bold">{filteredProperties.length}</span> properties
              </div>
              <div className="flex items-center gap-3">
                <span className="text-white">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="Newest">Newest</SelectItem>
                    <SelectItem value="Price High">Price High</SelectItem>
                    <SelectItem value="Price Low">Price Low</SelectItem>
                    <SelectItem value="Beds">Beds</SelectItem>
                    <SelectItem value="Baths">Baths</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Property Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {paginatedProperties.map((property) => (
                <div key={property.id} className="animate-fade-in-up">
                  <Card className="bg-gray-800 border-gray-700 shadow-2xl hover:border-[#D4AF37]/50 transition-all duration-300">
                    <CardContent className="p-0">
                      {/* Property Image */}
                      <div className="relative">
                        <div className="w-full h-64 bg-gray-700 rounded-t-lg"></div>
                        <Badge className="absolute top-3 left-3 bg-[#D4AF37] text-black font-bold">
                          {property.mlsNumber}
                        </Badge>
                      </div>

                      {/* Property Details */}
                      <div className="p-6">
                        <div className="flex items-center gap-2 text-[#D4AF37] mb-2">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{property.city}</span>
                        </div>
                        
                        <h3 className="text-lg font-bold text-white mb-3">
                          {property.address}
                        </h3>
                        
                        <div className="text-2xl font-bold text-[#D4AF37] mb-4">
                          {formatCurrency(property.price)}
                        </div>
                        
                        <div className="flex items-center gap-6 mb-4 text-sm text-gray-300">
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
                            {property.sqft.toLocaleString()} Sq Ft
                          </span>
                        </div>
                        
                        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                          {property.description}
                        </p>
                        
                        <Link
                          href={`/property/${property.id}`}
                          className="inline-flex items-center text-[#D4AF37] hover:text-white transition-colors font-medium"
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="border-gray-700 text-gray-300 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                >
                  <ArrowLeftIcon className="w-4 h-4" />
                </Button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page 
                      ? "bg-[#D4AF37] text-black hover:bg-[#B8941F]" 
                      : "border-gray-700 text-gray-300 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                    }
                  >
                    {page}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="border-gray-700 text-gray-300 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
