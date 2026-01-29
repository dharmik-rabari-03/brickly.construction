import { useState, useEffect } from 'react';
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
import { 
  Calculator as CalculatorIcon, 
  IndianRupee,
  Layers,
  Package,
  HardHat,
  Sparkles,
  Download,
  Share2
} from 'lucide-react';

const Calculator = () => {
  const [inputs, setInputs] = useState({
    area: '',
    floors: '1',
    quality: 'standard',
    location: 'metro',
  });

  const [results, setResults] = useState({
    materialCost: 0,
    labourCost: 0,
    totalCost: 0,
    timeline: 0,
    perSqFt: 0,
  });

  const qualityMultipliers = {
    basic: 1,
    standard: 1.3,
    premium: 1.6,
    luxury: 2.2,
  };

  const locationMultipliers = {
    rural: 0.8,
    semiUrban: 0.9,
    metro: 1,
    premium: 1.2,
  };

  useEffect(() => {
    if (inputs.area) {
      const area = parseFloat(inputs.area);
      const floors = parseInt(inputs.floors);
      const qualityMult = qualityMultipliers[inputs.quality as keyof typeof qualityMultipliers];
      const locationMult = locationMultipliers[inputs.location as keyof typeof locationMultipliers];

      const baseRate = 1800; // Base rate per sq.ft
      const totalArea = area * floors;
      
      const perSqFt = Math.round(baseRate * qualityMult * locationMult);
      const materialCost = Math.round(totalArea * perSqFt * 0.55);
      const labourCost = Math.round(totalArea * perSqFt * 0.35);
      const otherCost = Math.round(totalArea * perSqFt * 0.1);
      const totalCost = materialCost + labourCost + otherCost;
      
      const timeline = Math.round((totalArea / 1000) * 3 + floors * 2);

      setResults({
        materialCost,
        labourCost,
        totalCost,
        timeline,
        perSqFt,
      });
    }
  }, [inputs]);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} Lakh`;
    } else {
      return `₹${amount.toLocaleString('en-IN')}`;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-br from-secondary/10 via-primary/5 to-accent/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <CalculatorIcon className="w-4 h-4" />
                Smart Cost Estimator
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Construction{' '}
                <span className="text-gradient-primary">Cost Calculator</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Get accurate cost estimates for your construction project in seconds.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Input Form */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-2xl border border-border/50 p-6 sticky top-24">
                  <h2 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Enter Details
                  </h2>

                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="area">Plot Area (sq.ft)</Label>
                      <Input
                        id="area"
                        type="number"
                        placeholder="e.g., 2000"
                        value={inputs.area}
                        onChange={(e) => setInputs({...inputs, area: e.target.value})}
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Number of Floors</Label>
                      <Select value={inputs.floors} onValueChange={(v) => setInputs({...inputs, floors: v})}>
                        <SelectTrigger className="h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {['1', '2', '3', '4', '5'].map((n) => (
                            <SelectItem key={n} value={n}>
                              {n} Floor{n !== '1' && 's'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Construction Quality</Label>
                      <Select value={inputs.quality} onValueChange={(v) => setInputs({...inputs, quality: v})}>
                        <SelectTrigger className="h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Basic (₹1,400-1,600/sq.ft)</SelectItem>
                          <SelectItem value="standard">Standard (₹1,800-2,200/sq.ft)</SelectItem>
                          <SelectItem value="premium">Premium (₹2,500-3,000/sq.ft)</SelectItem>
                          <SelectItem value="luxury">Luxury (₹3,500+/sq.ft)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Location Type</Label>
                      <Select value={inputs.location} onValueChange={(v) => setInputs({...inputs, location: v})}>
                        <SelectTrigger className="h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rural">Rural Area</SelectItem>
                          <SelectItem value="semiUrban">Semi-Urban</SelectItem>
                          <SelectItem value="metro">Metro City</SelectItem>
                          <SelectItem value="premium">Premium Location</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="lg:col-span-3 space-y-6">
                {/* Main Result Card */}
                <div className="bg-gradient-dark text-white rounded-2xl p-8 relative overflow-hidden">
                  <div className="absolute inset-0 pattern-construction opacity-10" />
                  <div className="relative">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                      <div>
                        <p className="text-white/60 mb-2">Estimated Total Cost</p>
                        <p className="text-4xl md:text-5xl font-display font-bold">
                          {inputs.area ? formatCurrency(results.totalCost) : '₹0'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-white/60 mb-2">Rate per sq.ft</p>
                        <p className="text-2xl font-bold text-accent">
                          ₹{results.perSqFt || 0}
                        </p>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="bg-white/10 rounded-xl p-4">
                        <Package className="w-6 h-6 text-primary mb-2" />
                        <p className="text-white/60 text-sm">Materials</p>
                        <p className="text-xl font-bold">{formatCurrency(results.materialCost)}</p>
                      </div>
                      <div className="bg-white/10 rounded-xl p-4">
                        <HardHat className="w-6 h-6 text-accent mb-2" />
                        <p className="text-white/60 text-sm">Labour</p>
                        <p className="text-xl font-bold">{formatCurrency(results.labourCost)}</p>
                      </div>
                      <div className="bg-white/10 rounded-xl p-4">
                        <Layers className="w-6 h-6 text-green-400 mb-2" />
                        <p className="text-white/60 text-sm">Timeline</p>
                        <p className="text-xl font-bold">{results.timeline || 0} Months</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="bg-card rounded-2xl border border-border/50 p-6">
                  <h3 className="text-xl font-display font-bold mb-6">Detailed Breakdown</h3>
                  
                  <div className="space-y-4">
                    {[
                      { label: 'Cement & Sand', percentage: 15, color: 'bg-orange-500' },
                      { label: 'Steel & Iron', percentage: 12, color: 'bg-blue-500' },
                      { label: 'Bricks & Blocks', percentage: 10, color: 'bg-red-500' },
                      { label: 'Flooring & Tiles', percentage: 8, color: 'bg-green-500' },
                      { label: 'Plumbing & Electrical', percentage: 10, color: 'bg-purple-500' },
                      { label: 'Doors & Windows', percentage: 5, color: 'bg-yellow-500' },
                      { label: 'Labour Charges', percentage: 35, color: 'bg-cyan-500' },
                      { label: 'Miscellaneous', percentage: 5, color: 'bg-pink-500' },
                    ].map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">{item.label}</span>
                          <span className="font-semibold">
                            {formatCurrency(Math.round(results.totalCost * item.percentage / 100))}
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className={`${item.color} h-full rounded-full transition-all duration-500`} 
                            style={{ width: inputs.area ? `${item.percentage}%` : '0%' }} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-4">
                  <Button variant="gradient" size="lg" className="flex-1">
                    <Download className="w-5 h-5" />
                    Download Report
                  </Button>
                  <Button variant="outline" size="lg" className="flex-1">
                    <Share2 className="w-5 h-5" />
                    Share Estimate
                  </Button>
                </div>

                {/* Disclaimer */}
                <p className="text-sm text-muted-foreground text-center">
                  * These are estimated costs and may vary based on actual market conditions, 
                  site conditions, and specific requirements. Contact us for an accurate quote.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Calculator;
