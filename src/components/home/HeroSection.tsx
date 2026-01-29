import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Play, 
  Star, 
  Users, 
  Building, 
  CheckCircle2,
  Sparkles,
  Shield,
  Clock
} from 'lucide-react';

const HeroSection = () => {
  const stats = [
    { value: '50K+', label: 'Happy Customers', icon: Users },
    { value: '10K+', label: 'Verified Professionals', icon: Shield },
    { value: '100+', label: 'Cities Covered', icon: Building },
    { value: '4.8', label: 'Average Rating', icon: Star },
  ];

  return (
    <section className="relative min-h-screen pt-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute inset-0 pattern-construction opacity-20" />
      
      {/* Animated Decorative Elements */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-40 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" 
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" 
      />

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-5rem)] py-12">
          {/* Content */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              India's #1 Construction Marketplace
            </motion.div>

            {/* Heading */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-tight">
                Build{' '}
                <span className="text-gradient-primary">Smart.</span>
                <br />
                Build{' '}
                <span className="relative inline-block">
                  <span className="text-gradient-accent">Better.</span>
                  <motion.svg 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="absolute -bottom-2 left-0 w-full" 
                    viewBox="0 0 200 12" 
                    fill="none"
                  >
                    <motion.path 
                      d="M2 10C50 2 150 2 198 10" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth="4" 
                      strokeLinecap="round"
                    />
                  </motion.svg>
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground max-w-xl">
                Plan, visualize, and build your dream home with trusted professionals. 
                From blueprint to reality, we've got you covered.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              <Button variant="gradient" size="xl" asChild className="group">
                <Link to="/planner">
                  Start Planning
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild className="border-2 hover:bg-secondary hover:text-white hover:border-secondary">
                <Link to="#ai-planner">
                  <Sparkles className="w-5 h-5" />
                  Try AI Planner
                </Link>
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-6 pt-4"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background flex items-center justify-center text-white text-xs font-bold shadow-lg"
                  >
                    {String.fromCharCode(64 + i)}
                  </motion.div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Rated 4.8/5 by 50,000+ customers
                </p>
              </div>
            </motion.div>
          </div>

          {/* Hero Visual */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Main Card */}
            <div className="relative bg-card rounded-3xl shadow-prominent overflow-hidden border border-border/50">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 p-8">
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 pattern-dots opacity-50" />
                  <div className="text-center relative z-10 p-6">
                    <motion.div
                      animate={{ y: [-5, 5, -5] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Building className="w-24 h-24 mx-auto text-primary mb-4" />
                    </motion.div>
                    <p className="text-xl font-display font-bold text-foreground">
                      Your Dream Home
                    </p>
                    <p className="text-muted-foreground">AI-Powered Visualization</p>
                    <Link 
                      to="#ai-planner"
                      className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                      <Sparkles className="w-4 h-4" />
                      Generate Design
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats Card */}
            <motion.div 
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-elevated p-4 border border-border/50"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">10K+</p>
                  <p className="text-sm text-muted-foreground">Active Providers</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Service Card */}
            <motion.div 
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -top-4 -right-4 bg-card rounded-2xl shadow-elevated p-4 border border-border/50"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold">Verified Services</p>
                  <p className="text-sm text-muted-foreground">100% Trusted</p>
                </div>
              </div>
            </motion.div>

            {/* AI Badge */}
            <motion.div 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 -right-8 bg-gradient-to-r from-primary to-accent rounded-full p-3 shadow-orange"
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative z-10 -mt-8 mb-12"
        >
          <div className="bg-card rounded-2xl shadow-elevated border border-border/50 p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="text-center group"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <stat.icon className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-3xl md:text-4xl font-display font-bold text-gradient-primary">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
