import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

const GEMINI_API_KEY = "AIzaSyCtDcvS52F1abkHn0GwVgZTf0bZT5JQ9xU"
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"

interface ConversationMessage {
  role: "user" | "assistant"
  content: string
}

interface LeadInfo {
  name?: string
  email?: string
  phone?: string
  interest?: string
}

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory, leadInfo } = await request.json()

    // Create the system prompt for the AI
    const systemPrompt = `You are an AI assistant for a real estate company. Your role is to:

1. Help potential clients with information about real estate services, properties, and the company
2. Answer questions about buying, selling, or renting properties
3. Provide information about the company's services, team, and expertise
4. Collect lead information (name, email, phone) naturally during conversations
5. Be friendly, professional, and helpful
6. Encourage engagement and provide value

Company Information:
- Real estate services including buying, selling, and property management
- Professional team with expertise in the local market
- Customer-focused approach with personalized service
- Available for consultations and property viewings

Important Guidelines:
- Always be helpful and informative
- If you don't have specific information, suggest contacting the company directly
- Naturally ask for contact information when appropriate (but don't be pushy)
- Provide relevant information about real estate processes
- Be conversational and engaging
- If someone shares contact information, acknowledge it warmly

SPECIAL INSTRUCTIONS FOR REQUIREMENTS AND APPOINTMENTS:
- When someone asks about providing requirements, property requirements, client requirements, or submitting requirements, direct them to the contact page
- When someone asks about booking appointments, scheduling consultations, setting up meetings, or making appointments, direct them to the contact page
- For these requests, respond with: "For submitting your requirements or booking appointments, please visit our contact page at [website]/contact. I'll be happy to assist you with a personalized consultation and help you with your specific needs."

Current lead information: ${JSON.stringify(leadInfo)}

Respond in a conversational, helpful manner. Keep responses concise but informative.`

    // Prepare the conversation for Gemini
    const messages = [
      {
        role: "user",
        parts: [{ text: systemPrompt }]
      },
      {
        role: "model",
        parts: [{ text: "I understand. I'm ready to help with real estate inquiries and provide excellent customer service while naturally collecting lead information when appropriate." }]
      }
    ]

    // Add conversation history
    conversationHistory.forEach((msg: ConversationMessage) => {
      messages.push({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }]
      })
    })

    // Add the current message
    messages.push({
      role: "user",
      parts: [{ text: message }]
    })

    // Call Gemini API
    console.log("Calling Gemini API with URL:", `${GEMINI_API_URL}?key=${GEMINI_API_KEY.substring(0, 10)}...`)
    console.log("Request body:", JSON.stringify({
      contents: messages,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      }
    }, null, 2))

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: messages,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        }
      })
    })

    console.log("Gemini API response status:", response.status)
    console.log("Gemini API response headers:", Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorText = await response.text()
      console.log("Gemini API error response:", errorText)
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error("Invalid response from Gemini API")
    }

    let aiResponse = data.candidates[0].content.parts[0].text

    // Check for requirements or appointment requests and provide specific response
    if (isRequirementsOrAppointmentRequest(message)) {
      aiResponse = "For submitting your requirements or booking appointments, please visit our contact page at /contact. I'll be happy to assist you with a personalized consultation and help you with your specific needs. You can also call us at 310.819.3250 or fill out the contact form for immediate assistance."
    }

    // Determine if we should collect more information
    const shouldCollectInfo = shouldRequestContactInfo(message, aiResponse, leadInfo)

    // Store lead information if provided
    if (Object.keys(leadInfo).length > 0) {
      try {
        const supabase = await createServerClient()
        
        // Check if lead already exists
        const { data: existingLead } = await supabase
          .from("chatbot_leads")
          .select("id")
          .eq("email", leadInfo.email)
          .single()

        if (!existingLead) {
          // Calculate lead score based on information completeness
          let leadScore = 0
          if (leadInfo.name) leadScore += 20
          if (leadInfo.email) leadScore += 30
          if (leadInfo.phone) leadScore += 25
          if (leadInfo.interest) leadScore += 25

          // Create conversation summary
          const conversationSummary = conversationHistory
            .slice(-5) // Last 5 messages
            .map(msg => `${msg.role}: ${msg.content}`)
            .join("\n")

          // Save to database
          await supabase.from("chatbot_leads").insert({
            name: leadInfo.name,
            email: leadInfo.email,
            phone: leadInfo.phone,
            interest: leadInfo.interest,
            conversation_summary: conversationSummary,
            lead_score: leadScore,
            ip_address: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip"),
            user_agent: request.headers.get("user-agent")
          })
        }
      } catch (error) {
        console.error("Error saving lead information:", error)
      }
    }

    return NextResponse.json({
      response: aiResponse,
      shouldCollectInfo,
      leadInfo
    })

  } catch (error) {
    console.error("Chatbot API error:", error)
    return NextResponse.json(
      {
        response: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment or contact us directly for assistance.",
        shouldCollectInfo: false,
        error: "Internal server error"
      },
      { status: 500 }
    )
  }
}

function isRequirementsOrAppointmentRequest(message: string): boolean {
  const requirementsKeywords = [
    "requirements", "requirement", "submit requirements", "provide requirements",
    "property requirements", "client requirements", "what are the requirements",
    "requirements for", "need requirements", "looking for requirements"
  ]
  
  const appointmentKeywords = [
    "appointment", "book appointment", "booking", "schedule", "scheduling",
    "consultation", "meeting", "set up meeting", "make appointment",
    "book consultation", "schedule consultation", "appointment with",
    "when can i book", "how to book", "booking process"
  ]
  
  const messageLower = message.toLowerCase()
  
  const hasRequirementsRequest = requirementsKeywords.some(keyword => 
    messageLower.includes(keyword)
  )
  
  const hasAppointmentRequest = appointmentKeywords.some(keyword => 
    messageLower.includes(keyword)
  )
  
  return hasRequirementsRequest || hasAppointmentRequest
}

function shouldRequestContactInfo(message: string, aiResponse: string, leadInfo: LeadInfo): boolean {
  // Check if we already have basic contact info
  const hasBasicInfo = leadInfo.email || leadInfo.phone || leadInfo.name
  
  // Check if the message indicates interest in services
  const interestKeywords = [
    "buy", "sell", "rent", "property", "house", "home", "real estate",
    "viewing", "consultation", "appointment", "price", "market",
    "interested", "looking", "searching", "help", "assist"
  ]
  
  const hasInterest = interestKeywords.some(keyword => 
    message.toLowerCase().includes(keyword)
  )
  
  // Check if the conversation has been going on for a while (multiple exchanges)
  // This is a simple heuristic - in a real implementation, you might track conversation length
  
  // Request contact info if:
  // 1. User shows interest in services
  // 2. We don't have basic contact info yet
  // 3. The response doesn't already ask for contact info
  return hasInterest && !hasBasicInfo && !aiResponse.toLowerCase().includes("email") && !aiResponse.toLowerCase().includes("contact")
} 