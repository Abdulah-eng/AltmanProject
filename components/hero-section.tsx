"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { getImageByKey, ImageData } from "@/lib/image-utils"

interface HeroData {
  title: string
  subtitle: string
  description: string
  image_url: string
  cta_text: string
  cta_link: string
}

interface HeroSectionProps {
  data: HeroData | null
}

export function HeroSection({ data }: HeroSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [heroImage, setHeroImage] = useState<ImageData | null>(null)
  const [imageError, setImageError] = useState(false)

  const defaultData = {
    title: "DON ADAMS PRESENTS",
    subtitle: "LUXURY REAL ESTATE",
    description:
      "Experience unparalleled service in luxury real estate. From Beverly Hills to Malibu, we deliver exceptional results that exceed expectations.",
    image_url: "/placeholder.svg?height=800&width=1600&text=Luxury Real Estate Hero",
    cta_text: "VIEW PROPERTIES",
    cta_link: "/listings",
  }

  const heroData = data || defaultData

  useEffect(() => {
    setIsLoaded(true)
    // Fetch hero image from database
    fetchHeroImage()
  }, [])

  const fetchHeroImage = async () => {
    try {
      const image = await getImageByKey('hero_image')
      if (image && image.url) {
        setHeroImage(image)
      }
    } catch (error) {
      console.warn('Failed to fetch hero image:', error)
    }
  }

  // Use hero image from database if available and valid, otherwise use the one from heroData
  const getImageUrl = () => {
    if (heroImage?.url && !imageError) {
      return heroImage.url
    }
    return heroData.image_url || "/placeholder.svg?height=800&width=1600&text=Luxury Real Estate Hero"
  }

  const getImageAlt = () => {
    if (heroImage?.alt_text) {
      return heroImage.alt_text
    }
    return "Hero background"
  }

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Image
          src={getImageUrl()}
          alt={getImageAlt()}
          fill
          className="object-cover"
          priority
          onError={handleImageError}
          unoptimized={imageError} // Use unoptimized for fallback images
        />
      </div>

      <div className="relative z-10 text-center text-white max-w-4xl sm:max-w-5xl lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`mb-6 sm:mb-8 ${isLoaded ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="text-[#D4AF37] text-base sm:text-lg md:text-xl font-light tracking-[0.2em] mb-3 sm:mb-4 animate-stagger-1">
            {heroData.title}
          </div>
          <h1 className="heading-primary text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl text-white mb-4 sm:mb-6 leading-tight animate-stagger-2">
            {heroData.subtitle}
          </h1>
          <div className="bg-black/60 backdrop-blur-sm rounded-lg px-6 py-4 mb-4 sm:mb-6 animate-stagger-3">
            <div className="text-[#D4AF37] text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold tracking-wide">
              Get Smart with Real Estate
            </div>
          </div>
          <div className="gold-accent-line mx-auto mb-6 sm:mb-8 animate-stagger-4" />
        </div>

        <p
          className={`text-base sm:text-lg md:text-xl mb-8 sm:mb-12 max-w-2xl sm:max-w-3xl mx-auto text-gray-200 leading-relaxed text-body px-4 ${
            isLoaded ? "animate-fade-in-up animate-stagger-5" : "opacity-0"
          }`}
        >
          {heroData.description}
        </p>

        <div
          className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center ${
            isLoaded ? "animate-fade-in-up animate-stagger-5" : "opacity-0"
          }`}
        >
          <Button
            size="lg"
            asChild
            className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg tracking-wide hover-scale"
          >
            <Link href={heroData.cta_link}>{heroData.cta_text}</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black bg-black/60 backdrop-blur-sm font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg tracking-wide hover-scale"
          >
            <Link href="/book-appointment">SCHEDULE CONSULTATION</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
