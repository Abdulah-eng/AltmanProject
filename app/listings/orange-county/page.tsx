import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bed, Bath, Square, MapPin, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function OrangeCountyListingsPage() {
  const properties = [
    {
      id: "3",
      title: "Newport Beach Oceanfront",
      price: 18500000,
      address: "Newport Beach, CA 92660",
      bedrooms: 6,
      bathrooms: 8,
      square_feet: 7200,
      image: "/placeholder.svg?height=400&width=600&text=Newport Beach Oceanfront",
      status: "FOR SALE",
    },
    {
      id: "4",
      title: "Laguna Beach Villa",
      price: 9750000,
      address: "Laguna Beach, CA 92651",
      bedrooms: 4,
      bathrooms: 5,
      square_feet: 5100,
      image: "/placeholder.svg?height=400&width=600&text=Laguna Beach Villa",
      status: "FOR SALE",
    },
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=800&width=1600&text=Orange County Coast"
            alt="Orange County Real Estate"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="absolute top-32 left-8 z-10 text-white text-sm tracking-wide">
          <Link href="/" className="hover:text-[#D4AF37]">
            HOME
          </Link>
          <span className="mx-2">{">"}</span>
          <Link href="/listings" className="hover:text-[#D4AF37]">
            LISTINGS
          </Link>
          <span className="mx-2">{">"}</span>
          <span>ORANGE COUNTY</span>
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <div className="text-[#D4AF37] text-lg tracking-[0.3em] mb-4">ORANGE COUNTY</div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-wider mb-8">
              <span className="border-l-4 border-[#D4AF37] pl-8">LISTINGS</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 tracking-wide">ORANGE COUNTY PROPERTIES</h2>
            <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Explore stunning coastal properties in Orange County, from Newport Beach to Laguna Beach.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <Card
                key={property.id}
                className="bg-gray-900 border-gray-800 hover:border-[#D4AF37] transition-all duration-300 group overflow-hidden"
              >
                <div className="relative">
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-[#D4AF37] text-black">{property.status}</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>

                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-[#D4AF37] mb-2">{formatPrice(property.price)}</div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {property.title}
                  </h3>
                  <div className="flex items-center text-gray-400 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{property.address}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      <span>{property.bedrooms} BD</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="w-4 h-4 mr-1" />
                      <span>{property.bathrooms} BA</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="w-4 h-4 mr-1" />
                      <span>{property.square_feet?.toLocaleString()} SQFT</span>
                    </div>
                  </div>
                  <Button
                    asChild
                    className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold tracking-wide"
                  >
                    <Link href={`/listings/${property.id}`}>VIEW DETAILS</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
