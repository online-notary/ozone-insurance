-- Create storage bucket for animated logos
INSERT INTO storage.buckets (id, name, public) VALUES ('animated-logos', 'animated-logos', true);

-- Create policies for animated logo bucket
CREATE POLICY "Animated logos are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'animated-logos');

CREATE POLICY "Allow authenticated users to upload animated logos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'animated-logos' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update animated logos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'animated-logos' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete animated logos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'animated-logos' AND auth.role() = 'authenticated');