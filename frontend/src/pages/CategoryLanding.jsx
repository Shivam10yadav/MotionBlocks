import { useState, useMemo, useRef, useLayoutEffect } from "react";
import { useSearchParams } from "react-router-dom";
import gsap from "gsap";
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
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { categories } from "../data/categories";
import { components } from "../data/components";

const CATEGORY_META = {
  buttons: { icon: MousePointerClick, description: "Interactive triggers with micro-animations and loading states." },
  hero: { icon: LayoutTemplate, description: "High-impact entry layouts built to capture attention." },
  auth: { icon: KeyRound, description: "Sign-in, sign-up, and authentication flows." },
  ecommerce: { icon: ShoppingCart, description: "Product cards, checkout, and shopping components." },
  "cta-sections": { icon: Megaphone, description: "Conversion-focused call-to-action blocks." },
  testimonials: { icon: Quote, description: "Social proof layouts and customer quotes." },
  faq: { icon: HelpCircle, description: "Accordion and expandable question layouts." },
  about: { icon: Users, description: "Team, mission, and story sections." },
  "text-effects": { icon: Type, description: "Gradient shifts, typewriter styles, kinetic typography." },
  loaders: { icon: Loader2, description: "Smooth progress indicators, skeletons, and spinners." },
  galleries: { icon: Images, description: "Image grids, lightboxes, and carousels." },
  pagination: { icon: ListOrdered, description: "Page controls and infinite-scroll patterns." },
  "404-pages": { icon: Ghost, description: "Playful and minimal not-found pages." },
};

const FALLBACK_META = { icon: Layers, description: "Explore curated components in this category." };

const ACCENTS = ["#FF7A45", "#5EEAD4"];
const PAPER = "#F4F3F1";

// Small, believable resting tilts — a printed strip that's been handled,
// not thrown across the desk.
const TILTS = [-2, 1.5, -1, 2, -1.5, 1];

/**
 * A single ticket stub: main panel + perforated tear line + a narrow
 * stub carrying the component count, vertical-text style. A sheet of
 * paper sits just behind it, offset and rotated slightly, so every
 * ticket reads as mounted onto the same backing sheet — the "white
 * layer" that visually threads the whole strip together.
 */
