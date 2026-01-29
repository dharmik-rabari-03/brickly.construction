import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Service, ServiceCategory } from '@/types/database';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export function useProviderServices() {
  const { providerProfile } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (providerProfile) {
      fetchServices();
    }
  }, [providerProfile]);

  const fetchServices = async () => {
    if (!providerProfile) return;
    
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('provider_id', providerProfile.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setServices(data as Service[]);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching services:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const createService = async (serviceData: {
    title: string;
    description: string;
    category: ServiceCategory;
    price: number;
    price_unit: string;
    estimated_time: string;
    images?: string[];
  }) => {
    if (!providerProfile) {
      toast({
        title: "Provider profile required",
        description: "You need a provider profile to add services",
        variant: "destructive"
      });
      return { error: new Error("No provider profile") };
    }

    try {
      const { data, error } = await supabase
        .from('services')
        .insert({
          ...serviceData,
          provider_id: providerProfile.id,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Service created!",
        description: "Your service has been added successfully.",
      });

      await fetchServices();
      return { data, error: null };
    } catch (err: any) {
      toast({
        title: "Failed to create service",
        description: err.message,
        variant: "destructive"
      });
      return { error: err };
    }
  };

  const updateService = async (serviceId: string, updates: Partial<Service>) => {
    try {
      const { error } = await supabase
        .from('services')
        .update(updates)
        .eq('id', serviceId)
        .eq('provider_id', providerProfile?.id);

      if (error) throw error;

      toast({
        title: "Service updated",
        description: "Your service has been updated successfully.",
      });

      await fetchServices();
      return { error: null };
    } catch (err: any) {
      toast({
        title: "Failed to update service",
        description: err.message,
        variant: "destructive"
      });
      return { error: err };
    }
  };

  const deleteService = async (serviceId: string) => {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', serviceId)
        .eq('provider_id', providerProfile?.id);

      if (error) throw error;

      toast({
        title: "Service deleted",
        description: "Your service has been removed.",
      });

      await fetchServices();
      return { error: null };
    } catch (err: any) {
      toast({
        title: "Failed to delete service",
        description: err.message,
        variant: "destructive"
      });
      return { error: err };
    }
  };

  return { 
    services, 
    isLoading, 
    error, 
    createService, 
    updateService, 
    deleteService, 
    refetch: fetchServices 
  };
}
