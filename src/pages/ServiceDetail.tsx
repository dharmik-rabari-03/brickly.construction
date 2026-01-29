import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Star, 
  Clock, 
  IndianRupee,
  MapPin,
  Calendar as CalendarIcon,
  ArrowLeft,
  Shield,
  CheckCircle2,
  Phone,
  MessageCircle,
  Loader2
} from 'lucide-react';
import { useService } from '@/hooks/useServices';
import { useServiceReviews } from '@/hooks/useReviews';
import { useCustomerBookings } from '@/hooks/useBookings';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const { service, isLoading: serviceLoading } = useService(id);
  const { reviews, isLoading: reviewsLoading } = useServiceReviews(id);
  const { createBooking } = useCustomerBookings();

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingDate, setBookingDate] = useState<Date | undefined>();
  const [bookingData, setBookingData] = useState({
    address: '',
    notes: '',
  });

  const handleBookNow = () => {
    if (!user) {
      navigate('/login', { state: { from: `/services/${id}` } });
      return;
    }
    setShowBookingForm(true);
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!service || !bookingDate) return;

    setIsBooking(true);
    const { error } = await createBooking({
      service_id: service.id,
      provider_id: service.provider_id,
      address: bookingData.address,
      preferred_date: format(bookingDate, 'yyyy-MM-dd'),
      notes: bookingData.notes || undefined,
      total_cost: service.price,
    });

    setIsBooking(false);

    if (!error) {
      navigate('/dashboard');
    }
  };

  if (serviceLoading || authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
          <p className="text-muted-foreground mb-8">The service you're looking for doesn't exist.</p>
          <Button variant="gradient" asChild>
            <Link to="/services">Browse Services</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="bg-muted/30 border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Services
            </button>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Service Images */}
              <div className="aspect-video rounded-2xl overflow-hidden bg-muted">
                {service.images && service.images.length > 0 ? (
                  <img 
                    src={service.images[0]} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No image available
                  </div>
                )}
              </div>

              {/* Service Info */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-3 capitalize">
                      {service.category.replace('_', ' ')}
                    </span>
                    <h1 className="text-3xl font-display font-bold">{service.title}</h1>
                  </div>
                  <div className="flex items-center gap-1 bg-accent/20 px-3 py-2 rounded-lg">
                    <Star className="w-5 h-5 fill-accent text-accent" />
                    <span className="font-bold">{service.rating}</span>
                    <span className="text-muted-foreground">({service.total_reviews})</span>
                  </div>
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Provider Info */}
              {service.provider && (
                <div className="bg-card rounded-2xl border border-border/50 p-6">
                  <h3 className="text-xl font-display font-bold mb-4">About the Provider</h3>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                      {service.provider.business_name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-lg">{service.provider.business_name}</h4>
                        {service.provider.is_verified && (
                          <Shield className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <p className="text-muted-foreground mt-1">{service.provider.description}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          <span className="font-medium">{service.provider.rating}</span>
                          <span className="text-muted-foreground">({service.provider.total_reviews} reviews)</span>
                        </div>
                        {service.provider.is_verified && (
                          <span className="flex items-center gap-1 text-green-600">
                            <CheckCircle2 className="w-4 h-4" />
                            Verified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews */}
              <div>
                <h3 className="text-xl font-display font-bold mb-4">Customer Reviews</h3>
                {reviewsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin" />
                  </div>
                ) : reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="bg-card rounded-xl border border-border/50 p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={cn(
                                  "w-4 h-4",
                                  i < review.rating ? "fill-accent text-accent" : "text-muted"
                                )} 
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {format(new Date(review.created_at), 'MMM dd, yyyy')}
                          </span>
                        </div>
                        {review.comment && (
                          <p className="text-muted-foreground">{review.comment}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground py-8 text-center">
                    No reviews yet. Be the first to review!
                  </p>
                )}
              </div>
            </div>

            {/* Sidebar - Booking */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl border border-border/50 p-6 sticky top-24">
                {!showBookingForm ? (
                  <>
                    <div className="text-center mb-6">
                      <div className="flex items-center justify-center gap-1 text-3xl font-bold text-primary mb-1">
                        <IndianRupee className="w-8 h-8" />
                        {formatPrice(service.price)}
                      </div>
                      <p className="text-muted-foreground">{service.price_unit}</p>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Clock className="w-5 h-5" />
                        <span>Duration: {service.estimated_time}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Star className="w-5 h-5" />
                        <span>Rating: {service.rating} ({service.total_reviews} reviews)</span>
                      </div>
                    </div>

                    <Button 
                      variant="gradient" 
                      size="xl" 
                      className="w-full mb-4"
                      onClick={handleBookNow}
                    >
                      Book Now
                    </Button>

                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Chat
                      </Button>
                    </div>
                  </>
                ) : (
                  <form onSubmit={handleSubmitBooking} className="space-y-5">
                    <h3 className="text-xl font-display font-bold text-center">Book Service</h3>
                    
                    <div className="space-y-2">
                      <Label>Preferred Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !bookingDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {bookingDate ? format(bookingDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={bookingDate}
                            onSelect={setBookingDate}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Service Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                        <Textarea
                          id="address"
                          placeholder="Enter your complete address"
                          value={bookingData.address}
                          onChange={(e) => setBookingData({ ...bookingData, address: e.target.value })}
                          className="pl-10 min-h-[80px]"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        placeholder="Any specific requirements..."
                        value={bookingData.notes}
                        onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                        className="min-h-[60px]"
                      />
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Service Cost</span>
                        <span className="font-medium">₹{formatPrice(service.price)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t pt-2">
                        <span>Total</span>
                        <span className="text-primary">₹{formatPrice(service.price)}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setShowBookingForm(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit" 
                        variant="gradient" 
                        className="flex-1"
                        disabled={isBooking || !bookingDate || !bookingData.address}
                      >
                        {isBooking ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Booking...
                          </>
                        ) : (
                          'Confirm Booking'
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
