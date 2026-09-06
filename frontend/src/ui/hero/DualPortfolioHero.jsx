import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { FaDribbble, FaBehance, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { FiArrowUpRight } from "react-icons/fi";

export default function DualPorfolioHero() {
  const containerRef = useRef(null);
  const bgTextRef = useRef(null);
  const imageRef = useRef(null);
  const focusBoxRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Entrance sequence
    tl.from(".gsap-meta", {
      opacity: 0,
      y: -20,
      stagger: 0.1,
      duration: 0.8,
    })
      .from(
        focusBoxRef.current,
        {
          scale: 1.3,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.5"
      )
      .from(
        bgTextRef.current,
        {
          y: 60,
          opacity: 0,
          duration: 1.1,
        },
        "-=0.7"
      );

    // Mouse parallax effect
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;

      gsap.to(imageRef.current, {
        x: x * 12,
        y: y * 12,
        duration: 0.6,
        ease: "power1.out",
      });

      gsap.to(focusBoxRef.current, {
        x: x * 22,
        y: y * 22,
        duration: 0.4,
        ease: "power1.out",
      });

      gsap.to(bgTextRef.current, {
        x: x * -10,
        duration: 0.8,
        ease: "power1.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#D97706] text-white overflow-hidden flex flex-col justify-between p-6 md:p-10 select-none"
    >
      {/* High-Contrast Gradient Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-amber-950/90 to-amber-600/90 mix-blend-multiply z-0 pointer-events-none" />

      {/* 1. TOP HEADER / NAVBAR */}
      <header className="relative z-30 w-full flex justify-between items-center font-sans">
        <div className="gsap-meta flex items-center gap-3">
          <span className="font-mono text-xl font-black tracking-tighter text-amber-400">
            [L.E]
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest text-neutral-200 border-l border-white/20 pl-3 hidden sm:inline">
            Creative Director
          </span>
        </div>

        {/* Center Nav */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium uppercase tracking-widest text-neutral-200">
          <a href="#work" className="hover:text-amber-400 transition-colors">Work</a>
          <a href="#about" className="hover:text-amber-400 transition-colors">About</a>
          <a href="#services" className="hover:text-amber-400 transition-colors">Services</a>
        </nav>

        {/* Right Action Button */}
        <a
          href="#contact"
          className="gsap-meta inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-neutral-950 font-mono text-xs font-bold uppercase tracking-wider hover:bg-amber-400 transition-all shadow-lg"
        >
          <span>Get in Touch</span>
          <FiArrowUpRight size={14} />
        </a>
      </header>

      {/* 2. SUB-HEADER / TAXONOMY & SOCIAL BADGES */}
      <div className="relative z-20 w-full flex justify-between items-start mt-6">
        {/* Left Skill Taxonomy */}
        <div className="gsap-meta font-sans text-xs sm:text-sm font-semibold tracking-wide text-neutral-100 space-y-0.5 drop-shadow">
          <p className="text-amber-400 font-mono text-[11px] uppercase tracking-widest mb-1">
            // Core Focus
          </p>
          <p>Branding /</p>
          <p>Design / UIUX /</p>
          <p>Strategy</p>
        </div>

        {/* Right Social Cluster Badge */}
        <div className="gsap-meta grid grid-cols-2 gap-1.5 p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/20 shadow-2xl">
          <motion.a
            whileHover={{ scale: 1.15 }}
            href="#dribbble"
            className="w-9 h-9 rounded-full bg-[#EA4C89] flex items-center justify-center text-white text-sm shadow-md"
            aria-label="Dribbble"
          >
            <FaDribbble />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.15 }}
            href="#behance"
            className="w-9 h-9 rounded-full bg-[#1769FF] flex items-center justify-center text-white text-sm shadow-md"
            aria-label="Behance"
          >
            <FaBehance />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.15 }}
            href="#linkedin"
            className="w-9 h-9 rounded-full bg-[#0A66C2] flex items-center justify-center text-white text-sm shadow-md"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.15 }}
            href="#x"
            className="w-9 h-9 rounded-full bg-neutral-900 flex items-center justify-center text-white text-sm shadow-md border border-white/20"
            aria-label="Twitter"
          >
            <FaXTwitter />
          </motion.a>
        </div>
      </div>

      {/* 3. CENTER PORTRAIT & VIEWFINDER FRAME */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="relative w-[300px] sm:w-[400px] md:w-[460px] aspect-[4/5]">
          {/* Main Portrait */}
          <img
            ref={imageRef}
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80"
            alt="Hero Subject"
            className="w-full h-full object-cover rounded-sm filter brightness-90 contrast-125 saturate-150"
          />

          {/* Sharp Viewfinder Box */}
          <div
            ref={focusBoxRef}
            className="absolute top-12 left-1/2 -translate-x-1/2 w-[180px] sm:w-[210px] h-[180px] sm:h-[210px] border-2 border-white shadow-[0_0_30px_rgba(255,255,255,0.3)] pointer-events-none"
          />
        </div>
      </div>

      {/* 4. BOTTOM TYPOGRAPHY SECTION */}
      <div className="relative z-20 w-full mt-auto">
        <p className="gsap-meta font-mono text-xs sm:text-sm font-bold tracking-widest text-amber-400 uppercase mb-1 drop-shadow">
          Hey! I'm...
        </p>

        {/* Oversized Name Header with Gradient Contrast Overlay */}
        <div className="relative overflow-hidden w-full">
          <h1
            ref={bgTextRef}
            className="text-[22vw] sm:text-[20vw] font-black tracking-tight leading-[0.78] uppercase text-white font-sans drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
          >
            LAUREN
          </h1>

          {/* Vignette Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}