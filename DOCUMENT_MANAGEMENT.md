# Document Management System

## Overview
The Document Management System allows administrators to upload, manage, and share documents (PDF, Word files) with clients through the admin dashboard.

## Features

### 1. Document Upload
- Upload PDF and Word documents (.pdf, .doc, .docx)
- Add metadata: title, description, category, tags
- Automatic file size calculation and type detection
- Secure storage in Supabase Storage

### 2. Document Management
- View all uploaded documents in a table format
- Search documents by title, description, or tags
- Filter documents by category
- Preview PDF documents inline
- Download documents directly

### 3. Document Sharing
- Send documents via email with attachments
- Customizable email subject and message
- Professional email templates
- Automatic document attachment

### 4. Categories
- Contracts
- Proposals
- Reports
- Presentations
- Other

## Database Schema

### Documents Table
```sql
CREATE TABLE documents (
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
```

## Storage Setup

### Supabase Storage Bucket
- Bucket name: `documents`
- Public access enabled
- Row Level Security (RLS) policies for admin access

### Storage Policies
- Public read access to documents
- Admin-only upload, update, and delete permissions

## API Endpoints

### Send Document Email
- **Endpoint**: `/api/send-document-email`
- **Method**: POST
- **Body**:
  ```json
  {
    "to": "recipient@example.com",
    "subject": "Document: [Title]",
    "message": "Custom message",
    "documentUrl": "https://...",
    "documentName": "document.pdf"
  }
  ```

## Setup Instructions

### 1. Database Setup
Run the SQL script to create the documents table:
```bash
# Execute the SQL script in your Supabase dashboard
# or use the Supabase CLI
supabase db push
```

### 2. Storage Setup
Create the documents storage bucket:
```sql
-- This is included in the create-documents-table.sql script
INSERT INTO storage.buckets (id, name, public) 
VALUES ('documents', 'documents', true);
```

### 3. Environment Variables
Ensure your `.env.local` file has the required SMTP settings:
```env
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-email-password
SMTP_FROM=noreply@homesofhollywood.com
```

## Usage

### Accessing Document Management
1. Log in to the admin dashboard
2. Navigate to the "Documents" tab
3. Use the "Upload Document" button to add new documents

### Uploading Documents
1. Click "Upload Document"
2. Fill in the document details:
   - Title (required)
   - Description (optional)
   - Category (select from dropdown)
   - Tags (comma-separated)
3. Select the file (.pdf, .doc, .docx)
4. Click "Upload Document"

### Sending Documents via Email
1. Find the document in the table
2. Click the email icon (📧)
3. Enter recipient email address
4. Customize subject and message (optional)
5. Click "Send Document"

### Previewing Documents
1. Click the eye icon (👁️) next to any document
2. PDF files will display inline
3. Other file types will show a download option

## Security Features

- Row Level Security (RLS) enabled
- Admin-only access to document management
- Secure file storage with public read access
- Email authentication required for sending documents

## File Type Support

- **PDF**: Full preview support
- **Word Documents**: Download and email support
- **File Size**: Limited by Supabase Storage limits
- **Security**: Only admin can upload/delete documents

## Troubleshooting

### Common Issues

1. **Upload Fails**
   - Check file size limits
   - Ensure file type is supported
   - Verify storage bucket exists

2. **Email Not Sending**
   - Check SMTP configuration
   - Verify email credentials
   - Check network connectivity

3. **Preview Not Working**
   - PDF files only support inline preview
   - Other file types require download

### Error Messages
- "File upload failed": Check file size and type
- "Email sending failed": Verify SMTP settings
- "Document not found": Check document ID and permissions 