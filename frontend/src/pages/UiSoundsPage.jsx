import React, { useState, useMemo, useRef, useLayoutEffect, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbPlayerPlay,
  TbCopy,
  TbCheck,
  TbCode,
  TbX,
  TbWaveSquare,
  TbCursorText,
  TbToggleRight,
  TbCircleCheck,
  TbAlertTriangle,
  TbSparkles,
  TbTrash,
  TbLock,
  TbDiamond,
  TbTrophy,
  TbSwipe,
  TbPointer,
  TbBell,
  TbBellRinging,
  TbCamera,
  TbLayoutSidebarRightExpand,
  TbDroplet,
  TbBrandReact,
  TbSearch,
  TbZoomIn,
  TbMessageCircle,
  TbAt,
  TbMail,
  TbCalendarEvent,
  TbArrowBackUp,
  TbArrowForwardUp,
  TbRefresh,
  TbUpload,
  TbDownload,
  TbDeviceFloppy,
  TbStar,
  TbShare2,
  TbLayoutColumns,
  TbAdjustmentsHorizontal,
  TbCoin,
  TbFlame,
  TbMoodSad,
  TbPower,
  TbPlugOff,
  TbPlugConnected,
  TbPlugConnectedX,
  TbRotate,
  TbAlertOctagon,
  TbArrowUpRight
} from "react-icons/tb";

import { Navbar } from "../localcomponents/Navbar";
import { INITIAL_SOUNDS, CATEGORY_ORDER, playSoundEffect, getJsCodeSnippet } from "../data/sounds";

gsap.registerPlugin(ScrollTrigger);

const LIGHT_BG = "#F9F6F0";
const CARD_BG = "#FFFDF9";
const TEXT_DARK = "#1C1611";
const TEXT_MUTED = "rgba(28, 22, 17, 0.65)";
const BORDER_WARM = "rgba(140, 94, 50, 0.25)";
const ACCENTS = ["#734A26", "#C16E38"];
const ACCENT_TEXT = ["#FFFDF9", "#FFFDF9"];

