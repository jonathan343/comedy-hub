# ComedyHub Supabase Setup

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/login and create a new project
3. Choose a database password and region
4. Wait for project to be ready (~2 minutes)

## 2. Get Your Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy your **Project URL** and **anon public key**
3. Update `.env.local` with your credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 3. Set Up Database

1. In Supabase dashboard, go to **SQL Editor**
2. Create a new query
3. Copy and paste the contents of `supabase/schema.sql`
4. Run the query to create all tables and policies
5. Create another new query
6. Copy and paste the contents of `supabase/seed.sql`
7. Run the query to insert sample data

## 4. Test the Setup

1. Start your development server: `npm run dev`
2. Test API endpoints:
   - `http://localhost:3000/api/comedians`
   - `http://localhost:3000/api/venues`
   - `http://localhost:3000/api/shows`

## 5. Next Steps

- Set up authentication in Supabase dashboard (**Authentication** → **Settings**)
- Configure email templates for user signup
- Add Row Level Security policies as needed
- Set up real-time subscriptions for live updates

## API Endpoints Created

- `GET /api/comedians` - List comedians (supports search, pagination)
- `GET /api/comedians/[id]` - Get single comedian
- `GET /api/venues` - List venues (supports city filter, search, pagination)  
- `GET /api/shows` - List shows (supports city, date, comedian filters, pagination)

## Database Schema

- **comedians** - Comedian profiles and social links
- **venues** - Comedy club/venue information
- **shows** - Individual comedy shows/events
- **show_performers** - Many-to-many relationship between shows and comedians
- **profiles** - User profiles (extends Supabase auth)
- **user_follows** - Users following comedians
- **user_favorites** - Users favoriting shows

All tables have Row Level Security enabled with appropriate policies.