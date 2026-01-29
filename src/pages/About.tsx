import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  Target, 
  Award, 
  ArrowRight,
  CheckCircle2,
  MapPin
} from 'lucide-react';

const stats = [
  { value: '50,000+', label: 'Happy Customers' },
  { value: '10,000+', label: 'Verified Providers' },
  { value: '100+', label: 'Cities Covered' },
  { value: '₹500Cr+', label: 'Projects Completed' },
];

const values = [
  {
    icon: Target,
    title: 'Customer First',
    description: 'Every decision we make starts with how it impacts our customers.',
  },
  {
    icon: Award,
    title: 'Quality Assured',
    description: 'We verify every professional and guarantee quality workmanship.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Building a network of trusted professionals across India.',
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-dark text-white py-24 relative overflow-hidden">
          <div className="absolute inset-0 pattern-construction opacity-10" />
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-orange">
                <Building2 className="w-10 h-10" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                Building India's Future,{' '}
                <span className="text-gradient-accent">One Home at a Time</span>
              </h1>
              <p className="text-xl text-white/70">
                Brickly is India's largest construction marketplace, connecting homeowners 
                with trusted professionals for all their building needs.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 -mt-12 relative z-10">
          <div className="container mx-auto px-4">
            <div className="bg-card rounded-2xl shadow-elevated border border-border/50 p-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl md:text-4xl font-display font-bold text-gradient-primary">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                  Our Story
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                  From a Simple Idea to India's Largest Construction Platform
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Founded in 2020, Brickly was born from a simple observation: building a home in 
                    India shouldn't be so complicated. Our founders experienced firsthand the challenges 
                    of finding reliable contractors, getting fair prices, and managing construction projects.
                  </p>
                  <p>
                    What started as a small directory of verified contractors in Mumbai has grown into 
                    India's most comprehensive construction marketplace, serving over 50,000 customers 
                    across 100+ cities.
                  </p>
                  <p>
                    Today, we're proud to connect homeowners with the best professionals in the industry, 
                    from skilled laborers to renowned architects, making the dream of owning a beautiful 
                    home accessible to everyone.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 rounded-3xl overflow-hidden relative">
                  <div className="absolute inset-0 pattern-dots opacity-30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <Building2 className="w-32 h-32 mx-auto text-primary mb-6" />
                      <p className="text-2xl font-display font-bold">Since 2020</p>
                      <p className="text-muted-foreground">Building Dreams</p>
                    </div>
                  </div>
                </div>
                
                {/* Floating Card */}
                <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-elevated p-6 border border-border/50">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-success/10 flex items-center justify-center">
                      <CheckCircle2 className="w-7 h-7 text-success" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">100%</p>
                      <p className="text-sm text-muted-foreground">Verified Professionals</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-4">
                Our Values
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                What Drives Us Every Day
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className="bg-card rounded-2xl p-8 border border-border/50 hover:shadow-elevated transition-shadow text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-primary rounded-3xl p-12 text-white text-center relative overflow-hidden">
              <div className="absolute inset-0 pattern-construction opacity-10" />
              <div className="relative max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  Ready to Build Your Dream Home?
                </h2>
                <p className="text-white/80 text-lg mb-8">
                  Join 50,000+ happy customers who trusted Brickly with their construction needs.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button asChild className="bg-white text-primary hover:bg-white/90" size="lg">
                    <Link to="/planner">
                      Start Planning
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  <Button variant="hero-outline" size="lg" asChild>
                    <Link to="/services">Browse Services</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
