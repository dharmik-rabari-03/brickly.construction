import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Building2, Mail, Lock, Eye, EyeOff, ArrowRight, User, Phone, Briefcase, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { z } from 'zod';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address').max(255),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').max(15),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  businessName: z.string().optional(),
  agreeTerms: z.boolean().refine(val => val === true, 'You must agree to the terms'),
});

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    businessName: '',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isProviderSignup = location.pathname.includes('/provider');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate
    const result = signupSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    if (isProviderSignup && !formData.businessName) {
      setErrors({ businessName: 'Business name is required for providers' });
      return;
    }

    setIsLoading(true);

    const { error } = await signUp(formData.email, formData.password, {
      full_name: formData.name,
      phone: formData.phone,
      role: isProviderSignup ? 'provider' : 'customer',
      business_name: isProviderSignup ? formData.businessName : undefined,
    });

    setIsLoading(false);

    if (error) {
      if (error.message.includes('already registered')) {
        toast({
          title: 'Account already exists',
          description: 'An account with this email already exists. Please login instead.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Sign up failed',
          description: error.message,
          variant: 'destructive',
        });
      }
      return;
    }

    toast({
      title: 'Account created!',
      description: 'Welcome to Brickly! You can now start exploring.',
    });

    if (isProviderSignup) {
      navigate('/provider/dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-dark items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 pattern-construction opacity-10" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="relative text-center text-white max-w-md">
          <Building2 className="w-24 h-24 mx-auto mb-8 text-primary" />
          <h2 className="text-4xl font-display font-bold mb-4">
            {isProviderSignup 
              ? "Grow Your Business with Brickly"
              : "Join India's #1 Construction Platform"}
          </h2>
          <p className="text-white/70 text-lg mb-8">
            {isProviderSignup
              ? "Connect with thousands of customers looking for quality construction services."
              : "50,000+ homeowners trust Brickly for their construction needs. Start your building journey today!"}
          </p>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-2xl font-bold">50K+</p>
              <p className="text-sm text-white/60">Customers</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-2xl font-bold">10K+</p>
              <p className="text-sm text-white/60">Providers</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-2xl font-bold">100+</p>
              <p className="text-sm text-white/60">Cities</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-orange">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-display font-bold text-gradient-primary">
              BRICKLY
            </span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold mb-2">
              {isProviderSignup ? 'Become a Provider' : 'Create Your Account'}
            </h1>
            <p className="text-muted-foreground">
              {isProviderSignup 
                ? 'Start offering your services on Brickly.'
                : 'Start planning your dream home today.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={`pl-12 h-12 ${errors.name ? 'border-destructive' : ''}`}
                  required
                />
              </div>
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            {isProviderSignup && (
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="businessName"
                    type="text"
                    placeholder="Your Business Name"
                    value={formData.businessName}
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    className={`pl-12 h-12 ${errors.businessName ? 'border-destructive' : ''}`}
                    required={isProviderSignup}
                  />
                </div>
                {errors.businessName && <p className="text-sm text-destructive">{errors.businessName}</p>}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`pl-12 h-12 ${errors.email ? 'border-destructive' : ''}`}
                  required
                />
              </div>
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className={`pl-12 h-12 ${errors.phone ? 'border-destructive' : ''}`}
                  required
                />
              </div>
              {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className={`pl-12 pr-12 h-12 ${errors.password ? 'border-destructive' : ''}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
            </div>

            <div className="flex items-start gap-2">
              <Checkbox 
                id="terms" 
                checked={formData.agreeTerms}
                onCheckedChange={(checked) => setFormData({...formData, agreeTerms: checked as boolean})}
                className="mt-1"
              />
              <Label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
                I agree to the{' '}
                <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </Label>
            </div>
            {errors.agreeTerms && <p className="text-sm text-destructive">{errors.agreeTerms}</p>}

            <Button 
              type="submit" 
              variant="gradient" 
              size="xl" 
              className="w-full"
              disabled={isLoading || !formData.agreeTerms}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating account...
                </span>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <Link 
                to={isProviderSignup ? '/provider/login' : '/login'} 
                className="text-primary font-semibold hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>

          {!isProviderSignup && (
            <div className="mt-8 pt-8 border-t border-border text-center">
              <p className="text-sm text-muted-foreground mb-4">Want to offer your services?</p>
              <Button variant="outline" asChild>
                <Link to="/provider/signup">Become a Provider</Link>
              </Button>
            </div>
          )}

          {isProviderSignup && (
            <div className="mt-8 pt-8 border-t border-border text-center">
              <p className="text-sm text-muted-foreground mb-4">Looking to book services?</p>
              <Button variant="outline" asChild>
                <Link to="/signup">Customer Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
