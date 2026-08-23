import React, { useLayoutEffect, useRef, useState, useMemo, useEffect, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Check,
  Download,
  Search,
  Type,
  Code2,
  X,
  Maximize2,
  FileCode,
  Terminal,
  Atom,
  Braces
} from "lucide-react";
import { Navbar } from "../localcomponents/Navbar";

gsap.registerPlugin(ScrollTrigger);

const LIGHT_BG = "#F5F2EB";
const CARD_BG = "#FFFFFF";
const CARD_MUTED = "#FAF8F5";
const TEXT_DARK = "#120F0D";
const TEXT_MUTED = "rgba(18, 15, 13, 0.65)";
const BORDER_WARM = "rgba(115, 74, 38, 0.15)";
const ACCENT_BROWN = "#6B4226";
const ACCENT_SOFT = "rgba(107, 66, 38, 0.08)";

// Code export modes
const FORMAT_TABS = [
  { id: "ReactImport", label: "React @import", icon: Atom, desc: "Place at top of index.css or App.css" },
  { id: "ReactStyle", label: "React Style Tag", icon: Braces, desc: "Inline style object for React JSX" },
  { id: "Link", label: "HTML Link", icon: Code2, desc: "Paste in public/index.html <head>" },
  { id: "Tailwind", label: "Tailwind Config", icon: Terminal, desc: "Extend font-family in tailwind.config.js" },
  { id: "CSS", label: "Raw CSS Rule", icon: FileCode, desc: "Standard CSS font-family declaration" },
];

const CATALOG = [
  { id: "plus-jakarta-sans", name: "Plus Jakarta Sans", category: "Sans", weights: [400, 500, 600, 700, 800], fallback: "sans-serif", desc: "Ultra-crisp geometric sans crafted for modern tech interfaces.", tagline: "Crisp & Precise" },
  { id: "sora", name: "Sora", category: "Display", weights: [400, 600, 700, 800], fallback: "sans-serif", desc: "Futuristic display typeface with high legibility at micro scales.", tagline: "Futuristic Tech" },
  { id: "dm-sans", name: "DM Sans", category: "Sans", weights: [400, 500, 700], fallback: "sans-serif", desc: "Low-contrast geometric sans built for clean digital body copy.", tagline: "Minimalist Workhorse" },
  { id: "outfit", name: "Outfit", category: "Sans", weights: [400, 500, 600, 700, 800], fallback: "sans-serif", desc: "Sharp geometric font with balanced proportion and clean curves.", tagline: "Modern Geometric" },
  { id: "space-grotesk", name: "Space Grotesk", category: "Sans", weights: [400, 500, 700], fallback: "sans-serif", desc: "Proportional grotesk with a technical, confident developer feel.", tagline: "Tech & Geometric" },
  { id: "urbanist", name: "Urbanist", category: "Sans", weights: [400, 500, 600, 700], fallback: "sans-serif", desc: "Low-contrast, highly geometric non-directional display font.", tagline: "Contemporary Elegance" },
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
];

function familyParam(f) {
  return `${f.name.replace(/\s+/g, "+")}:wght@${f.weights.join(";")}`;
}
function stylesheetHref(fonts) {
  return `https://fonts.googleapis.com/css2?${fonts.map((f) => `family=${familyParam(f)}`).join("&")}&display=swap`;
}

// Generate code snippet based on active tab
function snippetFor(font, format) {
  const href = stylesheetHref([font]);
  const slug = font.name.toLowerCase().replace(/\s+/g, "-");

  switch (format) {
    case "ReactImport":
      return `/* In index.css, App.css or style module */\n@import url('${href}');\n\nbody {\n  font-family: '${font.name}', ${font.fallback};\n}`;
    case "ReactStyle":
      return `// JSX Inline style usage\nconst fontStyle = {\n  fontFamily: "'${font.name}', ${font.fallback}"\n};\n\n// Usage in component:\n<div style={{ fontFamily: "'${font.name}', ${font.fallback}" }}>\n  ${font.name} Sample Text\n</div>`;
    case "Link":
      return `<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="${href}" rel="stylesheet">`;
    case "Tailwind":
      return `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      fontFamily: {\n        '${slug}': ['"${font.name}"', '${font.fallback}'],\n      },\n    },\n  },\n};`;
    case "CSS":
    default:
      return `font-family: '${font.name}', ${font.fallback};`;
  }
}

