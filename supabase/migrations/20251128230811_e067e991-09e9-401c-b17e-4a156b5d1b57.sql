-- Create services table
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  icon_name TEXT NOT NULL,
  main_title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  items TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  benefits TEXT[] DEFAULT '{}',
  additional_features TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read services (public data)
CREATE POLICY "Services are viewable by everyone"
  ON public.services
  FOR SELECT
  USING (true);

-- Create index on slug for faster lookups
CREATE INDEX idx_services_slug ON public.services(slug);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();