-- Create client_experiences table
CREATE TABLE IF NOT EXISTS public.client_experiences (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  client_name character varying(255) NOT NULL,
  client_role character varying(255) NOT NULL,
  client_location character varying(255),
  testimonial text NOT NULL,
  rating integer NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  image_url text,
  featured boolean DEFAULT false,
  order_index integer DEFAULT 0,
  published boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT client_experiences_pkey PRIMARY KEY (id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_client_experiences_published ON public.client_experiences USING btree (published);
CREATE INDEX IF NOT EXISTS idx_client_experiences_featured ON public.client_experiences USING btree (featured);
CREATE INDEX IF NOT EXISTS idx_client_experiences_order ON public.client_experiences USING btree (order_index);
CREATE INDEX IF NOT EXISTS idx_client_experiences_created_at ON public.client_experiences USING btree (created_at);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_client_experiences_updated_at 
    BEFORE UPDATE ON client_experiences 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE public.client_experiences ENABLE ROW LEVEL SECURITY;

-- Policy for public read access to published experiences
CREATE POLICY "Public can view published client experiences" ON public.client_experiences
    FOR SELECT USING (published = true);

-- Policy for authenticated users to manage all experiences
CREATE POLICY "Authenticated users can manage client experiences" ON public.client_experiences
    FOR ALL USING (auth.role() = 'authenticated');

-- Insert sample data
INSERT INTO public.client_experiences (
  client_name, 
  client_role, 
  client_location, 
  testimonial, 
  rating, 
  featured, 
  order_index
) VALUES 
(
  'Sarah Johnson',
  'Beverly Hills Homeowner',
  'Beverly Hills, CA',
  'The Altman Brothers delivered an exceptional experience from start to finish. Their expertise in luxury markets is unmatched.',
  5,
  true,
  1
),
(
  'Michael Chen',
  'Luxury Property Investor',
  'Los Angeles, CA',
  'Outstanding service and market knowledge. They helped me build a profitable luxury real estate portfolio.',
  5,
  true,
  2
),
(
  'Emily Rodriguez',
  'Malibu Property Seller',
  'Malibu, CA',
  'Sold our oceanfront property above asking price in record time. Their marketing strategy is exceptional.',
  5,
  true,
  3
),
(
  'David Thompson',
  'Celebrity Client',
  'Hollywood Hills, CA',
  'Discrete, professional, and incredibly effective. The Altman Brothers understand the unique needs of high-profile clients.',
  5,
  false,
  4
),
(
  'Lisa Park',
  'International Buyer',
  'Seoul, South Korea',
  'As an international buyer, I was impressed by their global perspective and attention to detail throughout the entire process.',
  5,
  false,
  5
); 