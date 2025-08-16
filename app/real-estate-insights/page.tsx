"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Calendar, User, ArrowRight, Search } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getAllInsights, RealEstateInsight } from "@/lib/real-estate-insights-utils"
import Image from "next/image"

export default function RealEstateInsightsPage() {
  const [insights, setInsights] = useState<RealEstateInsight[]>([])
  const [filteredInsights, setFilteredInsights] = useState<RealEstateInsight[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInsights()
  }, [])

  const fetchInsights = async () => {
    try {
      setLoading(true)
      const data = await getAllInsights()
      setInsights(data)
      setFilteredInsights(data)
    } catch (error) {
      console.error('Error fetching insights:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    filterInsights(category, searchTerm)
  }

  const handleSearchChange = (term: string) => {
    setSearchTerm(term)
    filterInsights(selectedCategory, term)
  }

  const filterInsights = (category: string, term: string) => {
    let filtered = insights

    if (category !== "All") {
      filtered = filtered.filter(insight => insight.category === category)
    }

    if (term) {
      filtered = filtered.filter(insight => 
        insight.title.toLowerCase().includes(term.toLowerCase()) ||
        insight.summary?.toLowerCase().includes(term.toLowerCase()) ||
        insight.content.toLowerCase().includes(term.toLowerCase())
      )
    }

    setFilteredInsights(filtered)
  }

  const categories = ["All", ...Array.from(new Set(insights.map(insight => insight.category)))]

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">Loading insights...</div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="flex items-center justify-center mb-6">
            <Link href="/" className="flex items-center text-[#D4AF37] hover:text-[#B8941F] transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-wider mb-8">REAL ESTATE INSIGHTS</h1>
          <div className="w-16 h-px bg-[#D4AF37] mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Expert analysis, market trends, and valuable insights to guide your real estate decisions
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search insights..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-[#D4AF37]"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => handleCategoryChange(category)}
                className={`${
                  selectedCategory === category
                    ? "bg-[#D4AF37] text-black hover:bg-[#B8941F]"
                    : "border-gray-600 text-gray-300 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                } transition-all duration-300`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Insights Grid */}
        {filteredInsights.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-4">
              {searchTerm || selectedCategory !== "All" 
                ? "No insights found matching your criteria." 
                : "No insights available at the moment."}
            </p>
            <p className="text-gray-500 text-sm">
              {searchTerm || selectedCategory !== "All" 
                ? "Try adjusting your search or category filter." 
                : "Add insights through the admin panel to get started."}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredInsights.map((insight) => (
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
        )}

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Stay Updated with Market Insights</h3>
            <p className="text-gray-300 mb-6">
              Get the latest real estate market analysis, investment strategies, and expert advice delivered to your inbox.
            </p>
            <Button asChild size="lg" className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold px-8 py-4">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
