-- Create properties table for property listings
CREATE TABLE IF NOT EXISTS properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  address VARCHAR(500) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(50) NOT NULL,
  zip_code VARCHAR(20) NOT NULL,
  price DECIMAL(15,2) NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  square_feet INTEGER NOT NULL,
  property_type VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'for_sale',
  description TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(featured);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON properties(created_at);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_properties_updated_at 
    BEFORE UPDATE ON properties 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample properties
INSERT INTO properties (
  title, 
  address, 
  city, 
  state, 
  zip_code, 
  price, 
  bedrooms, 
  bathrooms, 
  square_feet, 
  property_type, 
  status, 
  description, 
  featured
) VALUES 
(
  'Luxury Estate in Hidden Hills',
  '24341 ROLLING VIEW RD',
  'HIDDEN HILLS',
  'CA',
  '91302',
  16495000,
  5,
  7,
  5980,
  'luxury',
  'for_sale',
  'Stunning luxury estate featuring panoramic views, custom finishes, and resort-style amenities.',
  true
),
(
  'Beverly Hills Modern Villa',
  '1535 CARLA RDG',
  'BEVERLY HILLS',
  'CA',
  '90210',
  12500000,
  6,
  8,
  7200,
  'luxury',
  'for_sale',
  'Contemporary masterpiece with open floor plan, smart home technology, and private pool.',
  true
),
(
  'Los Angeles Hillside Retreat',
  '1895 RISING GLEN RD',
  'LOS ANGELES',
  'CA',
  '90046',
  8900000,
  4,
  5,
  4800,
  'luxury',
  'for_sale',
  'Architectural gem with breathtaking city views, gourmet kitchen, and outdoor entertainment area.',
  true
); 