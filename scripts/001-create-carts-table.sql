CREATE TABLE IF NOT EXISTS carts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  items JSONB DEFAULT '[]'::jsonb, -- Array of CartItem
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a unique index on user_id to ensure one cart per user
CREATE UNIQUE INDEX IF NOT EXISTS carts_user_id_idx ON carts (user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users to select their own cart
CREATE POLICY "Users can view their own cart." ON carts
  FOR SELECT USING (auth.uid() = user_id);

-- Policy for authenticated users to insert their own cart
CREATE POLICY "Users can insert their own cart." ON carts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy for authenticated users to update their own cart
CREATE POLICY "Users can update their own cart." ON carts
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy for authenticated users to delete their own cart
CREATE POLICY "Users can delete their own cart." ON carts
  FOR DELETE USING (auth.uid() = user_id);
