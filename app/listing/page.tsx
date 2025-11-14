import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Script from "next/script"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Property Listing",
  description: "Photos and Property Details. Get complete property information, maps, street view, schools, walk score and more. Request additional information, schedule a showing, save to your property organizer.",
  openGraph: {
    images: [
      {
        url: "",
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function ListingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg overflow-hidden shadow-xl">
          <Script src="https://www.themls.com/IDXNET/Scripts/idxwidget.js" strategy="afterInteractive" />
          <Script id="idx-listing" strategy="afterInteractive">
            {`document.currentScript.replaceWith(ihfKestrel.render());`}
          </Script>
        </div>
      </main>
      <Footer />
    </div>
  )
}

