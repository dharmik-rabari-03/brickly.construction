export type AppRole = 'customer' | 'provider' | 'admin';

export type ServiceCategory = 
  | 'labour' 
  | 'contractors' 
  | 'suppliers' 
  | 'equipment_rental' 
  | 'construction' 
  | 'renovation' 
  | 'painting' 
  | 'interior_work'
  | 'plumbing'
  | 'electrical';

export type BookingStatus = 
  | 'requested' 
  | 'approved' 
  | 'in_progress' 
  | 'completed' 
  | 'cancelled';

export interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  address: string | null;
  city: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
  created_at: string;
}

export interface ProviderProfile {
  id: string;
  user_id: string | null;
  business_name: string;
  description: string | null;
  logo_url: string | null;
  is_verified: boolean;
  is_active: boolean;
  rating: number;
  total_reviews: number;
  total_earnings: number;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  provider_id: string;
  title: string;
  description: string;
  category: ServiceCategory;
  price: number;
  price_unit: string;
  estimated_time: string;
  images: string[];
  is_active: boolean;
  rating: number;
  total_reviews: number;
  created_at: string;
  updated_at: string;
  provider?: ProviderProfile;
}

export interface Booking {
  id: string;
  service_id: string;
  customer_id: string;
  provider_id: string;
  status: BookingStatus;
  address: string;
  preferred_date: string;
  notes: string | null;
  total_cost: number | null;
  estimated_completion: string | null;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
  service?: Service;
  provider?: ProviderProfile;
}

export interface Review {
  id: string;
  booking_id: string;
  service_id: string;
  customer_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  customer?: Profile;
}

export interface Estimate {
  id: string;
  user_id: string | null;
  plot_size: number;
  budget: number;
  floors: number;
  rooms: number;
  design_style: string;
  material_cost: number | null;
  labour_cost: number | null;
  total_cost: number | null;
  estimated_days: number | null;
  created_at: string;
}
