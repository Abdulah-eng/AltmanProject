"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, MapPin, Building2, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getAllNewDevelopments, NewDevelopment } from "@/lib/new-developments-utils"
import Image from "next/image"

export default function NewDevelopmentsPage() {
  const [developments, setDevelopments] = useState<NewDevelopment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDevelopments()
  }, [])

  const fetchDevelopments = async () => {
    try {
      setLoading(true)
      const data = await getAllNewDevelopments()
      setDevelopments(data)
    } catch (error) {
      console.error('Error fetching developments:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">Loading developments...</div>
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
            {developments.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg mb-4">
                  No new developments available at the moment.
                </p>
                <p className="text-gray-500 text-sm">
                  Add new developments through the admin panel to get started.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {developments.map((development, index) => (
                  <div key={development.id} className={`animate-fade-in-up animate-stagger-${(index % 3) + 1}`}>
                    <Card className="bg-gray-800 border-gray-700 shadow-2xl hover:border-[#D4AF37]/50 transition-all duration-300 h-full">
                      <CardContent className="p-0 h-full flex flex-col">
                        {/* Development Image */}
                        <div className="relative">
                          {development.image_file ? (
                            <div className="w-full h-64 relative overflow-hidden rounded-t-lg">
                              <Image
                                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${development.image_file}`}
                                alt={development.name}
                                fill
                                className="object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.style.display = 'none'
                                }}
                              />
                            </div>
                          ) : (
                            <div className="w-full h-64 bg-gray-700 rounded-t-lg"></div>
                          )}
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
                              <div className="text-xs text-gray-400 mb-1">PRICE RANGE</div>
                              <div className="text-lg font-bold text-[#D4AF37]">{development.price_range || 'Contact for pricing'}</div>
                            </div>
                            <div className="bg-black rounded-lg p-3 text-center">
                              <div className="text-xs text-gray-400 mb-1">STATUS</div>
                              <div className="text-lg font-bold text-white">{development.status || 'Pre-Construction'}</div>
                            </div>
                          </div>
                          
                          {/* View Development Link */}
                          <Link
                            href={`/new-developments/${development.id}`}
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
            )}
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
      <Footer />
    </div>
  )
}
