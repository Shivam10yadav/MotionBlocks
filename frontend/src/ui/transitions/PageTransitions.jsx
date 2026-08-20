import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 1. Dynamic content views
const PAGE_VIEWS = {
  Career: {
    badge: "Work History",
    heading: "5+ Years of Engineering Design",
    subheading:
      "Specialized in building scalable component libraries, design systems, and fluid Framer Motion micro-interactions.",
    items: [
      {
        role: "Senior UI Architect",
        company: "MotionBlocks Studio",
        period: "2024 - Present",
        desc: "Designed and engineered an open-source React component registry with over 10k monthly downloads.",
      },
      {
        role: "Frontend Engineer",
        company: "Vercel Ecosystem Partner",
        period: "2022 - 2024",
        desc: "Built high-performance marketing pages, design token pipelines, and headless UI primitives.",
      },
    ],
  },
  Projects: {
    badge: "Selected Work",
    heading: "Production Apps & Open Source",
    subheading:
      "A collection of interactive web tools, animation libraries, and headless UI primitives.",
    items: [
      {
        role: "Motion Registry UI",
        company: "React • Tailwind • Framer Motion",
        period: "v2.0 Released",
        desc: "A light-theme component library focusing on smooth state transitions and accessible structures.",
      },
      {
        role: "Design Token Exporter",
        company: "TypeScript • Node.js",
        period: "Open Source",
        desc: "CLI tool that parses Figma variables directly into Tailwind CSS theme configurations.",
      },
    ],
  },
  Education: {
    badge: "Academic & Certs",
    heading: "Computer Science & HCI",
    subheading:
      "Strong foundation in software engineering, human-computer interaction, and web performance.",
    items: [
      {
        role: "B.S. in Computer Science",
        company: "Institute of Technology",
        period: "2018 - 2022",
        desc: "Graduated with honors. Thesis on real-time DOM layout optimization algorithms.",
      },
      {
        role: "Meta Senior Frontend Developer",
        company: "Professional Certificate",
        period: "2023",
        desc: "Advanced Web Application Architecture, Accessibility Standards (WCAG 2.1 AA), and React Patterns.",
      },
    ],
  },
};

const TABS = ["Career", "Projects", "Education"];

export default function PageTransitions() {
  const [activeTab, setActiveTab] = useState("Career");
  const [transitionState, setTransitionState] = useState("idle"); // 'idle' | 'enter' | 'exit'
  const [pendingTab, setPendingTab] = useState(null);

  // Trigger smooth fade transition
  const handleTabClick = (tab) => {
    if (tab === activeTab || transitionState !== "idle") return;
    setPendingTab(tab);
    setTransitionState("enter");
  };

  const currentView = PAGE_VIEWS[activeTab];

  return (
    <div className="relative min-h-[580px] w-full overflow-hidden rounded-3xl border border-amber-200/80 bg-gradient-to-br from-amber-100/90 via-orange-100/70 to-amber-200/80 p-6 md:p-8 font-sans text-slate-900 shadow-xl text-left">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-amber-900/10 pb-5">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-slate-900" />
          <span className="font-serif text-lg font-bold tracking-tight text-slate-900">
            Alex Morgan
          </span>
        </div>
        <span className="rounded-full bg-amber-900/10 px-3 py-1 text-[11px] font-semibold text-amber-950">
          {currentView.badge}
        </span>
      </div>

      {/* Main Page Content */}
      <div className="mx-auto max-w-xl py-8">
        <div className="space-y-3">
          <h1 className="font-serif text-3xl md:text-4xl font-normal leading-tight text-slate-900">
            {currentView.heading}
          </h1>
          <p className="text-xs md:text-sm leading-relaxed text-slate-700/90">
            {currentView.subheading}
          </p>
        </div>

        {/* Dynamic List Items */}
        <div className="mt-6 space-y-3">
          {currentView.items.map((item, idx) => (
            <div
              key={idx}
              className="group rounded-2xl border border-amber-900/10 bg-white/60 p-4 shadow-sm backdrop-blur-sm transition hover:border-amber-900/20 hover:bg-white/80"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">{item.role}</h3>
                <span className="text-[11px] font-semibold text-amber-900/70">
                  {item.period}
                </span>
              </div>
              <p className="mt-0.5 text-xs font-medium text-slate-500">
                {item.company}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Floating Navigation Bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-1 rounded-full border border-amber-900/10 bg-amber-50/90 p-1.5 shadow-xl backdrop-blur-md">
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`relative rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                  isActive ? "text-white" : "text-slate-700 hover:text-slate-950"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="cornerFlipTabPill"
                    className="absolute inset-0 rounded-full bg-black shadow-sm"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Minimalist Pure Black Crossfade Transition */}
      <AnimatePresence mode="wait">
        {transitionState !== "idle" && (
          <motion.div
            key="black-fade-transition"
            initial={{ opacity: 0 }}
            animate={transitionState === "enter" ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={() => {
              if (transitionState === "enter") {
                // 1. Swap content when fully covered by black screen
                setActiveTab(pendingTab);
                // 2. Pause briefly for visual impact then trigger exit fade
                setTimeout(() => {
                  setTransitionState("exit");
                }, 200);
              } else if (transitionState === "exit") {
                // 3. Reset back to idle
                setTransitionState("idle");
              }
            }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black p-6 text-white"
          >
            {/* Bold White Text with Subtle Scale Reveal */}
            <motion.h2
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="text-4xl font-extrabold uppercase tracking-widest text-white md:text-6xl"
            >
              {pendingTab}
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}