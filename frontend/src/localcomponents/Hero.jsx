import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SCRAMBLE_CHARS = "✦★✶#%&*!?/\\_+=~@$⚡";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return reduced;
}

function scrambleText(el, targetText, duration = 0.8) {
  if (!el) return;
  const state = { progress: 0 };
  gsap.to(state, {
    progress: 1,
    duration,
    ease: "power2.inOut",
    onUpdate: () => {
      const count = Math.floor(state.progress * targetText.length);
      let res = "";
      for (let i = 0; i < targetText.length; i++) {
        if (i < count || targetText[i] === " ") {
          res += targetText[i];
        } else {
          res += SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0];
        }
      }
      el.textContent = res;
    },
    onComplete: () => {
      el.textContent = targetText;
    },
  });
}

// Procedural Particle Orbit & Warp Field
function drawCanvasVFX(ctx, width, height, scrollProgress, time, accentHex) {
  ctx.clearRect(0, 0, width, height);

  const cx = width / 2;
  const cy = height / 2;
  const particleCount = 70;
  
  const speedMultiplier = 1 + scrollProgress * 3.5;
  const t = time * 0.001 * speedMultiplier;

  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * Math.PI * 2 + t * 0.25;
    const baseRadius = (Math.min(width, height) * 0.18) + (i * 3.5);
    const radius = baseRadius + scrollProgress * 180 * Math.sin(i + t);
    
    const x = cx + Math.cos(angle * (i % 2 === 0 ? 1 : -1)) * radius;
    const y = cy + Math.sin(angle * (i % 2 === 0 ? 1 : -1)) * (radius * 0.55);
    const size = 1.5 + Math.sin(i + t * 2) * 1.5;

    ctx.beginPath();
    ctx.arc(x, y, Math.max(0.5, size), 0, Math.PI * 2);
    ctx.fillStyle = i % 3 === 0 ? accentHex : "rgba(244, 243, 241, 0.4)";
    ctx.shadowBlur = i % 3 === 0 ? 16 : 0;
    ctx.shadowColor = accentHex;
    ctx.fill();
    ctx.shadowBlur = 0;

    if (i > 0 && i % 4 === 0) {
      const prevAngle = ((i - 1) / particleCount) * Math.PI * 2 + t * 0.25;
      const px = cx + Math.cos(prevAngle) * baseRadius;
      const py = cy + Math.sin(prevAngle) * (baseRadius * 0.55);

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(px, py);
      ctx.strokeStyle = `rgba(255, 122, 69, ${0.1 + scrollProgress * 0.3})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }
  }
}

export function Hero({
  eyebrow = "",
  titleWord1 = "MOTION",
  titleWord2 = "BLOCKS",
  description = "A copy-paste library of high-performance animated React components built with GSAP and Canvas VFX.",
  watermarkText = "MOTION BLOCK • KINETIC ENGINE • REACT COMPONENTS • ",
  accentHex = "#FF7A45",
  bgClassName = "bg-[#08090D]",
}) {
  const containerRef = useRef(null);
  const heroWrapperRef = useRef(null);
  const eyebrowRef = useRef(null);
  const word1Ref = useRef(null);
  const word2Ref = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const watermarkRef = useRef(null);
  const spotlightRef = useRef(null);
  const canvasRef = useRef(null);
  const scrollProgressRef = useRef(0);

  const phase2ContainerRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);

  const reduced = usePrefersReducedMotion();

  // Canvas DPI Setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Canvas Render Loop
  useEffect(() => {
    if (reduced) return;

    let animationFrameId;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const render = (time) => {
      drawCanvasVFX(
        ctx,
        canvas.width,
        canvas.height,
        scrollProgressRef.current,
        time,
        accentHex
      );
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [reduced, accentHex]);

  const renderChars = (text, customClass = "") => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className="inline-block overflow-hidden py-1"
        style={{ perspective: "1000px" }}
      >
        <span
          className={`char-inner inline-block will-change-transform ${customClass}`}
          style={{ transformOrigin: "50% 100%" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      </span>
    ));
  };

  useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      // 1. Entrance Animations
      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });

      intro.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.1
      );
      intro.add(() => scrambleText(eyebrowRef.current, eyebrow), 0.2);

      intro.fromTo(
        word1Ref.current.querySelectorAll(".char-inner"),
        { yPercent: 120, rotateX: -90, opacity: 0 },
        { yPercent: 0, rotateX: 0, opacity: 1, duration: 1, stagger: 0.03 },
        0.25
      );

      intro.fromTo(
        word2Ref.current.querySelectorAll(".char-inner"),
        { yPercent: 120, skewX: -15, opacity: 0 },
        { yPercent: 0, skewX: 0, opacity: 1, duration: 1, stagger: 0.03 },
        0.45
      );

      intro.fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.75
      );

      intro.fromTo(
        ctaRef.current.children,
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: "back.out(1.7)" },
        0.85
      );

      gsap.set([card1Ref.current, card2Ref.current, card3Ref.current], {
        opacity: 0,
        y: 60,
        scale: 0.9,
      });

      // 2. Scroll Scrubbing Timeline
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            scrollProgressRef.current = self.progress;
          },
        },
      });

      // Phase 1 Fade Out
      scrollTl.to(word1Ref.current, { xPercent: -25, opacity: 0, ease: "power1.in" }, 0);
      scrollTl.to(word2Ref.current, { xPercent: 25, opacity: 0, ease: "power1.in" }, 0);
      scrollTl.to(
        [eyebrowRef.current, descRef.current, ctaRef.current],
        { opacity: 0, y: -30, ease: "power1.in" },
        0
      );

      // Watermark Scroll Shift
      scrollTl.to(
        watermarkRef.current,
        { xPercent: -45, opacity: 0.08, ease: "none" },
        0
      );

      // Phase 2 Fade In into Blank Space
      scrollTl.to(
        phase2ContainerRef.current,
        { opacity: 1, pointerEvents: "auto", ease: "none" },
        0.35
      );

      scrollTl.to(card1Ref.current, { opacity: 1, y: 0, scale: 1, ease: "power2.out" }, 0.45);
      scrollTl.to(card2Ref.current, { opacity: 1, y: 0, scale: 1, ease: "power2.out" }, 0.55);
      scrollTl.to(card3Ref.current, { opacity: 1, y: 0, scale: 1, ease: "power2.out" }, 0.65);

    }, containerRef);

    return () => ctx.revert();
  }, [reduced, eyebrow]);

  const handleMouseMove = (e) => {
    if (reduced || !spotlightRef.current || !heroWrapperRef.current) return;
    const { clientX, clientY } = e;

    gsap.to(spotlightRef.current, {
      x: clientX,
      y: clientY,
      duration: 0.6,
      ease: "power2.out",
    });

    const { innerWidth, innerHeight } = window;
    const rotateY = (clientX / innerWidth - 0.5) * 12;
    const rotateX = (clientY / innerHeight - 0.5) * -12;

    gsap.to(heroWrapperRef.current, {
      rotateY,
      rotateX,
      duration: 1.2,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (reduced || !heroWrapperRef.current) return;
    gsap.to(heroWrapperRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 1.5,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full overflow-hidden text-[#F4F3F1] ${bgClassName}`}
      style={{ height: reduced ? "100vh" : "240vh" }}
      aria-label="Motion Block Hero Section"
    >
      <h1 className="sr-only">
        {titleWord1} {titleWord2} - {description}
      </h1>

      {/* Canvas Particle Field */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60"
      />

      {/* Mouse Spotlight Glow */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full opacity-25 blur-[120px] z-0"
        style={{ backgroundColor: accentHex }}
      />

      {/* Sticky Viewport */}
      <div className="sticky top-0 flex h-[100vh] w-full flex-col items-center justify-center overflow-hidden px-4">
        
        {/* Background Watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 z-0 opacity-[0.03] whitespace-nowrap font-black uppercase text-[24vw] select-none"
        >
          <div ref={watermarkRef} className="will-change-transform">
            {watermarkText.repeat(4)}
          </div>
        </div>

        {/* Phase 1 Main Hero */}
        <div
          ref={heroWrapperRef}
          className="relative z-10 flex flex-col items-center text-center will-change-transform"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Eyebrow Badge */}
          <div
            ref={eyebrowRef}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md shadow-inner"
          >
            <span
              className="h-2 w-2 rounded-full animate-pulse"
              style={{ backgroundColor: accentHex }}
            />
            <span className="font-mono text-xs uppercase tracking-widest text-white/80">
              {eyebrow}
            </span>
          </div>

          {/* Clean "MOTION BLOCK" Typography */}
          <div className="flex flex-col sm:flex-row items-center justify-center font-black uppercase tracking-tighter select-none leading-none gap-2 sm:gap-6">
            <div
              ref={word1Ref}
              aria-hidden="true"
              className="text-[14vw] sm:text-[11vw] md:text-[9.5vw] text-white drop-shadow-2xl"
            >
              {renderChars(titleWord1)}
            </div>

            <div
              ref={word2Ref}
              aria-hidden="true"
              className="text-[14vw] sm:text-[11vw] md:text-[9.5vw] font-outline"
              style={{
                WebkitTextStroke: `2px ${accentHex}`,
                color: "transparent",
              }}
            >
              {renderChars(titleWord2)}
            </div>
          </div>

          {/* Subtext */}
          <p
            ref={descRef}
            className="mt-6 max-w-xl text-balance text-sm font-normal text-white/70 sm:text-base md:text-lg"
          >
            {description}
          </p>

          {/* CTA Group */}
          <div
            ref={ctaRef}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <button
              type="button"
              className="rounded-full px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-black transition-transform hover:scale-105 active:scale-95 shadow-xl"
              style={{ backgroundColor: accentHex }}
            >
              Get Started
            </button>
            <button
              type="button"
              className="rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:bg-white/10 active:scale-95"
            >
              Documentation
            </button>
          </div>
        </div>

        {/* Phase 2 Scrolled Reveal Grid */}
        <div
          ref={phase2ContainerRef}
          className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center px-6 opacity-0"
        >
          <div className="mb-8 text-center">
            <h3 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-2">
              /// Next Gen UI
            </h3>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              BUILT FOR <span style={{ color: accentHex }}>SPEED & MOTION</span>
            </h2>
          </div>

          <div className="grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
            <div
              ref={card1Ref}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl shadow-2xl"
            >
              <div
                className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl font-mono text-sm font-bold text-black"
                style={{ backgroundColor: accentHex }}
              >
                01
              </div>
              <h4 className="text-lg font-bold text-white mb-2 uppercase">
                Copy & Paste
              </h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Zero extra dependencies. Copy clean React, GSAP, and Canvas code directly into your stack.
              </p>
            </div>

            <div
              ref={card2Ref}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl shadow-2xl"
            >
              <div
                className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl font-mono text-sm font-bold text-black"
                style={{ backgroundColor: accentHex }}
              >
                02
              </div>
              <h4 className="text-lg font-bold text-white mb-2 uppercase">
                Hardware Accelerated
              </h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Smooth 60 FPS performance driven by GPU transforms, Canvas loops, and GSAP contexts.
              </p>
            </div>

            <div
              ref={card3Ref}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl shadow-2xl"
            >
              <div
                className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl font-mono text-sm font-bold text-black"
                style={{ backgroundColor: accentHex }}
              >
                03
              </div>
              <h4 className="text-lg font-bold text-white mb-2 uppercase">
                Tailwind Native
              </h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Fully customized with utility classes. Theme-ready, accessible, and fully responsive out of the box.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .font-outline {
          -webkit-text-stroke: 2px ${accentHex};
          color: transparent;
          filter: drop-shadow(0 0 15px ${accentHex}40);
        }
        @media (max-width: 640px) {
          .font-outline {
            -webkit-text-stroke: 1.5px ${accentHex};
          }
        }
      `}</style>
    </section>
  );
}

export default Hero;