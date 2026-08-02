import React, { useState } from "react";
import { motion } from "framer-motion";

export const LightHero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePosition({
      x: (clientX / innerWidth - 0.5) * 30,
      y: (clientY / innerHeight - 0.5) * 30,
    });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] w-full overflow-hidden bg-[#FAF8F5] text-stone-900 flex items-center justify-center px-6 py-20"
    >
      {/* Soft Animated Organic Background Blobs */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{ x: mousePosition.x * -0.5, y: mousePosition.y * -0.5 }}
        className="absolute top-10 left-10 h-[420px] w-[420px] rounded-full bg-gradient-to-tr from-amber-200/50 via-orange-100/40 to-yellow-100/30 blur-[90px] pointer-events-none"
      />

      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        style={{ x: mousePosition.x * 0.8, y: mousePosition.y * 0.8 }}
        className="absolute bottom-10 right-10 h-[480px] w-[480px] rounded-full bg-gradient-to-br from-emerald-200/40 via-teal-100/30 to-lime-100/20 blur-[100px] pointer-events-none"
      />

      {/* Hero Content Wrapper */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        {/* Top Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-900/5 border border-stone-900/10 backdrop-blur-md text-xs font-semibold tracking-wide text-stone-700"
        >
          <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
          Crafting Digital Excellence
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-7xl font-bold tracking-tight text-stone-900 leading-[1.1]"
        >
          Build refined web applications with{" "}
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-emerald-700">
            tactile elegance.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-stone-600 font-normal leading-relaxed"
        >
          A minimalist approach to high-performance interface design. Clean structure, organic warm tones, and silky motion dynamics.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <button className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-stone-900 text-stone-50 font-medium text-base shadow-lg shadow-stone-900/10 hover:bg-stone-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
            Explore Components
          </button>
          <button className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-stone-900/5 hover:bg-stone-900/10 border border-stone-900/10 text-stone-800 font-medium text-base transition-all duration-300">
            View Live Demos
          </button>
        </motion.div>

        {/* Showcase Floating Preview Box */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ rotateX: mousePosition.y * -0.1, rotateY: mousePosition.x * 0.1 }}
          className="pt-12 perspective-1000"
        >
          <div className="p-4 sm:p-6 rounded-3xl bg-white/70 border border-stone-200/80 shadow-2xl backdrop-blur-xl transition-transform duration-200 ease-out">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/60">
                <div className="text-stone-400 text-sm font-medium">Render Speed</div>
                <div className="text-2xl font-bold text-stone-900 mt-1">99.8%</div>
                <div className="text-xs text-emerald-600 font-medium mt-2">↑ Optimized Pipeline</div>
              </div>
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/60">
                <div className="text-stone-400 text-sm font-medium">Layout Precision</div>
                <div className="text-2xl font-bold text-stone-900 mt-1">Sub-pixel</div>
                <div className="text-xs text-amber-600 font-medium mt-2">Fluid Responsive</div>
              </div>
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/60">
                <div className="text-stone-400 text-sm font-medium">Design Harmony</div>
                <div className="text-2xl font-bold text-stone-900 mt-1">Warm Tones</div>
                <div className="text-xs text-orange-600 font-medium mt-2">Zero Generic Colors</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LightHero;