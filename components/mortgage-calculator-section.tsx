"use client"

import { useState } from "react"
import { Calculator, Calendar, DollarSign, Percent } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function MortgageCalculatorSection() {
  const [homePrice, setHomePrice] = useState("1000000")
  const [downPayment, setDownPayment] = useState("200000")
  const [loanTerm, setLoanTerm] = useState("30")
  const [interestRate, setInterestRate] = useState("7.5")
  const [propertyTax, setPropertyTax] = useState("12000")
  const [homeInsurance, setHomeInsurance] = useState("2400")

  // Calculate mortgage payment
  const calculatePayment = () => {
    const principal = parseFloat(homePrice) - parseFloat(downPayment)
    const monthlyRate = parseFloat(interestRate) / 100 / 12
    const numberOfPayments = parseInt(loanTerm) * 12

    if (monthlyRate === 0) return 0

    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    const monthlyTax = parseFloat(propertyTax) / 12
    const monthlyInsurance = parseFloat(homeInsurance) / 12

    return monthlyPayment + monthlyTax + monthlyInsurance
  }

  const calculatePrincipalInterest = () => {
    const principal = parseFloat(homePrice) - parseFloat(downPayment)
    const monthlyRate = parseFloat(interestRate) / 100 / 12
    const numberOfPayments = parseInt(loanTerm) * 12

    if (monthlyRate === 0) return 0

    return principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
  }

  const calculateTotalInterest = () => {
    const principal = parseFloat(homePrice) - parseFloat(downPayment)
    const monthlyPayment = calculatePrincipalInterest()
    const numberOfPayments = parseInt(loanTerm) * 12

    return (monthlyPayment * numberOfPayments) - principal
  }

  const monthlyPayment = calculatePayment()
  const principalInterest = calculatePrincipalInterest()
  const totalInterest = calculateTotalInterest()
  const totalPayment = (principalInterest * parseInt(loanTerm) * 12) + parseFloat(propertyTax) + parseFloat(homeInsurance)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-wide">
              CALCULATE YOUR PAYMENTS
            </h2>
            <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Get an accurate estimate of your monthly mortgage payments for luxury Los Angeles properties.
            </p>
          </div>

          {/* Mortgage Calculator */}
          <div className="animate-fade-in-up animate-stagger-1">
            <Card className="bg-gray-800 border-gray-700 shadow-2xl">
              <CardContent className="p-8">
                {/* Calculator Header */}
                <div className="flex items-center gap-3 mb-8">
                  <Calculator className="w-6 h-6 text-[#D4AF37]" />
                  <h3 className="text-xl font-bold text-white">Mortgage Calculator</h3>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left Column - Input Fields */}
                  <div className="space-y-6">
                    {/* Home Price */}
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Home Price</label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          type="number"
                          value={homePrice}
                          onChange={(e) => setHomePrice(e.target.value)}
                          className="pl-10 bg-gray-900 border-gray-600 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                          placeholder="1000000"
                        />
                      </div>
                    </div>

                    {/* Down Payment */}
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Down Payment (20.0%)</label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          type="number"
                          value={downPayment}
                          onChange={(e) => setDownPayment(e.target.value)}
                          className="pl-10 bg-gray-900 border-gray-600 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                          placeholder="200000"
                        />
                      </div>
                    </div>

                    {/* Loan Term and Interest Rate */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white text-sm font-medium mb-2">Loan Term</label>
                        <Select value={loanTerm} onValueChange={setLoanTerm}>
                          <SelectTrigger className="bg-gray-900 border-gray-600 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-gray-600">
                            <SelectItem value="15">15 years</SelectItem>
                            <SelectItem value="20">20 years</SelectItem>
                            <SelectItem value="30">30 years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-white text-sm font-medium mb-2">Interest Rate</label>
                        <div className="relative">
                          <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            type="number"
                            step="0.1"
                            value={interestRate}
                            onChange={(e) => setInterestRate(e.target.value)}
                            className="pl-10 bg-gray-900 border-gray-600 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                            placeholder="7.5"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Property Tax and Insurance */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white text-sm font-medium mb-2">Property Tax (Annual)</label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            type="number"
                            value={propertyTax}
                            onChange={(e) => setPropertyTax(e.target.value)}
                            className="pl-10 bg-gray-900 border-gray-600 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                            placeholder="12000"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-white text-sm font-medium mb-2">Home Insurance (Annual)</label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            type="number"
                            value={homeInsurance}
                            onChange={(e) => setHomeInsurance(e.target.value)}
                            className="pl-10 bg-gray-900 border-gray-600 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                            placeholder="2400"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Results */}
                  <div className="space-y-6">
                    {/* Monthly Payment */}
                    <div className="border-2 border-[#D4AF37] rounded-lg p-6 bg-gray-900">
                      <h4 className="text-[#D4AF37] font-bold text-lg mb-2">Monthly Payment</h4>
                      <div className="text-3xl font-bold text-white mb-2">{formatCurrency(monthlyPayment)}</div>
                      <p className="text-gray-400 text-sm">Principal, Interest, Taxes & Insurance</p>
                    </div>

                    {/* Payment Breakdown */}
                    <div className="bg-gray-900 rounded-lg p-6">
                      <h4 className="text-white font-bold text-lg mb-4">Payment Breakdown</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Principal & Interest</span>
                          <span className="text-white font-semibold">{formatCurrency(principalInterest)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Property Taxes</span>
                          <span className="text-white font-semibold">{formatCurrency(parseFloat(propertyTax) / 12)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Home Insurance</span>
                          <span className="text-white font-semibold">{formatCurrency(parseFloat(homeInsurance) / 12)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Loan Summary */}
                    <div className="bg-gray-900 rounded-lg p-6">
                      <h4 className="text-white font-bold text-lg mb-4">Loan Summary</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Loan Amount</span>
                          <span className="text-white font-semibold">{formatCurrency(parseFloat(homePrice) - parseFloat(downPayment))}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Total Interest</span>
                          <span className="text-white font-semibold">{formatCurrency(totalInterest)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Total Payment</span>
                          <span className="text-white font-semibold">{formatCurrency(totalPayment)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="mt-12 border-2 border-[#D4AF37] rounded-lg p-8 bg-gray-900">
                  <div className="text-center">
                    <h4 className="text-2xl font-bold text-white mb-4">Ready to get pre-approved?</h4>
                    <p className="text-gray-300 mb-6">Contact Don Adams for personalized financing options.</p>
                    <Button className="bg-[#D4AF37] text-black hover:bg-[#B8941F] transition-all duration-300 font-bold px-8 py-4 text-lg">
                      GET PRE-APPROVED
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
