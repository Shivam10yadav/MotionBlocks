import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { FiArrowDownRight, FiCornerDownRight } from 'react-icons/fi';

const PRINCIPLES = [
  {
    num: "01",
    label: "Philosophy",
    heading: "Subtract until only purpose remains.",
    text: "We view software as physical architecture. Visual noise drains cognitive bandwidth. By stripping away non-essential styling, we reveal the core logic of your product."
  },
  {
    num: "02",
    label: "Engineering",
    heading: "60fps interactions, zero bloat.",
    text: "Every transition is calculated. We blend Framer Motion's layout engine with GSAP's raw hardware-accelerated animations for fluid, instant feedback."
  },
  {
    num: "03",
    label: "Craftsmanship",
    heading: "Details that respect human intuition.",
    text: "Micro-gestures, dynamic spatial lighting, and intentional typography create interfaces that feel responsive and alive rather than static."
  }
];

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef(null);
  const spotlightRef = useRef(null);

  // GSAP Mouse Spotlight
  const handleMouseMove = (e) => {
    if (!containerRef.current || !spotlightRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(spotlightRef.current, {
      x,
      y,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full bg-[#FAF9F6] text-stone-900 overflow-hidden py-24 px-8 md:px-16 flex flex-col justify-center border-t border-stone-200/60 select-none"
    >
      {/* GSAP Dynamic Spotlight Layer */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 rounded-full bg-amber-100/50 blur-3xl opacity-60 transform -translate-x-1/2 -translate-y-1/2"
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Section Identifier */}
        <div className="flex items-center gap-3 mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-stone-400">
            [ 01 // ABOUT US ]
          </span>
          <div className="h-[1px] w-12 bg-stone-300" />
        </div>

        {/* Asymmetric Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24 items-baseline">
          <div className="lg:col-span-7">
            <h2 className="text-4xl md:text-6xl font-light tracking-tight text-stone-900 leading-[1.05]">
              We design digital artifacts with <span className="font-serif italic text-stone-700">restraint</span> and intention.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm md:text-base text-stone-500 leading-relaxed font-normal">
              Based at the intersection of spatial layout and web animation. We replace corporate layout tropes with organic spacing, high-contrast typography, and tactile motion dynamics.
            </p>
          </div>
        </div>

        {/* Interactive Principles Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 border-t border-stone-200/80">
          
          {/* Left: Tab Selector List */}
          <div className="lg:col-span-5 space-y-4">
            {PRINCIPLES.map((item, index) => {
              const isActive = activeTab === index;
              return (
                <button
                  key={item.num}
                  onClick={() => setActiveTab(index)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center justify-between group ${
                    isActive ? 'bg-stone-200/60 text-stone-900' : 'hover:bg-stone-100 text-stone-400'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-stone-400">{item.num}</span>
                    <span className={`text-base tracking-tight font-medium ${isActive ? 'text-stone-900' : 'text-stone-500'}`}>
                      {item.label}
                    </span>
                  </div>
                  <FiCornerDownRight className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-50'}`} />
                </button>
              );
            })}
          </div>

          {/* Right: Dynamic Animated Content Panel */}
          <div className="lg:col-span-7 flex flex-col justify-between min-h-[220px] bg-stone-100/40 p-8 rounded-2xl border border-stone-200/40">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-amber-700/80">
                  Core Pillar
                </span>
                <h3 className="text-2xl md:text-3xl font-medium text-stone-900 tracking-tight leading-snug">
                  {PRINCIPLES[activeTab].heading}
                </h3>
                <p className="text-sm md:text-base text-stone-500 leading-relaxed">
                  {PRINCIPLES[activeTab].text}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="pt-8 flex justify-end">
              <FiArrowDownRight className="w-5 h-5 text-stone-400" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}