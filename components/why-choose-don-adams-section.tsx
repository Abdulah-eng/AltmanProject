"use client"

import { Star, Shield, Zap, Award } from "lucide-react"

export function WhyChooseDonAdamsSection() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-wide">
              WHY CHOOSE DON ADAMS
            </h2>
            <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Get smart with real estate by choosing a partner who understands the unique needs of each client and adapts to deliver exceptional results.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in-up animate-stagger-1">
            {/* Card 1: Exceptional Negotiation */}
            <div className="bg-gray-800 rounded-lg p-6 text-center hover:shadow-[#D4AF37]/20 transition-all duration-300">
              <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-white font-bold text-xl mb-4">Exceptional Negotiation</h3>
              <p className="text-gray-300 leading-relaxed">
                Strategic negotiation skills that adapt to each unique situation, ensuring the best possible outcome for every client.
              </p>
            </div>

            {/* Card 2: Adaptable Approach */}
            <div className="bg-gray-800 rounded-lg p-6 text-center hover:shadow-[#D4AF37]/20 transition-all duration-300">
              <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-white font-bold text-xl mb-4">Adaptable Approach</h3>
              <p className="text-gray-300 leading-relaxed">
                The ability to connect with different personalities and adjust strategies to best serve each client's specific needs.
              </p>
            </div>

            {/* Card 3: Intuitive Problem-Solving */}
            <div className="bg-gray-800 rounded-lg p-6 text-center hover:shadow-[#D4AF37]/20 transition-all duration-300">
              <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-white font-bold text-xl mb-4">Intuitive Problem-Solving</h3>
              <p className="text-gray-300 leading-relaxed">
                Creative thinking and out-of-the-box solutions that overcome obstacles and create opportunities others might miss.
              </p>
            </div>

            {/* Card 4: Full-Service Support */}
            <div className="bg-gray-800 rounded-lg p-6 text-center hover:shadow-[#D4AF37]/20 transition-all duration-300">
              <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-white font-bold text-xl mb-4">Full-Service Support</h3>
              <p className="text-gray-300 leading-relaxed">
                Comprehensive real estate and property management services for all property types across Los Angeles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
