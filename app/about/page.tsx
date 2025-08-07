"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, Home, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getImageByKey, ImageData } from "@/lib/image-utils"
import { getTeamMembers, TeamMember } from "@/lib/team-utils"

export default function AboutPage() {
  const [heroImage, setHeroImage] = useState<ImageData | null>(null)
  const [teamImage, setTeamImage] = useState<ImageData | null>(null)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const stats = [
    { icon: Home, label: "Properties Sold", value: "500+" },
    { icon: Users, label: "Happy Clients", value: "1000+" },
    { icon: Award, label: "Years Experience", value: "15+" },
    { icon: TrendingUp, label: "Market Growth", value: "25%" },
  ]

  useEffect(() => {
    fetchPageData()
  }, [])

  const fetchPageData = async () => {
    try {
      // Fetch hero image
      const hero = await getImageByKey('hero_image')
      if (hero) setHeroImage(hero)

      // Fetch team image
      const team = await getImageByKey('team_image')
      if (team) setTeamImage(team)

      // Fetch all team members
      console.log("Fetching team members from AboutPage...")
      const members = await getTeamMembers()
      console.log("Team members found in AboutPage:", members)
      console.log("Number of team members:", members?.length || 0)
      setTeamMembers(members)
    } catch (error) {
      console.error('Error fetching about page data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getHeroImageUrl = () => {
    return heroImage?.url || "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-P7871YEPCFqn8dKB0gFYT9kDNUpJdH.png"
  }

  const getTeamImageUrl = () => {
    return teamImage?.url || "/placeholder.svg?height=600&width=480&text=Homes of Hollywood Team"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={getHeroImageUrl()}
            alt={heroImage?.alt_text || "Luxury Interior with City Views"}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Breadcrumb */}
        <div className="absolute top-32 left-8 z-10 text-white text-sm tracking-wide">
          <Link href="/" className="hover:text-[#D4AF37]">
            HOME
          </Link>
          <span className="mx-2">{">"}</span>
          <span>ABOUT</span>
        </div>

        {/* HH Logo in Center */}
        <div className="relative z-10 text-center">
          <div className="text-8xl md:text-9xl font-bold text-[#D4AF37] tracking-wider mb-4">
            <span>HH</span>
          </div>
          <div className="text-2xl md:text-3xl text-white font-bold tracking-[0.3em]">
            HOMES OF
            <br />
            <span className="text-lg tracking-[0.4em]">HOLLYWOOD</span>
          </div>
        </div>
      </section>

      {/* About Content Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Content */}
            <div>
              <div className="text-[#D4AF37] text-sm tracking-[0.3em] mb-4">ABOUT US</div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-wide">
                <span className="border-l-4 border-[#D4AF37] pl-8">HOMES OF HOLLYWOOD</span>
              </h2>

              <div className="text-gray-300 space-y-6 text-lg leading-relaxed">
                <p>
                  Homes of Hollywood is recognized as one of the most dynamic, high-performing agencies in the luxury
                  home real estate market, consistently shattering records across the globe and ranking in the top 1% of
                  real estate agencies worldwide.
                </p>
                <p>
                  This includes staking claim to top tinsel town turf in the Platinum Triangle of Beverly Hills,
                  Bel-Air, and Holmby Hills, and everywhere from Malibu to the Hollywood Hills and Downtown LA.
                </p>
                <p>
                  Together we have seasoned experience and ability to foster solid relationships. Homes of Hollywood
                  is a full-service real estate agency that strives to service the entire spectrum of exclusive clients
                  Los Angeles has to offer.
                </p>
                <p>
                  With over $7.5 billion in sales, we continue to set new standards in luxury real estate, helping
                  families find their dream homes and investors build successful portfolios.
                </p>
              </div>

              <div className="mt-12">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold px-8 py-4 tracking-wide"
                >
                  <Link href="/contact">GET IN TOUCH</Link>
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="aspect-[4/5] relative overflow-hidden rounded-lg">
                <Image
                  src={getTeamImageUrl()}
                  alt={teamImage?.alt_text || "The Altman Brothers Team"}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-wide">OUR TRACK RECORD</h2>
            <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Numbers that speak to our commitment and success in the luxury real estate industry.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-black border-gray-800 text-center hover:border-[#D4AF37] transition-all">
                <CardContent className="p-8">
                  <stat.icon className="w-12 h-12 text-[#D4AF37] mx-auto mb-6" />
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-400 tracking-wide">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Highlights */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-wide">MEET THE TEAM</h2>
            <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="bg-gray-900 border-gray-800 animate-pulse">
                  <CardContent className="p-0">
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <div className="w-full h-full bg-gray-800"></div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : teamMembers.length > 0 ? (
              teamMembers.map((member, index) => (
                <Card key={member.id} className="bg-gray-900 border-gray-800 hover:border-[#D4AF37] transition-all group">
                  <CardContent className="p-0">
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <Image
                        src={member.image_url || "/placeholder.jpg"}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/placeholder.jpg"
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-[#D4AF37] transition-colors">
                          {member.name.toUpperCase()}
                        </h3>
                        <p className="text-[#D4AF37] text-sm font-medium tracking-wide">{member.title.toUpperCase()}</p>
                        {member.bio && (
                          <p className="text-gray-300 text-sm mt-2 line-clamp-2">{member.bio}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              // Empty state
              <div className="col-span-3 text-center py-12">
                <div className="text-gray-400 text-lg">No team members available at the moment.</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-wide">READY TO WORK WITH US?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300 leading-relaxed">
            Experience the difference that expertise, integrity, and personalized service can make in your luxury real
            estate journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              asChild
              className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold px-8 py-4 tracking-wide"
            >
              <Link href="/book-appointment">SCHEDULE CONSULTATION</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black bg-transparent font-semibold px-8 py-4 tracking-wide"
            >
              <Link href="/contact">CONTACT US</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
