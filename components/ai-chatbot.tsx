"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, X, Bot, User, Mail, Phone, User as UserIcon } from "lucide-react"
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
      content: "Hi! I'm your AI assistant. I can help you with information about our real estate services, properties, and more. How can I assist you today?",
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
          content: "I'd love to help you better! Could you share your name and email address so I can provide more personalized assistance?",
          sender: "bot",
          timestamp: new Date()
        }
        setMessages(prev => [...prev, infoMessage])
      }

    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment or contact us directly.",
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
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4">
          <div className="absolute inset-0 bg-black/20" onClick={() => setIsOpen(false)} />
          <Card className="relative w-full max-w-md h-[700px] flex flex-col shadow-2xl">
            <CardHeader className="flex-shrink-0 bg-blue-600 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  <CardTitle className="text-lg">AI Assistant</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-blue-700"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-blue-100">Ask me anything about our services!</p>
            </CardHeader>

                         <CardContent className="flex-1 flex flex-col p-0">
               <div 
                 ref={scrollContainerRef}
                 className="flex-1 overflow-y-auto p-4 min-h-0" 
                 style={{ 
                   scrollbarWidth: 'thin', 
                   scrollbarColor: '#d1d5db #f3f4f6',
                   maxHeight: 'calc(700px - 200px)', // Account for header and input area
                   overflowY: 'scroll'
                 }}
               >
                 <div className="space-y-4 pb-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex gap-3",
                        message.sender === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      {message.sender === "bot" && (
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <Bot className="h-4 w-4 text-blue-600" />
                        </div>
                      )}
                      <div
                        className={cn(
                          "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                          message.sender === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-900"
                        )}
                      >
                        <p className="whitespace-pre-wrap">
                          {message.content.split(' ').map((word, index) => {
                            if (word.startsWith('/contact') || word.includes('/contact')) {
                              return (
                                <a
                                  key={index}
                                  href="/contact"
                                  className="text-blue-600 hover:text-blue-800 underline"
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
                          "text-xs mt-1",
                          message.sender === "user" ? "text-blue-100" : "text-gray-500"
                        )}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                      {message.sender === "user" && (
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <User className="h-4 w-4 text-gray-600" />
                        </div>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="bg-gray-100 rounded-lg px-3 py-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Lead Info Display */}
              {Object.keys(leadInfo).length > 0 && (
                <div className="border-t p-3 bg-blue-50">
                  <p className="text-xs text-gray-600 mb-2">Collected Information:</p>
                  <div className="flex flex-wrap gap-2">
                    {leadInfo.name && (
                      <Badge variant="secondary" className="text-xs">
                        <UserIcon className="h-3 w-3 mr-1" />
                        {leadInfo.name}
                      </Badge>
                    )}
                    {leadInfo.email && (
                      <Badge variant="secondary" className="text-xs">
                        <Mail className="h-3 w-3 mr-1" />
                        {leadInfo.email}
                      </Badge>
                    )}
                    {leadInfo.phone && (
                      <Badge variant="secondary" className="text-xs">
                        <Phone className="h-3 w-3 mr-1" />
                        {leadInfo.phone}
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="border-t p-4 flex-shrink-0">
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    size="icon"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
         </>
   )
 } 