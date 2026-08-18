import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScroll({
  text = "MOTIONBLOCKS",
  accentHex = "#8C5E32",
}) {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const textEl = textRef.current;

    if (!section || !textEl) return;

    // Defensive: kill any stale ScrollTrigger still attached to this element
    // (leftover from a fast-refresh / prior mount that wasn't captured by ctx)
    ScrollTrigger.getAll()
      .filter((st) => st.trigger === section)
      .forEach((st) => st.kill());

    const ctx = gsap.context(() => {
      const getScrollAmount = () => -(textEl.scrollWidth - window.innerWidth);

      gsap.to(textEl, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${textEl.scrollWidth - window.innerWidth}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, sectionRef);

    // Recalculate once layout/fonts have settled, without deferring creation itself
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());

    // Recalculate if container size changes (e.g. font loading or window resize)
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    resizeObserver.observe(section);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      ctx.revert(); // kills the tween + ScrollTrigger + removes the pin-spacer
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full items-center overflow-hidden bg-[#F5F5DC] font-sans antialiased"
    >
      {/* Background Glows */}
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
          className="whitespace-nowrap font-black uppercase tracking-tighter text-[#2C241C] will-change-transform text-[25vw] sm:text-[22vw] leading-none"
        >
          {text} • <span style={{ color: accentHex }}>COPY & PASTE</span> •
        </h2>
      </div>

      {/* Minimal Scroll Indicator */}
      <div className="absolute bottom-10 left-8 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#2C241C]/50 sm:left-12">
        <span
          className="h-2 w-2 rounded-full animate-pulse"
          style={{ backgroundColor: accentHex }}
        />
        <span>Scroll to Explore</span>
      </div>
    </section>
  );
}