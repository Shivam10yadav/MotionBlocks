import React, { useState, useEffect } from "react";
import { FaGithub, FaBars, FaTimes, FaChevronRight } from "react-icons/fa";

/* Simple Geometric Brand Icon */
const LogoIcon = () => (
  <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_12px_rgba(6,182,212,0.4)]">
    <div className="w-3.5 h-3.5 border-2 border-zinc-950 rounded-sm transform rotate-45 flex items-center justify-center">
      <div className="w-1 h-1 bg-zinc-950 rounded-full" />
    </div>
  </div>
);

export function Navbar({
  githubUrl = "https://github.com",
  onBrowseClick,
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll for subtle style shifts
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Components", href: "#components" },
    { name: "Categories", href: "#categories" },
    { name: "Docs", href: "#docs" },
    { name: "About", href: "#about" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sm:pt-6 pointer-events-none">
      {/* Floating Glassmorphic Container */}
      <nav
        className={`pointer-events-auto w-full max-w-[1200px] rounded-full transition-all duration-300 border border-white/10 bg-[#0D1117]/70 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-cyan-500/30 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] ${
          isScrolled ? "py-2.5 px-5 bg-[#0D1117]/85 border-white/15" : "py-3.5 px-6"
        }`}
      >
        <div className="flex items-center justify-between">
          
          {/* LEFT: Logo & Brand Name */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <LogoIcon />
            <span className="font-tech font-bold text-lg tracking-tight text-[#F8FAFC] group-hover:text-cyan-400 transition-colors duration-200">
              Motion<span className="text-cyan-400">Blocks</span>
            </span>
          </a>

          {/* CENTER: Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-1.5 text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] rounded-full hover:bg-white/[0.06] transition-all duration-200 relative group"
              >
                {link.name}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-cyan-400 rounded-full group-hover:w-1/3 transition-all duration-200" />
              </a>
            ))}
          </div>

          {/* RIGHT: Action Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            {/* GitHub Button */}
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-mono font-medium text-[#F8FAFC] bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] hover:border-white/20 transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
            >
              <FaGithub className="w-3.5 h-3.5 text-[#94A3B8]" />
              <span>GitHub</span>
            </a>

            {/* Primary Cyan CTA */}
            <button
              onClick={onBrowseClick}
              className="relative inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold text-zinc-950 bg-[#06B6D4] hover:bg-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] active:scale-[0.97] cursor-pointer"
            >
              <span>Browse Components</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#94A3B8] hover:text-[#F8FAFC] focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto fixed inset-x-4 top-24 z-40 p-5 rounded-2xl border border-white/10 bg-[#0D1117]/95 backdrop-blur-2xl shadow-2xl md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/[0.05] rounded-xl transition-all duration-200"
              >
                <span>{link.name}</span>
                <FaChevronRight className="w-3 h-3 text-cyan-400" />
              </a>
            ))}

            <div className="h-[1px] bg-white/10 my-2" />

            <div className="flex flex-col gap-2.5 pt-1">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-mono text-[#F8FAFC] bg-white/[0.05] border border-white/10"
              >
                <FaGithub className="w-4 h-4 text-[#94A3B8]" />
                <span>GitHub Repository</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onBrowseClick) onBrowseClick();
                }}
                className="w-full py-2.5 rounded-xl text-xs font-semibold text-zinc-950 bg-[#06B6D4] shadow-[0_0_15px_rgba(6,182,212,0.4)]"
              >
                Browse Components
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}