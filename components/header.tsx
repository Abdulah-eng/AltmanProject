"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { X, Mail, ChevronDown } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const aboutDropdownItems = [
    { label: "JOSH ALTMAN", href: "/about/josh-altman" },
    { label: "MATTHEW ALTMAN", href: "/about/matthew-altman" },
    { label: "HEATHER ALTMAN", href: "/about/heather-altman" },
    { label: "JACOB GREENE", href: "/about/jacob-greene" },
  ]

  const propertiesDropdownItems = [
    { label: "ALL LISTINGS", href: "/listings" },
    { label: "LOS ANGELES LISTINGS", href: "/listings/los-angeles" },
    { label: "DEVELOPMENTS", href: "/listings/developments" },
    { label: "PROPERTY MARKETING", href: "/services/property-marketing" },
    { label: "PARTNERSHIPS", href: "/services/partnerships" },
    { label: "SOLD LISTINGS", href: "/listings/sold" },
    { label: "RECORD BREAKING SALES", href: "/listings/record-breaking" },
    { label: "PROPERTY SEARCH", href: "/listings/search" },
    { label: "BUYERS", href: "/services/buyers" },
    { label: "SELLERS", href: "/services/sellers" },
  ]



  return (
    <>
      <header className="bg-black text-white sticky top-0 z-50 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 relative">
                <Image
                  src="/logo.png.png"
                  alt="Homes of Hollywood Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              {/* About Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setActiveDropdown("about")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href="/about"
                  className="flex items-center text-white hover:text-[#D4AF37] transition-colors text-sm font-medium tracking-wide"
                >
                  ABOUT
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Link>
                {activeDropdown === "about" && (
                  <div className="absolute top-full left-0 w-64 bg-black border-l-4 border-[#D4AF37] shadow-lg z-50">
                    {aboutDropdownItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block px-6 py-3 text-white hover:text-[#D4AF37] hover:bg-gray-900 transition-colors text-sm tracking-wide border-b border-gray-800 last:border-b-0"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Properties Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setActiveDropdown("properties")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href="/listings"
                  className="flex items-center text-white hover:text-[#D4AF37] transition-colors text-sm font-medium tracking-wide"
                >
                  PROPERTIES
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Link>
                {activeDropdown === "properties" && (
                  <div className="absolute top-full left-0 w-64 bg-black border-l-4 border-[#D4AF37] shadow-lg z-50">
                    {propertiesDropdownItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block px-6 py-3 text-white hover:text-[#D4AF37] hover:bg-gray-900 transition-colors text-sm tracking-wide border-b border-gray-800 last:border-b-0"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>



              <Link
                href="/contact"
                className="text-white hover:text-[#D4AF37] transition-colors text-sm font-medium tracking-wide"
              >
                CONTACT
              </Link>

              <Link
                href="/idx"
                className="text-white hover:text-[#D4AF37] transition-colors text-sm font-medium tracking-wide"
              >
                MLS SEARCH
              </Link>

              <Link
                href="/new-developments"
                className="text-white hover:text-[#D4AF37] transition-colors text-sm font-medium tracking-wide"
              >
                NEW DEVELOPMENTS
              </Link>

              <Link
                href="/real-estate-insights"
                className="text-white hover:text-[#D4AF37] transition-colors text-sm font-medium tracking-wide"
              >
                REAL ESTATE INSIGHTS
              </Link>
            </nav>

            {/* Contact Info & Menu */}
            <div className="hidden lg:flex items-center space-x-6">
              <button className="flex flex-col items-center justify-center p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <span className="w-6 h-0.5 bg-white"></span>
                <span className="w-6 h-0.5 bg-white mt-1"></span>
                <span className="w-6 h-0.5 bg-white mt-1"></span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden flex flex-col items-center justify-center p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <span className="w-6 h-0.5 bg-white"></span>
              <span className="w-6 h-0.5 bg-white mt-1"></span>
              <span className="w-6 h-0.5 bg-white mt-1"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Overlay Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex overflow-y-auto">
          <div className="w-full max-w-4xl mx-auto flex flex-col lg:flex-row">
            {/* Close Button */}
            <button
              className="absolute top-4 sm:top-8 right-4 sm:right-8 text-white hover:text-[#D4AF37] z-60"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Logo in Menu */}
            <div className="absolute top-4 sm:top-8 left-4 sm:left-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 relative">
                <Image
                  src="/logo.png.png"
                  alt="Homes of Hollywood Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Menu Content */}
            <div className="flex flex-col lg:flex-row w-full pt-24 sm:pt-32">
              {/* Main Navigation Items */}
              <div className="flex-1 px-4 sm:px-8">
                <div className="space-y-6 sm:space-y-8">
                  <Link
                    href="/about"
                    className="block text-[#D4AF37] text-xl sm:text-2xl font-bold tracking-wider hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    ABOUT
                  </Link>
                  
                  <Link
                    href="/listings"
                    className="block text-[#D4AF37] text-xl sm:text-2xl font-bold tracking-wider hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    PROPERTIES
                  </Link>
                  

                  
                  <Link
                    href="/contact"
                    className="block text-[#D4AF37] text-xl sm:text-2xl font-bold tracking-wider hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    CONTACT
                  </Link>
                  
                  <Link
                    href="/idx"
                    className="block text-[#D4AF37] text-xl sm:text-2xl font-bold tracking-wider hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    MLS SEARCH
                  </Link>
                  
                  <Link
                    href="/new-developments"
                    className="block text-[#D4AF37] text-xl sm:text-2xl font-bold tracking-wider hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    NEW DEVELOPMENTS
                  </Link>
                  
                  <Link
                    href="/real-estate-insights"
                    className="block text-[#D4AF37] text-xl sm:text-2xl font-bold tracking-wider hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    REAL ESTATE INSIGHTS
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
