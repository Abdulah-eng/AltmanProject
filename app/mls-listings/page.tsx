"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Search, Filter, MapPin, Bed, Bath, Square, ChevronDown, X, ArrowRight, ArrowLeft as ArrowLeftIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { 
  getAllProperties, 
  getUniqueCities, 
  getUniquePropertyTypes, 
  getPriceRanges,
  getUniqueBedroomCounts,
  getUniqueBathroomCounts,
  Property,
  formatPrice,
  getStatusDisplay,
  getPropertyTypeDisplay
} from "@/lib/property-utils"
import Image from "next/image"

export default function MLSListingsPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCity, setSelectedCity] = useState("any")
  const [selectedPropertyType, setSelectedPropertyType] = useState("any")
  const [priceMin, setPriceMin] = useState("any")
  const [priceMax, setPriceMax] = useState("any")
  const [beds, setBeds] = useState("any")
  const [baths, setBaths] = useState("any")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState("Newest")
  
  // Filter options from database
  const [cities, setCities] = useState<string[]>([])
  const [propertyTypes, setPropertyTypes] = useState<string[]>([])
  const [bedroomCounts, setBedroomCounts] = useState<number[]>([])
  const [bathroomCounts, setBathroomCounts] = useState<number[]>([])
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000000 })

  const propertiesPerPage = 6

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      
      // Fetch properties and filter options in parallel
      const [propertiesData, citiesData, propertyTypesData, bedroomCountsData, bathroomCountsData, priceRangeData] = await Promise.all([
        getAllProperties(),
        getUniqueCities(),
        getUniquePropertyTypes(),
        getUniqueBedroomCounts(),
        getUniqueBathroomCounts(),
        getPriceRanges()
      ])

      setProperties(propertiesData)
      setFilteredProperties(propertiesData)
      setCities(citiesData)
      setPropertyTypes(propertyTypesData)
      setBedroomCounts(bedroomCountsData)
      setBathroomCounts(bathroomCountsData)
      setPriceRange(priceRangeData)
      
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Apply filters whenever filter values change
  useEffect(() => {
    applyFilters()
  }, [properties, searchTerm, selectedCity, selectedPropertyType, priceMin, priceMax, beds, baths, sortBy])

  const applyFilters = () => {
    let filtered = [...properties]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(property => 
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.city.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // City filter
    if (selectedCity !== "any") {
      filtered = filtered.filter(property => property.city === selectedCity)
    }

    // Property type filter
    if (selectedPropertyType !== "any") {
      filtered = filtered.filter(property => property.property_type === selectedPropertyType)
    }

    // Price filters
    if (priceMin !== "any") {
      filtered = filtered.filter(property => property.price >= parseInt(priceMin))
    }
    if (priceMax !== "any") {
      filtered = filtered.filter(property => property.price <= parseInt(priceMax))
    }

    // Bedrooms filter
    if (beds !== "any") {
      filtered = filtered.filter(property => property.bedrooms >= parseInt(beds))
    }

    // Bathrooms filter
    if (baths !== "any") {
      filtered = filtered.filter(property => property.bathrooms >= parseFloat(baths))
    }

    // Sorting
    switch (sortBy) {
      case "Price High":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "Price Low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "Beds":
        filtered.sort((a, b) => b.bedrooms - a.bedrooms)
        break
      case "Baths":
        filtered.sort((a, b) => b.bathrooms - a.bathrooms)
        break
      case "Newest":
      default:
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
    }

    setFilteredProperties(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCity("any")
    setSelectedPropertyType("any")
    setPriceMin("any")
    setPriceMax("any")
    setBeds("any")
    setBaths("any")
    setSortBy("Newest")
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (searchTerm) count++
    if (selectedCity !== "any") count++
    if (selectedPropertyType !== "any") count++
    if (priceMin !== "any") count++
    if (priceMax !== "any") count++
    if (beds !== "any") count++
    if (baths !== "any") count++
    return count
  }

  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage)
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * propertiesPerPage,
    currentPage * propertiesPerPage
  )

  // Generate price options based on actual data
  const generatePriceOptions = () => {
    const options = [{ value: "any", label: "Any" }]
    
    if (priceRange.max > 1000000) {
      options.push({ value: "1000000", label: "$1M+" })
    }
    if (priceRange.max > 2000000) {
      options.push({ value: "2000000", label: "$2M+" })
    }
    if (priceRange.max > 5000000) {
      options.push({ value: "5000000", label: "$5M+" })
    }
    if (priceRange.max > 10000000) {
      options.push({ value: "10000000", label: "$10M+" })
    }
    if (priceRange.max > 20000000) {
      options.push({ value: "20000000", label: "$20M+" })
    }
    
    return options
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37] mx-auto mb-4"></div>
            <p className="text-gray-400">Loading MLS listings...</p>
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
              <div className="flex items-center justify-center mb-8">
                <Link href="/" className="flex items-center text-[#D4AF37] hover:text-[#B8941F] transition-colors">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </div>
              <div className="animate-fade-in-up">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-wide">MLS LISTINGS</h1>
                <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
                <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Discover exclusive luxury properties from the MLS database. Find your dream home with comprehensive search and filtering options.
                </p>
                <div className="mt-6 text-sm text-gray-400">
                  {properties.length} properties available
                </div>
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
                          placeholder="Search by title, address, or city..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pr-10 bg-gray-800 border-gray-700 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                        />
                      </div>
                      
                      <Select value={selectedCity} onValueChange={setSelectedCity}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]">
                          <SelectValue placeholder="City" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="any">Any City</SelectItem>
                          {cities.map((city) => (
                            <SelectItem key={city} value={city}>{city}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select value={selectedPropertyType} onValueChange={setSelectedPropertyType}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]">
                          <SelectValue placeholder="Property Type" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="any">Any Type</SelectItem>
                          {propertyTypes.map((type) => (
                            <SelectItem key={type} value={type}>{getPropertyTypeDisplay(type)}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select value={priceMin} onValueChange={setPriceMin}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]">
                          <SelectValue placeholder="Min Price" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          {generatePriceOptions().map((option) => (
                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Additional Filters */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                      <Select value={beds} onValueChange={setBeds}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]">
                          <SelectValue placeholder="Beds" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="any">Any</SelectItem>
                          {bedroomCounts.map((count) => (
                            <SelectItem key={count} value={count.toString()}>{count}+</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select value={baths} onValueChange={setBaths}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]">
                          <SelectValue placeholder="Baths" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="any">Any</SelectItem>
                          {bathroomCounts.map((count) => (
                            <SelectItem key={count} value={count.toString()}>{count}+</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]">
                          <SelectValue placeholder="Sort By" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="Newest">Newest</SelectItem>
                          <SelectItem value="Price High">Price High</SelectItem>
                          <SelectItem value="Price Low">Price Low</SelectItem>
                          <SelectItem value="Beds">Beds</SelectItem>
                          <SelectItem value="Baths">Baths</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button 
                        onClick={clearFilters}
                        variant="outline" 
                        className="border-gray-700 text-gray-300 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                      >
                        Clear Filters
                      </Button>
                    </div>

                    {/* Active Filters Display */}
                    {getActiveFiltersCount() > 0 && (
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-sm text-gray-400">Active filters:</span>
                        {searchTerm && (
                          <Badge variant="secondary" className="bg-[#D4AF37] text-black">
                            Search: {searchTerm}
                            <button onClick={() => setSearchTerm("")} className="ml-2">
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        )}
                        {selectedCity !== "any" && (
                          <Badge variant="secondary" className="bg-[#D4AF37] text-black">
                            City: {selectedCity}
                            <button onClick={() => setSelectedCity("any")} className="ml-2">
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        )}
                        {selectedPropertyType !== "any" && (
                          <Badge variant="secondary" className="bg-[#D4AF37] text-black">
                            Type: {getPropertyTypeDisplay(selectedPropertyType)}
                            <button onClick={() => setSelectedPropertyType("any")} className="ml-2">
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        )}
                        {priceMin !== "any" && (
                          <Badge variant="secondary" className="bg-[#D4AF37] text-black">
                            Min: ${parseInt(priceMin).toLocaleString()}
                            <button onClick={() => setPriceMin("any")} className="ml-2">
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        )}
                        {beds !== "any" && (
                          <Badge variant="secondary" className="bg-[#D4AF37] text-black">
                            Beds: {beds}+
                            <button onClick={() => setBeds("any")} className="ml-2">
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        )}
                        {baths !== "any" && (
                          <Badge variant="secondary" className="bg-[#D4AF37] text-black">
                            Baths: {baths}+
                            <button onClick={() => setBaths("any")} className="ml-2">
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Results Count */}
                    <div className="text-sm text-gray-400">
                      Showing {filteredProperties.length} of {properties.length} properties
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Properties Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              {filteredProperties.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-gray-400 text-lg mb-4">
                    No properties match your current filters.
                  </div>
                  <Button onClick={clearFilters} variant="outline" className="border-gray-700 text-gray-300 hover:border-[#D4AF37] hover:text-[#D4AF37]">
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {paginatedProperties.map((property, index) => (
                      <div key={property.id} className={`animate-fade-in-up animate-stagger-${(index % 3) + 1}`}>
                        <Card className="bg-gray-800 border-gray-700 shadow-2xl hover:border-[#D4AF37]/50 transition-all duration-300 h-full">
                          <CardContent className="p-0 h-full flex flex-col">
                            {/* Property Image */}
                            <div className="relative">
                              {property.image_url ? (
                                <div className="w-full h-64 relative overflow-hidden rounded-t-lg">
                                  <Image
                                    src={property.image_url}
                                    alt={property.title}
                                    fill
                                    className="object-cover"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement
                                      target.style.display = 'none'
                                    }}
                                  />
                                </div>
                              ) : (
                                <div className="w-full h-64 bg-gray-700 rounded-t-lg flex items-center justify-center">
                                  <span className="text-gray-500">No Image</span>
                                </div>
                              )}
                              <Badge className="absolute top-3 left-3 bg-[#D4AF37] text-black font-bold text-xs px-3 py-1">
                                {getStatusDisplay(property.status)}
                              </Badge>
                              {property.featured && (
                                <Badge className="absolute top-3 right-3 bg-red-600 text-white font-bold text-xs px-3 py-1">
                                  FEATURED
                                </Badge>
                              )}
                            </div>

                            {/* Property Details */}
                            <div className="p-6 flex-1 flex flex-col">
                              {/* Location */}
                              <div className="flex items-center gap-2 text-[#D4AF37] mb-3">
                                <MapPin className="w-4 h-4" />
                                <span className="text-sm font-medium">{property.city}, {property.state}</span>
                              </div>
                              
                              {/* Property Title */}
                              <h3 className="text-lg font-bold text-white mb-3 flex-1">
                                {property.title}
                              </h3>
                              
                              {/* Price */}
                              <div className="text-2xl font-bold text-[#D4AF37] mb-4">
                                {formatPrice(property.price)}
                              </div>
                              
                              {/* Property Stats */}
                              <div className="flex items-center gap-6 mb-4 text-sm text-gray-300">
                                <span className="flex items-center gap-1">
                                  <Bed className="w-4 h-4" />
                                  {property.bedrooms} Beds
                                </span>
                                <span className="flex items-center gap-1">
                                  <Bath className="w-4 h-4" />
                                  {property.bathrooms} Baths
                                </span>
                                <span className="flex items-center gap-1">
                                  <Square className="w-4 h-4" />
                                  {property.square_feet.toLocaleString()} Sq Ft
                                </span>
                              </div>
                              
                              {/* Description */}
                              {property.description && (
                                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                                  {property.description}
                                </p>
                              )}
                              
                              {/* Property Type */}
                              <div className="mb-4">
                                <Badge variant="outline" className="border-gray-600 text-gray-300">
                                  {getPropertyTypeDisplay(property.property_type)}
                                </Badge>
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
                </>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
