-- Update services table to use public folder URLs
UPDATE services 
SET image_url = CASE 
  WHEN image_url = 'https://cwhwihjnhezgsbmkvbjf.supabase.co/storage/v1/object/public/service-images/insurance-banner-1.jpg' THEN '/images/insurance-banner-1.jpg'
  WHEN image_url = 'https://cwhwihjnhezgsbmkvbjf.supabase.co/storage/v1/object/public/service-images/insurance-banner-2.jpg' THEN '/images/insurance-banner-2.jpg'
  WHEN image_url = 'https://cwhwihjnhezgsbmkvbjf.supabase.co/storage/v1/object/public/service-images/insurance-banner-3.jpg' THEN '/images/insurance-banner-3.jpg'
  WHEN image_url = 'https://cwhwihjnhezgsbmkvbjf.supabase.co/storage/v1/object/public/service-images/financial-planning.jpg' THEN '/images/financial-planning.jpg'
  WHEN image_url = 'https://cwhwihjnhezgsbmkvbjf.supabase.co/storage/v1/object/public/service-images/hero-family.jpg' THEN '/images/hero-family.jpg'
  WHEN image_url = 'https://cwhwihjnhezgsbmkvbjf.supabase.co/storage/v1/object/public/service-images/professional-team.jpg' THEN '/images/professional-team.jpg'
  WHEN image_url = 'https://cwhwihjnhezgsbmkvbjf.supabase.co/storage/v1/object/public/service-images/businessman-professional.png' THEN '/images/businessman-professional.png'
  WHEN image_url = 'https://cwhwihjnhezgsbmkvbjf.supabase.co/storage/v1/object/public/service-images/businessman-image.png' THEN '/images/businessman-image.png'
  ELSE image_url
END
WHERE image_url LIKE 'https://cwhwihjnhezgsbmkvbjf.supabase.co/storage/v1/object/public/service-images/%';