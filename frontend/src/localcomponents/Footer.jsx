import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FooterTextReveal() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const mountainRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const textEl = textRef.current;

    if (!container || !textEl) return;

    const ctx = gsap.context(() => {
      // Enhanced 3D Pop-Out & Rise Reveal Timeline
      gsap.fromTo(
        textEl,
        {
          yPercent: 85,
          scale: 0.75,
          rotateX: 25,
          opacity: 0,
          filter: "blur(8px)",
        },
        {
          yPercent: -15,
          scale: 1.12, // Pops OUT toward the viewer
          rotateX: 0,
          opacity: 1,
          filter: "blur(0px)",
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 90%",
            end: "bottom bottom",
            scrub: 1.2,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={containerRef}
      className="relative flex min-h-[85vh] sm:min-h-screen w-full flex-col justify-between overflow-hidden bg-[#0A061D] text-white [perspective:1000px]"
    >
      {/* Background Radial Spotlight Glow for Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#8B5CF6]/30 via-[#6D28D9]/40 to-[#0A061D] opacity-90" />
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[400px] w-[80vw] -translate-x-1/2 rounded-full bg-[#A78BFA]/20 blur-[140px]" />

      {/* Top Header */}
      <div className="relative z-20 flex items-center justify-between px-5 pt-6 sm:px-10 sm:pt-10 font-mono text-xs sm:text-sm uppercase tracking-wider">
        <span className="cursor-pointer hover:opacity-80">▲ Top</span>
        <div className="flex gap-4 sm:gap-6">
          <a href="#about" className="hover:underline">About</a>
          <a href="#projects" className="hover:underline">Projects</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </div>
      </div>

      {/* MAIN POP-OUT ANIMATION CONTAINER */}
      <div className="relative flex w-full flex-1 items-end justify-center overflow-hidden">
        
        {/* LAYER 1 (BEHIND): POP-OUT TEXT */}
        <h1
          ref={textRef}
          className="pointer-events-none absolute z-0 text-center font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/80 text-[25vw] sm:text-[19vw] leading-none select-none will-change-transform drop-shadow-[0_25px_35px_rgba(0,0,0,0.7)] mb-[14vh] sm:mb-[18vh]"
          style={{
            textShadow:
              "0 0 50px rgba(167, 139, 250, 0.6), 0 0 100px rgba(139, 92, 246, 0.3)",
          }}
        >
          MOTION
        </h1>

        {/* LAYER 2 (IN FRONT): Responsive SVG Mountains */}
        <div
          ref={mountainRef}
          className="relative z-10 w-full h-[45vh] sm:h-[55vh] flex items-end justify-center"
        >
          <svg
            viewBox="0 0 1440 600"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-[0_-10px_20px_rgba(0,0,0,0.5)]"
          >
            {/* Back Mountain Peaks Layer */}
            <path
              d="M0 600V350L180 240L360 380L600 160L850 340L1100 200L1300 310L1440 220V600H0Z"
              fill="#7C3AED"
              fillOpacity="0.75"
            />
            {/* Midground Mountain Layer */}
            <path
              d="M0 600V420L220 280L480 440L720 210L980 400L1220 260L1440 380V600H0Z"
              fill="#5B21B6"
            />
            {/* Foreground Cutout Layer (Hides text base) */}
            <path
              d="M0 600V480L300 360L580 490L840 310L1120 460L1440 340V600H0Z"
              fill="#0A061D"
            />
          </svg>
        </div>
      </div>

      {/* Mobile-Friendly Bottom Footer Bar */}
      <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-white/10 px-5 py-4 sm:px-10 sm:py-6 font-mono text-[10px] sm:text-xs opacity-75">
        <span>© 2026 MOTIONBLOCKS</span>
        <span className="tracking-widest">SCROLL TO UNFOLD</span>
      </div>
    </footer>
  );
}