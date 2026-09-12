import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    title: "Cozy!",
    quote: "Bloomwell transformed my garden into a",
    highlight: "vibe & joyful",
    quoteEnd: "heaven filled with bouquets. It's pure magic!",
    author: "Sarah P.",
    project: "Garden Dream Project",
    category: "Garden Creation",
    rating: "5/5",
    initials: "SP",
    color: "bg-emerald-600",
  },
  {
    id: 2,
    title: "Charming!",
    quote: "The floral arrangement added such a",
    highlight: "warm & organic",
    quoteEnd: "aesthetic to our studio launch event.",
    author: "Elena M.",
    project: "Aesthetic Studio Launch",
    category: "Floral Styling",
    rating: "5/5",
    initials: "EM",
    color: "bg-amber-600",
  },
  {
    id: 3,
    title: "Pure Delight!",
    quote: "Every seasonal bouquet brings an",
    highlight: "artistic & serene",
    quoteEnd: "energy directly into our living space.",
    author: "Julian K.",
    project: "Home Refresh Project",
    category: "Landscape Design",
    rating: "5/5",
    initials: "JK",
    color: "bg-rose-500",
  },
];

// Custom Flower SVG Component replacing image assets
const FlowerDecoration = ({ className = "" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 20C42 20 40 32 50 40C60 32 58 20 50 20Z" fill="#10B981" />
    <path d="M50 80C42 80 40 68 50 60C60 68 58 80 50 80Z" fill="#10B981" />
    <path d="M20 50C20 42 32 40 40 50C32 60 20 58 20 50Z" fill="#10B981" />
    <path d="M80 50C80 42 68 40 60 50C68 60 80 58 80 50Z" fill="#10B981" />
    <path d="M29 29C23 35 34 40 40 40C40 34 35 23 29 29Z" fill="#F59E0B" />
    <path d="M71 71C77 65 66 60 60 60C60 66 65 77 71 71Z" fill="#F59E0B" />
    <path d="M71 29C65 23 60 34 60 40C66 40 77 35 71 29Z" fill="#EF4444" />
    <path d="M29 71C35 77 40 66 40 60C34 60 23 65 29 71Z" fill="#EF4444" />
    <circle cx="50" cy="50" r="10" fill="#FCD34D" />
  </svg>
);

const BerryDecoration = ({ className = "" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 80L50 40M50 60L25 45M50 50L75 35" stroke="#059669" strokeWidth="4" strokeLinecap="round" />
    <circle cx="25" cy="40" r="8" fill="#DC2626" />
    <circle cx="40" cy="28" r="8" fill="#EA580C" />
    <circle cx="60" cy="28" r="8" fill="#DC2626" />
    <circle cx="75" cy="30" r="8" fill="#EA580C" />
  </svg>
);

export default function LightTestimonial() {
  const [index, setIndex] = useState(0);
  const SLIDE_DURATION = 4500;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [index]);

  const current = testimonials[index];

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-sky-200 via-sky-100 to-amber-50 flex flex-col items-center justify-center p-6 font-serif overflow-hidden">
      
      {/* Outer Card Container */}
      <div className="relative max-w-5xl w-full bg-white/90 backdrop-blur-xl rounded-[40px] shadow-[0_20px_70px_rgba(0,0,0,0.06)] border border-white/80 p-8 md:p-16 flex flex-col items-center justify-center text-center overflow-hidden">
        
        {/* BIG BOLD BACKDROP TEXT (Watermark / Hint) */}
        <div className="absolute top-2 left-0 right-0 z-0 pointer-events-none select-none">
          <h1 className="text-[8vw] font-black uppercase tracking-widest text-#F0E0C8 leading-none">
            Testimonials
          </h1>
        </div>

        {/* Subtle Decorative Inner Arch Line */}
        <div className="absolute inset-x-10 top-8 bottom-8 border border-dashed border-emerald-900/10 rounded-[100px] pointer-events-none" />

        {/* Auto-Slide Top Timer Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-zinc-100/60">
          <motion.div
            key={index}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
            className="h-full bg-emerald-500"
          />
        </div>

        {/* Auto Sliding Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center max-w-2xl mt-4"
          >
            {/* Vector Badge Initials */}
            <div className="relative mb-6">
              <div className={`w-20 h-20 rounded-full ${current.color} flex items-center justify-center text-white text-2xl font-sans font-bold shadow-md border-4 border-white`}>
                {current.initials}
              </div>
              <FlowerDecoration className="absolute -top-3 -right-6 w-12 h-12" />
            </div>

            {/* Title */}
            <h3 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-4 tracking-tight">
              “{current.title}”
            </h3>

            {/* Quote with Highlight */}
            <p className="text-lg md:text-xl text-zinc-700 leading-relaxed mb-6 font-sans font-light">
              "{current.quote}{' '}
              <span className="bg-amber-200/80 px-2.5 py-0.5 rounded-md font-normal text-zinc-900">
                {current.highlight}
              </span>{' '}
              {current.quoteEnd}"
            </p>

            {/* Metadata Footer */}
            <div className="flex flex-col items-center space-y-1 font-sans text-sm">
              <span className="font-semibold text-zinc-900">
                {current.author} · {current.project}
              </span>
              <div className="flex items-center space-x-1 text-xs text-zinc-500">
                <span>🪴 {current.category}</span>
                <span>•</span>
                <span className="text-amber-600 font-semibold">★ {current.rating}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Decorative Corner Flowers & Berries (Pure SVGs) */}
        <div className="absolute bottom-4 left-6 md:left-12 flex items-end space-x-[-15px] opacity-90 pointer-events-none">
          <BerryDecoration className="w-16 h-16 md:w-20 md:h-20" />
          <FlowerDecoration className="w-20 h-20 md:w-24 md:h-24" />
        </div>

        <div className="absolute bottom-4 right-6 md:right-12 flex items-end space-x-[-15px] opacity-90 pointer-events-none scale-x-[-1]">
          <BerryDecoration className="w-16 h-16 md:w-20 md:h-20" />
          <FlowerDecoration className="w-20 h-20 md:w-24 md:h-24" />
        </div>

      </div>
    </section>
  );
}