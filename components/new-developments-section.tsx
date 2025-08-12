"use client"

import { MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Development {
  name: string
  location: string
  description: string
  startingPrice: string
  completion: string
  units: number
  status: string
  features: string[]
}

const developments: Development[] = [
  {
    name: "The Residences at Hollywood",
    location: "Hollywood Hills",
    description: "Ultra-luxury condominiums with panoramic views of Los Angeles",
    startingPrice: "$2.5M",
    completion: "Fall 2023",
    units: 45,
    status: "Pre-Construction",
    features: ["Rooftop infinity pool", "Private theater", "Concierge service"]
  },
  {
    name: "Sunset Boulevard Towers",
    location: "West Hollywood",
    description: "Modern architectural masterpieces in the heart of West Hollywood",
    startingPrice: "$3.2M",
    completion: "Spring 2024",
    units: 32,
    status: "Pre-Construction",
    features: ["Smart home technology", "Private elevators", "Wine cellars"]
  },
  {
    name: "The Beverly Collection",
    location: "Beverly Hills",
    description: "Exclusive gated community of custom estates in Beverly Hills",
    startingPrice: "$8.5M",
    completion: "Summer 2024",
    units: 12,
    status: "Pre-Construction",
    features: ["1-acre lots", "Wellness centers", "Guest houses"]
  }
]

export function NewDevelopmentsSection() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-wide">
              NEW DEVELOPMENTS
            </h2>
            <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover the most exclusive pre-construction and newly completed luxury developments across Los Angeles.
            </p>
          </div>

          {/* Development Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12 animate-fade-in-up animate-stagger-1">
            {developments.map((development, index) => (
              <Card key={development.name} className="bg-gray-800 border-gray-700 shadow-2xl hover:shadow-[#D4AF37]/20 transition-all duration-300 group">
                <CardContent className="p-0 overflow-hidden">
                  {/* Image Placeholder with Badge */}
                  <div className="w-full h-48 bg-gray-900 relative overflow-hidden">
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-[#D4AF37] text-black font-bold px-3 py-1">
                        NEW DEVELOPMENT
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#D4AF37]" />
                      <span className="text-[#D4AF37] text-sm font-medium">{development.location}</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                      {development.name}
                    </h3>
                    <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                      {development.description}
                    </p>
                    
                    {/* Key Details Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-black rounded p-3 text-center">
                        <div className="text-[#D4AF37] text-xs font-bold mb-1">FROM</div>
                        <div className="text-[#D4AF37] font-bold">{development.startingPrice}</div>
                      </div>
                      <div className="bg-black rounded p-3 text-center">
                        <div className="text-[#D4AF37] text-xs font-bold mb-1">COMPLETION</div>
                        <div className="text-[#D4AF37] font-bold">{development.completion}</div>
                      </div>
                      <div className="bg-black rounded p-3 text-center">
                        <div className="text-white text-xs font-bold mb-1">UNITS</div>
                        <div className="text-white font-bold">{development.units}</div>
                      </div>
                      <div className="bg-black rounded p-3 text-center">
                        <div className="text-[#D4AF37] text-xs font-bold mb-1">STATUS</div>
                        <div className="text-[#D4AF37] font-bold">{development.status}</div>
                      </div>
                    </div>
                    
                    {/* Features List */}
                    <div className="mb-4">
                      {development.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                          <span className="text-white text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* View Development Button */}
                    <Button 
                      variant="ghost" 
                      className="text-[#D4AF37] hover:text-[#B8941F] p-0 h-auto font-medium"
                    >
                      View Development
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action Button */}
          <div className="text-center animate-fade-in-up animate-stagger-2">
            <Button className="bg-[#D4AF37] text-black hover:bg-[#B8941F] transition-all duration-300 font-bold px-8 py-4 text-lg">
              VIEW ALL DEVELOPMENTS
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
