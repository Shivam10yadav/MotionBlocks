import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Smartphone, Tablet, Monitor, RotateCw, ArrowLeft, ArrowUpRight, Volume2, VolumeX } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { components } from "../data/components";

gsap.registerPlugin(ScrollTrigger);

const DEVICES = [
  { key: "mobile", label: "Mobile", icon: Smartphone, width: "375px" },
  { key: "tablet", label: "Tablet", icon: Tablet, width: "768px" },
  { key: "desktop", label: "Desktop", icon: Monitor, width: "100%" },
];

const FRAGRANCE_NOTES = [
  { id: "01", label: "BERGAMOT & PEPPER", category: "TOP NOTE", desc: "Radiant, sun-kissed citrus opening with subtle spice.", x: -38, y: -22 },
  { id: "02", label: "AGARWOOD & SMOKE", category: "HEART NOTE", desc: "Dark, resinous heart harvested slow from ancient woods.", x: 38, y: -18 },
  { id: "03", label: "WHITE AMBER", category: "BASE NOTE", desc: "Warm, lingering skin-close base note that stays all day.", x: 0, y: 36 },
];

// ---------- Awwwards-Style Hero Component ----------
function AwardHeroPreview() {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const bottleRef = useRef(null);
  const headlineRef = useRef(null);
  const canvasRef = useRef(null);

  const [activeNote, setActiveNote] = useState(null);
  const [isMuted, setIsMuted] = useState(true);

  // Mouse Parallax Springs
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 18 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 18 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);

  const handlePointerMove = (e) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Particle Cursor Trail
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    let trail = [];
    const maxTrail = 20;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      trail.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        alpha: 1,
        radius: Math.random() * 6 + 3,
      });
      if (trail.length > maxTrail) trail.shift();
    };

    const parent = canvas.parentElement;
    parent.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      trail.forEach((p) => {
        p.alpha *= 0.92;
        p.radius *= 0.96;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(94, 234, 212, ${p.alpha * 0.4})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#5EEAD4";
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      parent.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // GSAP ScrollTrigger Sequence
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=220%",
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(headlineRef.current, { scale: 0.75, opacity: 0.2, filter: "blur(8px)", ease: "power2.out" }, 0)
        .fromTo(
          bottleRef.current,
          { y: -260, scale: 0.75, rotationY: -30, opacity: 0 },
          { y: 0, scale: 1.05, rotationY: 0, opacity: 1, ease: "power2.out", duration: 1 },
          0
        )
        .to(".note-node", { opacity: 1, scale: 1, stagger: 0.18, ease: "back.out(1.7)", duration: 0.6 }, 0.4)
        .to(".orbit-line", { scaleX: 1, stagger: 0.12, ease: "power2.inOut", duration: 0.5 }, 0.3);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#08090D] text-[#F4F3F1] overflow-hidden select-none font-sans rounded-xl border border-[#23262F] shadow-2xl"
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10 w-full h-full" />
      <div className="absolute inset-0 bg-radial-gradient from-[#111816]/60 via-[#08090D] to-[#08090D] pointer-events-none" />

      {/* Hero Content Stage */}
      <div className="relative w-full h-screen flex flex-col items-center justify-center px-4">
        
        {/* Kinetic Hero Headline */}
        <div ref={headlineRef} className="absolute z-10 text-center pointer-events-none top-24 sm:top-28">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-[#5EEAD4] font-code mb-2 font-semibold">
            LIMITED REACTION EDITION
          </p>
          <h1 className="font-serif text-[10vw] sm:text-[9vw] leading-[0.85] tracking-tighter uppercase font-light text-gradient">
            STILLNESS
          </h1>
        </div>

        {/* Parallax Interactive Bottle Canvas */}
        <div
          ref={stageRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          style={{ perspective: 1000 }}
          className="relative w-full max-w-3xl h-[50vh] flex items-center justify-center z-20 cursor-grab active:cursor-grabbing"
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative flex items-center justify-center w-full h-full"
          >
            <div className="absolute w-[280px] h-[280px] bg-[#5EEAD4]/10 rounded-full blur-[90px] pointer-events-none" />

            {/* Orbit Rays */}
            {FRAGRANCE_NOTES.map((note, i) => {
              const length = Math.sqrt(note.x * note.x + note.y * note.y);
              const angle = Math.atan2(note.y, note.x) * (180 / Math.PI);
              return (
                <div
                  key={i}
                  className="orbit-line absolute top-1/2 left-1/2 h-[1px] bg-gradient-to-r from-[#5EEAD4]/50 to-transparent origin-left pointer-events-none"
                  style={{
                    width: `${length * 1.2}%`,
                    transform: `rotate(${angle}deg) scaleX(0)`,
                  }}
                />
              );
            })}

            {/* Perfume Bottle SVG */}
            <div ref={bottleRef} className="relative z-30 group">
              <div className="relative transform-gpu transition-transform duration-500 group-hover:scale-105">
                <svg
                  viewBox="0 0 240 440"
                  className="w-[150px] sm:w-[190px] md:w-[230px] h-auto drop-shadow-[0_35px_50px_rgba(0,0,0,0.85)]"
                >
                  <defs>
                    <linearGradient id="capGold" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#5EEAD4" />
                      <stop offset="100%" stopColor="#14B8A6" />
                    </linearGradient>
                    <linearGradient id="glassBody" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#5EEAD4" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="liquid" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#5EEAD4" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="#0F766E" stopOpacity="0.95" />
                    </linearGradient>
                  </defs>

                  <rect x="90" y="14" width="60" height="52" rx="4" fill="url(#capGold)" />
                  <rect x="84" y="66" width="72" height="18" rx="3" fill="#111319" />
                  <rect x="102" y="84" width="36" height="26" fill="url(#capGold)" />

                  <path
                    d="M 64,110 C 64,104 74,104 84,104 L 156,104 C 166,104 176,104 176,110 L 188,200 C 194,225 194,250 194,275 L 194,386 C 194,406 178,420 158,420 L 82,420 C 62,420 46,406 46,386 L 46,275 C 46,250 46,225 52,200 Z"
                    fill="url(#glassBody)"
                    stroke="url(#capGold)"
                    strokeWidth="1.5"
                    strokeOpacity="0.6"
                  />

                  <path
                    d="M 52,230 C 50,260 50,290 50,320 L 50,380 C 50,398 64,410 82,410 L 158,410 C 176,410 190,398 190,380 L 190,320 C 190,290 190,260 188,230 Z"
                    fill="url(#liquid)"
                  />

                  <rect x="76" y="250" width="88" height="60" rx="2" fill="#FAF6F0" opacity="0.95" />
                  <text x="120" y="278" textAnchor="middle" fontFamily="serif" fontSize="13" letterSpacing="3" fill="#08090D">AUNE</text>
                  <text x="120" y="295" textAnchor="middle" fontFamily="sans-serif" fontSize="5.5" letterSpacing="1.5" fill="#14B8A6">EAU DE PARFUM</text>
                </svg>
              </div>
            </div>

            {/* Interactive Note Nodes */}
            {FRAGRANCE_NOTES.map((note) => (
              <div
                key={note.id}
                onMouseEnter={() => setActiveNote(note.id)}
                onMouseLeave={() => setActiveNote(null)}
                className="note-node absolute z-40 opacity-0 scale-75 transition-all duration-500 cursor-pointer"
                style={{
                  left: `${50 + note.x}%`,
                  top: `${50 + note.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="relative group/node flex items-center justify-center p-3">
                  <span className="absolute inset-0 rounded-full bg-[--teal]/20 animate-ping" />
                  <span className="w-3 h-3 rounded-full bg-[--teal] border-2 border-[#08090D] shadow-[0_0_15px_#5EEAD4]" />

                  <div className={`absolute left-full ml-3 w-48 p-3.5 rounded-xl bg-[#111319]/95 backdrop-blur-xl border border-[--teal]/30 shadow-2xl transition-all duration-300 pointer-events-none ${
                    activeNote === note.id ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
                  }`}>
                    <span className="text-[9px] uppercase tracking-widest text-[--teal] font-code font-semibold">{note.category}</span>
                    <p className="font-serif text-xs font-medium text-white mt-0.5">{note.label}</p>
                    <p className="text-[10px] text-white/60 leading-tight mt-1 font-light">{note.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Footer Overlay CTA */}
        <div className="absolute bottom-8 left-6 right-6 z-30 flex items-center justify-between">
          <div className="hidden sm:flex flex-col text-[10px] font-code tracking-widest text-[#8B8D98] uppercase">
            <span>VOLUME: 100 ML</span>
            <span>GRASSE, FRANCE</span>
          </div>

          <button className="flex items-center gap-2 bg-[--teal] text-[#08090D] font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full shadow-[0_8px_25px_rgba(94,234,212,0.25)] hover:scale-105 transition-all duration-300 ml-auto">
            Acquire Bottle <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- Parent Component Preview Page ----------
const ComponentPreviewPage = () => {
  const { category, slug } = useParams();
  const [device, setDevice] = useState("desktop");
  const [previewKey, setPreviewKey] = useState(0);

  const component = components.find(
    (item) => item.category === category && item.slug === slug
  );

  if (!component) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08090D] px-6 text-center text-[#F4F3F1]">
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-[#8B8D98]">
            404 / no matching part
          </p>
          <h1 className="text-2xl font-semibold">Component not found</h1>
          <Link
            to="/components"
            className="mt-6 inline-flex items-center gap-2 text-base text-[#FF7A45] hover:text-[#ff8f63]"
          >
            <ArrowLeft size={16} /> Back to components
          </Link>
        </div>
      </div>
    );
  }

  // Fallback to AwardHeroPreview if no custom component.preview exists
  const PreviewComponent = component.preview || AwardHeroPreview;

  return (
    <div className="min-h-screen w-full bg-[#08090D] text-[#F4F3F1] [--ember:#FF7A45] [--teal:#5EEAD4]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-code { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .blueprint-grid {
          background-image:
            linear-gradient(to right, rgba(94,234,212,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(94,234,212,0.08) 1px, transparent 1px);
          background-size: 28px 28px;
        }
      `}</style>

      {/* Top Controls Header */}
      <div className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 border-b border-[#23262F] bg-[#08090D]/95 px-4 py-3 backdrop-blur-md sm:px-6">
        <div className="flex min-w-0 items-center gap-2 font-code text-xs uppercase tracking-widest text-[--teal] sm:text-sm">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[--teal] shadow-[0_0_8px_#5EEAD4]" />
          <span className="truncate">{component.name}</span>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <div className="flex items-center gap-1 rounded-lg border border-[#23262F] bg-[#111319] p-1">
            {DEVICES.map((d) => {
              const Icon = d.icon;
              return (
                <button
                  key={d.key}
                  onClick={() => setDevice(d.key)}
                  aria-label={d.label}
                  title={d.label}
                  className={`flex items-center justify-center rounded-md p-1.5 transition cursor-pointer ${
                    device === d.key
                      ? "bg-[--teal]/10 text-[--teal]"
                      : "text-[#8B8D98] hover:text-[#F4F3F1]"
                  }`}
                >
                  <Icon size={14} />
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setPreviewKey((k) => k + 1)}
            aria-label="Refresh Preview"
            title="Refresh Preview"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#23262F] bg-[#111319] px-3 py-1.5 font-code text-xs uppercase tracking-widest text-[#8B8D98] transition hover:border-[--teal]/40 hover:text-[--teal] cursor-pointer"
          >
            <RotateCw size={14} />
            Refresh
          </button>
        </div>
      </div>

      {/* Grid Canvas Viewport */}
      <div className="blueprint-grid flex min-h-[calc(100vh-57px)] w-full items-center justify-center p-4 sm:p-8">
        <div
          key={previewKey}
          className="flex w-full items-center justify-center transition-[width] duration-300"
          style={{ width: DEVICES.find((d) => d.key === device)?.width, maxWidth: "100%" }}
        >
          <PreviewComponent />
        </div>
      </div>
    </div>
  );
};

export default ComponentPreviewPage;