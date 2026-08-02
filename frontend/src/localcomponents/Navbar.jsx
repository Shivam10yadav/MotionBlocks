import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaGithub, FaBars, FaTimes, FaChevronRight } from "react-icons/fa";

/* Brand mark — corner-bracket motif borrowed from the
   schematic preview viewport, ember/teal duotone gradient
   instead of the old single-cyan glow. */
const LogoIcon = () => (
  <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#FF7A45] to-[#5EEAD4] shadow-[0_0_12px_rgba(255,122,69,0.35)]">
    <div className="flex h-3.5 w-3.5 rotate-45 items-center justify-center rounded-sm border-2 border-[#08090D]">
      <div className="h-1 w-1 rounded-full bg-[#08090D]" />
    </div>
  </div>
);

const navLinks = [
  { name: "Components", href: "/components" },
  { name: "Categories", href: "/#categories" },
  { name: "Docs", href: "/docs" },
  { name: "Contribute", href: "/contribute" },
];

export function Navbar({ githubUrl = "https://github.com/Shivam10yadav/MotionBlocks", onBrowseClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href) => {
    if (href.startsWith("/#")) return false; // hash links never show as "active" tab
    return location.pathname === href;
  };

  return (
    <header className="pointer-events-none fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-6 [--ember:#FF7A45] [--teal:#5EEAD4]">
      {/* Floating glass container */}
      <nav
        className={`pointer-events-auto w-full max-w-[1200px] rounded-full border border-white/10 bg-[#08090D]/70 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-300 hover:border-[--ember]/30 hover:shadow-[0_0_25px_rgba(255,122,69,0.15)] ${
          isScrolled ? "border-white/15 bg-[#08090D]/85 px-5 py-2.5" : "px-6 py-3.5"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3 focus:outline-none">
            <LogoIcon />
            <span className="font-display text-lg font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-[--ember]">
              Motion<span className="text-[--teal]">Blocks</span>
            </span>
          </Link>

          {/* Nav links */}
          <div className="hidden items-center gap-1 rounded-full border border-white/5 bg-white/[0.03] px-4 py-1.5 md:flex lg:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`group relative rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 hover:bg-white/[0.06] hover:text-white ${
                  isActive(link.href) ? "text-white" : "text-[#C4C6CF]"
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-1 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-[--ember] transition-all duration-200 group-hover:w-1/3 ${
                    isActive(link.href) ? "w-1/3" : "w-0"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-2 font-code text-xs font-medium text-white transition-all duration-200 hover:scale-[1.03] hover:border-white/20 hover:bg-white/[0.1] active:scale-[0.97]"
            >
              <FaGithub className="h-3.5 w-3.5 text-[#C4C6CF]" />
              <span>GitHub</span>
            </a>

           <Link
  to="/components"
  onClick={onBrowseClick}
  style={{ backgroundColor: "#FF7A45", color: "#08090D" }}
  className="relative inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold shadow-[0_0_20px_rgba(255,122,69,0.35)] transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
>
  Browse Components
</Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#C4C6CF] hover:text-white focus:outline-none md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto fixed inset-x-4 top-24 z-40 animate-in fade-in slide-in-from-top-4 rounded-2xl border border-white/10 bg-[#08090D]/95 p-5 shadow-2xl backdrop-blur-2xl duration-200 md:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 hover:bg-white/[0.05] hover:text-white ${
                  isActive(link.href) ? "bg-white/[0.05] text-white" : "text-[#C4C6CF]"
                }`}
              >
                <span>{link.name}</span>
                <FaChevronRight className="h-3 w-3 text-[--teal]" />
              </Link>
            ))}

            <div className="my-2 h-px bg-white/10" />

            <div className="flex flex-col gap-2.5 pt-1">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] py-2.5 font-code text-xs text-white"
              >
                <FaGithub className="h-4 w-4 text-[#C4C6CF]" />
                <span>GitHub Repository</span>
              </a>
<Link
  to="/components"
  onClick={onBrowseClick}
  className="relative inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#FF7A45] px-5 py-2 text-xs font-semibold text-[#08090D] shadow-[0_0_20px_rgba(255,122,69,0.35)] transition-all duration-200 hover:scale-[1.03] hover:bg-[#ff8f63] hover:shadow-[0_0_25px_rgba(255,122,69,0.5)] active:scale-[0.97]"
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