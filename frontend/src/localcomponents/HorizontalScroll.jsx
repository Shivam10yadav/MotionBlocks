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
  const shimmerRef = useRef(null);
  const accentTextRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const textEl = textRef.current;

    if (!section || !textEl) return;

    ScrollTrigger.getAll()
      .filter((st) => st.trigger === section)
      .forEach((st) => st.kill());

    const ctx = gsap.context(() => {
      const getScrollDistance = () => textEl.scrollWidth - window.innerWidth;

      // 1. HORIZONTAL TRACK WITH END HOLD BUFFER
      gsap.to(textEl, {
        x: () => -getScrollDistance(),
        ease: "power1.out", // Decelerates toward the end for a smooth catch
        scrollTrigger: {
          trigger: section,
          start: "top top",
          // ADDED 1.5x MULTIPLIER: Creates extra scroll weight so it holds firmly before unpinning
          end: () => `+=${getScrollDistance() * 1.5}`,
          pin: true,
          pinSpacing: true,
          // Tightened scrub response to prevent momentum overshooting
          scrub: 0.5,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // 2. SHIMMER LOOP
      if (shimmerRef.current) {
        gsap.to(shimmerRef.current, {
          backgroundPosition: "200% center",
          duration: 3.5,
          repeat: -1,
          ease: "linear",
        });
      }

      // 3. ACCENT SCALE
      if (accentTextRef.current) {
        gsap.to(accentTextRef.current, {
          scale: 1.05,
          letterSpacing: "0.02em",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getScrollDistance() * 1.5}`,
            scrub: 0.5,
          },
        });
      }
    }, sectionRef);

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());

    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    resizeObserver.observe(section);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full items-center overflow-hidden bg-[#F5F5DC] font-sans antialiased"
    >
      {/* Background Soft Glows */}
      <div
        className="pointer-events-none absolute -left-40 top-1/2 h-[450px] w-[450px] -translate-y-1/2 rounded-full opacity-[0.12] blur-[140px]"
        style={{ backgroundColor: accentHex }}
      />
      <div
        className="pointer-events-none absolute -right-40 top-1/2 h-[450px] w-[450px] -translate-y-1/2 rounded-full opacity-[0.08] blur-[140px]"
        style={{ backgroundColor: accentHex }}
      />

      {/* Main Horizontal Text Track */}
      <div className="flex w-full overflow-hidden select-none py-4">
        <h2
          ref={textRef}
          className="whitespace-nowrap font-black uppercase tracking-tighter will-change-transform text-[30vw] sm:text-[26vw] leading-none"
        >
          <span
            ref={shimmerRef}
            className="inline-block bg-clip-text text-transparent bg-[length:200%_auto]"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #2C241C 0%, #2C241C 35%, #7A6958 50%, #2C241C 65%, #2C241C 100%)",
              filter: "drop-shadow(0px 15px 12px rgba(44, 36, 28, 0.15))",
            }}
          >
            {text}
          </span>

          <span className="text-[#2C241C]/30 mx-[0.15em] inline-block">•</span>

          <span
            ref={accentTextRef}
            className="inline-block transition-transform duration-300"
            style={{
              color: accentHex,
              filter: "drop-shadow(0px 12px 10px rgba(140, 94, 50, 0.2))",
            }}
          >
            COPY & PASTE
          </span>

          <span className="text-[#2C241C]/30 mx-[0.15em] inline-block">•</span>
        </h2>
      </div>

      {/* Minimal Scroll Indicator */}
      <div className="absolute bottom-10 left-8 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#2C241C]/60 sm:left-12">
        <span
          className="h-2 w-2 rounded-full animate-ping"
          style={{ backgroundColor: accentHex }}
        />
        <span>Scroll to Explore</span>
      </div>
    </section>
  );
}