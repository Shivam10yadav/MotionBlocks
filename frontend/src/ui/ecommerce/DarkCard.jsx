import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEye, FiShoppingBag, FiStar, FiCheck, FiBookmark } from "react-icons/fi";

export const DarkCard = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group relative w-full max-w-sm rounded-3xl bg-[#141218] p-4 border border-[#2B2735] shadow-2xl hover:border-[#FF4500]/40 transition-colors duration-300"
    >
      <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-[#FF4500] to-[#FF0055] opacity-0 blur-xl group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />

      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#1D1926]">
        <motion.img
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop"
          alt="Premium Headphones"
          className="h-full w-full object-cover object-center"
        />

        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <span className="rounded-full bg-[#120D0A]/80 border border-[#3A2B22] backdrop-blur-md px-3 py-1 text-[10px] font-bold tracking-widest text-[#FFB703] uppercase">
            LIMITED
          </span>

          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={() => setIsSaved(!isSaved)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#141218]/80 border border-[#2B2735] backdrop-blur-md text-neutral-300 transition-colors hover:text-white"
          >
            <FiBookmark className={`text-sm ${isSaved ? "fill-[#FF4500] text-[#FF4500]" : ""}`} />
          </motion.button>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center gap-3 transition-opacity duration-300"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md px-4 py-2 text-xs font-semibold text-white shadow-lg"
          >
            <FiEye className="text-sm" /> Preview
          </motion.button>
        </motion.div>
      </div>

      <div className="mt-4 px-1 space-y-3">
        <div className="flex items-center justify-between text-xs text-neutral-400">
          <span className="font-mono text-[#FF8800]">AUDIO / PRO</span>
          <div className="flex items-center gap-1 text-amber-400 font-bold">
            <FiStar className="fill-amber-400" />
            <span>4.9</span>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-extrabold text-white tracking-tight group-hover:text-[#FFB703] transition-colors">
            SonicPulse ANC Pro
          </h3>
          <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5">
            Spatial audio with adaptive noise cancellation.
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#221E2C]">
          <div>
            <span className="text-xs text-neutral-500 line-through mr-1.5">$349.00</span>
            <span className="text-lg font-black text-white">$289.00</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleAddToCart}
            className={`flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-xs font-bold transition-all shadow-lg ${
              isAdded
                ? "bg-emerald-500 text-white shadow-emerald-500/20"
                : "bg-gradient-to-r from-[#FF4500] to-[#FF0055] text-white shadow-[#FF4500]/25 hover:brightness-110"
            }`}
          >
            <AnimatePresence mode="wait">
              {isAdded ? (
                <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1.5">
                  <FiCheck className="text-base" /> Added
                </motion.span>
              ) : (
                <motion.span key="bag" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1.5">
                  <FiShoppingBag className="text-base" /> Buy Now
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default DarkCard;