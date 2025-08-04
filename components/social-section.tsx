"use client"

import { useEffect, useRef, useState } from "react"
import { Facebook, Instagram, Twitter } from "lucide-react"
import Image from "next/image"
import { getPublishedSocialImages, type SocialImage } from "@/lib/social-images-utils"

export function SocialSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [socialImages, setSocialImages] = useState<SocialImage[]>([])
  const [loading, setLoading] = useState(true)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const fetchSocialImages = async () => {
      try {
        const images = await getPublishedSocialImages()
        setSocialImages(images)
      } catch (error) {
        console.error("Error fetching social images:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSocialImages()
  }, [])

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return <Instagram className="w-5 h-5 text-white" />
      case "facebook":
        return <Facebook className="w-5 h-5 text-white" />
      case "twitter":
        return <Twitter className="w-5 h-5 text-white" />
      default:
        return <Instagram className="w-5 h-5 text-white" />
    }
  }

  return (
    <section ref={sectionRef} className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-16">
          <div>
            <div
              className={`text-[#D4AF37] text-sm tracking-[0.3em] mb-4 fade-in-section ${
                isVisible ? "is-visible" : ""
              }`}
            >
              FOLLOW US
            </div>
            <h2
              className={`heading-primary text-4xl md:text-6xl text-black mb-8 fade-in-section ${
                isVisible ? "is-visible" : ""
              }`}
              style={{ animationDelay: "0.2s" }}
            >
              WE'RE SOCIAL
            </h2>
            <div className="gold-accent-line-left mb-8" />
            <p
              className={`text-gray-600 max-w-lg text-body fade-in-section ${isVisible ? "is-visible" : ""}`}
              style={{ animationDelay: "0.4s" }}
            >
              Follow us on social media for the most exclusive real estate news and photos from our amazing listings
            </p>
          </div>

          <div
            className={`flex space-x-6 fade-in-section ${isVisible ? "is-visible" : ""}`}
            style={{ animationDelay: "0.6s" }}
          >
            <Facebook className="w-8 h-8 text-[#D4AF37] hover:scale-110 transition-transform cursor-pointer" />
            <div className="w-8 h-8 text-[#D4AF37] hover:scale-110 transition-transform cursor-pointer">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.987 11.987s11.987-5.367 11.987-11.987C24.003 5.367 18.637.001 12.017.001zM8.23 18.85c-2.31-.46-4.07-2.22-4.53-4.53-.46-2.31.46-4.53 2.31-5.45 1.85-.92 4.07-.46 5.45 1.39 1.39 1.85.92 4.07-1.39 5.45-1.85.92-4.07.46-5.45-1.39-.92-1.85-.46-4.07 1.39-5.45z" />
              </svg>
            </div>
            <Instagram className="w-8 h-8 text-[#D4AF37] hover:scale-110 transition-transform cursor-pointer" />
          </div>
        </div>

        {/* Social Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className={`aspect-square bg-gray-200 rounded-lg animate-pulse fade-in-section ${
                  isVisible ? "is-visible" : ""
                }`}
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              />
            ))
          ) : socialImages.length === 0 ? (
            // Empty state
            <div className="col-span-full text-center py-12">
              <Instagram className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No social images yet</h3>
              <p className="text-gray-500">Check back soon for our latest social media posts.</p>
            </div>
          ) : (
            // Social images grid
            socialImages.map((image, index) => (
              <div
                key={image.id}
                className={`relative group social-grid-item cursor-pointer fade-in-section ${
                  isVisible ? "is-visible" : ""
                }`}
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              >
                <div className="aspect-square relative overflow-hidden rounded-lg">
                  <Image 
                    src={image.image_url} 
                    alt={image.title} 
                    fill 
                    className="object-cover" 
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

                  {/* Social handle overlay */}
                  <div className="absolute bottom-2 left-2 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {image.social_handle}
                  </div>

                  {/* Platform icon overlay */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {getPlatformIcon(image.platform)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
