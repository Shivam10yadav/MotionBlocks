// Hero.jsx
// npm i framer-motion gsap
//
// Stack in play:
//  - React            component structure, hooks, refs
//  - Tailwind CSS      all utility classes below
//  - GSAP + ScrollTrigger   the scroll-pinned bottle drop + notes-orbit timeline
//  - Framer Motion     load-in stagger, magnetic CTA, cursor-following glow
//
// GSAP owns anything tied to scroll position (pin, scrub, drawing lines).
// Framer Motion owns anything tied to a discrete event (mount, hover, pointer position).
// That split is deliberate — it's what each library is actually good at.

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NOTES = [
  { label: "Bergamot", desc: "Bright opening", x: -34, y: -20 },
  { label: "Oud", desc: "A slow, dark heart", x: 34, y: -20 },
  { label: "Amber", desc: "Warm, lingering base", x: 0, y: 34 },
];

const headlineWords = ["Stillness,", "bottled."];

// ---------- Framer Motion variants (load-in) ----------
const navVariants = {
  hidden: { opacity: 0, y: -12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const wordVariants = {
  hidden: { y: "110%", opacity: 0 },
  show: (i) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.08 },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

// ---------- Bottle (inline SVG, swap for a real product photo any time) ----------
function Bottle({ innerRef }) {
  return (
    <svg
      ref={innerRef}
      viewBox="0 0 220 420"
      className="w-[130px] sm:w-[170px] md:w-[210px] h-auto"
      style={{ filter: "drop-shadow(0 30px 40px rgba(30,27,22,0.18))" }}
    >
      <defs>
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="45%" stopColor="#EFE1D6" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="liquid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D4B483" />
          <stop offset="100%" stopColor="#B08D57" />
        </linearGradient>
        <linearGradient id="cap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5C6E52" />
          <stop offset="100%" stopColor="#3B4A35" />
        </linearGradient>
      </defs>
      <rect x="85" y="18" width="50" height="46" rx="6" fill="url(#cap)" />
      <rect x="80" y="58" width="60" height="16" rx="4" fill="#3B4A35" />
      <rect x="98" y="74" width="24" height="28" fill="#EFE1D6" fillOpacity="0.5" stroke="#B08D57" strokeWidth="1.5" />
      <path
        d="M60 102 Q60 96 70 96 L150 96 Q160 96 160 102 L172 190 Q176 210 176 232 L176 380 Q176 400 156 400 L64 400 Q44 400 44 380 L44 232 Q44 210 48 190 Z"
        fill="url(#glass)" stroke="#B08D57" strokeOpacity="0.55" strokeWidth="1.5"
      />
      <path
        d="M48 232 Q44 260 44 300 L44 380 Q44 400 64 400 L156 400 Q176 400 176 380 L176 300 Q176 260 172 232 Z"
        fill="url(#liquid)" fillOpacity="0.85"
      />
      <path d="M64 130 Q60 220 64 340" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="3" fill="none" strokeLinecap="round" />
      <rect x="70" y="270" width="80" height="52" rx="2" fill="#FAF6F0" fillOpacity="0.92" stroke="#4A5D42" strokeOpacity="0.4" strokeWidth="1" />
      <text x="110" y="292" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="13" fill="#1E1B16">AUNE</text>
      <text x="110" y="307" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="6" letterSpacing="0.5" fill="#4A5D42">eau de parfum</text>
    </svg>
  );
}

// ---------- Magnetic CTA (pure Framer Motion — spring follows the pointer, resets on leave) ----------
function MagneticButton({ children }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.2 });

  const handleMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.35);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.96 }}
      className="inline-flex items-center gap-3 border border-botanical text-botanical px-7 py-3 rounded-full text-sm tracking-wide hover:bg-botanical hover:text-cream transition-colors duration-300"
    >
      {children}
    </motion.button>
  );
}

