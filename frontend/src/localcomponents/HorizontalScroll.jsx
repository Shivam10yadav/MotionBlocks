import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScroll({
  text = "MOTIONBLOCKS",
  accentHex = "#FF7A45",
}) {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const textEl = textRef.current;

    if (!section || !textEl) return;

    const ctx = gsap.context(() => {
      // Calculate total horizontal scroll distance needed
      const getScrollAmount = () => -(textEl.scrollWidth - window.innerWidth);

      const animation = gsap.to(textEl, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${textEl.scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full items-center overflow-hidden bg-[#F5F5DC] font-sans antialiased"
    >
      {/* Subtle Background Glows */}
      <div
        className="pointer-events-none absolute -left-40 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full opacity-[0.08] blur-[140px]"
        style={{ backgroundColor: accentHex }}
      />
      <div
        className="pointer-events-none absolute -right-40 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full opacity-[0.06] blur-[140px]"
        style={{ backgroundColor: accentHex }}
      />

      {/* Main Horizontal Text Track */}
      <div className="flex w-full overflow-hidden select-none">
        <h2
          ref={textRef}
          className="whitespace-nowrap italic font-black uppercase tracking-tighter text-black will-change-transform text-[25vw] sm:text-[22vw] leading-none"
        >
          {text} • <span style={{ color: accentHex }}>COPY & PASTE</span> • {text} •
        </h2>
      </div>

      {/* Minimal Scroll Indicator */}
      <div className="absolute bottom-10 left-8 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-white/40 sm:left-12">
        <span
          className="h-2 w-2 rounded-full animate-pulse"
          style={{ backgroundColor: accentHex }}
        />
        <span>Scroll to Explore</span>
      </div>
    </section>
  );
}
