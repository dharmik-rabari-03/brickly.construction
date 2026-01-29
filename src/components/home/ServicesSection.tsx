import { Link } from 'react-router-dom';
import { 
  Hammer, 
  Home, 
  PaintBucket, 
  Sofa, 
  Wrench, 
  Truck, 
  HardHat, 
  Package,
  ArrowRight
} from 'lucide-react';

const services = [
  {
    icon: Home,
    title: 'Full House Construction',
    description: 'End-to-end construction services from foundation to finishing.',
    color: 'from-orange-500 to-amber-500',
    bgColor: 'bg-orange-500/10',
    path: '/services/construction',
  },
  {
    icon: Hammer,
    title: 'Renovation',
    description: 'Transform your existing space with modern upgrades.',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    path: '/services/renovation',
  },
  {
    icon: PaintBucket,
    title: 'Painting Services',
    description: 'Professional interior and exterior painting solutions.',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/10',
    path: '/services/painting',
  },
  {
    icon: Sofa,
    title: 'Interior Design',
    description: 'Beautiful interiors designed by expert professionals.',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
    path: '/services/interior',
  },
  {
    icon: Wrench,
    title: 'Plumbing & Electrical',
    description: 'Reliable plumbing and electrical installations.',
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-500/10',
    path: '/services/plumbing',
  },
  {
    icon: HardHat,
    title: 'Hire Labour',
    description: 'Skilled workers: masons, carpenters, painters & more.',
    color: 'from-red-500 to-rose-500',
    bgColor: 'bg-red-500/10',
    path: '/services/labour',
  },
  {
    icon: Package,
    title: 'Material Suppliers',
    description: 'Quality construction materials at best prices.',
    color: 'from-teal-500 to-green-500',
    bgColor: 'bg-teal-500/10',
    path: '/services/materials',
  },
  {
    icon: Truck,
    title: 'Equipment Rental',
    description: 'Rent construction equipment and machinery.',
    color: 'from-indigo-500 to-blue-500',
    bgColor: 'bg-indigo-500/10',
    path: '/services/equipment',
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20 md:py-32 bg-muted/30 relative">
      {/* Background */}
      <div className="absolute inset-0 pattern-dots opacity-30" />
      
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            Everything You Need to{' '}
            <span className="text-gradient-primary">Build Your Dream</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From planning to completion, Brickly connects you with verified professionals 
            for every construction need.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Link
              key={index}
              to={service.path}
              className="group card-interactive p-6 hover:border-primary/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl ${service.bgColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-display font-bold mb-2 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {service.description}
              </p>

              {/* Link */}
              <div className="flex items-center text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Learn More
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-primary text-white font-semibold rounded-xl shadow-orange hover:-translate-y-1 hover:shadow-lg transition-all"
          >
            View All Services
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
