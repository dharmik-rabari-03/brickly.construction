-- Modify provider_profiles to allow null user_id for demo data
ALTER TABLE public.provider_profiles 
  ALTER COLUMN user_id DROP NOT NULL,
  DROP CONSTRAINT IF EXISTS provider_profiles_user_id_fkey,
  ADD CONSTRAINT provider_profiles_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;