import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Copy, Sliders, ShieldCheck, Code2, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    id: "copy-paste",
    step: "01",
    title: "Copy & Paste",
    description:
      "No extra packages or bloat. Direct access to clean source code engineered to paste straight into your React & Next.js projects.",
    icon: Copy,
    accent: "#FF6B35", // Warm Orange
    bgTint: "rgba(255, 107, 53, 0.08)",
  },
  {
    id: "customizable",
    step: "02",
    title: "Fully Customizable",
    description:
      "Built on flexible Tailwind utility architecture so you can tweak animations, timings, and design tokens without fighting framework defaults.",
    icon: Sliders,
    accent: "#F7931E", // Amber Orange
    bgTint: "rgba(247, 147, 30, 0.08)",
  },
  {
    id: "production-ready",
    step: "03",
    title: "Production Ready",
    description:
      "Accessible, keyboard-navigable, and hardware-accelerated for smooth 60fps renders across desktop and mobile devices.",
    icon: ShieldCheck,
    accent: "#E85D04", // Deep Terracotta
    bgTint: "rgba(232, 93, 4, 0.08)",
  },
  {
    id: "tech-stack",
    step: "04",
    title: "Modern Tech Stack",
    description:
      "Engineered specifically for modern web application workflows using modern JavaScript, GSAP, Framer Motion, and Tailwind CSS.",
    icon: Code2,
    accent: "#F4EADE", // Cream / Beige
    bgTint: "rgba(244, 234, 222, 0.08)",
  },
];

export default function WhyMotions() {
  const sectionRef = useRef(null);
  const rowsRef = useRef([]);
  const bgGlowRef = useRef(null);
  const loadingBarRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Smooth Section Pin/Overlay Entry
      gsap.fromTo(
        sectionRef.current,
        { y: "80vh" },
        {
          y: "0vh",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );

      // 2. Editorial Stagger Reveal for List Rows
      gsap.fromTo(
        rowsRef.current,
        { opacity: 0, y: 40, skewY: 1.5 },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Handle active item selection & loading bar progress trigger
  const handleSelectRow = (index) => {
    setActiveIndex(index);
    const feature = FEATURES[index];

    // Smooth ambient background color shift
    if (bgGlowRef.current) {
      gsap.to(bgGlowRef.current, {
        backgroundColor: feature.accent,
        duration: 0.8,
        ease: "power2.out",
      });
    }

    // Trigger active row bottom loading progress line
    loadingBarRef.current.forEach((bar, i) => {
      if (!bar) return;
      if (i === index) {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.6,
            ease: "power3.out",
            transformOrigin: "left center",
          }
        );
      } else {
        gsap.to(bar, { scaleX: 0, duration: 0.3 });
      }
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative z-30 min-h-screen w-full overflow-hidden rounded-t-[3rem] bg-[#0A0908] px-6 py-24 text-[#E6E1DA] shadow-[0_-30px_80px_rgba(0,0,0,0.9)] sm:px-12 sm:py-32 lg:px-20"
    >
      {/* Ambient Radial Accent Glow */}
      <div
        ref={bgGlowRef}
        className="pointer-events-none absolute -top-40 right-0 h-[650px] w-[650px] rounded-full opacity-20 blur-[150px] transition-all duration-700"
        style={{ backgroundColor: FEATURES[0].accent }}
      />

      <div className="mx-auto flex max-w-6xl flex-col justify-between">
        
        {/* Header Section */}
        <div className="mb-20 flex flex-col justify-between gap-6 border-b border-[#F4EADE]/15 pb-12 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C2B8AD]">
              [ 01 — Core Architecture ]
            </span>
            <h2 className="mt-4 font-sans text-4xl font-light tracking-tight text-[#F4EADE] sm:text-6xl lg:text-7xl">
              Why <span className="font-medium italic text-[#FF6B35]">MotionBlocks</span>.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#C2B8AD] sm:text-base">
            Bespoke interactive components engineered to eliminate development friction without sacrificing code ownership or performance.
          </p>
        </div>

        {/* Awwwards Editorial Interactive List */}
        <div className="flex flex-col border-t border-[#F4EADE]/15">
          {FEATURES.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeIndex === index;

            return (
              <div
                key={item.id}
                ref={(el) => (rowsRef.current[index] = el)}
                onMouseEnter={() => handleSelectRow(index)}
                onClick={() => handleSelectRow(index)}
                className={`group relative cursor-pointer border-b border-[#F4EADE]/15 py-8 transition-all duration-500 sm:py-10 ${
                  isActive ? "bg-[#F4EADE]/[0.03]" : "hover:bg-[#F4EADE]/[0.015]"
                }`}
              >
                {/* 1. HOVER SHIMMER LIGHT WAVE (Sweeps across on hover) */}
                <div
                  className="pointer-events-none absolute inset-0 -translate-x-full opacity-0 transition-all duration-1000 ease-in-out group-hover:translate-x-full group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, ${item.bgTint} 50%, transparent 100%)`,
                  }}
                />

                {/* 2. ACTIVE PILLAR GLOW */}
                <div
                  className="absolute left-0 top-0 h-full w-[3px] transition-all duration-500 ease-out"
                  style={{
                    backgroundColor: isActive ? item.accent : "transparent",
                    boxShadow: isActive ? `0 0 18px ${item.accent}` : "none",
                  }}
                />

                <div className="flex flex-col gap-6 px-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
                  
                  {/* Left: Step & Title */}
                  <div className="flex items-center gap-6 sm:gap-10">
                    <span
                      className="font-mono text-sm tracking-widest transition-colors duration-300"
                      style={{ color: isActive ? item.accent : "#8A8177" }}
                    >
                      {item.step}
                    </span>
                    <h3
                      className={`text-2xl font-normal tracking-tight transition-all duration-300 sm:text-4xl lg:text-5xl ${
                        isActive
                          ? "text-[#F4EADE] translate-x-2"
                          : "text-[#C2B8AD] group-hover:text-[#F4EADE]"
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>

                  {/* Right: Icon & Arrow */}
                  <div className="flex items-center gap-6">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-500"
                      style={{
                        borderColor: isActive ? item.accent : "rgba(244, 234, 222, 0.15)",
                        backgroundColor: isActive ? item.bgTint : "transparent",
                      }}
                    >
                      <Icon
                        className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                        style={{ color: isActive ? item.accent : "#C2B8AD" }}
                      />
                    </div>

                    <ArrowUpRight
                      className={`h-6 w-6 transition-all duration-500 ${
                        isActive
                          ? "rotate-45 opacity-100"
                          : "opacity-30 group-hover:opacity-70"
                      }`}
                      style={{ color: isActive ? item.accent : "#C2B8AD" }}
                    />
                  </div>
                </div>

                {/* Collapsible Content Area */}
                <div
                  className={`grid transition-all duration-500 ease-out ${
                    isActive
                      ? "grid-rows-[1fr] opacity-100 pt-6"
                      : "grid-rows-[0fr] opacity-0 pt-0"
                  }`}
                >
                  <div className="overflow-hidden px-4 pl-14 sm:pl-24">
                    <p className="max-w-2xl text-base leading-relaxed text-[#E6E1DA] sm:text-lg">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* 3. BOTTOM LOADING PROGRESS BAR (Fills up when row becomes active) */}
                <div
                  ref={(el) => (loadingBarRef.current[index] = el)}
                  className="absolute bottom-0 left-0 h-[2px] w-full scale-x-0"
                  style={{
                    backgroundColor: item.accent,
                    boxShadow: `0 0 10px ${item.accent}`,
                  }}
                />

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}