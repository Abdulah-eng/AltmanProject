-- Create social_images table
CREATE TABLE IF NOT EXISTS social_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  social_handle VARCHAR(100) NOT NULL,
  platform VARCHAR(20) NOT NULL DEFAULT 'instagram' CHECK (platform IN ('instagram', 'facebook', 'twitter', 'tiktok')),
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for ordering
CREATE INDEX IF NOT EXISTS idx_social_images_order ON social_images(order_index, created_at);

-- Create index for published images
CREATE INDEX IF NOT EXISTS idx_social_images_published ON social_images(published) WHERE published = true;

-- Create index for featured images
CREATE INDEX IF NOT EXISTS idx_social_images_featured ON social_images(featured) WHERE featured = true;

-- Enable Row Level Security
ALTER TABLE social_images ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to published images
CREATE POLICY "Public can view published social images" ON social_images
  FOR SELECT USING (published = true);

-- Create policy for authenticated users to manage all images
CREATE POLICY "Authenticated users can manage social images" ON social_images
  FOR ALL USING (auth.role() = 'authenticated');

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_social_images_updated_at 
  BEFORE UPDATE ON social_images 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column(); 