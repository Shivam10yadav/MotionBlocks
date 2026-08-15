import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiArrowRight } from "react-icons/fi";

export default function DarkNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { name: "Platform", href: "#" },
    { name: "Solutions", href: "#" },
    { name: "Developers", href: "#" },
    { name: "Pricing", href: "#" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#000000]/90 backdrop-blur-xl border-b border-neutral-900 px-6 lg:px-16 py-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-xl bg-violet-600 flex items-center justify-center font-bold text-sm text-white shadow-lg shadow-violet-600/30 group-hover:scale-105 transition-transform">
            N
          </div>
          <span className="font-bold tracking-widest text-base text-white">NEXUS</span>
        </a>

        {/* Desktop Links with Spacing */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              whileHover={{ y: -1 }}
              className="text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-200"
            >
              {link.name}
            </motion.a>
          ))}
        </nav>

        {/* Desktop CTA Action Group */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
            Sign In
          </a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs tracking-wide hover:bg-neutral-200 transition-colors shadow-sm"
          >
            Get Started <FiArrowRight className="w-3.5 h-3.5" />
          </motion.a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-white hover:bg-neutral-900 rounded-lg transition-colors focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-[#000000] border-t border-neutral-900 mt-4 pt-4 pb-6 px-2"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-medium text-neutral-300 hover:text-white transition-colors px-2 py-1"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-neutral-900 flex flex-col gap-3">
                <a
                  href="#"
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium text-neutral-400 px-2"
                >
                  Sign In
                </a>
                <a
                  href="#"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors mt-1"
                >
                  Get Started <FiArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}