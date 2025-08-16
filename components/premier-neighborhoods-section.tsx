"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Neighborhood {
  id: string
  name: string
  description: string | null
  image_file: string | null
  featured: boolean
  display_order: number
  created_at: string
  updated_at: string
}

interface PremierNeighborhoodsSectionProps {
  neighborhoods?: Neighborhood[] | null
}

export function PremierNeighborhoodsSection({ neighborhoods }: PremierNeighborhoodsSectionProps) {
  // Debug: Log what we're receiving
  console.log('PremierNeighborhoodsSection received:', neighborhoods)
  
  // Show section even if no data, but with a message
  const displayNeighborhoods = neighborhoods || []
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-wide">
              PREMIER NEIGHBORHOODS
            </h2>
            <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover the most desirable neighborhoods across Los Angeles and the surrounding metro area with Don Adams as your expert guide.
            </p>
          </div>

          {/* Neighborhood Cards Grid */}
          {displayNeighborhoods.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8 animate-fade-in-up animate-stagger-1 mb-12">
              {displayNeighborhoods.map((neighborhood, index) => (
                <Card key={neighborhood.name} className="bg-gray-800 border-gray-700 shadow-2xl hover:shadow-[#D4AF37]/20 transition-all duration-300 group">
                  <CardContent className="p-0 overflow-hidden">
                    {/* Image */}
                    <div className="w-full h-48 bg-gray-900 relative overflow-hidden">
                      {neighborhood.image_file ? (
                        <img 
                          src={neighborhood.image_file} 
                          alt={neighborhood.name}
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
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                        {neighborhood.name}
                      </h3>
                      <p className="text-gray-300 mb-4 leading-relaxed">
                        {neighborhood.description}
                      </p>
                      <Badge className="bg-[#D4AF37] text-black hover:bg-[#B8941F] text-sm font-bold px-3 py-1">
                        Premier Location
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg mb-4">
                No featured neighborhoods available at the moment.
              </p>
              <p className="text-gray-500 text-sm">
                Add neighborhoods through the admin panel and mark them as featured to display them here.
              </p>
            </div>
          )}

          {/* Call to Action Button */}
          <div className="text-center animate-fade-in-up animate-stagger-2">
            <button className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold px-8 py-4 text-lg tracking-wide transition-all duration-300 hover:scale-105">
              VIEW ALL NEIGHBORHOODS
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
