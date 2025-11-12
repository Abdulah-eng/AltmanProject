"use client"

import { Button } from "@/components/ui/button"
import { IDXEmbed } from "@/components/idx-embed"
import Link from "next/link"

export function NewDevelopmentsSection() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-wide">NEW DEVELOPMENTS</h2>
            <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover the most exclusive pre-construction and newly completed luxury developments across Los Angeles.
            </p>
          </div>

          <IDXEmbed className="bg-white rounded-lg overflow-hidden shadow-xl" scriptId="idx-home-developments" />

          <div className="text-center mt-10">
            <Button
              asChild
              size="lg"
              className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold px-8 py-4 mr-4"
            >
              <Link href="/new-developments">VIEW ALL DEVELOPMENTS</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black px-8 py-4"
            >
              <Link href="/idx">SEARCH NEW CONSTRUCTION PROPERTIES</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
