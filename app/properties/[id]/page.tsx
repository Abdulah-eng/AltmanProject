"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Search, ArrowLeft, Phone, Mail } from "lucide-react"
import Link from "next/link"
import { IDXWidget } from "@/components/idx-widget"

interface PropertyDetailPageProps {
  params: {
    id: string
  }
}

export default function PropertyDetailPage({ params }: PropertyDetailPageProps) {

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-gray-400">
            <Link href="/" className="hover:text-[#D4AF37]">Home</Link>
            <span className="mx-2">{">"}</span>
            <Link href="/listings" className="hover:text-[#D4AF37]">Properties</Link>
            <span className="mx-2">{">"}</span>
            <span>Property Search</span>
          </div>
        </div>

        {/* Property Search Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">Property Search</h1>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Search for properties using our comprehensive MLS database. Find your perfect home with detailed search filters and real-time property data.
              </p>
            </div>
            
            <IDXWidget 
              title=""
              height={800}
              showTitle={false}
              className="bg-white rounded-lg overflow-hidden"
            />
            
            <div className="text-center mt-8">
              <p className="text-gray-400 text-sm mb-4">
                Powered by TheMLS.com - Real-time property data
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black">
                  <Link href="/">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </Link>
                </Button>
                <Button asChild className="bg-[#D4AF37] hover:bg-[#B8941F] text-black">
                  <Link href="/contact">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Agent
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
