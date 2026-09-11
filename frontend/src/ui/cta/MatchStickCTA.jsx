import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaXTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import {  HiCheck } from "react-icons/hi2";
import { HiDuplicate } from "react-icons/hi";

export default function MatchstickCTA() {
  const [copied, setCopied] = useState(false);
  const [isStriking, setIsStriking] = useState(false);
  const [isLit, setIsLit] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("hello@example.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStrike = () => {
    if (isStriking) return;
    setIsStriking(true);

    // Strike motion timing
    setTimeout(() => setIsLit(true), 350);
    setTimeout(() => setIsLit(false), 1100);
    setTimeout(() => setIsStriking(false), 1500);
  };

  // Main Stagger Parent Container with higher delay interval
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.35, // Slowed down delay between each item
        delayChildren: 0.2,
      },
    },
  };

  // Smooth & slow glide animation for child elements
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="w-full min-h-screen bg-black flex items-center justify-center p-4 md:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-6xl min-h-[85vh] bg-[#E62B1E] rounded-3xl border-8 border-[#FDB813] p-6 md:p-12 flex flex-col justify-between items-center shadow-2xl overflow-hidden select-none"
      >
        {/* Pattern Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />

        {/* Decorative Corner Stars */}
        <div className="absolute top-6 left-6 text-black font-bold text-3xl">✦</div>
        <div className="absolute top-6 right-6 text-black font-bold text-3xl">✦</div>
        <div className="absolute bottom-6 left-6 text-black font-bold text-3xl">✦</div>
        <div className="absolute bottom-6 right-6 text-black font-bold text-3xl">✦</div>

        {/* 1. First Element: Header Text */}
        <motion.div variants={itemVariants} className="text-center mt-4 z-10">
          <h3 className="font-serif italic text-xl md:text-2xl tracking-widest text-black uppercase">
            IT'S A
          </h3>
          <h1 className="text-6xl md:text-8xl font-black text-black tracking-tight leading-none">
            MATCH!
          </h1>
          <p className="mt-6 text-base md:text-xl max-w-xl mx-auto text-black font-semibold leading-relaxed">
            Let's craft stories that leave a mark—boldly authentic, and built to last.
          </p>
        </motion.div>

        {/* Center Stage Section */}
        <div className="relative w-full flex flex-col items-center justify-center my-auto z-20">
          <div className="relative flex items-center justify-center">
            
            {/* 2. Second Element: Contact Button */}
            <motion.button
              variants={itemVariants}
              onClick={handleStrike}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="relative w-80 md:w-96 h-20 bg-[#181818] rounded-full flex items-center justify-center border-4 border-black/40 shadow-2xl group cursor-pointer transition-all"
            >
              <span className="text-white font-black text-lg md:text-xl tracking-widest uppercase z-10 group-hover:text-amber-400 transition-colors">
                CONTACT
              </span>
              <div className="absolute inset-1 rounded-full opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:6px_6px]" />
            </motion.button>

            {/* 3. Third Element: Matchstick */}
            <motion.div
              variants={itemVariants}
              className="absolute -left-48 md:-left-56 top-12 pointer-events-none z-20 origin-right"
              animate={
                isStriking
                  ? {
                      x: [0, 140, 100, 0],
                      y: [0, -25, -5, 0],
                      rotate: [-28, -18, -12, -28],
                    }
                  : { x: 0, y: 0, rotate: -28 }
              }
              transition={{
                duration: 1.3,
                ease: "easeInOut",
                times: [0, 0.35, 0.7, 1],
              }}
            >
              <div className="relative flex items-center flex-row-reverse">
                {/* Matchstick Head */}
                <div className="relative">
                  <div
                    className={`w-8 h-12 rounded-full transition-colors duration-300 ${
                      isLit
                        ? "bg-amber-100 shadow-[0_0_35px_#ff4500]"
                        : "bg-[#C41E3A]"
                    }`}
                  />

                  {/* Flame Effect */}
                  {isLit && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.2, y: 0 }}
                      animate={{
                        opacity: [0, 1, 0.8, 0],
                        scale: [0.4, 1.6, 1.2, 0],
                        y: [0, -25, -45, -60],
                      }}
                      transition={{ duration: 0.8 }}
                      className="absolute -top-8 -left-4 w-16 h-20 pointer-events-none bg-gradient-to-t from-red-600 via-orange-500 to-yellow-200 rounded-full blur-[2px]"
                    />
                  )}
                </div>

                {/* Matchstick Handle */}
                <div className="w-56 md:w-64 h-5 bg-amber-600 rounded-l-sm border-b-2 border-amber-800 shadow-lg" />
              </div>
            </motion.div>
          </div>

          {/* 4. Fourth Element: Copy Badge */}
          <motion.button
            variants={itemVariants}
            onClick={handleCopy}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 bg-[#E62B1E] border-2 border-black text-black px-6 py-2 rounded-sm flex items-center gap-2 text-sm font-black shadow-[3px_3px_0px_#000] rotate-[-1deg] hover:bg-black hover:text-white transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <HiCheck className="text-lg text-green-500" />
                COPIED!
              </>
            ) : (
              <>
                <HiDuplicate className="text-lg" />
                CLICK TO COPY
              </>
            )}
          </motion.button>
        </div>

        {/* 5. Fifth Element: Social Links Bar */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-3xl grid grid-cols-4 gap-4 z-10 mb-2"
        >
          <button className="h-12 rounded-full border-2 border-black flex items-center justify-center text-sm font-black hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_#000] cursor-pointer">
            <span>WORK</span>
          </button>
          <button
            aria-label="Twitter"
            className="h-12 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_#000] cursor-pointer"
          >
            <FaXTwitter className="text-lg" />
          </button>
          <button
            aria-label="Instagram"
            className="h-12 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_#000] cursor-pointer"
          >
            <FaInstagram className="text-lg" />
          </button>
          <button
            aria-label="LinkedIn"
            className="h-12 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_#000] cursor-pointer"
          >
            <FaLinkedinIn className="text-lg" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}