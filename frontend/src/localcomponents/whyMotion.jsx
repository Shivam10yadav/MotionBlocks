import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Copy, Sliders, ShieldCheck, Code2, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    id: "copy-paste",
    step: "01",
    title: "Copy & Paste",
    description: "No extra packages or bloat. Direct access to source code built to paste straight into your project.",
    icon: Copy,
  },
  {
    id: "customizable",
    step: "02",
    title: "Fully Customizable",
    description: "Built on clean Tailwind utility classes so you can adjust styling, timings, and layouts effortlessly.",
    icon: Sliders,
  },
  {
    id: "production-ready",
    step: "03",
    title: "Production Ready",
    description: "Accessible, keyboard-navigable, and performance-tuned for smooth 60fps animations.",
    icon: ShieldCheck,
  },
  {
    id: "tech-stack",
    step: "04",
    title: "Modern Tech Stack",
    description: "Engineered specifically for React, Next.js, Tailwind CSS, and modern web application standards.",
    icon: Code2,
  },
];

export default function WhyMotions({ accentHex = "#FF7A45" }) {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Stack Overlay ScrollTrigger (Slides over Categories)
      gsap.fromTo(
        sectionRef.current,
        { y: "100vh" },
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

      // 2. Minimalist Stagger Reveal for Cards
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Micro Hover Animations with GSAP
  const handleMouseEnter = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const icon = card.querySelector("[data-card-icon]");
    const arrow = card.querySelector("[data-card-arrow]");

    gsap.to(card, {
      y: -4,
      borderColor: "rgba(255, 255, 255, 0.25)",
      duration: 0.3,
      ease: "power2.out",
    });

    if (icon) {
      gsap.to(icon, {
        scale: 1.1,
        color: accentHex,
        duration: 0.25,
        ease: "power2.out",
      });
    }

    if (arrow) {
      gsap.to(arrow, {
        x: 3,
        y: -3,
        opacity: 1,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const icon = card.querySelector("[data-card-icon]");
    const arrow = card.querySelector("[data-card-arrow]");

    gsap.to(card, {
      y: 0,
      borderColor: "rgba(255, 255, 255, 0.08)",
      duration: 0.3,
      ease: "power2.out",
    });

    if (icon) {
      gsap.to(icon, {
        scale: 1,
        color: "#9CA3AF",
        duration: 0.25,
        ease: "power2.out",
      });
    }

    if (arrow) {
      gsap.to(arrow, {
        x: 0,
        y: 0,
        opacity: 0.3,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative z-30 min-h-screen w-full rounded-t-[2.5rem] bg-[#0A0A0C] px-6 py-20 text-[#E4E4E7] shadow-[0_-25px_60px_rgba(0,0,0,0.6)] sm:px-12 sm:py-28 lg:px-16"
    >
      <div className="mx-auto flex h-full max-w-6xl flex-col justify-between">
        
        {/* Header */}
        <div className="mb-16 max-w-xl">
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            Engineered For Speed
          </p>
          <h2 className="mt-3 font-sans text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-5xl">
            Why MotionBlocks.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
            Essential UI components designed to cut down development time without sacrificing code ownership or performance.
          </p>
        </div>

        {/* Minimal 2x2 Grid Layout */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {FEATURES.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                ref={(el) => (cardsRef.current[index] = el)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-colors duration-300"
              >
                <div>
                  <div className="mb-8 flex items-center justify-between">
                    <Icon data-card-icon className="h-6 w-6 text-zinc-400 transition-colors" />
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-zinc-600">{item.step}</span>
                      <ArrowUpRight data-card-arrow className="h-4 w-4 opacity-30 text-zinc-400" />
                    </div>
                  </div>

                  <h3 className="text-lg font-medium text-white tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}