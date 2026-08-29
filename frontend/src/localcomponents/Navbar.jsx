import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaGithub, FaBars, FaTimes, FaChevronRight, FaChevronDown, FaStar } from "react-icons/fa";

/* Brand mark — corner-bracket motif with subtle glow */
const LogoIcon = () => (
  <div className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#FF7A45] to-[#5EEAD4] shadow-[0_0_12px_rgba(255,122,69,0.35)] transition-transform duration-300 group-hover:scale-105 shrink-0">
    <div className="flex h-3 w-3 rotate-45 items-center justify-center rounded-sm border-[1.5px] border-[#0A0C10]">
      <div className="h-0.5 w-0.5 rounded-full bg-[#0A0C10]" />
    </div>
  </div>
);

const navLinks = [
  { name: "Components", href: "/components" },
  { name: "Docs", href: "/docs" },
  { name: "Contribute", href: "/contribute" },
];

const libraryLinks = [
  { name: "Logos", href: "/logo", isNew: true },
  { name: "Fonts", href: "/fonts", isNew: true },
  { name: "Colors", href: "/colors", isNew: true },
  { name: "Gradients", href: "/gradients", isNew: true },
    { name: "Sounds", href: "/sounds", isNew: true },


];

export function Navbar({ githubUrl = "https://github.com/Shivam10yadav/MotionBlocks", onBrowseClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [mobileLibraryOpen, setMobileLibraryOpen] = useState(false);
  const location = useLocation();
  const libraryRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the Library dropdown on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (libraryRef.current && !libraryRef.current.contains(e.target)) {
        setLibraryOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") setLibraryOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const isActive = (href) => {
    if (href.startsWith("/#")) return false;
    return location.pathname === href;
  };

  const isLibraryActive = libraryLinks.some((link) => isActive(link.href));

  return (
    <header className="pointer-events-none fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-3 sm:pt-5 [--ember:#FF7A45] [--teal:#5EEAD4]">
      {/* Container widened with full inner flex fitting */}
      <nav
        className={`pointer-events-auto w-full max-w-[1280px] rounded-full border border-white/10 bg-[#08090E]/60 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-[#FF7A45]/30 hover:shadow-[0_0_30px_rgba(255,122,69,0.12)] ${
          isScrolled ? "border-white/15 bg-[#08090E]/80 px-4 py-2 shadow-black/80" : "px-5 py-2.5"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          {/* Logo - Prevent shrinking */}
          <Link to="/" className="group flex shrink-0 items-center gap-2.5 focus:outline-none">
            <LogoIcon />
            <span className="font-display text-base font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-[--ember] whitespace-nowrap">
              Motion<span className="text-[--teal]">Blocks</span>
            </span>
          </Link>

          {/* Nav Links Capsule - Prevent wrapping & text overflow */}
          <div className="hidden items-center gap-0.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-1 md:flex xl:gap-1.5">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`group relative flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide whitespace-nowrap transition-all duration-200 ${
                    active ? "bg-white/10 text-white shadow-sm" : "text-[#A1A1AA] hover:text-white"
                  }`}
                >
                  <span>{link.name}</span>

                  <span
                    className={`absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-[--ember] transition-all duration-300 ${
                      active ? "w-1/2 opacity-100" : "w-0 opacity-0 group-hover:w-1/3 group-hover:opacity-70"
                    }`}
                  />
                </Link>
              );
            })}

            {/* Library dropdown — groups Logos / Fonts / Colors / Gradients */}
            <div ref={libraryRef} className="relative">
              <button
                onClick={() => setLibraryOpen((v) => !v)}
                className={`group relative flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide whitespace-nowrap transition-all duration-200 focus:outline-none ${
                  isLibraryActive || libraryOpen ? "bg-white/10 text-white shadow-sm" : "text-[#A1A1AA] hover:text-white"
                }`}
                aria-haspopup="true"
                aria-expanded={libraryOpen}
              >
                <span>Library</span>
                <FaChevronDown
                  className={`h-2 w-2 transition-transform duration-200 ${libraryOpen ? "rotate-180 text-[--ember]" : "text-[#71717A]"}`}
                />
                <span
                  className={`absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-[--ember] transition-all duration-300 ${
                    isLibraryActive ? "w-1/2 opacity-100" : "w-0 opacity-0 group-hover:w-1/3 group-hover:opacity-70"
                  }`}
                />
              </button>

              {/* Dropdown panel */}
              <div
                className={`absolute left-1/2 top-[calc(100%+14px)] w-56 -translate-x-1/2 rounded-2xl border border-white/10 bg-[#08090E]/95 p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.55)] backdrop-blur-2xl transition-all duration-200 ${
                  libraryOpen
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-1 opacity-0"
                }`}
              >
                {/* Little pointer/caret so it visually anchors to the trigger */}
                <div className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-white/10 bg-[#08090E]" />

                {libraryLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setLibraryOpen(false)}
                      className={`group/item flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-200 ${
                        active ? "bg-white/10 text-white" : "text-[#A1A1AA] hover:bg-white/[0.06] hover:text-white"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={`h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[--ember] to-[--teal] opacity-0 transition-opacity duration-200 ${
                            active ? "opacity-100" : "group-hover/item:opacity-60"
                          }`}
                        />
                        {link.name}
                      </span>
                      {link.isNew && (
                        <span className="inline-flex items-center rounded-full border border-white/15 bg-[#1D1D1F] px-1.5 py-0.5 text-[9px] font-medium leading-none text-[#FFFF00] shadow-inner transition-colors duration-200 group-hover/item:border-white/25 group-hover/item:bg-[#2D2D2E] group-hover/item:text-[#F5F5F7]">
                          New
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Actions - Added whitespace-nowrap & shrink-0 to avoid line breaks */}
          <div className="hidden shrink-0 items-center gap-2.5 md:flex">
            {/* GitHub Star Button */}
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-code text-[11px] font-medium text-white transition-all duration-200 hover:border-white/25 hover:bg-white/[0.08] hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] active:scale-[0.97]"
            >
              <FaGithub className="h-3.5 w-3.5 text-[#A1A1AA]" />
              <span>Star on GitHub</span>
              <FaStar className="h-2.5 w-2.5 text-[--ember]" />
            </a>

            {/* CTA Button */}
            <Link
              to="/components"
              onClick={onBrowseClick}
              className="relative inline-flex cursor-pointer items-center justify-center whitespace-nowrap overflow-hidden rounded-full bg-gradient-to-r from-[#FF7A45] to-[#FF6026] px-4.5 py-1.5 text-xs font-bold text-[#08090E] shadow-[0_0_20px_rgba(255,122,69,0.35)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_28px_rgba(255,122,69,0.55)] active:scale-[0.97]"
            >
              Browse Components
            </Link>
          </div>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-full p-1.5 text-[#A1A1AA] transition-colors hover:bg-white/10 hover:text-white focus:outline-none md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes className="h-4 w-4" /> : <FaBars className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto fixed inset-x-4 top-20 z-40 animate-in fade-in slide-in-from-top-3 rounded-2xl border border-white/10 bg-[#08090E]/95 p-4 shadow-2xl backdrop-blur-2xl duration-200 md:hidden">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-200 hover:bg-white/[0.06] ${
                  isActive(link.href) ? "bg-white/[0.08] text-white" : "text-[#A1A1AA]"
                }`}
              >
                <span>{link.name}</span>
                <FaChevronRight className="h-2.5 w-2.5 text-[--teal]" />
              </Link>
            ))}

            {/* Library accordion — groups Logos / Fonts / Colors / Gradients */}
            <button
              onClick={() => setMobileLibraryOpen((v) => !v)}
              className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-200 hover:bg-white/[0.06] ${
                isLibraryActive || mobileLibraryOpen ? "bg-white/[0.08] text-white" : "text-[#A1A1AA]"
              }`}
            >
              <span>Library</span>
              <FaChevronDown
                className={`h-2.5 w-2.5 text-[--teal] transition-transform duration-200 ${mobileLibraryOpen ? "rotate-180" : ""}`}
              />
            </button>

            <div
              className={`grid overflow-hidden transition-all duration-200 ${
                mobileLibraryOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="flex flex-col gap-1 overflow-hidden pl-3">
                {libraryLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setMobileLibraryOpen(false);
                    }}
                    className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-200 hover:bg-white/[0.06] ${
                      isActive(link.href) ? "bg-white/[0.08] text-white" : "text-[#A1A1AA]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{link.name}</span>
                      {link.isNew && (
                        <span className="inline-flex items-center rounded-full border border-white/15 bg-[#1D1D1F] px-1.5 py-0.5 text-[9px] font-medium text-[#86868B]">
                          New
                        </span>
                      )}
                    </div>
                    <FaChevronRight className="h-2.5 w-2.5 text-[--teal]" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="my-1 h-px bg-white/10" />

            <div className="flex flex-col gap-2 pt-1">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] py-2 font-code text-xs text-white"
              >
                <FaGithub className="h-3.5 w-3.5 text-[#A1A1AA]" />
                <span>GitHub Repository</span>
              </a>

              <Link
                to="/components"
                onClick={onBrowseClick}
                className="relative flex w-full cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-[#FF7A45] to-[#FF6026] py-2 text-xs font-bold text-[#08090E] shadow-[0_0_20px_rgba(255,122,69,0.35)]"
              >
                <span>Browse Components</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}