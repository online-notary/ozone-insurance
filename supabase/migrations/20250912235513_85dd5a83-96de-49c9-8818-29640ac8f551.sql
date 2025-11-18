-- Create storage bucket for service images
INSERT INTO storage.buckets (id, name, public)
VALUES ('service-images', 'service-images', true);

-- Create RLS policies for service images bucket
CREATE POLICY "Service images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'service-images');

CREATE POLICY "Only authenticated users can upload service images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'service-images' AND auth.role() = 'authenticated');