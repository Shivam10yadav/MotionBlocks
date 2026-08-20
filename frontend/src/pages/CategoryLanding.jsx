import { useState, useMemo, useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, ArrowUpRight } from "lucide-react";
import { categories } from "../data/categories";
import { components } from "../data/components";

gsap.registerPlugin(ScrollTrigger);

const ACCENTS = ["#FF7A45", "#5EEAD4"];
const ACCENT_TEXT = ["#1A0A04", "#04201C"];

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Framer Motion variants for the header block
const headerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const headerItem = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * One editorial row: giant index-cased typography, a color-wipe
 * background that sweeps in on hover, and a second copy of the title
 * clipped to reveal in sync with the sweep — so the text itself
 * appears to change color as the wipe passes under it, not just fade.
 */
const CategoryRow = ({ cat, index, accent, accentText, openTo }) => {
  const bgRef = useRef(null);
  const overlayRef = useRef(null);
  const arrowRef = useRef(null);
  const tlRef = useRef(null);

  useLayoutEffect(() => {
    tlRef.current = gsap
      .timeline({ paused: true })
      .to(bgRef.current, { scaleX: 1, duration: 0.55, ease: "power3.out" }, 0)
      .fromTo(
        overlayRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 0.55, ease: "power3.out" },
        0
      )
      .to(arrowRef.current, { rotate: 45, x: 4, duration: 0.4, ease: "power3.out" }, 0);
    return () => tlRef.current.kill();
  }, []);

  const enter = () => tlRef.current.play();
  const leave = () => tlRef.current.reverse();

  return (
    <Link
      to={openTo}
      onMouseEnter={enter}
      onMouseLeave={leave}
      onFocus={enter}
      onBlur={leave}
      data-cursor-hover
      className="group relative flex items-center gap-4 overflow-hidden border-b border-[#23262F] py-6 focus-visible:outline-none sm:gap-8 sm:py-8 lg:py-9"
    >
      {/* color wipe */}
      <span
        ref={bgRef}
        className="pointer-events-none absolute inset-0 origin-left"
        style={{ backgroundColor: accent, transform: "scaleX(0)" }}
      />

      {/* index */}
      <span className="relative shrink-0 font-code text-xs text-[#5C5F6B] transition-colors duration-300 sm:text-sm">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* title, base layer + clipped overlay in the second color */}
      <span className="relative flex-1 leading-[0.95]">
        <span className="block font-display font-black uppercase tracking-tight text-[#8B8D98] text-[9vw] sm:text-[6vw] lg:text-[3.4vw]">
          {cat.title}
        </span>
        <span
          ref={overlayRef}
          className="pointer-events-none absolute inset-0 block font-display font-black uppercase tracking-tight text-[9vw] sm:text-[6vw] lg:text-[3.4vw]"
          style={{ color: accentText, clipPath: "inset(0 100% 0 0)" }}
        >
          {cat.title}
        </span>
      </span>

      {/* count + arrow */}
      <span className="relative flex shrink-0 items-center gap-3 font-code text-xs text-[#8B8D98] transition-colors duration-300 sm:text-sm">
        <span className="hidden sm:inline">{cat.count} components</span>
        <ArrowUpRight ref={arrowRef} className="h-5 w-5 sm:h-6 sm:w-6" />
      </span>
    </Link>
  );
};

/**
 * Magnetic CTA: a real navigable link (not a button with an onClick
 * side-effect) that pulls itself toward the cursor while hovered,
 * within a small radius, then snaps back on leave. React Router's
 * <Link> forwards refs, so the same magnetic-tracking approach works
 * unchanged.
 */
