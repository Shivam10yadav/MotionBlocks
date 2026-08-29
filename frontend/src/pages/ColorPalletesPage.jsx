import React, { useRef, useState, useMemo, useEffect, memo } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { motion, AnimatePresence } from "framer-motion";

// React Icons
import { 
  RiFileCopyLine, 
  RiCheckLine, 
  RiDownload2Line, 
  RiSearchLine, 
  RiPaletteLine, 
  RiCloseLine, 
  RiHeartLine, 
  RiHeartFill,
  RiMagicLine,
  RiArrowRightLine,
  RiFullscreenLine,
  RiText
} from "react-icons/ri";
import { TbSparkles } from "react-icons/tb";

// External Data File
import { FORMAT_TABS, PALETTES_CATALOG } from "../data/Palettes";
import { Navbar } from "../localcomponents/Navbar";

gsap.registerPlugin(ScrollToPlugin);

// Tokens
const LIGHT_BG = "#F4F1EA";
const CARD_BG = "#FFFFFF";
const CARD_MUTED = "#FAF8F4";
const TEXT_DARK = "#120F0D";
const TEXT_MUTED = "rgba(18, 15, 13, 0.6)";
const BORDER_WARM = "rgba(115, 74, 38, 0.15)";
const ACCENT_BROWN = "#6B4226";
const ACCENT_SOFT = "rgba(107, 66, 38, 0.08)";

function hexToRgb(hex) {
  const cleanHex = hex.replace("#", "");
  const bigint = parseInt(cleanHex, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: 255 & bigint,
  };
}

function isColorLight(hex) {
  const rgb = hexToRgb(hex);
  return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000 > 160;
}

function snippetFor(palette, format) {
  const slug = palette.name.toLowerCase().replace(/\s+/g, "-");
  switch (format) {
    case "CSS":
      return `:root {\n${palette.colors.map((c, i) => `  --color-${slug}-${i + 1}: ${c.hex}; /* ${c.name} */`).join("\n")}\n}`;
    case "Tailwind":
      return `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n        '${slug}': {\n${palette.colors.map((c, i) => `          ${i + 1}00: '${c.hex}', // ${c.name}`).join("\n")}\n        }\n      }\n    }\n  }\n}`;
    case "SCSS":
      return `$palette-${slug}: (\n${palette.colors.map((c, i) => `  "color-${i + 1}": ${c.hex}`).join(",\n")}\n);`;
    case "HEX":
    default:
      return JSON.stringify(palette.colors.map((c) => c.hex), null, 2);
  }
}

async function executeCopy(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return true;
  } else {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      textArea.remove();
      return true;
    } catch {
      textArea.remove();
      return false;
    }
  }
}

