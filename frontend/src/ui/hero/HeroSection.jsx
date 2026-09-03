import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";

export default function HeroSection() {
  const blobRef = useRef(null);
  const containerRef = useRef(null);

  // GSAP continuous subtle motion
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fluid ambient blur movement
      gsap.to(blobRef.current, {
        x: "30vw",
        y: "20vh",
        scale: 1.2,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Framer Motion reveal variants
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        delay: custom * 0.15,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <div
      ref={containerRef}
      className="relative flex h-screen w-full flex-col justify-between bg-[#0B0B0C] p-6 text-[#F2F1EE] select-none overflow-hidden md:p-12"
    >
      {/* GSAP Fluid Ambient Light */}
      <div
        ref={blobRef}
        className="pointer-events-none absolute -top-20 -left-20 h-[450px] w-[450px] rounded-full bg-white/[0.035] blur-[120px]"
      />

      {/* Header */}
      <motion.header
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
        className="relative z-10 flex items-center justify-between border-b border-white/10 pb-6"
      >
        <span className="text-xs uppercase tracking-widest text-[#8A8A8E] font-medium">
          AURA STUDIO
        </span>

        <nav className="hidden items-center gap-10 text-xs uppercase tracking-widest text-[#8A8A8E] md:flex">
          <a href="#projects" className="transition-colors hover:text-white">
            PROJECTS
          </a>
          <a href="#about" className="transition-colors hover:text-white">
            ABOUT
          </a>
          <a href="#journal" className="transition-colors hover:text-white">
            JOURNAL
          </a>
        </nav>

        <button className="flex items-center gap-1 text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-70 cursor-pointer">
          GET IN TOUCH <ArrowUpRight size={14} />
        </button>
      </motion.header>

      {/* Main Center Headline */}
      <main className="relative z-10 my-auto flex flex-col items-center text-center">
        <motion.span
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="mb-6 text-xs uppercase tracking-[0.3em] text-[#8A8A8E]"
        >
          INDEPENDENT DESIGN & DIRECTION
        </motion.span>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="font-serif text-[15vw] font-extralight leading-[0.8] tracking-tight uppercase text-[#F2F1EE] sm:text-[13vw]"
        >
          MONOLITH
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="mt-8 max-w-sm text-xs sm:text-sm font-light leading-relaxed text-[#A1A1A6] tracking-wide"
        >
          Building refined visual identities, bespoke editorial layouts, and digital spaces that prioritize clarity over noise.
        </motion.p>
      </main>

      {/* Footer */}
      <motion.footer
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={4}
        className="relative z-10 flex items-end justify-between border-t border-white/10 pt-6 text-[11px] uppercase tracking-widest text-[#8A8A8E]"
      >
        <div>
          <span>NEW DELHI / LONDON</span>
        </div>

        <div>
          <span>SERIES 2026</span>
        </div>
      </motion.footer>
    </div>
  );
}