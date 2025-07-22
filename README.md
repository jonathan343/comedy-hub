# ComedyHub 🎭

**Discover live stand-up comedy shows, track your favorite comedians, and never miss a performance again.**

ComedyHub is a platform built for comedy fans who want to easily discover shows happening near them, follow their favorite comedians, and get notified when new performances are announced. No more manually checking dozens of venue websites or missing your favorite comic's surprise set!

## ✨ Features

- **🎭 Show Discovery** - Find comedy shows happening tonight or plan ahead
- **⭐ Comedian Tracking** - Follow your favorites and see their upcoming performances  
- **🗺️ Location-Based Search** - Discover shows in your city or when traveling
- **🔔 Smart Notifications** - Get alerts when followed comedians announce shows
- **🎯 Advanced Filtering** - Search by date, venue, comedian, or show type

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (ready for implementation)
- **Deployment**: Vercel-ready

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (free)

### 1. Clone & Install
```bash
git clone https://github.com/jonathan343/comedy-hub
cd comedy-hub
npm install
```

### 2. Set Up Database
1. Create a [Supabase](https://supabase.com) project
2. Copy your project URL and anon key
3. Update `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Initialize Database
1. Go to your Supabase dashboard → SQL Editor
2. Run `supabase/schema.sql` to create tables and policies  
3. Run `supabase/seed.sql` to add sample data

### 4. Start Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the app!

## 📡 API Endpoints

The backend provides RESTful APIs for all core functionality:

```bash
# Get comedians (supports search & pagination)
GET /api/comedians?search=jerry&limit=10

# Get single comedian
GET /api/comedians/:id

# Get venues (supports city filter)
GET /api/venues?city=New%20York&limit=5

# Get shows (supports multiple filters)
GET /api/shows?city=Los%20Angeles&date=2025-07-29&comedian=dave
```

## 🗄️ Database Schema

**Core Tables:**
- `comedians` - Comedian profiles and social links
- `venues` - Comedy clubs and performance spaces
- `shows` - Individual comedy performances
- `show_performers` - Links comedians to shows

**User Tables:** (Ready for auth implementation)
- `profiles` - User accounts and preferences
- `user_follows` - Users following comedians  
- `user_favorites` - Users favoriting shows

## 📁 Project Structure

```
src/
├── app/
│   ├── api/           # API routes
│   ├── (pages)/       # App pages (ready for implementation)
│   └── layout.tsx     # Root layout
├── lib/
│   └── supabase.ts    # Database client
├── types/
│   └── database.ts    # TypeScript interfaces
└── components/        # UI components (ready for implementation)

supabase/
├── schema.sql         # Database schema + RLS policies
└── seed.sql           # Sample data
```

## 🎯 Development Status

### ✅ Completed
- **Backend Architecture** - Complete API with working endpoints
- **Database Design** - Full schema with relationships and security
- **Sample Data** - 10 comedians, 10 venues, multiple shows ready
- **TypeScript Setup** - Full type safety throughout

### 🔄 Next Steps  
- **UI Components** - Show listings, comedian profiles, venue pages
- **User Authentication** - Supabase Auth integration
- **Search & Filtering** - Frontend implementation of API features
- **User Dashboard** - Profile, follows, favorites management

## 🔧 Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production  
npm run start        # Run production build
npm run lint         # Run ESLint
```

## 🌐 Deployment

Ready for one-click deployment to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Don't forget to add your environment variables in the Vercel dashboard!

## 📚 Documentation

- **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** - Detailed database setup guide
- **[CLAUDE.md](./CLAUDE.md)** - Complete project context and technical details
