import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are an expert home architect and construction consultant. Generate a detailed home plan based on user requirements.

You MUST respond with a valid JSON object containing these exact fields:
{
  "designName": "string - Creative name for the design",
  "style": "string - Architectural style (Modern, Traditional, Contemporary, etc.)",
  "totalArea": "number - Total area in sq ft",
  "estimatedCost": {
    "min": "number - Minimum cost in INR",
    "max": "number - Maximum cost in INR",
    "breakdown": {
      "foundation": "number",
      "structure": "number",
      "roofing": "number",
      "electrical": "number",
      "plumbing": "number",
      "flooring": "number",
      "painting": "number",
      "fixtures": "number",
      "labor": "number",
      "contingency": "number"
    }
  },
  "timeline": {
    "total": "string - e.g., '8-10 months'",
    "phases": [
      {"name": "string", "duration": "string", "description": "string"}
    ]
  },
  "rooms": [
    {"name": "string", "area": "number in sq ft", "position": "string - e.g., 'Front Left'", "features": ["string"]}
  ],
  "features": ["string - Key features of the design"],
  "materials": {
    "walls": "string",
    "flooring": "string",
    "roofing": "string",
    "windows": "string"
  },
  "sustainability": ["string - Green features"],
  "tips": ["string - Construction tips"]
}

Base your calculations on:
- Budget construction: ₹1,200-1,500 per sq ft
- Standard construction: ₹1,500-2,000 per sq ft
- Premium construction: ₹2,000-3,000 per sq ft
- Luxury construction: ₹3,000+ per sq ft

Consider Indian construction standards and climate. Always provide realistic estimates.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { bedrooms, hasKitchen, hasHall, hasParking, budget, plotSize, floors } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const userPrompt = `Generate a home plan with the following requirements:
- Bedrooms: ${bedrooms}
- Kitchen: ${hasKitchen ? 'Yes' : 'No'}
- Hall/Living Room: ${hasHall ? 'Yes' : 'No'}
- Parking: ${hasParking ? 'Yes (for 1-2 cars)' : 'No'}
- Budget Range: ₹${budget.min.toLocaleString('en-IN')} - ₹${budget.max.toLocaleString('en-IN')}
- Plot Size: ${plotSize} sq ft
- Floors: ${floors}

Create a practical, beautiful home design that fits within the budget. Include all rooms, cost breakdown, timeline, and construction tips. Respond ONLY with the JSON object, no additional text.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    
    // Parse the JSON from the response
    let planData;
    try {
      // Remove markdown code blocks if present
      const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      planData = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error("JSON parse error:", parseError, "Content:", content);
      // Return a fallback plan
      planData = generateFallbackPlan(bedrooms, hasKitchen, hasHall, hasParking, budget, plotSize, floors);
    }

    return new Response(JSON.stringify(planData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Home planner error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

function generateFallbackPlan(bedrooms: number, hasKitchen: boolean, hasHall: boolean, hasParking: boolean, budget: any, plotSize: number, floors: number) {
  const costPerSqFt = budget.max > 5000000 ? 2500 : budget.max > 2000000 ? 1800 : 1400;
  const usableArea = plotSize * 0.6 * floors; // 60% ground coverage
  const totalCost = usableArea * costPerSqFt;
  
  const rooms = [];
  for (let i = 1; i <= bedrooms; i++) {
    rooms.push({ name: `Bedroom ${i}`, area: 150, position: i <= 2 ? 'Front' : 'Back', features: ['Wardrobe', 'Window', 'Attached bathroom'] });
  }
  if (hasKitchen) rooms.push({ name: 'Kitchen', area: 100, position: 'Back', features: ['Modular cabinets', 'Chimney provision', 'Storage'] });
  if (hasHall) rooms.push({ name: 'Living Room', area: 200, position: 'Front Center', features: ['Large windows', 'Open layout', 'TV unit'] });
  if (hasParking) rooms.push({ name: 'Parking', area: 180, position: 'Front', features: ['Covered parking', 'Space for 2 cars'] });
  rooms.push({ name: 'Bathroom', area: 40, position: 'Various', features: ['Modern fixtures', 'Ventilation'] });

  return {
    designName: `${bedrooms}BHK Modern Home`,
    style: 'Contemporary Indian',
    totalArea: usableArea,
    estimatedCost: {
      min: Math.round(totalCost * 0.85),
      max: Math.round(totalCost * 1.15),
      breakdown: {
        foundation: Math.round(totalCost * 0.12),
        structure: Math.round(totalCost * 0.25),
        roofing: Math.round(totalCost * 0.08),
        electrical: Math.round(totalCost * 0.08),
        plumbing: Math.round(totalCost * 0.07),
        flooring: Math.round(totalCost * 0.12),
        painting: Math.round(totalCost * 0.05),
        fixtures: Math.round(totalCost * 0.08),
        labor: Math.round(totalCost * 0.10),
        contingency: Math.round(totalCost * 0.05)
      }
    },
    timeline: {
      total: `${6 + floors * 2}-${8 + floors * 2} months`,
      phases: [
        { name: 'Foundation', duration: '4-6 weeks', description: 'Site clearing, excavation, and foundation work' },
        { name: 'Structure', duration: '8-12 weeks', description: 'RCC frame, walls, and slabs' },
        { name: 'Roofing', duration: '2-3 weeks', description: 'Roof slab and waterproofing' },
        { name: 'MEP Work', duration: '4-6 weeks', description: 'Electrical, plumbing, and HVAC' },
        { name: 'Finishing', duration: '6-8 weeks', description: 'Flooring, painting, and fixtures' }
      ]
    },
    rooms,
    features: ['Vastu compliant design', 'Cross ventilation', 'Earthquake resistant', 'Modern aesthetic'],
    materials: {
      walls: 'AAC blocks with cement plastering',
      flooring: 'Vitrified tiles',
      roofing: 'RCC slab with waterproofing',
      windows: 'UPVC with double glazing'
    },
    sustainability: ['Rainwater harvesting ready', 'Solar panel provision', 'LED lighting throughout'],
    tips: ['Get soil testing done before foundation', 'Use ISI certified materials', 'Keep 10% contingency budget']
  };
}
