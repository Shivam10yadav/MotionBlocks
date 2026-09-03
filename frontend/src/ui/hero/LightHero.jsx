import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ArrowDownRight, Compass, MoveUpRight, Sparkles } from "lucide-react";

const INDEX_ITEMS = [
  {
    id: "01",
    title: "ATELIER LUMIÈRE",
    tag: "SPATIAL & INTERIOR",
    year: "2026",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=900",
  },
  {
    id: "02",
    title: "MONOGRAPH NO. 04",
    tag: "EDITORIAL & PRINT",
    year: "2025",
    img: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=900",
  },
];

export default function LightHero() {
  const [activePreview, setActivePreview] = useState(null);
  const cardRef = useRef(null);

  // Smooth Magnetic Cursor & Dynamic Tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);

  const handlePointerMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Entrance Motion Config
  const fadeUp = {
    hidden: { opacity: 0, y: 35 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        delay: i * 0.1,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <div className="relative min-h-screen w-full bg-[#FAF8F5] text-[#0A0A0A] font-sans p-6 md:p-12 select-none overflow-hidden flex flex-col justify-between">
      {/* High-Contrast Grain Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Top Header */}
      <motion.header
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
        className="relative z-20 flex items-center justify-between border-b-2 border-[#0A0A0A] pb-6"
      >
        <div className="flex items-center gap-3">
          <span className="font-serif text-2xl font-black tracking-tighter uppercase">
            STUDIO NOIR
          </span>
          <span className="rounded-full bg-[#0A0A0A] px-2.5 py-0.5 text-[9px] font-bold tracking-widest text-[#FAF8F5] uppercase">
            SOTD '26
          </span>
        </div>

        <nav className="hidden items-center gap-12 font-mono text-xs font-bold uppercase tracking-widest text-[#0A0A0A] md:flex">
          <a href="#work" className="hover:line-through">
            INDEX
          </a>
          <a href="#agency" className="hover:line-through">
            PROFILE
          </a>
          <a href="#contact" className="hover:line-through">
            CONTACT
          </a>
        </nav>

        <button className="flex items-center gap-2 rounded-full border-2 border-[#0A0A0A] bg-[#0A0A0A] px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-[#FAF8F5] transition-all hover:bg-transparent hover:text-[#0A0A0A] cursor-pointer">
          START PROJECT <MoveUpRight size={14} />
        </button>
      </motion.header>

      {/* Main Grid Content Area */}
      <main className="relative z-10 my-8 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
        {/* Left Editorial Text Column */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#0A0A0A] mb-4"
          >
            <Sparkles size={14} className="text-[#0A0A0A]" />
            DIRECTION & ARCHITECTURE
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="font-serif text-6xl font-normal leading-[0.9] tracking-tight uppercase text-[#0A0A0A] sm:text-8xl xl:text-9xl"
          >
            RAW <br />
            <span className="italic font-light text-[#0A0A0A]/80">ELEGANCE.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="mt-8 max-w-lg font-sans text-sm md:text-base font-normal leading-relaxed text-[#0A0A0A]"
          >
            Creating high-contrast visual systems and digital experiences. Focused on structural precision, typographic hierarchy, and tactile kinetic interactions.
          </motion.p>

          {/* Interactive Work List */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="mt-12 space-y-2 border-t-2 border-[#0A0A0A] pt-6"
          >
            {INDEX_ITEMS.map((item) => (
              <div
                key={item.id}
                onMouseEnter={() => setActivePreview(item.img)}
                onMouseLeave={() => setActivePreview(null)}
                className="group flex items-center justify-between py-3 border-b border-[#0A0A0A]/20 cursor-pointer transition-colors hover:border-[#0A0A0A]"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs font-bold text-[#0A0A0A]">
                    [{item.id}]
                  </span>
                  <span className="font-serif text-2xl font-medium tracking-tight group-hover:translate-x-3 transition-transform duration-300">
                    {item.title}
                  </span>
                </div>
                <div className="flex items-center gap-6 font-mono text-xs font-bold uppercase tracking-widest text-[#0A0A0A]/70">
                  <span className="hidden sm:inline">{item.tag}</span>
                  <ArrowDownRight size={16} className="group-hover:rotate-[270deg] transition-transform duration-300" />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Stage: Interactive 3D Card with Image Reveal */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div
            ref={cardRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            style={{ perspective: 1000 }}
            className="relative h-[380px] w-full max-w-sm sm:h-[460px]"
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative h-full w-full rounded-2xl border-2 border-[#0A0A0A] bg-[#FAF8F5] p-6 shadow-[12px_12px_0px_0px_#0A0A0A] transition-all duration-200"
            >
              {/* Image Preview Window */}
              <div className="relative h-full w-full overflow-hidden rounded-lg border border-[#0A0A0A] bg-[#0A0A0A]">
                <img
                  src={
                    activePreview ||
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=900"
                  }
                  alt="Feature Preview"
                  className="h-full w-full object-cover transition-all duration-500 hover:scale-105"
                />
                
                <div className="absolute top-4 left-4 rounded bg-[#0A0A0A] px-3 py-1 font-mono text-[10px] font-bold tracking-widest text-[#FAF8F5] uppercase">
                  FEATURED WORK
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer Info */}
      <motion.footer
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={5}
        className="relative z-20 flex items-center justify-between border-t-2 border-[#0A0A0A] pt-6 font-mono text-xs font-bold uppercase tracking-widest text-[#0A0A0A]"
      >
        <div className="flex items-center gap-2">
          <Compass size={14} />
          <span>PARIS, FR</span>
        </div>
        <span>VOL. 2026</span>
      </motion.footer>
    </div>
  );
}