const CategoryCard = ({ cat, openCategory, accent, tilt }) => {
  const Icon = cat.icon;
  const wrapRef = useRef(null);
  const paperRef = useRef(null);

  useLayoutEffect(() => {
    gsap.set(wrapRef.current, { rotation: tilt });
  }, [tilt]);

  const handleMouseEnter = () => {
    gsap.to(wrapRef.current, {
      rotation: 0,
      y: -10,
      scale: 1.04,
      duration: 0.45,
      ease: "power3.out",
    });
    gsap.to(paperRef.current, {
      x: 10,
      y: 12,
      rotate: 4,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(wrapRef.current, {
      rotation: tilt,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
    });
    gsap.to(paperRef.current, {
      x: 6,
      y: 7,
      rotate: 2.5,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  return (
    <div ref={wrapRef} className="relative w-[300px] shrink-0 will-change-transform">
      {/* backing sheet — the connecting white layer behind every ticket */}
      <div
        ref={paperRef}
        className="absolute inset-0"
        style={{
          backgroundColor: PAPER,
          borderRadius: 8,
          transform: "translate(6px, 7px) rotate(2.5deg)",
          boxShadow: "0 6px 14px -8px rgba(0,0,0,0.5)",
        }}
      />

      <button
        onClick={() => openCategory(cat.id)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative block w-full text-left"
      >
        {/* perforation notches, cut into the ticket at the tear line */}
        <span
          className="absolute z-10 h-3 w-3 rounded-full"
          style={{ backgroundColor: PAPER, top: -6, right: 52 }}
        />
        <span
          className="absolute z-10 h-3 w-3 rounded-full"
          style={{ backgroundColor: PAPER, bottom: -6, right: 52 }}
        />

        <div
          className="relative flex overflow-hidden border border-[#23262F] bg-[#0D0E14]"
          style={{ borderRadius: 8, boxShadow: "0 10px 22px -12px rgba(0,0,0,0.6)" }}
        >
          {/* accent edge */}
          <span className="absolute left-0 top-0 h-full w-1" style={{ backgroundColor: accent }} />

          {/* main panel */}
          <div className="flex flex-1 flex-col justify-between border-r border-dashed border-[#23262F] p-6 pl-7">
            <div className="flex h-10 w-10 items-center justify-center border border-[#23262F] text-[#8B8D98] transition-colors duration-300 group-hover:border-current"
                 style={{ color: undefined }}
            >
              <Icon className="h-5 w-5" style={{ color: "#8B8D98" }} />
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold tracking-tight text-white">{cat.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#8B8D98]">{cat.description}</p>
            </div>

            <div className="mt-6 font-code text-[10px] tracking-wider text-[#8B8D98]">
              ADMIT ONE · {cat.id.toUpperCase()}
            </div>
          </div>

          {/* stub */}
          <div className="flex w-14 flex-col items-center justify-between py-6" style={{ backgroundColor: `${accent}12` }}>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: accent }} />
            <span
              className="font-code text-[10px] font-semibold tracking-[0.2em] text-white"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              {String(cat.count).padStart(2, "0")} COMPONENTS
            </span>
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />
          </div>
        </div>
      </button>
    </div>
  );
};

const CategoryLanding = () => {
  const [, setSearchParams] = useSearchParams();
  const [filterText, setFilterText] = useState("");

  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  const categoryCards = useMemo(() => {
    return categories
      .filter((cat) => cat.id !== "all")
      .map((cat) => {
        const meta = CATEGORY_META[cat.id] ?? FALLBACK_META;
        const count = components.filter((c) => c.category === cat.id).length;
        return {
          id: cat.id,
          title: cat.name,
          description: meta.description,
          icon: meta.icon,
          count,
        };
      });
  }, []);

  const filteredCategories = useMemo(() => {
    if (!filterText.trim()) return categoryCards;
    const q = filterText.toLowerCase();
    return categoryCards.filter(
      (c) => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
    );
  }, [categoryCards, filterText]);

  const totalComponents = useMemo(
    () => categoryCards.reduce((acc, curr) => acc + curr.count, 0),
    [categoryCards]
  );

  const openCategory = (id) => {
    const next = new URLSearchParams();
    next.set("category", id);
    setSearchParams(next);
  };

  const numCards = filteredCategories.length;
  const loopList = numCards > 0 ? [...filteredCategories, ...filteredCategories] : [];

  useLayoutEffect(() => {
    if (numCards === 0 || !trackRef.current) return;

    const tween = gsap.to(trackRef.current, {
      xPercent: -50,
      duration: numCards * 4.5,
      ease: "none",
      repeat: -1,
    });
    tweenRef.current = tween;

    return () => tween.kill();
  }, [numCards]);

  const step = (direction) => {
    const tween = tweenRef.current;
    if (!tween || numCards === 0) return;
    const fraction = 1 / numCards;
    const target = gsap.utils.wrap(0, 1, tween.progress() + direction * fraction);

    tween.pause();
    gsap.to(tween, {
      progress: target,
      duration: 0.6,
      ease: "power3.out",
      onComplete: () => tween.play(),
    });
  };

  const pause = () => tweenRef.current?.pause();
  const resume = () => tweenRef.current?.play();

  return (
    <div className="space-y-10 py-4">
      {/* Header */}
      <div className="border-b border-[#23262F] pb-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="font-code text-xs tracking-wider text-[#8B8D98]">
              <span style={{ color: ACCENTS[0] }}>{categoryCards.length} CATEGORIES</span>
              {" · "}
              <span style={{ color: ACCENTS[1] }}>{totalComponents} COMPONENTS</span>
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Browse categories
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#8B8D98]">
              Select a category to mount live previews on demand — the index
              stays fast with zero canvas lag.
            </p>
          </div>

          <div className="relative w-full max-w-sm">
            <Search className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B8D98]" />
            <input
              type="text"
              placeholder="Search categories..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="w-full border-b border-[#23262F] bg-transparent py-3 pl-7 text-sm text-[#F4F3F1] placeholder-[#8B8D98] transition-colors duration-300 focus:border-[#FF7A45] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Strip controls */}
      <div className="flex items-center justify-between">
        <p className="font-code text-xs tracking-wider text-[#8B8D98]">
          AUTO-SCROLLING · HOVER TO PAUSE
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => step(-1)}
            aria-label="Previous"
            className="flex h-9 w-9 items-center justify-center border border-[#23262F] text-[#8B8D98] transition-colors duration-300 hover:border-[#FF7A45]/50 hover:text-[#FF7A45]"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => step(1)}
            aria-label="Next"
            className="flex h-9 w-9 items-center justify-center border border-[#23262F] text-[#8B8D98] transition-colors duration-300 hover:border-[#5EEAD4]/50 hover:text-[#5EEAD4]"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Auto-scrolling strip, corkboard-style backdrop */}
      {numCards > 0 ? (
        <div
          className="overflow-hidden py-8"
          style={{
            backgroundImage: "radial-gradient(rgba(139,141,152,0.15) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
          onMouseEnter={pause}
          onMouseLeave={resume}
        >
          <div ref={trackRef} className="flex w-max gap-10 px-3">
            {loopList.map((cat, i) => (
              <CategoryCard
                key={`${cat.id}-${i}`}
                cat={cat}
                openCategory={openCategory}
                accent={ACCENTS[i % 2]}
                tilt={TILTS[i % TILTS.length]}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex min-h-[200px] flex-col items-center justify-center border border-[#23262F] p-8 text-center">
          <p className="text-base text-white">
            No categories found matching "{filterText}"
          </p>
          <button
            onClick={() => setFilterText("")}
            className="mt-4 font-code text-xs tracking-wider text-[#FF7A45] underline underline-offset-4"
          >
            RESET SEARCH
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryLanding;