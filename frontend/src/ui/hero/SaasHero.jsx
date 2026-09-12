import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ArrowDown, ArrowUpRight, Menu, Search, X, ArrowRight, Sparkles, Globe } from 'lucide-react';

export default function DsmStaggerHero() {
  const containerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Floating physics for geometric badges
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.geo-badge', {
        y: '-8px',
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        stagger: 0.18,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Stagger Container Variants for sequential reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.12, 
        delayChildren: 0.3 
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.95 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: { type: 'spring', stiffness: 85, damping: 15 } 
    },
  };

  // Editorial Fullscreen Menu Items
  const menuLinks = [
    { num: '01', title: 'Index', subtitle: 'Architecture & Foundation' },
    { num: '02', title: 'Components', subtitle: 'Interactive UI Library' },
    { num: '03', title: 'Showcase', subtitle: 'Award-Winning Projects' },
    { num: '04', title: 'Manifesto', subtitle: 'Open Source Philosophy' },
  ];

  return (
    /* OUTER CONTAINER: Warm industrial gradient background (No purples) */
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#ffe5d9] via-[#fdf0e2] to-[#e2ece9] p-3 sm:p-6 md:p-8 flex items-center justify-center font-sans overflow-hidden select-none">
      
      {/* Background Ambient Warm Lights */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-orange-300 via-amber-200 to-yellow-300 rounded-full blur-[130px] opacity-50 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-tl from-emerald-200 via-teal-200 to-cyan-200 rounded-full blur-[130px] opacity-50 pointer-events-none" />

      {/* INNER RECTANGULAR CARD: Inner Warm Gradient Mesh */}
      <motion.div 
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.97, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-7xl bg-gradient-to-br from-white/95 via-[#fffbf7]/70 to-[#f4f7f6]/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/90 px-6 sm:px-12 py-6 sm:py-8 flex flex-col justify-between min-h-[82vh] lg:min-h-[76vh] overflow-hidden z-10"
      >
        {/* Subtle Noise Texture overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#111_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.025] pointer-events-none" />

        {/* ================= HEADER NAVBAR ================= */}
        <header className="w-full flex items-center justify-between pb-4 border-b border-slate-900/10 relative z-20">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter text-slate-950">DSM</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff4d00]" />
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2.5 hover:bg-slate-900/5 rounded-full transition-colors cursor-pointer">
              <Search className="w-5 h-5 text-slate-800" />
            </button>
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="p-3 bg-slate-950 text-white hover:bg-slate-800 rounded-full transition-all cursor-pointer shadow-lg flex items-center justify-center hover:scale-105 active:scale-95"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* ================= MAIN HERO SECTION (STAGGERED REVEAL) ================= */}
        <motion.main 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-5xl mx-auto my-auto py-6 flex flex-col items-center justify-center text-center relative z-10"
        >

          {/* --- ROW 1: "o -> build ↗ (dot cluster)" --- */}
          <motion.div variants={itemVariants} className="flex items-center justify-center flex-wrap gap-3 sm:gap-6 leading-none">
            {/* Connected Circle Path */}
            <div className="flex items-center">
              <div className="w-6 h-6 sm:w-8 sm:h-8 border-[3.5px] border-slate-950 rounded-full" />
              <div className="w-8 sm:w-12 h-[3.5px] bg-slate-950" />
            </div>

            {/* Orange Arrow Badge */}
            <motion.div 
              whileHover={{ rotate: 90, scale: 1.1 }}
              className="geo-badge w-12 h-12 sm:w-18 sm:h-18 bg-[#ff4d00] rounded-full flex items-center justify-center text-slate-950 cursor-pointer shadow-md"
            >
              <span className="text-lg sm:text-2xl font-black">→</span>
            </motion.div>

            {/* Word: "build" */}
            <span className="text-[54px] sm:text-[84px] md:text-[104px] lg:text-[116px] font-black tracking-tight text-slate-950">
              build
            </span>

            {/* Arrow Up-Right */}
            <motion.div whileHover={{ scale: 1.15, rotate: 15 }}>
              <ArrowUpRight className="w-9 h-9 sm:w-14 sm:h-14 stroke-[3.5] text-slate-950" />
            </motion.div>

            {/* Dot Cluster (Emerald / X / Dark Amber - No Purple) */}
            <div className="geo-badge flex items-center gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#009b5d] rounded-full shadow-sm" />
              <X className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3.5] text-slate-950" />
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#ff9f0a] rounded-full shadow-sm" />
            </div>
          </motion.div>

          {/* --- ROW 2: "beautiful [YELLOW PILL]" --- */}
          <motion.div variants={itemVariants} className="flex items-center justify-center flex-wrap gap-3 sm:gap-6 leading-none mt-[-4px] sm:mt-[-10px]">
            <span className="text-[54px] sm:text-[84px] md:text-[104px] lg:text-[116px] font-black tracking-tight text-slate-950">
              beautiful
            </span>

            {/* Yellow Stadium Pill */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="geo-badge bg-[#ffcc00] rounded-full px-5 sm:px-8 py-2.5 sm:py-3.5 flex items-center gap-3 shadow-sm border border-slate-950/10 cursor-pointer"
            >
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-slate-950 rounded-full" />
              <div className="w-8 sm:w-12 h-[3px] bg-slate-950" />
              <div className="w-5 h-5 sm:w-6 sm:h-6 border-[3px] border-slate-950 rounded-full" />
            </motion.div>
          </motion.div>

          {/* --- ROW 3: "[D SHAPES] product" --- */}
          <motion.div variants={itemVariants} className="flex items-center justify-center flex-wrap gap-3 sm:gap-6 leading-none mt-[-4px] sm:mt-[-10px]">
            {/* D-Shapes (Emerald / Orange Half-Circles - No Purple) */}
            <div className="geo-badge flex items-center gap-1.5">
              <motion.div 
                whileHover={{ rotate: 180 }}
                className="w-7 sm:w-11 h-12 sm:h-18 bg-[#ff4d00] rounded-r-full"
              />
              <motion.div 
                whileHover={{ rotate: 180 }}
                className="w-7 sm:w-11 h-12 sm:h-18 bg-[#00c875] rounded-r-full"
              />
            </div>

            <span className="text-[54px] sm:text-[84px] md:text-[104px] lg:text-[116px] font-black tracking-tight text-slate-950">
              product
            </span>
          </motion.div>

          {/* --- ROW 4: "faster. [TRIANGLES]" --- */}
          <motion.div variants={itemVariants} className="flex items-center justify-center flex-wrap gap-3 sm:gap-6 leading-none mt-[-4px] sm:mt-[-10px]">
            <div className="relative inline-block">
              <span className="text-[54px] sm:text-[84px] md:text-[104px] lg:text-[116px] font-black tracking-tight text-slate-950">
                faster.
              </span>
              {/* Underline Bar */}
              <div className="absolute bottom-1 left-0 w-full h-[5px] sm:h-[8px] bg-slate-950 rounded-full" />
            </div>

            {/* Gear/Flower Mini Shape */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
              className="text-xl sm:text-3xl text-slate-950 font-bold"
            >
              ☸
            </motion.div>

            {/* Dual Triangles (Orange & Emerald - No Purple) */}
            <div className="geo-badge flex items-center gap-1">
              <div className="w-0 h-0 border-l-[18px] sm:border-l-[28px] border-l-transparent border-r-[18px] sm:border-r-[28px] border-r-transparent border-t-[28px] sm:border-t-[44px] border-t-[#ff4d00]" />
              <div className="w-0 h-0 border-l-[18px] sm:border-l-[28px] border-l-transparent border-r-[18px] sm:border-r-[28px] border-r-transparent border-t-[28px] sm:border-t-[44px] border-t-[#00c875]" />
            </div>
          </motion.div>

        </motion.main>

        {/* ================= FOOTER CTA AREA ================= */}
        <footer className="w-full flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pt-4 border-t border-slate-900/10 relative z-20">
          <div className="max-w-xs space-y-2 text-left">
            <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed">
              DSM is an{' '}
              <span className="text-[#009b5d] font-bold border border-[#009b5d]/40 px-1.5 py-0.5 rounded-md bg-[#009b5d]/10">
                {'{ open source }'}
              </span>{' '}
              project that celebrates internal and external contributions.
            </p>

            {/* Download Button */}
            <motion.button 
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="bg-slate-950 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg hover:bg-black transition-all cursor-pointer"
            >
              Download <ArrowDown className="w-4 h-4" />
            </motion.button>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono font-bold text-slate-500">
            <Globe className="w-4 h-4 text-[#ff4d00]" />
            <span>EDITORIAL DESIGN SYSTEM • 2026</span>
          </div>
        </footer>

      </motion.div>

      {/* ================= FULLSCREEN EDITORIAL OVERLAY MENU ================= */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-[#0d0f0e] text-white z-50 p-6 sm:p-16 flex flex-col justify-between overflow-hidden"
          >
            {/* Top Bar inside Overlay */}
            <div className="w-full flex items-center justify-between border-b border-white/10 pb-6">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-white">DSM INDEX</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff4d00]" />
              </div>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer text-white flex items-center gap-2 text-xs font-mono tracking-wider uppercase"
              >
                <span>Close</span>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Giant Editorial Nav List */}
            <div className="max-w-4xl mx-w-full my-auto py-8 space-y-6 sm:space-y-8">
              {menuLinks.map((link, i) => (
                <motion.a
                  key={link.title}
                  href="#"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-white/10 pb-6 hover:border-[#ff4d00] transition-colors"
                >
                  <div className="flex items-baseline gap-6 sm:gap-10">
                    <span className="text-sm font-mono text-[#ff4d00] font-bold">{link.num}</span>
                    <span className="text-4xl sm:text-7xl font-black tracking-tighter text-slate-200 group-hover:text-white group-hover:translate-x-3 transition-all duration-300">
                      {link.title}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm font-mono text-slate-400 mt-2 sm:mt-0 tracking-widest uppercase">
                    {link.subtitle}
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Bottom Overlay Footer */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00c875] animate-ping" />
                <span>SYSTEM STATUS: ALL SERVERS OPERATIONAL</span>
              </div>
              <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors">GitHub</a>
                <a href="#" className="hover:text-white transition-colors">Twitter / X</a>
                <a href="#" className="hover:text-white transition-colors">Figma Kit</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}