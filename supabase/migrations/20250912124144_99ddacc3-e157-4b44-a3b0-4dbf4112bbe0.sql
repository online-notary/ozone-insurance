-- Make the Carlos Rivera bucket public so videos can be accessed
UPDATE storage.buckets 
SET public = true 
WHERE id = 'Carlos Rivera';

-- Create RLS policy to allow public access to read files in the Carlos Rivera bucket
CREATE POLICY "Public Access for Carlos Rivera videos" ON storage.objects
FOR SELECT USING (bucket_id = 'Carlos Rivera');