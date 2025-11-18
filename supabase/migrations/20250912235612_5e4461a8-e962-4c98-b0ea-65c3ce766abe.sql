-- Update services table to use Supabase storage URLs
UPDATE services 
SET image_url = CASE 
  WHEN image_url = '/src/assets/insurance-banner-1.jpg' THEN 'https://cwhwihjnhezgsbmkvbjf.supabase.co/storage/v1/object/public/service-images/insurance-banner-1.jpg'
  WHEN image_url = '/src/assets/insurance-banner-2.jpg' THEN 'https://cwhwihjnhezgsbmkvbjf.supabase.co/storage/v1/object/public/service-images/insurance-banner-2.jpg'
  WHEN image_url = '/src/assets/insurance-banner-3.jpg' THEN 'https://cwhwihjnhezgsbmkvbjf.supabase.co/storage/v1/object/public/service-images/insurance-banner-3.jpg'
  WHEN image_url = '/src/assets/financial-planning.jpg' THEN 'https://cwhwihjnhezgsbmkvbjf.supabase.co/storage/v1/object/public/service-images/financial-planning.jpg'
  WHEN image_url = '/src/assets/hero-family.jpg' THEN 'https://cwhwihjnhezgsbmkvbjf.supabase.co/storage/v1/object/public/service-images/hero-family.jpg'
  WHEN image_url = '/src/assets/professional-team.jpg' THEN 'https://cwhwihjnhezgsbmkvbjf.supabase.co/storage/v1/object/public/service-images/professional-team.jpg'
  WHEN image_url = '/src/assets/businessman-professional.png' THEN 'https://cwhwihjnhezgsbmkvbjf.supabase.co/storage/v1/object/public/service-images/businessman-professional.png'
  WHEN image_url = '/src/assets/businessman-image.png' THEN 'https://cwhwihjnhezgsbmkvbjf.supabase.co/storage/v1/object/public/service-images/businessman-image.png'
  ELSE image_url
END
WHERE image_url LIKE '/src/assets/%';