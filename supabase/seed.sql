-- Sample data for ComedyHub
-- Run this after the schema.sql

-- Insert sample comedians
INSERT INTO comedians (id, name, bio, website, instagram, twitter) VALUES
  (uuid_generate_v4(), 'Jerry Seinfeld', 'Master of observational comedy and creator of Seinfeld', 'https://jerryseinfeld.com', '@jerryseinfeld', '@jerryseinfeld'),
  (uuid_generate_v4(), 'Dave Chappelle', 'Legendary stand-up comedian and social commentator', NULL, '@davechappelle', '@davechappelle'),
  (uuid_generate_v4(), 'Amy Schumer', 'Comedian, actress, and writer known for her bold humor', 'https://amyschumer.com', '@amyschumer', '@amyschumer'),
  (uuid_generate_v4(), 'Kevin Hart', 'High-energy comedian and actor', 'https://kevinhart4real.com', '@kevinhart4real', '@kevinhart4real'),
  (uuid_generate_v4(), 'Sarah Silverman', 'Provocative comedian and actress', NULL, '@sarahkatesilverman', '@sarahkatesilverman'),
  (uuid_generate_v4(), 'Bill Burr', 'Raw and honest stand-up comedian', NULL, '@therealbillburr', '@billburr'),
  (uuid_generate_v4(), 'Whitney Cummings', 'Comedian, actress, and podcast host', 'https://whitneycummings.com', '@whitneycummings', '@whitneycummings'),
  (uuid_generate_v4(), 'Sebastian Maniscalco', 'Italian-American comedian known for animated storytelling', NULL, '@sebastiancomedian', '@sebastiancomedy'),
  (uuid_generate_v4(), 'Nikki Glaser', 'Comedian and podcast host known for roasts', NULL, '@nikkiglaser', '@nikkiglaser'),
  (uuid_generate_v4(), 'Tom Segura', 'Comedian and podcast host', NULL, '@tomsegura', '@tomsegura');

-- Insert sample venues
INSERT INTO venues (id, name, description, address, city, state, zip_code, capacity, website) VALUES
  (uuid_generate_v4(), 'Comedy Cellar', 'Historic comedy club in Greenwich Village', '117 MacDougal St', 'New York', 'NY', '10012', 140, 'https://comedycellar.com'),
  (uuid_generate_v4(), 'The Laugh Factory', 'Famous comedy club on Sunset Strip', '8001 Sunset Blvd', 'Los Angeles', 'CA', '90046', 280, 'https://laughfactory.com'),
  (uuid_generate_v4(), 'Second City', 'Legendary improvisational comedy club', '1616 N Wells St', 'Chicago', 'IL', '60614', 300, 'https://secondcity.com'),
  (uuid_generate_v4(), 'Funny or Die Clubhouse', 'Comedy venue and content studio', '5510 Melrose Ave', 'Los Angeles', 'CA', '90038', 150, 'https://funnyordie.com'),
  (uuid_generate_v4(), 'The Comedy Store', 'Iconic comedy club on Sunset Strip', '8433 Sunset Blvd', 'Los Angeles', 'CA', '90069', 450, 'https://thecomedystore.com'),
  (uuid_generate_v4(), 'Carolines on Broadway', 'Premier comedy club in Times Square', '1626 Broadway', 'New York', 'NY', '10019', 300, 'https://carolines.com'),
  (uuid_generate_v4(), 'Zanies Comedy Club', 'Chain of comedy clubs', '2025 8th Ave S', 'Nashville', 'TN', '37204', 250, 'https://nashville.zanies.com'),
  (uuid_generate_v4(), 'Punch Line Sacramento', 'Comedy club in Sacramento', '2100 Arden Way', 'Sacramento', 'CA', '95825', 220, 'https://punchlinelive.com'),
  (uuid_generate_v4(), 'Helium Comedy Club', 'Modern comedy club chain', '2031 Sansom St', 'Philadelphia', 'PA', '19103', 185, 'https://heliumcomedy.com'),
  (uuid_generate_v4(), 'The Improv', 'Famous comedy club chain', '8162 Melrose Ave', 'Los Angeles', 'CA', '90046', 300, 'https://improv.com');

-- Insert sample shows (using CTEs to reference the inserted comedians and venues)
WITH comedian_ids AS (
  SELECT id, name FROM comedians WHERE name IN ('Jerry Seinfeld', 'Dave Chappelle', 'Amy Schumer', 'Kevin Hart', 'Sarah Silverman')
),
venue_ids AS (
  SELECT id, name FROM venues WHERE name IN ('Comedy Cellar', 'The Laugh Factory', 'Second City', 'The Comedy Store', 'Carolines on Broadway')
)
INSERT INTO shows (id, title, description, venue_id, show_date, show_time, ticket_price_min, ticket_price_max, ticket_url, status) 
SELECT 
  uuid_generate_v4(),
  'Comedy Night with ' || c.name,
  'An evening of stand-up comedy featuring ' || c.name,
  v.id,
  (CURRENT_DATE + INTERVAL '7 days')::timestamp + INTERVAL '20 hours',
  (CURRENT_DATE + INTERVAL '7 days')::timestamp + INTERVAL '20 hours',
  25.00,
  75.00,
  'https://tickets.example.com',
  'upcoming'
FROM comedian_ids c
CROSS JOIN venue_ids v
LIMIT 10;

-- Insert show performers (connect comedians to shows)
WITH show_comedian_pairs AS (
  SELECT 
    s.id as show_id,
    c.id as comedian_id,
    ROW_NUMBER() OVER (PARTITION BY s.id ORDER BY c.name) as rn
  FROM shows s
  CROSS JOIN comedians c
  WHERE c.name IN ('Jerry Seinfeld', 'Dave Chappelle', 'Amy Schumer', 'Kevin Hart', 'Sarah Silverman')
)
INSERT INTO show_performers (id, show_id, comedian_id, role, order_index)
SELECT 
  uuid_generate_v4(),
  show_id,
  comedian_id,
  CASE WHEN rn = 1 THEN 'headliner' ELSE 'opener' END,
  rn - 1
FROM show_comedian_pairs
WHERE rn <= 2; -- Max 2 performers per show for sample data