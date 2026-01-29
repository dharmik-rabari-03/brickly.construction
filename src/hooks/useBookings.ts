import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Booking, BookingStatus } from '@/types/database';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export function useCustomerBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          service:services(*),
          provider:provider_profiles(*)
        `)
        .eq('customer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setBookings(data as Booking[]);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching bookings:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const createBooking = async (bookingData: {
    service_id: string;
    provider_id: string;
    address: string;
    preferred_date: string;
    notes?: string;
    total_cost?: number;
  }) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login to book a service",
        variant: "destructive"
      });
      return { error: new Error("Not authenticated") };
    }

    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert({
          ...bookingData,
          customer_id: user.id,
          status: 'requested'
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Booking submitted!",
        description: "Your booking request has been sent to the provider.",
      });

      await fetchBookings();
      return { data, error: null };
    } catch (err: any) {
      toast({
        title: "Booking failed",
        description: err.message,
        variant: "destructive"
      });
      return { error: err };
    }
  };

  const cancelBooking = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId)
        .eq('customer_id', user?.id)
        .eq('status', 'requested');

      if (error) throw error;

      toast({
        title: "Booking cancelled",
        description: "Your booking has been cancelled successfully.",
      });

      await fetchBookings();
      return { error: null };
    } catch (err: any) {
      toast({
        title: "Failed to cancel",
        description: err.message,
        variant: "destructive"
      });
      return { error: err };
    }
  };

  return { bookings, isLoading, error, createBooking, cancelBooking, refetch: fetchBookings };
}

export function useProviderBookings() {
  const { user, providerProfile } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (providerProfile) {
      fetchBookings();
    }
  }, [providerProfile]);

  const fetchBookings = async () => {
    if (!providerProfile) return;
    
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          service:services(*)
        `)
        .eq('provider_id', providerProfile.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setBookings(data as Booking[]);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching provider bookings:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, status: BookingStatus) => {
    try {
      const updateData: Record<string, any> = { status };
      
      if (status === 'in_progress') {
        updateData.started_at = new Date().toISOString();
      } else if (status === 'completed') {
        updateData.completed_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('bookings')
        .update(updateData)
        .eq('id', bookingId)
        .eq('provider_id', providerProfile?.id);

      if (error) throw error;

      toast({
        title: "Status updated",
        description: `Booking status changed to ${status}`,
      });

      await fetchBookings();
      return { error: null };
    } catch (err: any) {
      toast({
        title: "Update failed",
        description: err.message,
        variant: "destructive"
      });
      return { error: err };
    }
  };

  return { bookings, isLoading, error, updateBookingStatus, refetch: fetchBookings };
}
