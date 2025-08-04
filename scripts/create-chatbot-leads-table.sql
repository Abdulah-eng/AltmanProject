-- Chatbot Leads Table
CREATE TABLE IF NOT EXISTS chatbot_leads (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT,
    email TEXT,
    phone TEXT,
    interest TEXT,
    conversation_summary TEXT,
    lead_score INTEGER DEFAULT 0,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
    source TEXT DEFAULT 'chatbot',
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_chatbot_leads_email ON chatbot_leads(email);
CREATE INDEX IF NOT EXISTS idx_chatbot_leads_status ON chatbot_leads(status);
CREATE INDEX IF NOT EXISTS idx_chatbot_leads_created_at ON chatbot_leads(created_at);

-- Enable RLS
ALTER TABLE chatbot_leads ENABLE ROW LEVEL SECURITY;

-- RLS Policies for chatbot leads
-- Admin can read all leads
CREATE POLICY "Chatbot leads read all admin" ON chatbot_leads FOR SELECT USING (auth.jwt() ->> 'email' = 'mabdulaharshad@gmail.com');
-- Anyone can insert leads (from chatbot)
CREATE POLICY "Chatbot leads insert" ON chatbot_leads FOR INSERT WITH CHECK (true);
-- Admin can update leads
CREATE POLICY "Chatbot leads update admin" ON chatbot_leads FOR UPDATE USING (auth.jwt() ->> 'email' = 'mabdulaharshad@gmail.com');

-- Create trigger for updated_at
CREATE TRIGGER update_chatbot_leads_updated_at BEFORE UPDATE ON chatbot_leads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 