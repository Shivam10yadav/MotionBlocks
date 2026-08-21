import React, { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Check,
  Download,
  X,
  Palette,
  RotateCcw,
  ArrowDown,
  Sliders,
  Eye
} from "lucide-react";
import { Navbar } from "../localcomponents/Navbar";


gsap.registerPlugin(ScrollTrigger);

// Light Warm Palette
const LIGHT_BG = "#F9F6F0";        // Soft warm linen background
const CARD_BG = "#FFFDF9";         // Bright warm ivory surface
const TEXT_DARK = "#2C241C";       // Deep espresso text
const TEXT_MUTED = "rgba(44, 36, 28, 0.6)"; // Soft muted stone tone
const BORDER_WARM = "rgba(140, 94, 50, 0.2)"; // Soft warm brown border
const ACCENT_BROWN = "#8C5E32";    // Primary warm brown accent
const ACCENT_TERRACOTTA = "#D85A38"; // Soft warm terracotta accent
const ACCENT_AMBER = "#D9822B";     // Soft warm amber accent

// Logo Collection
const INITIAL_LOGOS = [
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
    id: "field-notes",
    name: "Field Notes",
    category: "Publishing",
    number: "02",
    desc: "Warm archways layered together for modern print and digital layouts.",
    defaultColors: { primary: "#2C241C", secondary: "#D85A38", accent: "#8C5E32" },
    renderSvg: (c) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M45 165 V80 A55 55 0 0 1 155 80 V165 H125 V85 A25 25 0 0 0 75 85 V165 Z" fill="${c.primary}"/>
      <path d="M75 165 V100 A25 25 0 0 1 125 100 V165 Z" fill="${c.secondary}"/>
      <circle cx="100" cy="40" r="10" fill="${c.accent}"/>
    </svg>`,
  },
  {
    id: "north-star",
    name: "North Star",
    category: "Ventures",
    number: "03",
    desc: "Sharp dark emblem cut with warm brown central points.",
    defaultColors: { primary: "#2C241C", secondary: "#8C5E32", accent: "#D9822B" },
    renderSvg: (c) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 15 L118 82 L185 100 L118 118 L100 185 L82 118 L15 100 L82 82 Z" fill="${c.primary}"/>
      <path d="M100 45 L112 88 L155 100 L112 112 L100 155 L88 112 L45 100 L88 88 Z" fill="${c.secondary}"/>
    </svg>`,
  },
  {
    id: "haven-co",
    name: "Haven Co.",
    category: "Hospitality",
    number: "04",
    desc: "Terracotta shield mark with clean symmetrical cuts.",
    defaultColors: { primary: "#D85A38", secondary: "#D9822B", accent: "#2C241C" },
    renderSvg: (c) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 25 L165 58 V115 C165 152 132 175 100 185 V25 Z" fill="${c.primary}"/>
      <path d="M100 25 L35 58 V115 C35 152 68 175 100 185 V25 Z" fill="${c.secondary}"/>
    </svg>`,
  },
  {
    id: "paper-goods",
    name: "Paper Goods",
    category: "Stationery",
    number: "05",
    desc: "Warm loop line drawn with balanced thick stroke weight.",
    defaultColors: { primary: "#8C5E32", secondary: "#2C241C", accent: "#D85A38" },
    renderSvg: (c) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M35 100 C35 50, 165 50, 165 100 C165 150, 35 150, 35 100 Z" stroke="${c.primary}" stroke-width="16" stroke-linecap="round"/>
      <circle cx="100" cy="100" r="16" fill="${c.secondary}"/>
    </svg>`,
  },
  {
    id: "apex-lab",
    name: "Apex Lab",
    category: "Research",
    number: "06",
    desc: "Dark structural pyramid design with a warm brown core.",
    defaultColors: { primary: "#2C241C", secondary: "#8C5E32", accent: "#D85A38" },
    renderSvg: (c) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="100,25 170,165 125,165 100,115 75,165 30,165" fill="${c.primary}"/>
      <polygon points="100,65 140,145 120,145 100,105 80,145 60,145" fill="${c.secondary}"/>
      <circle cx="100" cy="140" r="12" fill="${c.accent}"/>
    </svg>`,
  },
  {
    id: "pulse-media",
    name: "Pulse Media",
    category: "Entertainment",
    number: "07",
    desc: "Dark audio rings centered around a warm brown core.",
    defaultColors: { primary: "#2C241C", secondary: "#8C5E32", accent: "#D9822B" },
    renderSvg: (c) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="70" stroke="${c.primary}" stroke-width="12"/>
      <circle cx="100" cy="100" r="45" stroke="${c.secondary}" stroke-width="10"/>
      <circle cx="100" cy="100" r="20" fill="${c.primary}"/>
    </svg>`,
  },
  {
    id: "vertex-studio",
    name: "Vertex Studio",
    category: "Consulting",
    number: "08",
    desc: "Dark triangle outline filled with a warm brown inner shape.",
    defaultColors: { primary: "#2C241C", secondary: "#8C5E32", accent: "#D85A38" },
    renderSvg: (c) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 40 L160 40 L100 160 Z" stroke="${c.primary}" stroke-width="14" stroke-linejoin="round"/>
      <path d="M70 65 L130 65 L100 125 Z" fill="${c.secondary}"/>
    </svg>`,
  },
  {
    id: "solaris",
    name: "Solaris",
    category: "Clean Tech",
    number: "09",
    desc: "Radial sunburst emblem constructed from solid warm shapes.",
    defaultColors: { primary: "#8C5E32", secondary: "#D9822B", accent: "#2C241C" },
    renderSvg: (c) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="92" y="20" width="16" height="160" rx="8" fill="${c.primary}"/>
      <rect x="20" y="92" width="160" height="16" rx="8" fill="${c.primary}"/>
      <rect x="44" y="44" width="112" height="112" rx="8" transform="rotate(45 100 100)" fill="${c.secondary}"/>
    </svg>`,
  },
  {
    id: "horizon-works",
    name: "Horizon",
    category: "Real Estate",
    number: "10",
    desc: "Clean dark bars resting on a warm brown base.",
    defaultColors: { primary: "#2C241C", secondary: "#8C5E32", accent: "#D85A38" },
    renderSvg: (c) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="50" width="140" height="20" rx="10" fill="${c.primary}"/>
      <rect x="30" y="90" width="100" height="20" rx="10" fill="${c.secondary}"/>
      <rect x="30" y="130" width="60" height="20" rx="10" fill="${c.accent}"/>
    </svg>`,
  },
];

const downloadSvg = (markup, filename) => {
  const blob = new Blob([markup], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export default function LogosPage() {
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [modalColors, setModalColors] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [activeLogoIndex, setActiveLogoIndex] = useState(0);

  const containerRef = useRef(null);

  const handleOpenModal = (logo) => {
    setSelectedLogo(logo);
    setModalColors({ ...logo.defaultColors });
  };

  const handleCloseModal = () => {
    setSelectedLogo(null);
    setModalColors(null);
  };

  const handleModalColorChange = (key, val) => {
    setModalColors((prev) => ({ ...prev, [key]: val }));
  };

  const handleResetModalColors = () => {
    if (selectedLogo) {
      setModalColors({ ...selectedLogo.defaultColors });
    }
  };

  const handleCopy = (id, svgMarkup) => {
    navigator.clipboard.writeText(svgMarkup);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  // GSAP Animations: Stacking ScrollTrigger Overlay
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-elem]", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
      });

      const cards = gsap.utils.toArray("[data-stack-card]");
      cards.forEach((card, index) => {
        // Track current active logo for left sidebar preview
        ScrollTrigger.create({
          trigger: card,
          start: "top 35%",
          end: "bottom 35%",
          onEnter: () => setActiveLogoIndex(index),
          onEnterBack: () => setActiveLogoIndex(index),
        });

        // Overlay Card Pinning Animation
        if (index < cards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: "top 18%", // Adjusted for top navbar clearance
            endTrigger: cards[cards.length - 1],
            end: "top 18%",
            pin: true,
            pinSpacing: false,
            scrub: true,
          });

          gsap.to(card, {
            scale: 0.94 - index * 0.015,
            opacity: 0.4,
            ease: "none",
            scrollTrigger: {
              trigger: cards[index + 1],
              start: "top 65%",
              end: "top 18%",
              scrub: true,
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const activeLogoData = INITIAL_LOGOS[activeLogoIndex];

  return (
    <div
      ref={containerRef}
      className="min-h-screen font-sans antialiased selection:bg-[#8C5E32] selection:text-white"
      style={{ backgroundColor: LIGHT_BG, color: TEXT_DARK }}
    >
      <Navbar />

      {/* Main Split View with increased top padding (pt-24 sm:pt-32) to clear navbar */}
      <div className="mx-auto flex max-w-7xl flex-col lg:flex-row lg:gap-12 px-6 pt-24 sm:pt-32 pb-32 sm:px-12">
        
        {/* LEFT COLUMN: Fixed Sticky Sidebar (lg:top-28 ensures offset from navbar) */}
        <aside className="w-full lg:w-5/12 lg:sticky lg:top-28 lg:h-[calc(100vh-140px)] flex flex-col justify-between py-2 mb-12 lg:mb-0">
          <div>
            <p data-hero-elem className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: ACCENT_BROWN }}>
              Component Library
            </p>
            <h1 data-hero-elem className="mt-2 font-display text-4xl sm:text-6xl font-black uppercase leading-[0.95] text-[#2C241C]">
              Browse by <span style={{ color: ACCENT_BROWN }}>Category</span>
            </h1>
            <p data-hero-elem className="mt-4 text-sm leading-relaxed max-w-md" style={{ color: TEXT_MUTED }}>
              Scroll through clean vector logos in warm light tones. Click any card to customize colors and export vector files.
            </p>

            {/* Currently Active Logo Inspector Box */}
            <div
              data-hero-elem
              className="mt-8 rounded-2xl border p-5 shadow-sm"
              style={{ backgroundColor: CARD_BG, borderColor: BORDER_WARM }}
            >
              <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: BORDER_WARM }}>
                <div className="flex items-center gap-2 font-mono text-xs" style={{ color: ACCENT_BROWN }}>
                  <Eye className="h-3.5 w-3.5" />
                  <span>Currently Viewing</span>
                </div>
                <span className="font-mono text-xs" style={{ color: TEXT_MUTED }}>
                  {activeLogoData.number} / {INITIAL_LOGOS.length}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-2xl font-bold uppercase text-[#2C241C]">
                    {activeLogoData.name}
                  </h3>
                  <span
                    className="mt-1 inline-block rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase border"
                    style={{ backgroundColor: LIGHT_BG, borderColor: BORDER_WARM, color: ACCENT_BROWN }}
                  >
                    {activeLogoData.category}
                  </span>
                </div>

                {/* Color Swatches */}
                <div className="flex items-center gap-1.5 rounded-xl border p-2" style={{ backgroundColor: LIGHT_BG, borderColor: BORDER_WARM }}>
                  {Object.values(activeLogoData.defaultColors).map((hex, i) => (
                    <div
                      key={i}
                      className="h-5 w-5 rounded-md border border-black/10"
                      style={{ backgroundColor: hex }}
                      title={hex}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleOpenModal(activeLogoData)}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 font-mono text-xs uppercase tracking-wider font-bold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: ACCENT_BROWN }}
              >
                <Sliders className="h-3.5 w-3.5" />
                <span>Customize Colors</span>
              </button>
            </div>
          </div>

          <div data-hero-elem className="hidden lg:flex items-center gap-3 font-mono text-xs" style={{ color: TEXT_MUTED }}>
            <ArrowDown className="h-4 w-4 animate-bounce" style={{ color: ACCENT_BROWN }} />
            <span>Scroll right side to overlay logos</span>
          </div>
        </aside>

        {/* RIGHT COLUMN: Stacking Logo Cards */}
        <main className="w-full lg:w-7/12 flex flex-col gap-12">
          {INITIAL_LOGOS.map((item) => {
            const defaultSvg = item.renderSvg(item.defaultColors);
            const isCopied = copiedId === item.id;

            return (
              <div
                key={item.id}
                data-stack-card
                onClick={() => handleOpenModal(item)}
                className="group relative flex cursor-pointer flex-col justify-between rounded-3xl border p-7 sm:p-9 transition-shadow duration-300 shadow-md hover:shadow-lg"
                style={{
                  backgroundColor: CARD_BG,
                  borderColor: BORDER_WARM,
                  minHeight: "440px",
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm" style={{ color: TEXT_MUTED }}>{item.number}</span>
                    <span
                      className="rounded-full px-3.5 py-1 font-mono text-xs uppercase tracking-wider border"
                      style={{ backgroundColor: LIGHT_BG, borderColor: BORDER_WARM, color: ACCENT_BROWN }}
                    >
                      {item.category}
                    </span>
                  </div>

                  <div
                    className="flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs"
                    style={{ backgroundColor: LIGHT_BG, borderColor: BORDER_WARM, color: TEXT_MUTED }}
                  >
                    <Palette className="h-3.5 w-3.5" style={{ color: ACCENT_BROWN }} />
                    <span>Customize</span>
                  </div>
                </div>

                {/* SVG Visual Canvas */}
                <div
                  className="my-6 flex h-52 items-center justify-center rounded-2xl border p-6"
                  style={{ backgroundColor: LIGHT_BG, borderColor: BORDER_WARM }}
                >
                  <div
                    className="h-32 w-32 transition-transform duration-300 group-hover:scale-110"
                    dangerouslySetInnerHTML={{ __html: defaultSvg }}
                  />
                </div>

                {/* Card Footer */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-[#2C241C] group-hover:text-[#8C5E32] transition-colors">
                      {item.name}
                    </h2>
                    <p className="mt-1 text-xs max-w-sm leading-relaxed" style={{ color: TEXT_MUTED }}>
                      {item.desc}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleCopy(item.id, defaultSvg)}
                      className="flex items-center gap-2 rounded-xl border px-4 py-3 font-mono text-xs uppercase tracking-wider transition-colors hover:border-[#8C5E32]"
                      style={{ backgroundColor: LIGHT_BG, borderColor: BORDER_WARM, color: TEXT_DARK }}
                    >
                      {isCopied ? (
                        <>
                          <Check className="h-3.5 w-3.5" style={{ color: ACCENT_BROWN }} />
                          <span style={{ color: ACCENT_BROWN }}>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" style={{ color: TEXT_MUTED }} />
                          <span>Copy SVG</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => downloadSvg(defaultSvg, `${item.id}.svg`)}
                      className="flex h-11 w-11 items-center justify-center rounded-xl border transition-colors hover:border-[#8C5E32]"
                      style={{ backgroundColor: LIGHT_BG, borderColor: BORDER_WARM, color: TEXT_MUTED }}
                      title="Download SVG"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </main>
      </div>

      {/* Interactive Modal Color Picker */}
      <AnimatePresence>
        {selectedLogo && modalColors && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-[#2C241C]/40 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl border p-6 shadow-2xl sm:p-8"
              style={{ backgroundColor: CARD_BG, borderColor: BORDER_WARM, color: TEXT_DARK }}
            >
              {/* Top Bar */}
              <div className="flex items-center justify-between border-b pb-6" style={{ borderColor: BORDER_WARM }}>
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest" style={{ color: ACCENT_BROWN }}>
                    Logo Customizer / {selectedLogo.number}
                  </span>
                  <h2 className="mt-1 font-display text-3xl font-black uppercase tracking-tight text-[#2C241C]">
                    {selectedLogo.name}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResetModalColors}
                    className="flex h-10 items-center gap-1.5 rounded-full border px-3 font-mono text-xs transition-colors"
                    style={{ backgroundColor: LIGHT_BG, borderColor: BORDER_WARM, color: TEXT_MUTED }}
                    title="Reset to default colors"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Reset</span>
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="flex h-10 w-10 items-center justify-center rounded-full border transition-colors"
                    style={{ backgroundColor: LIGHT_BG, borderColor: BORDER_WARM, color: TEXT_MUTED }}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="my-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* SVG Live View */}
                <div className="flex h-64 flex-col items-center justify-center rounded-2xl border p-6" style={{ backgroundColor: LIGHT_BG, borderColor: BORDER_WARM }}>
                  <div
                    className="h-40 w-40"
                    dangerouslySetInnerHTML={{
                      __html: selectedLogo.renderSvg(modalColors),
                    }}
                  />
                  <span className="mt-4 font-mono text-[11px]" style={{ color: TEXT_MUTED }}>
                    Live Vector Canvas
                  </span>
                </div>

                {/* Color Controls */}
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-wider" style={{ color: ACCENT_BROWN }}>
                      Change Logo Colors
                    </h3>

                    <div className="mt-4 space-y-3">
                      {Object.entries(modalColors).map(([key, val]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between rounded-xl border p-3"
                          style={{ backgroundColor: LIGHT_BG, borderColor: BORDER_WARM }}
                        >
                          <label className="font-mono text-xs uppercase tracking-wider" style={{ color: TEXT_MUTED }}>
                            {key} Color
                          </label>
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs uppercase text-[#2C241C]">
                              {val}
                            </span>
                            <input
                              type="color"
                              value={val}
                              onChange={(e) => handleModalColorChange(key, e.target.value)}
                              className="h-7 w-7 cursor-pointer rounded-md border-0 bg-transparent p-0"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="mt-6 flex items-center gap-3">
                    <button
                      onClick={() => handleCopy(selectedLogo.id, selectedLogo.renderSvg(modalColors))}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3.5 font-mono text-xs uppercase tracking-wider font-bold text-white transition-opacity hover:opacity-90"
                      style={{ backgroundColor: ACCENT_BROWN }}
                    >
                      {copiedId === selectedLogo.id ? (
                        <>
                          <Check className="h-4 w-4" />
                          <span>Copied SVG</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          <span>Copy SVG Code</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() =>
                        downloadSvg(
                          selectedLogo.renderSvg(modalColors),
                          `${selectedLogo.id}.svg`
                        )
                      }
                      className="flex h-12 w-12 items-center justify-center rounded-xl border transition-colors hover:border-[#8C5E32]"
                      style={{ backgroundColor: LIGHT_BG, borderColor: BORDER_WARM, color: TEXT_DARK }}
                      title="Download SVG"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}