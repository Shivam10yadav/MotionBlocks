import { Atom, Braces, Code2, Terminal, FileCode } from "lucide-react";

export const FORMAT_TABS = [
  { id: "ReactImport", label: "React @import", icon: Atom, desc: "Place at top of index.css or App.css" },
  { id: "ReactStyle", label: "React Style Tag", icon: Braces, desc: "Inline style object for React JSX" },
  { id: "Link", label: "HTML Link", icon: Code2, desc: "Paste in public/index.html <head>" },
  { id: "Tailwind", label: "Tailwind Config", icon: Terminal, desc: "Extend font-family in tailwind.config.js" },
  { id: "CSS", label: "Raw CSS Rule", icon: FileCode, desc: "Standard CSS font-family declaration" },
];

export const CATALOG = [
  // --- Original Selection ---
  { id: "plus-jakarta-sans", name: "Plus Jakarta Sans", category: "Sans", weights: [400, 500, 600, 700, 800], fallback: "sans-serif", desc: "Ultra-crisp geometric sans crafted for modern tech interfaces.", tagline: "Crisp & Precise" },
  { id: "sora", name: "Sora", category: "Display", weights: [400, 600, 700, 800], fallback: "sans-serif", desc: "Futuristic display typeface with high legibility at micro scales.", tagline: "Futuristic Tech" },
  { id: "dm-sans", name: "DM Sans", category: "Sans", weights: [400, 500, 700], fallback: "sans-serif", desc: "Low-contrast geometric sans built for clean digital body copy.", tagline: "Minimalist Workhorse" },
  { id: "outfit", name: "Outfit", category: "Sans", weights: [400, 500, 600, 700, 800], fallback: "sans-serif", desc: "Sharp geometric font with balanced proportion and clean curves.", tagline: "Modern Geometric" },
  { id: "space-grotesk", name: "Space Grotesk", category: "Sans", weights: [400, 500, 700], fallback: "sans-serif", desc: "Proportional grotesk with a technical, confident developer feel.", tagline: "Tech & Geometric" },
  { id: "urbanist", name: "Urbanist", category: "Sans", weights: [400, 500, 600, 700, 800], fallback: "sans-serif", desc: "Low-contrast, highly geometric non-directional display font.", tagline: "Contemporary Elegance" },
  { id: "syne", name: "Syne", category: "Display", weights: [400, 600, 700, 800], fallback: "sans-serif", desc: "Extravagant wide display face designed for avant-garde layouts.", tagline: "Bold Editorial" },
  { id: "inter", name: "Inter", category: "Sans", weights: [400, 500, 600, 700], fallback: "sans-serif", desc: "The definitive open-source interface font with micro-metrics.", tagline: "Digital Standard" },
  { id: "fraunces", name: "Fraunces", category: "Serif", weights: [400, 500, 600, 700], fallback: "serif", desc: "A wonky, warm variable serif built for expressive display type.", tagline: "Warm & Expressive" },
  { id: "playfair", name: "Playfair Display", category: "Serif", weights: [400, 600, 700], fallback: "serif", desc: "Classic transitional serif with sharp, dramatic contrast.", tagline: "Editorial Luxe" },
  { id: "bricolage-grotesque", name: "Bricolage Grotesque", category: "Display", weights: [400, 600, 700, 800], fallback: "sans-serif", desc: "Eccentric grotesk combining historical and modern expressive quirks.", tagline: "Expressive Display" },
  { id: "manrope", name: "Manrope", category: "Sans", weights: [400, 500, 700, 800], fallback: "sans-serif", desc: "Modern geometric sans with semi-condensed terminals.", tagline: "Clean UI" },
  { id: "jetbrains-mono", name: "JetBrains Mono", category: "Mono", weights: [400, 500, 700], fallback: "monospace", desc: "Developer-focused monospace with clear character distinction.", tagline: "Code First" },
  { id: "ibm-plex-mono", name: "IBM Plex Mono", category: "Mono", weights: [400, 500, 600], fallback: "monospace", desc: "Corporate monospace with humanist warmth and technical precision.", tagline: "Developer Preferred" },
  { id: "lora", name: "Lora", category: "Serif", weights: [400, 500, 600], fallback: "serif", desc: "Balanced serif with brushed curves, optimized for reading.", tagline: "Modern Literature" },
  { id: "unbounded", name: "Unbounded", category: "Display", weights: [400, 600, 800], fallback: "sans-serif", desc: "Ultra-wide geometric variable face for headline impact.", tagline: "Futuristic Display" },
  { id: "bebas-neue", name: "Bebas Neue", category: "Display", weights: [400], fallback: "sans-serif", desc: "Tall, condensed all-caps display face for bold headlines.", tagline: "Impact Headlines" },
  { id: "caveat", name: "Caveat", category: "Handwritten", weights: [400, 600, 700], fallback: "cursive", desc: "Casual handwriting style with a natural, penned feel.", tagline: "Human Touch" },

  // --- Added Unique & High-Aesthetic Fonts ---
  { id: "clash-display", name: "Cabinet Grotesk", category: "Display", weights: [400, 500, 700, 800], fallback: "sans-serif", desc: "Neo-grotesque display typeface with bold personality and high contrast.", tagline: "High Contrast Luxe" },
  { id: "instrument-serif", name: "Instrument Serif", category: "Serif", weights: [400], fallback: "serif", desc: "Slim, hyper-refined editorial serif with classic European proportions.", tagline: "High Fashion Editorial" },
  { id: "syne-tactile", name: "Cinzel Decorative", category: "Display", weights: [400, 700], fallback: "serif", desc: "Classical Roman proportions injected with contemporary artistic flourishes.", tagline: "Classical Luxury" },
  { id: "space-mono", name: "Space Mono", category: "Mono", weights: [400, 700], fallback: "monospace", desc: "Fixed-width headline face blending 1960s sci-fi design with modern code context.", tagline: "Retro Sci-Fi Mono" },
  { id: "libre-caslon-display", name: "Libre Caslon Display", category: "Serif", weights: [400], fallback: "serif", desc: "Dramatic, high-contrast serif engineered strictly for editorial hero sections.", tagline: "Dramatic Prestige" },
  { id: "alex-brush", name: "Alex Brush", category: "Handwritten", weights: [400], fallback: "cursive", desc: "Flowing, elegant calligraphic script with flawless joinings.", tagline: "Fluid Calligraphy" },
  { id: "instrument-sans", name: "Instrument Sans", category: "Sans", weights: [400, 500, 600, 700], fallback: "sans-serif", desc: "Modernist, neutral sans with subtle mechanical nuances for modern SaaS.", tagline: "Neutral Tech" },
  { id: "mona-sans", name: "Mona Sans", category: "Sans", weights: [400, 600, 700, 800], fallback: "sans-serif", desc: "Industrial geometric sans built by GitHub for futuristic layouts.", tagline: "Industrial Neo-Grotesk" },
  { id: "corben", name: "Corben", category: "Display", weights: [400, 700], fallback: "cursive", desc: "Soft, bubbly vintage display serif with a warm 1970s aesthetic.", tagline: "Retro Nostalgia" },
  { id: "fira-code", name: "Fira Code", category: "Mono", weights: [400, 500, 700], fallback: "monospace", desc: "Monospaced font packed with programming ligatures for developer UIs.", tagline: "Ligature Specialist" },
  { id: "cormorant-garamond", name: "Cormorant Garamond", category: "Serif", weights: [400, 500, 600, 700], fallback: "serif", desc: "Extremely sharp, traditional Garamond derivative crafted for large display type.", tagline: "Ultra Sharp Serif" },
  { id: "chivo", name: "Chivo", category: "Sans", weights: [400, 600, 800], fallback: "sans-serif", desc: "Grotesque family with aggressive weight contrast ideal for tech headlines.", tagline: "Aggressive Tech" },
];