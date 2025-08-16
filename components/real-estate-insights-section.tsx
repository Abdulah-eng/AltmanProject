"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RealEstateInsight } from "@/lib/real-estate-insights-utils"
import { ArrowRight, Calendar, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface RealEstateInsightsSectionProps {
  insights: RealEstateInsight[] | null
}

export function RealEstateInsightsSection({ insights }: RealEstateInsightsSectionProps) {
  // Show section even if no data, but with a message
  const displayInsights = insights || []

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-white text-4xl md:text-6xl font-bold tracking-wider mb-8">REAL ESTATE INSIGHTS</h2>
          <div className="w-16 h-px bg-[#D4AF37] mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Expert analysis, market trends, and valuable insights to guide your real estate decisions
          </p>
        </div>

        {displayInsights.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {displayInsights.map((insight) => (
              <Card key={insight.id} className="bg-gray-900 border-gray-800 hover:border-[#D4AF37] transition-all duration-300 group overflow-hidden hover-lift">
                <CardContent className="p-0">
                  {insight.image_file && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${insight.image_file}`}
                        alt={insight.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-[#D4AF37] text-black hover:bg-[#B8941F] border-0">
                          {insight.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Badge>
                      </div>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                      {insight.title}
                    </h3>
                    
                    {insight.summary && (
                      <p className="text-gray-400 mb-4 line-clamp-3">
                        {insight.summary}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      {insight.author && (
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          <span>{insight.author}</span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{new Date(insight.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <Button asChild className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black group-hover:bg-[#B8941F] transition-colors">
                      <Link href={`/real-estate-insights/${insight.id}`}>
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">
              No featured insights available at the moment.
            </p>
            <p className="text-gray-500 text-sm">
              Add insights through the admin panel and mark them as featured to display them here.
            </p>
          </div>
        )}
        
        <div className="text-center">
          <Button asChild size="lg" className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold px-8 py-4">
            <Link href="/real-estate-insights">VIEW ALL INSIGHTS</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
