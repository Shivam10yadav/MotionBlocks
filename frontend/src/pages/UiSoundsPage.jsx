import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbPlayerPlay,
  TbCopy,
  TbCheck,
  TbCode,
  TbAdjustmentsHorizontal,
  TbX,
  TbWaveSquare,
  TbCursorText,
  TbToggleRight,
  TbCircleCheck,
  TbAlertTriangle,
  TbSparkles,
  TbTrash,
  TbLock,
  TbTrophy,
  TbSwipe,
  TbPointer,
  TbBell,
  TbCamera,
  TbLayoutSidebarRightExpand,
  TbDroplet,
  TbBrandReact,
  TbSearch,
  TbSparkles as TbSparklesIcon
} from "react-icons/tb";

import { Navbar } from "../localcomponents/Navbar";
import { INITIAL_SOUNDS, playSoundEffect, getJsCodeSnippet } from "../data/sounds";

gsap.registerPlugin(ScrollTrigger);

const LIGHT_BG = "#F9F6F0";
const CARD_BG = "#FFFDF9";
const TEXT_DARK = "#1C1611";
const TEXT_MUTED = "rgba(28, 22, 17, 0.75)";
const BORDER_WARM = "rgba(140, 94, 50, 0.25)";
const ACCENT_BROWN = "#734A26";
const ACCENT_SOFT = "rgba(115, 74, 38, 0.08)";

const ICON_MAP = {
  click: TbCursorText,
  toggle: TbToggleRight,
  success: TbCircleCheck,
  error: TbAlertTriangle,
  pop: TbSparkles,
  delete: TbTrash,
  lock: TbLock,
  glass: TbSparklesIcon,
  levelup: TbTrophy,
  swipe: TbSwipe,
  hover: TbPointer,
  bell: TbBell,
  shutter: TbCamera,
  expand: TbLayoutSidebarRightExpand,
  drop: TbDroplet
};

