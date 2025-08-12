"use client"

import { useState } from "react"
import { ArrowLeft, Calendar, User, ArrowRight, Mail } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  category: string
  date: string
  author: string
  image: string
  readTime: string
}

const sampleBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Ultimate Guide to Hollywood Hills Real Estate",
    excerpt: "Discover everything you need to know about buying, selling, and investing in Hollywood Hills real estate. From market trends to neighborhood insights.",
    category: "Market Insights",
    date: "May 15, 2023",
    author: "Don Adams",
    image: "/placeholder.svg?height=300&width=400&text=Hollywood+Hills+Guide",
    readTime: "8 min read"
  },
  {
    id: "2",
    title: "How to Stage Your Hollywood Home for Maximum Value",
    excerpt: "Learn the professional staging techniques that can increase your home's sale price by 10-20%. Expert tips from Hollywood's top real estate professionals.",
    category: "Selling Tips",
    date: "April 22, 2023",
    author: "Don Adams",
    image: "/placeholder.svg?height=300&width=400&text=Home+Staging+Tips",
    readTime: "6 min read"
  },
  {
    id: "3",
    title: "Celebrity Home Features That Are Becoming Industry Standards",
    excerpt: "Explore the luxury features and amenities that started in celebrity homes and are now becoming standard in high-end real estate across Los Angeles.",
    category: "Luxury Living",
    date: "March 10, 2023",
    author: "Don Adams",
    image: "/placeholder.svg?height=300&width=400&text=Celebrity+Home+Features",
    readTime: "7 min read"
  },
  {
    id: "4",
    title: "Investment Opportunities in Hollywood's Emerging Neighborhoods",
    excerpt: "Discover the up-and-coming areas in and around Hollywood that offer strong investment potential before they become the next hot spots.",
    category: "Investment",
    date: "February 18, 2023",
    author: "Don Adams",
    image: "/placeholder.svg?height=300&width=400&text=Investment+Opportunities",
    readTime: "9 min read"
  },
  {
    id: "5",
    title: "Navigating Hollywood's Luxury Rental Market",
    excerpt: "A comprehensive guide for high-end tenants and property investors looking to understand the luxury rental landscape in Hollywood.",
    category: "Rentals",
    date: "January 25, 2023",
    author: "Don Adams",
    image: "/placeholder.svg?height=300&width=400&text=Luxury+Rental+Market",
    readTime: "5 min read"
  },
  {
    id: "6",
    title: "Architectural Styles That Define Hollywood Luxury",
    excerpt: "From Spanish Revival to Ultra-Modern, explore the iconic architectural styles that have shaped Hollywood's most prestigious neighborhoods.",
    category: "Architecture",
    date: "December 12, 2022",
    author: "Don Adams",
    image: "/placeholder.svg?height=300&width=400&text=Architectural+Styles",
    readTime: "10 min read"
  },
  {
    id: "7",
    title: "The Future of Smart Homes in Luxury Real Estate",
    excerpt: "How technology is transforming luxury homes in Los Angeles. From AI-powered systems to sustainable smart features that increase property value.",
    category: "Technology",
    date: "November 28, 2022",
    author: "Don Adams",
    image: "/placeholder.svg?height=300&width=400&text=Smart+Homes",
    readTime: "8 min read"
  },
  {
    id: "8",
    title: "Seasonal Market Trends in Los Angeles Real Estate",
    excerpt: "Understanding how the seasons affect property values, inventory, and buyer behavior in the competitive Los Angeles luxury real estate market.",
    category: "Market Insights",
    date: "October 15, 2022",
    author: "Don Adams",
    image: "/placeholder.svg?height=300&width=400&text=Seasonal+Trends",
    readTime: "6 min read"
  },
  {
    id: "9",
    title: "Building Your Real Estate Portfolio in Hollywood",
    excerpt: "Strategic advice for building a diverse real estate portfolio in one of America's most competitive luxury markets.",
    category: "Investment",
    date: "September 20, 2022",
    author: "Don Adams",
    image: "/placeholder.svg?height=300&width=400&text=Portfolio+Building",
    readTime: "12 min read"
  }
]

const categories = [
  "All",
  "Market Insights",
  "Selling Tips",
  "Luxury Living",
  "Investment",
  "Rentals",
  "Architecture",
  "Technology"
]

export default function RealEstateInsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [email, setEmail] = useState("")

  const filteredPosts = selectedCategory === "All" 
    ? sampleBlogPosts 
    : sampleBlogPosts.filter(post => post.category === selectedCategory)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Subscribing email:", email)
    setEmail("")
  }

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
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-wide">REAL ESTATE INSIGHTS</h1>
              <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Get smart with the latest trends, tips, and insights from Hollywood's premier real estate expert. Stay informed about the luxury real estate market in Los Angeles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Section */}
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-[#D4AF37] text-black"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <div key={post.id} className={`animate-fade-in-up animate-stagger-${(index % 3) + 1}`}>
                  <Card className="bg-gray-800 border-gray-700 shadow-2xl hover:border-[#D4AF37]/50 transition-all duration-300 h-full">
                    <CardContent className="p-0 h-full flex flex-col">
                      {/* Blog Post Image */}
                      <div className="relative">
                        <div className="w-full h-64 bg-gray-700 rounded-t-lg"></div>
                        <Badge className="absolute top-3 left-3 bg-[#D4AF37] text-black font-bold text-xs px-3 py-1">
                          {post.category}
                        </Badge>
                      </div>

                      {/* Blog Post Details */}
                      <div className="p-6 flex-1 flex flex-col">
                        {/* Metadata */}
                        <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                          </div>
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-xl font-bold text-white mb-4 flex-1 leading-tight">
                          {post.title}
                        </h3>
                        
                        {/* Excerpt */}
                        <p className="text-gray-300 text-sm mb-6 leading-relaxed flex-1">
                          {post.excerpt}
                        </p>
                        
                        {/* Read More Link */}
                        <Link
                          href={`/insights/${post.id}`}
                          className="inline-flex items-center text-[#D4AF37] hover:text-white transition-colors font-medium mt-auto"
                        >
                          Read More
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

      {/* Newsletter Subscription Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="animate-fade-in-up">
              <Card className="bg-gray-800 border-gray-700 shadow-2xl">
                <CardContent className="p-12">
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div className="text-center lg:text-left">
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Stay Updated
                      </h3>
                      <p className="text-lg text-gray-300">
                        Subscribe to our newsletter for the latest real estate insights.
                      </p>
                    </div>
                    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                      <Input
                        type="email"
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-black border-gray-700 text-white placeholder-gray-400 focus:border-[#D4AF37] focus:ring-[#D4AF37] min-w-[280px]"
                        required
                      />
                      <Button 
                        type="submit"
                        className="bg-[#D4AF37] text-black hover:bg-[#B8941F] transition-all duration-300 font-bold px-8 py-4"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Subscribe
                      </Button>
                    </form>
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
