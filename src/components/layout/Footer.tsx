import { Link } from 'react-router-dom';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const services = [
    { name: 'Full House Construction', path: '/services' },
    { name: 'Renovation', path: '/services' },
    { name: 'Interior Design', path: '/services' },
    { name: 'Painting Services', path: '/services' },
    { name: 'Plumbing & Electrical', path: '/services' },
  ];

  const company = [
    { name: 'About Us', path: '/about' },
    { name: 'Careers', path: '/about' },
    { name: 'Partner With Us', path: '/contact' },
    { name: 'Contact', path: '/contact' },
    { name: 'Blog', path: '/about' },
  ];

  const support = [
    { name: 'Help Center', path: '/contact' },
    { name: 'Privacy Policy', path: '/about' },
    { name: 'Terms of Service', path: '/about' },
    { name: 'FAQs', path: '/contact' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-dark text-white">
      {/* CTA Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="bg-gradient-to-r from-primary via-primary to-accent rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-orange relative overflow-hidden">
            <div className="absolute inset-0 pattern-construction opacity-10" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm font-medium mb-3">
                <Sparkles className="w-4 h-4" />
                Get Started Today
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-2">
                Ready to Build Your Dream Home?
              </h3>
              <p className="text-white/80 text-lg">
                Get started with a free consultation today.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 relative">
              <Link
                to="/planner"
                className="bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-white/90 transition-all hover:-translate-y-1 shadow-lg whitespace-nowrap inline-flex items-center gap-2"
              >
                Start Planning Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white hover:text-primary transition-all whitespace-nowrap text-center"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-xl font-display font-bold mb-1">Stay Updated</h4>
              <p className="text-white/60">Get construction tips and exclusive offers in your inbox.</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 w-full md:w-64"
              />
              <Button variant="gradient">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center shadow-orange">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-display font-bold">BRICKLY</span>
            </Link>
            <p className="text-white/60 mb-6 max-w-sm">
              Build Smart. Build Better. India's leading construction marketplace 
              connecting you with trusted professionals for all your building needs.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Linkedin, href: '#' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label={`Follow us on ${social.icon.name}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-white/60">
                  123 Construction Avenue,<br />Mumbai, India 400001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+919876543210" className="text-white/60 hover:text-white">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:hello@brickly.in" className="text-white/60 hover:text-white">
                  hello@brickly.in
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white/40 text-sm">
            <p>© {currentYear} Brickly. All rights reserved. Made with ❤️ in India.</p>
            <div className="flex gap-6">
              {support.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
