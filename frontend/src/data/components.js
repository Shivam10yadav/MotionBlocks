import GlowButton from "../ui/buttons/GlowButton";
import GradientButton from "../ui/buttons/GradientButton";
import CtaSection from "../ui/cta/CTA-1";
import AuroraTextEffect from "../ui/text-effect/AuroraTextEffect";
import NotFound from "../ui/404/NotFound";
import Testimonial from "../ui/testimonials/Testimonials-1";
import HoverGallery from "../ui/gallery/HoverGallery";
export const components = [
  {
    id: 1,
    slug: "glow-button",
    name: "Glow Button",
    category: "buttons",
    description:
      "A glowing button with a smooth hover animation.",

    preview: GlowButton,

    install: "npm install framer-motion",

    usage: `<GlowButton />`,

    code: `const GlowButton = () => {
  return (
    <button className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(6,182,212,0.7)]">
      Click Me
    </button>
  );
};

export default GlowButton;`,
  },
  {
    id: 2,
    slug: "cta-section",
    name: "CTA Section",
    category: "cta-sections",
    description:
      "A conversion-focused call-to-action block with a glow backdrop, badge, dual buttons, and a social proof row.",

    preview: CtaSection,

    install: "npm install lucide-react",

    usage: `<CtaSection
  badge="New · v2.0 out now"
  title="Build faster. Ship sooner."
  description="Everything you need to launch your next product — clean components, zero setup, fully customizable to fit your stack."
  primaryLabel="Get Started Free"
  primaryHref="#"
  secondaryLabel="Watch Demo"
  secondaryHref="#"
  rating={4.9}
  usersLabel="3,200+ developers"
  avatarCount={4}
/>`,

    code: `import { ArrowRight, Play, Star } from "lucide-react";

const avatarColors = ["#FF7A45", "#5EEAD4", "#7C6CFF", "#FF5D8F"];

const CtaSection = ({
  badge = "New · v2.0 out now",
  title = "Build faster. Ship sooner.",
  description = "Everything you need to launch your next product — clean components, zero setup, fully customizable to fit your stack.",
  primaryLabel = "Get Started Free",
  primaryHref = "#",
  secondaryLabel = "Watch Demo",
  secondaryHref = "#",
  rating = 4.9,
  usersLabel = "3,200+ developers",
  avatarCount = 4,
}) => {
  return (
    <section className="relative isolate overflow-hidden rounded-3xl border border-[#23262F] bg-[#08090D] px-6 py-16 sm:px-12 sm:py-20 [--ember:#FF7A45] [--teal:#5EEAD4]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(94,234,212,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(94,234,212,0.07)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-[--ember] opacity-50 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 translate-x-1/3 translate-y-1/3 rounded-full bg-[--teal] opacity-30 blur-[100px]" />

      {["left-4 top-4 border-l border-t", "right-4 top-4 border-r border-t", "left-4 bottom-4 border-l border-b", "right-4 bottom-4 border-r border-b"].map((pos, i) => (
        <span key={i} className={\`pointer-events-none absolute h-5 w-5 border-[--teal]/40 \${pos}\`} />
      ))}

      <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#23262F] bg-[#111319] px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-[--teal]">
          <span className="h-1.5 w-1.5 rounded-full bg-[--teal] shadow-[0_0_8px_#5EEAD4]" />
          {badge}
        </span>

        <h2 className="text-4xl font-semibold leading-tight text-[#F4F3F1] sm:text-5xl">{title}</h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#8B8D98]">{description}</p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a href={primaryHref} className="group inline-flex items-center justify-center gap-2 rounded-full bg-[--ember] px-7 py-3.5 text-sm font-semibold text-[#08090D] shadow-[0_0_25px_rgba(255,122,69,0.35)] transition-all duration-200 hover:scale-[1.03] hover:bg-[#ff8f63] hover:shadow-[0_0_30px_rgba(255,122,69,0.5)] active:scale-[0.97]">
            {primaryLabel}
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </a>
          <a href={secondaryHref} className="inline-flex items-center justify-center gap-2 rounded-full border border-[#23262F] bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-[#F4F3F1] transition-all duration-200 hover:border-white/20 hover:bg-white/[0.06]">
            <Play size={14} className="text-[--teal]" />
            {secondaryLabel}
          </a>
        </div>

        <div className="mt-10 flex items-center gap-4 border-t border-[#23262F] pt-6">
          <div className="flex -space-x-2.5">
            {Array.from({ length: avatarCount }).map((_, i) => (
              <div key={i} className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#08090D] text-[10px] font-semibold text-[#08090D]" style={{ backgroundColor: avatarColors[i % avatarColors.length] }}>
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1 text-[--ember]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} fill={i < Math.round(rating) ? "currentColor" : "none"} strokeWidth={1.5} />
              ))}
              <span className="ml-1 font-mono text-xs text-[#F4F3F1]">{rating}</span>
            </div>
            <p className="mt-0.5 font-mono text-xs text-[#5C5F6B]">Loved by {usersLabel}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;`,
  },
  {
    id: 3,
    slug: "animated-gradient-button",
    name: "Animated Gradient Button",
    category: "buttons",
    description:
      "A modern button featuring animated gradient borders, an ambient glow backdrop, and a light shimmer pass effect.",

    preview: GradientButton,

    install: "npm install framer-motion",

    usage: `<GradientButton>Get Started Now</GradientButton>`,

    code: `import React from "react";
import { motion } from "framer-motion";

const GradientButton = ({ children = "Get Started Now", onClick, className = "" }) => {
  return (
    <div className="relative group inline-block">
      {/* Animated Glow Backdrop */}
      <motion.div
        className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-75 blur-md group-hover:opacity-100 transition duration-500 group-hover:duration-200"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundSize: "200% 200%",
        }}
      />

      {/* Main Interactive Button */}
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={\`relative flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gray-950 text-white font-medium text-sm tracking-wide shadow-2xl overflow-hidden cursor-pointer \${className}\`}
      >
        {/* Animated Gradient Border Overlay */}
        <motion.div
          className="absolute inset-0 rounded-xl p-[1px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 -z-10"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundSize: "200% 200%",
          }}
        />

        {/* Shimmer Light Effect */}
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
          animate={{
            translateX: ["-100%", "200%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut",
          }}
        />

        {/* Button Content */}
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </motion.button>
    </div>
  );
};

export default GradientButton;`,
  },
  {
    id: 4,
    slug: "aurora-text-effect",
    name: "Aurora Text Effect",
    category: "text-effects",
    description:
      "A liquid metallic typography component featuring animated color shifts, staggered letter entrances, and interactive 3D magnetic tilt.",

    preview: AuroraTextEffect,

    install: "npm install framer-motion",

    usage: `<AuroraTextEffect text="QUANTUM FLUX" subtitle="Advanced motion components. Premium visual experiences." />`,

    code: `import React from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

const AuroraTextEffect = ({
  text = "QUANTUM FLUX",
  subtitle = "Advanced motion components. Premium visual experiences.",
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseXPos = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseYPos = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: { y: 60, opacity: 0, filter: "blur(10px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 120,
      },
    },
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000 relative flex min-h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-[#23262F] bg-[#08090D] p-8 text-center"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-amber-500/20 via-indigo-500/20 to-blue-500/20 blur-[120px]" />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center font-display text-6xl font-black uppercase tracking-tight text-transparent sm:text-8xl lg:text-9xl"
        >
          {text.split("").map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className="relative inline-block select-none bg-gradient-to-r from-[#FBBF24] via-[#E2E8F0] to-[#2563EB] bg-clip-text"
              style={{
                backgroundSize: "300% 100%",
                WebkitBackgroundClip: "text",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {char === " " ? "\\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-6 max-w-lg text-base font-medium leading-relaxed text-[#8B8D98] sm:text-lg"
        >
          {subtitle}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default AuroraTextEffect;`,
  },
  {
    id: 5,
    slug: "minimal-light-404",
    name: "Minimal Light 404",
    category: "404-pages",
    description:
      "A beautifully minimal, light-themed 404 error page with smooth floating physics, soft ambient backdrop gradients, and interactive navigation controls.",

    preview: NotFound,

    install: "npm install framer-motion lucide-react",

    usage: `<NotFound />`,

    code: `import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Sparkles } from "lucide-react";

export const NotFound = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-slate-50 text-slate-800 antialiased selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Subtle Light-Theme Ambient Gradient Glows */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[450px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-b from-indigo-200/60 via-purple-100/40 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-1/3 h-[400px] w-[500px] rounded-full bg-gradient-to-t from-pink-200/50 via-indigo-100/30 to-transparent blur-3xl" />

      {/* Floating Decorative Elements */}
      <motion.div
        className="pointer-events-none absolute top-1/4 left-1/6 hidden lg:block"
        animate={{
          y: [-10, 10, -10],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-white/70 px-4 py-2.5 shadow-xl shadow-slate-200/50 backdrop-blur-md">
          <Sparkles className="h-4 w-4 text-indigo-500" />
          <span className="font-mono text-xs font-medium text-slate-500">Lost in Space</span>
        </div>
      </motion.div>

      {/* Main Content Card Container */}
      <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center px-6 text-center">
        
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-indigo-50/80 px-3.5 py-1.5 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500" />
          </span>
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Error 404
          </span>
        </motion.div>

        {/* Animated Floating 404 Headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mt-6 select-none"
        >
          <motion.h1
            animate={{ y: [-6, 6, -6] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="font-display text-8xl font-black tracking-tight text-slate-900 sm:text-9xl"
          >
            4
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              0
            </span>
            4
          </motion.h1>
        </motion.div>

        {/* Text Details */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="mt-4 text-2xl font-semibold text-slate-900 sm:text-3xl">
            Page not found
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-500 sm:text-lg">
            Sorry, we couldn’t find the page you’re looking for. It might have been moved, renamed, or no longer exists.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <a
            href="/"
            className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-slate-900/10 transition-all duration-200 hover:bg-slate-800 hover:shadow-2xl hover:shadow-slate-900/20 active:scale-[0.98]"
          >
            <Home className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
            <span>Back to Home</span>
          </a>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200/80 bg-white/80 px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-md transition-all duration-200 hover:border-slate-300 hover:bg-white hover:text-slate-900 active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Go Back</span>
          </button>
        </motion.div>
      </div>

      {/* Footer copyright */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute bottom-6 text-center font-mono text-xs text-slate-400"
      >
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </motion.footer>
    </div>
  );
};

export default NotFound;`,
  },
  {
    id: 6,
    slug: "light-testimonial-slider",
    name: "Light Testimonial Slider",
    category: "testimonials",
    description:
      "A light-themed testimonial carousel featuring smooth AnimatePresence transition effects, star rating displays, profile metadata, and interactive controls.",

    preview: Testimonial,

    install: "npm install framer-motion lucide-react",

    usage: `<Testimonial />`,

    code: `import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonialsData = [
  {
    id: 1,
    quote:
      "This library completely revolutionized how fast we build landing pages. The components are ridiculously polished, smooth, and effortless to integrate into our stack.",
    name: "Sophia Martinez",
    role: "Lead Product Designer",
    company: "Vortex Labs",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "The micro-animations and physics-based motion in these components added a level of luxury to our web app that our users mention in almost every feedback survey.",
    name: "Alexandre Dubois",
    role: "Senior Frontend Engineer",
    company: "Lumière Digital",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "Clean code, exceptional performance, and zero dependency bloat. Easily one of the best UI component sets I've used in years.",
    name: "Elena Rostova",
    role: "Co-Founder & CTO",
    company: "Aether AI",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250",
    rating: 5,
  },
];

export const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const current = testimonialsData[currentIndex];

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-50/50 p-8 sm:p-12 lg:p-16 antialiased selection:bg-indigo-100 selection:text-indigo-900">
      <div className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-indigo-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-80 w-80 rounded-full bg-purple-100/50 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <Quote className="absolute -top-4 -left-4 h-24 w-24 text-slate-200/50 pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center text-center sm:items-start sm:text-left"
          >
            <div className="flex items-center gap-1 text-amber-400">
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>

            <p className="mt-6 text-2xl font-medium leading-relaxed tracking-tight text-slate-800 sm:text-3xl lg:text-4xl">
              "{current.quote}"
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:items-center">
              <img
                src={current.avatar}
                alt={current.name}
                className="h-14 w-14 rounded-full border-2 border-white object-cover shadow-md shadow-slate-200"
              />
              <div>
                <h4 className="text-base font-semibold text-slate-900">{current.name}</h4>
                <p className="text-sm font-medium text-slate-500">
                  {current.role} at <span className="text-indigo-600 font-semibold">{current.company}</span>
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex items-center justify-between border-t border-slate-200/80 pt-6">
          <div className="flex items-center gap-2">
            {testimonialsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={\`Go to slide \${idx + 1}\`}
                className={\`h-2.5 rounded-full transition-all duration-300 \${
                  idx === currentIndex ? "w-8 bg-indigo-600" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                }\`}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/80 bg-white text-slate-700 shadow-sm backdrop-blur-md transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/80 bg-white text-slate-700 shadow-sm backdrop-blur-md transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;`,
  },
  {
    id: 7,
    slug: "hover-accordion-gallery",
    name: "Hover Accordion Gallery",
    category: "galleries",
    description:
      "An interactive visual gallery with fluid flex-accordion sliding hover transitions, smooth image scaling, and contextual meta details.",

    preview: HoverGallery,

    install: "npm install framer-motion lucide-react",

    usage: `<HoverGallery />`,

    code: `import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

const galleryImages = [
  {
    id: 1,
    title: "Neptune Dunes",
    category: "Architecture",
    location: "Reykjavík, Iceland",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 2,
    title: "Velvet Horizon",
    category: "Minimalism",
    location: "Kyoto, Japan",
    image: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 3,
    title: "Aetherial Ridge",
    category: "Landscape",
    location: "Zermatt, Switzerland",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 4,
    title: "Cyber Canopy",
    category: "Abstract",
    location: "Singapore",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 5,
    title: "Solar Eclipse",
    category: "Editorial",
    location: "Atacama, Chile",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1200",
  },
];

export const HoverGallery = () => {
  const [activeId, setActiveId] = useState(1);

  return (
    <section className="relative w-full overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-50 p-6 sm:p-10 dark:border-slate-800 dark:bg-slate-950 antialiased">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-b from-indigo-200/40 via-purple-100/20 to-transparent blur-3xl dark:from-indigo-900/20 dark:via-purple-900/10" />

      <div className="relative z-10 mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-indigo-50/80 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:border-indigo-900/50 dark:bg-indigo-950/50 dark:text-indigo-400">
            <Sparkles className="h-3.5 w-3.5" />
            Featured Visuals
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Curated Showcase
          </h2>
        </div>
        <p className="max-w-xs text-sm text-slate-500 dark:text-slate-400">
          Hover over any card to smoothly expand the visual landscape and reveal gallery details.
        </p>
      </div>

      <div className="relative z-10 flex h-[480px] w-full flex-col gap-3 sm:flex-row sm:gap-4">
        {galleryImages.map((item) => {
          const isActive = activeId === item.id;

          return (
            <motion.div
              key={item.id}
              onMouseEnter={() => setActiveId(item.id)}
              onClick={() => setActiveId(item.id)}
              layout
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 25,
              }}
              className={\`group relative flex h-full cursor-pointer overflow-hidden rounded-2xl \${
                isActive ? "sm:flex-[3.5]" : "sm:flex-[1]"
              } transition-all duration-300\`}
            >
              <motion.img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent transition-opacity duration-300" />

              {!isActive && (
                <div className="absolute inset-0 hidden items-end p-6 sm:flex">
                  <span className="font-display text-lg font-semibold tracking-wide text-white/80 [writing-mode:vertical-lr] rotate-180">
                    {item.title}
                  </span>
                </div>
              )}

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-6 sm:p-8"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-mono text-xs font-semibold uppercase tracking-widest text-indigo-300">
                          {item.category} • {item.location}
                        </span>
                        <h3 className="mt-1 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                          {item.title}
                        </h3>
                      </div>

                      <button
                        aria-label="View Project"
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-transform duration-200 hover:scale-110 hover:bg-white hover:text-slate-900"
                      >
                        <ArrowUpRight className="h-5 w-5" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default HoverGallery;`,
  },
];

