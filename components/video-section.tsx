"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, ExternalLink } from "lucide-react"
import { getFeaturedVideos, extractYouTubeVideoId, getYouTubeThumbnail, Video } from "@/lib/video-utils"

export function VideoSection() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      console.log("Fetching featured videos...")
      const featuredVideos = await getFeaturedVideos()
      console.log("Featured videos found:", featuredVideos)
      setVideos(featuredVideos)
    } catch (error) {
      console.error('Error fetching videos:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 text-center">
          <div className="text-white text-xl">Loading videos...</div>
        </div>
      </section>
    )
  }

  if (videos.length === 0) {
    return null // Don't show section if no videos
  }

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-white text-4xl md:text-6xl font-bold tracking-wider mb-8">WATCH THE LATEST</h2>
          <div className="w-16 h-px bg-[#D4AF37] mx-auto mb-8"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Stay updated with the latest real estate insights, market trends, and behind-the-scenes content.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {videos.map((video) => {
            const videoId = extractYouTubeVideoId(video.youtube_url)
            const thumbnailUrl = video.thumbnail_url || (videoId ? getYouTubeThumbnail(videoId) : "")
            
            return (
              <Card
                key={video.id}
                className="bg-gray-900 border-gray-800 hover:border-[#D4AF37] transition-all duration-300 group overflow-hidden"
              >
                <div className="relative">
                  {thumbnailUrl ? (
                    <img
                      src={thumbnailUrl}
                      alt={video.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-800 flex items-center justify-center">
                      <Play className="w-12 h-12 text-gray-600" />
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#D4AF37] text-black px-3 py-1 text-sm font-bold tracking-wide">
                      YOUTUBE
                    </span>
                  </div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={() => window.open(video.youtube_url, "_blank")}
                      className="text-white hover:text-[#D4AF37] hover:bg-black/20 w-16 h-16 rounded-full"
                    >
                      <Play className="w-8 h-8" />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  
                  {video.description && (
                    <p className="text-gray-300 mb-4 text-sm line-clamp-3">
                      {video.description}
                    </p>
                  )}
                  
                  <Button
                    className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold tracking-wide"
                    onClick={() => window.open(video.youtube_url, "_blank")}
                  >
                    WATCH NOW
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {videos.length > 0 && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black bg-transparent"
              onClick={() => window.open('/media', '_self')}
            >
              VIEW ALL VIDEOS
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
} 