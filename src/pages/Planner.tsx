import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { 
  Building2, 
  Home, 
  IndianRupee, 
  Layers, 
  BedDouble,
  Bath,
  Car,
  Trees,
  Sparkles,
  ArrowRight,
  Check
} from 'lucide-react';

const designStyles = [
  { id: 'modern', name: 'Modern', description: 'Clean lines, minimalist aesthetic' },
  { id: 'traditional', name: 'Traditional', description: 'Classic Indian architecture' },
  { id: 'contemporary', name: 'Contemporary', description: 'Current trends, mixed styles' },
  { id: 'luxury', name: 'Luxury', description: 'Premium finishes, grand design' },
];

const Planner = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    plotLength: '',
    plotWidth: '',
    budget: [5000000],
    floors: '2',
    bedrooms: '3',
    bathrooms: '2',
    parking: '1',
    garden: false,
    style: 'modern',
  });

  const [showVisualization, setShowVisualization] = useState(false);

  const handleSubmit = () => {
    setShowVisualization(true);
  };

  const estimatedCost = {
    construction: Math.round(formData.budget[0] * 0.6),
    interior: Math.round(formData.budget[0] * 0.25),
    miscellaneous: Math.round(formData.budget[0] * 0.15),
  };

  const estimatedTime = parseInt(formData.floors) * 4 + 2;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                AI-Powered Home Planner
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Plan Your{' '}
                <span className="text-gradient-primary">Dream Home</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Input your requirements and visualize your future home with cost estimates.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {!showVisualization ? (
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Form */}
                <div className="lg:col-span-2">
                  <div className="bg-card rounded-2xl border border-border/50 p-8">
                    {/* Progress Steps */}
                    <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border">
                      {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center">
                          <div 
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                              step >= s 
                                ? 'bg-gradient-primary text-white' 
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            {step > s ? <Check className="w-5 h-5" /> : s}
                          </div>
                          {s < 3 && (
                            <div className={`w-12 h-1 mx-2 rounded ${step > s ? 'bg-primary' : 'bg-muted'}`} />
                          )}
                        </div>
                      ))}
                    </div>

                    {step === 1 && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-display font-bold flex items-center gap-3">
                          <Building2 className="w-6 h-6 text-primary" />
                          Plot Details
                        </h2>
                        
                        <div className="grid sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="plotLength">Plot Length (feet)</Label>
                            <Input 
                              id="plotLength"
                              type="number"
                              placeholder="e.g., 40"
                              value={formData.plotLength}
                              onChange={(e) => setFormData({...formData, plotLength: e.target.value})}
                              className="h-12"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="plotWidth">Plot Width (feet)</Label>
                            <Input 
                              id="plotWidth"
                              type="number"
                              placeholder="e.g., 60"
                              value={formData.plotWidth}
                              onChange={(e) => setFormData({...formData, plotWidth: e.target.value})}
                              className="h-12"
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <Label>Budget Range</Label>
                          <div className="flex items-center gap-4">
                            <IndianRupee className="w-5 h-5 text-primary" />
                            <Slider
                              value={formData.budget}
                              onValueChange={(value) => setFormData({...formData, budget: value})}
                              min={1000000}
                              max={50000000}
                              step={500000}
                              className="flex-1"
                            />
                            <span className="text-lg font-bold min-w-[120px] text-right">
                              ₹{(formData.budget[0] / 10000000).toFixed(1)} Cr
                            </span>
                          </div>
                        </div>

                        <Button 
                          variant="gradient" 
                          size="lg" 
                          onClick={() => setStep(2)}
                          className="w-full"
                        >
                          Continue
                          <ArrowRight className="w-5 h-5" />
                        </Button>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-display font-bold flex items-center gap-3">
                          <Layers className="w-6 h-6 text-primary" />
                          House Configuration
                        </h2>

                        <div className="grid sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label>Number of Floors</Label>
                            <Select value={formData.floors} onValueChange={(v) => setFormData({...formData, floors: v})}>
                              <SelectTrigger className="h-12">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {['1', '2', '3', '4'].map((n) => (
                                  <SelectItem key={n} value={n}>{n} Floor{n !== '1' && 's'}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Bedrooms</Label>
                            <Select value={formData.bedrooms} onValueChange={(v) => setFormData({...formData, bedrooms: v})}>
                              <SelectTrigger className="h-12">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {['1', '2', '3', '4', '5', '6'].map((n) => (
                                  <SelectItem key={n} value={n}>{n} Bedroom{n !== '1' && 's'}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Bathrooms</Label>
                            <Select value={formData.bathrooms} onValueChange={(v) => setFormData({...formData, bathrooms: v})}>
                              <SelectTrigger className="h-12">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {['1', '2', '3', '4', '5'].map((n) => (
                                  <SelectItem key={n} value={n}>{n} Bathroom{n !== '1' && 's'}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Parking Spots</Label>
                            <Select value={formData.parking} onValueChange={(v) => setFormData({...formData, parking: v})}>
                              <SelectTrigger className="h-12">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {['0', '1', '2', '3'].map((n) => (
                                  <SelectItem key={n} value={n}>{n} Car{n !== '1' && 's'}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <Button variant="outline" size="lg" onClick={() => setStep(1)} className="flex-1">
                            Back
                          </Button>
                          <Button variant="gradient" size="lg" onClick={() => setStep(3)} className="flex-1">
                            Continue
                            <ArrowRight className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-display font-bold flex items-center gap-3">
                          <Sparkles className="w-6 h-6 text-primary" />
                          Design Style
                        </h2>

                        <div className="grid sm:grid-cols-2 gap-4">
                          {designStyles.map((style) => (
                            <button
                              key={style.id}
                              onClick={() => setFormData({...formData, style: style.id})}
                              className={`p-4 rounded-xl border-2 text-left transition-all ${
                                formData.style === style.id
                                  ? 'border-primary bg-primary/5'
                                  : 'border-border hover:border-primary/50'
                              }`}
                            >
                              <p className="font-display font-bold text-lg">{style.name}</p>
                              <p className="text-sm text-muted-foreground">{style.description}</p>
                            </button>
                          ))}
                        </div>

                        <div className="flex gap-4">
                          <Button variant="outline" size="lg" onClick={() => setStep(2)} className="flex-1">
                            Back
                          </Button>
                          <Button variant="gradient" size="lg" onClick={handleSubmit} className="flex-1">
                            Generate Visualization
                            <Sparkles className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Summary Panel */}
                <div className="lg:col-span-1">
                  <div className="bg-card rounded-2xl border border-border/50 p-6 sticky top-24">
                    <h3 className="text-lg font-display font-bold mb-6 flex items-center gap-2">
                      <Home className="w-5 h-5 text-primary" />
                      Your Home Summary
                    </h3>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center py-2 border-b border-border/50">
                        <span className="text-muted-foreground">Plot Size</span>
                        <span className="font-semibold">
                          {formData.plotLength && formData.plotWidth 
                            ? `${formData.plotLength} x ${formData.plotWidth} ft`
                            : '-'
                          }
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border/50">
                        <span className="text-muted-foreground">Floors</span>
                        <span className="font-semibold">{formData.floors}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border/50">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <BedDouble className="w-4 h-4" /> Bedrooms
                        </span>
                        <span className="font-semibold">{formData.bedrooms}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border/50">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <Bath className="w-4 h-4" /> Bathrooms
                        </span>
                        <span className="font-semibold">{formData.bathrooms}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border/50">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <Car className="w-4 h-4" /> Parking
                        </span>
                        <span className="font-semibold">{formData.parking} cars</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border/50">
                        <span className="text-muted-foreground">Style</span>
                        <span className="font-semibold capitalize">{formData.style}</span>
                      </div>
                    </div>

                    <div className="bg-primary/5 rounded-xl p-4">
                      <p className="text-sm text-muted-foreground mb-1">Budget</p>
                      <p className="text-2xl font-display font-bold text-primary">
                        ₹{(formData.budget[0] / 10000000).toFixed(2)} Cr
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Visualization Result */
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-display font-bold mb-2">
                    Your Home Visualization
                  </h2>
                  <p className="text-muted-foreground">
                    Based on your requirements, here's a preview of your dream home
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* 3D Preview Placeholder */}
                  <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
                    <div className="aspect-square bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 flex items-center justify-center relative">
                      <div className="absolute inset-0 pattern-dots opacity-30" />
                      <div className="text-center relative z-10 p-8">
                        <Home className="w-32 h-32 mx-auto text-primary mb-6" />
                        <p className="text-2xl font-display font-bold mb-2">
                          {formData.floors}-Floor {formData.style.charAt(0).toUpperCase() + formData.style.slice(1)} Home
                        </p>
                        <p className="text-muted-foreground">
                          {formData.bedrooms} BHK with {formData.bathrooms} Bathrooms
                        </p>
                        <div className="mt-6 flex justify-center gap-4">
                          <Button variant="gradient">View 3D Model</Button>
                          <Button variant="outline">Edit Design</Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cost Breakdown */}
                  <div className="space-y-6">
                    <div className="bg-card rounded-2xl border border-border/50 p-6">
                      <h3 className="text-xl font-display font-bold mb-6">Cost Breakdown</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Construction Cost</span>
                          <span className="font-bold">₹{(estimatedCost.construction / 100000).toFixed(1)}L</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-3">
                          <div className="bg-gradient-primary h-full rounded-full" style={{ width: '60%' }} />
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Interior Work</span>
                          <span className="font-bold">₹{(estimatedCost.interior / 100000).toFixed(1)}L</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-3">
                          <div className="bg-gradient-accent h-full rounded-full" style={{ width: '25%' }} />
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Miscellaneous</span>
                          <span className="font-bold">₹{(estimatedCost.miscellaneous / 100000).toFixed(1)}L</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-3">
                          <div className="bg-gradient-secondary h-full rounded-full" style={{ width: '15%' }} />
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-border">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-display font-bold">Total Estimated Cost</span>
                          <span className="text-2xl font-display font-bold text-primary">
                            ₹{(formData.budget[0] / 10000000).toFixed(2)} Cr
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-card rounded-2xl border border-border/50 p-6">
                      <h3 className="text-xl font-display font-bold mb-4">Timeline</h3>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-2xl font-bold text-primary">{estimatedTime}</span>
                        </div>
                        <div>
                          <p className="font-semibold">Months to Complete</p>
                          <p className="text-sm text-muted-foreground">Including all phases</p>
                        </div>
                      </div>
                    </div>

                    <Button variant="gradient" size="xl" className="w-full">
                      Get Detailed Quote
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                <div className="text-center">
                  <Button variant="outline" onClick={() => setShowVisualization(false)}>
                    Start New Plan
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Planner;
