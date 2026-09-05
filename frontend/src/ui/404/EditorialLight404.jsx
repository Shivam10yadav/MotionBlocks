import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";

export default function EditorialLight404() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const buttonRef = useRef(null);

  const [isCursorLost, setIsCursorLost] = useState(false);

  // Smooth mouse coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    let cursorTimeout;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX - 16);
      mouseY.set(clientY - 16);

      // Reset "lost" status as long as mouse moves
      setIsCursorLost(false);
      clearTimeout(cursorTimeout);

      // If cursor stops moving for 2 seconds, trigger "cursor lost" animation
      cursorTimeout = setTimeout(() => {
        setIsCursorLost(true);
      }, 2000);

      // Magnetic button interaction
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;

        const distanceX = clientX - btnCenterX;
        const distanceY = clientY - btnCenterY;
        const distance = Math.hypot(distanceX, distanceY);

        if (distance < 100) {
          gsap.to(buttonRef.current, {
            x: distanceX * 0.25,
            y: distanceY * 0.25,
            duration: 0.3,
            ease: "power2.out",
          });
        } else {
          gsap.to(buttonRef.current, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.4)",
          });
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Continuous SVG path drawing wave
    if (pathRef.current) {
      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(cursorTimeout);
    };
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen bg-[#FAF8F5] text-[#1C1B1A] overflow-hidden flex flex-col justify-between p-8 md:p-16 select-none cursor-none font-sans"
    >
      {/* Animated Cursor with "Cursor Lost" Floating state */}
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        animate={
          isCursorLost
            ? {
                scale: [1, 1.4, 0.8, 1],
                rotate: [0, 180, 360],
                opacity: [1, 0.4, 1],
              }
            : { scale: 1, rotate: 0, opacity: 1 }
        }
        transition={
          isCursorLost
            ? { duration: 3, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.2 }
        }
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#E65100] flex items-center justify-center pointer-events-none z-50"
      >
        {isCursorLost && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: -24 }}
            className="absolute text-[10px] font-medium text-[#E65100] bg-[#FAF8F5] px-2 py-0.5 rounded-full border border-[#E65100]/30 shadow-sm whitespace-nowrap"
          >
            I'm lost too...
          </motion.span>
        )}
      </motion.div>

      {/* Top Header */}
      <header className="relative z-20 flex justify-between items-center text-sm text-[#73716B] font-medium">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2"
        >
          <span className="text-[#E65100]">✦</span>
          <span>Page Not Found</span>
        </motion.div>
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xs uppercase tracking-wider font-semibold"
        >
          Error 404
        </motion.span>
      </header>

      {/* Main Center Area */}
      <main className="relative z-20 my-auto flex flex-col items-center text-center max-w-2xl mx-auto">
        {/* Big Bold Clean 404 Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative mb-2"
        >
          <h1 className="text-[20vw] md:text-[14vw] font-serif font-semibold leading-none text-[#1C1B1A]">
            404
          </h1>
        </motion.div>

        {/* Hand-Drawn Wavy Path Illustration */}
        <div className="relative mb-6 -mt-4">
          <svg
            width="240"
            height="80"
            viewBox="0 0 240 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-48 md:w-64"
          >
            <path
              ref={pathRef}
              d="M10 40 C 50 10, 70 70, 110 40 C 150 10, 170 70, 230 40"
              stroke="#E65100"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="300"
              strokeDashoffset="300"
            />
            <circle cx="230" cy="40" r="5" fill="#E65100" />
          </svg>
        </div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl md:text-5xl font-serif font-normal tracking-tight text-[#1C1B1A] mb-4"
        >
          Looks like you got lost.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base md:text-lg text-[#615F59] font-normal leading-relaxed max-w-md mb-8"
        >
          The page you were trying to reach isn't here anymore. Stop moving your mouse for 2 seconds to see the cursor get lost too!
        </motion.p>

        {/* Magnetic Button */}
        <motion.div
          ref={buttonRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="/"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#1C1B1A] text-[#FAF8F5] text-sm font-medium transition-all duration-300 hover:bg-[#E65100] shadow-md"
          >
            <span>Take me back home</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </motion.div>
      </main>

    
    </div>
  );
}