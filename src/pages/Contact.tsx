import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Send,
  MessageCircle,
  Building2,
  CheckCircle2
} from 'lucide-react';

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    details: '+91 98765 43210',
    subtext: 'Mon-Sat 9am-7pm IST',
    href: 'tel:+919876543210',
  },
  {
    icon: Mail,
    title: 'Email',
    details: 'hello@brickly.in',
    subtext: 'We reply within 24 hours',
    href: 'mailto:hello@brickly.in',
  },
  {
    icon: MapPin,
    title: 'Office',
    details: '123 Construction Avenue',
    subtext: 'Mumbai, Maharashtra 400001',
    href: '#',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    details: 'Mon - Sat: 9AM - 7PM',
    subtext: 'Sunday: Closed',
    href: '#',
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-dark text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 pattern-construction opacity-10" />
          <div className="absolute top-20 right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-orange">
                <MessageCircle className="w-10 h-10" />
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Get in Touch
              </h1>
              <p className="text-xl text-white/70">
                Have questions? We'd love to hear from you. Send us a message 
                and we'll respond as soon as possible.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="py-12 -mt-8 relative z-10">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="bg-card rounded-2xl p-6 border border-border/50 hover:shadow-elevated hover:border-primary/30 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-bold mb-1">{item.title}</h3>
                  <p className="text-foreground font-medium">{item.details}</p>
                  <p className="text-sm text-muted-foreground">{item.subtext}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-5 gap-12">
                {/* Form */}
                <div className="lg:col-span-3">
                  <div className="bg-card rounded-3xl border border-border/50 p-8">
                    <h2 className="text-2xl font-display font-bold mb-2">Send us a Message</h2>
                    <p className="text-muted-foreground mb-8">
                      Fill out the form below and we'll get back to you shortly.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="h-12"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="h-12"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject *</Label>
                          <Input
                            id="subject"
                            placeholder="How can we help?"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            required
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us about your project or question..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                          className="min-h-[150px] resize-none"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        variant="gradient" 
                        size="xl" 
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          'Sending...'
                        ) : (
                          <>
                            Send Message
                            <Send className="w-5 h-5" />
                          </>
                        )}
                      </Button>
                    </form>
                  </div>
                </div>

                {/* Info Panel */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-gradient-primary rounded-3xl p-8 text-white relative overflow-hidden">
                    <div className="absolute inset-0 pattern-construction opacity-10" />
                    <div className="relative">
                      <Building2 className="w-12 h-12 mb-6" />
                      <h3 className="text-2xl font-display font-bold mb-4">
                        Why Choose Brickly?
                      </h3>
                      <ul className="space-y-3">
                        {[
                          'Verified professionals only',
                          'Transparent pricing',
                          'Quality guaranteed',
                          'Dedicated support team',
                          '50,000+ happy customers',
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-3xl p-8">
                    <h3 className="text-xl font-display font-bold mb-4">
                      Frequently Asked
                    </h3>
                    <div className="space-y-4">
                      {[
                        { q: 'How long do you take to respond?', a: 'Usually within 24 hours on business days.' },
                        { q: 'Can I visit your office?', a: 'Yes! Our Mumbai office is open Mon-Sat 9AM-7PM.' },
                        { q: 'Do you work on weekends?', a: 'Our support team works limited hours on Saturdays.' },
                      ].map((faq, idx) => (
                        <div key={idx}>
                          <p className="font-semibold text-sm">{faq.q}</p>
                          <p className="text-sm text-muted-foreground">{faq.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section (Placeholder) */}
        <section className="pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="aspect-[21/9] bg-muted rounded-3xl overflow-hidden relative">
                <div className="absolute inset-0 pattern-dots opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                    <p className="text-xl font-display font-bold">Our Location</p>
                    <p className="text-muted-foreground">123 Construction Avenue, Mumbai</p>
                  </div>
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

export default Contact;
