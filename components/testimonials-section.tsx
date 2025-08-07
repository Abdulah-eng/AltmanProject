import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"

interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
  image_url?: string
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[] | null
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const defaultTestimonials = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Beverly Hills Homeowner",
      content:
        "Homes of Hollywood delivered an exceptional experience from start to finish. Their expertise in luxury markets is unmatched.",
      rating: 5,
      image_url: "/placeholder.svg?height=80&width=80&text=SJ",
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "Luxury Property Investor",
      content:
        "Outstanding service and market knowledge. They helped me build a profitable luxury real estate portfolio.",
      rating: 5,
      image_url: "/placeholder.svg?height=80&width=80&text=MC",
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      role: "Malibu Property Seller",
      content:
        "Sold our oceanfront property above asking price in record time. Their marketing strategy is exceptional.",
      rating: 5,
      image_url: "/placeholder.svg?height=80&width=80&text=ER",
    },
  ]

  const displayTestimonials = testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="text-[#D4AF37] text-sm tracking-[0.3em] mb-4">TESTIMONIALS</div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-wide">CLIENT EXPERIENCES</h2>
          <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover what our luxury real estate clients have to say about their exceptional experience with Homes of Hollywood.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayTestimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="bg-gray-900 border-gray-800 hover:border-[#D4AF37] transition-all duration-300"
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#D4AF37] fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-8 italic leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <Image
                    src={testimonial.image_url || "/placeholder.svg?height=50&width=50"}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-[#D4AF37]">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
