-- Create a table for ingredient scans
CREATE TABLE public.ingredient_scans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  image_url TEXT,
  ingredients_text TEXT NOT NULL,
  analysis_result JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.ingredient_scans ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (anyone can create and view scans)
CREATE POLICY "Anyone can create scans" 
ON public.ingredient_scans 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view scans" 
ON public.ingredient_scans 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can update their scans" 
ON public.ingredient_scans 
FOR UPDATE 
USING (true);

-- Create an index for better performance
CREATE INDEX idx_scans_created_at ON public.ingredient_scans(created_at DESC);

-- Create a table for chat messages
CREATE TABLE public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Anyone can create messages" 
ON public.chat_messages 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view messages" 
ON public.chat_messages 
FOR SELECT 
USING (true);

-- Create an index for session queries
CREATE INDEX idx_messages_session_id ON public.chat_messages(session_id, created_at);

-- Create a table for contact submissions
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (consistent with your other tables)
CREATE POLICY "Anyone can create contact submissions" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view contact submissions" 
ON public.contact_submissions 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can update contact submissions" 
ON public.contact_submissions 
FOR UPDATE 
USING (true);

-- Create indexes for better performance
CREATE INDEX idx_contact_submissions_created_at ON public.contact_submissions(created_at DESC);
CREATE INDEX idx_contact_submissions_status ON public.contact_submissions(status);
CREATE INDEX idx_contact_submissions_email ON public.contact_submissions(email);

-- Create updated_at trigger (similar to what you might have)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contact_submissions_updated_at 
    BEFORE UPDATE ON public.contact_submissions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();