export default function HeroSection() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const dropRef = useRef(null);
  const bottleGroupRef = useRef(null);
  const shadowRef = useRef(null);
  const headlineRef = useRef(null);
  const noteRefs = useRef([]);
  const lineRefs = useRef([]);

  noteRefs.current = [];
  lineRefs.current = [];
  const addNoteRef = (el) => el && noteRefs.current.push(el);
  const addLineRef = (el) => el && lineRefs.current.push(el);

  // Framer Motion: cursor-following glow (spring-smoothed motion values, no GSAP involved)
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const glowSpringX = useSpring(glowX, { stiffness: 60, damping: 20 });
  const glowSpringY = useSpring(glowY, { stiffness: 60, damping: 20 });
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useTransform(tiltY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(tiltX, [-0.5, 0.5], [-10, 10]);
  const springRotateX = useSpring(rotateX, { stiffness: 120, damping: 14 });
  const springRotateY = useSpring(rotateY, { stiffness: 120, damping: 14 });

  const onStagePointerMove = (e) => {
    const r = stageRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    tiltX.set(px);
    tiltY.set(py);
    glowX.set(px * 60);
    glowY.set(py * 60);
  };
  const onStagePointerLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
    glowX.set(0);
    glowY.set(0);
  };

  // GSAP: everything scroll-driven — pin, drop, notes orbiting in, connecting lines
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(dropRef.current, { y: -420, rotation: -10, scale: 0.88, transformOrigin: "50% 100%" });
      gsap.set(shadowRef.current, { scaleX: 0.4, opacity: 0 });
      gsap.set(noteRefs.current, { opacity: 0, scale: 0.85 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=220%",
          scrub: 0.7,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(headlineRef.current, { scale: 0.82, y: -40, duration: 1, ease: "power2.out" }, 0)
        .to(dropRef.current, { y: 0, rotation: 0, scale: 1, duration: 1, ease: "power2.out" }, 0)
        .to(shadowRef.current, { scaleX: 1, opacity: 1, duration: 0.9, ease: "power2.out" }, 0.15)
        .to(lineRefs.current, { scaleX: 1, duration: 0.5, stagger: 0.12, ease: "power2.out" }, 0.5)
        .to(noteRefs.current, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.12, ease: "back.out(1.6)" }, 0.55);

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=220%",
        onLeave: () => {
          gsap.to(dropRef.current, { y: -8, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1 });
        },
        onEnterBack: () => gsap.killTweensOf(dropRef.current),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full bg-cream text-ink">
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="show"
        className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-12 py-6"
      >
        <span className="font-serif text-xl tracking-wide">Aune</span>
        <button className="text-sm text-ink/70 hover:text-ink transition-colors duration-300 hidden sm:block">
          Our story
        </button>
      </motion.nav>

      <section
        ref={sectionRef}
        className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center text-center"
      >
        <h1
          ref={headlineRef}
          className="font-serif text-[2.75rem] leading-[0.95] sm:text-[4rem] md:text-[5.5rem] relative z-10 mb-2"
        >
          {headlineWords.map((w, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="show"
                className="inline-block"
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>

        <div
          ref={stageRef}
          onPointerMove={onStagePointerMove}
          onPointerLeave={onStagePointerLeave}
          style={{ perspective: 1200 }}
          className="relative w-full max-w-xl h-[46vh] md:h-[50vh] flex items-center justify-center"
        >
          <motion.div
            style={{ x: glowSpringX, y: glowSpringY }}
            className="absolute w-[280px] h-[280px] md:w-[380px] md:h-[380px] rounded-full pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <div
              className="w-full h-full rounded-full"
              style={{ background: "radial-gradient(circle, rgba(176,141,87,0.35) 0%, rgba(176,141,87,0) 70%)" }}
            />
          </motion.div>

          {NOTES.map((n, i) => {
            const length = Math.sqrt(n.x * n.x + n.y * n.y);
            const angle = Math.atan2(n.y, n.x) * (180 / Math.PI);
            return (
              <div
                key={i}
                ref={addLineRef}
                className="absolute top-1/2 left-1/2 h-px bg-botanical/40 origin-left"
                style={{ width: `${length}%`, transform: `rotate(${angle}deg) scaleX(0)` }}
              />
            );
          })}

          <div ref={dropRef} className="relative z-10">
            <motion.div
              ref={bottleGroupRef}
              style={{ rotateX: springRotateX, rotateY: springRotateY, transformStyle: "preserve-3d" }}
            >
              <Bottle innerRef={() => {}} />
            </motion.div>
          </div>

          {NOTES.map((n, i) => (
            <div
              key={i}
              ref={addNoteRef}
              className="absolute z-10 flex flex-col items-center text-center"
              style={{ left: `${50 + n.x}%`, top: `${50 + n.y}%`, transform: "translate(-50%, -50%)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold mb-1.5" />
              <span className="font-serif text-lg leading-none">{n.label}</span>
              <span className="text-[11px] text-ink/55 mt-0.5">{n.desc}</span>
            </div>
          ))}

          <div ref={shadowRef} className="absolute bottom-6 w-[110px] md:w-[140px] h-[14px] rounded-full bg-ink/20 blur-md" />
        </div>

        <motion.p
          variants={fadeUp}
          custom={0.6}
          initial="hidden"
          animate="show"
          className="mt-4 max-w-md text-base md:text-lg text-ink/70 leading-relaxed relative z-10"
        >
          A quiet oud and white amber, drawn slow and settled deep.
        </motion.p>

        <motion.div variants={fadeUp} custom={0.75} initial="hidden" animate="show" className="relative z-10 mt-7">
          <MagneticButton>Discover the scent</MagneticButton>
        </motion.div>

        <motion.div
          variants={fadeUp}
          custom={0.9}
          initial="hidden"
          animate="show"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <span className="text-xs text-ink/50">Scroll to reveal</span>
          <div className="w-px h-8 bg-ink/25 relative overflow-hidden">
            <div className="w-px h-3 bg-botanical absolute top-0 animate-pulse" />
          </div>
        </motion.div>
      </section>
    </div>
  );
}