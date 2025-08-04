-- Update images table to include image_key field
ALTER TABLE images ADD COLUMN IF NOT EXISTS image_key VARCHAR(255);

-- Add index for faster lookups by image_key
CREATE INDEX IF NOT EXISTS idx_images_image_key ON images(image_key);

-- Add unique constraint to ensure one image per key (optional)
-- ALTER TABLE images ADD CONSTRAINT unique_image_key UNIQUE (image_key);

-- Update existing images to have default image_key if needed
UPDATE images SET image_key = CONCAT(section, '_', LOWER(REPLACE(name, ' ', '_'))) WHERE image_key IS NULL; 