-- Fix function search path for update_updated_at_column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Drop and recreate permissive estimate insert policy with proper check
DROP POLICY IF EXISTS "Anyone can create estimates" ON public.estimates;
CREATE POLICY "Anyone can create estimates"
  ON public.estimates FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);