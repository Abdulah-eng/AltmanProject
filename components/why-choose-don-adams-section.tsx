"use client"

import { Star, Shield, Zap, Award } from "lucide-react"

export function WhyChooseDonAdamsSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-black overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8 tracking-wide">
              WHY CHOOSE DON ADAMS
            </h2>
            <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-6 sm:mb-8"></div>
            <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed bg-gray-900 border border-gray-700 rounded-lg p-4 sm:p-6">
              Get smart with real estate by choosing a partner who understands the unique needs of each client and adapts to deliver exceptional results.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 animate-fade-in-up animate-stagger-1">
            {/* Card 1: Exceptional Negotiation */}
            <div className="bg-gray-800 rounded-lg p-4 sm:p-6 text-center hover:shadow-[#D4AF37]/20 transition-all duration-300">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Star className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
              </div>
              <h3 className="text-white font-bold text-lg sm:text-xl mb-3 sm:mb-4">Exceptional Negotiation</h3>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                Strategic negotiation skills that adapt to each unique situation, ensuring the best possible outcome for every client.
              </p>
            </div>

            {/* Card 2: Adaptable Approach */}
            <div className="bg-gray-800 rounded-lg p-4 sm:p-6 text-center hover:shadow-[#D4AF37]/20 transition-all duration-300">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
              </div>
              <h3 className="text-white font-bold text-lg sm:text-xl mb-3 sm:mb-4">Adaptable Approach</h3>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                The ability to connect with different personalities and adjust strategies to best serve each client's specific needs.
              </p>
            </div>

            {/* Card 3: Intuitive Problem-Solving */}
            <div className="bg-gray-800 rounded-lg p-4 sm:p-6 text-center hover:shadow-[#D4AF37]/20 transition-all duration-300">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
              </div>
              <h3 className="text-white font-bold text-lg sm:text-xl mb-3 sm:mb-4">Intuitive Problem-Solving</h3>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                Creative thinking and out-of-the-box solutions that overcome obstacles and create opportunities others might miss.
              </p>
            </div>

            {/* Card 4: Full-Service Support */}
            <div className="bg-gray-800 rounded-lg p-4 sm:p-6 text-center hover:shadow-[#D4AF37]/20 transition-all duration-300">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
              </div>
              <h3 className="text-white font-bold text-lg sm:text-xl mb-3 sm:mb-4">Full-Service Support</h3>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                Comprehensive real estate and property management services for all property types across Los Angeles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
