"use client"

import { Home, Users, Award } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AboutDonAdamsSection() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Image Section */}
            <div className="relative animate-fade-in-up">
              {/* Circular Portrait Container */}
              <div className="relative w-80 h-80 mx-auto">
                {/* Background Scene - Los Angeles View */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 rounded-full overflow-hidden">
                  {/* Hollywood Sign */}
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                    <div className="w-32 h-8 bg-white rounded-sm relative">
                      <div className="absolute inset-0 flex items-center justify-center text-black text-xs font-bold">
                        HOLLYWOOD
                      </div>
                    </div>
                  </div>
                  
                  {/* Radio Tower */}
                  <div className="absolute top-6 right-8">
                    <div className="w-1 h-16 bg-gray-300 mx-auto"></div>
                    <div className="w-4 h-4 bg-gray-300 rounded-full mx-auto -mt-2"></div>
                  </div>
                  
                  {/* Palm Trees */}
                  <div className="absolute bottom-16 left-8">
                    <div className="w-2 h-20 bg-green-600 mx-auto"></div>
                    <div className="w-8 h-8 bg-green-500 rounded-full mx-auto -mt-4"></div>
                  </div>
                  
                  <div className="absolute bottom-16 right-8">
                    <div className="w-2 h-20 bg-green-600 mx-auto"></div>
                    <div className="w-8 h-8 bg-green-500 rounded-full mx-auto -mt-4"></div>
                  </div>
                  
                  {/* Luxury Homes */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="flex gap-2">
                      <div className="w-6 h-4 bg-white rounded-sm"></div>
                      <div className="w-6 h-4 bg-white rounded-sm"></div>
                      <div className="w-6 h-4 bg-white rounded-sm"></div>
                    </div>
                  </div>
                </div>
                
                {/* Portrait Placeholder */}
                <div className="absolute inset-4 bg-gray-300 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              {/* Metro LA Specialist Button - Below Portrait */}
              <div className="text-center mt-6">
                <Button className="bg-[#D4AF37] text-white font-bold px-6 py-3 rounded-lg">
                  <div className="text-center">
                    <div>Metro LA</div>
                    <div>SPECIALIST</div>
                  </div>
                </Button>
              </div>
            </div>
            
            {/* Right Column - Text and Features */}
            <div className="animate-fade-in-up animate-stagger-1">
              {/* Section Title */}
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-wide">
                ABOUT DON ADAMS
              </h2>
              <div className="w-16 h-1 bg-[#D4AF37] mb-8"></div>
              
              {/* Descriptive Text */}
              <div className="space-y-4 mb-8">
                <p className="text-lg text-gray-300 leading-relaxed">
                  Don Adams is a dedicated real estate agent serving Los Angeles, with a focus on areas like Beverly Grove, West Hollywood, Hollywood, Hancock Park, West LA, Brentwood, and Bel Air. His foundation in real estate comes from working alongside his grandfather and his practical experience in property management, rehabilitation, and tenant relations.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  His approach is characterized by exceptional negotiation skills, adaptability, and intuitive problem-solving abilities, emphasizing his focus on seeing the complete picture and finding creative solutions to ensure the best client outcomes.
                </p>
              </div>
              
              {/* Three Feature Blocks */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Home className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">All Property Types</h3>
                  <p className="text-gray-300 text-sm font-medium">RESIDENTIAL & COMMERCIAL</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">Personalized Service</h3>
                  <p className="text-gray-300 text-sm font-medium">CLIENT FOCUSED</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">Creative Solutions</h3>
                  <p className="text-gray-300 text-sm font-medium">OUTSIDE THE BOX</p>
                </div>
              </div>
              
              {/* LEARN MORE Button */}
              <Button className="bg-[#D4AF37] text-white hover:bg-[#B8941F] transition-all duration-300 font-bold px-8 py-4 text-lg rounded-lg">
                LEARN MORE
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
