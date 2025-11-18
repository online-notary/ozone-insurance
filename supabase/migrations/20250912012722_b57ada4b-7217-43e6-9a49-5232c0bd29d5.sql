-- Create RLS policies for animated-logo storage bucket
CREATE POLICY "Allow public read access to animated-logo bucket" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'animated-logo');

-- Allow listing files in the animated-logo bucket
CREATE POLICY "Allow listing files in animated-logo bucket" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'animated-logo');