"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, X, Bot, User, Mail, Phone, User as UserIcon, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

interface LeadInfo {
  name?: string
  email?: string
  phone?: string
  interest?: string
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your luxury real estate AI assistant. I can help you discover exclusive properties, schedule viewings, and provide personalized guidance for your real estate journey. How may I assist you today?",
      sender: "bot",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [leadInfo, setLeadInfo] = useState<LeadInfo>({})
  const [isCollectingInfo, setIsCollectingInfo] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight
      }
    }, 100)
  }

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom()
    }
  }, [messages])

  useEffect(() => {
    if (isLoading) {
      scrollToBottom()
    }
  }, [isLoading])

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [isOpen])

  const extractLeadInfo = (content: string): LeadInfo => {
    const info: LeadInfo = {}
    
    // Extract email
    const emailMatch = content.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/)
    if (emailMatch) info.email = emailMatch[0]
    
    // Extract phone
    const phoneMatch = content.match(/(\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/)
    if (phoneMatch) info.phone = phoneMatch[0]
    
    // Extract name (simple pattern)
    const nameMatch = content.match(/my name is (\w+)/i) || content.match(/i'm (\w+)/i) || content.match(/i am (\w+)/i)
    if (nameMatch) info.name = nameMatch[1]
    
    return info
  }

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      // Extract potential lead information
      const extractedInfo = extractLeadInfo(inputValue)
      if (Object.keys(extractedInfo).length > 0) {
        setLeadInfo(prev => ({ ...prev, ...extractedInfo }))
      }

      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputValue,
          conversationHistory: messages.map(m => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.content
          })),
          leadInfo: { ...leadInfo, ...extractedInfo }
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: "bot",
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])

      // Check if we should collect more information
      if (data.shouldCollectInfo && !isCollectingInfo) {
        setIsCollectingInfo(true)
        const infoMessage: Message = {
          id: (Date.now() + 2).toString(),
          content: "I'd love to provide you with more personalized assistance! Could you share your name and email address so I can better serve your luxury real estate needs?",
          sender: "bot",
          timestamp: new Date()
        }
        setMessages(prev => [...prev, infoMessage])
      }

    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm experiencing a temporary connection issue. Please try again in a moment or contact our team directly for immediate assistance.",
        sender: "bot",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full shadow-2xl bg-[#D4AF37] hover:bg-[#B8941F] transition-all duration-300 hover:scale-110 border-2 border-white/20"
        size="icon"
      >
        <div className="relative">
          <MessageCircle className="h-7 w-7 text-black" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        </div>
      </Button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <Card className="relative w-full max-w-md h-[700px] flex flex-col shadow-2xl bg-gray-900 border-gray-800 animate-fade-in-up">
            <CardHeader className="flex-shrink-0 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-black rounded-t-lg border-b border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-black/20 rounded-full flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold tracking-wide">LUXURY AI ASSISTANT</CardTitle>
                    <p className="text-xs text-black/80 tracking-wide">Homes of Hollywood</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-black hover:bg-black/20 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0 bg-gray-900">
              <div 
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto p-4 min-h-0" 
                style={{ 
                  scrollbarWidth: 'thin', 
                  scrollbarColor: '#D4AF37 #1f2937',
                  maxHeight: 'calc(700px - 200px)',
                  overflowY: 'scroll'
                }}
              >
                <div className="space-y-4 pb-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex gap-3 animate-fade-in-up",
                        message.sender === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      {message.sender === "bot" && (
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center shadow-lg">
                          <Sparkles className="h-5 w-5 text-black" />
                        </div>
                      )}
                      <div
                        className={cn(
                          "max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-lg transition-all duration-300",
                          message.sender === "user"
                            ? "bg-[#D4AF37] text-black"
                            : "bg-gray-800 text-white border border-gray-700"
                        )}
                      >
                        <p className="whitespace-pre-wrap leading-relaxed">
                          {message.content.split(' ').map((word, index) => {
                            if (word.startsWith('/contact') || word.includes('/contact')) {
                              return (
                                <a
                                  key={index}
                                  href="/contact"
                                  className="text-[#D4AF37] hover:text-[#B8941F] underline font-medium"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {word}
                                </a>
                              )
                            }
                            return word + ' '
                          })}
                        </p>
                        <p className={cn(
                          "text-xs mt-2 font-medium",
                          message.sender === "user" ? "text-black/70" : "text-gray-400"
                        )}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                      {message.sender === "user" && (
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-700 border-2 border-[#D4AF37] flex items-center justify-center shadow-lg">
                          <User className="h-5 w-5 text-[#D4AF37]" />
                        </div>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3 justify-start animate-fade-in-up">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center shadow-lg">
                        <Sparkles className="h-5 w-5 text-black" />
                      </div>
                      <div className="bg-gray-800 border border-gray-700 rounded-2xl px-4 py-3 shadow-lg">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                          <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">AI is thinking...</p>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Lead Info Display */}
              {Object.keys(leadInfo).length > 0 && (
                <div className="border-t border-gray-800 p-4 bg-gray-800/50">
                  <p className="text-xs text-[#D4AF37] font-bold tracking-wide mb-3">COLLECTED INFORMATION:</p>
                  <div className="flex flex-wrap gap-2">
                    {leadInfo.name && (
                      <Badge className="text-xs bg-[#D4AF37] text-black hover:bg-[#B8941F] border-0">
                        <UserIcon className="h-3 w-3 mr-1" />
                        {leadInfo.name}
                      </Badge>
                    )}
                    {leadInfo.email && (
                      <Badge className="text-xs bg-[#D4AF37] text-black hover:bg-[#B8941F] border-0">
                        <Mail className="h-3 w-3 mr-1" />
                        {leadInfo.email}
                      </Badge>
                    )}
                    {leadInfo.phone && (
                      <Badge className="text-xs bg-[#D4AF37] text-black hover:bg-[#B8941F] border-0">
                        <Phone className="h-3 w-3 mr-1" />
                        {leadInfo.phone}
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="border-t border-gray-800 p-4 flex-shrink-0 bg-gray-900">
                <div className="flex gap-3">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your luxury real estate inquiry..."
                    className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-[#D4AF37] focus:ring-[#D4AF37] transition-all duration-300 rounded-xl"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    size="icon"
                    className="bg-[#D4AF37] hover:bg-[#B8941F] text-black transition-all duration-300 rounded-xl shadow-lg hover:scale-105"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Your luxury real estate journey starts here
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
} 