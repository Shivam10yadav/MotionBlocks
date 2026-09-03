import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { 
  FiArrowDown, 
  FiZap, 
  FiCornerDownRight, 
  FiPlus, 
  FiEye,
  FiSlash
} from 'react-icons/fi';

export default function BrutalistHero() {
  const marqueeRef = useRef(null);
  const marqueeTrackRef = useRef(null);

  // GSAP Infinite Horizontal Marquee
  useEffect(() => {
    if (!marqueeTrackRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(marqueeTrackRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 12,
        ease: 'none',
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#F3F2EB] text-[#111111] font-mono selection:bg-[#111111] selection:text-[#CCFF00] flex flex-col justify-between p-3 sm:p-6 border-8 border-[#111111]">
      
      {/* 1. Centered Top Header / Issue Identifier */}
      <header className="border-b-4 border-[#111111] pb-4 flex flex-col items-center justify-center text-center gap-2 bg-[#F3F2EB]">
        <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest">
          <span>VOL. 09</span>
          <span className="h-2 w-2 bg-[#FF2A00] inline-block" />
          <span>SEPTEMBER 2026 ISSUE</span>
          <span className="h-2 w-2 bg-[#111111] inline-block" />
          <span>EDITORIAL ARCHITECTURE</span>
        </div>
        <div className="text-[10px] sm:text-xs font-bold border-2 border-[#111111] px-3 py-0.5 bg-white uppercase shadow-[3px_3px_0px_0px_#111111]">
          PRINT & DIGITAL PUBLICATION
        </div>
      </header>

      {/* 2. Main Centered Editorial Content Area */}
      <main className="flex-grow flex flex-col items-center justify-center text-center py-10 sm:py-16 max-w-5xl mx-auto w-full">
        
        {/* Top Tag / Subtitle */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 border-2 border-[#111111] bg-[#CCFF00] px-4 py-1.5 font-black text-xs uppercase shadow-[4px_4px_0px_0px_#111111] mb-8"
        >
          <FiZap className="text-base text-[#FF2A00]" />
          <span>RAW MEDIA & UNFILTERED DESIGN</span>
        </motion.div>

        {/* Central Giant Typography Stack */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-2 sm:space-y-4 w-full"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85] text-center">
            THE BRUTALIST
          </h1>
          
          <div className="flex items-center justify-center gap-2 sm:gap-4 my-2">
            <span className="hidden sm:inline-block h-1 sm:h-2 flex-grow bg-[#111111]" />
            <span className="text-xl sm:text-4xl md:text-5xl font-black italic bg-[#FF2A00] text-white px-4 py-1 border-4 border-[#111111] shadow-[6px_6px_0px_0px_#111111] -rotate-1">
              MANIFESTO
            </span>
            <span className="hidden sm:inline-block h-1 sm:h-2 flex-grow bg-[#111111]" />
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85] text-center">
            FOR DIGITAL ERA
          </h1>
        </motion.div>

        {/* Centered Editorial Intro Paragraph */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 text-sm sm:text-base md:text-lg font-bold max-w-2xl mx-auto border-t-4 border-b-4 border-[#111111] py-4 bg-white px-6 shadow-[6px_6px_0px_0px_#111111]"
        >
          Stripped of decoration. Centered on high-contrast typography, heavy grid lines, and raw layout structures. Built for extreme legibility and maximum impact.
        </motion.p>

        {/* Centered Call to Action Group */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md"
        >
          <button className="w-full sm:w-auto h-16 px-8 bg-[#111111] text-[#CCFF00] font-black text-lg border-4 border-[#111111] uppercase flex items-center justify-center gap-3 shadow-[6px_6px_0px_0px_#FF2A00] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
            <FiEye className="text-2xl" />
            <span>READ THE ISSUE</span>
          </button>

          <button className="w-full sm:w-auto h-16 px-8 bg-white text-[#111111] font-black text-lg border-4 border-[#111111] uppercase flex items-center justify-center gap-2 shadow-[6px_6px_0px_0px_#111111] hover:bg-[#CCFF00] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
            <FiCornerDownRight className="text-2xl" />
            <span>INDEX[09]</span>
          </button>
        </motion.div>

      </main>

      {/* 3. Centered Editorial Data Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-t-4 border-b-4 border-[#111111] bg-white divide-y-4 md:divide-y-0 md:divide-x-4 divide-[#111111] text-center my-6">
        <div className="p-4 flex flex-col items-center justify-center">
          <span className="text-xs font-black uppercase text-[#FF2A00]">SECTION 01</span>
          <span className="text-lg font-black uppercase mt-1">GRID SYSTEMS</span>
          <p className="text-[11px] font-bold text-neutral-600">STRICT MONOSPACE COLUMNS</p>
        </div>

        <div className="p-4 flex flex-col items-center justify-center bg-[#CCFF00]">
          <span className="text-xs font-black uppercase bg-[#111111] text-white px-2 py-0.5">SECTION 02</span>
          <span className="text-lg font-black uppercase mt-1">ZERO GRADIENTS</span>
          <p className="text-[11px] font-black text-[#111111]">100% SOLID FLATS & SHADOWS</p>
        </div>

        <div className="p-4 flex flex-col items-center justify-center">
          <span className="text-xs font-black uppercase text-[#FF2A00]">SECTION 03</span>
          <span className="text-lg font-black uppercase mt-1">TYPOGRAPHY</span>
          <p className="text-[11px] font-bold text-neutral-600">HEAVYWEIGHT BLOCK HEADINGS</p>
        </div>
      </div>

      {/* 4. Ticker / Marquee Banner */}
      <footer className="border-4 border-[#111111] bg-[#111111] text-white overflow-hidden whitespace-nowrap font-black text-lg uppercase tracking-wider py-3">
        <div ref={marqueeRef} className="w-full overflow-hidden">
          <div ref={marqueeTrackRef} className="inline-block whitespace-nowrap">
            <span className="mx-6 text-[#CCFF00]">EDITORIAL BRUTALISM</span>
            <span className="mx-6">★ ISSUE NO. 09</span>
            <span className="mx-6 text-[#FF2A00]">HIGH CONTRAST</span>
            <span className="mx-6">★ CENTER-FOCUSED LAYOUT</span>
            <span className="mx-6 text-[#CCFF00]">EDITORIAL BRUTALISM</span>
            <span className="mx-6">★ ISSUE NO. 09</span>
            <span className="mx-6 text-[#FF2A00]">HIGH CONTRAST</span>
            <span className="mx-6">★ CENTER-FOCUSED LAYOUT</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

