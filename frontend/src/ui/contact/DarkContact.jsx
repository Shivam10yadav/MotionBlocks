import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
  FaGithub,
  FaYoutube,
} from "react-icons/fa6";
import {
  FiArrowUpRight,
  FiCopy,
  FiCheck,
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
} from "react-icons/fi";

export default function DarkContact() {
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const [copiedField, setCopiedField] = useState(null);

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } });

      // Badge reveal
      tl.fromTo(
        ".gsap-badge",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      );

      // Kinetic Title Character Stagger
      tl.fromTo(
        ".gsap-char",
        { y: "120%", opacity: 0, rotateX: -90 },
        { y: "0%", opacity: 1, rotateX: 0, stagger: 0.015, duration: 1.1 },
        "-=0.6"
      );

      // Description reveal
      tl.fromTo(
        ".gsap-subtitle",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      );

      // Main CTA button reveal
      tl.fromTo(
        ".gsap-cta",
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.4)" },
        "-=0.5"
      );

      // Direct Info & Social Cards reveal
      tl.fromTo(
        ".gsap-info-card",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8 },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Magnetic Physics on Main CTA Button
  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.3;
    const y = (clientY - (top + height / 2)) * 0.3;

    gsap.to(buttonRef.current, {
      x: x,
      y: y,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  };

  // Letter Hover Distortion Physics
  const handleCharHover = (e) => {
    gsap.to(e.currentTarget, {
      y: "-12%",
      color: "#38BDF8",
      duration: 0.15,
      yoyo: true,
      repeat: 1,
      ease: "power2.out",
    });
  };

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#000000] text-[#F4F4F5] font-sans p-6 sm:p-12 lg:p-16 flex flex-col justify-between items-center select-none relative overflow-hidden"
    >
      {/* High-Contrast Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a25_1px,transparent_1px),linear-gradient(to_bottom,#27272a25_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Clear Top Badge / Section Hint */}
      <div className="gsap-badge z-10 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-700 bg-zinc-900/80 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-widest text-zinc-200 uppercase">
            CONTACT & WORK WITH ME
          </span>
        </div>
      </div>

      {/* Main Centered Content */}
      <main className="my-auto py-10 flex flex-col items-center text-center max-w-5xl z-10 space-y-8">
        
        {/* Clear Headline */}
        <div className="perspective-1000 space-y-1">
          {["HAVE A PROJECT", "IN MIND?"].map((line, lIdx) => (
            <h1
              key={lIdx}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black tracking-tighter uppercase leading-[0.9] text-[#FAFAFA] flex justify-center flex-wrap"
            >
              {line.split(" ").map((word, wIdx) => (
                <span key={wIdx} className="inline-flex mx-2 sm:mx-4 overflow-hidden py-1">
                  {word.split("").map((char, cIdx) => (
                    <span
                      key={cIdx}
                      onMouseEnter={handleCharHover}
                      className="gsap-char inline-block cursor-default transition-colors duration-150"
                    >
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </h1>
          ))}
        </div>

        {/* Clear Subtitle & Details */}
        <p className="gsap-subtitle text-zinc-300 font-medium text-base sm:text-xl max-w-2xl leading-relaxed">
          I am currently available for full-stack freelance projects, web design engineering, and long-term contracts. Let’s build something special.
        </p>

        {/* Primary Call To Action (CTA) Button */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="gsap-cta pt-2"
        >
          <a
            ref={buttonRef}
            href="mailto:contact@shivam.dev"
            className="group inline-flex items-center gap-4 bg-[#F4F4F5] hover:bg-white text-[#09090B] px-10 py-5 rounded-full text-sm font-extrabold tracking-widest uppercase transition-all duration-300 shadow-[0_0_50px_rgba(255,255,255,0.18)]"
          >
            <FiSend className="text-base" />
            <span>SEND ME AN EMAIL</span>
            <div className="w-8 h-8 rounded-full bg-[#09090B] text-[#F4F4F5] flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
              <FiArrowUpRight className="text-lg" />
            </div>
          </a>
        </div>
      </main>

      {/* Explicit Contact Details & Social Links Footer */}
      <footer className="w-full max-w-4xl pt-8 border-t border-zinc-800 flex flex-col items-center gap-6 z-10">
        
        {/* Direct Contact Options Box */}
        <div className="flex flex-wrap justify-center items-center gap-4">
          
          {/* Email Copy Card */}
          <div className="gsap-info-card flex items-center gap-3 bg-zinc-900 border border-zinc-700/80 px-5 py-2.5 rounded-full">
            <FiMail className="text-zinc-400 text-sm" />
            <a
              href="mailto:contact@shivam.dev"
              className="text-sm font-mono font-semibold text-zinc-100 hover:text-white transition-colors"
            >
              contact@shivam.dev
            </a>
            <button
              onClick={() => handleCopy("contact@shivam.dev", "email")}
              className="p-1 text-zinc-400 hover:text-white transition-colors"
              title="Copy Email"
            >
              {copiedField === "email" ? (
                <span className="text-emerald-400 text-xs font-mono font-bold flex items-center gap-1">
                  <FiCheck /> COPIED
                </span>
              ) : (
                <FiCopy className="text-xs" />
              )}
            </button>
          </div>

          {/* Phone Contact Card */}
          <div className="gsap-info-card flex items-center gap-3 bg-zinc-900 border border-zinc-700/80 px-5 py-2.5 rounded-full">
            <FiPhone className="text-zinc-400 text-sm" />
            <a
              href="tel:+919876543210"
              className="text-sm font-mono font-semibold text-zinc-100 hover:text-white transition-colors"
            >
              +91 98765 43210
            </a>
            <button
              onClick={() => handleCopy("+919876543210", "phone")}
              className="p-1 text-zinc-400 hover:text-white transition-colors"
              title="Copy Phone"
            >
              {copiedField === "phone" ? (
                <span className="text-emerald-400 text-xs font-mono font-bold flex items-center gap-1">
                  <FiCheck /> COPIED
                </span>
              ) : (
                <FiCopy className="text-xs" />
              )}
            </button>
          </div>

          {/* Location Badge */}
          <div className="gsap-info-card flex items-center gap-2 bg-zinc-900 border border-zinc-700/80 px-5 py-2.5 rounded-full text-sm font-mono text-zinc-300">
            <FiMapPin className="text-zinc-400" />
            <span>Karnal, Haryana, India</span>
          </div>
        </div>

        {/* Social Icons Bar */}
        <div className="gsap-info-card flex items-center gap-3 pt-2">
          {[
            { icon: FaGithub, label: "GitHub", href: "https://github.com" },
            { icon: FaLinkedinIn, label: "LinkedIn", href: "https://linkedin.com" },
            { icon: FaXTwitter, label: "Twitter", href: "https://x.com" },
            { icon: FaInstagram, label: "Instagram", href: "https://instagram.com" },
            { icon: FaYoutube, label: "YouTube", href: "https://youtube.com" },
          ].map((social, idx) => {
            const Icon = social.icon;
            return (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="p-3 rounded-full border border-zinc-700/80 bg-zinc-900 hover:bg-[#F4F4F5] hover:text-[#09090B] transition-colors duration-200 text-zinc-200"
              >
                <Icon className="text-sm" />
              </a>
            );
          })}
        </div>
      </footer>
    </div>
  );
}