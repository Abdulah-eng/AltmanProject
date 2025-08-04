# Altman Brothers Real Estate Website

A modern, full-featured real estate website built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

### 🏠 **Core Features**
- **Responsive Design**: Modern, mobile-first design with Tailwind CSS
- **Authentication System**: User registration, login, and dashboard
- **Admin Dashboard**: Complete content management system
- **Image Management**: Upload, organize, and manage images with Supabase Storage
- **Blog System**: Create, edit, and publish blog posts
- **Video Management**: Add and manage YouTube videos
- **Testimonials**: Manage client testimonials and reviews

### 📅 **Appointment System**
- **Client Booking**: Users can book appointments online
- **Admin Management**: View, approve, reject, and manage appointments
- **Email Notifications**: Automatic email notifications for appointment status changes

### 💼 **Client Requirements**
- **Requirement Submission**: Clients can submit property requirements
- **Admin Tracking**: Track and manage client requirements
- **Status Updates**: Update requirement status with admin notes

### 🎨 **Content Management**
- **Hero Section**: Manage homepage hero content
- **Image Gallery**: Upload and organize images by category and section
- **Dynamic Content**: All content is managed through the admin dashboard

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **UI Components**: Radix UI, shadcn/ui
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage
- **Database**: PostgreSQL (via Supabase)

## Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- Supabase account

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd altman-brothers-website
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set Up Supabase

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note down your project URL and anon key

2. **Set Up Database Schema**
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Copy and paste the contents of `supabase-schema.sql`
   - Run the SQL script

3. **Configure Storage**
   - The SQL script will create a `website-images` bucket
   - Make sure the bucket is public for image access

### 4. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Admin Access

### Admin Login
- **URL**: `/admin/login`
- **Email**: `mabdulaharshad@gmail.com`
- **Password**: Set this in Supabase Auth dashboard

### Admin Dashboard Features
- **Overview**: Dashboard statistics and overview
- **Hero Management**: Edit homepage hero content
- **Image Management**: Upload and manage website images
- **Blog Management**: Create and edit blog posts
- **Testimonials**: Manage client testimonials
- **Appointments**: View and manage client appointments
- **Client Requirements**: Track and manage client requirements
- **Video Management**: Add and manage YouTube videos

## Database Schema

### Tables
- `hero_content`: Homepage hero section content
- `blogs`: Blog posts with titles, content, and metadata
- `testimonials`: Client testimonials and reviews
- `videos`: YouTube videos and metadata
- `images`: Image files with categories and sections
- `appointments`: Client appointment bookings
- `client_requirements`: Client property requirements

### Storage Buckets
- `website-images`: Public bucket for website images

## API Routes

### `/api/appointments`
- `POST`: Create new appointment
- `GET`: Retrieve appointments (with optional user_id filter)

### `/api/requirements`
- `POST`: Create new client requirement
- `GET`: Retrieve requirements (with optional user_id filter)

### `/api/send-appointment-email`
- `POST`: Send appointment status notification emails

## Authentication

### User Registration
- Users can register at `/auth/signup`
- Email verification required
- User profiles stored in Supabase Auth

### User Dashboard
- Access at `/dashboard` (requires authentication)
- View appointments and requirements
- Submit new requirements

### Admin Authentication
- Admin access restricted to specific email
- Full CRUD operations on all content
- Appointment and requirement management

## File Structure

```
├── app/
│   ├── admin/           # Admin dashboard pages
│   ├── auth/            # Authentication pages
│   ├── api/             # API routes
│   ├── dashboard/       # User dashboard
│   └── book-appointment/ # Appointment booking
├── components/
│   ├── admin/           # Admin dashboard components
│   ├── ui/              # Reusable UI components
│   └── ...              # Other components
├── lib/
│   └── supabase/        # Supabase client configuration
└── supabase-schema.sql  # Database schema
```

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- Set environment variables
- Build command: `npm run build`
- Start command: `npm start`

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key | Yes |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For support and questions:
- Check the Supabase documentation
- Review the code comments
- Open an issue in the repository

## License

This project is licensed under the MIT License. 