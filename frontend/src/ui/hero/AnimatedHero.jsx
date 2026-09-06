import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function AnimatedHero() {
  const mainContainerRef = useRef(null);
  const bgImageRef = useRef(null);
  const centerCardRef = useRef(null);
  const cardTiltRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightBoxRef = useRef(null);
  const detailViewRef = useRef(null);
  const glowRef = useRef(null);

  const [expanded, setExpanded] = useState(false);

  // Entrance + continuous idle animation (no scroll dependency at all)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Staggered entrance on mount
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .fromTo(
          bgImageRef.current,
          { scale: 1.12, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.2 }
        )
        .fromTo(
          leftTextRef.current,
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, duration: 0.8 },
          "-=0.7"
        )
        .fromTo(
          centerCardRef.current,
          { opacity: 0, y: 40, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9 },
          "-=0.6"
        )
        .fromTo(
          rightBoxRef.current,
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.8 },
          "-=0.7"
        );

      // 2. Idle motion loops (premium "alive" feel, zero scroll needed)

      // Card gently floats up and down forever
      gsap.to(centerCardRef.current, {
        y: -10,
        duration: 2.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Background does a slow continuous Ken Burns drift
      gsap.to(bgImageRef.current, {
        scale: 1.08,
        duration: 14,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Rating badge glow pulse
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0.9,
          scale: 1.15,
          duration: 1.6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    }, mainContainerRef);

    return () => ctx.revert();
  }, []);

  // Mouse-parallax tilt on the center card — signature "premium" interaction
  useEffect(() => {
    const card = cardTiltRef.current;
    const container = mainContainerRef.current;
    if (!card || !container) return;

    const handleMove = (e) => {
      const rect = container.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 -> 0.5
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(card, {
        rotateY: relX * 14,
        rotateX: -relY * 14,
        transformPerspective: 900,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    const handleLeave = () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    };

    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseleave", handleLeave);
    return () => {
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  // Click-to-expand: replaces the old scroll-scrubbed zoom transition
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (expanded) {
        gsap
          .timeline()
          .to([leftTextRef.current, rightBoxRef.current], {
            opacity: 0,
            y: -30,
            duration: 0.5,
            ease: "power2.inOut",
          })
          .to(
            centerCardRef.current,
            { scale: 1.15, opacity: 0, duration: 0.7, ease: "power2.inOut" },
            "<"
          )
          .to(
            bgImageRef.current,
            { scale: 1.15, duration: 0.9, ease: "power2.inOut" },
            "<"
          )
          .fromTo(
            detailViewRef.current,
            { opacity: 0, y: 50, pointerEvents: "none" },
            { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.7, ease: "power2.out" }
          );
      } else {
        gsap
          .timeline()
          .to(detailViewRef.current, {
            opacity: 0,
            y: 30,
            pointerEvents: "none",
            duration: 0.4,
            ease: "power2.inOut",
          })
          .to(
            [leftTextRef.current, rightBoxRef.current],
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            "-=0.1"
          )
          .to(
            centerCardRef.current,
            { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out" },
            "<"
          )
          .to(bgImageRef.current, { scale: 1, duration: 0.6, ease: "power2.out" }, "<");
      }
    }, mainContainerRef);

    return () => ctx.revert();
  }, [expanded]);

  return (
    <div
      ref={mainContainerRef}
      className="relative w-screen h-screen bg-slate-950 text-white font-sans overflow-hidden"
    >
      {/* Background Image with idle Ken Burns drift + dark overlay for contrast */}
      <div ref={bgImageRef} className="absolute inset-0 w-full h-full z-0">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80"
          alt="Alpine Landscape"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]" />
      </div>

      {/* Background Typography Watermark */}
      <div className="absolute top-12 left-0 right-0 flex justify-center pointer-events-none select-none overflow-hidden z-0">
        <h1 className="text-[15vw] font-black uppercase tracking-widest text-white/10 leading-none">
          APEX
        </h1>
      </div>

      {/* Navigation Bar */}
      <nav className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-8 md:px-16 py-6 w-full">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-sm font-bold text-emerald-400 shadow-md">
            ▲
          </div>
          <span className="text-2xl font-bold tracking-tight text-white drop-shadow">
            Apex<span className="text-emerald-400">.</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-white/90 backdrop-blur-xl bg-slate-900/60 px-8 py-3 rounded-full border border-white/15 shadow-xl">
          <a href="#" className="hover:text-emerald-400 transition-colors">Expeditions</a>
          <a href="#" className="hover:text-emerald-400 transition-colors">Destinations</a>
          <a href="#" className="hover:text-emerald-400 transition-colors">Membership</a>
          <a href="#" className="hover:text-emerald-400 transition-colors">About Us</a>
        </div>

        <button className="flex items-center gap-2 bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-full text-sm hover:bg-emerald-300 transition-all shadow-lg hover:shadow-emerald-400/20">
          Book Journey
        </button>
      </nav>

      {/* Hero Section Container */}
      <div className="relative z-10 w-full h-full flex items-center justify-between px-8 md:px-16">
        {/* Left Column: Heading */}
        <div ref={leftTextRef} className="w-1/3 space-y-6">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-light leading-[1.05] tracking-tight drop-shadow-md"
          >
            Reach Your <br />
            Next <span className="font-bold text-emerald-400">Summit.</span>
          </motion.h2>
          <p className="text-sm text-white/80 max-w-xs leading-relaxed">
            Curated high-altitude expeditions and luxury alpine retreats.
          </p>
        </div>

        {/* Center Column: Perfectly Centered Card, floats + tilts with cursor, click to expand */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div ref={centerCardRef} style={{ transformStyle: "preserve-3d" }}>
            <button
              ref={cardTiltRef}
              onClick={() => setExpanded((v) => !v)}
              style={{ transformStyle: "preserve-3d" }}
              className="block text-left bg-slate-900/80 border border-white/20 rounded-3xl p-3.5 shadow-2xl text-white w-[300px] backdrop-blur-xl cursor-pointer transition-shadow hover:shadow-emerald-400/10"
            >
              <div className="relative h-64 rounded-2xl overflow-hidden mb-3">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
                  alt="Swiss Alps Expedition"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-slate-950/80 border border-white/10 backdrop-blur-md px-3 py-1 rounded-full text-emerald-400 text-[10px] font-bold flex items-center gap-1.5">
                  <span
                    ref={glowRef}
                    className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_2px_rgba(52,211,153,0.6)]"
                  />
                  4.9 Premium
                </div>
                <div className="absolute bottom-3 right-3 bg-slate-950/80 border border-white/10 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-medium">
                  📍 Dolomites, Italy
                </div>
              </div>

              <div className="flex items-center justify-between px-2 pb-1">
                <div>
                  <h3 className="font-semibold text-base leading-tight">Dolomites</h3>
                  <p className="text-xs text-slate-400 font-medium">Alpine Escape</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center text-slate-950 font-bold">
                  {expanded ? "↑" : "↓"}
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Right Column: Rating Box */}
        <div ref={rightBoxRef} className="w-1/3 flex justify-end">
          <div className="backdrop-blur-xl bg-slate-900/60 border border-white/15 p-6 rounded-3xl text-white max-w-[260px] space-y-3 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <img
                  className="h-8 w-8 rounded-full ring-2 ring-emerald-400 object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  alt="User"
                />
                <img
                  className="h-8 w-8 rounded-full ring-2 ring-emerald-400 object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                  alt="User"
                />
              </div>
              <span className="text-2xl font-bold text-emerald-400">4.9/5</span>
            </div>
            <p className="text-xs text-white/80 leading-relaxed">
              Trusted by luxury travelers worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* Expanded Destination Detail View (Revealed on click, not scroll) */}
      <div
        ref={detailViewRef}
        className="absolute inset-0 z-20 flex items-center justify-center p-8 opacity-0"
        style={{ pointerEvents: "none" }}
      >
        <div className="relative w-full max-w-5xl backdrop-blur-2xl bg-slate-900/80 border border-white/20 rounded-[2.5rem] p-8 md:p-12 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <button
            onClick={() => setExpanded(false)}
            aria-label="Close detail view"
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            ✕
          </button>

          {/* Detailed Image Showcase */}
          <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
              alt="Dolomites Detail"
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 bg-emerald-400 text-slate-950 font-bold px-3 py-1 rounded-full text-xs">
              Featured Experience
            </span>
          </div>

          {/* Detailed Description */}
          <div className="space-y-6 text-white">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-widest">
              <span>📍 Dolomites, Italy</span>
              <span>•</span>
              <span>7 Days Expedition</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Dolomites Alpine Escape
            </h2>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Embark on an immersive journey through high-altitude pass routes, jagged limestone peaks, and private mountain lodges tailored for high-end adventurers.
            </p>

            {/* Spec Highlights */}
            <div className="grid grid-cols-3 gap-4 py-2 border-y border-white/10 text-center">
              <div>
                <p className="text-xs text-slate-400">Elevation</p>
                <p className="text-lg font-bold text-white">3,343 m</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Group Size</p>
                <p className="text-lg font-bold text-emerald-400">Max 8</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Difficulty</p>
                <p className="text-lg font-bold text-white">Moderate</p>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button className="bg-emerald-400 text-slate-950 font-bold px-8 py-3.5 rounded-full hover:bg-emerald-300 transition-all shadow-lg">
                Reserve Spot
              </button>
              <button className="bg-white/10 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-full hover:bg-white/20 transition-all">
                Download Itinerary
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}