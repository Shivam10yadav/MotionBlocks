export const INITIAL_LOGOS = [
  // --- 1. ARCHITECTURE ---
  {
    id: "studio-mono",
    name: "Studio Mono",
    category: "Architecture",
    number: "01",
    desc: "Clean geometric circles overlapping to form a balanced modern emblem.",
    defaultColors: { primary: "#8C5E32", secondary: "#D9822B", accent: "#2C241C" },
    renderSvg: (c) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="75" cy="100" r="48" stroke="${c.primary}" stroke-width="14"/>
      <circle cx="125" cy="100" r="48" stroke="${c.secondary}" stroke-width="14"/>
      <circle cx="100" cy="100" r="14" fill="${c.accent}"/>
    </svg>`,
  },
  {
    id: "horizon-works",
    name: "Horizon",
    category: "Architecture",
    number: "02",
    desc: "Clean dark bars resting on a warm brown base.",
    defaultColors: { primary: "#2C241C", secondary: "#8C5E32", accent: "#D85A38" },
    renderSvg: (c) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="50" width="140" height="20" rx="10" fill="${c.primary}"/>
      <rect x="30" y="90" width="100" height="20" rx="10" fill="${c.secondary}"/>
      <rect x="30" y="130" width="60" height="20" rx="10" fill="${c.accent}"/>
    </svg>`,
  },
  {
    id: "arc-one",
    name: "Arc One",
    category: "Architecture",
    number: "03",
    desc: "Minimal architectural arches stacked into a bold contemporary mark.",
    defaultColors: { primary: "#2C241C", secondary: "#8C5E32", accent: "#D85A38" },
    renderSvg: (c) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M35 160V105C35 55 165 55 165 105V160" stroke="${c.primary}" stroke-width="18" stroke-linecap="round"/>
      <path d="M65 160V110C65 80 135 80 135 110V160" stroke="${c.secondary}" stroke-width="16" stroke-linecap="round"/>
      <rect x="85" y="130" width="30" height="30" rx="8" fill="${c.accent}"/>
    </svg>`,
  },
  {
    id: "cube-form",
    name: "Cube Form",
    category: "Architecture",
    number: "04",
    desc: "An isometric cube with bold contrasting faces and a precise geometric structure.",
    defaultColors: { primary: "#2C241C", secondary: "#8C5E32", accent: "#D9822B" },
    renderSvg: (c) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 25L170 65L100 105L30 65L100 25Z" fill="${c.secondary}"/>
      <path d="M30 65L100 105V180L30 140V65Z" fill="${c.primary}"/>
      <path d="M170 65L100 105V180L170 140V65Z" fill="${c.accent}"/>
    </svg>`,
  },

  // --- 2. CREATIVE ---
  {
    id: "field-notes",
    name: "Field Notes",
    category: "Creative",
    number: "05",
    desc: "Warm archways layered together for modern print and digital layouts.",
    defaultColors: { primary: "#2C241C", secondary: "#D85A38", accent: "#8C5E32" },
    renderSvg: (c) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M45 165 V80 A55 55 0 0 1 155 80 V165 H125 V85 A25 25 0 0 0 75 85 V165 Z" fill="${c.primary}"/>
      <path d="M75 165 V100 A25 25 0 0 1 125 100 V165 Z" fill="${c.secondary}"/>
      <circle cx="100" cy="40" r="10" fill="${c.accent}"/>
    </svg>`,
  },
  {
    id: "paper-goods",
    name: "Paper Goods",
    category: "Creative",
    number: "06",
    desc: "Warm loop line drawn with balanced thick stroke weight.",
    defaultColors: { primary: "#8C5E32", secondary: "#2C241C", accent: "#D85A38" },
    renderSvg: (c) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M35 100 C35 50, 165 50, 165 100 C165 150, 35 150, 35 100 Z" stroke="${c.primary}" stroke-width="16" stroke-linecap="round"/>
      <circle cx="100" cy="100" r="16" fill="${c.secondary}"/>
    </svg>`,
  },
  {
    id: "vertex-studio",
    name: "Vertex Studio",
    category: "Creative",
    number: "07",
    desc: "Dark triangle outline filled with a warm brown inner shape.",
    defaultColors: { primary: "#2C241C", secondary: "#8C5E32", accent: "#D85A38" },
    renderSvg: (c) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 40 L160 40 L100 160 Z" stroke="${c.primary}" stroke-width="14" stroke-linejoin="round"/>
      <path d="M70 65 L130 65 L100 125 Z" fill="${c.secondary}"/>
    </svg>`,
  },
  {
    id: "flora-studio",
    name: "Flora Studio",
    category: "Creative",
    number: "08",
    desc: "A soft geometric flower built from overlapping rounded petals.",
    defaultColors: { primary: "#D85A38", secondary: "#D9822B", accent: "#2C241C" },
    renderSvg: (c) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="55" r="35" fill="${c.primary}"/>
      <circle cx="145" cy="100" r="35" fill="${c.secondary}"/>
      <circle cx="100" cy="145" r="35" fill="${c.primary}"/>
      <circle cx="55" cy="100" r="35" fill="${c.secondary}"/>
      <circle cx="100" cy="100" r="24" fill="${c.accent}"/>
    </svg>`,
  },
  {
    id: "prism-co",
    name: "Prism Co.",
    category: "Creative",
    number: "09",
    desc: "A layered diamond prism built from sharp intersecting geometric planes.",
    defaultColors: { primary: "#D85A38", secondary: "#8C5E32", accent: "#2C241C" },
    renderSvg: (c) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 20L180 100L100 180L20 100L100 20Z" fill="${c.primary}"/>
      <path d="M100 20L180 100H100V20Z" fill="${c.secondary}"/>
      <path d="M20 100H100V180L20 100Z" fill="${c.accent}"/>
      <path d="M100 70L130 100L100 130L70 100L100 70Z" fill="white"/>
    </svg>`,
  },
  {
    id: "mono-wave",
    name: "Mono Wave",
    category: "Creative",
    number: "10",
    desc: "A sculptural M-inspired wave built from two bold flowing strokes.",
    defaultColors: { primary: "#2C241C", secondary: "#D85A38", accent: "#8C5E32" },
    renderSvg: (c) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 155V45L80 115L100 80L120 115L170 45V155" stroke="${c.primary}" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M65 150L100 95L135 150" stroke="${c.secondary}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="100" cy="80" r="9" fill="${c.accent}"/>
    </svg>`,
  },
  {
    id: "bloom",
    name: "Bloom",
    category: "Creative",
    number: "11",
    desc: "Six sculptural petals radiating from a compact dark central core.",
    defaultColors: { primary: "#D85A38", secondary: "#D9822B", accent: "#2C241C" },
    renderSvg: (c) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="55" rx="25" ry="42" fill="${c.primary}"/>
      <ellipse cx="139" cy="78" rx="25" ry="42" transform="rotate(60 139 78)" fill="${c.secondary}"/>
      <ellipse cx="139" cy="122" rx="25" ry="42" transform="rotate(120 139 122)" fill="${c.primary}"/>
      <ellipse cx="100" cy="145" rx="25" ry="42" fill="${c.secondary}"/>
      <ellipse cx="61" cy="122" rx="25" ry="42" transform="rotate(60 61 122)" fill="${c.primary}"/>
      <ellipse cx="61" cy="78" rx="25" ry="42" transform="rotate(120 61 78)" fill="${c.secondary}"/>
      <circle cx="100" cy="100" r="20" fill="${c.accent}"/>
    </svg>`,
  },

  // --- 3. TECH & RESEARCH ---
  {
    id: "north-star",
    name: "North Star",
    category: "Tech & Research",
    number: "12",
    desc: "Sharp dark emblem cut with warm brown central points.",
    defaultColors: { primary: "#2C241C", secondary: "#8C5E32", accent: "#D9822B" },
    renderSvg: (c) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 15 L118 82 L185 100 L118 118 L100 185 L82 118 L15 100 L82 82 Z" fill="${c.primary}"/>
      <path d="M100 45 L112 88 L155 100 L112 112 L100 155 L88 112 L45 100 L88 88 Z" fill="${c.secondary}"/>
    </svg>`,
  },
  {
    id: "apex-lab",
    name: "Apex Lab",
    category: "Tech & Research",
    number: "13",
    desc: "Dark structural pyramid design with a warm brown core.",
    defaultColors: { primary: "#2C241C", secondary: "#8C5E32", accent: "#D85A38" },
    renderSvg: (c) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="100,25 170,165 125,165 100,115 75,165 30,165" fill="${c.primary}"/>
      <polygon points="100,65 140,145 120,145 100,105 80,145 60,145" fill="${c.secondary}"/>
      <circle cx="100" cy="140" r="12" fill="${c.accent}"/>
    </svg>`,
  },
  {
    id: "solaris",
    name: "Solaris",
    category: "Tech & Research",
    number: "14",
    desc: "Radial sunburst emblem constructed from solid warm shapes.",
    defaultColors: { primary: "#8C5E32", secondary: "#D9822B", accent: "#2C241C" },
    renderSvg: (c) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="92" y="20" width="16" height="160" rx="8" fill="${c.primary}"/>
      <rect x="20" y="92" width="160" height="16" rx="8" fill="${c.primary}"/>
      <rect x="44" y="44" width="112" height="112" rx="8" transform="rotate(45 100 100)" fill="${c.secondary}"/>
    </svg>`,
  },
  {
    id: "orbit-house",
    name: "Orbit House",
    category: "Tech & Research",
    number: "15",
    desc: "A futuristic orbital mark with a glowing central core and sweeping rings.",
    defaultColors: { primary: "#2C241C", secondary: "#8C5E32", accent: "#D9822B" },
    renderSvg: (c) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="100" rx="78" ry="32" stroke="${c.primary}" stroke-width="12" transform="rotate(-25 100 100)"/>
      <ellipse cx="100" cy="100" rx="78" ry="32" stroke="${c.secondary}" stroke-width="12" transform="rotate(35 100 100)"/>
      <circle cx="100" cy="100" r="25" fill="${c.accent}"/>
      <circle cx="100" cy="100" r="10" fill="${c.primary}"/>
    </svg>`,
  },
  {
    id: "grid-works",
    name: "Grid Works",
    category: "Tech & Research",
    number: "16",
    desc: "A modular grid of rounded blocks forming a structured digital identity.",
    defaultColors: { primary: "#2C241C", secondary: "#8C5E32", accent: "#D85A38" },
    renderSvg: (c) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="30" width="55" height="55" rx="14" fill="${c.primary}"/>
      <rect x="115" y="30" width="55" height="55" rx="14" fill="${c.secondary}"/>
      <rect x="30" y="115" width="55" height="55" rx="14" fill="${c.secondary}"/>
      <rect x="115" y="115" width="55" height="55" rx="14" fill="${c.primary}"/>
      <circle cx="100" cy="100" r="22" fill="${c.accent}"/>
    </svg>`,
  },
  {
    id: "nova-labs",
    name: "Nova Labs",
    category: "Tech & Research",
    number: "17",
    desc: "A dynamic exploding star mark designed with rounded geometric energy.",
    defaultColors: { primary: "#2C241C", secondary: "#D9822B", accent: "#D85A38" },
    renderSvg: (c) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 20L115 72L160 40L130 85L185 100L130 115L160 160L115 128L100 180L85 128L40 160L70 115L15 100L70 85L40 40L85 72L100 20Z" fill="${c.primary}"/>
      <circle cx="100" cy="100" r="32" fill="${c.secondary}"/>
      <circle cx="100" cy="100" r="13" fill="${c.accent}"/>
    </svg>`,
  },
  {
    id: "signal",
    name: "Signal",
    category: "Tech & Research",
    number: "18",
    desc: "A bold ascending signal icon with soft rounded forms and strong rhythm.",
    defaultColors: { primary: "#2C241C", secondary: "#8C5E32", accent: "#D9822B" },
    renderSvg: (c) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="120" width="28" height="50" rx="14" fill="${c.primary}"/>
      <rect x="72" y="85" width="28" height="85" rx="14" fill="${c.secondary}"/>
      <rect x="114" y="50" width="28" height="120" rx="14" fill="${c.accent}"/>
      <circle cx="156" cy="35" r="14" fill="${c.primary}"/>
    </svg>`,
  },
  {
    id: "kinetic",
    name: "Kinetic",
    category: "Tech & Research",
    number: "19",
    desc: "Angular directional forms arranged into a fast-moving abstract symbol.",
    defaultColors: { primary: "#2C241C", secondary: "#D85A38", accent: "#D9822B" },
    renderSvg: (c) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25 55H120L95 25H170L105 100L170 175H95L120 145H25L80 100L25 55Z" fill="${c.primary}"/>
      <path d="M85 70H150L120 100L150 130H85L115 100L85 70Z" fill="${c.secondary}"/>
      <circle cx="100" cy="100" r="11" fill="${c.accent}"/>
    </svg>`,
  },
  {
    id: "atlas",
    name: "Atlas",
    category: "Tech & Research",
    number: "20",
    desc: "A stylized globe formed with strong latitude and longitude curves.",
    defaultColors: { primary: "#2C241C", secondary: "#8C5E32", accent: "#D9822B" },
    renderSvg: (c) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="72" stroke="${c.primary}" stroke-width="12"/>
      <ellipse cx="100" cy="100" rx="35" ry="72" stroke="${c.secondary}" stroke-width="10"/>
      <path d="M32 100H168" stroke="${c.accent}" stroke-width="10" stroke-linecap="round"/>
      <path d="M45 65H155M45 135H155" stroke="${c.secondary}" stroke-width="8" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: "focus",
    name: "Focus",
    category: "Tech & Research",
    number: "21",
    desc: "A precise target-inspired mark with square framing and a sharp center.",
    defaultColors: { primary: "#2C241C", secondary: "#8C5E32", accent: "#D85A38" },
    renderSvg: (c) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="35" y="35" width="130" height="130" rx="24" stroke="${c.primary}" stroke-width="14"/>
      <rect x="65" y="65" width="70" height="70" rx="14" stroke="${c.secondary}" stroke-width="12"/>
      <path d="M100 82L118 100L100 118L82 100L100 82Z" fill="${c.accent}"/>
    </svg>`,
  },

  // --- 4. LIFESTYLE & MEDIA ---
  {
    id: "haven-co",
    name: "Haven Co.",
    category: "Lifestyle & Media",
    number: "22",
    desc: "Terracotta shield mark with clean symmetrical cuts.",
    defaultColors: { primary: "#D85A38", secondary: "#D9822B", accent: "#2C241C" },
    renderSvg: (c) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 25 L165 58 V115 C165 152 132 175 100 185 V25 Z" fill="${c.primary}"/>
      <path d="M100 25 L35 58 V115 C35 152 68 175 100 185 V25 Z" fill="${c.secondary}"/>
    </svg>`,
  },
  {
    id: "pulse-media",
    name: "Pulse Media",
    category: "Lifestyle & Media",
    number: "23",
    desc: "Dark audio rings centered around a warm brown core.",
    defaultColors: { primary: "#2C241C", secondary: "#8C5E32", accent: "#D9822B" },
    renderSvg: (c) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="70" stroke="${c.primary}" stroke-width="12"/>
      <circle cx="100" cy="100" r="45" stroke="${c.secondary}" stroke-width="10"/>
      <circle cx="100" cy="100" r="20" fill="${c.primary}"/>
    </svg>`,
  },
  {
    id: "echo-line",
    name: "Echo Line",
    category: "Lifestyle & Media",
    number: "24",
    desc: "A flowing waveform transformed into a smooth and expressive symbol.",
    defaultColors: { primary: "#2C241C", secondary: "#D85A38", accent: "#D9822B" },
    renderSvg: (c) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 100C40 35 60 35 80 100C100 165 120 165 140 100C160 35 180 35 190 70" stroke="${c.primary}" stroke-width="16" stroke-linecap="round"/>
      <path d="M20 135C45 85 65 85 90 135C115 185 140 185 180 115" stroke="${c.secondary}" stroke-width="12" stroke-linecap="round"/>
      <circle cx="100" cy="100" r="10" fill="${c.accent}"/>
    </svg>`,
  },
  {
    id: "luna-mark",
    name: "Luna",
    category: "Lifestyle & Media",
    number: "25",
    desc: "A modern crescent composition with a small orbiting accent.",
    defaultColors: { primary: "#2C241C", secondary: "#D9822B", accent: "#D85A38" },
    renderSvg: (c) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="95" cy="105" r="65" fill="${c.primary}"/>
      <circle cx="125" cy="80" r="65" fill="white"/>
      <circle cx="150" cy="145" r="16" fill="${c.secondary}"/>
      <circle cx="160" cy="45" r="10" fill="${c.accent}"/>
    </svg>`,
  },
  {
    id: "flow-state",
    name: "Flow State",
    category: "Lifestyle & Media",
    number: "26",
    desc: "Two fluid ribbons crossing into an elegant infinity-inspired form.",
    defaultColors: { primary: "#8C5E32", secondary: "#D85A38", accent: "#2C241C" },
    renderSvg: (c) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25 105C50 45 85 45 100 100C115 155 150 155 175 95" stroke="${c.primary}" stroke-width="22" stroke-linecap="round"/>
      <path d="M25 95C50 155 85 155 100 100C115 45 150 45 175 105" stroke="${c.secondary}" stroke-width="16" stroke-linecap="round"/>
      <circle cx="100" cy="100" r="9" fill="${c.accent}"/>
    </svg>`,
  },
  {
    id: "summit",
    name: "Summit",
    category: "Lifestyle & Media",
    number: "27",
    desc: "Layered mountain peaks with a warm rising sun at the center.",
    defaultColors: { primary: "#2C241C", secondary: "#8C5E32", accent: "#D9822B" },
    renderSvg: (c) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="145" cy="55" r="25" fill="${c.accent}"/>
      <path d="M20 165L75 65L125 145L150 105L185 165H20Z" fill="${c.primary}"/>
      <path d="M55 165L105 80L145 165H55Z" fill="${c.secondary}"/>
    </svg>`,
  },
  {
    id: "ripple",
    name: "Ripple",
    category: "Lifestyle & Media",
    number: "28",
    desc: "Smooth expanding arcs inspired by water movement and natural flow.",
    defaultColors: { primary: "#2C241C", secondary: "#8C5E32", accent: "#D85A38" },
    renderSvg: (c) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M35 100C55 70 145 70 165 100" stroke="${c.primary}" stroke-width="14" stroke-linecap="round"/>
      <path d="M20 125C45 85 155 85 180 125" stroke="${c.secondary}" stroke-width="14" stroke-linecap="round"/>
      <path d="M50 75C65 55 135 55 150 75" stroke="${c.accent}" stroke-width="12" stroke-linecap="round"/>
      <circle cx="100" cy="135" r="13" fill="${c.primary}"/>
    </svg>`,
  },
  {
    id: "halo",
    name: "Halo",
    category: "Lifestyle & Media",
    number: "29",
    desc: "A refined circular halo with a floating inner sphere and balanced spacing.",
    defaultColors: { primary: "#D85A38", secondary: "#8C5E32", accent: "#2C241C" },
    renderSvg: (c) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="72" stroke="${c.primary}" stroke-width="18"/>
      <circle cx="100" cy="100" r="42" stroke="${c.secondary}" stroke-width="12"/>
      <circle cx="100" cy="100" r="18" fill="${c.accent}"/>
      <circle cx="158" cy="55" r="10" fill="${c.secondary}"/>
    </svg>`,
  },
  {
    id: "ember",
    name: "Ember",
    category: "Lifestyle & Media",
    number: "30",
    desc: "A layered flame symbol combining soft curves with a strong central spark.",
    defaultColors: { primary: "#D85A38", secondary: "#D9822B", accent: "#2C241C" },
    renderSvg: (c) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 20C135 60 170 90 160 135C153 168 128 185 100 185C65 185 38 160 42 125C46 88 75 72 100 20Z" fill="${c.primary}"/>
      <path d="M105 75C125 105 135 120 125 145C120 157 111 165 100 165C84 165 72 153 74 136C76 116 92 104 105 75Z" fill="${c.secondary}"/>
      <path d="M100 115L112 140L100 155L88 140L100 115Z" fill="${c.accent}"/>
    </svg>`,
  },
];