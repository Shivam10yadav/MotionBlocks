import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Copy, Sliders, ShieldCheck, Code2, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    id: "copy-paste",
    step: "01",
    title: "Copy & Paste Components",
    description:
      "No npm packages, lock-in, or bloat. Grab component source files and plug them straight into your codebase.",
    icon: Copy,
    bentoClass: "md:col-span-2 lg:col-span-2",
  },
  {
    id: "customizable",
    step: "02",
    title: "Fully Customizable",
    description:
      "Built on standard Tailwind utilities so you can tweak animations, colors, and layouts instantly.",
    icon: Sliders,
    bentoClass: "md:col-span-1 lg:col-span-1",
  },
  {
    id: "production-ready",
    step: "03",
    title: "Production Ready",
    description:
      "Fully accessible, keyboard navigable, and optimized for smooth 60fps GPU-accelerated transitions.",
    icon: ShieldCheck,
    bentoClass: "md:col-span-1 lg:col-span-1",
  },
  {
    id: "react-tailwind",
    step: "04",
    title: "React + GSAP + Tailwind",
    description:
      "Engineered specifically for modern React application architectures, App Routers, and Next.js stacks.",
    icon: Code2,
    bentoClass: "md:col-span-2 lg:col-span-2",
  },
];

export default function WhyMotions({ accentHex = "#FF7A45" }) {
  const sectionRef = useRef(null);

  // GSAP Entrance Reveal with 3D Flip Effects
  useEffect(() => {
    const cards = gsap.utils.toArray(
      sectionRef.current.querySelectorAll("[data-why-card]")
    );

    const ctx = gsap.context(() => {
      gsap.set(cards, {
        opacity: 0,
        y: 50,
        scale: 0.92,
        rotateX: -15,
      });

      ScrollTrigger.batch(cards, {
        start: "top 88%",
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.8,
            ease: "power4.out",
            stagger: 0.08,
            overwrite: true,
          }),
        once: true,
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Mouse Move: 3D Tilt & Cursor Radial Glow
  const handleMouseMove = (e, cardEl) => {
    const rect = cardEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardEl.style.setProperty("--mouse-x", `${x}px`);
    cardEl.style.setProperty("--mouse-y", `${y}px`);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    gsap.to(cardEl, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  // Micro-Animations on Mouse Enter
  const handleMouseEnterCard = (cardEl) => {
    const icon = cardEl.querySelector("[data-card-icon]");
    const stepBadge = cardEl.querySelector("[data-step-badge]");

    gsap.to(icon, {
      rotate: 12,
      scale: 1.15,
      duration: 0.3,
      ease: "back.out(1.7)",
    });

    gsap.to(stepBadge, {
      scale: 1.05,
      borderColor: accentHex,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  // Mouse Leave Reset
  const handleMouseLeaveCard = (cardEl) => {
    const icon = cardEl.querySelector("[data-card-icon]");
    const stepBadge = cardEl.querySelector("[data-step-badge]");

    gsap.to(cardEl, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power2.out",
    });

    gsap.to(icon, {
      rotate: 0,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(stepBadge, {
      scale: 1,
      borderColor: "rgba(255, 255, 255, 0.1)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#08090D] px-4 py-24 font-sans text-[#F4F3F1] antialiased sm:px-6 lg:px-8"
    >
      {/* Background Hero Ambient Glows */}
      <div
        className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full opacity-[0.12] blur-[140px]"
        style={{ backgroundColor: accentHex }}
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full opacity-[0.08] blur-[140px]"
        style={{ backgroundColor: accentHex }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-16 flex flex-col items-start space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
            <span
              className="h-2 w-2 rounded-full animate-pulse"
              style={{ backgroundColor: accentHex }}
            />
            <span className="font-mono text-xs uppercase tracking-widest text-white/80">
              Why MotionBlocks
            </span>
          </div>

          <h2 className="font-black text-4xl uppercase tracking-tight text-white sm:text-5xl lg:text-6xl">
            BUILT FOR <span style={{ color: accentHex }}>DEVELOPERS</span>
          </h2>

          <p className="max-w-2xl text-balance text-sm font-normal text-white/70 sm:text-base md:text-lg">
            Engineered to streamline your workflow without sacrificing design fidelity, code clarity, or performance flexibility.
          </p>
        </div>

        {/* Bento Grid Features Layout */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {FEATURES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                data-why-card
                onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                onMouseEnter={(e) => handleMouseEnterCard(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveCard(e.currentTarget)}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-white/20 ${item.bentoClass}`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Mouse Radial Glow Overlay */}
                <div
                  className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${accentHex}15, transparent 40%)`,
                  }}
                />

                {/* Card Header & Badges */}
                <div className="relative z-10">
                  <div className="mb-6 flex items-center justify-between">
                    <div
                      data-card-icon
                      className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-inner transition-colors duration-300 group-hover:bg-white/10"
                      style={{ color: accentHex }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <span
                      data-step-badge
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs font-semibold text-white/80 transition-colors duration-300"
                    >
                      {item.step}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 text-2xl font-black uppercase tracking-tight text-white">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs leading-relaxed text-white/60 transition-colors duration-300 group-hover:text-white/80 sm:text-sm">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Highlight Feature Marker */}
                <div className="relative z-10 mt-8 flex items-center gap-2 border-t border-white/10 pt-4 font-mono text-xs uppercase tracking-wider text-white/50 transition-colors duration-300 group-hover:text-white/80">
                  <Sparkles className="h-3.5 w-3.5" style={{ color: accentHex }} />
                  <span>Production Ready Feature</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}