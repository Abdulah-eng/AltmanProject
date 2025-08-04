# AI Chatbot Setup Guide

## Overview

The AI chatbot has been successfully integrated into your real estate website. It uses Google's Gemini API to provide intelligent responses to client inquiries and automatically collects lead information.

## Features

- **Intelligent Conversations**: Powered by Google Gemini AI
- **Lead Collection**: Automatically extracts and stores contact information
- **Real-time Interaction**: Live chat interface with typing indicators
- **Lead Scoring**: Calculates lead quality based on information completeness
- **Admin Dashboard**: Complete lead management system
- **Conversation History**: Maintains context throughout conversations

## Components Added

### 1. AI Chatbot Component (`components/ai-chatbot.tsx`)
- Floating chat button in bottom-right corner
- Modal chat interface
- Real-time message exchange
- Lead information extraction and display
- Responsive design

### 2. Chatbot API Route (`app/api/chatbot/route.ts`)
- Gemini API integration
- Conversation history management
- Lead information processing
- Database storage integration

### 3. Database Table (`scripts/create-chatbot-leads-table.sql`)
- Stores lead information
- Conversation summaries
- Lead scoring
- Status tracking
- IP address and user agent logging

### 4. Admin Lead Manager (`components/admin/chatbot-leads-manager.tsx`)
- Complete lead management interface
- Lead filtering and search
- Status updates
- Detailed lead information view
- Analytics and statistics

## Setup Instructions

### 1. Database Setup
Run the chatbot leads table creation script:

```sql
-- Execute the SQL script in your Supabase SQL editor
-- File: scripts/create-chatbot-leads-table.sql
```

### 2. API Key Configuration
The Gemini API key is already configured in the chatbot API route:
- Key: `AIzaSyCtDcvS52F1abkHn0GwVgZTf0bZT5JQ9xU`
- Location: `app/api/chatbot/route.ts`

### 3. Component Integration
The chatbot is already integrated into the home page (`app/page.tsx`).

## How It Works

### Lead Collection Process
1. **Automatic Detection**: The chatbot automatically detects when users share contact information
2. **Information Extraction**: Uses regex patterns to extract:
   - Email addresses
   - Phone numbers
   - Names (from phrases like "my name is", "I'm", "I am")
3. **Lead Scoring**: Calculates a score (0-100) based on:
   - Name provided: +20 points
   - Email provided: +30 points
   - Phone provided: +25 points
   - Interest expressed: +25 points

### Conversation Flow
1. User clicks the chat button
2. Bot greets with a welcome message
3. User asks questions about real estate services
4. AI provides helpful responses using Gemini
5. When appropriate, bot naturally asks for contact information
6. Lead information is automatically extracted and stored
7. Admin can view and manage leads in the dashboard

### Admin Features
- **Lead Dashboard**: View all collected leads with statistics
- **Lead Filtering**: Search by name, email, phone, or interest
- **Status Management**: Update lead status (new, contacted, qualified, converted, lost)
- **Detailed View**: See full conversation history and lead details
- **Analytics**: Conversion rates, average scores, and lead distribution

## Customization

### Modifying the AI Personality
Edit the system prompt in `app/api/chatbot/route.ts`:

```typescript
const systemPrompt = `You are an AI assistant for a real estate company...`
```

### Adjusting Lead Collection
Modify the `shouldRequestContactInfo` function to change when the bot asks for contact information.

### Styling the Chatbot
The chatbot uses Tailwind CSS classes. You can customize the appearance by modifying the classes in `components/ai-chatbot.tsx`.

## Security Considerations

- API key is stored in the server-side code (not exposed to client)
- Lead information is stored securely in Supabase
- Row Level Security (RLS) policies protect the data
- IP addresses are logged for security purposes

## Monitoring and Analytics

### Key Metrics to Track
- Total leads generated
- Lead conversion rates
- Average lead scores
- Most common interests
- Peak usage times

### Admin Dashboard Features
- Real-time lead statistics
- Lead quality scoring
- Conversation summaries
- Status tracking
- Export capabilities (can be added)

## Troubleshooting

### Common Issues

1. **Chatbot not responding**
   - Check Gemini API key validity
   - Verify API quota limits
   - Check server logs for errors

2. **Leads not saving**
   - Verify Supabase connection
   - Check RLS policies
   - Ensure database table exists

3. **Chatbot not appearing**
   - Check if component is imported in home page
   - Verify no JavaScript errors in console

### Debug Mode
Add console logs in the chatbot API route to debug issues:

```typescript
console.log("Received message:", message)
console.log("Lead info:", leadInfo)
```

## Future Enhancements

### Potential Improvements
1. **Email Integration**: Send automatic follow-up emails
2. **CRM Integration**: Connect with external CRM systems
3. **Advanced Analytics**: More detailed reporting and insights
4. **Multi-language Support**: Support for different languages
5. **File Upload**: Allow users to share documents
6. **Appointment Booking**: Direct appointment scheduling through chat

### Performance Optimizations
1. **Caching**: Cache common responses
2. **Rate Limiting**: Prevent abuse
3. **Conversation Summarization**: Better conversation summaries
4. **Intent Recognition**: More sophisticated lead qualification

## Support

For technical support or questions about the chatbot implementation, refer to:
- Google Gemini API documentation
- Supabase documentation
- Next.js documentation

The chatbot is now fully functional and ready to help collect leads and provide customer support for your real estate business! 