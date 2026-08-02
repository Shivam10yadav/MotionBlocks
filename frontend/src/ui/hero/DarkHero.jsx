import React from "react";
import { motion } from "framer-motion";

export const DarkHero = () => {
  return (
    <div className="relative min-h-[90vh] w-full overflow-hidden bg-[#0A0806] text-stone-100 flex items-center justify-center px-6 py-20">
      {/* Deep Obsidian Background Glows (Warm Amber & Fire Crimson) */}
      <motion.div
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-amber-600/20 via-orange-600/10 to-transparent blur-[120px] pointer-events-none"
      />

      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-32 left-1/4 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-rose-700/15 via-amber-500/10 to-transparent blur-[110px] pointer-events-none"
      />

      {/* Floating Light Ray Effect */}
      <motion.div
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 bottom-0 w-[300px] -skew-x-12 bg-gradient-to-r from-transparent via-amber-400/[0.03] to-transparent pointer-events-none"
      />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        {/* Pill Tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium tracking-wider uppercase"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          Next-Gen UI Architecture
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-[1.1]"
        >
          Engineered for digital products that need{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-300 to-amber-500">
            depth and character.
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-stone-400 font-normal leading-relaxed"
        >
          Steer clear of dull, repetitive templates. High-contrast amber lighting, dark slate canvas, and liquid-smooth entrance dynamics.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <button className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-semibold text-base shadow-lg shadow-amber-500/20 hover:brightness-110 transition-all duration-300 hover:-translate-y-0.5">
            Get Started Now
          </button>
          <button className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-stone-900/80 hover:bg-stone-800 border border-stone-800 text-stone-200 font-medium text-base transition-all duration-300">
            Read Documentation
          </button>
        </motion.div>

        {/* Interactive Dark Glass Feature Bar */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pt-10"
        >
          <div className="p-6 rounded-3xl bg-[#14100D]/80 border border-amber-500/15 backdrop-blur-2xl shadow-2xl text-left">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="text-amber-400 text-sm font-semibold">Custom Dark Palette</div>
                <div className="text-stone-300 text-xs">Rich Obsidian (#0A0806) paired with warm golden amber tones.</div>
              </div>
              <div className="h-px sm:h-8 w-full sm:w-px bg-stone-800" />
              <div className="space-y-1">
                <div className="text-amber-400 text-sm font-semibold">Framed Dynamics</div>
                <div className="text-stone-300 text-xs">Hardware-accelerated Framer Motion keyframes.</div>
              </div>
              <div className="h-px sm:h-8 w-full sm:w-px bg-stone-800" />
              <div className="space-y-1">
                <div className="text-amber-400 text-sm font-semibold">Zero AI Clichés</div>
                <div className="text-stone-300 text-xs">No repetitive grids or generic electric cyan hues.</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DarkHero;