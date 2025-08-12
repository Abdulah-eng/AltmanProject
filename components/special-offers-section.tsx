"use client"

import { Flame, Users, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SpecialOffersSection() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Top Call-to-Action Section */}
          <div className="bg-gray-800 rounded-lg p-8 mb-20 animate-fade-in-up">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Left Content - Text */}
              <div className="text-center lg:text-left">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-wide">
                  Ready to work with Don Adams?
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Whether buying, selling, or looking for property management services.
                </p>
              </div>
              
              {/* Right Content - Button */}
              <div className="flex-shrink-0">
                <Button className="bg-[#D4AF37] text-black hover:bg-[#B8941F] transition-all duration-300 font-bold px-8 py-4 text-lg rounded-lg">
                  CONTACT NOW
                </Button>
              </div>
            </div>
          </div>

          {/* Special Offers Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-wide">
              SPECIAL OFFERS
            </h2>
            <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Exclusive programs designed to help clients with unique needs and situations
            </p>
          </div>

          {/* Special Offer Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12 animate-fade-in-up animate-stagger-1">
            {/* Card 1: Wildfire Relief Program */}
            <div className="bg-gray-800 rounded-lg p-6 hover:shadow-[#D4AF37]/20 transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-[#D4AF37] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Flame className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-white font-bold text-xl">Wildfire Relief Program</h3>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                For those affected by recent wildfires, we offer a reduced commission rate of just 1.75% to help you rebuild and recover during this difficult time.
              </p>
              <button className="text-[#D4AF37] hover:text-[#B8941F] underline font-medium">
                Learn More
              </button>
            </div>

            {/* Card 2: Referral Discount Program */}
            <div className="bg-gray-800 rounded-lg p-6 hover:shadow-[#D4AF37]/20 transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-[#D4AF37] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-white font-bold text-xl">Referral Discount Program</h3>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                When you refer friends or family to us, they'll receive a special reduced commission rate of 2%, and you'll receive a thank-you gift after closing.
              </p>
              <button className="text-[#D4AF37] hover:text-[#B8941F] underline font-medium">
                Learn More
              </button>
            </div>

            {/* Card 3: Self-Employed Buyer Program */}
            <div className="bg-gray-800 rounded-lg p-6 hover:shadow-[#D4AF37]/20 transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-[#D4AF37] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-white font-bold text-xl">Self-Employed Buyer Program</h3>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                We've partnered with specialized lenders to help self-employed buyers navigate the unique challenges of mortgage approval, including bank statement loans and other flexible options.
              </p>
              <button className="text-[#D4AF37] hover:text-[#B8941F] underline font-medium">
                Learn More
              </button>
            </div>
          </div>

          {/* Bottom Contact Button */}
          <div className="text-center animate-fade-in-up animate-stagger-2">
            <Button className="bg-[#D4AF37] text-white hover:bg-[#B8941F] transition-all duration-300 font-bold px-8 py-4 text-lg rounded-lg border border-[#D4AF37]">
              CONTACT FOR DETAILS
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
