import React from "react";
import { motion } from "framer-motion";

export const FlashyLoader = () => {
  const dots = [0, 1, 2];

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-[#0A120E] rounded-2xl border border-[#1A2E24] shadow-2xl">
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* Outer Hexagon/Ring Glow */}
        <div className="absolute inset-0 rounded-2xl bg-[#00FF87]/10 blur-xl pointer-events-none" />

        {/* Orbit Path 1 */}
        <motion.div
          className="absolute w-full h-full border border-[#00FF87]/20 rounded-full"
          animate={{ rotate: 360, scale: [1, 1.05, 1] }}
          transition={{ rotate: { duration: 3, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity } }}
        >
          <div className="w-3 h-3 bg-[#00FF87] rounded-full shadow-[0_0_12px_#00FF87] absolute -top-1.5 left-1/2 -translate-x-1/2" />
        </motion.div>

        {/* Orbit Path 2 */}
        <motion.div
          className="absolute w-12 h-12 border border-[#60EFFF]/30 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-2.5 h-2.5 bg-[#60EFFF] rounded-full shadow-[0_0_10px_#60EFFF] absolute -bottom-1.2 left-1/2 -translate-x-1/2" />
        </motion.div>

        {/* Inner Diamond Core */}
        <motion.div
          className="w-4 h-4 bg-gradient-to-tr from-[#00FF87] to-[#60EFFF] rotate-45 shadow-[0_0_15px_#00FF87]"
          animate={{ rotate: [45, 225, 45], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="mt-5 flex items-center gap-1.5">
        <span className="text-xs font-mono font-bold tracking-wider text-[#00FF87]">SYSTEM_LOADING</span>
        {dots.map((i) => (
          <motion.span
            key={i}
            className="w-1 h-1 bg-[#00FF87] rounded-full"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </div>
  );
};

export default FlashyLoader