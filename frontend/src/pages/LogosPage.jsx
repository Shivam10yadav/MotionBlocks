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
  Filter
} from "lucide-react";
import { Navbar } from "../localcomponents/Navbar";
import { INITIAL_LOGOS } from "../data/logos";

gsap.registerPlugin(ScrollTrigger);

const LIGHT_BG = "#F9F6F0";
const CARD_BG = "#FFFDF9";
const TEXT_DARK = "#2C241C";
const TEXT_MUTED = "rgba(44, 36, 28, 0.6)";
const BORDER_WARM = "rgba(140, 94, 50, 0.2)";
const ACCENT_BROWN = "#8C5E32";

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
      className="sticky group flex cursor-pointer flex-col justify-between rounded-3xl border p-7 sm:p-9 transition-colors duration-200 shadow-sm will-change-transform"
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
          <span className="font-mono text-sm" style={{ color: TEXT_MUTED }}>
            {item.number}
          </span>
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
          <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#2C241C]">
            {item.name}
          </h2>
          <p className="mt-1 text-xs max-w-sm leading-relaxed" style={{ color: TEXT_MUTED }}>
            {item.desc}
          </p>
        </div>

        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onCopy(item.id, defaultSvg)}
            className="flex items-center gap-2 rounded-xl border px-4 py-2.5 font-mono text-xs uppercase tracking-wider transition-colors hover:border-[#8C5E32]"
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
            className="flex h-10 w-10 items-center justify-center rounded-xl border transition-colors hover:border-[#8C5E32]"
            style={{ backgroundColor: LIGHT_BG, borderColor: BORDER_WARM, color: TEXT_MUTED }}
            title="Download SVG"
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

  // Safe GSAP ScrollTrigger context (without JS pinning)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray("[data-stack-card]");
      if (!cards.length) return;

      cards.forEach((card, index) => {
        // Tracker for 'Currently Viewing' sidebar index
        ScrollTrigger.create({
          trigger: card,
          start: "top 40%",
          end: "bottom 40%",
          onEnter: () => setActiveLogoIndex(index),
          onEnterBack: () => setActiveLogoIndex(index),
        });

        // Slight fade and scale down on scroll over
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

    // Refresh ScrollTrigger calculations safely
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [filteredLogos]);

  const activeLogoData = filteredLogos[activeLogoIndex] || filteredLogos[0] || INITIAL_LOGOS[0];

  return (
    <div
      ref={containerRef}
      className="min-h-screen font-sans antialiased selection:bg-[#8C5E32] selection:text-white"
      style={{ backgroundColor: LIGHT_BG, color: TEXT_DARK }}
    >
      <Navbar />

      <div className="mx-auto flex max-w-7xl flex-col lg:flex-row lg:gap-12 px-6 pt-24 sm:pt-32 pb-32 sm:px-12">
        {/* LEFT COLUMN */}
        <aside className="w-full lg:w-5/12 lg:sticky lg:top-28 lg:h-[calc(100vh-140px)] flex flex-col justify-between py-2 mb-12 lg:mb-0">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: ACCENT_BROWN }}>
              Component Library
            </p>
            <h1 className="mt-2 font-display text-4xl sm:text-6xl font-black uppercase leading-[0.95] text-[#2C241C]">
              Browse by <span style={{ color: ACCENT_BROWN }}>Category</span>
            </h1>
            <p className="mt-4 text-sm leading-relaxed max-w-md" style={{ color: TEXT_MUTED }}>
              Scroll through clean vector logos in warm light tones. Click any card to customize colors and export vector files.
            </p>

            {activeLogoData && (
              <div
                className="mt-8 rounded-2xl border p-5 shadow-sm"
                style={{ backgroundColor: CARD_BG, borderColor: BORDER_WARM }}
              >
                <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: BORDER_WARM }}>
                  <div className="flex items-center gap-2 font-mono text-xs" style={{ color: ACCENT_BROWN }}>
                    <Eye className="h-3.5 w-3.5" />
                    <span>Currently Viewing</span>
                  </div>
                  <span className="font-mono text-xs" style={{ color: TEXT_MUTED }}>
                    {activeLogoIndex + 1} / {filteredLogos.length}
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
            )}
          </div>

          <div className="hidden lg:flex items-center gap-3 font-mono text-xs" style={{ color: TEXT_MUTED }}>
            <ArrowDown className="h-4 w-4 animate-bounce" style={{ color: ACCENT_BROWN }} />
            <span>Scroll right side to overlay logos</span>
          </div>
        </aside>

        {/* RIGHT COLUMN */}
        <main className="w-full lg:w-7/12 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider" style={{ color: ACCENT_BROWN }}>
              <Filter className="h-3.5 w-3.5" />
              <span>Filter Categories</span>
            </div>

            <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className="whitespace-nowrap rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors duration-150 border"
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

          {/* Key prop ensures clean DOM teardown when filtering */}
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30">
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
                  <h3 className="font-display text-2xl font-bold uppercase text-[#2C241C]">
                    {selectedLogo.name}
                  </h3>
                  <span className="font-mono text-xs uppercase" style={{ color: ACCENT_BROWN }}>
                    {selectedLogo.category}
                  </span>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="rounded-full p-2 hover:bg-black/5"
                  style={{ color: TEXT_MUTED }}
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
                    <label className="font-mono text-xs uppercase tracking-wider" style={{ color: TEXT_DARK }}>
                      {key} Color
                    </label>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs" style={{ color: TEXT_MUTED }}>
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
                  className="flex items-center gap-2 rounded-xl border px-4 py-2.5 font-mono text-xs uppercase tracking-wider"
                  style={{ backgroundColor: LIGHT_BG, borderColor: BORDER_WARM, color: TEXT_DARK }}
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(selectedLogo.id, selectedLogo.renderSvg(modalColors))}
                    className="flex items-center gap-2 rounded-xl border px-4 py-2.5 font-mono text-xs uppercase tracking-wider"
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
                        <span>Copy SVG</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => downloadSvg(selectedLogo.renderSvg(modalColors), `${selectedLogo.id}-custom.svg`)}
                    className="flex items-center gap-2 rounded-xl px-4 py-2.5 font-mono text-xs uppercase tracking-wider font-bold text-white"
                    style={{ backgroundColor: ACCENT_BROWN }}
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download</span>
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