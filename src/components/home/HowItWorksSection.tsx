import { Search, UserCheck, Calendar, ThumbsUp } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: Search,
    step: '01',
    title: 'Tell Us What You Need',
    description: 'Browse services or use our smart planner to define your project requirements.',
    color: 'from-orange-500 to-amber-500',
  },
  {
    icon: UserCheck,
    step: '02',
    title: 'Get Matched',
    description: 'We connect you with verified professionals who match your needs and budget.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Calendar,
    step: '03',
    title: 'Book & Schedule',
    description: 'Choose your provider, book the service, and set a convenient schedule.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: ThumbsUp,
    step: '04',
    title: 'Get It Done',
    description: 'Your project gets completed with quality assurance and full support.',
    color: 'from-purple-500 to-pink-500',
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5" />
      <div className="absolute inset-0 pattern-dots opacity-20" />
      
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-4">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            Building Made{' '}
            <span className="text-gradient-primary">Simple</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Four easy steps to transform your construction dreams into reality.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-20 left-[12%] right-[12%] h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-20 rounded-full" />

          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative group"
            >
              {/* Step Card */}
              <div className="bg-card rounded-2xl p-8 border border-border/50 hover:border-primary/30 hover:shadow-elevated transition-all duration-300 h-full">
                {/* Step Number */}
                <div className={`absolute -top-4 left-8 bg-gradient-to-r ${step.color} text-white text-sm font-bold px-4 py-1 rounded-full shadow-lg`}>
                  Step {step.step}
                </div>

                {/* Icon */}
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 mt-2 shadow-lg`}
                >
                  <step.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-display font-bold mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>

              {/* Arrow - Mobile/Tablet */}
              {index < steps.length - 1 && (
                <div className="lg:hidden flex justify-center my-4">
                  <motion.div 
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
