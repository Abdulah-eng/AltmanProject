"use client"

import { useEffect, useState } from "react"
import { Facebook, Instagram, Mail, Linkedin, Twitter } from "lucide-react"
import Image from "next/image"
import { getTeamMembers, TeamMember } from "@/lib/team-utils"

export function TeamSection() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        console.log("TeamSection: Starting to fetch team members...")
        setLoading(true)
        setError(null)
        
        const members = await getTeamMembers()
        console.log("TeamSection: Team members fetched:", members)
        
        setTeamMembers(members || [])
      } catch (err) {
        console.error('TeamSection: Error fetching team members:', err)
        setError('Failed to load team members')
      } finally {
        setLoading(false)
      }
    }

    fetchTeamMembers()
  }, [])

  // Show loading state
  if (loading) {
    return (
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-white text-4xl md:text-6xl font-bold tracking-wider mb-8">MEET DON ADAMS</h2>
            <div className="w-16 h-px bg-[#D4AF37] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-gray-900 rounded-lg overflow-hidden animate-pulse">
                <div className="h-96 bg-gray-800"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-800 rounded mb-2"></div>
                  <div className="h-4 bg-gray-800 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Show error state
  if (error) {
    return (
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-white text-4xl md:text-6xl font-bold tracking-wider mb-8">MEET DON ADAMS</h2>
          <div className="w-16 h-px bg-[#D4AF37] mx-auto mb-8"></div>
          <div className="text-red-400 text-lg">{error}</div>
        </div>
      </section>
    )
  }

  // Show empty state
  if (teamMembers.length === 0) {
    return (
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-white text-4xl md:text-6xl font-bold tracking-wider mb-8">MEET DON ADAMS</h2>
          <div className="w-16 h-px bg-[#D4AF37] mx-auto mb-8"></div>
          <div className="text-gray-400 text-lg">No team members available at the moment.</div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-white text-4xl md:text-6xl font-bold tracking-wider mb-8">MEET THE TEAM</h2>
          <div className="w-16 h-px bg-[#D4AF37] mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className="team-card bg-gray-900 rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-96 overflow-hidden">
                <Image
                  src={member.image_url || "/placeholder.jpg"}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.jpg"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Member Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">
                    {member.name.split(' ').map((part, i) => (
                      <span key={i}>
                        {i === 0 ? part : <span className="text-[#D4AF37]">{part}</span>}
                        {i < member.name.split(' ').length - 1 && ' '}
                      </span>
                    ))}
                  </h3>
                  <p className="text-[#D4AF37] text-sm font-medium mb-4 tracking-wide">{member.title}</p>
                  
                  {member.bio && (
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{member.bio}</p>
                  )}

                  {/* Social Links */}
                  <div className="flex space-x-4">
                    {member.linkedin_url && (
                      <a
                        href={member.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-[#D4AF37] transition-colors duration-300"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {member.instagram_url && (
                      <a
                        href={member.instagram_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-[#D4AF37] transition-colors duration-300"
                      >
                        <Instagram className="w-5 h-5" />
                      </a>
                    )}
                    {member.twitter_url && (
                      <a
                        href={member.twitter_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-[#D4AF37] transition-colors duration-300"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                    )}
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="text-white hover:text-[#D4AF37] transition-colors duration-300"
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
