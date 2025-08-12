"use client"

import { useState, useEffect } from "react"
import { Calculator, Calendar, DollarSign, Percent, Home, Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MortgageCalculation {
  monthlyPayment: number
  principalInterest: number
  propertyTax: number
  homeInsurance: number
  loanAmount: number
  totalInterest: number
  totalPayment: number
}

export default function MortgageCalculatorPage() {
  const [homePrice, setHomePrice] = useState(1000000)
  const [downPaymentPercent, setDownPaymentPercent] = useState(20)
  const [downPaymentAmount, setDownPaymentAmount] = useState(200000)
  const [loanTerm, setLoanTerm] = useState(30)
  const [interestRate, setInterestRate] = useState(7.5)
  const [propertyTax, setPropertyTax] = useState(12000)
  const [homeInsurance, setHomeInsurance] = useState(2400)
  const [calculation, setCalculation] = useState<MortgageCalculation>({
    monthlyPayment: 0,
    principalInterest: 0,
    propertyTax: 0,
    homeInsurance: 0,
    loanAmount: 0,
    totalInterest: 0,
    totalPayment: 0
  })

  // Calculate mortgage when inputs change
  useEffect(() => {
    calculateMortgage()
  }, [homePrice, downPaymentAmount, loanTerm, interestRate, propertyTax, homeInsurance])

  // Update down payment amount when percentage changes
  useEffect(() => {
    const newAmount = (homePrice * downPaymentPercent) / 100
    setDownPaymentAmount(Math.round(newAmount))
  }, [homePrice, downPaymentPercent])

  // Update down payment percentage when amount changes
  useEffect(() => {
    const newPercent = (downPaymentAmount / homePrice) * 100
    setDownPaymentPercent(Math.round(newPercent * 100) / 100)
  }, [downPaymentAmount, homePrice])

  const calculateMortgage = () => {
    const loanAmount = homePrice - downPaymentAmount
    const monthlyInterestRate = interestRate / 100 / 12
    const numberOfPayments = loanTerm * 12

    // Calculate monthly principal and interest
    let monthlyPrincipalInterest = 0
    if (monthlyInterestRate > 0) {
      monthlyPrincipalInterest = loanAmount * 
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)
    } else {
      monthlyPrincipalInterest = loanAmount / numberOfPayments
    }

    // Calculate monthly property tax and insurance
    const monthlyPropertyTax = propertyTax / 12
    const monthlyHomeInsurance = homeInsurance / 12

    // Calculate total monthly payment
    const monthlyPayment = monthlyPrincipalInterest + monthlyPropertyTax + monthlyHomeInsurance

    // Calculate total interest and payment over loan term
    const totalInterest = (monthlyPrincipalInterest * numberOfPayments) - loanAmount
    const totalPayment = monthlyPayment * numberOfPayments

    setCalculation({
      monthlyPayment: Math.round(monthlyPayment),
      principalInterest: Math.round(monthlyPrincipalInterest),
      propertyTax: Math.round(monthlyPropertyTax),
      homeInsurance: Math.round(monthlyHomeInsurance),
      loanAmount,
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment)
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Button variant="ghost" asChild className="mb-8 text-[#D4AF37] hover:text-white hover:bg-[#D4AF37]/10 transition-all duration-300">
              <Link href="/"><ArrowLeft className="w-4 h-4 mr-2" />Back to Home</Link>
            </Button>
            <div className="animate-fade-in-up">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-wide">MORTGAGE CALCULATOR</h1>
              <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Calculate your monthly mortgage payments for luxury properties in Los Angeles. 
                Get accurate estimates including principal, interest, taxes, insurance, and PMI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Side - Calculator Inputs */}
              <div className="animate-fade-in-up">
                <Card className="bg-gray-900 border-gray-800 shadow-2xl">
                  <CardHeader className="border-b border-gray-800">
                    <CardTitle className="flex items-center gap-3 text-xl font-bold text-white">
                      <Calculator className="w-6 h-6 text-[#D4AF37]" />
                      Mortgage Calculator
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    {/* Home Price */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Home Price</label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <Input
                          type="number"
                          value={homePrice.toLocaleString()}
                          onChange={(e) => setHomePrice(Number(e.target.value.replace(/,/g, '')))}
                          className="pl-10 bg-gray-800 border-gray-700 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                          placeholder="1000000"
                        />
                      </div>
                    </div>

                    {/* Down Payment */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Down Payment ({downPaymentPercent}%)
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <Input
                          type="number"
                          value={downPaymentAmount.toLocaleString()}
                          onChange={(e) => setDownPaymentAmount(Number(e.target.value.replace(/,/g, '')))}
                          className="pl-10 bg-gray-800 border-gray-700 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                          placeholder="200000"
                        />
                      </div>
                    </div>

                    {/* Loan Term */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Loan Term</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <Select value={loanTerm.toString()} onValueChange={(value) => setLoanTerm(Number(value))}>
                          <SelectTrigger className="pl-10 bg-gray-800 border-gray-700 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="15">15 years</SelectItem>
                            <SelectItem value="20">20 years</SelectItem>
                            <SelectItem value="30">30 years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Interest Rate */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Interest Rate</label>
                      <div className="relative">
                        <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <Input
                          type="number"
                          step="0.1"
                          value={interestRate}
                          onChange={(e) => setInterestRate(Number(e.target.value))}
                          className="pl-10 bg-gray-800 border-gray-700 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                          placeholder="7.5"
                        />
                      </div>
                    </div>

                    {/* Property Tax */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Property Tax (Annual)</label>
                      <div className="relative">
                        <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <Input
                          type="number"
                          value={propertyTax.toLocaleString()}
                          onChange={(e) => setPropertyTax(Number(e.target.value.replace(/,/g, '')))}
                          className="pl-10 bg-gray-800 border-gray-700 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                          placeholder="12000"
                        />
                      </div>
                    </div>

                    {/* Home Insurance */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Home Insurance (Annual)</label>
                      <div className="relative">
                        <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <Input
                          type="number"
                          value={homeInsurance.toLocaleString()}
                          onChange={(e) => setHomeInsurance(Number(e.target.value.replace(/,/g, '')))}
                          className="pl-10 bg-gray-800 border-gray-700 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                          placeholder="2400"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Side - Results */}
              <div className="animate-fade-in-up animate-stagger-1">
                <div className="space-y-6">
                  {/* Monthly Payment */}
                  <Card className="bg-gray-900 border border-[#D4AF37] shadow-2xl">
                    <CardContent className="p-8 text-center">
                      <h3 className="text-lg font-bold text-[#D4AF37] mb-4">Monthly Payment</h3>
                      <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                        {formatCurrency(calculation.monthlyPayment)}
                      </div>
                      <p className="text-sm text-gray-400">
                        Principal, Interest, Taxes & Insurance
                      </p>
                    </CardContent>
                  </Card>

                  {/* Payment Breakdown */}
                  <Card className="bg-gray-900 border-gray-800 shadow-2xl">
                    <CardHeader className="border-b border-gray-800">
                      <CardTitle className="text-lg font-bold text-white">Payment Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Principal & Interest</span>
                        <span className="text-white font-semibold">{formatCurrency(calculation.principalInterest)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Property Taxes</span>
                        <span className="text-white font-semibold">{formatCurrency(calculation.propertyTax)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Home Insurance</span>
                        <span className="text-white font-semibold">{formatCurrency(calculation.homeInsurance)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Loan Summary */}
                  <Card className="bg-gray-900 border-gray-800 shadow-2xl">
                    <CardHeader className="border-b border-gray-800">
                      <CardTitle className="text-lg font-bold text-white">Loan Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Loan Amount</span>
                        <span className="text-white font-semibold">{formatCurrency(calculation.loanAmount)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Total Interest</span>
                        <span className="text-white font-semibold">{formatCurrency(calculation.totalInterest)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Total Payment</span>
                        <span className="text-white font-semibold">{formatCurrency(calculation.totalPayment)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Call to Action */}
                  <Card className="bg-gray-900 border border-[#D4AF37] shadow-2xl">
                    <CardContent className="p-6 text-center">
                      <p className="text-lg font-bold text-white mb-2">Ready to get pre-approved?</p>
                      <p className="text-gray-300 mb-4">Contact Don Adams for personalized financing options.</p>
                      <Button className="w-full bg-[#D4AF37] text-black hover:bg-[#B8941F] transition-all duration-300 font-bold">
                        GET PRE-APPROVED
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financing Help Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Need Help with Financing?</h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Don Adams works with top lenders to secure the best rates and terms for luxury properties.
              </p>
              <p className="text-lg text-gray-300 mb-12 leading-relaxed">
                Get personalized financing options tailored to your situation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-[#D4AF37] text-black hover:bg-[#B8941F] transition-all duration-300 font-bold px-8 py-3">
                  SPEAK WITH A LENDER
                </Button>
                <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 font-bold px-8 py-3">
                  VIEW FINANCING PROGRAMS
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
