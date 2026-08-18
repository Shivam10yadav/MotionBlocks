import React, { useEffect, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { categories } from "../data/categories";
import { components } from "../data/components";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#8C5E32";
const ACCENT_SOFT = "rgba(140, 94, 50, 0.08)";
const ACCENT_BORDER = "rgba(140, 94, 50, 0.3)";

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export default function CategoriesSection() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const rowRefs = useRef([]);
  const marqueeTweens = useRef([]);
  const buttonIconRef = useRef(null);

  const categoryCards = useMemo(() => {
    return categories
      .filter((cat) => cat.id !== "all")
      .map((cat) => ({
        id: cat.id,
        title: cat.name,
        count: components.filter((c) => c.category === cat.id).length,
      }));
  }, []);

  const rowSize = Math.max(Math.ceil(categoryCards.length / 3), 1);
  const rows = useMemo(() => chunk(categoryCards, rowSize), [categoryCards, rowSize]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth stack/overlay transition over HorizontalScroll
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

      // Content reveal timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from("[data-header-eyebrow]", { opacity: 0, y: 16, duration: 0.6 })
        .from("[data-header-title]", { opacity: 0, y: 24, duration: 0.7 }, "-=0.4")
        .from(
          rowRefs.current.filter(Boolean),
          { opacity: 0, y: 30, duration: 0.8, stagger: 0.15 },
          "-=0.4"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [rows.length]);

  // Infinite marquee
  useEffect(() => {
    marqueeTweens.current.forEach((t) => t && t.kill());
    marqueeTweens.current = rowRefs.current.map((el, i) => {
      if (!el) return null;
      const track = el.querySelector("[data-marquee-track]");
      if (!track) return null;

      const direction = i % 2 === 0 ? -1 : 1;
      gsap.set(track, { xPercent: direction === -1 ? 0 : -33.333 });

      return gsap.to(track, {
        xPercent: direction === -1 ? -33.333 : 0,
        duration: 32,
        ease: "none",
        repeat: -1,
      });
    });

    return () => marqueeTweens.current.forEach((t) => t && t.kill());
  }, [rows.length]);

  const pauseRow = (i) => marqueeTweens.current[i]?.pause();
  const resumeRow = (i) => marqueeTweens.current[i]?.resume();

  const handleCardEnter = (cardEl) => {
    gsap.to(cardEl, {
      borderColor: ACCENT_BORDER,
      backgroundColor: ACCENT_SOFT,
      y: -4,
      scale: 1.02,
      boxShadow: "0 10px 25px -5px rgba(140, 94, 50, 0.12)",
      duration: 0.3,
      ease: "power2.out",
    });
    const count = cardEl.querySelector("[data-card-count]");
    const title = cardEl.querySelector("[data-card-title]");
    if (count) gsap.to(count, { color: ACCENT, backgroundColor: "rgba(140, 94, 50, 0.12)", duration: 0.25 });
    if (title) gsap.to(title, { color: ACCENT, duration: 0.25 });
  };

  const handleCardLeave = (cardEl) => {
    gsap.to(cardEl, {
      borderColor: "rgba(140, 94, 50, 0.15)",
      backgroundColor: "#FFFDF9",
      y: 0,
      scale: 1,
      boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
      duration: 0.3,
      ease: "power2.out",
    });
    const count = cardEl.querySelector("[data-card-count]");
    const title = cardEl.querySelector("[data-card-title]");
    if (count) gsap.to(count, { color: "rgba(44, 36, 28, 0.5)", backgroundColor: "rgba(0,0,0,0.04)", duration: 0.25 });
    if (title) gsap.to(title, { color: "#2C241C", duration: 0.25 });
  };

  return (
    <section
      ref={sectionRef}
      className="relative z-20 flex min-h-screen w-full flex-col justify-between rounded-t-[2.5rem] bg-[#F9F6F0] px-4 py-16 text-[#2C241C] shadow-[0_-25px_60px_rgba(0,0,0,0.12)] sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col justify-between">
        <div className="mb-8">
          <span
            data-header-eyebrow
            className="font-mono text-xs uppercase tracking-widest text-[#2C241C]/50"
          >
            Component Library
          </span>
          <h2
            data-header-title
            className="mt-3 text-4xl font-black uppercase tracking-tight text-[#2C241C] sm:text-5xl"
          >
            Browse by <span style={{ color: ACCENT }}>Category</span>
          </h2>
        </div>

        <div className="my-auto flex flex-col gap-6 py-6">
          {rows.slice(0, 3).map((row, i) => (
            <MarqueeRow
              key={i}
              row={row}
              setRowRef={(el) => (rowRefs.current[i] = el)}
              onEnterRow={() => pauseRow(i)}
              onLeaveRow={() => resumeRow(i)}
              onCardEnter={handleCardEnter}
              onCardLeave={handleCardLeave}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate("/components")}
            className="group relative flex items-center gap-3 overflow-hidden rounded-full border border-[#8C5E32]/30 bg-[#FFFDF9] px-8 py-3.5 font-mono text-xs uppercase tracking-widest text-[#2C241C] shadow-sm transition-all duration-300 hover:text-[#8C5E32]"
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                borderColor: ACCENT,
                backgroundColor: ACCENT_SOFT,
                duration: 0.25,
              });
              if (buttonIconRef.current) gsap.to(buttonIconRef.current, { x: 4, duration: 0.2 });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                borderColor: "rgba(140, 94, 50, 0.3)",
                backgroundColor: "#FFFDF9",
                duration: 0.25,
              });
              if (buttonIconRef.current) gsap.to(buttonIconRef.current, { x: 0, duration: 0.2 });
            }}
          >
            <span>View All Components</span>
            <svg
              ref={buttonIconRef}
              className="h-3.5 w-3.5 fill-current text-[#8C5E32]"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

function MarqueeRow({ row, setRowRef, onEnterRow, onLeaveRow, onCardEnter, onCardLeave }) {
  const extendedRow = [...row, ...row, ...row];

  return (
    <div
      ref={setRowRef}
      className="relative overflow-hidden py-1"
      onMouseEnter={onEnterRow}
      onMouseLeave={onLeaveRow}
    >
      <div data-marquee-track className="flex w-max gap-4">
        {extendedRow.map((cat, idx) => (
          <Link
            key={`${cat.id}-${idx}`}
            to={`/components?category=${cat.id}`}
            onMouseEnter={(e) => onCardEnter(e.currentTarget)}
            onMouseLeave={(e) => onCardLeave(e.currentTarget)}
            className="flex shrink-0 items-center gap-4 rounded-xl border border-[#8C5E32]/15 bg-[#FFFDF9] px-7 py-4 shadow-sm transition-shadow duration-300"
          >
            <span data-card-title className="text-sm font-semibold uppercase tracking-wider text-[#2C241C]">
              {cat.title}
            </span>
            <span data-card-count className="rounded-full bg-black/5 px-2.5 py-0.5 font-mono text-xs text-[#2C241C]/50 transition-colors">
              {cat.count}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}