import { HeroSection } from "@/components/hero-section"
import { PropertyCarousel } from "@/components/property-carousel"
import { AboutSection } from "@/components/about-section"
import { FeaturedProperties } from "@/components/featured-properties"
import { WildfireSupport } from "@/components/wildfire-support"
import { PropertyManagementServices } from "@/components/property-management-services"
import { MortgageCalculatorSection } from "@/components/mortgage-calculator-section"
import { PropertyComparisonSection } from "@/components/property-comparison-section"
import { PremierNeighborhoodsSection } from "@/components/premier-neighborhoods-section"
import { NeighborhoodCTASection } from "@/components/neighborhood-cta-section"
import { NewDevelopmentsSection } from "@/components/new-developments-section"
import { AboutDonAdamsSection } from "@/components/about-don-adams-section"
import { WhyChooseDonAdamsSection } from "@/components/why-choose-don-adams-section"
import { SpecialOffersSection } from "@/components/special-offers-section"
import { StatsSection } from "@/components/stats-section"
import { ServicesSection } from "@/components/services-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ClientExperiencesSection } from "@/components/client-experiences-section"
import { SocialSection } from "@/components/social-section"
import { TeamSection } from "@/components/team-section"
import { VideoSection } from "@/components/video-section"
import { BlogSection } from "@/components/blog-section"
import { ContactSection } from "@/components/contact-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AIChatbot } from "@/components/ai-chatbot"
import { createServerClient } from "@/lib/supabase/server"

export default async function HomePage() {
  let heroData = null
  let blogs = null
  let testimonials = null

  try {
    const supabase = await createServerClient()

    // Try to fetch data, but don't fail if Supabase isn't configured
    const heroResult = await supabase.from("hero_content").select("*").single()
    heroData = heroResult.data

    const blogsResult = await supabase
      .from("blogs")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(3)
    blogs = blogsResult.data

    const testimonialsResult = await supabase
      .from("testimonials")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
    testimonials = testimonialsResult.data
  } catch (error) {
    console.log("Database not configured, using default data")
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection data={heroData} />
        <PropertyCarousel />
        <AboutSection />
        <FeaturedProperties />
        <WildfireSupport />
        <PropertyManagementServices />
        <MortgageCalculatorSection />
        <PropertyComparisonSection />
        <PremierNeighborhoodsSection />
        <NeighborhoodCTASection />
        <NewDevelopmentsSection />
        <AboutDonAdamsSection />
        <WhyChooseDonAdamsSection />
        <SpecialOffersSection />
        <StatsSection />
        <ServicesSection />
        <TestimonialsSection testimonials={testimonials} />
        <ClientExperiencesSection />
        <SocialSection />
        <TeamSection />
        <VideoSection />
        <BlogSection blogs={blogs} />
        <ContactSection />
      </main>
      <Footer />
      <AIChatbot />
    </div>
  )
}
