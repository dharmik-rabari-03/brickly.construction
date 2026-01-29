import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Calendar, 
  FileText, 
  Settings, 
  LogOut,
  Plus,
  Clock,
  CheckCircle2,
  IndianRupee,
  Download,
  ChevronRight,
  Bell,
  Loader2,
  XCircle,
  Hammer,
  PaintBucket,
  Wrench
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCustomerBookings } from '@/hooks/useBookings';
import { format } from 'date-fns';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, profile, isLoading: authLoading, signOut } = useAuth();
  const { bookings, isLoading: bookingsLoading, cancelBooking } = useCustomerBookings();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const handleCancelBooking = async (bookingId: string) => {
    await cancelBooking(bookingId);
  };

  if (authLoading || bookingsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'requested': return 'bg-yellow-100 text-yellow-700';
      case 'approved': return 'bg-blue-100 text-blue-700';
      case 'in_progress': return 'bg-orange-100 text-orange-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'requested': return 'Requested';
      case 'approved': return 'Approved';
      case 'in_progress': return 'In Progress';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const getServiceIcon = (category?: string) => {
    switch (category) {
      case 'painting': return PaintBucket;
      case 'plumbing': return Wrench;
      default: return Hammer;
    }
  };

  const formatCurrency = (amount: number | null) => {
    if (!amount) return '—';
    return `₹${new Intl.NumberFormat('en-IN').format(amount)}`;
  };

  const activeBookings = bookings.filter(b => b.status !== 'completed' && b.status !== 'cancelled');
  const inProgressBookings = bookings.filter(b => b.status === 'in_progress');
  const completedBookings = bookings.filter(b => b.status === 'completed');
  const totalSpent = bookings
    .filter(b => b.status === 'completed')
    .reduce((sum, b) => sum + (b.total_cost || 0), 0);

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      
      <div className="pt-20 flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 fixed left-0 top-20 bottom-0 bg-card border-r border-border p-4">
          <div className="space-y-2">
            {[
              { id: 'overview', icon: Home, label: 'Overview' },
              { id: 'bookings', icon: Calendar, label: 'My Bookings' },
              { id: 'invoices', icon: FileText, label: 'Invoices' },
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
              <h1 className="text-2xl font-display font-bold">
                Welcome back, {profile?.full_name || 'User'}!
              </h1>
              <p className="text-muted-foreground">Here's an overview of your projects</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="gradient" asChild>
                <Link to="/services">
                  <Plus className="w-5 h-5" />
                  Book Service
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-card rounded-2xl p-6 border border-border/50">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                {activeBookings.length > 0 && (
                  <span className="text-sm text-blue-600 font-medium">Active</span>
                )}
              </div>
              <p className="text-2xl font-display font-bold">{activeBookings.length}</p>
              <p className="text-muted-foreground">Active Bookings</p>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border/50">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <p className="text-2xl font-display font-bold">{inProgressBookings.length}</p>
              <p className="text-muted-foreground">In Progress</p>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border/50">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-sm text-green-600 font-medium">All time</span>
              </div>
              <p className="text-2xl font-display font-bold">{completedBookings.length}</p>
              <p className="text-muted-foreground">Completed</p>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border/50">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <IndianRupee className="w-6 h-6 text-primary" />
                </div>
              </div>
              <p className="text-2xl font-display font-bold">{formatCurrency(totalSpent)}</p>
              <p className="text-muted-foreground">Total Spent</p>
            </div>
          </div>

          {/* Active Bookings */}
          <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-display font-bold">Recent Bookings</h2>
              <Button variant="ghost" className="text-primary">
                View All
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            {bookings.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-muted-foreground mb-4">No bookings yet</p>
                <Button variant="gradient" asChild>
                  <Link to="/services">Browse Services</Link>
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {bookings.slice(0, 5).map((booking) => {
                  const ServiceIcon = getServiceIcon(booking.service?.category);
                  return (
                    <div key={booking.id} className="p-6 hover:bg-muted/50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <ServiceIcon className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-display font-bold">
                              {booking.service?.title || 'Service'}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {booking.provider?.business_name || 'Provider'}
                            </p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(booking.status)}`}>
                                {getStatusLabel(booking.status)}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {format(new Date(booking.preferred_date), 'MMM dd, yyyy')}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="font-bold text-lg">{formatCurrency(booking.total_cost)}</p>
                            {booking.status === 'requested' && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-destructive mt-1"
                                onClick={() => handleCancelBooking(booking.id)}
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Cancel
                              </Button>
                            )}
                            {booking.status === 'completed' && (
                              <Button variant="ghost" size="sm" className="text-primary mt-1">
                                <Download className="w-4 h-4 mr-1" />
                                Invoice
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