// --- CATEGORY FILTER PILL (GSAP magnetic-lift + fill effect, same pattern as CategoriesSection cards) ---
const CategoryPill = ({ cat, isActive, onClick, setBtnRef }) => {
  const btnRef = useRef(null);

  const attachRef = (el) => {
    btnRef.current = el;
    if (setBtnRef) setBtnRef(el);
  };

  const handleEnter = () => {
    if (isActive) return;
    gsap.to(btnRef.current, {
      borderColor: ACCENT_BROWN,
      backgroundColor: ACCENT_SOFT,
      y: -3,
      scale: 1.05,
      boxShadow: "0 10px 22px -8px rgba(115, 74, 38, 0.3)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleLeave = () => {
    if (isActive) return;
    gsap.to(btnRef.current, {
      borderColor: BORDER_WARM,
      backgroundColor: CARD_BG,
      y: 0,
      scale: 1,
      boxShadow: "0 0px 0px rgba(0,0,0,0)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleClick = () => {
    gsap.fromTo(
      btnRef.current,
      { scale: 0.94 },
      { scale: isActive ? 1 : 1.05, duration: 0.35, ease: "back.out(2)" }
    );
    onClick();
  };

  return (
    <button
      ref={attachRef}
      onClick={handleClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="whitespace-nowrap rounded-full px-4 py-2 font-mono text-xs font-bold uppercase border"
      style={{
        backgroundColor: isActive ? ACCENT_BROWN : CARD_BG,
        color: isActive ? "#FFFDF9" : TEXT_DARK,
        borderColor: isActive ? ACCENT_BROWN : BORDER_WARM
      }}
    >
      {cat}
    </button>
  );
};

// --- INTERACTIVE TACTILE SOUND ROW MODULE (WITH PROGRESS FILL HOVER EFFECT) ---
const SoundRowModule = ({ item, isPlaying, isCopied, onPlay, onCopy, onSelect, index }) => {
  const IconComponent = ICON_MAP[item.iconKey] || TbWaveSquare;
  const rowRef = useRef(null);
  const progressRef = useRef(null);
  const iconRef = useRef(null);

  // Magnetic Hover Physics & Warm Progress Fill Expansion
  const handleMouseEnter = () => {
    // Fill progress sweep from left to right
    gsap.to(progressRef.current, {
      scaleX: 1,
      duration: 0.45,
      ease: "power2.out"
    });
  };

  const handleMouseMove = (e) => {
    if (!rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(rowRef.current, {
      x: x * 0.05,
      y: y * 0.05,
      rotationX: -y * 0.03,
      rotationY: x * 0.03,
      duration: 0.3,
      ease: "power2.out"
    });

    gsap.to(iconRef.current, {
      scale: 1.1,
      rotation: 5,
      duration: 0.2
    });
  };

  const handleMouseLeave = () => {
    if (!rowRef.current) return;

    // Retract warm progress fill back to left
    gsap.to(progressRef.current, {
      scaleX: 0,
      duration: 0.35,
      ease: "power2.in"
    });

    gsap.to(rowRef.current, {
      x: 0,
      y: 0,
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)"
    });

    gsap.to(iconRef.current, { scale: 1, rotation: 0, duration: 0.3 });
  };

  const handleTrigger = (e) => {
    e.stopPropagation();
    gsap.fromTo(
      rowRef.current,
      { scale: 0.98 },
      { scale: 1, duration: 0.4, ease: "back.out(2)" }
    );
    onPlay(item.type);
  };

  return (
    <motion.div
      ref={rowRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleTrigger}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      className="group relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-2xl border p-5 transition-all duration-300 shadow-sm hover:shadow-xl cursor-pointer select-none overflow-hidden"
      style={{
        backgroundColor: isPlaying ? "rgba(244, 218, 193, 0.5)" : CARD_BG,
        borderColor: isPlaying ? ACCENT_BROWN : BORDER_WARM,
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
    >
      {/* PROGRESS BAR FILL BACKGROUND (Beige Cream -> Light Orange Warm Gradient) */}
      <div
        ref={progressRef}
        className="absolute inset-0 pointer-events-none origin-left transform scale-x-0 transition-opacity"
        style={{
          background: "linear-[#FFF8F0] linear-gradient(90deg, #FBEFE4 0%, #F8E2CF 50%, #F5D5BA 100%)",
          opacity: 0.9
        }}
      />

      {/* Sound Info & Wave Spec */}
      <div className="relative z-10 flex items-center gap-4">
        <div
          ref={iconRef}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-colors group-hover:bg-[#734A26] group-hover:text-[#FFFDF9]"
          style={{ backgroundColor: LIGHT_BG, borderColor: BORDER_WARM, color: ACCENT_BROWN }}
        >
          <IconComponent className="h-6 w-6" />
        </div>

        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="font-display text-lg font-bold uppercase text-[#1C1611] tracking-wide">
              {item.name}
            </h3>
            <span
              className="font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded-md border"
              style={{ backgroundColor: LIGHT_BG, borderColor: BORDER_WARM, color: ACCENT_BROWN }}
            >
              {item.category}
            </span>
          </div>
          <p className="mt-1 text-xs font-medium max-w-xl line-clamp-1" style={{ color: TEXT_MUTED }}>
            {item.desc}
          </p>
        </div>
      </div>

      {/* Trigger & Actions Controls */}
      <div className="relative z-10 flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0" style={{ borderColor: BORDER_WARM }}>
        <div className="flex items-center gap-2 font-mono text-xs font-semibold" style={{ color: TEXT_MUTED }}>
          <span className="px-2 py-1 rounded bg-black/5">{item.wave}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-black/20" />
          <span>{item.duration}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Inspect Code Drawer Trigger */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(item);
            }}
            className="flex h-9 px-3 items-center gap-1.5 rounded-xl border font-mono text-xs font-bold transition-all hover:bg-black/5"
            style={{ borderColor: BORDER_WARM, color: TEXT_DARK }}
          >
            <TbCode className="h-4 w-4" />
            <span className="hidden sm:inline">Code</span>
          </button>

          {/* Quick Copy Snippet */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCopy(item.id, item.type);
            }}
            className="flex h-9 px-3 items-center gap-1.5 rounded-xl border font-mono text-xs font-bold transition-all hover:border-[#734A26]"
            style={{ backgroundColor: LIGHT_BG, borderColor: BORDER_WARM, color: TEXT_DARK }}
          >
            {isCopied ? (
              <>
                <TbCheck className="h-4 w-4" style={{ color: ACCENT_BROWN }} />
                <span style={{ color: ACCENT_BROWN }}>Copied</span>
              </>
            ) : (
              <>
                <TbCopy className="h-4 w-4" style={{ color: TEXT_MUTED }} />
                <span>Copy</span>
              </>
            )}
          </button>

          {/* Play Pulse Button */}
          <button
            onClick={handleTrigger}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-sm transition-transform active:scale-90"
            style={{ backgroundColor: ACCENT_BROWN }}
          >
            <TbPlayerPlay className={`h-4 w-4 ${isPlaying ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function UiSoundsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeDrawerSound, setActiveDrawerSound] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [playingType, setPlayingType] = useState(null);

  // Audio Engine Parameters
  const [pitchShift, setPitchShift] = useState(1);
  const [volume, setVolume] = useState(0.2);

  const containerRef = useRef(null);
  const canvasVisualizerRef = useRef([]);
  const categoryPillRefs = useRef([]);

  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(INITIAL_SOUNDS.map((item) => item.category)))];
  }, []);

  const filteredSounds = useMemo(() => {
    return INITIAL_SOUNDS.filter((item) => {
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Entrance stagger for category pills (same reveal pattern used for the category cards)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(categoryPillRefs.current.filter(Boolean), {
        opacity: 0,
        y: 14,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, [categories.length]);

  // Dynamic GSAP Waveform Pulse Animation
  const triggerVisualizerBounce = () => {
    if (!canvasVisualizerRef.current.length) return;
    gsap.to(canvasVisualizerRef.current, {
      scaleY: () => Math.random() * 3 + 0.4,
      duration: 0.15,
      stagger: { amount: 0.1, from: "center" },
      yoyo: true,
      repeat: 1,
      ease: "power2.out"
    });
  };

  const handlePlaySound = (soundType) => {
    setPlayingType(soundType);
    playSoundEffect(soundType, pitchShift, volume);
    triggerVisualizerBounce();
    setTimeout(() => setPlayingType(null), 300);
  };

  const handleCopyCode = (id, soundType) => {
    const code = getJsCodeSnippet(soundType);
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div ref={containerRef} className="min-h-screen font-sans antialiased overflow-x-hidden" style={{ backgroundColor: LIGHT_BG, color: TEXT_DARK }}>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 pt-24 sm:pt-32 pb-32 sm:px-12">

        {/* HERO AUDIO STAGE & LIVE DOCK */}
        <div className="relative rounded-3xl border p-8 sm:p-12 shadow-sm overflow-hidden" style={{ backgroundColor: CARD_BG, borderColor: BORDER_WARM }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1 font-mono text-xs font-bold uppercase mb-4" style={{ backgroundColor: LIGHT_BG, borderColor: BORDER_WARM, color: ACCENT_BROWN }}>
                <TbWaveSquare className="h-4 w-4 animate-spin" />
                <span>Web Audio Synthesizer Matrix</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#1C1611] leading-none">
                Interactive <span style={{ color: ACCENT_BROWN }}>UI Audio Canvas</span>
              </h1>

              <p className="mt-4 text-sm sm:text-base font-medium leading-relaxed max-w-xl" style={{ color: TEXT_MUTED }}>
                No bulky external audio files. Tap any micro-module below to hear pure, zero-latency browser synthesized sound design.
              </p>
            </div>

            {/* LIVE CANVAS AUDIO DOCK */}
            <div className="lg:col-span-5 rounded-2xl border p-6" style={{ backgroundColor: LIGHT_BG, borderColor: BORDER_WARM }}>
              <div className="flex items-center justify-between border-b pb-4 mb-4" style={{ borderColor: BORDER_WARM }}>
                <span className="font-mono text-xs font-bold uppercase tracking-wider" style={{ color: ACCENT_BROWN }}>
                  Realtime Oscillator Engine
                </span>

                {/* 12-Bar Interactive Frequency Canvas */}
                <div className="flex items-center gap-1.5 h-8">
                  {[12, 28, 16, 32, 22, 38, 18, 26, 30, 14, 24, 10].map((h, i) => (
                    <span
                      key={i}
                      ref={(el) => (canvasVisualizerRef.current[i] = el)}
                      className="w-1.5 rounded-full bg-[#734A26] inline-block origin-bottom"
                      style={{ height: `${h}px` }}
                    />
                  ))}
                </div>
              </div>

              {/* Engine Tuning Controls */}
              <div className="space-y-4 font-mono text-xs">
                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span style={{ color: TEXT_MUTED }}>Frequency Pitch</span>
                    <span>{pitchShift}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="2.0"
                    step="0.1"
                    value={pitchShift}
                    onChange={(e) => setPitchShift(parseFloat(e.target.value))}
                    className="w-full accent-[#734A26] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span style={{ color: TEXT_MUTED }}>Master Gain</span>
                    <span>{Math.round(volume * 200)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="0.4"
                    step="0.05"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-full accent-[#734A26] cursor-pointer"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* SEARCH & FILTER CONTROLS */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
            {categories.map((cat, i) => {
              const isActive = selectedCategory === cat;
              return (
                <CategoryPill
                  key={cat}
                  cat={cat}
                  isActive={isActive}
                  onClick={() => setSelectedCategory(cat)}
                  setBtnRef={(el) => (categoryPillRefs.current[i] = el)}
                />
              );
            })}
          </div>

          <div className="relative w-full sm:w-80">
            <TbSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: TEXT_MUTED }} />
            <input
              type="text"
              placeholder="Search sounds, waveforms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border pl-10 pr-4 py-2.5 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#734A26]"
              style={{ backgroundColor: CARD_BG, borderColor: BORDER_WARM, color: TEXT_DARK }}
            />
          </div>
        </div>

        {/* INTERACTIVE VERTICAL SOUND LIST MATRIX */}
        <div className="mt-8 space-y-3">
          <AnimatePresence>
            {filteredSounds.map((item, index) => (
              <SoundRowModule
                key={item.id}
                index={index}
                item={item}
                isPlaying={playingType === item.type}
                isCopied={copiedId === item.id}
                onPlay={handlePlaySound}
                onCopy={handleCopyCode}
                onSelect={setActiveDrawerSound}
              />
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* SLIDE-OUT CODE CANVAS DRAWER */}
      <AnimatePresence>
        {activeDrawerSound && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-sm">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-xl h-full border-l p-8 shadow-2xl flex flex-col justify-between"
              style={{ backgroundColor: CARD_BG, borderColor: BORDER_WARM }}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: BORDER_WARM }}>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border" style={{ backgroundColor: LIGHT_BG, borderColor: BORDER_WARM, color: ACCENT_BROWN }}>
                      <TbBrandReact className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-bold uppercase text-[#1C1611]">
                        {activeDrawerSound.name}
                      </h2>
                      <span className="font-mono text-xs uppercase font-bold" style={{ color: ACCENT_BROWN }}>
                        {activeDrawerSound.wave} Synthesis
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveDrawerSound(null)}
                    className="rounded-full p-2 hover:bg-black/5"
                    style={{ color: TEXT_MUTED }}
                  >
                    <TbX className="h-6 w-6" />
                  </button>
                </div>

                {/* Description */}
                <p className="mt-4 text-xs font-medium leading-relaxed" style={{ color: TEXT_MUTED }}>
                  {activeDrawerSound.desc}
                </p>

                {/* Live Code Block */}
                <div className="my-6 rounded-2xl border p-5 bg-[#1C1611] text-[#F9F6F0] font-mono text-xs overflow-x-auto max-h-[50vh] no-scrollbar shadow-inner">
                  <pre>{getJsCodeSnippet(activeDrawerSound.type)}</pre>
                </div>
              </div>

              {/* Drawer Action Bar */}
              <div className="flex items-center justify-between gap-3 pt-4 border-t" style={{ borderColor: BORDER_WARM }}>
                <button
                  onClick={() => handlePlaySound(activeDrawerSound.type)}
                  className="flex items-center gap-2 rounded-xl border px-5 py-3 font-mono text-xs uppercase font-bold transition-all hover:bg-black/5"
                  style={{ backgroundColor: LIGHT_BG, borderColor: BORDER_WARM, color: TEXT_DARK }}
                >
                  <TbPlayerPlay className="h-4 w-4" style={{ color: ACCENT_BROWN }} />
                  <span>Test Audio</span>
                </button>

                <button
                  onClick={() => handleCopyCode(activeDrawerSound.id, activeDrawerSound.type)}
                  className="flex items-center gap-2 rounded-xl px-6 py-3 font-mono text-xs uppercase font-bold text-white shadow-md transition-all active:scale-95"
                  style={{ backgroundColor: ACCENT_BROWN }}
                >
                  {copiedId === activeDrawerSound.id ? <TbCheck className="h-4 w-4" /> : <TbCopy className="h-4 w-4" />}
                  <span>{copiedId === activeDrawerSound.id ? "Copied Snippet!" : "Copy Code"}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}