export interface Comedian {
  id: string
  name: string
  bio?: string
  image_url?: string
  website?: string
  instagram?: string
  twitter?: string
  youtube?: string
  created_at: string
  updated_at: string
}

export interface Venue {
  id: string
  name: string
  description?: string
  address?: string
  city?: string
  state?: string
  zip_code?: string
  country: string
  phone?: string
  website?: string
  capacity?: number
  image_url?: string
  created_at: string
  updated_at: string
}

export interface Show {
  id: string
  title: string
  description?: string
  venue_id: string
  show_date: string
  doors_open?: string
  show_time?: string
  ticket_price_min?: number
  ticket_price_max?: number
  ticket_url?: string
  age_restriction?: string
  status: 'upcoming' | 'sold_out' | 'cancelled' | 'completed'
  image_url?: string
  created_at: string
  updated_at: string
}

export interface ShowPerformer {
  id: string
  show_id: string
  comedian_id: string
  role: 'headliner' | 'opener' | 'feature' | 'host' | 'performer'
  order_index: number
  created_at: string
}

export interface Profile {
  id: string
  email?: string
  full_name?: string
  avatar_url?: string
  location?: string
  bio?: string
  created_at: string
  updated_at: string
}

export interface UserFollow {
  id: string
  user_id: string
  comedian_id: string
  created_at: string
}

export interface UserFavorite {
  id: string
  user_id: string
  show_id: string
  created_at: string
}

// Extended types for API responses
export interface ShowWithDetails extends Show {
  venue?: Venue
  performers?: (ShowPerformer & { comedian: Comedian })[]
}

export interface ComedianWithStats extends Comedian {
  follower_count?: number
  upcoming_shows_count?: number
}

export interface VenueWithStats extends Venue {
  upcoming_shows_count?: number
}