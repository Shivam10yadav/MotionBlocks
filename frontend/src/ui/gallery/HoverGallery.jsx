import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

const galleryImages = [
  {
    id: 1,
    title: "Neptune Dunes",
    category: "Architecture",
    location: "Reykjavík, Iceland",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 2,
    title: "Velvet Horizon",
    category: "Minimalism",
    location: "Kyoto, Japan",
    image: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 3,
    title: "Aetherial Ridge",
    category: "Landscape",
    location: "Zermatt, Switzerland",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 4,
    title: "Cyber Canopy",
    category: "Abstract",
    location: "Singapore",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 5,
    title: "Solar Eclipse",
    category: "Editorial",
    location: "Atacama, Chile",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1200",
  },
];

export const HoverGallery = () => {
  const [activeId, setActiveId] = useState(1);

  return (
    <section className="relative w-full overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-50 p-6 sm:p-10 dark:border-slate-800 dark:bg-slate-950 antialiased">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-b from-indigo-200/40 via-purple-100/20 to-transparent blur-3xl dark:from-indigo-900/20 dark:via-purple-900/10" />

      {/* Header */}
      <div className="relative z-10 mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-indigo-50/80 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:border-indigo-900/50 dark:bg-indigo-950/50 dark:text-indigo-400">
            <Sparkles className="h-3.5 w-3.5" />
            Featured Visuals
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Curated Showcase
          </h2>
        </div>
        <p className="max-w-xs text-sm text-slate-500 dark:text-slate-400">
          Hover over any card to smoothly expand the visual landscape and reveal gallery details.
        </p>
      </div>

      {/* Sliding Hover Accordion Gallery */}
      <div className="relative z-10 flex h-[480px] w-full flex-col gap-3 sm:flex-row sm:gap-4">
        {galleryImages.map((item) => {
          const isActive = activeId === item.id;

          return (
            <motion.div
              key={item.id}
              onMouseEnter={() => setActiveId(item.id)}
              onClick={() => setActiveId(item.id)}
              layout
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 25,
              }}
              className={`group relative flex h-full cursor-pointer overflow-hidden rounded-2xl ${
                isActive ? "sm:flex-[3.5]" : "sm:flex-[1]"
              } transition-all duration-300`}
            >
              {/* Background Image */}
              <motion.img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Gradient Vignette Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent transition-opacity duration-300" />

              {/* Vertical Title (Shown on Compact Cards in Desktop view) */}
              {!isActive && (
                <div className="absolute inset-0 hidden items-end p-6 sm:flex">
                  <span className="font-display text-lg font-semibold tracking-wide text-white/80 [writing-mode:vertical-lr] rotate-180">
                    {item.title}
                  </span>
                </div>
              )}

              {/* Active Content Drawer */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-6 sm:p-8"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-mono text-xs font-semibold uppercase tracking-widest text-indigo-300">
                          {item.category} • {item.location}
                        </span>
                        <h3 className="mt-1 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                          {item.title}
                        </h3>
                      </div>

                      <button
                        aria-label="View Project"
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-transform duration-200 hover:scale-110 hover:bg-white hover:text-slate-900"
                      >
                        <ArrowUpRight className="h-5 w-5" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default HoverGallery;