import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { FaGithub, FaLinkedin, FaXTwitter, FaInstagram } from "react-icons/fa6";
import { FiArrowUpRight, FiCode, FiTerminal } from "react-icons/fi";

export default function PortfolioHero() {
  const containerRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const imageRef = useRef(null);
  const bgTextRef = useRef(null);
  const scriptRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".gsap-fade", { opacity: 0, y: -15, stagger: 0.08, duration: 0.8 })
      .from(bgTextRef.current, { scale: 0.92, opacity: 0, duration: 1.1 }, "-=0.6")
      .from(imageWrapperRef.current, { y: 50, opacity: 0, duration: 1 }, "-=0.8")
      .from(scriptRef.current, { y: 20, opacity: 0, duration: 0.8 }, "-=0.5")
      .from(".gsap-pill", { scale: 0.8, opacity: 0, stagger: 0.1, duration: 0.6 }, "-=0.6");

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;

      gsap.to(imageRef.current, { x: xPercent * 12, y: yPercent * 12, duration: 0.5 });
      gsap.to(bgTextRef.current, { x: xPercent * -15, y: yPercent * -8, duration: 0.7 });
      gsap.to(scriptRef.current, { x: xPercent * 18, y: yPercent * 15, duration: 0.5 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#EFECE6] text-[#111111] overflow-hidden flex flex-col justify-between p-6 md:p-10 select-none"
    >
      {/* TOP NAV */}
      <header className="relative z-30 w-full flex justify-between items-center font-mono text-xs uppercase tracking-widest">
        <div className="gsap-fade flex items-center gap-3">
          <span className="font-serif text-2xl font-bold tracking-tighter">DEV.</span>
          <span className="text-[10px] font-bold border-l border-neutral-400 pl-2 text-neutral-600">
            FULL-STACK ARCHITECT
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 font-sans font-semibold text-neutral-700">
          <a href="#home" className="gsap-fade hover:text-black">HOME</a>
          <a href="#about" className="gsap-fade hover:text-black">ABOUT</a>
          <a href="#projects" className="gsap-fade hover:text-black">PROJECTS</a>
        </nav>

        <a
          href="#contact"
          className="gsap-fade px-5 py-2.5 bg-neutral-950 text-white rounded-full text-xs font-sans font-medium hover:bg-neutral-800"
        >
          LET'S TALK
        </a>
      </header>

      {/* HERO MAIN */}
      <div className="relative w-full flex-1 flex items-center justify-center">
        {/* Background Typography */}
        <h1
          ref={bgTextRef}
          className="absolute inset-0 flex items-center justify-center text-[20vw] font-black tracking-tighter text-neutral-900 leading-none uppercase pointer-events-none z-0"
        >
          SOFTWARE
        </h1>

        {/* LEFT COMPACT BADGE */}
        <div className="gsap-pill hidden lg:flex absolute left-8 top-1/3 z-30 items-center gap-3 px-4 py-2.5 rounded-full bg-white/90 shadow-lg border border-neutral-200 text-xs font-sans font-medium">
          <FiCode className="text-neutral-900" size={16} />
          <span>Crafting High-Performance Apps</span>
        </div>

        {/* RIGHT COMPACT BADGE */}
        <div className="gsap-pill hidden lg:flex absolute right-8 bottom-1/3 z-30 items-center gap-2 px-4 py-2.5 rounded-full bg-neutral-950 text-white shadow-lg text-xs font-sans font-medium">
          <FiTerminal size={14} />
          <span>React • Node • Scalable Systems</span>
          <a href="#projects" className="ml-1 hover:text-neutral-300">
            <FiArrowUpRight size={14} />
          </a>
        </div>

        {/* CENTER IMAGE FRAME */}
        <div
          ref={imageWrapperRef}
          className="relative z-10 w-[280px] sm:w-[380px] md:w-[440px] lg:w-[480px] aspect-[4/5] rounded-full overflow-hidden border-[6px] border-[#EFECE6] shadow-2xl group"
        >
          <img
            ref={imageRef}
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80"
            alt="Subject"
            className="w-full h-full object-cover scale-105 transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* SCRIPT OVERLAY */}
        <div
          ref={scriptRef}
          className="absolute z-20 top-[60%] pointer-events-none text-center"
        >
          <span className="font-serif italic text-6xl sm:text-7xl md:text-8xl text-neutral-950 tracking-tight block">
            Developer
          </span>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="relative z-30 w-full flex justify-between items-center text-xs font-mono text-neutral-600 border-t border-neutral-300/60 pt-4">
        <div className="gsap-fade flex items-center gap-4 text-neutral-800">
          <a href="#" className="hover:text-black"><FaGithub size={18} /></a>
          <a href="#" className="hover:text-black"><FaLinkedin size={18} /></a>
          <a href="#" className="hover:text-black"><FaXTwitter size={18} /></a>
          <a href="#" className="hover:text-black"><FaInstagram size={18} /></a>
        </div>

        <div className="gsap-fade font-sans font-medium text-neutral-900">
          <a href="mailto:hello@example.com" className="hover:underline">
            hello@example.com
          </a>
        </div>
      </footer>
    </section>
  );
}

