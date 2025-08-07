-- Supabase Database Schema for Homes of Hollywood Real Estate Website

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Hero Content Table
CREATE TABLE IF NOT EXISTS hero_content (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT,
    image_url TEXT,
    cta_text TEXT,
    cta_link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blogs Table
CREATE TABLE IF NOT EXISTS blogs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT,
    image_url TEXT,
    author TEXT,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    client_name TEXT NOT NULL,
    client_title TEXT,
    content TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    image_url TEXT,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Videos Table
CREATE TABLE IF NOT EXISTS videos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    youtube_url TEXT NOT NULL,
    thumbnail_url TEXT,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Images Table
CREATE TABLE IF NOT EXISTS images (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    alt_text TEXT,
    category TEXT,
    section TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    service_type TEXT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TEXT NOT NULL,
    message TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    admin_notes TEXT,
    suggested_date DATE,
    suggested_time TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Client Requirements Table
CREATE TABLE IF NOT EXISTS client_requirements (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    user_email TEXT NOT NULL,
    user_name TEXT NOT NULL,
    requirement_type TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    budget TEXT,
    timeline TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'in_progress', 'completed')),
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default hero content
INSERT INTO hero_content (title, subtitle, description, cta_text, cta_link) 
VALUES (
    'Luxury Real Estate Excellence',
    'The Altman Brothers',
    'Discover exceptional properties and unparalleled service with the leading luxury real estate team in Los Angeles.',
    'Explore Properties',
    '/listings'
) ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs(published);
CREATE INDEX IF NOT EXISTS idx_testimonials_published ON testimonials(published);
CREATE INDEX IF NOT EXISTS idx_videos_published ON videos(published);
CREATE INDEX IF NOT EXISTS idx_appointments_user_id ON appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_client_requirements_user_id ON client_requirements(user_id);
CREATE INDEX IF NOT EXISTS idx_client_requirements_status ON client_requirements(status);
CREATE INDEX IF NOT EXISTS idx_images_category ON images(category);
CREATE INDEX IF NOT EXISTS idx_images_section ON images(section);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_hero_content_updated_at BEFORE UPDATE ON hero_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON blogs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_videos_updated_at BEFORE UPDATE ON videos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_images_updated_at BEFORE UPDATE ON images FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_client_requirements_updated_at BEFORE UPDATE ON client_requirements FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE images ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_requirements ENABLE ROW LEVEL SECURITY;

-- Hero content: Read access for all, write access for admin
CREATE POLICY "Hero content read access" ON hero_content FOR SELECT USING (true);
CREATE POLICY "Hero content write access" ON hero_content FOR ALL USING (auth.jwt() ->> 'email' = 'mabdulaharshad@gmail.com');

-- Blogs: Read access for all, write access for admin
CREATE POLICY "Blogs read access" ON blogs FOR SELECT USING (true);
CREATE POLICY "Blogs write access" ON blogs FOR ALL USING (auth.jwt() ->> 'email' = 'mabdulaharshad@gmail.com');

-- Testimonials: Read access for all, write access for admin
CREATE POLICY "Testimonials read access" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Testimonials write access" ON testimonials FOR ALL USING (auth.jwt() ->> 'email' = 'mabdulaharshad@gmail.com');

-- Videos: Read access for all, write access for admin
CREATE POLICY "Videos read access" ON videos FOR SELECT USING (true);
CREATE POLICY "Videos write access" ON videos FOR ALL USING (auth.jwt() ->> 'email' = 'mabdulaharshad@gmail.com');

-- Images: Read access for all, write access for admin
CREATE POLICY "Images read access" ON images FOR SELECT USING (true);
CREATE POLICY "Images write access" ON images FOR ALL USING (auth.jwt() ->> 'email' = 'mabdulaharshad@gmail.com');

-- Appointments: Users can read their own appointments, admin can read all, users can insert, admin can update
CREATE POLICY "Appointments read own" ON appointments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Appointments read all admin" ON appointments FOR SELECT USING (auth.jwt() ->> 'email' = 'mabdulaharshad@gmail.com');
CREATE POLICY "Appointments insert" ON appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Appointments update admin" ON appointments FOR UPDATE USING (auth.jwt() ->> 'email' = 'mabdulaharshad@gmail.com');

-- Client requirements: Users can read their own requirements, admin can read all, users can insert, admin can update
CREATE POLICY "Client requirements read own" ON client_requirements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Client requirements read all admin" ON client_requirements FOR SELECT USING (auth.jwt() ->> 'email' = 'mabdulaharshad@gmail.com');
CREATE POLICY "Client requirements insert" ON client_requirements FOR INSERT WITH CHECK (true);
CREATE POLICY "Client requirements update admin" ON client_requirements FOR UPDATE USING (auth.jwt() ->> 'email' = 'mabdulaharshad@gmail.com');

-- Storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('website-images', 'website-images', true) ON CONFLICT DO NOTHING;

-- Storage policies for website-images bucket
CREATE POLICY "Images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'website-images');
CREATE POLICY "Admin can upload images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'website-images' AND auth.jwt() ->> 'email' = 'mabdulaharshad@gmail.com');
CREATE POLICY "Admin can update images" ON storage.objects FOR UPDATE USING (bucket_id = 'website-images' AND auth.jwt() ->> 'email' = 'mabdulaharshad@gmail.com');
CREATE POLICY "Admin can delete images" ON storage.objects FOR DELETE USING (bucket_id = 'website-images' AND auth.jwt() ->> 'email' = 'mabdulaharshad@gmail.com'); 