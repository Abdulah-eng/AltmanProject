"use client"

import { MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Development {
  id: string
  name: string
  description: string | null
  image_file: string | null
  location: string | null
  price_range: string | null
  featured: boolean
  display_order: number
  created_at: string
  updated_at: string
}

interface NewDevelopmentsSectionProps {
  developments?: Development[] | null
}

export function NewDevelopmentsSection({ developments }: NewDevelopmentsSectionProps) {
  // Debug: Log what we're receiving
  console.log('NewDevelopmentsSection received:', developments)
  
  // Show section even if no data, but with a message
  const displayDevelopments = developments || []
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
          {displayDevelopments.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8 mb-12 animate-fade-in-up animate-stagger-1">
              {displayDevelopments.map((development, index) => (
                <Card key={development.name} className="bg-gray-800 border-gray-700 shadow-2xl hover:shadow-[#D4AF37]/20 transition-all duration-300 group">
                  <CardContent className="p-0 overflow-hidden">
                    {/* Image with Badge */}
                    <div className="w-full h-48 bg-gray-900 relative overflow-hidden">
                      {development.image_file ? (
                        <img 
                          src={development.image_file} 
                          alt={development.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                        </div>
                      )}
                      
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-[#D4AF37] text-black font-bold px-3 py-1">
                          NEW DEVELOPMENT
                        </Badge>
                      </div>
                      {development.location && (
                        <div className="absolute bottom-4 left-4 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#D4AF37]" />
                          <span className="text-[#D4AF37] text-sm font-medium">{development.location}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                        {development.name}
                      </h3>
                      <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                        {development.description}
                      </p>
                      
                      {/* Price Range */}
                      {development.price_range && (
                        <div className="bg-black rounded p-3 text-center mb-4">
                          <div className="text-[#D4AF37] text-xs font-bold mb-1">PRICE RANGE</div>
                          <div className="text-[#D4AF37] font-bold">{development.price_range}</div>
                        </div>
                      )}
                      
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
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg mb-4">
                No featured developments available at the moment.
              </p>
              <p className="text-gray-500 text-sm">
                Add developments through the admin panel and mark them as featured to display them here.
              </p>
            </div>
          )}

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
