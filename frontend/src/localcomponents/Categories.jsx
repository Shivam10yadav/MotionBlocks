import React, { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MousePointerClick,
  LayoutTemplate,
  KeyRound,
  ShoppingCart,
  Megaphone,
  Quote,
  HelpCircle,
  Users,
  Type,
  Loader2,
  Images,
  ListOrdered,
  Ghost,
  Layers,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { categories } from "../data/categories";
import { components } from "../data/components";

gsap.registerPlugin(ScrollTrigger);

const CATEGORY_META = {
  buttons: {
    icon: MousePointerClick,
    description: "Interactive triggers with micro-animations and state feedback.",
    tag: "Essential",
  },
  hero: {
    icon: LayoutTemplate,
    description: "High-impact entry layouts built to capture immediate viewer attention.",
    tag: "Featured",
  },
  auth: {
    icon: KeyRound,
    description: "Secure, smooth sign-in, sign-up, and verification flows.",
    tag: "Security",
  },
  ecommerce: {
    icon: ShoppingCart,
    description: "Product cards, interactive checkouts, and shopping modules.",
    tag: "Conversion",
  },
  "cta-sections": {
    icon: Megaphone,
    description: "Conversion-focused call-to-action blocks.",
    tag: "High Yield",
  },
  testimonials: {
    icon: Quote,
    description: "Social proof carousels, grids, and verified customer quotes.",
    tag: "Social Proof",
  },
  faq: {
    icon: HelpCircle,
    description: "Accordions and expandable question layouts.",
    tag: "Utility",
  },
  about: {
    icon: Users,
    description: "Team profiles, company timeline, and mission sections.",
    tag: "Branding",
  },
  "text-effects": {
    icon: Type,
    description: "Gradient shifts, kinetic typography, and typewriter styles.",
    tag: "Kinetic UI",
  },
  loaders: {
    icon: Loader2,
    description: "Smooth progress indicators, skeletons, and loading spinners.",
    tag: "Feedback",
  },
  galleries: {
    icon: Images,
    description: "Interactive image grids, lightboxes, and modern carousels.",
    tag: "Visuals",
  },
  pagination: {
    icon: ListOrdered,
    description: "Page navigation controls and infinite-scroll patterns.",
    tag: "Navigation",
  },
  "404-pages": {
    icon: Ghost,
    description: "Playful, interactive, and minimal not-found pages.",
    tag: "Fallback",
  },
};

const FALLBACK_META = {
  icon: Layers,
  description: "Explore curated components in this category.",
  tag: "Module",
};

// Dynamic Bento Layout pattern matching Hero's structure
function getBentoClasses(index) {
  const patterns = [
    "md:col-span-2 lg:col-span-2", // Card 0: Wide Feature
    "md:col-span-1 lg:col-span-1", // Card 1: Standard
    "md:col-span-1 lg:col-span-1", // Card 2: Standard
    "md:col-span-2 lg:col-span-2", // Card 3: Wide Highlight
    "md:col-span-1 lg:col-span-1", // Card 4: Standard
    "md:col-span-1 lg:col-span-2", // Card 5: Medium Wide
    "md:col-span-1 lg:col-span-1", // Card 6: Standard
  ];

  return patterns[index % patterns.length];
}

export default function Categories({ accentHex = "#FF7A45" }) {
  const sectionRef = useRef(null);

  const categoryCards = useMemo(() => {
    return categories
      .filter((cat) => cat.id !== "all")
      .map((cat, index) => {
        const meta = CATEGORY_META[cat.id] ?? FALLBACK_META;
        const count = components.filter((c) => c.category === cat.id).length;
        return {
          id: cat.id,
          title: cat.name,
          description: meta.description,
          icon: meta.icon,
          tag: meta.tag,
          count,
          bentoClass: getBentoClasses(index),
        };
      });
  }, []);

  // GSAP Entrance Reveal with 3D Flip Effects
useEffect(() => {
  const cards = gsap.utils.toArray(
    sectionRef.current.querySelectorAll("[data-bento-card]")
  );

  if (!cards.length) return;

  const ctx = gsap.context(() => {
    // 1. Prepare cards initially
    gsap.set(cards, {
      opacity: 0,
      y: 40,
      scale: 0.94,
      rotateX: -10,
    });

    // 2. Batch trigger execution
    ScrollTrigger.batch(cards, {
      start: "top 90%",
      once: true,
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.8,
          ease: "power4.out",
          stagger: 0.08,
          overwrite: "auto",
        });
      },
    });

    // 3. Force recalculation of scroll positions
    ScrollTrigger.refresh();
  }, sectionRef);

  return () => ctx.revert();
}, [categoryCards]);

  // Mouse Move: 3D Perspective Tilt & Cursor Radial Glow
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

  // Mouse Enter GSAP Micro-Animations
  const handleMouseEnterCard = (cardEl) => {
    const icon = cardEl.querySelector("[data-card-icon]");
    const arrow = cardEl.querySelector("[data-card-arrow]");
    const badge = cardEl.querySelector("[data-card-badge]");

    gsap.to(icon, {
      rotate: 12,
      scale: 1.15,
      duration: 0.3,
      ease: "back.out(1.7)",
    });

    gsap.to(arrow, {
      x: 3,
      y: -3,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(badge, {
      scale: 1.05,
      borderColor: accentHex,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  // Mouse Leave Reset Animations
  const handleMouseLeaveCard = (cardEl) => {
    const icon = cardEl.querySelector("[data-card-icon]");
    const arrow = cardEl.querySelector("[data-card-arrow]");
    const badge = cardEl.querySelector("[data-card-badge]");

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

    gsap.to(arrow, {
      x: 0,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(badge, {
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
      {/* Hero Ambient Spotlight Glow */}
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
              Component Library
            </span>
          </div>

          <h2 className="font-black text-4xl uppercase tracking-tight text-white sm:text-5xl lg:text-6xl">
            BROWSE BY <span style={{ color: accentHex }}>CATEGORY</span>
          </h2>

          <p className="max-w-2xl text-balance text-sm font-normal text-white/70 sm:text-base md:text-lg">
            Explore ready-to-use, accessible MotionBlocks components crafted with GSAP animations and Tailwind CSS.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {categoryCards.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                data-bento-card
                to={`/components?category=${cat.id}`}
                onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                onMouseEnter={(e) => handleMouseEnterCard(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveCard(e.currentTarget)}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-white/20 ${cat.bentoClass}`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Mouse-Driven Radial Light Glow Overlay */}
                <div
                  className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${accentHex}15, transparent 40%)`,
                  }}
                />

                {/* Top Section */}
                <div className="relative z-10">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        data-card-icon
                        className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white shadow-inner transition-colors duration-300 group-hover:bg-white/10"
                        style={{ color: accentHex }}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/60">
                        {cat.tag}
                      </span>
                    </div>

                    <span
                      data-card-badge
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs font-semibold text-white/80 transition-colors duration-300"
                    >
                      {cat.count} {cat.count === 1 ? "Item" : "Items"}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 text-2xl font-black uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-white">
                    {cat.title}
                  </h3>

                  {/* Description */}
                  <p className="line-clamp-2 text-xs leading-relaxed text-white/60 transition-colors duration-300 group-hover:text-white/80 sm:text-sm">
                    {cat.description}
                  </p>
                </div>

                {/* Bottom Section */}
                <div className="relative z-10 mt-8 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-xs font-semibold uppercase tracking-wider text-white/60 transition-colors duration-300 group-hover:text-white">
                  <span>Explore Collection</span>
                  <div
                    data-card-arrow
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-300 group-hover:border-white/20"
                    style={{ color: accentHex }}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}