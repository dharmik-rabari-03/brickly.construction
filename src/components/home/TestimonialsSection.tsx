import { Star, Quote, Shield, Award, ThumbsUp, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Homeowner, Mumbai',
    content: 'Brickly made building our dream home so easy! The visualization tool helped us see exactly what we were getting, and the cost estimator was spot on.',
    rating: 5,
    avatar: 'RK',
  },
  {
    name: 'Priya Sharma',
    role: 'Business Owner, Delhi',
    content: 'As a first-time builder, I was nervous about the process. Brickly connected me with amazing contractors and kept me updated every step of the way.',
    rating: 5,
    avatar: 'PS',
  },
  {
    name: 'Amit Patel',
    role: 'Homeowner, Bangalore',
    content: 'The renovation of our 20-year-old home was flawless. Professional workers, transparent pricing, and excellent support throughout.',
    rating: 5,
    avatar: 'AP',
  },
  {
    name: 'Sneha Reddy',
    role: 'Interior Designer, Hyderabad',
    content: 'I recommend Brickly to all my clients. The platform makes collaboration between designers and contractors seamless.',
    rating: 5,
    avatar: 'SR',
  },
];

const trustBadges = [
  { icon: Shield, title: 'ISO 9001', subtitle: 'Certified' },
  { icon: Award, title: 'NSIC', subtitle: 'Registered' },
  { icon: ThumbsUp, title: '100%', subtitle: 'Money-back Guarantee' },
  { icon: Clock, title: '5 Year', subtitle: 'Warranty' },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background" />
      <div className="absolute inset-0 pattern-dots opacity-20" />
      
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent-foreground text-sm font-semibold mb-4">
            <Star className="w-4 h-4 fill-accent text-accent" />
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            Trusted by{' '}
            <span className="text-gradient-primary">50,000+ Customers</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            See what our happy customers have to say about their Brickly experience.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-8 border border-border/50 hover:shadow-elevated hover:border-primary/20 transition-all duration-300 relative group"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10 group-hover:text-primary/20 transition-colors" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground/80 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold shadow-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-display font-bold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8"
        >
          {trustBadges.map((badge, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.05 }}
              className="text-center flex items-center gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
            >
              <badge.icon className="w-8 h-8 text-primary" />
              <div className="text-left">
                <p className="text-xl font-display font-bold">{badge.title}</p>
                <p className="text-sm text-muted-foreground">{badge.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
