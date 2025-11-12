import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Script from "next/script"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Open Homes",
  description: "",
}

export default function OpenHomeListingsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide mb-6 text-center">Open Homes</h1>
        <p className="text-gray-300 text-center max-w-3xl mx-auto mb-10">
          Browse current open homes and schedule your visit to experience these properties in person.
        </p>
        <div className="bg-white rounded-lg overflow-hidden shadow-xl">
          <Script src="https://www.themls.com/IDXNET/Scripts/idxwidget.js" strategy="afterInteractive" />
          <Script id="idx-open-home-listings" strategy="afterInteractive">
            {`document.currentScript.replaceWith(ihfKestrel.render());`}
          </Script>
        </div>
      </main>
      <Footer />
    </div>
  )
}


