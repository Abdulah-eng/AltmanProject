-- Setup script for neighborhoods and new developments tables
-- Run this script in your Supabase SQL editor

-- Drop existing tables if they exist (be careful with this in production!)
DROP TABLE IF EXISTS public.new_developments CASCADE;
DROP TABLE IF EXISTS public.neighborhoods CASCADE;

-- Create neighborhoods table
CREATE TABLE public.neighborhoods (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name character varying(255) NOT NULL,
  description text,
  image_file text,
  featured boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT neighborhoods_pkey PRIMARY KEY (id),
  CONSTRAINT neighborhoods_name_unique UNIQUE (name)
);

-- Create new developments table
CREATE TABLE public.new_developments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name character varying(255) NOT NULL,
  description text,
  image_file text,
  location character varying(255),
  price_range character varying(100),
  featured boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT new_developments_pkey PRIMARY KEY (id),
  CONSTRAINT new_developments_name_unique UNIQUE (name)
);

-- Create indexes for better performance
CREATE INDEX idx_neighborhoods_featured ON public.neighborhoods USING btree (featured);
CREATE INDEX idx_neighborhoods_display_order ON public.neighborhoods USING btree (display_order);
CREATE INDEX idx_new_developments_featured ON public.new_developments USING btree (featured);
CREATE INDEX idx_new_developments_display_order ON public.new_developments USING btree (display_order);

-- Create or replace the update_updated_at_column function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_neighborhoods_updated_at 
    BEFORE UPDATE ON neighborhoods 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_new_developments_updated_at 
    BEFORE UPDATE ON new_developments 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions
GRANT ALL ON public.neighborhoods TO authenticated;
GRANT ALL ON public.new_developments TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Enable Row Level Security (RLS) if needed
-- ALTER TABLE public.neighborhoods ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.new_developments ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS (uncomment if using RLS)
-- CREATE POLICY "Allow authenticated users to view neighborhoods" ON public.neighborhoods FOR SELECT TO authenticated USING (true);
-- CREATE POLICY "Allow authenticated users to view new developments" ON public.new_developments FOR SELECT TO authenticated USING (true);
-- CREATE POLICY "Allow authenticated users to insert neighborhoods" ON public.neighborhoods FOR INSERT TO authenticated WITH CHECK (true);
-- CREATE POLICY "Allow authenticated users to insert new developments" ON public.new_developments FOR INSERT TO authenticated WITH CHECK (true);
-- CREATE POLICY "Allow authenticated users to update neighborhoods" ON public.neighborhoods FOR UPDATE TO authenticated USING (true);
-- CREATE POLICY "Allow authenticated users to update new developments" ON public.new_developments FOR UPDATE TO authenticated USING (true);
-- CREATE POLICY "Allow authenticated users to delete neighborhoods" ON public.neighborhoods FOR DELETE TO authenticated USING (true);
-- CREATE POLICY "Allow authenticated users to delete new developments" ON public.new_developments FOR DELETE TO authenticated USING (true);
