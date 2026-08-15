import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiArrowUpRight } from "react-icons/fi";

export default function LightNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { name: "Work", href: "#" },
    { name: "Services", href: "#" },
    { name: "About", href: "#" },
    { name: "Journal", href: "#" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8E2D8] px-6 lg:px-16 py-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="text-2xl font-serif font-bold tracking-tight text-[#2D2A26] flex items-center gap-1">
          Studio<span className="text-[#D97706] text-3xl leading-none">.</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              whileHover={{ y: -2 }}
              className="text-sm font-medium text-[#78716C] hover:text-[#2D2A26] transition-colors duration-200"
            >
              {link.name}
            </motion.a>
          ))}
        </nav>

        {/* Right CTA Area */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium text-[#57534E] hover:text-[#2D2A26] transition-colors">
            Sign In
          </a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2D2A26] text-[#FAF7F2] text-xs font-semibold tracking-wide rounded-full hover:bg-[#D97706] transition-colors shadow-sm"
          >
            Let's Talk <FiArrowUpRight className="w-4 h-4" />
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-[#2D2A26] hover:bg-[#F3ECE0] rounded-lg transition-colors focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-[#FAF7F2] border-t border-[#E8E2D8] mt-4 pt-4 pb-6 px-2"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-medium text-[#2D2A26] hover:text-[#D97706] transition-colors px-2 py-1"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-[#E8E2D8] flex flex-col gap-3">
                <a
                  href="#"
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium text-[#57534E] px-2"
                >
                  Sign In
                </a>
                <a
                  href="#"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#2D2A26] text-[#FAF7F2] text-sm font-medium rounded-full hover:bg-[#D97706] transition-colors mt-1"
                >
                  Let's Talk <FiArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}