const ICON_MAP = {
  click: TbCursorText,
  toggle: TbToggleRight,
  success: TbCircleCheck,
  error: TbAlertTriangle,
  pop: TbSparkles,
  delete: TbTrash,
  lock: TbLock,
  glass: TbDiamond,
  levelup: TbTrophy,
  swipe: TbSwipe,
  hover: TbPointer,
  bell: TbBell,
  shutter: TbCamera,
  expand: TbLayoutSidebarRightExpand,
  drop: TbDroplet,
  message: TbMessageCircle,
  mention: TbAt,
  mail: TbMail,
  reminder: TbCalendarEvent,
  undo: TbArrowBackUp,
  redo: TbArrowForwardUp,
  refresh: TbRefresh,
  upload: TbUpload,
  download: TbDownload,
  save: TbDeviceFloppy,
  search: TbZoomIn,
  favorite: TbStar,
  share: TbShare2,
  tabswitch: TbLayoutColumns,
  slider: TbAdjustmentsHorizontal,
  coin: TbCoin,
  combo: TbFlame,
  fail: TbMoodSad,
  poweron: TbPower,
  poweroff: TbPlugOff,
  connect: TbPlugConnected,
  disconnect: TbPlugConnectedX,
  sync: TbRotate,
  warning: TbAlertOctagon,
  ding: TbBellRinging
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Header entrance animation setup
const headerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const headerItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Editorial Sound Row Component featuring magnetic mouse skewing, 
 * index scaling & liquid-wipe dual text clipping.
 */
const SoundRow = ({ sound, index, accent, accentText, isPlaying, isCopied, onPlay, onCopy, onSelect }) => {
  const rowRef = useRef(null);
  const bgRef = useRef(null);
  const overlayRef = useRef(null);
  const indexRef = useRef(null);
  const playBtnRef = useRef(null);
  const tlRef = useRef(null);
  const quickX = useRef(null);
  const quickY = useRef(null);

  const IconComponent = ICON_MAP[sound.iconKey] || TbWaveSquare;

  useLayoutEffect(() => {
    // Magnetic Row Tracking GSAP quickTo setup
    if (rowRef.current && !prefersReducedMotion()) {
      quickX.current = gsap.quickTo(rowRef.current, "x", { duration: 0.4, ease: "power3.out" });
      quickY.current = gsap.quickTo(rowRef.current, "y", { duration: 0.4, ease: "power3.out" });
    }

    // Color Wipe Timeline
    tlRef.current = gsap
      .timeline({ paused: true })
      .to(bgRef.current, { scaleX: 1, duration: 0.5, ease: "power3.out" }, 0)
      .fromTo(
        overlayRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 0.5, ease: "power3.out" },
        0
      )
      .to(indexRef.current, { x: 6, scale: 1.1, color: "#FFFDF9", duration: 0.3, ease: "power3.out" }, 0)
      .to(playBtnRef.current, { rotate: 15, scale: 1.08, duration: 0.3, ease: "power3.out" }, 0);

    return () => tlRef.current && tlRef.current.kill();
  }, []);

  const handleMouseMove = (e) => {
    if (prefersReducedMotion() || !rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    quickX.current?.(relX * 0.04);
    quickY.current?.(relY * 0.08);
  };

  const handleMouseEnter = () => tlRef.current?.play();

  const handleMouseLeave = () => {
    quickX.current?.(0);
    quickY.current?.(0);
    tlRef.current?.reverse();
  };

  const handleRowClick = (e) => {
    e.stopPropagation();
    onPlay(sound.type);
  };

  return (
    <div
      ref={rowRef}
      onClick={handleRowClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor-hover
      className="group relative flex items-center justify-between gap-4 overflow-hidden border-b py-5 sm:py-7 lg:py-8 cursor-pointer select-none transition-colors"
      style={{ borderColor: BORDER_WARM }}
    >
      {/* Background sweep wipe */}
      <span
        ref={bgRef}
        className="pointer-events-none absolute inset-0 origin-left"
        style={{ backgroundColor: accent, transform: "scaleX(0)" }}
      />

      {/* Left Details: Index Number, Icon & Clipped Typography */}
      <div className="relative z-10 flex items-center gap-4 sm:gap-8 flex-1 min-w-0">
        <span
          ref={indexRef}
          className="shrink-0 font-mono text-xs font-bold transition-colors duration-300"
          style={{ color: TEXT_MUTED }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 group-hover:bg-[#FFFDF9] group-hover:text-[#734A26]"
          style={{ borderColor: BORDER_WARM, backgroundColor: LIGHT_BG, color: ACCENTS[0] }}
        >
          <IconComponent className="h-5 w-5" />
        </div>

        {/* Title layer with twin clipped reveal layer */}
        <div className="relative flex-1 leading-none truncate">
          <span
            className="block font-display font-black uppercase tracking-tight text-[6vw] sm:text-[4.2vw] lg:text-[2.6vw] truncate"
            style={{ color: TEXT_DARK }}
          >
            {sound.name}
          </span>
          <span
            ref={overlayRef}
            className="pointer-events-none absolute inset-0 block font-display font-black uppercase tracking-tight text-[6vw] sm:text-[4.2vw] lg:text-[2.6vw] truncate"
            style={{ color: accentText, clipPath: "inset(0 100% 0 0)" }}
          >
            {sound.name}
          </span>
        </div>
      </div>

      {/* Right Details: Metadata Tags & Interactive Action Buttons */}
      <div className="relative z-10 flex items-center gap-2 sm:gap-4 shrink-0">
        <span
          className="hidden md:inline-block font-mono text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-md border transition-colors group-hover:text-white group-hover:border-white/40"
          style={{ borderColor: BORDER_WARM, color: TEXT_MUTED }}
        >
          {sound.wave} &middot; {sound.duration}
        </span>

        <button
          ref={playBtnRef}
          onClick={handleRowClick}
          className="flex h-10 w-10 items-center justify-center rounded-xl border transition-all group-hover:border-white group-hover:bg-white group-hover:text-[#734A26]"
          style={{ borderColor: BORDER_WARM, backgroundColor: CARD_BG, color: TEXT_DARK }}
          title="Play Sound"
        >
          <TbPlayerPlay className={`h-4 w-4 ${isPlaying ? "animate-spin text-[#734A26]" : ""}`} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(sound);
          }}
          className="flex h-10 w-10 items-center justify-center rounded-xl border transition-colors group-hover:border-white/50 group-hover:text-white"
          style={{ borderColor: BORDER_WARM, backgroundColor: CARD_BG, color: TEXT_DARK }}
          title="View Code Snippet"
        >
          <TbCode className="h-4 w-4" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onCopy(sound.id, sound.type);
          }}
          className="flex h-10 w-10 items-center justify-center rounded-xl border transition-colors group-hover:border-white/50 group-hover:text-white"
          style={{ borderColor: BORDER_WARM, backgroundColor: CARD_BG, color: isCopied ? ACCENTS[0] : TEXT_DARK }}
          title="Copy Code"
        >
          {isCopied ? <TbCheck className="h-4 w-4" /> : <TbCopy className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
};

export default function UiSoundsPage() {
  const [filterText, setFilterText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeDrawerSound, setActiveDrawerSound] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [playingType, setPlayingType] = useState(null);
  const [cursorActive, setCursorActive] = useState(false);

  // Synthesizer parameters
  const [pitchShift, setPitchShift] = useState(1);
  const [volume, setVolume] = useState(0.2);

  const rootRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorX = useRef(null);
  const cursorY = useRef(null);
  const orbARef = useRef(null);
  const orbBRef = useRef(null);
  const canvasVisualizerRef = useRef([]);

  const categoryOptions = useMemo(() => ["All", ...CATEGORY_ORDER], []);

  const filteredSounds = useMemo(() => {
    return INITIAL_SOUNDS.filter((item) => {
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(filterText.toLowerCase()) ||
        item.desc.toLowerCase().includes(filterText.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, filterText]);

  // Audio trigger + Equalizer animation
  const triggerVisualizerBounce = () => {
    if (!canvasVisualizerRef.current.length) return;
    gsap.to(canvasVisualizerRef.current, {
      scaleY: () => Math.random() * 3.2 + 0.4,
      duration: 0.15,
      stagger: { amount: 0.1, from: "center" },
      yoyo: true,
      repeat: 1,
      ease: "power2.out"
    });

    // Expand background audio glow orb when audio triggers
    gsap.to(orbARef.current, {
      scale: 1.35,
      duration: 0.25,
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

  // Drifting ambient warmth orbs animation
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.to(orbARef.current, {
        x: 50,
        y: -35,
        duration: 8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
      gsap.to(orbBRef.current, {
        x: -45,
        y: 45,
        duration: 10,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

      // Row reveal trigger
      gsap.utils.toArray("[data-row]").forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, [filteredSounds]);

  // Custom magnetic cursor motion
  useLayoutEffect(() => {
    if (prefersReducedMotion() || !cursorRef.current) return;
    cursorX.current = gsap.quickTo(cursorRef.current, "x", { duration: 0.35, ease: "power3" });
    cursorY.current = gsap.quickTo(cursorRef.current, "y", { duration: 0.35, ease: "power3" });

    const move = (e) => {
      cursorX.current?.(e.clientX);
      cursorY.current?.(e.clientY);
      const hovering = e.target.closest("[data-cursor-hover]");
      setCursorActive(Boolean(hovering));
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative min-h-screen font-sans antialiased overflow-x-hidden"
      style={{ backgroundColor: LIGHT_BG, color: TEXT_DARK }}
    >
      <Navbar />

      {/* Drifting Ambient Background Glow Orbs */}
      <div
        ref={orbARef}
        className="pointer-events-none absolute -left-32 -top-32 h-[450px] w-[450px] rounded-full blur-[130px] opacity-25"
        style={{ backgroundColor: ACCENTS[0] }}
      />
      <div
        ref={orbBRef}
        className="pointer-events-none absolute -right-32 top-1/3 h-[450px] w-[450px] rounded-full blur-[130px] opacity-20"
        style={{ backgroundColor: ACCENTS[1] }}
      />

      {/* Floating Dynamic Disc Cursor */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-50 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#734A26]/40 transition-[width,height,background-color] duration-200 ease-out [@media(hover:hover)]:flex"
        style={{
          width: cursorActive ? 64 : 14,
          height: cursorActive ? 64 : 14,
          backgroundColor: cursorActive ? "rgba(115,74,38,0.15)" : "transparent",
        }}
      >
        {cursorActive && (
          <span className="font-mono text-[9px] uppercase font-bold tracking-widest text-[#734A26]">Play</span>
        )}
      </div>

      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-24 sm:pt-32 pb-32 sm:px-12">

        {/* HERO AUDIO STAGE */}
        <div className="rounded-3xl border p-8 sm:p-12 shadow-sm" style={{ backgroundColor: CARD_BG, borderColor: BORDER_WARM }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1 font-mono text-xs font-bold uppercase mb-4" style={{ backgroundColor: LIGHT_BG, borderColor: BORDER_WARM, color: ACCENTS[0] }}>
                <TbWaveSquare className="h-4 w-4 animate-spin" />
                <span>40 Zero-Latency Audio Synthesizers</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.95]" style={{ color: TEXT_DARK }}>
                Interactive <br />
                <span style={{ color: ACCENTS[0] }}>Audio Canvas</span>
              </h1>

              <p className="mt-4 text-sm sm:text-base font-medium leading-relaxed max-w-xl" style={{ color: TEXT_MUTED }}>
                Native browser Web Audio API sounds. Zero external audio downloads. Hover and play editorial sound matrix below.
              </p>
            </div>

            {/* SYNTHESIZER OSCILLATOR CONTROLS */}
            <div className="lg:col-span-5 rounded-2xl border p-6" style={{ backgroundColor: LIGHT_BG, borderColor: BORDER_WARM }}>
              <div className="flex items-center justify-between border-b pb-4 mb-4" style={{ borderColor: BORDER_WARM }}>
                <span className="font-mono text-xs font-bold uppercase tracking-wider" style={{ color: ACCENTS[0] }}>
                  Synthesizer Oscillators
                </span>

                <div className="flex items-center gap-1.5 h-8">
                  {[12, 28, 16, 32, 22, 38, 18, 26, 30, 14, 24, 10].map((h, i) => (
                    <span
                      key={i}
                      ref={(el) => (canvasVisualizerRef.current[i] = el)}
                      className="w-1.5 rounded-full inline-block origin-bottom"
                      style={{ height: `${h}px`, backgroundColor: ACCENTS[0] }}
                    />
                  ))}
                </div>
              </div>

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
                    <span style={{ color: TEXT_MUTED }}>Master Volume</span>
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

        {/* CONTROLS BAR: CATEGORY PILLS & SEARCH */}
        <motion.div
          variants={headerContainer}
          initial="hidden"
          animate="show"
          className="mt-12 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 pb-6 border-b"
          style={{ borderColor: BORDER_WARM }}
        >
          <motion.div variants={headerItem} className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {categoryOptions.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="whitespace-nowrap rounded-full px-4 py-2 font-mono text-xs font-bold uppercase border transition-all duration-200"
                  style={{
                    backgroundColor: isActive ? ACCENTS[0] : CARD_BG,
                    color: isActive ? "#FFFDF9" : TEXT_DARK,
                    borderColor: isActive ? ACCENTS[0] : BORDER_WARM,
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </motion.div>

          <motion.div variants={headerItem} className="relative w-full md:w-80 shrink-0">
            <TbSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: TEXT_MUTED }} />
            <input
              type="text"
              placeholder="Search sounds or oscillators..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="w-full rounded-full border py-3 pl-11 pr-4 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#734A26]"
              style={{ backgroundColor: CARD_BG, borderColor: BORDER_WARM, color: TEXT_DARK }}
            />
          </motion.div>
        </motion.div>

        {/* EDITORIAL ROWS LIST */}
        <div className="mt-4">
          {filteredSounds.length > 0 ? (
            filteredSounds.map((sound, i) => (
              <div data-row key={sound.id}>
                <SoundRow
                  sound={sound}
                  index={i}
                  accent={ACCENTS[i % ACCENTS.length]}
                  accentText={ACCENT_TEXT[i % ACCENT_TEXT.length]}
                  isPlaying={playingType === sound.type}
                  isCopied={copiedId === sound.id}
                  onPlay={handlePlaySound}
                  onCopy={handleCopyCode}
                  onSelect={setActiveDrawerSound}
                />
              </div>
            ))
          ) : (
            <div className="flex min-h-[260px] flex-col items-center justify-center rounded-3xl border border-dashed p-8 text-center" style={{ borderColor: BORDER_WARM }}>
              <p className="text-base font-bold uppercase tracking-wide" style={{ color: TEXT_DARK }}>
                No UI sounds matching &ldquo;{filterText}&rdquo;
              </p>
              <button
                onClick={() => {
                  setFilterText("");
                  setSelectedCategory("All");
                }}
                className="mt-3 font-mono text-xs font-bold uppercase tracking-wider underline underline-offset-4"
                style={{ color: ACCENTS[0] }}
              >
                Clear search criteria
              </button>
            </div>
          )}
        </div>

      </main>

      {/* CODE CANVAS DRAWER */}
      <AnimatePresence>
        {activeDrawerSound && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/20 backdrop-blur-sm">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-xl h-full border-l p-8 shadow-2xl flex flex-col justify-between overflow-y-auto"
              style={{ backgroundColor: CARD_BG, borderColor: BORDER_WARM }}
            >
              <div>
                <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: BORDER_WARM }}>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border" style={{ backgroundColor: LIGHT_BG, borderColor: BORDER_WARM, color: ACCENTS[0] }}>
                      <TbBrandReact className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-bold uppercase" style={{ color: TEXT_DARK }}>
                        {activeDrawerSound.name}
                      </h2>
                      <span className="font-mono text-xs uppercase font-bold" style={{ color: ACCENTS[0] }}>
                        {activeDrawerSound.wave} Synthesis &middot; {activeDrawerSound.category}
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

                <p className="mt-4 text-xs font-medium leading-relaxed" style={{ color: TEXT_MUTED }}>
                  {activeDrawerSound.desc}
                </p>

                <div className="my-6 rounded-2xl border p-5 font-mono text-xs overflow-x-auto max-h-[50vh] no-scrollbar shadow-inner" style={{ backgroundColor: TEXT_DARK, color: LIGHT_BG, borderColor: BORDER_WARM }}>
                  <pre>{getJsCodeSnippet(activeDrawerSound.type)}</pre>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-4 border-t" style={{ borderColor: BORDER_WARM }}>
                <button
                  onClick={() => handlePlaySound(activeDrawerSound.type)}
                  className="flex items-center gap-2 rounded-xl border px-5 py-3 font-mono text-xs uppercase font-bold transition-all hover:bg-black/5"
                  style={{ backgroundColor: LIGHT_BG, borderColor: BORDER_WARM, color: TEXT_DARK }}
                >
                  <TbPlayerPlay className="h-4 w-4" style={{ color: ACCENTS[0] }} />
                  <span>Test Audio</span>
                </button>

                <button
                  onClick={() => handleCopyCode(activeDrawerSound.id, activeDrawerSound.type)}
                  className="flex items-center gap-2 rounded-xl px-6 py-3 font-mono text-xs uppercase font-bold text-white shadow-md transition-all active:scale-95"
                  style={{ backgroundColor: ACCENTS[0] }}
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