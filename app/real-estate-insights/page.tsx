"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { IDXEmbed } from "@/components/idx-embed"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function RealEstateInsightsPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Header />

      <main className="w-full">
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in-up">
              <div className="flex items-center justify-center mb-6">
                <Link
                  href="/"
                  className="flex items-center text-[#D4AF37] hover:text-[#B8941F] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider mb-8 px-4">
                REAL ESTATE INSIGHTS
              </h1>
              <div className="w-16 h-px bg-[#D4AF37] mx-auto mb-6" />
              <p className="text-gray-300 text-base md:text-lg max-w-3xl mx-auto px-4">
                Access real-time market intelligence, reports, and analytics powered by TheMLS.com. Stay ahead
                of the market with the latest trends and neighborhood activity.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl shadow-black/30">
                <div className="text-center mb-10">
                  <h2 className="text-2xl sm:text-3xl font-semibold tracking-wide text-white mb-4">
                    Live MLS Market Intelligence
                  </h2>
                  <p className="text-gray-400 text-sm sm:text-base max-w-3xl mx-auto">
                    Explore dynamic market activity, pricing trends, and neighborhood statistics curated directly
                    from the MLS. Use the interactive tools below to dive into tailored insights for your area of
                    interest.
                  </p>
                </div>

                <IDXEmbed className="bg-white rounded-xl overflow-hidden shadow-lg" scriptId="idx-insights-page" />

                <div className="mt-10 text-center text-sm text-gray-500">
                  Powered by TheMLS.com — Real-time data updates, refreshed automatically.
                </div>
              </div>

              <div className="mt-16 grid gap-6 sm:grid-cols-2">
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Need Deeper Analysis?</h3>
                  <p className="text-gray-400 text-sm mb-6">
                    Request custom reports, investment briefs, and market forecasts tailored to your specific
                    goals across Los Angeles and Orange County.
                  </p>
                  <Button
                    asChild
                    className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold w-full sm:w-auto"
                  >
                    <Link href="/contact">
                      Schedule a Consultation
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Explore Additional MLS Tools</h3>
                  <p className="text-gray-400 text-sm mb-6">
                    Access property organizer tools, email alerts, and mortgage resources to streamline your real
                    estate journey.
                  </p>
                  <div className="flex flex-col gap-3">
                    <Button asChild variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black">
                      <Link href="/idx">Open MLS Search</Link>
                    </Button>
                    <Button asChild variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black">
                      <Link href="/featured-listings">Featured Listings</Link>
                    </Button>
                    <Button asChild variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black">
                      <Link href="/open-homes">Upcoming Open Homes</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
