"use client"

import { AlertTriangle, Heart, ExternalLink, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function WildfireSupport() {
  return (
    <section className="py-20 bg-gradient-to-br from-red-900 via-red-800 to-red-900">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Section: Wildfire Support */}
            <div className="lg:col-span-2 animate-fade-in-up">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-8 h-8 text-[#D4AF37]" />
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-wide">
                  WILDFIRE SUPPORT
                </h2>
              </div>
              
              <p className="text-lg text-white mb-8 leading-relaxed">
                Our hearts go out to those affected by the recent wildfires across Los Angeles. Don Adams is committed to helping our community recover and rebuild. We're offering special assistance to those who have lost homes or been displaced.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <span className="text-white">Free property valuation and insurance claim assistance</span>
                </div>
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <span className="text-white">Priority access to rental properties in unaffected areas</span>
                </div>
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <span className="text-white">Reduced commission for wildfire victims looking to buy or sell properties</span>
                </div>
              </div>
              
              <Button className="bg-[#D4AF37] text-black hover:bg-[#B8941F] transition-all duration-300 font-bold px-8 py-4 text-lg">
                GET SUPPORT
              </Button>
            </div>
            
            {/* Right Section: Wildfire Resources */}
            <div className="animate-fade-in-up animate-stagger-1">
              <Card className="bg-red-800/50 border-red-700 shadow-2xl h-full">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Wildfire Resources</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <ExternalLink className="w-4 h-4 text-[#D4AF37]" />
                      <a href="#" className="text-white hover:text-[#D4AF37] transition-colors">
                        Red Cross Los Angeles
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <ExternalLink className="w-4 h-4 text-[#D4AF37]" />
                      <a href="#" className="text-white hover:text-[#D4AF37] transition-colors">
                        LA Fire Department Updates
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <ExternalLink className="w-4 h-4 text-[#D4AF37]" />
                      <a href="#" className="text-white hover:text-[#D4AF37] transition-colors">
                        FEMA Disaster Assistance
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <ExternalLink className="w-4 h-4 text-[#D4AF37]" />
                      <a href="#" className="text-white hover:text-[#D4AF37] transition-colors">
                        Wildfire Preparedness
                      </a>
                    </div>
                  </div>
                  
                  <div className="border-t border-red-600 pt-4">
                    <p className="text-white mb-3">Contact our dedicated wildfire support team:</p>
                    <div className="space-y-2">
                      <a 
                        href="mailto:wildfire-support@homesofhollywood.com" 
                        className="block text-[#D4AF37] hover:text-white transition-colors"
                      >
                        wildfire-support@homesofhollywood.com
                      </a>
                      <a 
                        href="tel:+13105559876" 
                        className="block text-[#D4AF37] hover:text-white transition-colors"
                      >
                        (310) 555-9876
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
