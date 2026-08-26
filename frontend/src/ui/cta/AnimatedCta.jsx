import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

export default function AnimatedCta() {
  const containerRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    // GSAP parallax interaction across the full section
    const container = containerRef.current;
    const bg = bgRef.current;

    if (!container || !bg) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(bg, {
        x: (x - rect.width / 2) * 0.1,
        y: (y - rect.height / 2) * 0.1,
        duration: 0.8,
        ease: 'power2.out',
      });
    };

    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-[85vh] py-24 md:py-32 overflow-hidden flex flex-col items-center justify-center bg-neutral-950 border-y border-white/10"
    >
      {/* Full-bleed Radial Gradient Canvas */}
      <div 
        ref={bgRef}
        className="absolute inset-[-15%] pointer-events-none scale-110"
        style={{
          background: `
            radial-gradient(circle at 50% 55%, 
              #003840 0%, 
              #10b981 35%, 
              #a7f3d0 70%, 
              #ffffff 100%
            )
          `,
        }}
      />

      {/* Hero / Section Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center flex flex-col items-center justify-center">
        
        {/* Main Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tight leading-[0.95] drop-shadow-lg select-none"
        >
          Let's build <br /> something
        </motion.h1>

        {/* Floating Tilted Action Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -4, y: 20 }}
          animate={{ opacity: 1, scale: 1, rotate: -3, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          whileHover={{ 
            scale: 1.08, 
            rotate: 0,
            y: -4,
            transition: { duration: 0.2 } 
          }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 md:mt-10"
        >
          <button className="px-10 py-4 bg-neutral-900/80 backdrop-blur-md text-white font-medium text-xl rounded-2xl border border-white/20 shadow-2xl hover:bg-neutral-900 transition-colors cursor-pointer">
            Say hi!
          </button>
        </motion.div>

      </div>
    </section>
  );
}