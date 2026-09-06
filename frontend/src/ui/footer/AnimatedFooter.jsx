import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function AnimatedFooter() {
  const landscapeRef = useRef(null);

  useEffect(() => {
    // GSAP entrance animation for the cartoon landscape illustration
    gsap.fromTo(
      landscapeRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power2.out" }
    );
  }, []);

  const columnVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <footer className="relative w-full bg-white text-slate-700 font-sans pt-12 overflow-hidden select-none">
      {/* Top Footer Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Brand Logo */}
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
            P
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Pension<span className="text-slate-400">.de</span>
          </span>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
          {/* Column 1 */}
          <motion.div custom={0} initial="hidden" animate="visible" variants={columnVariants}>
            <h4 className="font-semibold text-slate-900 mb-4">Popular Cities</h4>
            <ul className="space-y-2.5 text-slate-600 font-medium">
              <li><a href="#" className="hover:text-slate-900 transition-colors">Berlin</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Munich</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Cologne</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Dresden</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Stuttgart</a></li>
            </ul>
          </motion.div>

          {/* Column 2 */}
          <motion.div custom={1} initial="hidden" animate="visible" variants={columnVariants}>
            <h4 className="font-semibold text-slate-900 mb-4">Vacation Regions</h4>
            <ul className="space-y-2.5 text-slate-600 font-medium">
              <li><a href="#" className="hover:text-slate-900 transition-colors">Allgäu</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Black Forest</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Baltic Sea</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">North Sea</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Bavarian Alps</a></li>
            </ul>
          </motion.div>

          {/* Column 3 */}
          <motion.div custom={2} initial="hidden" animate="visible" variants={columnVariants}>
            <h4 className="font-semibold text-slate-900 mb-4">For Landlords</h4>
            <ul className="space-y-2.5 text-slate-600 font-medium">
              <li><a href="#" className="hover:text-slate-900 transition-colors">List Your Property</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Help Center</a></li>
            </ul>
          </motion.div>

          {/* Column 4 */}
          <motion.div custom={3} initial="hidden" animate="visible" variants={columnVariants}>
            <h4 className="font-semibold text-slate-900 mb-4">About Us</h4>
            <ul className="space-y-2.5 text-slate-600 font-medium">
              <li><a href="#" className="hover:text-slate-900 transition-colors">About Pension</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Imprint</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Terms of Use</a></li>
            </ul>
          </motion.div>

          {/* Column 5 */}
          <motion.div custom={4} initial="hidden" animate="visible" variants={columnVariants}>
            <h4 className="font-semibold text-slate-900 mb-4">Social Media</h4>
            <ul className="space-y-2.5 text-slate-600 font-medium mb-6">
              <li><a href="#" className="hover:text-slate-900 transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Instagram</a></li>
            </ul>

            <h4 className="font-semibold text-slate-900 mb-3">Our Portals</h4>
            <div className="space-y-2 text-xs font-semibold">
              <div className="flex items-center gap-2 text-emerald-600">
                <span className="w-4 h-4 rounded bg-emerald-100 flex items-center justify-center text-[10px]">🏠</span>
                YourRoom<span className="text-slate-500">.com</span>
              </div>
              <div className="flex items-center gap-2 text-amber-600">
                <span className="w-4 h-4 rounded bg-amber-100 flex items-center justify-center text-[10px]">🔧</span>
                WorkerRooms<span className="text-slate-500">.com</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Copyright Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 font-medium pt-12 pb-6">
          <p>Copyright Pension.de 2026</p>
          <p className="flex items-center gap-1 mt-2 md:mt-0">
            <span className="text-red-500">♥</span> Made with love in Berlin
          </p>
        </div>
      </div>

      {/* Cartoon Mountain Landscape Vector Background */}
      <div ref={landscapeRef} className="relative w-full h-64 md:h-80 -mt-8 pointer-events-none overflow-hidden">
        <img
          src="https://img.freepik.com/free-vector/hand-drawn-flat-design-mountain-landscape_23-2149158786.jpg"
          alt="Cartoon Mountain Landscape Background"
          className="w-full h-full object-cover object-bottom [mask-image:linear-gradient(to_top,black_80%,transparent_100%)] opacity-95"
        />
      </div>
    </footer>
  );
}