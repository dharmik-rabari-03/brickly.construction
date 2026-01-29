import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  IndianRupee,
  Settings, 
  LogOut,
  Plus,
  TrendingUp,
  Star,
  Calendar,
  ChevronRight,
  Check,
  X,
  Clock,
  Loader2,
  Edit,
  Trash2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useProviderBookings } from '@/hooks/useBookings';
import { useProviderServices } from '@/hooks/useProviderServices';
import { ServiceCategory } from '@/types/database';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';

const categories: { value: ServiceCategory; label: string }[] = [
  { value: 'labour', label: 'Labour' },
  { value: 'contractors', label: 'Contractors' },
  { value: 'suppliers', label: 'Suppliers' },
  { value: 'equipment_rental', label: 'Equipment Rental' },
  { value: 'construction', label: 'Construction' },
  { value: 'renovation', label: 'Renovation' },
  { value: 'painting', label: 'Painting' },
  { value: 'interior_work', label: 'Interior Work' },
  { value: 'plumbing', label: 'Plumbing' },
  { value: 'electrical', label: 'Electrical' },
];

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const { user, providerProfile, isProvider, isLoading: authLoading, signOut } = useAuth();
  const { bookings, isLoading: bookingsLoading, updateBookingStatus } = useProviderBookings();
  const { services, isLoading: servicesLoading, createService, deleteService } = useProviderServices();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddService, setShowAddService] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    category: '' as ServiceCategory,
    price: '',
    price_unit: 'per service',
    estimated_time: '',
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/provider/login');
      return;
    }
    
    if (!authLoading && user && !isProvider) {
      toast({
        title: "Access Denied",
        description: "You need a provider account to access this page.",
        variant: "destructive"
      });
      navigate('/');
      return;
    }
  }, [user, isProvider, authLoading, navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.category) {
      toast({
        title: "Category required",
        description: "Please select a category for your service",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    const { error } = await createService({
      title: newService.title,
      description: newService.description,
      category: newService.category,
      price: parseFloat(newService.price),
      price_unit: newService.price_unit,
      estimated_time: newService.estimated_time,
    });
    setIsSubmitting(false);

    if (!error) {
      setShowAddService(false);
      setNewService({
        title: '',
        description: '',
        category: '' as ServiceCategory,
        price: '',
        price_unit: 'per service',
        estimated_time: '',
      });
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      await deleteService(serviceId);
    }
  };

  const handleAcceptBooking = async (bookingId: string) => {
    await updateBookingStatus(bookingId, 'approved');
  };

  const handleRejectBooking = async (bookingId: string) => {
    await updateBookingStatus(bookingId, 'cancelled');
  };

  const handleStartWork = async (bookingId: string) => {
    await updateBookingStatus(bookingId, 'in_progress');
  };

  const handleCompleteBooking = async (bookingId: string) => {
    await updateBookingStatus(bookingId, 'completed');
  };

  if (authLoading || bookingsLoading || servicesLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isProvider) {
    return null;
  }

  const pendingBookings = bookings.filter(b => b.status === 'requested');
  const activeBookings = bookings.filter(b => b.status === 'approved' || b.status === 'in_progress');
  const completedBookings = bookings.filter(b => b.status === 'completed');
  const totalEarnings = completedBookings.reduce((sum, b) => sum + (b.total_cost || 0), 0);

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${new Intl.NumberFormat('en-IN').format(amount)}`;
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      
      <div className="pt-20 flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 fixed left-0 top-20 bottom-0 bg-card border-r border-border p-4">
          <div className="p-4 mb-4 bg-gradient-primary rounded-xl text-white">
            <p className="text-sm opacity-80">Provider Account</p>
            <p className="font-display font-bold">{providerProfile?.business_name}</p>
            <div className="flex items-center gap-1 mt-2">
              <Star className="w-4 h-4 fill-accent text-accent" />
              <span className="text-sm">{providerProfile?.rating || 0} ({providerProfile?.total_reviews || 0} reviews)</span>
            </div>
          </div>

          <div className="space-y-2">
            {[
              { id: 'overview', icon: LayoutDashboard, label: 'Dashboard' },
              { id: 'services', icon: Briefcase, label: 'My Services' },
              { id: 'requests', icon: Users, label: 'Requests' },
              { id: 'earnings', icon: IndianRupee, label: 'Earnings' },
              { id: 'settings', icon: Settings, label: 'Settings' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                  activeTab === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-display font-bold">Provider Dashboard</h1>
              <p className="text-muted-foreground">Manage your services and bookings</p>
            </div>
            <Dialog open={showAddService} onOpenChange={setShowAddService}>
              <DialogTrigger asChild>
                <Button variant="gradient">
                  <Plus className="w-5 h-5" />
                  Add New Service
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Service</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddService} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Service Title</Label>
                    <Input
                      id="title"
                      value={newService.title}
                      onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                      placeholder="e.g., Kitchen Renovation"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={newService.category} 
                      onValueChange={(value) => setNewService({ ...newService, category: value as ServiceCategory })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newService.description}
                      onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                      placeholder="Describe your service..."
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (₹)</Label>
                      <Input
                        id="price"
                        type="number"
                        value={newService.price}
                        onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                        placeholder="50000"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price_unit">Price Unit</Label>
                      <Input
                        id="price_unit"
                        value={newService.price_unit}
                        onChange={(e) => setNewService({ ...newService, price_unit: e.target.value })}
                        placeholder="per project"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estimated_time">Estimated Time</Label>
                    <Input
                      id="estimated_time"
                      value={newService.estimated_time}
                      onChange={(e) => setNewService({ ...newService, estimated_time: e.target.value })}
                      placeholder="e.g., 10-15 days"
                      required
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button type="button" variant="outline" className="flex-1" onClick={() => setShowAddService(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="gradient" className="flex-1" disabled={isSubmitting}>
                      {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                      Add Service
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-card rounded-2xl p-6 border border-border/50">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <IndianRupee className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  Earnings
                </span>
              </div>
              <p className="text-2xl font-display font-bold">{formatCurrency(totalEarnings)}</p>
              <p className="text-muted-foreground">Total Earnings</p>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border/50">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm text-blue-600 font-medium">Active</span>
              </div>
              <p className="text-2xl font-display font-bold">{activeBookings.length}</p>
              <p className="text-muted-foreground">Ongoing Projects</p>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border/50">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                {pendingBookings.length > 0 && (
                  <span className="text-sm bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-medium">New</span>
                )}
              </div>
              <p className="text-2xl font-display font-bold">{pendingBookings.length}</p>
              <p className="text-muted-foreground">Pending Requests</p>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border/50">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Star className="w-6 h-6 text-accent-foreground" />
                </div>
              </div>
              <p className="text-2xl font-display font-bold">{providerProfile?.rating || 0}</p>
              <p className="text-muted-foreground">Average Rating</p>
            </div>
          </div>

          {activeTab === 'services' && (
            <div className="bg-card rounded-2xl border border-border/50 overflow-hidden mb-8">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-xl font-display font-bold">My Services ({services.length})</h2>
              </div>
              {services.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground mb-4">No services added yet</p>
                  <Button variant="gradient" onClick={() => setShowAddService(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Service
                  </Button>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {services.map((service) => (
                    <div key={service.id} className="p-6 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-display font-bold text-lg">{service.title}</h3>
                          <p className="text-sm text-muted-foreground capitalize">{service.category.replace('_', ' ')}</p>
                          <p className="text-primary font-semibold mt-1">
                            ₹{new Intl.NumberFormat('en-IN').format(service.price)} {service.price_unit}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-destructive"
                            onClick={() => handleDeleteService(service.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Booking Requests */}
          {(activeTab === 'overview' || activeTab === 'requests') && (
            <div className="bg-card rounded-2xl border border-border/50 overflow-hidden mb-8">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-xl font-display font-bold">Booking Requests</h2>
                <Button variant="ghost" className="text-primary">
                  View All
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              {bookings.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">No booking requests yet</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="p-6 hover:bg-muted/50 transition-colors">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-display font-bold text-lg">{booking.service?.title}</h3>
                          <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span>{booking.address}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {format(new Date(booking.preferred_date), 'MMM dd, yyyy')}
                            </span>
                          </div>
                          <p className="mt-2 font-semibold text-primary">
                            ₹{new Intl.NumberFormat('en-IN').format(booking.total_cost || 0)}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          {booking.status === 'requested' && (
                            <>
                              <Button 
                                variant="outline" 
                                className="text-destructive border-destructive hover:bg-destructive hover:text-white"
                                onClick={() => handleRejectBooking(booking.id)}
                              >
                                <X className="w-4 h-4 mr-1" />
                                Decline
                              </Button>
                              <Button 
                                variant="gradient"
                                onClick={() => handleAcceptBooking(booking.id)}
                              >
                                <Check className="w-4 h-4 mr-1" />
                                Accept
                              </Button>
                            </>
                          )}
                          {booking.status === 'approved' && (
                            <Button 
                              variant="gradient"
                              onClick={() => handleStartWork(booking.id)}
                            >
                              Start Work
                            </Button>
                          )}
                          {booking.status === 'in_progress' && (
                            <Button 
                              variant="gradient"
                              onClick={() => handleCompleteBooking(booking.id)}
                            >
                              Mark Complete
                            </Button>
                          )}
                          {booking.status === 'completed' && (
                            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-medium text-sm">
                              Completed
                            </span>
                          )}
                          {booking.status === 'cancelled' && (
                            <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full font-medium text-sm">
                              Cancelled
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Availability Card */}
          <div className="bg-gradient-dark text-white rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 pattern-construction opacity-10" />
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-display font-bold mb-2">Manage Your Availability</h3>
                <p className="text-white/70">
                  Set your working hours and mark days when you're not available for bookings.
                </p>
              </div>
              <Button className="bg-white text-foreground hover:bg-white/90">
                <Calendar className="w-5 h-5 mr-2" />
                Set Availability
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProviderDashboard;
