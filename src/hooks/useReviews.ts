import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Review } from '@/types/database';

export function useServiceReviews(serviceId: string | undefined) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (serviceId) {
      fetchReviews();
    }
  }, [serviceId]);

  const fetchReviews = async () => {
    if (!serviceId) return;
    
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *
        `)
        
        .eq('service_id', serviceId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setReviews(data as Review[]);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching reviews:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return { reviews, isLoading, error, refetch: fetchReviews };
}
