-- Create team_members table for team management
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  bio TEXT,
  image_url TEXT,
  email VARCHAR(255),
  phone VARCHAR(50),
  linkedin_url VARCHAR(500),
  instagram_url VARCHAR(500),
  twitter_url VARCHAR(500),
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_team_members_featured ON team_members(featured);
CREATE INDEX IF NOT EXISTS idx_team_members_order ON team_members(order_index);
CREATE INDEX IF NOT EXISTS idx_team_members_created_at ON team_members(created_at);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_team_members_updated_at 
    BEFORE UPDATE ON team_members 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample team members
INSERT INTO team_members (
  name, 
  title, 
  bio, 
  email, 
  phone, 
  linkedin_url, 
  instagram_url, 
  twitter_url, 
  featured, 
  order_index
) VALUES 
(
  'JOSH ALTMAN',
  'CO-FOUNDER & SENIOR AGENT',
  'Josh Altman is a co-founder of The Altman Brothers and one of the most successful real estate agents in Los Angeles. With over $2 billion in sales, Josh has established himself as a leader in luxury real estate.',
  'josh@altmanbrothers.com',
  '310.819.3250',
  'https://linkedin.com/in/joshaltman',
  'https://instagram.com/joshaltman',
  'https://twitter.com/joshaltman',
  true,
  1
),
(
  'MATT ALTMAN',
  'CO-FOUNDER & SENIOR AGENT',
  'Matt Altman is a co-founder of The Altman Brothers and specializes in high-end residential properties. His expertise in luxury real estate has made him one of the most sought-after agents in Beverly Hills.',
  'matt@altmanbrothers.com',
  '310.819.3251',
  'https://linkedin.com/in/mattaltman',
  'https://instagram.com/mattaltman',
  'https://twitter.com/mattaltman',
  true,
  2
),
(
  'HEATHER ALTMAN',
  'SENIOR AGENT',
  'Heather Altman brings years of experience in luxury real estate to The Altman Brothers team. She specializes in high-end properties and provides exceptional service to her clients.',
  'heather@altmanbrothers.com',
  '310.819.3252',
  'https://linkedin.com/in/heatheraltman',
  'https://instagram.com/heatheraltman',
  'https://twitter.com/heatheraltman',
  true,
  3
); 