const MagneticButton = ({ children, to }) => {
  const btnRef = useRef(null);
  const quickX = useRef(null);
  const quickY = useRef(null);

  useLayoutEffect(() => {
    if (!btnRef.current) return;
    quickX.current = gsap.quickTo(btnRef.current, "x", { duration: 0.5, ease: "power3" });
    quickY.current = gsap.quickTo(btnRef.current, "y", { duration: 0.5, ease: "power3" });
  }, []);

  const handleMove = (e) => {
    if (prefersReducedMotion()) return;
    const rect = btnRef.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    quickX.current?.(relX * 0.35);
    quickY.current?.(relY * 0.35);
  };

  const handleLeave = () => {
    quickX.current?.(0);
    quickY.current?.(0);
  };

  return (
    <Link
      ref={btnRef}
      to={to}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor-hover
      className="group relative flex items-center gap-3 rounded-full border border-[#23262F] bg-[#111319] px-8 py-4 font-code text-xs uppercase tracking-widest text-white transition-colors duration-300 hover:border-[--ember] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--ember]"
    >
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
};

const CategoryLanding = () => {
  const [filterText, setFilterText] = useState("");
  const [cursorActive, setCursorActive] = useState(false);

  const rootRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorX = useRef(null);
  const cursorY = useRef(null);
  const orbARef = useRef(null);
  const orbBRef = useRef(null);

  const categoryCards = useMemo(() => {
    return categories
      .filter((cat) => cat.id !== "all")
      .map((cat) => ({
        id: cat.id,
        title: cat.name,
        count: components.filter((c) => c.category === cat.id).length,
      }));
  }, []);

  const filteredCategories = useMemo(() => {
    if (!filterText.trim()) return categoryCards;
    const q = filterText.toLowerCase();
    return categoryCards.filter((c) => c.title.toLowerCase().includes(q));
  }, [categoryCards, filterText]);

  const totalComponents = useMemo(
    () => categoryCards.reduce((acc, curr) => acc + curr.count, 0),
    [categoryCards]
  );

  const openCategory = (id) => `/components?category=${id}`;

  // Drifting background orbs + row scroll-reveal. Skipped for
  // prefers-reduced-motion.
  useLayoutEffect(() => {
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap.to(orbARef.current, {
          x: 60,
          y: -40,
          duration: 9,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
        gsap.to(orbBRef.current, {
          x: -50,
          y: 50,
          duration: 11,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      gsap.utils.toArray("[data-row]").forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: reduced ? 0 : 26 },
          {
            opacity: 1,
            y: 0,
            duration: reduced ? 0.01 : 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, [filteredCategories.length]);

  // Custom cursor
  useLayoutEffect(() => {
    if (prefersReducedMotion() || !cursorRef.current) return;
    cursorX.current = gsap.quickTo(cursorRef.current, "x", { duration: 0.35, ease: "power3" });
    cursorY.current = gsap.quickTo(cursorRef.current, "y", { duration: 0.35, ease: "power3" });

    const move = (e) => {
      cursorX.current?.(e.clientX);
      cursorY.current?.(e.clientY);
      const hovering = e.target.closest("[data-cursor-hover]");
      setCursorActive(Boolean(hovering));
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={rootRef}
      className="[--ember:#FF7A45] [--teal:#5EEAD4] relative overflow-hidden py-4"
    >
      {/* drifting background orbs */}
      <div
        ref={orbARef}
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[--ember]/10 blur-[110px]"
      />
      <div
        ref={orbBRef}
        className="pointer-events-none absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-[--teal]/8 blur-[110px]"
      />

      {/* custom cursor — desktop pointer only */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-50 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 transition-[width,height,background-color] duration-200 ease-out [@media(hover:hover)]:flex"
        style={{
          width: cursorActive ? 64 : 14,
          height: cursorActive ? 64 : 14,
          backgroundColor: cursorActive ? "rgba(255,122,69,0.15)" : "transparent",
        }}
      >
        {cursorActive && (
          <span className="font-code text-[9px] uppercase tracking-widest text-white">View</span>
        )}
      </div>

      <div className="relative z-10 space-y-14">
        {/* Header */}
        <motion.div
          variants={headerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-8 border-b border-[#23262F] pb-10 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <motion.p
              variants={headerItem}
              className="font-code text-xs uppercase tracking-[0.3em] text-[--teal]"
            >
              {categoryCards.length} categories · {totalComponents} components
            </motion.p>
            <motion.h1
              variants={headerItem}
              className="mt-4 font-display text-5xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              Browse the
              <br />
              library
            </motion.h1>
          </div>

          <motion.div variants={headerItem} className="relative w-full max-w-sm">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B8D98]" />
            <label htmlFor="category-search" className="sr-only">
              Search categories
            </label>
            <input
              id="category-search"
              type="text"
              placeholder="Search categories..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="w-full rounded-full border border-[#23262F] bg-[#111319] py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-[#5C5F6B] outline-none transition-colors duration-300 focus:border-[--ember] focus:ring-1 focus:ring-[--ember]/30"
            />
          </motion.div>
        </motion.div>

        {/* Rows */}
        {filteredCategories.length > 0 ? (
          <div>
            {filteredCategories.map((cat, i) => (
              <div data-row key={cat.id}>
                <CategoryRow
                  cat={cat}
                  index={i}
                  accent={ACCENTS[i % 2]}
                  accentText={ACCENT_TEXT[i % 2]}
                  openTo={openCategory(cat.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex min-h-[240px] flex-col items-center justify-center rounded-3xl border border-dashed border-[#23262F] p-8 text-center">
            <p className="text-lg font-semibold text-white">
              No categories found matching "{filterText}"
            </p>
            <button
              onClick={() => setFilterText("")}
              className="mt-3 font-code text-xs font-bold uppercase tracking-wider text-[--ember] underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--ember]"
            >
              Reset search
            </button>
          </div>
        )}

        {/* CTA */}
        <div className="flex justify-center pt-6">
          <MagneticButton to="/components">View everything</MagneticButton>
        </div>
      </div>
    </div>
  );
};

export default CategoryLanding;