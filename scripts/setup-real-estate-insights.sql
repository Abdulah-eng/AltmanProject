-- Setup script for real estate insights table
-- Run this in your Supabase SQL editor

-- Drop table if it exists
DROP TABLE IF EXISTS public.real_estate_insights;

-- Create real estate insights table
CREATE TABLE public.real_estate_insights (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title character varying(255) NOT NULL,
  content text NOT NULL,
  summary character varying(500),
  category character varying(100) NOT NULL DEFAULT 'general',
  author character varying(100),
  image_file text,
  featured boolean DEFAULT false,
  published boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT real_estate_insights_pkey PRIMARY KEY (id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_real_estate_insights_featured ON public.real_estate_insights USING btree (featured);
CREATE INDEX IF NOT EXISTS idx_real_estate_insights_published ON public.real_estate_insights USING btree (published);
CREATE INDEX IF NOT EXISTS idx_real_estate_insights_category ON public.real_estate_insights USING btree (category);
CREATE INDEX IF NOT EXISTS idx_real_estate_insights_display_order ON public.real_estate_insights USING btree (display_order);
CREATE INDEX IF NOT EXISTS idx_real_estate_insights_created_at ON public.real_estate_insights USING btree (created_at);

-- Create unique constraint on title
ALTER TABLE public.real_estate_insights ADD CONSTRAINT real_estate_insights_title_unique UNIQUE (title);

-- Create trigger for updated_at
CREATE TRIGGER update_real_estate_insights_updated_at 
  BEFORE UPDATE ON real_estate_insights 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE public.real_estate_insights ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Public can view published insights" ON public.real_estate_insights
  FOR SELECT USING (published = true);

CREATE POLICY "Authenticated users can insert insights" ON public.real_estate_insights
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update insights" ON public.real_estate_insights
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete insights" ON public.real_estate_insights
  FOR DELETE USING (auth.role() = 'authenticated');

-- Insert some sample categories
INSERT INTO public.real_estate_insights (title, content, summary, category, author, featured, published, display_order) VALUES
('Market Trends 2024', 'Comprehensive analysis of current real estate market trends...', 'Understanding the 2024 real estate market landscape', 'market_analysis', 'Don Adams', true, true, 1),
('Investment Strategies', 'Key strategies for real estate investment success...', 'Smart investment approaches for real estate', 'investment', 'Don Adams', true, true, 2),
('First-Time Buyer Guide', 'Complete guide for first-time homebuyers...', 'Everything you need to know as a first-time buyer', 'buying_guide', 'Don Adams', false, true, 3)
ON CONFLICT (title) DO NOTHING;

-- Grant necessary permissions
GRANT ALL ON public.real_estate_insights TO authenticated;
GRANT SELECT ON public.real_estate_insights TO anon;
