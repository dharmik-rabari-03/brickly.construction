import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  IndianRupee,
  Settings, 
  LogOut,
  TrendingUp,
  CheckCircle,
  XCircle,
  Eye,
  Loader2,
  Shield,
  BarChart3
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface AdminStats {
  totalUsers: number;
  totalProviders: number;
  totalServices: number;
  totalBookings: number;
  totalRevenue: number;
  pendingProviders: number;
}

interface UserData {
  id: string;
  email: string;
  created_at: string;
  profile?: {
    full_name: string | null;
  };
  roles: string[];
}

interface ProviderData {
  id: string;
  user_id: string | null;
  business_name: string;
  is_verified: boolean;
  is_active: boolean;
  rating: number;
  total_reviews: number;
  created_at: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin, isLoading: authLoading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalProviders: 0,
    totalServices: 0,
    totalBookings: 0,
    totalRevenue: 0,
    pendingProviders: 0,
  });
  const [providers, setProviders] = useState<ProviderData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
      return;
    }
    
    if (!authLoading && user && !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges.",
        variant: "destructive"
      });
      navigate('/');
      return;
    }

    if (user && isAdmin) {
      fetchAdminData();
    }
  }, [user, isAdmin, authLoading, navigate]);

  const fetchAdminData = async () => {
    try {
      setIsLoading(true);

      // Fetch stats
      const [profilesRes, providersRes, servicesRes, bookingsRes] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('provider_profiles').select('*'),
        supabase.from('services').select('id', { count: 'exact', head: true }),
        supabase.from('bookings').select('total_cost'),
      ]);

      const totalRevenue = bookingsRes.data?.reduce((sum, b) => sum + (b.total_cost || 0), 0) || 0;
      const pendingProviders = providersRes.data?.filter(p => !p.is_verified).length || 0;

      setStats({
        totalUsers: profilesRes.count || 0,
        totalProviders: providersRes.data?.length || 0,
        totalServices: servicesRes.count || 0,
        totalBookings: bookingsRes.data?.length || 0,
        totalRevenue,
        pendingProviders,
      });

      setProviders(providersRes.data || []);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyProvider = async (providerId: string, verify: boolean) => {
    try {
      const { error } = await supabase
        .from('provider_profiles')
        .update({ is_verified: verify })
        .eq('id', providerId);

      if (error) throw error;

      toast({
        title: verify ? "Provider Verified" : "Verification Removed",
        description: `Provider has been ${verify ? 'verified' : 'unverified'}.`,
      });

      fetchAdminData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleToggleProviderStatus = async (providerId: string, active: boolean) => {
    try {
      const { error } = await supabase
        .from('provider_profiles')
        .update({ is_active: active })
        .eq('id', providerId);

      if (error) throw error;

      toast({
        title: active ? "Provider Activated" : "Provider Deactivated",
        description: `Provider status has been updated.`,
      });

      fetchAdminData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

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
          <div className="p-4 mb-4 bg-gradient-dark rounded-xl text-white">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-primary" />
              <p className="text-sm opacity-80">Admin Panel</p>
            </div>
            <p className="font-display font-bold">Brickly Admin</p>
          </div>

          <div className="space-y-2">
            {[
              { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
              { id: 'users', icon: Users, label: 'Users' },
              { id: 'providers', icon: Briefcase, label: 'Providers' },
              { id: 'analytics', icon: BarChart3, label: 'Analytics' },
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
              <h1 className="text-2xl font-display font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage users, providers, and platform settings</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-card rounded-2xl p-6 border border-border/50">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  Active
                </span>
              </div>
              <p className="text-2xl font-display font-bold">{stats.totalUsers}</p>
              <p className="text-muted-foreground">Total Users</p>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border/50">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-orange-600" />
                </div>
                {stats.pendingProviders > 0 && (
                  <span className="text-sm bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-medium">
                    {stats.pendingProviders} pending
                  </span>
                )}
              </div>
              <p className="text-2xl font-display font-bold">{stats.totalProviders}</p>
              <p className="text-muted-foreground">Service Providers</p>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border/50">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <p className="text-2xl font-display font-bold">{stats.totalBookings}</p>
              <p className="text-muted-foreground">Total Bookings</p>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border/50">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <IndianRupee className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  Revenue
                </span>
              </div>
              <p className="text-2xl font-display font-bold">{formatCurrency(stats.totalRevenue)}</p>
              <p className="text-muted-foreground">Total Revenue</p>
            </div>
          </div>

          {/* Providers Management */}
          <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-display font-bold">Service Providers</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-6 py-4 font-medium">Business Name</th>
                    <th className="text-left px-6 py-4 font-medium">Rating</th>
                    <th className="text-left px-6 py-4 font-medium">Reviews</th>
                    <th className="text-left px-6 py-4 font-medium">Status</th>
                    <th className="text-left px-6 py-4 font-medium">Verified</th>
                    <th className="text-left px-6 py-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {providers.map((provider) => (
                    <tr key={provider.id} className="hover:bg-muted/50">
                      <td className="px-6 py-4 font-medium">{provider.business_name}</td>
                      <td className="px-6 py-4">{provider.rating}/5</td>
                      <td className="px-6 py-4">{provider.total_reviews}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          provider.is_active 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {provider.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          provider.is_verified 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {provider.is_verified ? 'Verified' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleVerifyProvider(provider.id, !provider.is_verified)}
                          >
                            {provider.is_verified ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleToggleProviderStatus(provider.id, !provider.is_active)}
                          >
                            {provider.is_active ? 'Deactivate' : 'Activate'}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
