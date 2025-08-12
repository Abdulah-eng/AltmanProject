"use client"

import { ArrowLeft, MapPin, Building2, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Development {
  id: string
  name: string
  location: string
  description: string
  startingPrice: string
  completionDate: string
  totalUnits: number
  status: string
  developer: string
  image: string
  features: string[]
}

const sampleDevelopments: Development[] = [
  {
    id: "1",
    name: "The Residences at Hollywood",
    location: "Hollywood Hills",
    description: "Ultra-luxury condominiums with panoramic views of Los Angeles",
    startingPrice: "$2.5M",
    completionDate: "Fall 2023",
    totalUnits: 45,
    status: "Pre-Construction",
    developer: "Hollywood Luxury Developments",
    image: "/placeholder.svg?height=300&width=400&text=Hollywood+Residences",
    features: ["Panoramic Views", "Luxury Finishes", "Concierge Service", "Rooftop Pool"]
  },
  {
    id: "2",
    name: "Sunset Boulevard Towers",
    location: "West Hollywood",
    description: "Modern architectural masterpieces in the heart of West Hollywood",
    startingPrice: "$3.2M",
    completionDate: "Spring 2024",
    totalUnits: 32,
    status: "Pre-Construction",
    developer: "Sunset Luxury Group",
    image: "/placeholder.svg?height=300&width=400&text=Sunset+Towers",
    features: ["Modern Architecture", "Designer Interiors", "Smart Home Technology", "Private Balconies"]
  },
  {
    id: "3",
    name: "The Beverly Collection",
    location: "Beverly Hills",
    description: "Exclusive gated community of custom estates in Beverly Hills",
    startingPrice: "$8.5M",
    completionDate: "Summer 2024",
    totalUnits: 12,
    status: "Pre-Construction",
    developer: "Beverly Hills Luxury Estates",
    image: "/placeholder.svg?height=300&width=400&text=Beverly+Collection",
    features: ["Custom Estates", "Gated Community", "Private Gardens", "Wine Cellars"]
  },
  {
    id: "4",
    name: "Malibu Oceanfront Residences",
    location: "Malibu",
    description: "Beachfront luxury condominiums with direct ocean access",
    startingPrice: "$4.8M",
    completionDate: "Winter 2024",
    totalUnits: 28,
    status: "Pre-Construction",
    developer: "Malibu Coastal Developments",
    image: "/placeholder.svg?height=300&width=400&text=Malibu+Oceanfront",
    features: ["Beachfront Access", "Ocean Views", "Private Beach Club", "Waterfront Dining"]
  },
  {
    id: "5",
    name: "Downtown LA Skyline",
    location: "Downtown Los Angeles",
    description: "Contemporary urban living in the heart of downtown LA",
    startingPrice: "$1.8M",
    completionDate: "Spring 2024",
    totalUnits: 120,
    status: "Pre-Construction",
    developer: "Downtown LA Development Group",
    image: "/placeholder.svg?height=300&width=400&text=Downtown+Skyline",
    features: ["City Views", "Urban Lifestyle", "Fitness Center", "Rooftop Lounge"]
  },
  {
    id: "6",
    name: "Bel Air Summit Estates",
    location: "Bel Air",
    description: "Prestigious hilltop estates with breathtaking city and ocean views",
    startingPrice: "$12.5M",
    completionDate: "Fall 2024",
    totalUnits: 8,
    status: "Pre-Construction",
    developer: "Bel Air Luxury Properties",
    image: "/placeholder.svg?height=300&width=400&text=Bel+Air+Summit",
    features: ["Hilltop Views", "Custom Architecture", "Private Elevators", "Infinity Pools"]
  }
]

export default function NewDevelopmentsPage() {
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
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-wide">NEW DEVELOPMENTS</h1>
              <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Discover the most exclusive pre-construction and newly completed luxury developments across Los Angeles. Get early access and special pricing through Don Adams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Developments Grid Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sampleDevelopments.map((development, index) => (
                <div key={development.id} className={`animate-fade-in-up animate-stagger-${(index % 3) + 1}`}>
                  <Card className="bg-gray-800 border-gray-700 shadow-2xl hover:border-[#D4AF37]/50 transition-all duration-300 h-full">
                    <CardContent className="p-0 h-full flex flex-col">
                      {/* Development Image */}
                      <div className="relative">
                        <div className="w-full h-64 bg-gray-700 rounded-t-lg"></div>
                        <Badge className="absolute top-3 left-3 bg-[#D4AF37] text-black font-bold text-xs px-3 py-1">
                          NEW DEVELOPMENT
                        </Badge>
                      </div>

                      {/* Development Details */}
                      <div className="p-6 flex-1 flex flex-col">
                        {/* Location */}
                        <div className="flex items-center gap-2 text-[#D4AF37] mb-3">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm font-medium">{development.location}</span>
                        </div>
                        
                        {/* Development Name */}
                        <h3 className="text-xl font-bold text-white mb-3 flex-1">
                          {development.name}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-gray-300 text-sm mb-6 leading-relaxed flex-1">
                          {development.description}
                        </p>
                        
                        {/* Data Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                          <div className="bg-black rounded-lg p-3 text-center">
                            <div className="text-xs text-gray-400 mb-1">FROM</div>
                            <div className="text-lg font-bold text-[#D4AF37]">{development.startingPrice}</div>
                          </div>
                          <div className="bg-black rounded-lg p-3 text-center">
                            <div className="text-xs text-gray-400 mb-1">COMPLETION</div>
                            <div className="text-lg font-bold text-[#D4AF37]">{development.completionDate}</div>
                          </div>
                          <div className="bg-black rounded-lg p-3 text-center">
                            <div className="text-xs text-gray-400 mb-1">UNITS</div>
                            <div className="text-lg font-bold text-white">{development.totalUnits}</div>
                          </div>
                          <div className="bg-black rounded-lg p-3 text-center">
                            <div className="text-xs text-gray-400 mb-1">STATUS</div>
                            <div className="text-lg font-bold text-white">{development.status}</div>
                          </div>
                        </div>
                        
                        {/* Developer */}
                        <div className="flex items-center gap-2 text-gray-300 mb-4">
                          <Building2 className="w-4 h-4 text-[#D4AF37]" />
                          <span className="text-sm">{development.developer}</span>
                        </div>
                        
                        {/* View Development Link */}
                        <Link
                          href={`/development/${development.id}`}
                          className="inline-flex items-center text-[#D4AF37] hover:text-white transition-colors font-medium mt-auto"
                        >
                          View Development
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="animate-fade-in-up">
              <Card className="bg-gray-800 border-gray-700 shadow-2xl">
                <CardContent className="p-12">
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div className="text-center lg:text-left">
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Interested in a New Development?
                      </h3>
                      <p className="text-lg text-gray-300">
                        Contact Don Adams for early access, floor plans, and special pricing.
                      </p>
                    </div>
                    <Button className="bg-[#D4AF37] text-black hover:bg-[#B8941F] transition-all duration-300 font-bold px-8 py-4 text-lg">
                      SCHEDULE A CONSULTATION
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
