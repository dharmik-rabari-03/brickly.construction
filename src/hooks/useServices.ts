import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Service, ServiceCategory } from '@/types/database';

export function useServices(category?: ServiceCategory | 'all') {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, [category]);

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      let query = supabase
        .from('services')
        .select(`
          *,
          provider:provider_profiles(*)
        `)
        .eq('is_active', true)
        .order('rating', { ascending: false });

      if (category && category !== 'all') {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) throw error;
      
      setServices(data as Service[]);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching services:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return { services, isLoading, error, refetch: fetchServices };
}

export function useService(serviceId: string | undefined) {
  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (serviceId) {
      fetchService();
    }
  }, [serviceId]);

  const fetchService = async () => {
    if (!serviceId) return;
    
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('services')
        .select(`
          *,
          provider:provider_profiles(*)
        `)
        .eq('id', serviceId)
        .maybeSingle();

      if (error) throw error;
      
      setService(data as Service);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching service:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return { service, isLoading, error, refetch: fetchService };
}
