-- Insert sample hero content
INSERT INTO hero_content (title, subtitle, description, image_url, cta_text, cta_link) VALUES
('Your Dream Home Awaits', 'Premium Real Estate Services', 'Experience luxury real estate with Homes of Hollywood. We deliver exceptional service and results that exceed expectations.', '/placeholder.svg?height=600&width=1200', 'View Our Listings', '/listings');

-- Insert sample blogs
INSERT INTO blogs (title, slug, excerpt, content, image_url, author, published) VALUES
('Top 10 Tips for First-Time Home Buyers', 'first-time-home-buyers-tips', 'Essential advice for navigating your first home purchase successfully.', 'Buying your first home is an exciting milestone, but it can also be overwhelming. Here are our top 10 tips to help you navigate the process successfully...', '/placeholder.svg?height=400&width=600', 'Homes of Hollywood Team', true),
('Market Trends: What to Expect in 2024', 'market-trends-2024', 'Our analysis of the current real estate market and predictions for the year ahead.', 'The real estate market continues to evolve, and 2024 brings new opportunities and challenges. Here''s our comprehensive analysis...', '/placeholder.svg?height=400&width=600', 'Homes of Hollywood Team', true),
('Staging Your Home for Maximum Appeal', 'home-staging-tips', 'Professional staging tips to help your home sell faster and for more money.', 'Home staging is one of the most effective ways to sell your home quickly and for top dollar. Here are our professional tips...', '/placeholder.svg?height=400&width=600', 'Homes of Hollywood Team', true);

-- Insert sample testimonials
INSERT INTO testimonials (name, role, content, rating, image_url, published) VALUES
('Sarah Johnson', 'Home Buyer', 'Homes of Hollywood made our home buying experience seamless and stress-free. Their expertise and dedication are unmatched.', 5, '/placeholder.svg?height=80&width=80', true),
('Michael Chen', 'Property Investor', 'Outstanding service and market knowledge. They helped me build a profitable real estate portfolio.', 5, '/placeholder.svg?height=80&width=80', true),
('Emily Rodriguez', 'Home Seller', 'Sold our home above asking price in just two weeks. Their marketing strategy is exceptional.', 5, '/placeholder.svg?height=80&width=80', true);

-- Insert sample videos
INSERT INTO videos (title, description, youtube_url, thumbnail_url, published) VALUES
('Market Update: Beverly Hills Real Estate', 'Latest market trends and insights for Beverly Hills luxury properties', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '/placeholder.svg?height=180&width=320', true),
('Home Selling Tips from the Experts', 'Professional advice on preparing your home for sale', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '/placeholder.svg?height=180&width=320', true),
('Luxury Property Tour: $10M Mansion', 'Exclusive tour of a stunning luxury property in Beverly Hills', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '/placeholder.svg?height=180&width=320', true);

-- Insert sample properties
INSERT INTO properties (title, description, price, address, bedrooms, bathrooms, square_feet, property_type, images, featured) VALUES
('Stunning Beverly Hills Estate', 'Magnificent estate featuring panoramic city views, infinity pool, and world-class amenities', 12500000.00, '123 Beverly Hills Dr, Beverly Hills, CA 90210', 6, 8, 8500, 'Single Family Home', ARRAY['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600'], true),
('Modern Malibu Beachfront', 'Contemporary beachfront home with direct ocean access and stunning sunset views', 8750000.00, '456 Pacific Coast Hwy, Malibu, CA 90265', 4, 5, 4200, 'Single Family Home', ARRAY['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600'], true),
('Hollywood Hills Contemporary', 'Sleek contemporary home with city lights views and resort-style amenities', 3250000.00, '789 Hollywood Hills Rd, Los Angeles, CA 90069', 4, 4, 3800, 'Single Family Home', ARRAY['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600'], false);
