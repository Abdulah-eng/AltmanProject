"use client"

import { useEffect, useState } from "react"
import { Star, Quote } from "lucide-react"
import Image from "next/image"
import { getFeaturedClientExperiences, type ClientExperience } from "@/lib/client-experiences-utils"

export function ClientExperiencesSection() {
  const [clientExperiences, setClientExperiences] = useState<ClientExperience[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchClientExperiences = async () => {
      try {
        console.log("ClientExperiencesSection: Starting to fetch client experiences...")
        setLoading(true)
        
        const experiences = await getFeaturedClientExperiences()
        console.log("ClientExperiencesSection: Client experiences fetched:", experiences)
        
        setClientExperiences(experiences || [])
      } catch (err) {
        console.error('ClientExperiencesSection: Error fetching client experiences:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchClientExperiences()
  }, [])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  // Show loading state
  if (loading) {
    return (
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-white text-4xl md:text-6xl font-bold tracking-wider mb-8">CLIENT EXPERIENCES</h2>
            <div className="w-16 h-px bg-[#D4AF37] mx-auto mb-8"></div>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Discover what our luxury real estate clients have to say about their exceptional experience with The Altman Brothers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-gray-900 rounded-lg p-6 animate-pulse">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="w-5 h-5 bg-gray-700 rounded mr-1"></div>
                  ))}
                </div>
                <div className="h-20 bg-gray-800 rounded mb-4"></div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-700 rounded-full mr-3"></div>
                  <div>
                    <div className="h-4 bg-gray-700 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-700 rounded w-32"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Show empty state
  if (clientExperiences.length === 0) {
    return (
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-white text-4xl md:text-6xl font-bold tracking-wider mb-8">CLIENT EXPERIENCES</h2>
          <div className="w-16 h-px bg-[#D4AF37] mx-auto mb-8"></div>
          <div className="text-gray-400 text-lg">Client experiences will be displayed here.</div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-white text-4xl md:text-6xl font-bold tracking-wider mb-8">CLIENT EXPERIENCES</h2>
          <div className="w-16 h-px bg-[#D4AF37] mx-auto mb-8"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover what our luxury real estate clients have to say about their exceptional experience with The Altman Brothers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {clientExperiences.map((experience, index) => (
            <div
              key={experience.id}
              className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Rating */}
              <div className="flex mb-4">
                {renderStars(experience.rating)}
              </div>

              {/* Quote Icon */}
              <div className="mb-4">
                <Quote className="w-8 h-8 text-[#D4AF37] opacity-50" />
              </div>

              {/* Testimonial */}
              <p className="text-gray-300 mb-6 leading-relaxed italic">
                "{experience.testimonial}"
              </p>

              {/* Client Info */}
              <div className="flex items-center">
                {experience.image_url ? (
                  <div className="relative w-12 h-12 mr-3">
                    <Image
                      src={experience.image_url}
                      alt={experience.client_name}
                      fill
                      className="object-cover rounded-full"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-[#D4AF37] rounded-full mr-3 flex items-center justify-center">
                    <span className="text-black font-bold text-sm">
                      {experience.client_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <h4 className="text-white font-semibold">{experience.client_name}</h4>
                  <p className="text-[#D4AF37] text-sm">{experience.client_role}</p>
                  {experience.client_location && (
                    <p className="text-gray-400 text-xs">{experience.client_location}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 