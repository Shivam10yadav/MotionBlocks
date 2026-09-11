import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ArrowUpRight, Compass, Sparkles } from 'lucide-react';

export default function CleanHero() {
  const containerRef = useRef(null);
  const triangleRef = useRef(null);
  const [isInteracting, setIsInteracting] = useState(false);

  // GSAP 3D Rotation & Mouse Tracking Interaction
  useEffect(() => {
    // 1. Continuous Mid-Speed 3D Base Spin (6s loop)
    const spinTween = gsap.to(triangleRef.current, {
      rotateY: 360,
      rotateX: 360,
      rotateZ: 45,
      duration: 6, // Mid-speed pace
      repeat: -1,
      ease: 'none',
    });

    // 2. Continuous Subtle Bobbing Motion
    const bobTween = gsap.to(triangleRef.current, {
      y: -12,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    // 3. Mouse Move Tilt & Parallax Tracking
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - top) / height - 0.5; // -0.5 to 0.5

      // Smooth offset follow
      gsap.to(triangleRef.current, {
        x: x * 60,
        y: y * 60,
        skewX: x * 10,
        skewY: y * 10,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    // Reset position when mouse leaves the section
    const handleMouseLeave = () => {
      gsap.to(triangleRef.current, {
        x: 0,
        y: 0,
        skewX: 0,
        skewY: 0,
        duration: 0.8,
        ease: 'power2.out',
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      spinTween.kill();
      bobTween.kill();
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen h-[100dvh] bg-[#ECEBE7] text-[#0A0A0A] font-sans overflow-hidden flex flex-col justify-between p-3 sm:p-5 md:p-7 selection:bg-[#6000FF] selection:text-white cursor-crosshair"
    >
      
      {/* Background Grid Lines Pattern */}
      <div className="absolute inset-0 grid grid-cols-6 md:grid-cols-12 pointer-events-none opacity-[0.12] border-t border-black">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="border-r border-black h-full" />
        ))}
      </div>

      {/* Floating Capsule Navbar */}
      <header className="relative z-40 flex justify-center w-full pt-1 sm:pt-2">
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between gap-4 px-4 py-1.5 sm:py-2 bg-[#E2E1DD]/90 backdrop-blur-md rounded-full border border-black/10 shadow-md w-full max-w-lg cursor-default"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6000FF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6000FF]"></span>
            </span>
            <span className="font-black text-xs uppercase tracking-widest text-black">
              Kraften™
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-6 text-[11px] font-bold uppercase tracking-widest text-[#1C1C1C]">
            <a href="#work" className="hover:text-[#6000FF] transition-colors">Work</a>
            <a href="#about" className="hover:text-[#6000FF] transition-colors">About</a>
            <a href="#services" className="hover:text-[#6000FF] transition-colors">Services</a>
          </div>

          <button className="px-3 py-1 bg-black hover:bg-[#6000FF] text-white rounded-full text-[11px] font-bold uppercase tracking-wider transition-colors duration-200">
            Contact
          </button>
        </motion.nav>
      </header>

      {/* Main Centered Headline */}
      <motion.div 
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="relative z-10 flex justify-center items-center w-full text-center mt-5 sm:mt-8 md:mt-10"
      >
        <h1 
          className="text-[12.5vw] sm:text-[11.5vw] leading-[0.75] font-black uppercase tracking-[-0.04em] select-none text-[#0A0A0A] relative inline-block"
          style={{
            textShadow: `
              1px 1px 0px #C8C6BF,
              2px 2px 0px #A8A69F,
              3px 3px 0px #88867F,
              4px 4px 0px #68665F,
              5px 5px 12px rgba(0, 0, 0, 0.25)
            `
          }}
        >
          KRAFTEN
          <span 
            className="text-[#6000FF] inline-block px-1"
            style={{
              textShadow: `
                1px 1px 0px #4000B3,
                2px 2px 0px #300080,
                3px 3px 8px rgba(96, 0, 255, 0.35)
              `
            }}
          >
            +
          </span>
          CO
          <span 
            className="text-xs sm:text-xl md:text-2xl font-black tracking-tight text-[#0A0A0A] absolute -right-4 sm:-right-8 top-0"
            style={{ textShadow: '1px 1px 0px #A8A69F' }}
          >
            TM
          </span>
        </h1>
      </motion.div>

      {/* Centerpiece: Mid-Speed Rotating & Mouse Interactive 3D Triangle */}
      <div className="relative z-20 my-auto flex justify-center items-center w-full">
        
        {/* Left Side Micro-Info Badge */}
        <motion.div 
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="hidden lg:flex flex-col gap-1 absolute left-12 text-[10px] font-mono uppercase tracking-widest text-black/60 border-l border-black/20 pl-3 select-none"
        >
          <div className="flex items-center gap-1.5 font-bold text-black">
            <Compass className="w-3 h-3 text-[#6000FF]" />
            <span>01 / System Specs</span>
          </div>
          <span>Object: 3D Pyramid Prism</span>
          <span>Speed: Mid (6.0s Cycle)</span>
          <span>Interaction: Mouse Parallax</span>
        </motion.div>

        {/* Ambient Purple Glow */}
        <div className="absolute w-48 h-48 sm:w-64 sm:h-64 bg-[#6000FF] rounded-full blur-[70px] opacity-40 pointer-events-none" />

        {/* Floating 3D Triangle Container */}
        <div 
          onClick={() => setIsInteracting(!isInteracting)}
          className="w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 [perspective:1000px] relative cursor-pointer group flex items-center justify-center"
        >
          <div 
            ref={triangleRef} 
            className={`w-full h-full relative [transform-style:preserve-3d] transition-transform duration-300 ${isInteracting ? 'scale-125' : ''}`}
          >
            {/* Front Pyramid Face */}
            <div 
              className="absolute inset-0 bg-gradient-to-tr from-[#6000FF] via-[#8025FF] to-[#CCFF00] border border-white/50 shadow-2xl [transform:rotateY(0deg)_translateZ(25px)] flex items-center justify-center"
              style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
            >
              <Sparkles className="w-4 h-4 text-white opacity-80" />
            </div>

            {/* Back Pyramid Face */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#200055] to-[#6000FF] border border-black/40 [transform:rotateY(180deg)_translateZ(25px)]"
              style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
            />

            {/* Right Pyramid Face */}
            <div 
              className="absolute inset-0 bg-gradient-to-t from-[#CCFF00] via-[#6000FF] to-[#0A0A0A] border border-white/30 [transform:rotateY(90deg)_translateZ(25px)]"
              style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
            />

            {/* Left Pyramid Face */}
            <div 
              className="absolute inset-0 bg-gradient-to-b from-[#ECEBE7] via-[#8025FF] to-[#0A0A0A] border border-black/30 [transform:rotateY(-90deg)_translateZ(25px)]"
              style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
            />

            {/* Base Square Face */}
            <div 
              className="absolute inset-0 bg-[#0A0A0A] border border-white/20 [transform:rotateX(90deg)_translateZ(25px)]"
            />
          </div>
        </div>

        {/* Right Side Live Micro-Stats */}
        <motion.div 
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="hidden lg:flex flex-col gap-1 absolute right-12 text-[10px] font-mono uppercase tracking-widest text-black/60 border-r border-black/20 pr-3 text-right select-none"
        >
          <div className="font-bold text-black">
            <span>2026 Index — 02</span>
          </div>
          <span>Curated Geometry</span>
          <span>48.8584° N, 2.2945° E</span>
        </motion.div>

      </div>

      {/* Bottom Content Grid */}
      <div className="relative z-30 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-end w-full cursor-default">
        
        {/* Left Side: Tagline & CTA */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:col-span-6 lg:col-span-5 flex flex-col gap-2.5 items-start"
        >
          <p className="text-xs sm:text-sm font-medium leading-tight tracking-tight text-[#1C1C1C] max-w-sm">
            We shape high-impact brands, digital products, and future-forward design systems for modern creators.
          </p>

          <button className="group relative inline-flex items-center gap-2 px-4 py-2 bg-[#6000FF] hover:bg-black text-white font-semibold text-xs rounded-md transition-colors duration-200 shadow-md">
            <span>Explore Showcase</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </motion.div>

        {/* Right Side: Showcase Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="md:col-start-7 md:col-span-6 lg:col-start-8 lg:col-span-5 bg-[#CCFF00] p-3.5 sm:p-4 rounded-xl border border-black/10 text-black flex flex-col justify-between h-28 sm:h-32 md:h-36 shadow-md hover:scale-[1.01] transition-transform duration-200 cursor-pointer"
        >
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold uppercase tracking-widest bg-black text-white px-2 py-0.5 rounded-full">
              New Project
            </span>
            <ArrowUpRight className="w-4 h-4 text-black stroke-[2.5]" />
          </div>

          <div>
            <h3 
              className="text-base sm:text-xl md:text-2xl font-extrabold tracking-tight leading-none mb-1 text-black"
              style={{ textShadow: '1px 1px 0px rgba(255,255,255,0.5)' }}
            >
              Elevate the craft, <br /> skip the noise.
            </h3>
            <p className="text-[9px] sm:text-[10px] font-semibold opacity-80 uppercase tracking-wider">
              Case Study — 2026 Edition
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}