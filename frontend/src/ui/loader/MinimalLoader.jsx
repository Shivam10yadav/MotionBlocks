import React from "react";
import { motion } from "framer-motion";

export const MinimalLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-[#0F0D0A] rounded-2xl border border-[#2B231B] shadow-2xl">
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* Outer Ring Arc */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#FFB703] border-r-[#FF8800]"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />

        {/* Counter Rotating Inner Arc */}
        <motion.div
          className="absolute inset-2 rounded-full border-2 border-transparent border-b-[#FF4500] border-l-[#FF8800]"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
        />

        {/* Pulsing Core */}
        <motion.div
          className="w-4 h-4 rounded-full bg-gradient-to-br from-[#FFB703] to-[#FF4500] shadow-[0_0_15px_rgba(255,183,3,0.6)]"
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.p
        className="mt-5 text-xs font-semibold tracking-widest text-[#D4C3B3] uppercase"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        Processing...
      </motion.p>
    </div>
  );
};

export default MinimalLoader