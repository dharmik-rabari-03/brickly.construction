import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, MessageCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const CTASection = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent" />
      <div className="absolute inset-0 pattern-construction opacity-10" />
      
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center text-white"
        >
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Start Your Journey Today
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            Ready to Build Your{' '}
            <span className="text-accent">Dream Home?</span>
          </h2>
          
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Join 50,000+ homeowners who trusted Brickly to bring their construction dreams to life. 
            Get started with a free consultation today.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button 
              size="xl" 
              className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              asChild
            >
              <Link to="/planner">
                Start Planning
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button 
              size="xl" 
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-primary"
              asChild
            >
              <Link to="/services">
                Browse Services
              </Link>
            </Button>
          </div>

          {/* Contact Options */}
          <div className="flex flex-wrap justify-center gap-8 text-white/80">
            <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-white transition-colors">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs">Call us at</p>
                <p className="font-semibold">+91 98765 43210</p>
              </div>
            </a>
            <a href="mailto:hello@brickly.in" className="flex items-center gap-2 hover:text-white transition-colors">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs">Chat with us</p>
                <p className="font-semibold">hello@brickly.in</p>
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
