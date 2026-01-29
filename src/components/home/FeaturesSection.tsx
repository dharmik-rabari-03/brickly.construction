import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  Eye, 
  Shield, 
  Clock, 
  IndianRupee, 
  Headphones,
  ArrowRight,
  Sparkles,
  Bot
} from 'lucide-react';

const features = [
  {
    icon: Eye,
    title: 'Home Visualization',
    description: 'See your dream home before building. Input plot size, budget, and preferences to get a visual preview.',
    highlight: true,
  },
  {
    icon: Calculator,
    title: 'Smart Cost Estimation',
    description: 'Real-time cost calculator that factors in materials, labor, and timeline for accurate budgeting.',
    highlight: true,
  },
  {
    icon: Bot,
    title: 'AI Construction Assistant',
    description: 'Chat with our AI for instant answers about construction, materials, costs, and best practices.',
    highlight: true,
  },
  {
    icon: Shield,
    title: 'Verified Professionals',
    description: 'All service providers are background-checked and skill-verified for your peace of mind.',
  },
  {
    icon: Clock,
    title: 'Timeline Tracking',
    description: 'Track your project progress from start to finish with detailed status updates.',
  },
  {
    icon: IndianRupee,
    title: 'Transparent Pricing',
    description: 'No hidden costs. See upfront pricing for all services with detailed breakdowns.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Dedicated support team available round the clock to assist with your queries.',
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-dark text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pattern-construction opacity-10" />
      <motion.div 
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" 
      />
      <motion.div 
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" 
      />

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              Why Choose Brickly
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
              Powerful Tools for{' '}
              <span className="text-gradient-accent">Smarter Building</span>
            </h2>
            <p className="text-lg text-white/70 mb-8">
              From visualization to completion, our platform provides everything 
              you need to plan, manage, and execute your construction project.
            </p>

            {/* Highlighted Features */}
            <div className="space-y-4 mb-8">
              {features.filter(f => f.highlight).map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg mb-1">{feature.title}</h3>
                    <p className="text-white/60 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="gradient" size="lg" asChild className="group">
                <Link to="/planner">
                  Try Home Planner
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-white/30 text-white hover:bg-white hover:text-primary">
                <Link to="/calculator">
                  Cost Calculator
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.filter(f => !f.highlight).map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-accent transition-all">
                  <feature.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-white/60 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
