import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Bed, 
  ChefHat, 
  Sofa, 
  Car, 
  Sparkles, 
  IndianRupee,
  Calendar,
  Ruler,
  Building,
  Loader2,
  CheckCircle2,
  ArrowRight,
  Download,
  Layers
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

type HomePlan = {
  designName: string;
  style: string;
  totalArea: number;
  estimatedCost: {
    min: number;
    max: number;
    breakdown: Record<string, number>;
  };
  timeline: {
    total: string;
    phases: Array<{ name: string; duration: string; description: string }>;
  };
  rooms: Array<{ name: string; area: number; position: string; features: string[] }>;
  features: string[];
  materials: Record<string, string>;
  sustainability: string[];
  tips: string[];
};

const PLANNER_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-home-planner`;

const formatCurrency = (amount: number) => {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)} L`;
  return `₹${amount.toLocaleString('en-IN')}`;
};

const AIHomePlanner = () => {
  const { toast } = useToast();
  const [bedrooms, setBedrooms] = useState(3);
  const [hasKitchen, setHasKitchen] = useState(true);
  const [hasHall, setHasHall] = useState(true);
  const [hasParking, setHasParking] = useState(true);
  const [budget, setBudget] = useState([2000000, 5000000]);
  const [plotSize, setPlotSize] = useState(1500);
  const [floors, setFloors] = useState(2);
  const [isGenerating, setIsGenerating] = useState(false);
  const [plan, setPlan] = useState<HomePlan | null>(null);
  const [activeTab, setActiveTab] = useState<'layout' | 'cost' | 'timeline'>('layout');

  const generatePlan = async () => {
    setIsGenerating(true);
    setPlan(null);

    try {
      const response = await fetch(PLANNER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          bedrooms,
          hasKitchen,
          hasHall,
          hasParking,
          budget: { min: budget[0], max: budget[1] },
          plotSize,
          floors,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate plan');
      }

      const data = await response.json();
      setPlan(data);
      toast({
        title: "Plan Generated!",
        description: `Your ${data.designName} is ready to view.`,
      });
    } catch (error) {
      console.error('Error generating plan:', error);
      toast({
        title: "Error",
        description: "Failed to generate plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const roomColors: Record<string, string> = {
    'Bedroom': 'from-blue-400 to-blue-500',
    'Kitchen': 'from-orange-400 to-orange-500',
    'Living Room': 'from-green-400 to-green-500',
    'Parking': 'from-gray-400 to-gray-500',
    'Bathroom': 'from-cyan-400 to-cyan-500',
    'Dining': 'from-yellow-400 to-yellow-500',
    'Balcony': 'from-teal-400 to-teal-500',
    'Pooja Room': 'from-amber-400 to-amber-500',
    'Store': 'from-stone-400 to-stone-500',
    'Hall': 'from-emerald-400 to-emerald-500',
  };

  const getRoomColor = (roomName: string) => {
    for (const [key, color] of Object.entries(roomColors)) {
      if (roomName.toLowerCase().includes(key.toLowerCase())) return color;
    }
    return 'from-primary to-accent';
  };

  return (
    <section className="py-20 md:py-32 relative overflow-hidden" id="ai-planner">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute inset-0 pattern-dots opacity-20" />
      
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 text-primary text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            AI-Powered
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            Generate Your{' '}
            <span className="text-gradient-primary">Dream Home</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Enter your requirements and let our AI create a personalized home plan with 
            cost estimates, timelines, and layout visualization.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-3xl border border-border p-6 md:p-8 shadow-elevated"
          >
            <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
              <Home className="w-5 h-5 text-primary" />
              Your Requirements
            </h3>

            <div className="space-y-6">
              {/* Bedrooms */}
              <div>
                <Label className="flex items-center gap-2 mb-3">
                  <Bed className="w-4 h-4 text-primary" />
                  Number of Bedrooms: <span className="font-bold text-primary">{bedrooms}</span>
                </Label>
                <Slider
                  value={[bedrooms]}
                  onValueChange={([val]) => setBedrooms(val)}
                  min={1}
                  max={6}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>1 BHK</span>
                  <span>6 BHK</span>
                </div>
              </div>

              {/* Toggle Options */}
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50">
                  <ChefHat className={`w-6 h-6 ${hasKitchen ? 'text-primary' : 'text-muted-foreground'}`} />
                  <Label className="text-xs">Kitchen</Label>
                  <Switch checked={hasKitchen} onCheckedChange={setHasKitchen} />
                </div>
                <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50">
                  <Sofa className={`w-6 h-6 ${hasHall ? 'text-primary' : 'text-muted-foreground'}`} />
                  <Label className="text-xs">Hall</Label>
                  <Switch checked={hasHall} onCheckedChange={setHasHall} />
                </div>
                <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50">
                  <Car className={`w-6 h-6 ${hasParking ? 'text-primary' : 'text-muted-foreground'}`} />
                  <Label className="text-xs">Parking</Label>
                  <Switch checked={hasParking} onCheckedChange={setHasParking} />
                </div>
              </div>

              {/* Plot Size */}
              <div>
                <Label className="flex items-center gap-2 mb-3">
                  <Ruler className="w-4 h-4 text-primary" />
                  Plot Size: <span className="font-bold text-primary">{plotSize} sq ft</span>
                </Label>
                <Slider
                  value={[plotSize]}
                  onValueChange={([val]) => setPlotSize(val)}
                  min={500}
                  max={5000}
                  step={100}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>500 sq ft</span>
                  <span>5000 sq ft</span>
                </div>
              </div>

              {/* Floors */}
              <div>
                <Label className="flex items-center gap-2 mb-3">
                  <Layers className="w-4 h-4 text-primary" />
                  Number of Floors: <span className="font-bold text-primary">{floors}</span>
                </Label>
                <Slider
                  value={[floors]}
                  onValueChange={([val]) => setFloors(val)}
                  min={1}
                  max={4}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Ground</span>
                  <span>G+3</span>
                </div>
              </div>

              {/* Budget */}
              <div>
                <Label className="flex items-center gap-2 mb-3">
                  <IndianRupee className="w-4 h-4 text-primary" />
                  Budget Range: <span className="font-bold text-primary">{formatCurrency(budget[0])} - {formatCurrency(budget[1])}</span>
                </Label>
                <Slider
                  value={budget}
                  onValueChange={setBudget}
                  min={500000}
                  max={20000000}
                  step={500000}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>₹5 Lakh</span>
                  <span>₹2 Crore</span>
                </div>
              </div>

              {/* Generate Button */}
              <Button
                onClick={generatePlan}
                disabled={isGenerating}
                variant="gradient"
                size="xl"
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating Your Home...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Design
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>
            </div>
          </motion.div>

          {/* Results Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-3xl border border-border overflow-hidden shadow-elevated min-h-[600px]"
          >
            <AnimatePresence mode="wait">
              {!plan && !isGenerating && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center p-8 text-center"
                >
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6">
                    <Building className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-2">Your Design Awaits</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Configure your home requirements and click "Generate Design" to see your personalized home plan.
                  </p>
                </motion.div>
              )}

              {isGenerating && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center p-8 text-center"
                >
                  <div className="relative mb-6">
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-pulse">
                      <Sparkles className="w-12 h-12 text-white animate-spin" />
                    </div>
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary to-accent blur-xl opacity-50 animate-pulse" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-2">AI is Designing...</h3>
                  <p className="text-muted-foreground">Creating your personalized home plan</p>
                </motion.div>
              )}

              {plan && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="h-full flex flex-col"
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-primary to-accent p-6">
                    <h3 className="text-2xl font-display font-bold text-white mb-1">{plan.designName}</h3>
                    <p className="text-white/80">{plan.style} • {plan.totalArea} sq ft</p>
                  </div>

                  {/* Tabs */}
                  <div className="flex border-b border-border">
                    {(['layout', 'cost', 'timeline'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-3 text-sm font-medium transition-colors ${
                          activeTab === tab 
                            ? 'text-primary border-b-2 border-primary' 
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <div className="flex-1 overflow-y-auto p-6">
                    {activeTab === 'layout' && (
                      <div className="space-y-6">
                        {/* Room Grid Visualization */}
                        <div className="grid grid-cols-3 gap-2">
                          {plan.rooms.map((room, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.1 }}
                              className={`relative bg-gradient-to-br ${getRoomColor(room.name)} rounded-xl p-3 text-white aspect-square flex flex-col justify-center items-center text-center`}
                              style={{ gridColumn: room.area > 150 ? 'span 2' : 'span 1' }}
                            >
                              <p className="font-bold text-sm">{room.name}</p>
                              <p className="text-xs opacity-80">{room.area} sq ft</p>
                            </motion.div>
                          ))}
                        </div>

                        {/* Features */}
                        <div>
                          <h4 className="font-bold mb-3">Key Features</h4>
                          <div className="flex flex-wrap gap-2">
                            {plan.features.map((feature, idx) => (
                              <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                                <CheckCircle2 className="w-3 h-3" />
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Materials */}
                        <div>
                          <h4 className="font-bold mb-3">Recommended Materials</h4>
                          <div className="grid grid-cols-2 gap-3">
                            {Object.entries(plan.materials).map(([key, value]) => (
                              <div key={key} className="p-3 rounded-xl bg-muted/50">
                                <p className="text-xs text-muted-foreground capitalize">{key}</p>
                                <p className="font-medium text-sm">{value}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'cost' && (
                      <div className="space-y-6">
                        {/* Total Cost */}
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 text-center">
                          <p className="text-sm text-muted-foreground mb-1">Estimated Total Cost</p>
                          <p className="text-3xl font-display font-bold text-gradient-primary">
                            {formatCurrency(plan.estimatedCost.min)} - {formatCurrency(plan.estimatedCost.max)}
                          </p>
                        </div>

                        {/* Breakdown */}
                        <div>
                          <h4 className="font-bold mb-3">Cost Breakdown</h4>
                          <div className="space-y-3">
                            {Object.entries(plan.estimatedCost.breakdown).map(([key, value]) => (
                              <div key={key} className="flex items-center justify-between">
                                <span className="text-sm capitalize text-muted-foreground">{key.replace(/_/g, ' ')}</span>
                                <span className="font-medium">{formatCurrency(value)}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tips */}
                        <div>
                          <h4 className="font-bold mb-3">Cost Saving Tips</h4>
                          <ul className="space-y-2">
                            {plan.tips.map((tip, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {activeTab === 'timeline' && (
                      <div className="space-y-6">
                        {/* Total Timeline */}
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-secondary/10 to-primary/10 text-center">
                          <p className="text-sm text-muted-foreground mb-1">Estimated Timeline</p>
                          <p className="text-3xl font-display font-bold flex items-center justify-center gap-2">
                            <Calendar className="w-8 h-8 text-primary" />
                            {plan.timeline.total}
                          </p>
                        </div>

                        {/* Phases */}
                        <div className="space-y-4">
                          {plan.timeline.phases.map((phase, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="relative pl-8 pb-4 border-l-2 border-primary/30 last:border-l-0"
                            >
                              <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-primary" />
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <h4 className="font-bold">{phase.name}</h4>
                                  <p className="text-sm text-muted-foreground">{phase.description}</p>
                                </div>
                                <span className="text-sm font-medium text-primary whitespace-nowrap">
                                  {phase.duration}
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Sustainability */}
                        <div>
                          <h4 className="font-bold mb-3">Green Features</h4>
                          <div className="flex flex-wrap gap-2">
                            {plan.sustainability.map((item, idx) => (
                              <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-success/10 text-success text-sm">
                                <CheckCircle2 className="w-3 h-3" />
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="p-4 border-t border-border flex gap-3">
                    <Button variant="outline" className="flex-1" onClick={() => setPlan(null)}>
                      New Design
                    </Button>
                    <Button variant="gradient" className="flex-1">
                      <Download className="w-4 h-4" />
                      Get Quote
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AIHomePlanner;
