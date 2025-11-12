import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Script from "next/script"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mortgage Calculator",
  description: "",
}

export default function MortgageCalculatorPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide mb-6 text-center">Mortgage Calculator</h1>
        <p className="text-gray-300 text-center max-w-3xl mx-auto mb-10">
          Estimate your monthly payments and explore financing options using the interactive mortgage calculator.
        </p>
        <div className="bg-white rounded-lg overflow-hidden shadow-xl">
          <Script src="https://www.themls.com/IDXNET/Scripts/idxwidget.js" strategy="afterInteractive" />
          <Script id="idx-mortgage-calculator" strategy="afterInteractive">
            {`document.currentScript.replaceWith(ihfKestrel.render());`}
          </Script>
        </div>
      </main>
      <Footer />
    </div>
  )
}


