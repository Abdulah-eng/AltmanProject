"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Play, ExternalLink } from "lucide-react"
import { getFeaturedVideos, extractYouTubeVideoId, getYouTubeThumbnail, Video } from "@/lib/video-utils"

export function MediaSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)

  const mediaLogos = [
    { name: "TODAY", logo: "/placeholder.svg?height=60&width=120&text=TODAY" },
    { name: "NBC", logo: "/placeholder.svg?height=60&width=120&text=NBC" },
    { name: "E! ONLINE", logo: "/placeholder.svg?height=60&width=120&text=E! ONLINE" },
    { name: "Hollywood Reporter", logo: "/placeholder.svg?height=60&width=120&text=Hollywood Reporter" },
  ]

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

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      console.log("Fetching featured videos for media section...")
      const featuredVideos = await getFeaturedVideos()
      console.log("Featured videos found:", featuredVideos)
      setVideos(featuredVideos)
    } catch (error) {
      console.error('Error fetching videos:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section ref={sectionRef} className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        {/* Media Logos */}
        <div className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {mediaLogos.map((media, index) => (
              <div
                key={media.name}
                className={`flex items-center justify-center media-logo fade-in-section ${
                  isVisible ? "is-visible" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Image
                  src={media.logo || "/placeholder.svg"}
                  alt={media.name}
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* YouTube Section */}
        <div className="max-w-4xl mx-auto">
          <div
            className={`text-center mb-8 fade-in-section ${isVisible ? "is-visible" : ""}`}
            style={{ animationDelay: "0.4s" }}
          >
            <div className="text-gray-500 text-sm tracking-[0.3em] mb-4">WATCH THE LATEST</div>
            <h2 className="heading-primary text-4xl md:text-5xl text-black mb-8">
              HOMES OF HOLLYWOOD{" "}
              <span className="inline-flex items-center">
                <span className="bg-red-600 text-white px-3 py-1 rounded text-3xl font-bold mr-2">YouTube</span>
              </span>{" "}
              CHANNEL
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="text-gray-600 text-lg">Loading videos...</div>
            </div>
          ) : videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.slice(0, 6).map((video, index) => {
                const videoId = extractYouTubeVideoId(video.youtube_url)
                const thumbnailUrl = video.thumbnail_url || (videoId ? getYouTubeThumbnail(videoId) : "")
                
                return (
                  <Card
                    key={video.id}
                    className={`bg-white border-gray-200 hover:border-red-500 transition-all duration-300 group overflow-hidden shadow-lg hover:shadow-xl fade-in-section ${
                      isVisible ? "is-visible" : ""
                    }`}
                    style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                  >
                    <div className="relative">
                      {thumbnailUrl ? (
                        <img
                          src={thumbnailUrl}
                          alt={video.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                          <Play className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                      
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
                      
                      <div className="absolute top-4 left-4">
                        <span className="bg-red-600 text-white px-2 py-1 text-xs font-bold tracking-wide rounded">
                          YOUTUBE
                        </span>
                      </div>
                      
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button
                          variant="ghost"
                          size="lg"
                          onClick={() => window.open(video.youtube_url, "_blank")}
                          className="text-white hover:text-red-500 hover:bg-white/20 w-12 h-12 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                          <Play className="w-6 h-6" />
                        </Button>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">
                        {video.title}
                      </h3>
                      
                      {video.description && (
                        <p className="text-gray-600 mb-3 text-xs line-clamp-2">
                          {video.description}
                        </p>
                      )}
                      
                      <Button
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold text-sm tracking-wide"
                        onClick={() => window.open(video.youtube_url, "_blank")}
                      >
                        WATCH NOW
                        <ExternalLink className="w-3 h-3 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-600 text-lg">No videos available</div>
              <p className="text-gray-500 text-sm mt-2">Check back soon for new content</p>
            </div>
          )}

          {videos.length > 0 && (
            <div className="text-center mt-8">
              <Button
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white bg-transparent"
                onClick={() => window.open('/media', '_self')}
              >
                VIEW ALL VIDEOS
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
