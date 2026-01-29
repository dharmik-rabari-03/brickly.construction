import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Star, 
  Clock, 
  IndianRupee,
  Filter,
  SlidersHorizontal,
  Hammer, 
  Home, 
  PaintBucket, 
  Sofa, 
  Wrench, 
  Truck, 
  HardHat, 
  Package,
  Zap,
  Loader2
} from 'lucide-react';
import { useServices } from '@/hooks/useServices';
import { ServiceCategory } from '@/types/database';

const categories = [
  { id: 'all', name: 'All Services', icon: null },
  { id: 'construction', name: 'Construction', icon: Home },
  { id: 'renovation', name: 'Renovation', icon: Hammer },
  { id: 'painting', name: 'Painting', icon: PaintBucket },
  { id: 'interior_work', name: 'Interior', icon: Sofa },
  { id: 'plumbing', name: 'Plumbing', icon: Wrench },
  { id: 'electrical', name: 'Electrical', icon: Zap },
  { id: 'labour', name: 'Labour', icon: HardHat },
  { id: 'suppliers', name: 'Materials', icon: Package },
  { id: 'equipment_rental', name: 'Equipment', icon: Truck },
];

const Services = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');
  
  const { services, isLoading, error } = useServices(selectedCategory);

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (service.provider?.business_name?.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Banner */}
        <section className="bg-gradient-dark text-white py-16 relative overflow-hidden">
          <div className="absolute inset-0 pattern-construction opacity-10" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Find the Perfect{' '}
                <span className="text-gradient-accent">Service</span>
              </h1>
              <p className="text-lg text-white/70 mb-8">
                Browse through verified professionals and book services for all your construction needs.
              </p>

              {/* Search Bar */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search services, providers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-14 bg-white text-foreground border-0 text-lg"
                  />
                </div>
                <Button variant="gradient" size="xl" className="h-14">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Categories Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="bg-card rounded-2xl border border-border/50 p-4 sticky top-24">
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
                  <SlidersHorizontal className="w-5 h-5 text-primary" />
                  <span className="font-display font-bold">Categories</span>
                </div>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id as ServiceCategory | 'all')}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                        selectedCategory === category.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      {category.icon && <category.icon className="w-5 h-5" />}
                      <span className="font-medium">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Services Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{filteredServices.length}</span> services
                </p>
                <select className="bg-card border border-border rounded-lg px-4 py-2 text-sm">
                  <option>Most Popular</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Highest Rated</option>
                </select>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-16">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : error ? (
                <div className="text-center py-16">
                  <p className="text-destructive">Error loading services. Please try again.</p>
                </div>
              ) : filteredServices.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">No services found. Try adjusting your search or filters.</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredServices.map((service) => (
                    <Link 
                      to={`/services/${service.id}`}
                      key={service.id}
                      className="bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-elevated hover:border-primary/30 transition-all duration-300 group"
                    >
                      {/* Image */}
                      <div className="aspect-[16/10] overflow-hidden relative">
                        <img 
                          src={service.images?.[0] || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400'} 
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          <span className="text-sm font-semibold">{service.rating}</span>
                          <span className="text-xs text-muted-foreground">({service.total_reviews})</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <p className="text-sm text-primary font-medium mb-1">
                          {service.provider?.business_name || 'Verified Provider'}
                        </p>
                        <h3 className="text-lg font-display font-bold mb-2 group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {service.description}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {service.estimated_time}
                          </div>
                        </div>

                        {/* Price & Action */}
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div>
                            <div className="flex items-center text-xl font-bold text-primary">
                              <IndianRupee className="w-5 h-5" />
                              {formatPrice(service.price)}
                            </div>
                            <span className="text-xs text-muted-foreground">{service.price_unit}</span>
                          </div>
                          <Button variant="gradient" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