// -------------------------------------------------------------
// Accordion Row Component
// -------------------------------------------------------------
const AccordionPaletteRow = memo(({ palette, format, onSelect, onCopy, isFavorite, onFavorite }) => {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [copiedHex, setCopiedHex] = useState(null);

  const handleCopyHex = (e, hex) => {
    e.stopPropagation();
    onCopy(`strip-hex-${hex}`, hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1200);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="group relative rounded-[32px] overflow-hidden border bg-white shadow-sm transition-all duration-500 hover:shadow-2xl mb-8"
      style={{ borderColor: BORDER_WARM }}
    >
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-7 border-b" style={{ borderColor: BORDER_WARM }}>
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => onSelect(palette)}>
          <span className="font-mono text-xs font-black uppercase tracking-widest px-3.5 py-1 rounded-full bg-[#6B4226]/10 text-[#6B4226]">
            {palette.category}
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-[#120F0D]">
            {palette.name}
          </h3>
          <span className="hidden md:inline-block font-mono text-xs italic text-black/50">
            — {palette.tagline}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onFavorite(palette.id)}
            className="p-2.5 rounded-full border transition-all hover:scale-110 active:scale-95"
            style={{
              borderColor: BORDER_WARM,
              backgroundColor: isFavorite ? "rgba(225, 29, 72, 0.1)" : "#FAF8F4",
              color: isFavorite ? "#E11D48" : TEXT_DARK,
            }}
          >
            {isFavorite ? <RiHeartFill className="h-4 w-4 text-rose-600" /> : <RiHeartLine className="h-4 w-4" />}
          </button>

          <button
            onClick={() => onSelect(palette)}
            className="flex items-center gap-2 rounded-full border px-5 py-2.5 font-mono text-xs font-bold transition-all hover:bg-[#6B4226] hover:text-white hover:shadow-md"
            style={{ borderColor: BORDER_WARM, backgroundColor: "#FAF8F4" }}
          >
            <RiFullscreenLine className="h-4 w-4" />
            <span>Inspect & Modal Studio</span>
          </button>
        </div>
      </div>

      {/* Accordion Colors Container */}
      <div className="h-64 sm:h-80 w-full flex">
        {palette.colors.map((c, i) => {
          const light = isColorLight(c.hex);
          const isHovered = hoveredIdx === i;

          return (
            <div
              key={i}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={(e) => handleCopyHex(e, c.hex)}
              className="relative flex-1 h-full flex flex-col justify-between p-6 cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:flex-[3.5] select-none border-r last:border-r-0 border-black/5"
              style={{ backgroundColor: c.hex }}
            >
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <span
                  className="font-mono text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md transition-opacity duration-300"
                  style={{
                    color: light ? "#120F0D" : "#FFFFFF",
                    backgroundColor: light ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)",
                    opacity: isHovered ? 1 : 0.7,
                  }}
                >
                  0{i + 1}
                </span>

                <button
                  className="p-2 rounded-full backdrop-blur-md opacity-0 group-hover/color:opacity-100 transition-all duration-300"
                  style={{
                    color: light ? "#120F0D" : "#FFFFFF",
                    backgroundColor: light ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)",
                  }}
                >
                  {copiedHex === c.hex ? <RiCheckLine className="h-4 w-4 text-emerald-600" /> : <RiFileCopyLine className="h-4 w-4" />}
                </button>
              </div>

              {/* Dynamic Typography Hover Preview */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="my-auto"
                >
                  <p className="font-display text-2xl font-black uppercase tracking-tight" style={{ color: light ? "#120F0D" : "#FFFFFF" }}>
                    Aa Bb Cc
                  </p>
                  <p className="font-mono text-xs font-semibold opacity-80 mt-1" style={{ color: light ? "#120F0D" : "#FFFFFF" }}>
                    Click to copy hex
                  </p>
                </motion.div>
              )}

              {/* Footer Code */}
              <div>
                <p className="font-mono text-xs font-bold uppercase opacity-80" style={{ color: light ? "#120F0D" : "#FFFFFF" }}>
                  {c.name}
                </p>
                <p className="font-mono text-lg sm:text-2xl font-black uppercase tracking-wider" style={{ color: light ? "#120F0D" : "#FFFFFF" }}>
                  {c.hex}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
});

// -------------------------------------------------------------
// FULLSCREEN INSPECTION MODAL STUDIO
// -------------------------------------------------------------
const PaletteModalStudio = ({ palette, onClose, activeFormat, setFormat, onCopy, isCopied }) => {
  const [activeTestBg, setActiveTestBg] = useState(palette.colors[0].hex);
  const [activeTestText, setActiveTestText] = useState(palette.colors[4].hex);
  const [copiedHex, setCopiedHex] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const activeTabObj = FORMAT_TABS.find((t) => t.id === activeFormat) || FORMAT_TABS[0];

  const handleCopyHexLocal = (hex) => {
    onCopy(`modal-hex-${hex}`, hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1400);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 30 }}
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[36px] border p-6 sm:p-10 shadow-2xl"
        style={{ backgroundColor: CARD_BG, borderColor: BORDER_WARM }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 hover:bg-black/5 hover:scale-105"
          style={{ borderColor: BORDER_WARM, color: TEXT_DARK }}
        >
          <RiCloseLine className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6" style={{ borderColor: BORDER_WARM }}>
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full px-3 py-1 font-mono text-xs uppercase font-extrabold" style={{ backgroundColor: ACCENT_SOFT, color: ACCENT_BROWN }}>
                {palette.category}
              </span>
              <span className="font-mono text-xs italic" style={{ color: TEXT_MUTED }}>
                — {palette.tagline}
              </span>
            </div>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl font-black uppercase tracking-tight text-[#120F0D]">
              {palette.name}
            </h2>
          </div>

          <button
            onClick={() => onCopy(`${palette.id}-${activeFormat}`, snippetFor(palette, activeFormat))}
            className="flex items-center gap-2 rounded-2xl border px-5 py-3 font-mono text-xs font-bold transition-all duration-300 hover:bg-[#6B4226] hover:text-white hover:shadow-lg"
            style={{ borderColor: BORDER_WARM, backgroundColor: CARD_MUTED, color: TEXT_DARK }}
          >
            {isCopied ? (
              <>
                <RiCheckLine className="h-4 w-4 text-emerald-600" />
                <span className="text-emerald-600">Copied {activeTabObj.label}</span>
              </>
            ) : (
              <>
                <RiFileCopyLine className="h-4 w-4" style={{ color: ACCENT_BROWN }} />
                <span>Copy {activeTabObj.label} Code</span>
              </>
            )}
          </button>
        </div>

        {/* Big Visual Swatches Bar */}
        <div className="my-8 rounded-3xl overflow-hidden border shadow-xl flex h-48 sm:h-60" style={{ borderColor: BORDER_WARM }}>
          {palette.colors.map((color, idx) => {
            const light = isColorLight(color.hex);
            return (
              <div
                key={idx}
                onClick={() => handleCopyHexLocal(color.hex)}
                className="flex-1 flex flex-col justify-between p-5 cursor-pointer transition-all duration-500 hover:flex-[2] group relative select-none"
                style={{ backgroundColor: color.hex }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="font-mono text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-md"
                    style={{
                      color: light ? "#120F0D" : "#FFFFFF",
                      backgroundColor: light ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.35)",
                    }}
                  >
                    #{idx + 1}
                  </span>
                  <span
                    className="p-2 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                    style={{
                      color: light ? "#120F0D" : "#FFFFFF",
                      backgroundColor: light ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.35)",
                    }}
                  >
                    {copiedHex === color.hex ? <RiCheckLine className="h-4 w-4 text-emerald-600" /> : <RiFileCopyLine className="h-4 w-4" />}
                  </span>
                </div>

                <div>
                  <p className="font-mono text-xs font-bold uppercase opacity-80" style={{ color: light ? "#120F0D" : "#FFFFFF" }}>
                    {color.name}
                  </p>
                  <p className="font-mono text-lg sm:text-2xl font-black uppercase tracking-wider" style={{ color: light ? "#120F0D" : "#FFFFFF" }}>
                    {color.hex}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Typography & Contrast Lab */}
        <div className="my-8 rounded-3xl border p-6 sm:p-8" style={{ backgroundColor: CARD_MUTED, borderColor: BORDER_WARM }}>
          <div className="flex items-center gap-2 font-mono text-xs uppercase font-extrabold text-[#6B4226] mb-4">
            <RiText className="h-4 w-4" />
            <span>Live Typography & Contrast Lab</span>
          </div>

          <div
            className="rounded-2xl p-6 sm:p-8 border shadow-inner transition-all duration-300"
            style={{ backgroundColor: activeTestBg, borderColor: BORDER_WARM }}
          >
            <h3 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight" style={{ color: activeTestText }}>
              Design System Typography
            </h3>
            <p className="mt-2 font-sans text-sm sm:text-base leading-relaxed font-medium" style={{ color: activeTestText }}>
              Testing dynamic typography contrast and visual harmony directly against palette background tokens.
            </p>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row gap-6">
            <div className="flex-1">
              <span className="font-mono text-[11px] uppercase font-bold text-black/50 block mb-2">Background Token</span>
              <div className="flex gap-2.5">
                {palette.colors.map((c, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestBg(c.hex)}
                    className="h-9 w-9 rounded-full border border-black/20 transition-transform hover:scale-110 active:scale-95"
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            <div className="flex-1">
              <span className="font-mono text-[11px] uppercase font-bold text-black/50 block mb-2">Text Token</span>
              <div className="flex gap-2.5">
                {palette.colors.map((c, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestText(c.hex)}
                    className="h-9 w-9 rounded-full border border-black/20 transition-transform hover:scale-110 active:scale-95"
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Code Exporter Drawer */}
        <div className="mt-8 rounded-3xl border p-6 sm:p-8 bg-white" style={{ borderColor: BORDER_WARM }}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 mb-4" style={{ borderColor: BORDER_WARM }}>
            <h4 className="font-mono text-xs uppercase tracking-wider font-extrabold" style={{ color: ACCENT_BROWN }}>
              Code Exporter
            </h4>
            <span className="font-mono text-xs italic" style={{ color: TEXT_MUTED }}>
              {activeTabObj.desc}
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {FORMAT_TABS.map((tab) => {
              const isActive = activeFormat === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFormat(tab.id)}
                  className="flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-xs font-bold transition-all duration-300 shrink-0"
                  style={{
                    backgroundColor: isActive ? ACCENT_BROWN : CARD_MUTED,
                    color: isActive ? "#FFFFFF" : TEXT_DARK,
                    border: `1px solid ${isActive ? ACCENT_BROWN : BORDER_WARM}`,
                  }}
                >
                  <RiPaletteLine className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="relative mt-4 rounded-2xl border bg-[#0D0C0A] p-5 font-mono text-xs text-amber-200">
            <button
              onClick={() => onCopy(`${palette.id}-${activeFormat}`, snippetFor(palette, activeFormat))}
              className="absolute top-4 right-4 flex items-center gap-1.5 rounded-xl border border-amber-200/20 px-3 py-1.5 text-xs font-bold text-amber-200 hover:bg-amber-200/10 transition-all"
            >
              {isCopied ? <RiCheckLine className="h-4 w-4 text-emerald-400" /> : <RiFileCopyLine className="h-4 w-4" />}
              <span>{isCopied ? "Copied" : "Copy Snippet"}</span>
            </button>
            <pre className="overflow-x-auto text-xs leading-relaxed pr-24">
              {snippetFor(palette, activeFormat)}
            </pre>
          </div>
        </div>

        {/* Color Matrix Breakdown */}
        <div className="space-y-4 border-t pt-8 mt-8" style={{ borderColor: BORDER_WARM }}>
          <h4 className="font-mono text-xs uppercase tracking-wider font-extrabold" style={{ color: ACCENT_BROWN }}>
            Color Values Matrix
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {palette.colors.map((c, i) => {
              const rgb = hexToRgb(c.hex);
              return (
                <div key={i} className="rounded-2xl border p-4 flex flex-col justify-between" style={{ borderColor: BORDER_WARM, backgroundColor: LIGHT_BG }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="h-4 w-4 rounded-full border border-black/10" style={{ backgroundColor: c.hex }} />
                    <span className="font-mono text-xs font-bold text-[#120F0D] truncate">{c.name}</span>
                  </div>
                  <div className="space-y-1 font-mono text-[11px]" style={{ color: TEXT_MUTED }}>
                    <p><strong className="text-[#120F0D]">HEX:</strong> {c.hex}</p>
                    <p><strong className="text-[#120F0D]">RGB:</strong> {rgb.r}, {rgb.g}, {rgb.b}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// -------------------------------------------------------------
// MAIN PAGE VIEW
// -------------------------------------------------------------
export default function ColorPalettesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [format, setFormat] = useState("HEX");
  const [copiedId, setCopiedId] = useState(null);
  const [selectedPaletteModal, setSelectedPaletteModal] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [randomizing, setRandomizing] = useState(false);

  const categories = useMemo(() => ["All", "Favorites", ...Array.from(new Set(PALETTES_CATALOG.map((f) => f.category)))], [favorites]);

  const filteredPalettes = useMemo(() => {
    return PALETTES_CATALOG.filter((p) => {
      const matchesCategory =
        category === "All"
          ? true
          : category === "Favorites"
          ? favorites.includes(p.id)
          : p.category === category;

      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.desc.toLowerCase().includes(search.toLowerCase()) ||
        p.colors.some((c) => c.hex.toLowerCase().includes(search.toLowerCase()) || c.name.toLowerCase().includes(search.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [search, category, favorites]);

  const handleCopy = async (id, text) => {
    const success = await executeCopy(text);
    if (success) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    }
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]));
  };

  const handlePickRandom = () => {
    setRandomizing(true);
    const randomIndex = Math.floor(Math.random() * PALETTES_CATALOG.length);
    const targetPalette = PALETTES_CATALOG[randomIndex];

    gsap.to(window, {
      duration: 1,
      scrollTo: { y: 200, autoKill: false },
      ease: "power3.inOut",
      onComplete: () => {
        setSelectedPaletteModal(targetPalette);
        setRandomizing(false);
      },
    });
  };

  return (
    <div className="min-h-screen font-sans antialiased pb-32" style={{ backgroundColor: LIGHT_BG, color: TEXT_DARK }}>
      <Navbar/>
      
      {/* Header */}
      <section className="mx-auto max-w-7xl px-4 sm:px-8 pt-12 sm:pt-20">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b" style={{ borderColor: BORDER_WARM }}>
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-extrabold" style={{ color: ACCENT_BROWN }}>
              <RiPaletteLine className="h-4 w-4" />
              <span>Color Design Experience</span>
            </div>
            <h1 className="mt-3 font-display text-5xl sm:text-7xl font-black uppercase tracking-tight text-[#120F0D]">
              Palettes <span style={{ color: ACCENT_BROWN }}>Studio</span>
            </h1>
            <p className="mt-3 text-sm sm:text-base max-w-lg leading-relaxed font-medium" style={{ color: TEXT_MUTED }}>
              Hover any color strip to inspect values or click <strong>Inspect & Modal Studio</strong> to test live typography contrast and copy code snippets.
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-3 rounded-3xl border shadow-sm" style={{ borderColor: BORDER_WARM }}>
            <div className="flex items-center gap-2.5 rounded-2xl border px-4 py-2.5 sm:w-72 bg-[#FAF8F4]" style={{ borderColor: BORDER_WARM }}>
              <RiSearchLine className="h-4 w-4 text-black/40" />
              <input
                type="text"
                placeholder="Search color or name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent font-mono text-xs font-semibold outline-none"
              />
            </div>

            <button
              onClick={handlePickRandom}
              disabled={randomizing}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-mono text-xs font-bold text-white bg-[#6B4226] hover:bg-[#52321c] transition-all"
            >
              <TbSparkles className={`h-4 w-4 ${randomizing ? "animate-spin" : ""}`} />
              <span>Surprise Me</span>
            </button>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="mx-auto max-w-7xl px-4 sm:px-8 py-8 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const isActive = category === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className="whitespace-nowrap rounded-full px-5 py-2 font-mono text-xs uppercase font-extrabold transition-all"
                style={{
                  backgroundColor: isActive ? ACCENT_BROWN : "#FFFFFF",
                  color: isActive ? "#FFFFFF" : TEXT_DARK,
                  border: `1px solid ${isActive ? ACCENT_BROWN : BORDER_WARM}`,
                }}
              >
                {cat === "Favorites" ? `Saved (${favorites.length})` : cat}
              </button>
            );
          })}
        </div>

        <span className="font-mono text-xs font-bold hidden md:inline-block" style={{ color: TEXT_MUTED }}>
          Showing {filteredPalettes.length} Palettes
        </span>
      </section>

      {/* Accordion Rows */}
      <main className="mx-auto max-w-7xl px-4 sm:px-8">
        <AnimatePresence mode="popLayout">
          {filteredPalettes.map((palette) => (
            <AccordionPaletteRow
              key={palette.id}
              palette={palette}
              format={format}
              isFavorite={favorites.includes(palette.id)}
              onCopy={handleCopy}
              onFavorite={toggleFavorite}
              onSelect={(pal) => setSelectedPaletteModal(pal)}
            />
          ))}
        </AnimatePresence>
      </main>

      {/* Fullscreen Inspection Studio Modal */}
      <AnimatePresence>
        {selectedPaletteModal && (
          <PaletteModalStudio
            palette={selectedPaletteModal}
            activeFormat={format}
            setFormat={setFormat}
            isCopied={copiedId === `${selectedPaletteModal.id}-${format}`}
            onCopy={handleCopy}
            onClose={() => setSelectedPaletteModal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}