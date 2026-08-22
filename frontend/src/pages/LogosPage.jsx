import React, { useLayoutEffect, useRef, useState, useMemo, memo } from "react";
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
  Eye,
  Filter,
  Sparkles,
  MousePointerClick
} from "lucide-react";
import { Navbar } from "../localcomponents/Navbar";
import { INITIAL_LOGOS } from "../data/logos";

gsap.registerPlugin(ScrollTrigger);

const LIGHT_BG = "#F9F6F0";
const CARD_BG = "#FFFDF9";
const TEXT_DARK = "#1C1611"; // Slightly darker for improved contrast and readability
const TEXT_MUTED = "rgba(28, 22, 17, 0.75)"; // Increased opacity for better accessibility
const BORDER_WARM = "rgba(140, 94, 50, 0.25)";
const ACCENT_BROWN = "#734A26"; // Darkened accent color to meet WCAG AA contrast ratios

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

// Card Component with native CSS sticky positioning
const LogoCard = memo(({ item, index, total, isCopied, onOpenModal, onCopy }) => {
  const defaultSvg = useMemo(() => item.renderSvg(item.defaultColors), [item]);

  return (
    <div
      data-stack-card
      onClick={() => onOpenModal(item)}
      className="sticky group flex cursor-pointer flex-col justify-between rounded-3xl border p-7 sm:p-9 transition-colors duration-200 shadow-sm will-change-transform focus:outline-none focus:ring-2 focus:ring-[#734A26]"
      tabIndex={0}
      role="button"
      aria-label={`Customize ${item.name} logo`}
      style={{
        backgroundColor: CARD_BG,
        borderColor: BORDER_WARM,
        minHeight: "420px",
        top: `${110 + index * 12}px`, // Staggered sticky top offsets
        zIndex: index + 1,
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-semibold" style={{ color: TEXT_MUTED }}>
            #{item.number}
          </span>
          <span
            className="rounded-full px-3.5 py-1 font-mono text-xs uppercase tracking-wider border font-bold"
            style={{ backgroundColor: LIGHT_BG, borderColor: BORDER_WARM, color: ACCENT_BROWN }}
          >
            {item.category}
          </span>
        </div>

        <div
          className="flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-xs font-semibold"
          style={{ backgroundColor: LIGHT_BG, borderColor: BORDER_WARM, color: TEXT_DARK }}
        >
          <Palette className="h-4 w-4" style={{ color: ACCENT_BROWN }} />
          <span>Edit Colors</span>
        </div>
      </div>

      <div
        className="my-6 flex h-48 items-center justify-center rounded-2xl border p-6"
        style={{ backgroundColor: LIGHT_BG, borderColor: BORDER_WARM }}
      >
        <div
          className="h-28 w-28 transition-transform duration-200 group-hover:scale-105"
          dangerouslySetInnerHTML={{ __html: defaultSvg }}
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#1C1611]">
            {item.name}
          </h2>
          <p className="mt-1 text-sm max-w-sm leading-relaxed" style={{ color: TEXT_MUTED }}>
            {item.desc}
          </p>
        </div>

        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onCopy(item.id, defaultSvg)}
            className="flex items-center gap-2 rounded-xl border px-4 py-2.5 font-mono text-xs uppercase tracking-wider font-bold transition-colors hover:border-[#734A26]"
            style={{ backgroundColor: LIGHT_BG, borderColor: BORDER_WARM, color: TEXT_DARK }}
          >
            {isCopied ? (
              <>
                <Check className="h-4 w-4" style={{ color: ACCENT_BROWN }} />
                <span style={{ color: ACCENT_BROWN }}>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" style={{ color: TEXT_MUTED }} />
                <span>Copy Code</span>
              </>
            )}
          </button>

          <button
            onClick={() => downloadSvg(defaultSvg, `${item.id}.svg`)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border transition-colors hover:border-[#734A26]"
            style={{ backgroundColor: LIGHT_BG, borderColor: BORDER_WARM, color: TEXT_DARK }}
            title="Download SVG"
            aria-label="Download SVG file"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

export default function LogosPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [modalColors, setModalColors] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [activeLogoIndex, setActiveLogoIndex] = useState(0);

  const containerRef = useRef(null);

  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(INITIAL_LOGOS.map((item) => item.category)))];
  }, []);

  const filteredLogos = useMemo(() => {
    if (selectedCategory === "All") return INITIAL_LOGOS;
    return INITIAL_LOGOS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

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

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setActiveLogoIndex(0);
  };

  // Safe GSAP ScrollTrigger context
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray("[data-stack-card]");
      if (!cards.length) return;

      cards.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 40%",
          end: "bottom 40%",
          onEnter: () => setActiveLogoIndex(index),
          onEnterBack: () => setActiveLogoIndex(index),
        });

        if (index < cards.length - 1) {
          gsap.to(card, {
            scale: 0.95,
            opacity: 0.6,
            ease: "none",
            scrollTrigger: {
              trigger: cards[index + 1],
              start: "top 80%",
              end: "top 20%",
              scrub: true,
            },
          });
        }
      });
    }, containerRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [filteredLogos]);

  const activeLogoData = filteredLogos[activeLogoIndex] || filteredLogos[0] || INITIAL_LOGOS[0];

  return (
    <div
      ref={containerRef}
      className="min-h-screen font-sans antialiased selection:bg-[#734A26] selection:text-white"
      style={{ backgroundColor: LIGHT_BG, color: TEXT_DARK }}
    >
      <Navbar />

      <div className="mx-auto flex max-w-7xl flex-col lg:flex-row lg:gap-12 px-6 pt-24 sm:pt-32 pb-32 sm:px-12">
        
        {/* LEFT COLUMN: CLEAR & ACCESSIBLE INFORMATION */}
        <aside className="w-full lg:w-5/12 lg:sticky lg:top-28 lg:h-[calc(100vh-140px)] flex flex-col justify-between py-2 mb-12 lg:mb-0">
          <div>
           

            <h1 className="font-display text-4xl sm:text-5xl font-black uppercase leading-[1.05] text-[#1C1611]">
              Free Custom <span style={{ color: ACCENT_BROWN }}>Logo Library</span>
            </h1>

            <p className="mt-4 text-base leading-relaxed max-w-md font-medium" style={{ color: TEXT_MUTED }}>
              Browse modern logo designs for your websites and apps. Easily change colors and download free high-quality SVG files in seconds.
            </p>

            {/* Quick How-To List */}
            <div className="mt-6 space-y-2 border-l-2 pl-4 text-xs font-medium" style={{ borderColor: ACCENT_BROWN, color: TEXT_MUTED }}>
              <p className="flex items-center gap-2">
                <MousePointerClick className="h-3.5 w-3.5" style={{ color: ACCENT_BROWN }} />
                <span><strong>Click any logo card</strong> to customize its colors.</span>
              </p>
              <p className="flex items-center gap-2">
                <Download className="h-3.5 w-3.5" style={{ color: ACCENT_BROWN }} />
                <span><strong>Download SVG</strong> or copy raw code straight to your editor.</span>
              </p>
            </div>

            {/* Live Preview Box */}
            {activeLogoData && (
              <div
                className="mt-8 rounded-2xl border p-5 shadow-sm"
                style={{ backgroundColor: CARD_BG, borderColor: BORDER_WARM }}
              >
                <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: BORDER_WARM }}>
                  <div className="flex items-center gap-2 font-mono text-xs font-bold" style={{ color: ACCENT_BROWN }}>
                    <Eye className="h-4 w-4" />
                    <span>Selected Logo</span>
                  </div>
                  <span className="font-mono text-xs font-bold" style={{ color: TEXT_MUTED }}>
                    {activeLogoIndex + 1} of {filteredLogos.length}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-2xl font-bold uppercase text-[#1C1611]">
                      {activeLogoData.name}
                    </h2>
                    <span
                      className="mt-1 inline-block rounded-full px-2.5 py-0.5 font-mono text-xs font-semibold uppercase border"
                      style={{ backgroundColor: LIGHT_BG, borderColor: BORDER_WARM, color: ACCENT_BROWN }}
                    >
                      Category: {activeLogoData.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 rounded-xl border p-2" style={{ backgroundColor: LIGHT_BG, borderColor: BORDER_WARM }}>
                    {Object.values(activeLogoData.defaultColors).map((hex, i) => (
                      <div
                        key={i}
                        className="h-5 w-5 rounded-md border border-black/20"
                        style={{ backgroundColor: hex }}
                        title={`Color: ${hex}`}
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleOpenModal(activeLogoData)}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 font-mono text-xs uppercase tracking-wider font-bold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{ backgroundColor: ACCENT_BROWN }}
                >
                  <Sliders className="h-4 w-4" />
                  <span>Customize Colors Now</span>
                </button>
              </div>
            )}
          </div>

          <div className="hidden lg:flex items-center gap-3 font-mono text-xs font-semibold" style={{ color: TEXT_MUTED }}>
            <ArrowDown className="h-4 w-4 animate-bounce" style={{ color: ACCENT_BROWN }} />
            <span>Scroll down the right side to see more logos</span>
          </div>
        </aside>

        {/* RIGHT COLUMN */}
        <main className="w-full lg:w-7/12 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-bold" style={{ color: ACCENT_BROWN }}>
              <Filter className="h-3.5 w-3.5" />
              <span>Choose Category</span>
            </div>

            <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className="whitespace-nowrap rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors duration-150 border font-bold"
                    style={{
                      backgroundColor: isActive ? ACCENT_BROWN : CARD_BG,
                      color: isActive ? "#FFFDF9" : TEXT_DARK,
                      borderColor: isActive ? ACCENT_BROWN : BORDER_WARM,
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div key={selectedCategory} className="flex flex-col gap-12 pb-32">
            {filteredLogos.map((item, index) => (
              <LogoCard
                key={item.id}
                item={item}
                index={index}
                total={filteredLogos.length}
                isCopied={copiedId === item.id}
                onOpenModal={handleOpenModal}
                onCopy={handleCopy}
              />
            ))}
          </div>
        </main>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedLogo && modalColors && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="relative w-full max-w-lg rounded-3xl border p-6 sm:p-8 shadow-xl"
              style={{ backgroundColor: CARD_BG, borderColor: BORDER_WARM }}
            >
              <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: BORDER_WARM }}>
                <div>
                  <h2 className="font-display text-2xl font-bold uppercase text-[#1C1611]">
                    {selectedLogo.name}
                  </h2>
                  <span className="font-mono text-xs uppercase font-bold" style={{ color: ACCENT_BROWN }}>
                    Category: {selectedLogo.category}
                  </span>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="rounded-full p-2 hover:bg-black/5"
                  style={{ color: TEXT_MUTED }}
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div
                className="my-6 flex h-48 items-center justify-center rounded-2xl border p-4"
                style={{ backgroundColor: LIGHT_BG, borderColor: BORDER_WARM }}
              >
                <div
                  className="h-32 w-32"
                  dangerouslySetInnerHTML={{ __html: selectedLogo.renderSvg(modalColors) }}
                />
              </div>

              <div className="space-y-4">
                {Object.keys(modalColors).map((key) => (
                  <div key={key} className="flex items-center justify-between">
                    <label className="font-mono text-xs uppercase tracking-wider font-bold" style={{ color: TEXT_DARK }}>
                      Change {key} Color
                    </label>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-semibold" style={{ color: TEXT_MUTED }}>
                        {modalColors[key]}
                      </span>
                      <input
                        type="color"
                        value={modalColors[key]}
                        onChange={(e) => handleModalColorChange(key, e.target.value)}
                        className="h-8 w-8 cursor-pointer rounded-lg border-0 bg-transparent p-0"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between gap-3 pt-4 border-t" style={{ borderColor: BORDER_WARM }}>
                <button
                  onClick={handleResetModalColors}
                  className="flex items-center gap-2 rounded-xl border px-4 py-2.5 font-mono text-xs uppercase tracking-wider font-bold"
                  style={{ backgroundColor: LIGHT_BG, borderColor: BORDER_WARM, color: TEXT_DARK }}
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset Colors</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(selectedLogo.id, selectedLogo.renderSvg(modalColors))}
                    className="flex items-center gap-2 rounded-xl border px-4 py-2.5 font-mono text-xs uppercase tracking-wider font-bold"
                    style={{ backgroundColor: LIGHT_BG, borderColor: BORDER_WARM, color: TEXT_DARK }}
                  >
                    {copiedId === selectedLogo.id ? (
                      <>
                        <Check className="h-3.5 w-3.5" style={{ color: ACCENT_BROWN }} />
                        <span style={{ color: ACCENT_BROWN }}>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" style={{ color: TEXT_MUTED }} />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => downloadSvg(selectedLogo.renderSvg(modalColors), `${selectedLogo.id}-custom.svg`)}
                    className="flex items-center gap-2 rounded-xl px-4 py-2.5 font-mono text-xs uppercase tracking-wider font-bold text-white"
                    style={{ backgroundColor: ACCENT_BROWN }}
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download SVG</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}