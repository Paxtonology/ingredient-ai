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