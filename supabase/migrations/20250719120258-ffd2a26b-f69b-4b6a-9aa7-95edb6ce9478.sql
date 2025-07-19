-- Create enum types for better data integrity
CREATE TYPE property_type AS ENUM ('apartment', 'house', 'duplex', 'penthouse', 'commercial', 'land');
CREATE TYPE property_status AS ENUM ('available', 'sold', 'rented', 'pending');
CREATE TYPE listing_type AS ENUM ('sale', 'rent');
CREATE TYPE user_role AS ENUM ('buyer', 'landlord', 'agent', 'admin');

-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  phone TEXT,
  email TEXT NOT NULL,
  role user_role DEFAULT 'buyer',
  avatar_url TEXT,
  bio TEXT,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create agents table for additional agent-specific data
CREATE TABLE public.agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
  agency_name TEXT,
  license_number TEXT,
  years_experience INTEGER,
  specializations TEXT[],
  rating DECIMAL(3,2) DEFAULT 0.00,
  total_sales INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create properties table
CREATE TABLE public.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  price BIGINT NOT NULL, -- Store price in kobo (smallest Nigerian currency unit)
  location TEXT NOT NULL,
  area TEXT NOT NULL, -- Specific area in Lagos (e.g., Victoria Island, Lekki)
  address TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  bedrooms INTEGER,
  bathrooms INTEGER,
  area_sqm INTEGER, -- Area in square meters
  property_type property_type NOT NULL,
  listing_type listing_type NOT NULL,
  status property_status DEFAULT 'available',
  is_luxury BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  agent_id UUID REFERENCES public.agents(id) ON DELETE SET NULL,
  landlord_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  images TEXT[], -- Array of image URLs
  amenities TEXT[], -- Array of amenities
  nearby_landmarks TEXT[], -- Array of nearby landmarks
  year_built INTEGER,
  parking_spaces INTEGER,
  furnishing TEXT, -- 'furnished', 'semi-furnished', 'unfurnished'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create property inquiries table
CREATE TABLE public.property_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  inquirer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  agent_id UUID REFERENCES public.agents(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  inquiry_type TEXT DEFAULT 'general', -- 'viewing', 'purchase', 'rent', 'general'
  status TEXT DEFAULT 'pending', -- 'pending', 'responded', 'closed'
  preferred_contact_method TEXT DEFAULT 'email', -- 'email', 'phone', 'whatsapp'
  preferred_viewing_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create saved properties table (user favorites)
CREATE TABLE public.saved_properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, property_id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_properties ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT 
USING (true);

CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for agents
CREATE POLICY "Agents are viewable by everyone" 
ON public.agents FOR SELECT 
USING (true);

CREATE POLICY "Agents can update own data" 
ON public.agents FOR UPDATE 
USING (auth.uid() = (SELECT user_id FROM public.profiles WHERE id = profile_id));

CREATE POLICY "Agents can insert own data" 
ON public.agents FOR INSERT 
WITH CHECK (auth.uid() = (SELECT user_id FROM public.profiles WHERE id = profile_id));

-- RLS Policies for properties
CREATE POLICY "Properties are viewable by everyone" 
ON public.properties FOR SELECT 
USING (true);

CREATE POLICY "Agents can insert properties" 
ON public.properties FOR INSERT 
WITH CHECK (
  auth.uid() = (
    SELECT p.user_id 
    FROM public.profiles p 
    JOIN public.agents a ON p.id = a.profile_id 
    WHERE a.id = agent_id
  )
);

CREATE POLICY "Agents can update own properties" 
ON public.properties FOR UPDATE 
USING (
  auth.uid() = (
    SELECT p.user_id 
    FROM public.profiles p 
    JOIN public.agents a ON p.id = a.profile_id 
    WHERE a.id = agent_id
  )
);

CREATE POLICY "Landlords can update own properties" 
ON public.properties FOR UPDATE 
USING (auth.uid() = (SELECT user_id FROM public.profiles WHERE id = landlord_id));

-- RLS Policies for property inquiries
CREATE POLICY "Users can view own inquiries" 
ON public.property_inquiries FOR SELECT 
USING (
  auth.uid() = (SELECT user_id FROM public.profiles WHERE id = inquirer_id) OR
  auth.uid() = (SELECT p.user_id FROM public.profiles p JOIN public.agents a ON p.id = a.profile_id WHERE a.id = agent_id)
);

CREATE POLICY "Users can create inquiries" 
ON public.property_inquiries FOR INSERT 
WITH CHECK (auth.uid() = (SELECT user_id FROM public.profiles WHERE id = inquirer_id));

CREATE POLICY "Agents can update inquiries for their properties" 
ON public.property_inquiries FOR UPDATE 
USING (auth.uid() = (SELECT p.user_id FROM public.profiles p JOIN public.agents a ON p.id = a.profile_id WHERE a.id = agent_id));

-- RLS Policies for saved properties
CREATE POLICY "Users can view own saved properties" 
ON public.saved_properties FOR SELECT 
USING (auth.uid() = (SELECT user_id FROM public.profiles WHERE id = user_id));

CREATE POLICY "Users can save properties" 
ON public.saved_properties FOR INSERT 
WITH CHECK (auth.uid() = (SELECT user_id FROM public.profiles WHERE id = user_id));

CREATE POLICY "Users can remove saved properties" 
ON public.saved_properties FOR DELETE 
USING (auth.uid() = (SELECT user_id FROM public.profiles WHERE id = user_id));

-- Create functions for updated_at triggers
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_agents_updated_at
  BEFORE UPDATE ON public.agents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON public.properties
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_property_inquiries_updated_at
  BEFORE UPDATE ON public.property_inquiries
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for better performance
CREATE INDEX idx_properties_location ON public.properties(area);
CREATE INDEX idx_properties_type ON public.properties(property_type);
CREATE INDEX idx_properties_listing_type ON public.properties(listing_type);
CREATE INDEX idx_properties_status ON public.properties(status);
CREATE INDEX idx_properties_price ON public.properties(price);
CREATE INDEX idx_properties_agent ON public.properties(agent_id);
CREATE INDEX idx_properties_coordinates ON public.properties(latitude, longitude);
CREATE INDEX idx_inquiries_property ON public.property_inquiries(property_id);
CREATE INDEX idx_inquiries_user ON public.property_inquiries(inquirer_id);
CREATE INDEX idx_saved_properties_user ON public.saved_properties(user_id);