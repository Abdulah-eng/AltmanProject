"use client"

import { useEffect, useState } from "react"
import { getHomePageImages, getImageByKey, type PageImage } from "@/lib/page-images-utils"
import { getTeamMembers, type TeamMember } from "@/lib/team-utils"
import Image from "next/image"

export default function TestAllPage() {
  const [homeImages, setHomeImages] = useState<Record<string, PageImage | null>>({})
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [aboutHeroImage, setAboutHeroImage] = useState<PageImage | null>(null)
  const [servicesProcessImage, setServicesProcessImage] = useState<PageImage | null>(null)
  const [mediaHeroImage, setMediaHeroImage] = useState<PageImage | null>(null)
  const [mediaYoutubeImage, setMediaYoutubeImage] = useState<PageImage | null>(null)
  const [mediaPressImage, setMediaPressImage] = useState<PageImage | null>(null)
  const [trainingHeroImage, setTrainingHeroImage] = useState<PageImage | null>(null)
  const [trainingSpeakingImage, setTrainingSpeakingImage] = useState<PageImage | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAllData()
  }, [])

  const fetchAllData = async () => {
    try {
      // Fetch all home page images
      const images = await getHomePageImages()
      setHomeImages(images)

      // Fetch team members
      const members = await getTeamMembers()
      setTeamMembers(members)

      // Fetch about page hero image
      const aboutHero = await getImageByKey('about', 'hero_image')
      setAboutHeroImage(aboutHero)

      // Fetch services page process image
      const servicesProcess = await getImageByKey('services', 'process_image')
      setServicesProcessImage(servicesProcess)

      // Fetch media page images
      const mediaHero = await getImageByKey('media', 'hero_image')
      setMediaHeroImage(mediaHero)

      const mediaYoutube = await getImageByKey('media', 'youtube_image')
      setMediaYoutubeImage(mediaYoutube)

      const mediaPress = await getImageByKey('media', 'press_image')
      setMediaPressImage(mediaPress)

      // Fetch training page images
      const trainingHero = await getImageByKey('training', 'hero_image')
      setTrainingHeroImage(trainingHero)

      const trainingSpeaking = await getImageByKey('training', 'speaking_image')
      setTrainingSpeakingImage(trainingSpeaking)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading all data...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Comprehensive Test Page</h1>
        
        <div className="grid gap-8">
          {/* Home Page Images */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Home Page Images</h2>
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

          {/* Team Members */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Team Members ({teamMembers.length})</h2>
            {teamMembers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="border rounded p-4">
                    <h3 className="font-medium mb-2">{member.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{member.title}</p>
                    {member.image_url ? (
                      <div className="relative h-32 w-full">
                        <Image
                          src={member.image_url}
                          alt={member.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    ) : (
                      <p className="text-red-500 text-sm">No image</p>
                    )}
                    <div className="mt-2 text-xs text-gray-500">
                      <p>Featured: {member.featured ? 'Yes' : 'No'}</p>
                      <p>Order: {member.order_index}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-red-500">No team members found</p>
            )}
          </div>

          {/* About Page Hero Image */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">About Page Hero Image</h2>
            {aboutHeroImage ? (
              <div>
                <p className="text-sm text-gray-600 mb-2">URL: {aboutHeroImage.url}</p>
                <p className="text-sm text-gray-600 mb-4">Alt: {aboutHeroImage.alt_text}</p>
                <div className="relative h-64 w-full">
                  <Image
                    src={aboutHeroImage.url}
                    alt={aboutHeroImage.alt_text}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              </div>
            ) : (
              <p className="text-red-500">No about hero image found</p>
            )}
          </div>

                     {/* Services Page Process Image */}
           <div className="bg-white p-6 rounded-lg shadow">
             <h2 className="text-2xl font-semibold mb-4">Services Page Process Image</h2>
             {servicesProcessImage ? (
               <div>
                 <p className="text-sm text-gray-600 mb-2">URL: {servicesProcessImage.url}</p>
                 <p className="text-sm text-gray-600 mb-4">Alt: {servicesProcessImage.alt_text}</p>
                 <div className="relative h-64 w-full">
                   <Image
                     src={servicesProcessImage.url}
                     alt={servicesProcessImage.alt_text}
                     fill
                     className="object-cover rounded"
                   />
                 </div>
               </div>
             ) : (
               <p className="text-red-500">No services process image found</p>
             )}
           </div>

           {/* Media Page Images */}
           <div className="bg-white p-6 rounded-lg shadow">
             <h2 className="text-2xl font-semibold mb-4">Media Page Images</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               {/* Hero Image */}
               <div>
                 <h3 className="font-medium mb-2">Hero Image</h3>
                 {mediaHeroImage ? (
                   <div>
                     <p className="text-xs text-gray-600 mb-2">{mediaHeroImage.url}</p>
                     <div className="relative h-32 w-full">
                       <Image
                         src={mediaHeroImage.url}
                         alt={mediaHeroImage.alt_text}
                         fill
                         className="object-cover rounded"
                       />
                     </div>
                   </div>
                 ) : (
                   <p className="text-red-500 text-sm">No hero image found</p>
                 )}
               </div>

               {/* YouTube Image */}
               <div>
                 <h3 className="font-medium mb-2">YouTube Image</h3>
                 {mediaYoutubeImage ? (
                   <div>
                     <p className="text-xs text-gray-600 mb-2">{mediaYoutubeImage.url}</p>
                     <div className="relative h-32 w-full">
                       <Image
                         src={mediaYoutubeImage.url}
                         alt={mediaYoutubeImage.alt_text}
                         fill
                         className="object-cover rounded"
                       />
                     </div>
                   </div>
                 ) : (
                   <p className="text-red-500 text-sm">No YouTube image found</p>
                 )}
               </div>

               {/* Press Image */}
               <div>
                 <h3 className="font-medium mb-2">Press Image</h3>
                 {mediaPressImage ? (
                   <div>
                     <p className="text-xs text-gray-600 mb-2">{mediaPressImage.url}</p>
                     <div className="relative h-32 w-full">
                       <Image
                         src={mediaPressImage.url}
                         alt={mediaPressImage.alt_text}
                         fill
                         className="object-cover rounded"
                       />
                     </div>
                   </div>
                 ) : (
                   <p className="text-red-500 text-sm">No press image found</p>
                 )}
               </div>
             </div>
           </div>

           {/* Training Page Images */}
           <div className="bg-white p-6 rounded-lg shadow">
             <h2 className="text-2xl font-semibold mb-4">Training Page Images</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {/* Hero Image */}
               <div>
                 <h3 className="font-medium mb-2">Hero Image</h3>
                 {trainingHeroImage ? (
                   <div>
                     <p className="text-xs text-gray-600 mb-2">{trainingHeroImage.url}</p>
                     <div className="relative h-32 w-full">
                       <Image
                         src={trainingHeroImage.url}
                         alt={trainingHeroImage.alt_text}
                         fill
                         className="object-cover rounded"
                       />
                     </div>
                   </div>
                 ) : (
                   <p className="text-red-500 text-sm">No hero image found</p>
                 )}
               </div>

               {/* Speaking Image */}
               <div>
                 <h3 className="font-medium mb-2">Speaking Image</h3>
                 {trainingSpeakingImage ? (
                   <div>
                     <p className="text-xs text-gray-600 mb-2">{trainingSpeakingImage.url}</p>
                     <div className="relative h-32 w-full">
                       <Image
                         src={trainingSpeakingImage.url}
                         alt={trainingSpeakingImage.alt_text}
                         fill
                         className="object-cover rounded"
                       />
                     </div>
                   </div>
                 ) : (
                   <p className="text-red-500 text-sm">No speaking image found</p>
                 )}
               </div>
             </div>
           </div>

           {/* Database Summary */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Database Summary</h2>
                         <div className="space-y-2">
               <p><strong>Home Page Images Found:</strong> {Object.values(homeImages).filter(Boolean).length}/6</p>
               <p><strong>Team Members Found:</strong> {teamMembers.length}</p>
               <p><strong>Featured Team Members:</strong> {teamMembers.filter(m => m.featured).length}</p>
               <p><strong>About Hero Image:</strong> {aboutHeroImage ? 'Yes' : 'No'}</p>
               <p><strong>Services Process Image:</strong> {servicesProcessImage ? 'Yes' : 'No'}</p>
               <p><strong>Media Hero Image:</strong> {mediaHeroImage ? 'Yes' : 'No'}</p>
               <p><strong>Media YouTube Image:</strong> {mediaYoutubeImage ? 'Yes' : 'No'}</p>
               <p><strong>Media Press Image:</strong> {mediaPressImage ? 'Yes' : 'No'}</p>
               <p><strong>Training Hero Image:</strong> {trainingHeroImage ? 'Yes' : 'No'}</p>
               <p><strong>Training Speaking Image:</strong> {trainingSpeakingImage ? 'Yes' : 'No'}</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
} 