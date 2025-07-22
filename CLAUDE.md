# ComedyHub Project Context

## Project Overview
ComedyHub is a platform that helps fans discover live stand-up comedy shows, track their favorite comedians, and receive alerts when new performances are announced. Built with both casual fans and die-hard comedy lovers in mind, ComedyHub makes it effortless to stay in the loop—whether you're looking for something fun to do tonight or trying to catch your favorite comic on their next set.

## Problem Statement
Comedy enthusiasts currently face significant friction in discovering shows - they must manually check multiple venue websites, follow dozens of social media accounts, and rely on word-of-mouth to stay informed about performances. This fragmented approach leads to missed shows and poor discovery of new comedians.

## Tech Stack
- **Frontend**: Next.js 15 with TypeScript and Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL with Row Level Security)
- **ORM**: Supabase JavaScript client
- **Deployment**: Ready for Vercel
- **Package Manager**: npm

## Project Status: Backend Complete ✅

### Completed Features
1. **Project Setup**
   - Next.js 15 with TypeScript and Tailwind CSS
   - Professional landing page with ComedyHub branding
   - Git repository initialized with proper commit history

2. **Database Architecture (Supabase)**
   - Complete schema with 7 tables and relationships
   - Row Level Security policies implemented
   - Sample data with 10 comedians, 10 venues, 10+ shows

3. **API Endpoints**
   - `GET /api/comedians` - List/search comedians
   - `GET /api/comedians/[id]` - Get single comedian
   - `GET /api/venues` - List venues (city filter, search, pagination)
   - `GET /api/shows` - List shows (city, date, comedian filters, pagination)

4. **Type Safety**
   - Complete TypeScript interfaces for all entities
   - Proper path aliases configured (@/* -> src/*)

## Database Schema

### Core Tables
- **comedians** - Comedian profiles, bios, social links
- **venues** - Comedy clubs/venues with location data
- **shows** - Individual comedy performances/events
- **show_performers** - Many-to-many: shows ↔ comedians

### User Tables  
- **profiles** - User accounts (extends Supabase auth)
- **user_follows** - Users following comedians
- **user_favorites** - Users favoriting shows

### Key Relationships
```
shows → venues (many-to-one)
shows ← show_performers → comedians (many-to-many)
users ← user_follows → comedians (many-to-many)
users ← user_favorites → shows (many-to-many)
```

## API Examples

### Get Comedians
```bash
curl "http://localhost:3000/api/comedians?limit=5&search=jerry"
```

### Get Shows with Filters
```bash
curl "http://localhost:3000/api/shows?city=Los Angeles&limit=3"
curl "http://localhost:3000/api/shows?comedian=dave"
curl "http://localhost:3000/api/shows?date=2025-07-29"
```

### Response Structure
Shows include full venue details and performer lineup:
```json
{
  "data": [{
    "id": "...",
    "title": "Comedy Night with Jerry Seinfeld", 
    "venue": {
      "name": "Comedy Cellar",
      "city": "New York",
      "address": "117 MacDougal St"
    },
    "performers": [{
      "role": "headliner",
      "comedian": {
        "name": "Jerry Seinfeld",
        "bio": "Master of observational comedy"
      }
    }]
  }]
}
```

## Environment Setup

### Required Environment Variables
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Development Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## File Structure
```
src/
├── app/
│   ├── api/                 # API routes
│   │   ├── comedians/       # Comedian endpoints
│   │   ├── shows/           # Show endpoints
│   │   └── venues/          # Venue endpoints
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage
├── lib/
│   └── supabase.ts          # Supabase client config
└── types/
    └── database.ts          # TypeScript interfaces

supabase/
├── schema.sql               # Database schema + RLS policies
└── seed.sql                 # Sample data

SUPABASE_SETUP.md           # Complete setup instructions
```

## Next Steps / Roadmap

### Immediate (Frontend)
- [ ] Create show listing page with search/filters
- [ ] Build comedian profile pages
- [ ] Add venue detail pages
- [ ] Implement responsive design

### User Features
- [ ] User authentication (Supabase Auth)
- [ ] User profiles and preferences
- [ ] Follow comedians functionality
- [ ] Favorite shows functionality
- [ ] Email notifications for followed comedians

### Advanced Features
- [ ] Geographic location-based discovery
- [ ] Calendar integration
- [ ] Social sharing
- [ ] User reviews/ratings
- [ ] Venue partnerships for data feeds

### Data Integration
- [ ] Web scraping for venue websites
- [ ] Social media monitoring for show announcements
- [ ] Ticketing platform integrations
- [ ] Comedy festival/event APIs

## Development Notes

### Supabase Setup Complete
- Project created and configured
- Schema and seed data applied
- All API endpoints tested and working
- Row Level Security policies active

### Testing Verified
- All API endpoints return proper JSON
- Relationships working (shows → venues → performers → comedians)
- Filtering and pagination functional
- TypeScript compilation successful

### Git History
- Initial commit: Basic Next.js setup
- Database commit: Complete Supabase integration
- Path fix commit: Module resolution corrected

### Performance Considerations
- Database indexes added for common queries (date, location, comedian)
- API responses include related data to minimize round trips
- Ready for Redis caching layer if needed

## Contact & Deployment
- Repository: `/Users/gytndd/dev/personal/comedy-hub`
- Ready for Vercel deployment
- Supabase project: `gbikhuztwnxnkrextiix.supabase.co`
- Development server: `http://localhost:3000`

---
*Last updated: 2025-07-22 - Backend implementation complete*