"use client"

import { useEffect, useRef, useState } from "react"
import { getImageByKey, ImageData } from "@/lib/image-utils"

interface Stat {
  number: string
  label: string
  description: string
}

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [statsImage, setStatsImage] = useState<ImageData | null>(null)
  const [imageError, setImageError] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const stats: Stat[] = [
    {
      number: "$7.5B+",
      label: "SOLD",
      description: "Total sales volume",
    },
    {
      number: "#1",
      label: "REAL TRENDS TEAM IN US",
      description: "By volume 2021",
    },
    {
      number: "#1",
      label: "DOUGLAS ELLIMAN TEAM",
      description: "In the US",
    },
    {
      number: "2M+",
      label: "TOTAL INSTAGRAM",
      description: "Followers",
    },
  ]

  useEffect(() => {
    fetchStatsImage()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const fetchStatsImage = async () => {
    try {
      const image = await getImageByKey('stats_section_image')
      if (image && image.url) {
        setStatsImage(image)
      }
    } catch (error) {
      console.warn('Failed to fetch stats section image:', error)
    }
  }

  const getBackgroundImageUrl = () => {
    if (statsImage?.url && !imageError) {
      return statsImage.url
    }
    return "/placeholder.svg?height=800&width=1600&text=Los Angeles Skyline"
  }

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('${getBackgroundImageUrl()}')`,
          }}
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <div
            className={`text-[#D4AF37] text-sm tracking-[0.3em] mb-4 fade-in-section ${isVisible ? "is-visible" : ""}`}
          >
            OUR STATS
          </div>
          <h2
            className={`heading-primary text-4xl md:text-7xl text-white mb-8 fade-in-section ${
              isVisible ? "is-visible" : ""
            }`}
            style={{ animationDelay: "0.2s" }}
          >
            WHY WORK WITH US
          </h2>
          <div className="gold-accent-line mx-auto mb-8" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center group fade-in-section ${isVisible ? "is-visible" : ""}`}
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <div className="stats-counter text-white mb-4 group-hover:text-[#D4AF37] transition-colors duration-300">
                {stat.number}
              </div>
              <div className="text-white font-bold text-lg mb-2 tracking-wide">{stat.label}</div>
              <div className="text-gray-300 text-sm">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
