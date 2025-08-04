-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  file_name VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  file_type VARCHAR(100) NOT NULL,
  file_size BIGINT NOT NULL,
  category VARCHAR(100) NOT NULL DEFAULT 'other',
  tags TEXT[] DEFAULT '{}',
  uploaded_by VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_documents_category ON documents(category);
CREATE INDEX IF NOT EXISTS idx_documents_created_at ON documents(created_at DESC);

-- Enable RLS (Row Level Security)
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Create policy for admin access
CREATE POLICY "Admin can manage documents" ON documents
  FOR ALL USING (auth.jwt() ->> 'email' = 'mabdulaharshad@gmail.com');

-- Create storage bucket for documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('documents', 'documents', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policy for documents bucket
CREATE POLICY "Public access to documents" ON storage.objects
  FOR SELECT USING (bucket_id = 'documents');

CREATE POLICY "Admin can upload documents" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'documents' AND 
    auth.jwt() ->> 'email' = 'mabdulaharshad@gmail.com'
  );

CREATE POLICY "Admin can update documents" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'documents' AND 
    auth.jwt() ->> 'email' = 'mabdulaharshad@gmail.com'
  );

CREATE POLICY "Admin can delete documents" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'documents' AND 
    auth.jwt() ->> 'email' = 'mabdulaharshad@gmail.com'
  ); 