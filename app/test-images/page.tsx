"use client"

import { useEffect, useState } from "react"
import { getHomePageImages, getImageByKey, type PageImage } from "@/lib/page-images-utils"
import Image from "next/image"

export default function TestImagesPage() {
  const [homeImages, setHomeImages] = useState<Record<string, PageImage | null>>({})
  const [heroImage, setHeroImage] = useState<PageImage | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      // Fetch all home page images
      const images = await getHomePageImages()
      setHomeImages(images)

      // Fetch hero image specifically
      const hero = await getImageByKey('home', 'hero_image')
      setHeroImage(hero)
    } catch (error) {
      console.error('Error fetching images:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading images...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Image Test Page</h1>
        
        <div className="grid gap-8">
          {/* Hero Image Test */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Hero Image</h2>
            {heroImage ? (
              <div>
                <p className="text-sm text-gray-600 mb-2">Key: hero_image</p>
                <p className="text-sm text-gray-600 mb-2">URL: {heroImage.url}</p>
                <p className="text-sm text-gray-600 mb-4">Alt: {heroImage.alt_text}</p>
                <div className="relative h-64 w-full">
                  <Image
                    src={heroImage.url}
                    alt={heroImage.alt_text}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              </div>
            ) : (
              <p className="text-red-500">No hero image found</p>
            )}
          </div>

          {/* All Home Page Images */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">All Home Page Images</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(homeImages).map(([key, image]) => (
                <div key={key} className="border rounded p-4">
                  <h3 className="font-medium mb-2">{key}</h3>
                  {image ? (
                    <div>
                      <p className="text-xs text-gray-600 mb-2">{image.url}</p>
                      <div className="relative h-32 w-full">
                        <Image
                          src={image.url}
                          alt={image.alt_text}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="text-red-500 text-sm">No image found</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Database Info */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Database Information</h2>
            <div className="space-y-2">
              <p><strong>Total images found:</strong> {Object.values(homeImages).filter(Boolean).length}</p>
              <p><strong>Expected images:</strong> 6</p>
              <div className="mt-4">
                <h3 className="font-medium mb-2">Expected Image Keys:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>hero_image</li>
                  <li>about_section_image</li>
                  <li>services_section_image</li>
                  <li>team_section_image</li>
                  <li>stats_section_image</li>
                  <li>contact_section_image</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 