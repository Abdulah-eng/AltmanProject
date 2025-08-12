"use client"

import { Users, DollarSign, Wrench, FileText, Shield, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const services = [
  {
    id: 1,
    icon: Users,
    title: "Tenant Screening & Placement",
    description: "Comprehensive tenant screening including background checks, credit reports, and rental history verification to find reliable tenants for your property."
  },
  {
    id: 2,
    icon: DollarSign,
    title: "Rent Collection & Accounting",
    description: "Timely rent collection, detailed financial reporting, and transparent accounting to keep your investment profitable and organized."
  },
  {
    id: 3,
    icon: Wrench,
    title: "Property Maintenance",
    description: "Proactive maintenance programs and 24/7 emergency response to protect your property value and keep tenants satisfied."
  },
  {
    id: 4,
    icon: FileText,
    title: "Property Inspections",
    description: "Regular property inspections to identify potential issues before they become costly problems and ensure tenant compliance."
  },
  {
    id: 5,
    icon: Shield,
    title: "Eviction Protection",
    description: "Professional handling of lease violations and the eviction process when necessary, following all legal requirements."
  },
  {
    id: 6,
    icon: TrendingUp,
    title: "Investment Property Consulting",
    description: "Expert advice on property improvements, market trends, and investment strategies to maximize your returns."
  }
]

export function PropertyManagementServices() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-wide">
              PROPERTY MANAGEMENT SERVICES
            </h2>
            <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive property management solutions for investors and property owners in Los Angeles
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => (
              <div key={service.id} className={`animate-fade-in-up animate-stagger-${(index % 3) + 1}`}>
                <Card className="bg-gray-800 border-gray-700 shadow-2xl hover:border-[#D4AF37]/50 transition-all duration-300 h-full">
                  <CardContent className="p-8 text-center">
                    {/* Service Icon */}
                    <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6">
                      <service.icon className="w-8 h-8 text-black" />
                    </div>
                    
                    {/* Service Title */}
                    <h3 className="text-xl font-bold text-white mb-4">
                      {service.title}
                    </h3>
                    
                    {/* Service Description */}
                    <p className="text-gray-300 leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Call to Action Button */}
          <div className="text-center animate-fade-in-up">
            <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 font-bold px-8 py-4 text-lg">
              LEARN MORE ABOUT OUR SERVICES
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
