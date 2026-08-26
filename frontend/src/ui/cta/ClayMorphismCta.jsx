import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';

export default function ClaymorphismCta() {
  const sectionRef = useRef(null);
  const parallaxLayersRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Subtle GSAP Parallax movement on mouse hover across landscape elements
    const handleMouseMove = (e) => {
      const { left, top, width, height } = section.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) / (width / 2);
      const y = (e.clientY - top - height / 2) / (height / 2);

      parallaxLayersRef.current.forEach((layer, index) => {
        if (!layer) return;
        const depth = (index + 1) * 8; // Layered depth multiplier
        gsap.to(layer, {
          x: x * depth,
          y: y * (depth * 0.5),
          duration: 0.8,
          ease: 'power2.out',
        });
      });
    };

    section.addEventListener('mousemove', handleMouseMove);
    return () => section.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const addToLayers = (el) => {
    if (el && !parallaxLayersRef.current.includes(el)) {
      parallaxLayersRef.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[85vh] py-20 overflow-hidden flex flex-col justify-between bg-[#FAF8F5] select-none"
    >
      {/* ----------------- TOP / CENTER CONTENT ----------------- */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-6 pt-12 text-center flex flex-col items-center">
        
        {/* Animated Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-neutral-900 tracking-tight leading-[1.1]"
        >
          Shape your future <br /> starting today
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 text-lg md:text-xl text-neutral-600 font-medium max-w-2xl"
        >
          Explore creative possibilities and build smarter workflows. No setup required.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          {/* Primary CTA */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 px-7 py-3.5 bg-neutral-900 text-white font-semibold rounded-2xl shadow-lg hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Start for free
            <ArrowRight className="w-4 h-4" />
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 px-7 py-3.5 bg-white/80 backdrop-blur-sm text-neutral-800 font-semibold rounded-2xl border border-neutral-300/80 shadow-sm hover:bg-white transition-colors cursor-pointer"
          >
            Explore features
            <ArrowRight className="w-4 h-4 text-neutral-500" />
          </motion.button>
        </motion.div>
      </div>

      {/* ----------------- CLAYMOPRHISM LANDSCAPE BACKGROUND ----------------- */}
      <div className="relative w-full h-64 md:h-80 mt-12 overflow-hidden pointer-events-none">
        
        {/* Layer 1: Background Pink & Gold Rolling Hills */}
        <div ref={addToLayers} className="absolute inset-0 z-0">
          <svg className="w-full h-full preserve-3d" viewBox="0 0 1440 320" fill="none" preserveAspectRatio="none">
            <path
              d="M0,192 C320,120 420,240 720,160 C1020,80 1200,200 1440,140 L1440,320 L0,320 Z"
              fill="url(#pink-gradient)"
            />
            <defs>
              <linearGradient id="pink-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#EEA5A6" />
                <stop offset="100%" stopColor="#E6898A" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Layer 2: Midground Earthy Green Hills */}
        <div ref={addToLayers} className="absolute inset-0 z-10">
          <svg className="w-full h-full" viewBox="0 0 1440 320" fill="none" preserveAspectRatio="none">
            <path
              d="M0,240 C360,160 600,280 960,200 C1200,150 1320,220 1440,190 L1440,320 L0,320 Z"
              fill="url(#green-gradient)"
            />
            <defs>
              <linearGradient id="green-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6E9A68" />
                <stop offset="100%" stopColor="#4D7048" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Layer 3: Foreground Clay Bush & Flowers (Left) */}
        <div ref={addToLayers} className="absolute bottom-0 left-4 md:left-16 z-20 flex items-end">
          {/* Clay Bush */}
          <div className="relative w-36 h-36 md:w-52 md:h-52 bg-[#5B8355] rounded-full shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.25),inset_10px_10px_20px_rgba(255,255,255,0.3)] flex items-center justify-center">
            {/* Clay Flowers */}
            <div className="absolute top-6 left-8 w-6 h-6 bg-[#E87A5D] rounded-full shadow-inner border-2 border-[#FAD02C]" />
            <div className="absolute top-16 left-20 w-8 h-8 bg-[#6B9080] rounded-full shadow-inner border-4 border-white" />
            <div className="absolute bottom-8 left-10 w-7 h-7 bg-[#FAD02C] rounded-full shadow-inner border-2 border-white" />
          </div>
        </div>

        {/* Layer 4: Foreground Clay Trees & Bushes (Right) */}
        <div ref={addToLayers} className="absolute bottom-0 right-4 md:right-16 z-20 flex items-end">
          {/* Main Clay Tree */}
          <div className="relative flex flex-col items-center">
            {/* Foliage */}
            <div className="w-32 h-44 md:w-44 md:h-56 bg-[#4A7C59] rounded-[4rem] shadow-[inset_-12px_-12px_24px_rgba(0,0,0,0.3),inset_10px_10px_20px_rgba(255,255,255,0.25)] relative">
              {/* Decorative Clay Bees / Butterflies */}
              <div className="absolute top-8 right-4 w-4 h-4 bg-[#FAD02C] rounded-full shadow-sm animate-bounce" />
            </div>
            {/* Trunk */}
            <div className="w-6 h-16 md:w-8 md:h-20 bg-[#8C5E3C] rounded-t-lg -mt-4 shadow-[inset_-4px_-4px_10px_rgba(0,0,0,0.3)]" />
          </div>

          {/* Secondary Clay Bush */}
          <div className="relative -ml-8 w-28 h-28 md:w-40 md:h-40 bg-[#3B6645] rounded-full shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.25)] flex items-center justify-center">
            <div className="w-6 h-6 bg-[#E6898A] rounded-full shadow-inner border-2 border-white" />
          </div>
        </div>

      </div>
    </section>
  );
}