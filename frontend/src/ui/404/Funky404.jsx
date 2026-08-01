import React from "react";
import { motion } from "framer-motion";
import { FiHome, FiRefreshCw, FiCompass, FiStar } from "react-icons/fi";

const Funky404 = () => {
  return (
    <section className="relative min-h-screen w-full bg-[#120D0A] text-[#FFF6F0] flex items-center justify-center p-6 overflow-hidden select-none">
      {/* Background Glowing Warm Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF4500]/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-[#FF0055]/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-80 h-80 bg-[#FFB703]/15 rounded-full blur-[110px] pointer-events-none" />

      {/* Floating Decorative Shapes */}
      <motion.div
        animate={{ y: [-12, 12, -12], rotate: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-16 left-12 md:left-24 hidden sm:flex items-center justify-center w-14 h-14 rounded-2xl bg-[#FF4500]/10 border border-[#FF4500]/30 text-[#FF4500] text-xl backdrop-blur-md shadow-lg shadow-[#FF4500]/10"
      >
        <FiStar />
      </motion.div>

      <motion.div
        animate={{ y: [10, -10, 10], rotate: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-20 left-16 md:left-32 hidden sm:flex items-center justify-center w-16 h-16 rounded-full bg-[#FFB703]/10 border border-[#FFB703]/30 text-[#FFB703] text-2xl backdrop-blur-md shadow-lg shadow-[#FFB703]/10"
      >
        <FiCompass />
      </motion.div>

      <motion.div
        animate={{ scale: [0.9, 1.1, 0.9], rotate: [0, 10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-16 md:right-32 hidden sm:flex items-center justify-center w-12 h-12 rounded-xl bg-[#FF0055]/15 border border-[#FF0055]/30 text-[#FF5577] text-lg backdrop-blur-md"
      >
        🔥
      </motion.div>

      {/* Main Card Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "out" }}
        className="relative z-10 max-w-lg w-full text-center space-y-8 bg-[#1E1612]/80 border border-[#3A2B22] p-8 sm:p-12 rounded-3xl backdrop-blur-xl shadow-2xl shadow-[#FF4500]/10"
      >
        {/* Animated Big 404 Visual */}
        <div className="relative flex items-center justify-center gap-2 font-black text-7xl sm:text-9xl tracking-tighter">
          {/* Digit 4 */}
          <motion.span
            animate={{ y: [0, -8, 0], rotate: [-4, 2, -4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-transparent bg-clip-text bg-gradient-to-br from-[#FF0055] via-[#FF4500] to-[#FFB703] drop-shadow-[0_10px_20px_rgba(255,69,0,0.35)]"
          >
            4
          </motion.span>

          {/* Sun / Ember Planet Zero */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="relative flex items-center justify-center w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#FF0055] via-[#FF4500] to-[#FFB703] p-[3px] shadow-lg shadow-[#FF4500]/25"
          >
            <div className="w-full h-full bg-[#120D0A] rounded-full flex items-center justify-center relative overflow-hidden">
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#FFB703] to-[#FF0055] opacity-80 blur-[2px]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),transparent)]" />
            </div>
          </motion.div>

          {/* Digit 4 */}
          <motion.span
            animate={{ y: [0, -8, 0], rotate: [4, -2, 4] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-transparent bg-clip-text bg-gradient-to-br from-[#FFB703] via-[#FF4500] to-[#FF0055] drop-shadow-[0_10px_20px_rgba(255,183,3,0.3)]"
          >
            4
          </motion.span>
        </div>

        {/* Text Area */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#FFF6F0]">
            Lost in the wild desert?
          </h1>
          <p className="text-sm sm:text-base text-[#C2B2A3] leading-relaxed max-w-sm mx-auto">
            The page you're searching for faded into the horizon or drifted away like tumbleweed.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => (window.location.href = "/")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF4500] to-[#FF0055] px-6 py-3 text-sm font-bold text-[#FFFFFF] shadow-lg shadow-[#FF4500]/25 transition-all hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <FiHome className="text-base" />
            <span>Take Me Home</span>
          </button>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-[#3A2B22] bg-[#281D18] px-6 py-3 text-sm font-semibold text-[#FFF6F0] transition-all hover:bg-[#33251E] hover:border-[#4D3A2E] active:scale-[0.98] cursor-pointer"
          >
            <FiRefreshCw className="text-base text-[#FFB703]" />
            <span>Try Again</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Funky404;