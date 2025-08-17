"use client"

import { Home, Users, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function AboutDonAdamsSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-black overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Portrait with LA Backdrop */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <div className="relative inline-block">
                {/* Large Portrait Container */}
                <div className="relative w-full max-w-[400px] sm:max-w-[500px] lg:max-w-[550px] h-[300px] sm:h-[400px] lg:h-[500px] mx-auto">
                  {/* Don Adams Full Image - No Border */}
                  <div className="w-full h-full overflow-hidden rounded-lg">
                    <Image
                      src="/don-adams.jpg"
                      alt="Don Adams - Metro LA Specialist"
                      width={550}
                      height={500}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
                
                {/* Two Buttons Below Portrait */}
                <div className="text-center mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button className="bg-[#D4AF37] text-black font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-lg w-full sm:w-48 text-base sm:text-lg">
                    <div className="text-center">
                      <div>Metro LA</div>
                      <div>SPECIALIST</div>
                    </div>
                  </Button>
                  <Button className="bg-[#D4AF37] text-black font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-lg w-full sm:w-48 text-base sm:text-lg">
                    LEARN MORE
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column - Text and Features */}
            <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 tracking-wide text-center lg:text-left">
                  ABOUT DON ADAMS
                </h2>
                <div className="w-16 h-1 bg-[#D4AF37] mb-6 sm:mb-8 mx-auto lg:mx-0"></div>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed text-center lg:text-left">
                  Don Adams is a dedicated real estate agent serving all of Los Angeles, with a focus on areas like Beverly Grove, West Hollywood, Hollywood, Hancock Park, West LA, Brentwood, and Bel Air. His foundation in real estate comes from working alongside his grandfather and his practical experience in property management, rehabilitation, and tenant relations.
                </p>
                
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed text-center lg:text-left">
                  His approach is characterized by exceptional negotiation skills, adaptability to different client personalities, and intuitive problem-solving abilities, emphasizing his focus on seeing the complete picture and finding creative solutions to ensure the best possible outcome in every transaction.
                </p>
              </div>

              {/* Three Feature Blocks with Icons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-6">
                <div className="text-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Home className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
                  </div>
                  <h3 className="text-white font-bold text-base sm:text-lg mb-2">All Property Types</h3>
                  <p className="text-gray-300 text-xs sm:text-sm font-medium">RESIDENTIAL & COMMERCIAL</p>
                </div>
                
                <div className="text-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Users className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
                  </div>
                  <h3 className="text-white font-bold text-base sm:text-lg mb-2">Personalized Service</h3>
                  <p className="text-gray-300 text-xs sm:text-sm font-medium">CLIENT FOCUSED</p>
                </div>
                
                <div className="text-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Award className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
                  </div>
                  <h3 className="text-white font-bold text-base sm:text-lg mb-2">Creative Solutions</h3>
                  <p className="text-gray-300 text-xs sm:text-sm font-medium">OUTSIDE THE BOX</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