// Robust fallback copy execution
async function executeCopy(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return true;
  } else {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      textArea.remove();
      return true;
    } catch (error) {
      textArea.remove();
      return false;
    }
  }
}

// Card Component
const FontSpecimenCard = memo(({ font, format, previewText, fontSize, fontWeight, letterSpacing, isCopied, onCopy, onSelect }) => {
  const [selectedWeight, setSelectedWeight] = useState(fontWeight || font.weights[0]);

  useEffect(() => {
    if (font.weights.includes(fontWeight)) {
      setSelectedWeight(fontWeight);
    }
  }, [fontWeight, font]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      onClick={() => onSelect(font)}
      className="group relative flex cursor-pointer flex-col justify-between rounded-3xl border p-5 sm:p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      style={{
        backgroundColor: CARD_BG,
        borderColor: BORDER_WARM,
      }}
    >
      <div>
        <div className="flex items-center justify-between border-b pb-3 sm:pb-4" style={{ borderColor: BORDER_WARM }}>
          <div className="flex items-center gap-2">
            <span
              className="rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider font-bold"
              style={{ backgroundColor: ACCENT_SOFT, color: ACCENT_BROWN }}
            >
              {font.category}
            </span>
            <span className="hidden xs:inline-block font-mono text-xs italic truncate max-w-[140px] sm:max-w-none" style={{ color: TEXT_MUTED }}>
              — {font.tagline}
            </span>
          </div>

          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => onCopy(`${font.id}-${format}`, snippetFor(font, format))}
              className="flex items-center gap-1 rounded-full border px-2.5 py-1 font-mono text-[11px] font-bold transition-all hover:bg-[#6B4226] hover:text-white"
              style={{ borderColor: BORDER_WARM, color: TEXT_DARK, backgroundColor: CARD_MUTED }}
            >
              {isCopied ? (
                <>
                  <Check className="h-3 w-3 text-emerald-600" />
                  <span className="text-emerald-600">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" style={{ color: ACCENT_BROWN }} />
                  <span>Copy Code</span>
                </>
              )}
            </button>

            <span className="text-xs p-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: ACCENT_BROWN }}>
              <Maximize2 className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>

        <div className="mt-4 sm:mt-5 flex items-baseline justify-between">
          <h3 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight" style={{ color: TEXT_DARK }}>
            {font.name}
          </h3>
          <span className="font-mono text-xs font-semibold" style={{ color: TEXT_MUTED }}>
            {font.weights.length} Weights
          </span>
        </div>
        <p className="mt-1 text-xs leading-relaxed max-w-sm line-clamp-2" style={{ color: TEXT_MUTED }}>
          {font.desc}
        </p>

        <div
          className="my-4 sm:my-6 min-h-[140px] sm:min-h-[160px] flex items-center justify-center rounded-2xl border p-4 sm:p-6 overflow-hidden transition-all"
          style={{ backgroundColor: CARD_MUTED, borderColor: BORDER_WARM }}
        >
          <p
            className="w-full text-center truncate transition-all duration-150"
            style={{
              fontFamily: `'${font.name}', ${font.fallback}`,
              fontSize: `${fontSize}px`,
              fontWeight: selectedWeight,
              letterSpacing: `${letterSpacing}px`,
              color: TEXT_DARK,
            }}
          >
            {previewText || "Sphinx of black quartz, judge my vow"}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: BORDER_WARM }} onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-wrap items-center gap-1">
          <span className="mr-1 font-mono text-[10px] font-bold uppercase tracking-wider hidden sm:inline" style={{ color: TEXT_MUTED }}>
            Weights:
          </span>
          {font.weights.map((w) => (
            <button
              key={w}
              onClick={() => setSelectedWeight(w)}
              className="rounded-md px-1.5 py-0.5 font-mono text-[10px] sm:text-[11px] font-semibold transition-colors"
              style={{
                backgroundColor: selectedWeight === w ? ACCENT_BROWN : "transparent",
                color: selectedWeight === w ? "#FFFFFF" : TEXT_DARK,
                border: selectedWeight === w ? "none" : `1px solid ${BORDER_WARM}`,
              }}
            >
              {w}
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            const ext = format === "Tailwind" ? "js" : format === "CSS" || format === "ReactImport" ? "css" : "txt";
            const blob = new Blob([snippetFor(font, format)], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${font.id}.${ext}`;
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="rounded-xl border p-1.5 transition-colors hover:border-[#6B4226]"
          style={{ borderColor: BORDER_WARM, backgroundColor: CARD_MUTED, color: TEXT_DARK }}
          title="Download Code Snippet"
        >
          <Download className="h-3.5 w-3.5" />
        </button>
      </div>
    </motion.div>
  );
});

// Interactive Specimen Modal with Code Snippet Drawer
const FontModal = ({ font, onClose, format, activeFormat, setFormat, onCopy, isCopied }) => {
  const [modalText, setModalText] = useState("The quick brown fox jumps over the lazy dog");
  const [modalWeight, setModalWeight] = useState(font.weights[0]);
  const [modalSize, setModalSize] = useState(48);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const activeTabObj = FORMAT_TABS.find((t) => t.id === activeFormat) || FORMAT_TABS[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border p-6 sm:p-10 shadow-2xl"
        style={{ backgroundColor: CARD_BG, borderColor: BORDER_WARM }}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-7 sm:right-7 flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:bg-black/5"
          style={{ borderColor: BORDER_WARM, color: TEXT_DARK }}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6" style={{ borderColor: BORDER_WARM }}>
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full px-3 py-0.5 font-mono text-xs uppercase font-bold" style={{ backgroundColor: ACCENT_SOFT, color: ACCENT_BROWN }}>
                {font.category}
              </span>
              <span className="font-mono text-xs italic" style={{ color: TEXT_MUTED }}>
                — {font.tagline}
              </span>
            </div>
            <h2 className="mt-2 font-display text-3xl sm:text-5xl font-black uppercase tracking-tight" style={{ color: TEXT_DARK }}>
              {font.name}
            </h2>
          </div>

          <button
            onClick={() => onCopy(`${font.id}-${activeFormat}`, snippetFor(font, activeFormat))}
            className="flex items-center gap-2 rounded-xl border px-4 py-2.5 font-mono text-xs font-bold transition-all hover:bg-[#6B4226] hover:text-white"
            style={{ borderColor: BORDER_WARM, backgroundColor: CARD_MUTED, color: TEXT_DARK }}
          >
            {isCopied ? (
              <>
                <Check className="h-4 w-4 text-emerald-600" />
                <span className="text-emerald-600">Copied {activeTabObj.label}</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" style={{ color: ACCENT_BROWN }} />
                <span>Copy {activeTabObj.label}</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 rounded-2xl border p-4" style={{ backgroundColor: CARD_MUTED, borderColor: BORDER_WARM }}>
          <input
            type="text"
            value={modalText}
            onChange={(e) => setModalText(e.target.value)}
            className="w-full bg-transparent font-mono text-xs font-semibold outline-none"
            placeholder="Type custom specimen text..."
            style={{ color: TEXT_DARK }}
          />

          <div className="flex items-center gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 sm:border-l sm:pl-4" style={{ borderColor: BORDER_WARM }}>
            <div className="flex items-center gap-1">
              {font.weights.map((w) => (
                <button
                  key={w}
                  onClick={() => setModalWeight(w)}
                  className="rounded-md px-2 py-1 font-mono text-xs font-semibold"
                  style={{
                    backgroundColor: modalWeight === w ? ACCENT_BROWN : "transparent",
                    color: modalWeight === w ? "#FFFFFF" : TEXT_DARK,
                    border: modalWeight === w ? "none" : `1px solid ${BORDER_WARM}`,
                  }}
                >
                  {w}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold" style={{ color: TEXT_MUTED }}>
                {modalSize}px
              </span>
              <input
                type="range"
                min="24"
                max="80"
                value={modalSize}
                onChange={(e) => setModalSize(Number(e.target.value))}
                className="h-1.5 w-20 cursor-pointer accent-[#6B4226]"
              />
            </div>
          </div>
        </div>

        <div className="my-6 rounded-2xl border p-6 sm:p-10 text-center overflow-x-auto" style={{ backgroundColor: LIGHT_BG, borderColor: BORDER_WARM }}>
          <p
            style={{
              fontFamily: `'${font.name}', ${font.fallback}`,
              fontSize: `${modalSize}px`,
              fontWeight: modalWeight,
              color: TEXT_DARK,
              lineHeight: 1.2,
            }}
          >
            {modalText || "Aa Bb Cc"}
          </p>
        </div>

        {/* TABBED CODE EXPORTER */}
        <div className="mt-8 rounded-2xl border p-5" style={{ backgroundColor: CARD_MUTED, borderColor: BORDER_WARM }}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 mb-4" style={{ borderColor: BORDER_WARM }}>
            <h4 className="font-mono text-xs uppercase tracking-wider font-bold" style={{ color: ACCENT_BROWN }}>
              Export Code Snippet
            </h4>
            <span className="font-mono text-xs italic" style={{ color: TEXT_MUTED }}>
              {activeTabObj.desc}
            </span>
          </div>

          {/* Format Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {FORMAT_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeFormat === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFormat(tab.id)}
                  className="flex items-center gap-1.5 rounded-xl px-3.5 py-2 font-mono text-xs font-bold transition-all shrink-0"
                  style={{
                    backgroundColor: isActive ? ACCENT_BROWN : CARD_BG,
                    color: isActive ? "#FFFFFF" : TEXT_DARK,
                    border: `1px solid ${isActive ? ACCENT_BROWN : BORDER_WARM}`,
                  }}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Code Drawer */}
          <div className="relative mt-4 rounded-xl border bg-white p-4 font-mono text-xs" style={{ borderColor: BORDER_WARM }}>
            <button
              onClick={() => onCopy(`${font.id}-${activeFormat}`, snippetFor(font, activeFormat))}
              className="absolute top-3 right-3 flex items-center gap-1 rounded-lg border px-2.5 py-1 text-[11px] font-bold transition-all hover:bg-black/5"
              style={{ borderColor: BORDER_WARM, color: TEXT_DARK }}
            >
              {isCopied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" style={{ color: ACCENT_BROWN }} />}
              <span>{isCopied ? "Copied" : "Copy"}</span>
            </button>
            <pre className="overflow-x-auto text-xs leading-relaxed pr-16" style={{ color: TEXT_DARK }}>
              {snippetFor(font, activeFormat)}
            </pre>
          </div>
        </div>

        <div className="space-y-6 border-t pt-8 mt-8" style={{ borderColor: BORDER_WARM }}>
          <h4 className="font-mono text-xs uppercase tracking-wider font-bold" style={{ color: ACCENT_BROWN }}>
            Full Character Specimen
          </h4>
          <div className="space-y-4 font-mono text-sm leading-relaxed tracking-wider break-words" style={{ fontFamily: `'${font.name}', ${font.fallback}`, color: TEXT_DARK }}>
            <div>
              <p className="text-xs font-sans text-neutral-400 mb-1">Uppercase</p>
              <p className="text-lg">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
            </div>
            <div>
              <p className="text-xs font-sans text-neutral-400 mb-1">Lowercase</p>
              <p className="text-lg">abcdefghijklmnopqrstuvwxyz</p>
            </div>
            <div>
              <p className="text-xs font-sans text-neutral-400 mb-1">Numbers & Symbols</p>
              <p className="text-lg">0123456789 !@#$%^&amp;*()_+-=[]{}|;:'",.&lt;&gt;/?</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main Page Component
export default function FontsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [format, setFormat] = useState("ReactImport");
  const [previewText, setPreviewText] = useState("Crisp design is intelligence made visible.");
  const [fontSize, setFontSize] = useState(36);
  const [fontWeight, setFontWeight] = useState(400);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [copiedId, setCopiedId] = useState(null);
  const [selectedFontModal, setSelectedFontModal] = useState(null);

  const containerRef = useRef(null);

  const categories = useMemo(() => ["All", ...Array.from(new Set(CATALOG.map((f) => f.category)))], []);

  const filteredFonts = useMemo(
    () =>
      CATALOG.filter(
        (f) => (category === "All" || f.category === category) && f.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search, category]
  );

  useEffect(() => {
    if (!document.getElementById("mb-fonts-sheet")) {
      const link = document.createElement("link");
      link.id = "mb-fonts-sheet";
      link.rel = "stylesheet";
      link.href = stylesheetHref(CATALOG);
      document.head.appendChild(link);
    }
  }, []);

  const handleCopy = async (id, text) => {
    const success = await executeCopy(text);
    if (success) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen font-sans antialiased pb-32"
      style={{ backgroundColor: LIGHT_BG, color: TEXT_DARK }}
    >
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 sm:px-8 pt-24 sm:pt-32">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 pb-8 sm:pb-12 border-b" style={{ borderColor: BORDER_WARM }}>
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-bold" style={{ color: ACCENT_BROWN }}>
              <Type className="h-4 w-4" />
              <span>Modern Type Laboratory</span>
            </div>
            <h1 className="mt-2 font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#120F0D]">
              Type <span style={{ color: ACCENT_BROWN }}>Studio</span>
            </h1>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base max-w-lg leading-relaxed font-medium" style={{ color: TEXT_MUTED }}>
              Explore curated crisp sans-serifs, modern display faces, and tech-focused monospaced fonts. Switch copy formats or click any card for full specimens.
            </p>
          </div>

          <div
            className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 rounded-3xl border p-3.5 sm:p-4 shadow-sm"
            style={{ backgroundColor: CARD_BG, borderColor: BORDER_WARM }}
          >
            <div className="flex items-center gap-2 rounded-2xl border px-3 py-2 sm:w-48 lg:w-56" style={{ backgroundColor: CARD_MUTED, borderColor: BORDER_WARM }}>
              <Search className="h-4 w-4 shrink-0" style={{ color: TEXT_MUTED }} />
              <input
                type="text"
                placeholder="Find font family..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent font-mono text-xs font-semibold outline-none"
                style={{ color: TEXT_DARK }}
              />
            </div>

            <div className="flex items-center gap-2 rounded-2xl border px-3 py-2 sm:w-52 lg:w-64" style={{ backgroundColor: CARD_MUTED, borderColor: BORDER_WARM }}>
              <input
                type="text"
                placeholder="Custom sample text..."
                value={previewText}
                onChange={(e) => setPreviewText(e.target.value)}
                className="w-full bg-transparent font-mono text-xs font-semibold outline-none"
                style={{ color: TEXT_DARK }}
              />
            </div>

            <div className="flex items-center justify-between sm:justify-start gap-4 px-1 pt-1 sm:pt-0">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] font-bold uppercase" style={{ color: TEXT_MUTED }}>
                  Size ({fontSize}px)
                </span>
                <input
                  type="range"
                  min="20"
                  max="64"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="h-1.5 w-20 sm:w-24 cursor-pointer accent-[#6B4226]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] font-bold uppercase" style={{ color: TEXT_MUTED }}>
                  Space ({letterSpacing}px)
                </span>
                <input
                  type="range"
                  min="-2"
                  max="8"
                  value={letterSpacing}
                  onChange={(e) => setLetterSpacing(Number(e.target.value))}
                  className="h-1.5 w-16 sm:w-20 cursor-pointer accent-[#6B4226]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-8 py-6 sm:py-8 flex items-center justify-between gap-4">
        <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full md:w-auto">
          {categories.map((cat) => {
            const isActive = category === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className="whitespace-nowrap rounded-full px-4 sm:px-5 py-1.5 sm:py-2 font-mono text-xs uppercase tracking-wider font-bold transition-all duration-200"
                style={{
                  backgroundColor: isActive ? ACCENT_BROWN : CARD_BG,
                  color: isActive ? "#FFFFFF" : TEXT_DARK,
                  border: `1px solid ${isActive ? ACCENT_BROWN : BORDER_WARM}`,
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <span className="font-mono text-xs font-semibold hidden md:inline-block shrink-0" style={{ color: TEXT_MUTED }}>
          Showing {filteredFonts.length} of {CATALOG.length} Fonts
        </span>
      </section>

      <main className="mx-auto max-w-7xl px-4 sm:px-8">
        <AnimatePresence mode="popLayout">
          {filteredFonts.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {filteredFonts.map((font) => (
                <FontSpecimenCard
                  key={font.id}
                  font={font}
                  format={format}
                  previewText={previewText}
                  fontSize={fontSize}
                  fontWeight={fontWeight}
                  letterSpacing={letterSpacing}
                  isCopied={copiedId === `${font.id}-${format}`}
                  onCopy={handleCopy}
                  onSelect={(font) => setSelectedFontModal(font)}
                />
              ))}
            </motion.div>
          ) : (
            <div className="my-12 sm:my-16 rounded-3xl border p-12 text-center" style={{ backgroundColor: CARD_BG, borderColor: BORDER_WARM }}>
              <p className="font-mono text-sm font-bold" style={{ color: TEXT_MUTED }}>
                No typeface matches "{search}".
              </p>
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* FLOATING FORMAT TOGGLE TOOLBAR */}
      <div
        className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 sm:gap-2 rounded-full border p-1.5 sm:p-2 shadow-2xl backdrop-blur-md max-w-[92vw] overflow-x-auto no-scrollbar"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.92)", borderColor: BORDER_WARM }}
      >
        <div className="flex items-center gap-1 pl-2 sm:pl-3 pr-1 font-mono text-[11px] sm:text-xs font-bold shrink-0" style={{ color: ACCENT_BROWN }}>
          <Code2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span className="hidden xs:inline">Mode:</span>
        </div>
        {FORMAT_TABS.map((f) => {
          const isActive = format === f.id;
          const Icon = f.icon;
          return (
            <button
              key={f.id}
              onClick={() => setFormat(f.id)}
              className="flex items-center gap-1.5 rounded-full px-3 sm:px-4 py-1.5 font-mono text-xs font-bold transition-all shrink-0"
              style={{
                backgroundColor: isActive ? ACCENT_BROWN : "transparent",
                color: isActive ? "#FFFFFF" : TEXT_DARK,
              }}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{f.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedFontModal && (
          <FontModal
            font={selectedFontModal}
            format={format}
            activeFormat={format}
            setFormat={setFormat}
            isCopied={copiedId === `${selectedFontModal.id}-${format}`}
            onCopy={handleCopy}
            onClose={() => setSelectedFontModal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}