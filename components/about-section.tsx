"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, Home, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getImageByKey, ImageData } from "@/lib/image-utils"

export function AboutSection() {
  const [aboutImage, setAboutImage] = useState<ImageData | null>(null)
  const [imageError, setImageError] = useState(false)
  const stats = [
    { icon: Home, label: "Properties Sold", value: "500+" },
    { icon: Users, label: "Happy Clients", value: "1000+" },
    { icon: Award, label: "Years Experience", value: "15+" },
    { icon: TrendingUp, label: "Market Growth", value: "25%" },
  ]

  useEffect(() => {
    fetchAboutImage()
  }, [])

  const fetchAboutImage = async () => {
    try {
      const image = await getImageByKey('about_section_image')
      if (image && image.url) {
        setAboutImage(image)
      }
    } catch (error) {
      console.warn('Failed to fetch about section image:', error)
    }
  }

  const getImageUrl = () => {
    if (aboutImage?.url && !imageError) {
      return aboutImage.url
    }
    return "/placeholder.svg?height=600&width=500&text=Homes of Hollywood"
  }

  const getImageAlt = () => {
    if (aboutImage?.alt_text) {
      return aboutImage.alt_text
    }
    return "Homes of Hollywood"
  }

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-[#D4AF37] text-sm tracking-[0.3em] mb-4">ABOUT US</div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-wide">HOMES OF HOLLYWOOD</h2>
            <div className="w-16 h-1 bg-[#D4AF37] mb-8"></div>

            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              Homes of Hollywood is among the top producing real estate agencies in the country. Our team has
              managed to carve out a niche in the Los Angeles high end market.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              This includes staking claim to top tinsel town turf in the Platinum Triangle of Beverly Hills, Bel-Air,
              and Holmby Hills, and everywhere from Malibu to the Hollywood Hills and Downtown LA.
            </p>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Together we have seasoned experience and ability to foster solid relationships. Homes of Hollywood is
              a full-service real estate agency that strives to service the entire spectrum of exclusive clients Los
              Angeles has to offer.
            </p>

            <Button
              asChild
              size="lg"
              className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold px-8 py-4 tracking-wide"
            >
              <Link href="/about">LEARN MORE ABOUT US</Link>
            </Button>
          </div>

          <div className="relative">
            <Image
              src={getImageUrl()}
              alt={getImageAlt()}
              width={500}
              height={600}
              className="rounded-lg object-cover"
              style={{ width: 'auto', height: 'auto' }}
              onError={handleImageError}
              unoptimized={imageError}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gray-900 border-gray-800 text-center">
              <CardContent className="p-8">
                <stat.icon className="w-12 h-12 text-[#D4AF37] mx-auto mb-6" />
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400 tracking-wide">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
