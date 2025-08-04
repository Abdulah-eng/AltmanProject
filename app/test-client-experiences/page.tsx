"use client"

import { useEffect, useState } from "react"
import { getPublishedClientExperiences, getFeaturedClientExperiences, type ClientExperience } from "@/lib/client-experiences-utils"
import { Star } from "lucide-react"
import Image from "next/image"

export default function TestClientExperiencesPage() {
  const [allExperiences, setAllExperiences] = useState<ClientExperience[]>([])
  const [featuredExperiences, setFeaturedExperiences] = useState<ClientExperience[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    testClientExperiences()
  }, [])

  const testClientExperiences = async () => {
    try {
      console.log("Testing client experiences functionality...")
      
      // Fetch all published experiences
      const all = await getPublishedClientExperiences()
      setAllExperiences(all)
      console.log("All published experiences:", all)

      // Fetch featured experiences
      const featured = await getFeaturedClientExperiences()
      setFeaturedExperiences(featured)
      console.log("Featured experiences:", featured)
    } catch (error) {
      console.error('Error testing client experiences:', error)
    } finally {
      setLoading(false)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Testing client experiences...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Client Experiences Test Page</h1>
        
        <div className="grid gap-8">
          {/* Featured Experiences */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Featured Client Experiences ({featuredExperiences.length})</h2>
            {featuredExperiences.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {featuredExperiences.map((experience) => (
                  <div key={experience.id} className="border rounded p-4">
                    <div className="flex mb-2">
                      {renderStars(experience.rating)}
                    </div>
                    <p className="text-sm text-gray-600 mb-2 italic">"{experience.testimonial}"</p>
                    <div className="flex items-center">
                      {experience.image_url ? (
                        <div className="relative w-8 h-8 mr-2">
                          <Image
                            src={experience.image_url}
                            alt={experience.client_name}
                            fill
                            className="object-cover rounded-full"
                          />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                      )}
                      <div>
                        <p className="font-medium text-sm">{experience.client_name}</p>
                        <p className="text-xs text-gray-500">{experience.client_role}</p>
                        {experience.client_location && (
                          <p className="text-xs text-gray-400">{experience.client_location}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No featured experiences found</p>
            )}
          </div>

          {/* All Experiences */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">All Published Client Experiences ({allExperiences.length})</h2>
            {allExperiences.length > 0 ? (
              <div className="space-y-4">
                {allExperiences.map((experience) => (
                  <div key={experience.id} className="border rounded p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex">
                        {renderStars(experience.rating)}
                      </div>
                      <div className="text-xs text-gray-500">
                        Order: {experience.order_index} | 
                        {experience.featured ? ' Featured' : ' Not Featured'} | 
                        {experience.published ? ' Published' : ' Draft'}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 italic">"{experience.testimonial}"</p>
                    <div className="flex items-center">
                      {experience.image_url ? (
                        <div className="relative w-8 h-8 mr-2">
                          <Image
                            src={experience.image_url}
                            alt={experience.client_name}
                            fill
                            className="object-cover rounded-full"
                          />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                      )}
                      <div>
                        <p className="font-medium text-sm">{experience.client_name}</p>
                        <p className="text-xs text-gray-500">{experience.client_role}</p>
                        {experience.client_location && (
                          <p className="text-xs text-gray-400">{experience.client_location}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No experiences found</p>
            )}
          </div>

          {/* Database Summary */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Database Summary</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded">
                <div className="text-2xl font-bold text-blue-600">{allExperiences.length}</div>
                <div className="text-sm text-gray-600">Total Published</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded">
                <div className="text-2xl font-bold text-green-600">{featuredExperiences.length}</div>
                <div className="text-sm text-gray-600">Featured</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded">
                <div className="text-2xl font-bold text-yellow-600">
                  {allExperiences.filter(e => e.rating === 5).length}
                </div>
                <div className="text-sm text-gray-600">5-Star Reviews</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded">
                <div className="text-2xl font-bold text-purple-600">
                  {allExperiences.filter(e => e.image_url).length}
                </div>
                <div className="text-sm text-gray-600">With Photos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 