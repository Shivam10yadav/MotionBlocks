import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";

export default function Animated404() {
  const containerRef = useRef(null);
  const bigTextRef = useRef(null);
  const ringRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  // Framer Motion smooth mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Dynamic light position based on cursor
  const lightX = useTransform(smoothX, [-500, 500], ["-20%", "120%"]);
  const lightY = useTransform(smoothY, [-500, 500], ["-20%", "120%"]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = clientX - window.innerWidth / 2;
      const y = clientY - window.innerHeight / 2;

      mouseX.set(x);
      mouseY.set(y);

      // Custom smooth cursor follow
      gsap.to(cursorRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.15,
        ease: "power3.out",
      });

      gsap.to(cursorDotRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.05,
      });

      // Interactive 3D tilt on center element
      gsap.to(bigTextRef.current, {
        rotateY: (x / window.innerWidth) * 45,
        rotateX: -(y / window.innerHeight) * 45,
        duration: 0.5,
        ease: "power2.out",
      });

      // Floating ring rotation shift
      gsap.to(ringRef.current, {
        rotateX: 60 + y * 0.05,
        rotateY: x * 0.05,
        duration: 0.8,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Continuous spin for background element
    gsap.to(ringRef.current, {
      rotateZ: 360,
      duration: 25,
      repeat: -1,
      ease: "none",
    });

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen bg-[#060606] text-[#F3F2EE] overflow-hidden flex flex-col justify-between p-6 md:p-12 font-sans select-none cursor-none [perspective:1000px]"
    >
      {/* Background SVG Grain Noise */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* High-Contrast Interactive Glow */}
      <motion.div
        className="pointer-events-none absolute w-[550px] h-[550px] rounded-full bg-radial from-[#F5A623]/25 via-[#FF6B00]/10 to-transparent blur-3xl z-0 -translate-x-1/2 -translate-y-1/2"
        style={{ left: lightX, top: lightY }}
      />

      {/* High Visibility Outer Cursor Circle */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 border-2 border-[#FFD028] rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
      />
      {/* Precision Glowing Inner Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-[#FFD028] rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#FFD028]"
      />

      {/* Header */}
      <header className="relative z-20 flex justify-between items-center text-xs tracking-widest uppercase font-mono text-[#A09E96]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFD028] shadow-[0_0_8px_#FFD028] animate-ping" />
          <span className="text-[#F3F2EE] font-semibold">Lost Route</span>
        </motion.div>
        <motion.span
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="px-2.5 py-1 rounded bg-[#1A1A18] text-[#FFD028] font-bold border border-[#FFD028]/30"
        >
          404
        </motion.span>
      </header>

      {/* Center Hero Section */}
      <main className="relative z-20 my-auto flex flex-col items-center justify-center">
        {/* Glowing High-Contrast 3D Ring */}
        <div
          ref={ringRef}
          className="absolute w-[300px] h-[300px] md:w-[520px] md:h-[520px] rounded-full border-2 border-[#FFD028]/40 border-dashed pointer-events-none [transform:rotateX(60deg)] shadow-[0_0_30px_rgba(255,208,40,0.15)]"
        />

        {/* High-Contrast Pop 404 Text */}
        <div
          ref={bigTextRef}
          className="relative flex flex-col items-center [transform-style:preserve-3d]"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[28vw] md:text-[22vw] leading-none font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#E2E1D9] to-[#4A4943] drop-shadow-[0_10px_30px_rgba(255,208,40,0.2)]"
          >
            404
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
          >
            <span className="px-4 py-1.5 rounded-full border-2 border-[#FFD028] bg-[#121210] text-xs font-mono text-[#FFD028] tracking-widest uppercase font-bold shadow-[0_0_20px_rgba(255,208,40,0.3)]">
              End of the road
            </span>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-xs md:max-w-sm text-sm text-[#C5C4BD] text-center font-normal leading-relaxed mt-2"
        >
          The page you wanted isn't here anymore. It might have been moved or deleted completely.
        </motion.p>

        {/* High-Contrast Interactive Pop Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8"
        >
          <a
            href="/"
            className="group relative inline-flex items-center gap-4 px-9 py-4 rounded-full border-2 border-[#FFD028] bg-[#FFD028] text-xs uppercase tracking-widest text-[#060606] font-bold overflow-hidden transition-all duration-300 shadow-[0_0_25px_rgba(255,208,40,0.4)] hover:shadow-[0_0_35px_rgba(255,208,40,0.7)]"
          >
            {/* Dark Hover Fill */}
            <span className="absolute inset-0 bg-[#060606] translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-0" />

            <span className="relative z-10 transition-colors duration-300 group-hover:text-[#FFD028]">
              Take Me Back
            </span>

            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="relative z-10 text-sm transition-colors duration-300 group-hover:text-[#FFD028]"
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </main>

      {/* High-Contrast Footer */}
      <footer className="relative z-20 flex justify-between items-center text-[11px] font-mono uppercase tracking-widest text-[#A09E96]">
        <span>Lost in darkness</span>
        <span className="text-[#FFD028] font-semibold">Click anywhere to return</span>
      </footer>
    </div>
  );
}