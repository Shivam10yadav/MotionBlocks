import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function PlaneAnimation() {
  const containerRef = useRef(null);

  // Track scroll progress within the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth physics-based interpolation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Transform scroll progress to plane path coordinates (X, Y) and rotation
  const planeX = useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], ['5%', '25%', '50%', '75%', '90%']);
  const planeY = useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], ['80%', '35%', '60%', '20%', '50%']);
  const planeRotate = useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], [-20, 25, -15, 30, 0]);

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-slate-950 text-white font-sans">
      
      {/* Fixed Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-8">
        
        {/* Header */}
        <header className="z-10 text-center mt-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-500 bg-clip-text text-transparent"
          >
            Motion Block refresh
          </motion.h1>
          <p className="text-slate-400 mt-2 text-sm md:text-base">
            Scroll down to launch the flight path
          </p>
        </header>

        {/* Path SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-slate-800" strokeWidth="2">
          <path
            d="M 5% 80% Q 25% 35%, 50% 60% T 90% 50%"
            fill="none"
            strokeDasharray="8 8"
          />
        </svg>

        {/* Animated Flying SVG Plane */}
        <motion.div
          style={{
            left: planeX,
            top: planeY,
            rotate: planeRotate,
          }}
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        >
          <div className="relative group">
            {/* Ambient Glow */}
            <div className="absolute -inset-3 bg-cyan-500/30 rounded-full blur-xl group-hover:bg-cyan-400/50 transition duration-300"></div>

            {/* Custom SVG Paper Plane */}
            <svg
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] transform -rotate-45"
            >
              <defs>
                <linearGradient id="planeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <linearGradient id="planeShadow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1d4ed8" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
              </defs>

              {/* Main Body / Right Wing */}
              <path
                d="M22 2L11 13"
                stroke="#67e8f9"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 2L15 22L11 13L2 9L22 2Z"
                fill="url(#planeGradient)"
                stroke="#22d3ee"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Fold / Inner Shadow wing */}
              <path
                d="M11 13L15 22L22 2"
                fill="url(#planeShadow)"
                opacity="0.4"
              />
            </svg>
          </div>
        </motion.div>

        {/* Footer Status */}
        <footer className="z-10 text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-800 bg-slate-900/50 backdrop-blur-md text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            Interactive Flight Active
          </div>
        </footer>

      </div>
    </div>
  );
}