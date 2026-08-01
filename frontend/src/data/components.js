import GlowButton from "../ui/buttons/GlowButton";
import GradientButton from "../ui/buttons/GradientButton";
import CtaSection from "../ui/cta/CTA-1";
import AuroraTextEffect from "../ui/text-effect/AuroraTextEffect";
import NotFound from "../ui/404/NotFound";
import Testimonial from "../ui/testimonials/Testimonials-1";
import HoverGallery from "../ui/gallery/HoverGallery";
import MinimalFaq from "../ui/faq/MinimalFaq";
import TabbedFaq from "../ui/faq/TabbedFaq";
import LightPricing from "../ui/pricing/LightPricing";
import DarkBrownPricing from "../ui/pricing/DarkBrownPricing";
import LightAbout from "../ui/about/LightAbout";
import DarkAbout from "../ui/about/DarkAbout";
import LightAuth from "../ui/auth/LightAuth";
import DarkAuth from "../ui/auth/DarkAuth";
import Funky404 from "../ui/404/Funky404";
import { AppleHello } from "../ui/text-effect/AppleHelloTextEffect";

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

{
  id: 9,
  slug: "minimal-faq",
  name: "Minimalist Accordion FAQ",
  category: "faq",
  description: "A clean, dark accordion-style FAQ section with smooth height expansion.",
  preview: MinimalFaq,
  install: "npm install framer-motion lucide-react",
  usage: `<MinimalFaq />`,
  code: `import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How do I import components into my project?",
    answer:
      "Simply browse through our component library, select the one you like, and copy the source code directly into your React project. Make sure you have Tailwind CSS and Framer Motion installed.",
  },
  {
    question: "Are these components accessible (a11y)?",
    answer:
      "Yes! All components are constructed using semantic HTML tags and follow standard accessibility guidelines, ensuring proper keyboard navigation and ARIA state management.",
  },
  {
    question: "Can I use these components in commercial projects?",
    answer:
      "Absolutely. Everything in this library is released under the open-source MIT license, meaning you can freely use them in personal, educational, or commercial projects.",
  },
  {
    question: "Do I need to install any heavy npm packages?",
    answer:
      "No! The entire library relies only on React, Tailwind CSS, Framer Motion, and Lucide React icons to keep your bundle size lightweight.",
  },
];

const MinimalFaq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full min-h-screen bg-[#08090D] px-4 py-12 sm:px-6 lg:px-8 text-[#F4F3F1] flex items-center justify-center">
      <div className="w-full max-w-3xl space-y-8">
        <div className="text-center space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#5EEAD4]/20 bg-[#5EEAD4]/10 px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider text-[#5EEAD4]">
            <HelpCircle size={14} className="text-[#5EEAD4]" />
            Got Questions?
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#8B8D98]">
            Everything you need to know about integrating MotionBlocks into your workflow.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={\`overflow-hidden rounded-2xl border transition-colors duration-200 \${
                  isOpen
                    ? "border-[#323644] bg-[#111319]"
                    : "border-[#23262F] bg-[#0B0D12] hover:border-[#323644]"
                }\`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between p-5 sm:p-6 text-left transition-colors duration-150"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold sm:text-lg text-[#F4F3F1]">
                    {faq.question}
                  </span>
                  <div
                    className={\`ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[#23262F] bg-[#111319] text-[#8B8D98] transition-transform duration-300 \${
                      isOpen ? "rotate-180 text-[#FF7A45] border-[#FF7A45]/30" : ""
                    }\`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="border-t border-[#23262F]/60 px-5 pb-6 pt-4 sm:px-6 text-sm sm:text-base leading-relaxed text-[#8B8D98]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MinimalFaq;`,
},
{
  id: 10,
  slug: "tabbed-faq",
  name: "Categorized Tabbed FAQ",
  category: "faq",
  description: "Advanced FAQ component with search capability, active tab highlights, and dynamic 2-column layout.",
  preview: TabbedFaq,
  install: "npm install framer-motion lucide-react",
  usage: `<TabbedFaq />`,
  code: `import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Search, Sparkles, Layers, ShieldCheck, Zap } from "lucide-react";

const categories = [
  { id: "all", label: "All Questions", icon: Layers },
  { id: "general", label: "General", icon: Sparkles },
  { id: "tech", label: "Technical", icon: Zap },
  { id: "license", label: "Licensing", icon: ShieldCheck },
];

const faqsData = [
  {
    id: 1,
    category: "general",
    question: "What makes MotionBlocks different from component libraries?",
    answer:
      "MotionBlocks is completely copy-and-paste. You don't have to install npm packages, worry about version mismatches, or fight against locked component APIs.",
  },
  {
    id: 2,
    category: "tech",
    question: "How do I customize the theme or colors?",
    answer:
      "Since all components are built using native Tailwind CSS utility classes with hex codes, you can directly edit the class names or modify Tailwind's config file.",
  },
  {
    id: 3,
    category: "general",
    question: "Can I contribute my own components to MotionBlocks?",
    answer:
      "Yes! Check out our contribution guide in the repository. Simply create your component file under src/ui/ and register it in components.js.",
  },
  {
    id: 4,
    category: "tech",
    question: "Is TypeScript supported out of the box?",
    answer:
      "All code samples are written in standard React JSX for max flexibility, but converting them to TSX is straightforward by adding interface types for props.",
  },
  {
    id: 5,
    category: "license",
    question: "Can I use these components for client projects?",
    answer:
      "Yes, you are free to build client applications, commercial SaaS applications, or personal portfolio projects using any component from this library.",
  },
  {
    id: 6,
    category: "license",
    question: "Do I need to attribute MotionBlocks in my app?",
    answer:
      "Attribution is strictly optional but appreciated! You are free to remove any comments or credit lines in your production code.",
  },
];

const TabbedFaq = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const filteredFaqs = useMemo(() => {
    return faqsData.filter((faq) => {
      const matchesCategory = activeTab === "all" || faq.category === activeTab;
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  return (
    <section className="w-full min-h-screen bg-[#08090D] px-4 py-12 sm:px-8 lg:px-12 text-[#F4F3F1]">
      <div className="mx-auto max-w-5xl space-y-10">
        <div className="flex flex-col gap-6 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
          <div className="max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#FF7A45]/20 bg-[#FF7A45]/10 px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider text-[#FF7A45]">
              Knowledge Base
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
              Help Center & FAQ
            </h2>
            <p className="text-base text-[#8B8D98]">
              Search or filter through categories to find quick answers to common questions.
            </p>
          </div>

          <div className="relative w-full max-w-md mx-auto lg:mx-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B8D98]" size={18} />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-[#23262F] bg-[#111319] py-3.5 pl-11 pr-4 text-sm text-[#F4F3F1] placeholder-[#5C5F6B] outline-none transition duration-200 focus:border-[#FF7A45]"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 border-b border-[#23262F] pb-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={\`relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-medium sm:text-sm transition-all duration-200 \${
                  isActive ? "text-[#08090D]" : "text-[#8B8D98] hover:text-[#F4F3F1]"
                }\`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute inset-0 rounded-xl bg-[#5EEAD4]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon size={16} />
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = expandedId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={\`flex flex-col justify-between rounded-2xl border p-5 transition-all duration-200 \${
                    isOpen
                      ? "border-[#FF7A45]/40 bg-[#111319]"
                      : "border-[#23262F] bg-[#0B0D12] hover:border-[#323644]"
                  }\`}
                >
                  <button
                    onClick={() => setExpandedId(isOpen ? null : faq.id)}
                    className="flex items-start justify-between gap-4 text-left"
                  >
                    <span className="font-semibold text-[#F4F3F1] sm:text-lg">
                      {faq.question}
                    </span>
                    <span
                      className={\`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-colors \${
                        isOpen
                          ? "border-[#FF7A45] bg-[#FF7A45] text-[#08090D]"
                          : "border-[#23262F] bg-[#111319] text-[#8B8D98]"
                      }\`}
                    >
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p className="mt-4 border-t border-[#23262F] pt-4 text-xs sm:text-sm leading-relaxed text-[#8B8D98]">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-12 text-center text-[#8B8D98]">
              No questions found matching your search criteria.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TabbedFaq;`,
},

{
  id: 11,
  slug: "light-pricing",
  name: "Light Theme 3-Tier Pricing",
  category: "pricing",
  description: "A sleek, high-contrast light 3-tier pricing section with animated monthly/yearly toggle.",
  preview: LightPricing,
  install: "npm install framer-motion lucide-react",
  usage: `<LightPricing />`,
  code: `import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Starter",
    description: "Perfect for freelancers and individual developers.",
    priceMonthly: 19,
    priceYearly: 15,
    features: [
      "Access to 50+ basic components",
      "Single developer license",
      "Community Discord support",
      "Standard documentation",
      "Free lifetime updates",
    ],
    popular: false,
    cta: "Start Free Trial",
  },
  {
    name: "Pro",
    description: "Ideal for growing teams and active production apps.",
    priceMonthly: 49,
    priceYearly: 39,
    features: [
      "Access to all 200+ components",
      "Up to 5 team members",
      "Priority email & chat support",
      "Figma design files included",
      "Commercial usage license",
      "Advanced animated templates",
    ],
    popular: true,
    cta: "Get Started Pro",
  },
  {
    name: "Enterprise",
    description: "Custom solutions for large agencies and corporations.",
    priceMonthly: 99,
    priceYearly: 79,
    features: [
      "Unlimited team members",
      "Custom component requests",
      "Dedicated account manager",
      "1-on-1 code integration support",
      "Custom SLA & security audit",
      "Source code repository access",
    ],
    popular: false,
    cta: "Contact Sales",
  },
];

const LightPricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="w-full min-h-screen bg-[#F8FAFC] py-16 px-4 sm:px-6 lg:px-8 text-[#0F172A] flex items-center justify-center">
      <div className="w-full max-w-6xl space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0EA5E9]/20 bg-[#0EA5E9]/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
            <Sparkles size={14} /> Flexible Pricing
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A]">
            Simple plans for every project
          </h2>
          <p className="text-base sm:text-lg text-[#64748B]">
            Start free, scale seamlessly. Choose the plan that best fits your workflow.
          </p>

          <div className="flex items-center justify-center gap-3 pt-4">
            <span className={\`text-sm font-medium \${!isYearly ? "text-[#0F172A]" : "text-[#64748B]"}\`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative h-8 w-16 rounded-full bg-[#E2E8F0] p-1 transition-colors duration-200"
            >
              <motion.div
                animate={{ x: isYearly ? 32 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="h-6 w-6 rounded-full bg-[#0284C7] shadow-md"
              />
            </button>
            <span className={\`text-sm font-medium flex items-center gap-1.5 \${isYearly ? "text-[#0F172A]" : "text-[#64748B]"}\`}>
              Yearly
              <span className="rounded-full bg-[#10B981]/10 border border-[#10B981]/20 px-2 py-0.5 text-[10px] font-bold text-[#059669]">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-stretch">
          {plans.map((plan, index) => {
            const price = isYearly ? plan.priceYearly : plan.priceMonthly;
            return (
              <div
                key={index}
                className={\`relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-300 \${
                  plan.popular
                    ? "bg-[#FFFFFF] border-2 border-[#0284C7] shadow-xl shadow-[#0284C7]/10 lg:-translate-y-2"
                    : "bg-[#FFFFFF] border border-[#E2E8F0] shadow-sm hover:border-[#CBD5E1]"
                }\`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#0284C7] px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#FFFFFF] shadow-md">
                    Most Popular
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-[#0F172A]">{plan.name}</h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#64748B] min-h-[40px]">
                      {plan.description}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-black text-[#0F172A]">\${price}</span>
                    <span className="text-sm font-medium text-[#64748B]">/month</span>
                  </div>

                  <div className="border-t border-[#F1F5F9] pt-6 space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
                      What's Included
                    </p>
                    <ul className="space-y-2.5">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm text-[#334155]">
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0284C7]/10 text-[#0284C7]">
                            <Check size={12} strokeWidth={3} />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  className={\`mt-8 w-full rounded-2xl py-3.5 px-4 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] \${
                    plan.popular
                      ? "bg-[#0284C7] text-[#FFFFFF] hover:bg-[#0369A1] shadow-lg shadow-[#0284C7]/20"
                      : "bg-[#F1F5F9] text-[#0F172A] hover:bg-[#E2E8F0]"
                  }\`}
                >
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LightPricing;`,
},
{
  id: 12,
  slug: "dark-brown-pricing",
  name: "Luxury Dark Brown Pricing",
  category: "pricing",
  description: "A luxury dark espresso & bronze themed 3-tier pricing table with subtle glow effects and interactive pricing toggles.",
  preview: DarkBrownPricing,
  install: "npm install framer-motion lucide-react",
  usage: `<DarkBrownPricing />`,
  code: `import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Shield, Crown } from "lucide-react";

const plans = [
  {
    name: "Essential",
    description: "Core toolkit for independent creators and boutique builds.",
    priceMonthly: 29,
    priceYearly: 24,
    features: [
      "Access to standard component suite",
      "Single commercial project",
      "Standard documentation",
      "Email support within 48h",
    ],
    popular: false,
    cta: "Select Plan",
  },
  {
    name: "Pro Studio",
    description: "Full suite for design agencies and high-end digital products.",
    priceMonthly: 79,
    priceYearly: 64,
    features: [
      "All luxury components & micro-interactions",
      "Unlimited commercial projects",
      "Figma design system access",
      "Priority VIP support",
      "Early access to new components",
      "Custom CSS variables setup",
    ],
    popular: true,
    cta: "Unlock Pro Studio",
  },
  {
    name: "Custom Atelier",
    description: "Tailored component architecture for enterprise platforms.",
    priceMonthly: 199,
    priceYearly: 159,
    features: [
      "Custom tailored component build",
      "Full source code ownership",
      "Dedicated design team liaison",
      "Quarterly architecture review",
      "Unlimited internal seats",
      "Custom animation fine-tuning",
    ],
    popular: false,
    cta: "Request Consultation",
  },
];

const DarkBrownPricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="w-full min-h-screen bg-[#120D0B] py-16 px-4 sm:px-6 lg:px-8 text-[#F5EBE6] flex items-center justify-center">
      <div className="w-full max-w-6xl space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D97706]/30 bg-[#D97706]/10 px-3.5 py-1.5 text-xs font-medium uppercase tracking-widest text-[#F59E0B]">
            <Crown size={14} /> Luxury Collection
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F5EBE6]">
            Elevate Your Build
          </h2>
          <p className="text-base text-[#A8988E]">
            Transparent pricing crafted for individuals and scaling studios.
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <span className={\`text-xs sm:text-sm uppercase tracking-wider font-semibold \${!isYearly ? "text-[#F5EBE6]" : "text-[#78685E]"}\`}>
              Billed Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative h-8 w-16 rounded-full border border-[#3D2E27] bg-[#1A1412] p-1 transition-colors duration-200"
            >
              <motion.div
                animate={{ x: isYearly ? 32 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="h-6 w-6 rounded-full bg-[#D97706] shadow-lg shadow-[#D97706]/30"
              />
            </button>
            <span className={\`text-xs sm:text-sm uppercase tracking-wider font-semibold flex items-center gap-2 \${isYearly ? "text-[#F5EBE6]" : "text-[#78685E]"}\`}>
              Billed Yearly
              <span className="rounded-md border border-[#D97706]/30 bg-[#D97706]/20 px-2 py-0.5 text-[10px] font-bold text-[#F59E0B]">
                20% OFF
              </span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-stretch">
          {plans.map((plan, index) => {
            const price = isYearly ? plan.priceYearly : plan.priceMonthly;
            return (
              <div
                key={index}
                className={\`relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-300 \${
                  plan.popular
                    ? "bg-[#1E1714] border-2 border-[#D97706] shadow-2xl shadow-[#D97706]/10 lg:-translate-y-2"
                    : "bg-[#17110E] border border-[#2E221C] hover:border-[#4A382E]"
                }\`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full border border-[#F59E0B]/40 bg-[#D97706] px-4 py-1 text-[11px] font-extrabold uppercase tracking-widest text-[#120D0B] shadow-md">
                    Recommended
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-[#F5EBE6]">{plan.name}</h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#A8988E] min-h-[40px]">
                      {plan.description}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-black text-[#F5EBE6]">\${price}</span>
                    <span className="text-sm font-medium text-[#78685E]">/ month</span>
                  </div>

                  <div className="border-t border-[#2E221C] pt-6 space-y-3">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#78685E]">
                      Included Features
                    </p>
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm text-[#D4C5BC]">
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D97706]/20 text-[#F59E0B]">
                            <Check size={12} strokeWidth={3} />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  className={\`mt-8 w-full rounded-2xl py-3.5 px-4 text-sm font-bold tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] \${
                    plan.popular
                      ? "bg-[#D97706] text-[#120D0B] hover:bg-[#F59E0B] shadow-lg shadow-[#D97706]/20"
                      : "border border-[#3D2E27] bg-[#241B17] text-[#F5EBE6] hover:bg-[#2E221C]"
                  }\`}
                >
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DarkBrownPricing;`,
},

{
  id: 13,
  slug: "light-about",
  name: "Light Theme About Section",
  category: "about",
  description: "A clean, modern about section featuring highlights, team mission, and animated stat counters.",
  preview: LightAbout,
  install: "npm install framer-motion lucide-react",
  usage: `<LightAbout />`,
  code: `import React from "react";
import { motion } from "framer-motion";
import { Rocket, Users, ShieldCheck, Zap, ArrowUpRight } from "lucide-react";

const stats = [
  { value: "99.9%", label: "Uptime SLA" },
  { value: "10M+", label: "API Requests / Day" },
  { value: "150+", label: "Global Edge Nodes" },
  { value: "<20ms", label: "Average Latency" },
];

const highlights = [
  {
    icon: Zap,
    title: "Lightning Performance",
    description: "Built from the ground up for minimal bundle size and ultra-fast paint times.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Grade",
    description: "Bank-level encryption standards and zero-trust security architecture.",
  },
  {
    icon: Users,
    title: "Developer First",
    description: "Designed with clean APIs, comprehensive docs, and effortless integration.",
  },
];

const LightAbout = () => {
  return (
    <section className="w-full min-h-screen bg-[#F8FAFC] py-20 px-4 sm:px-6 lg:px-8 text-[#0F172A] flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-6xl space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-4"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#0EA5E9]/20 bg-[#0EA5E9]/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
              <Rocket size={14} /> Who We Are
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
              Crafting digital tools that power the next web.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 space-y-4"
          >
            <p className="text-base text-[#64748B] leading-relaxed">
              We build open-source frameworks and production-ready UI components designed to help software engineers ship faster without compromising on quality or accessibility.
            </p>
            <a
              href="#team"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0284C7] hover:text-[#0369A1] transition-colors group"
            >
              Learn more about our team
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ y: -5 }}
                className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 space-y-4"
              >
                <div className="h-10 w-10 rounded-xl bg-[#0EA5E9]/10 text-[#0284C7] flex items-center justify-center">
                  <Icon size={20} />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A]">{item.title}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#0F172A] text-[#FFFFFF] rounded-3xl p-8 sm:p-12 shadow-xl grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-[#334155]/50"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className={\`space-y-1 \${idx > 0 ? "pt-6 lg:pt-0 lg:pl-8" : ""}\`}>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#38BDF8]">
                {stat.value}
              </div>
              <p className="text-xs sm:text-sm font-medium text-[#94A3B8]">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LightAbout;`,
},
{
  id: 14,
  slug: "dark-about",
  name: "Luxury Dark Themed About Section",
  category: "about",
  description: "A luxury dark espresso & amber about section featuring scroll animations and custom value cards.",
  preview: DarkAbout,
  install: "npm install framer-motion lucide-react",
  usage: `<DarkAbout />`,
  code: `import React from "react";
import { motion } from "framer-motion";
import { Award, Compass, Layers, Sparkles, CheckCircle2 } from "lucide-react";

const values = [
  {
    title: "Precision Engineering",
    description: "Every pixel, transition, and animation keyframe is calibrated for maximum fluidity.",
  },
  {
    title: "Architectural Integrity",
    description: "Decoupled component architecture designed to seamlessly slot into any modern stack.",
  },
  {
    title: "Uncompromised Quality",
    description: "Rigorous cross-browser testing and responsive optimization out of the box.",
  },
];

const DarkAbout = () => {
  return (
    <section className="w-full min-h-screen bg-[#120D0B] py-20 px-4 sm:px-6 lg:px-8 text-[#F5EBE6] flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D97706]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-6xl space-y-16 relative z-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#D97706]/30 bg-[#D97706]/10 px-3.5 py-1.5 text-xs font-medium uppercase tracking-widest text-[#F59E0B]"
          >
            <Compass size={14} /> Our Philosophy
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F5EBE6]"
          >
            Built for developers who care about the details.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-[#A8988E] leading-relaxed"
          >
            We eliminate the friction between complex motion design and production code, delivering interfaces that feel deliberate and luxurious.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 bg-[#19120E] border border-[#2E221C] rounded-3xl p-8 space-y-6 relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 h-32 w-32 bg-[#D97706]/5 rounded-bl-full transition-all group-hover:scale-125" />
            <div className="h-12 w-12 rounded-2xl bg-[#2E221C] border border-[#3D2E27] text-[#F59E0B] flex items-center justify-center">
              <Sparkles size={24} />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-[#F5EBE6]">Craftsmanship First</h3>
              <p className="text-sm text-[#A8988E] leading-relaxed">
                We don't do cookie-cutter components. Each element in our registry is hand-built with React, Tailwind CSS, and Framer Motion.
              </p>
            </div>
            <div className="pt-4 border-t border-[#2E221C] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#78685E]">
              <span>Est. 2026</span>
              <span className="text-[#F59E0B]">MotionBlocks Suite</span>
            </div>
          </motion.div>

          <div className="lg:col-span-7 space-y-4">
            {values.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-[#17110E] border border-[#2E221C] hover:border-[#4A382E] rounded-2xl p-6 transition-colors duration-300 flex items-start gap-4"
              >
                <div className="mt-1 text-[#F59E0B] shrink-0">
                  <CheckCircle2 size={20} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-[#F5EBE6]">{val.title}</h4>
                  <p className="text-sm text-[#A8988E] leading-relaxed">{val.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DarkAbout;`,
},

{
  id: 15,
  slug: "light-auth",
  name: "Light Auth Card",
  category: "auth",
  description: "A clean, minimal light theme login card with interactive tab switching, ring-focus animations, and OAuth integrations.",
  preview: LightAuth,
  install: "npm install react-icons framer-motion",
  usage: `<LightAuth />`,
  code: `import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiLock, FiUser, FiArrowRight } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaApple } from "react-icons/fa";

const LightAuth = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <section className="w-full min-h-screen bg-[#F8FAFC] py-16 px-4 flex items-center justify-center text-[#0F172A]">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-[#FFFFFF] border border-[#E2E8F0] rounded-3xl p-8 shadow-xl shadow-[#0F172A]/5 space-y-6 relative overflow-hidden"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#0EA5E9]/10 text-[#0284C7] font-bold text-lg">
            M
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-[#0F172A]">
            {isSignUp ? "Create an account" : "Welcome back"}
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            {isSignUp
              ? "Enter your details to start building"
              : "Enter your credentials to access your dashboard"}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="relative flex rounded-2xl bg-[#F1F5F9] p-1">
          <button
            type="button"
            onClick={() => setIsSignUp(false)}
            className={\`relative z-10 w-1/2 py-2 text-xs font-semibold transition-colors duration-200 \${
              !isSignUp ? "text-[#0F172A]" : "text-[#64748B]"
            }\`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsSignUp(true)}
            className={\`relative z-10 w-1/2 py-2 text-xs font-semibold transition-colors duration-200 \${
              isSignUp ? "text-[#0F172A]" : "text-[#64748B]"
            }\`}
          >
            Sign Up
          </button>
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={\`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-xl bg-[#FFFFFF] shadow-sm \${
              isSignUp ? "left-[calc(50%+2px)]" : "left-1"
            }\`}
          />
        </div>

        {/* OAuth Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] py-2.5 text-xs font-semibold text-[#334155] transition-all hover:bg-[#F8FAFC] hover:border-[#CBD5E1]"
          >
            <FcGoogle className="text-lg" />
            <span className="hidden sm:inline">Google</span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] py-2.5 text-xs font-semibold text-[#334155] transition-all hover:bg-[#F8FAFC] hover:border-[#CBD5E1]"
          >
            <FaGithub className="text-lg text-[#0F172A]" />
            <span className="hidden sm:inline">GitHub</span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] py-2.5 text-xs font-semibold text-[#334155] transition-all hover:bg-[#F8FAFC] hover:border-[#CBD5E1]"
          >
            <FaApple className="text-lg text-[#0F172A]" />
            <span className="hidden sm:inline">Apple</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="w-full border-t border-[#F1F5F9]" />
          <span className="absolute bg-[#FFFFFF] px-3 text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">
            Or continue with email
          </span>
        </div>

        {/* Form Body */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <AnimatePresence mode="wait">
            {isSignUp && (
              <motion.div
                key="name-input"
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-1.5"
              >
                <label className="text-xs font-semibold text-[#334155]">Full Name</label>
                <div className="relative">
                  <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] text-base" />
                  <input
                    type="text"
                    placeholder="Shivam Yadav"
                    className="w-full rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] pl-10 pr-4 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] transition-all focus:border-[#0284C7] focus:outline-none focus:ring-4 focus:ring-[#0EA5E9]/10"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#334155]">Email Address</label>
            <div className="relative">
              <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] text-base" />
              <input
                type="email"
                placeholder="name@company.com"
                className="w-full rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] pl-10 pr-4 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] transition-all focus:border-[#0284C7] focus:outline-none focus:ring-4 focus:ring-[#0EA5E9]/10"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[#334155]">Password</label>
              {!isSignUp && (
                <a href="#forgot" className="text-xs font-semibold text-[#0284C7] hover:underline">
                  Forgot?
                </a>
              )}
            </div>
            <div className="relative">
              <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] text-base" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] pl-10 pr-4 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] transition-all focus:border-[#0284C7] focus:outline-none focus:ring-4 focus:ring-[#0EA5E9]/10"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0284C7] py-2.5 text-sm font-bold text-[#FFFFFF] shadow-lg shadow-[#0284C7]/20 transition-all hover:bg-[#0369A1] hover:scale-[1.01] active:scale-[0.99]"
          >
            <span>{isSignUp ? "Create Account" : "Sign In"}</span>
            <FiArrowRight className="text-base" />
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default LightAuth;`,
},
{
  id: 16,
  slug: "dark-auth",
  name: "Dark Split Auth",
  category: "auth",
  description: "A modern split-screen dark theme login layout featuring cyan glow branding panel and OAuth support.",
  preview: DarkAuth,
  install: "npm install react-icons framer-motion",
  usage: `<DarkAuth />`,
  code: `import React from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiArrowRight, FiShield } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaApple } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

const DarkAuth = () => {
  return (
    <section className="w-full min-h-screen bg-[#08090D] flex items-stretch text-[#F4F3F1] overflow-hidden">
      {/* Left Visual Panel */}
      <div className="hidden lg:flex w-1/2 bg-[#0B0D12] border-r border-[#23262F] p-12 relative flex-col justify-between overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#06B6D4]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-[#00F5D4] text-[#08090D] flex items-center justify-center font-black">
            M
          </div>
          <span className="font-extrabold tracking-wider text-sm uppercase text-[#F4F3F1]">
            MotionBlocks
          </span>
        </div>

        <div className="relative z-10 space-y-6 max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#06B6D4]/30 bg-[#06B6D4]/10 px-3.5 py-1.5 text-xs font-semibold text-[#00F5D4]"
          >
            <HiSparkles className="text-sm" /> Developer Registry Access
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight leading-tight text-[#F4F3F1]"
          >
            Engineered UI components for modern web apps.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm text-[#8B8D98] leading-relaxed"
          >
            Join thousands of developers building ultra-responsive React interfaces powered by Tailwind CSS and Framer Motion.
          </motion.p>
        </div>

        <div className="relative z-10 flex items-center gap-3 text-xs text-[#5C5F6B]">
          <FiShield className="text-[#00F5D4] text-base" />
          <span>Encrypted Session • Zero-Trust Access</span>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm space-y-6"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#F4F3F1]">Sign in</h2>
            <p className="text-xs sm:text-sm text-[#8B8D98]">
              Choose your authentication provider or use email
            </p>
          </div>

          {/* OAuth Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl border border-[#23262F] bg-[#111319] py-2.5 text-xs font-semibold text-[#F4F3F1] transition-all hover:bg-[#1A1D26] hover:border-[#323644]"
            >
              <FcGoogle className="text-lg" />
              <span className="hidden sm:inline">Google</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl border border-[#23262F] bg-[#111319] py-2.5 text-xs font-semibold text-[#F4F3F1] transition-all hover:bg-[#1A1D26] hover:border-[#323644]"
            >
              <FaGithub className="text-lg text-[#F4F3F1]" />
              <span className="hidden sm:inline">GitHub</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl border border-[#23262F] bg-[#111319] py-2.5 text-xs font-semibold text-[#F4F3F1] transition-all hover:bg-[#1A1D26] hover:border-[#323644]"
            >
              <FaApple className="text-lg text-[#F4F3F1]" />
              <span className="hidden sm:inline">Apple</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-[#23262F]" />
            <span className="absolute bg-[#08090D] px-3 text-[11px] font-semibold uppercase tracking-wider text-[#5C5F6B]">
              Or continue with email
            </span>
          </div>

          {/* Email Form */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#8B8D98]">Work Email</label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5C5F6B] text-base" />
                <input
                  type="email"
                  placeholder="developer@company.com"
                  className="w-full rounded-xl border border-[#23262F] bg-[#111319] pl-10 pr-4 py-2.5 text-sm text-[#F4F3F1] placeholder-[#5C5F6B] transition-all focus:border-[#00F5D4] focus:outline-none focus:ring-1 focus:ring-[#00F5D4]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-[#8B8D98]">Password</label>
                <a href="#reset" className="text-xs font-medium text-[#00F5D4] hover:underline">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5C5F6B] text-base" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-[#23262F] bg-[#111319] pl-10 pr-4 py-2.5 text-sm text-[#F4F3F1] placeholder-[#5C5F6B] transition-all focus:border-[#00F5D4] focus:outline-none focus:ring-1 focus:ring-[#00F5D4]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#00F5D4] py-2.5 text-sm font-bold text-[#08090D] shadow-lg shadow-[#00F5D4]/10 transition-all hover:bg-[#06B6D4] hover:scale-[1.01] active:scale-[0.99]"
            >
              <span>Continue to Dashboard</span>
              <FiArrowRight className="text-base" />
            </button>
          </form>

          <p className="text-center text-xs text-[#8B8D98]">
            Don't have an account?{" "}
            <a href="#signup" className="font-bold text-[#00F5D4] hover:underline">
              Create one now
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default DarkAuth;`,
},


{
 id: 17,
  slug: "funky-404",
  name: "Funky Playful 404 Page",
category: "404-pages",
  description: "A playful, space-themed 404 error page with glowing neon gradients, floating animated elements, and responsive action controls.",
  preview: Funky404,
  install: "npm install react-icons framer-motion",
  usage: `<Funky404 />`,
  code: `import React from "react";
import { motion } from "framer-motion";
import { FiHome, FiRefreshCw, FiCompass, FiSparkles } from "react-icons/fi";

const Funky404 = () => {
  return (
    <section className="relative min-h-screen w-full bg-[#0D0B18] text-[#F3F1FE] flex items-center justify-center p-6 overflow-hidden select-none">
      {/* Background Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF007A]/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-[#7000FF]/25 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-72 h-72 bg-[#00F5D4]/15 rounded-full blur-[110px] pointer-events-none" />

      {/* Floating Funky Decorative Shapes */}
      <motion.div
        animate={{ y: [-12, 12, -12], rotate: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-16 left-12 md:left-24 hidden sm:flex items-center justify-center w-14 h-14 rounded-2xl bg-[#FF007A]/10 border border-[#FF007A]/30 text-[#FF007A] text-xl backdrop-blur-md shadow-lg shadow-[#FF007A]/10"
      >
        <FiSparkles />
      </motion.div>

      <motion.div
        animate={{ y: [10, -10, 10], rotate: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-20 left-16 md:left-32 hidden sm:flex items-center justify-center w-16 h-16 rounded-full bg-[#00F5D4]/10 border border-[#00F5D4]/30 text-[#00F5D4] text-2xl backdrop-blur-md shadow-lg shadow-[#00F5D4]/10"
      >
        <FiCompass />
      </motion.div>

      <motion.div
        animate={{ scale: [0.9, 1.1, 0.9], rotate: [0, 10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-16 md:right-32 hidden sm:flex items-center justify-center w-12 h-12 rounded-xl bg-[#7000FF]/20 border border-[#7000FF]/40 text-[#A855F7] text-lg backdrop-blur-md"
      >
        🛸
      </motion.div>

      {/* Main Card Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "out" }}
        className="relative z-10 max-w-lg w-full text-center space-y-8 bg-[#151226]/80 border border-[#2B2545] p-8 sm:p-12 rounded-3xl backdrop-blur-xl shadow-2xl shadow-[#7000FF]/10"
      >
        {/* Animated Big 404 Visual */}
        <div className="relative flex items-center justify-center gap-2 font-black text-7xl sm:text-9xl tracking-tighter">
          {/* Digit 4 */}
          <motion.span
            animate={{ y: [0, -8, 0], rotate: [-4, 2, -4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-transparent bg-clip-text bg-gradient-to-br from-[#FF007A] via-[#FF5500] to-[#FFB800] drop-shadow-[0_10px_20px_rgba(255,0,122,0.3)]"
          >
            4
          </motion.span>

          {/* Planet Zero */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="relative flex items-center justify-center w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#7000FF] via-[#00F5D4] to-[#FF007A] p-[3px] shadow-lg shadow-[#00F5D4]/20"
          >
            <div className="w-full h-full bg-[#0D0B18] rounded-full flex items-center justify-center relative overflow-hidden">
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#00F5D4] to-[#7000FF] opacity-80 blur-[2px]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent)]" />
            </div>
          </motion.div>

          {/* Digit 4 */}
          <motion.span
            animate={{ y: [0, -8, 0], rotate: [4, -2, 4] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-transparent bg-clip-text bg-gradient-to-br from-[#00F5D4] via-[#3B82F6] to-[#7000FF] drop-shadow-[0_10px_20px_rgba(0,245,212,0.25)]"
          >
            4
          </motion.span>
        </div>

        {/* Text Area */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F3F1FE]">
            Lost in outer cyberspace?
          </h1>
          <p className="text-sm sm:text-base text-[#9E98B9] leading-relaxed max-w-sm mx-auto">
            The page you're looking for was sucked into a black hole or never existed in this dimension.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => (window.location.href = "/")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF007A] to-[#7000FF] px-6 py-3 text-sm font-bold text-[#FFFFFF] shadow-lg shadow-[#FF007A]/25 transition-all hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <FiHome className="text-base" />
            <span>Take Me Home</span>
          </button>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-[#2B2545] bg-[#1C1833] px-6 py-3 text-sm font-semibold text-[#F3F1FE] transition-all hover:bg-[#252042] hover:border-[#3D3560] active:scale-[0.98] cursor-pointer"
          >
            <FiRefreshCw className="text-base text-[#00F5D4]" />
            <span>Try Again</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Funky404;`,
},

{
id: 18,
  slug: "apple-hello",
  name: "Apple Hello Text Effect",
  category: "text-effects",
  description: "A stroke-draw text animation recreating Apple's iconic 'hello' reveal, built with SVG path animation and a replay control.",
  preview: AppleHello,
  install: "npm install framer-motion",
  usage: `<AppleHello />`,
  code: `import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const initialProps = { pathLength: 0, opacity: 0 };
const animateProps = { pathLength: 1, opacity: 1 };

const AppleHelloEnglishEffect = ({ className = "", speed = 1, onAnimationComplete, ...props }) => {
  const calc = (x) => x * speed;

  return (
    <motion.svg
      className={\`h-20 text-white \${className}\`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 638 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="14.8883"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <title>hello</title>

      {/* h1 */}
      <motion.path
        d="M8.69214 166.553C36.2393 151.239 61.3409 131.548 89.8191 98.0295C109.203 75.1488 119.625 49.0228 120.122 31.0026C120.37 17.6036 113.836 7.43883 101.759 7.43883C88.3598 7.43883 79.9231 17.6036 74.7122 40.9363C69.005 66.5793 64.7866 96.0036 54.1166 190.356"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(0.8), ease: "easeInOut", opacity: { duration: 0.4 } }}
      />

      {/* h2, ello */}
      <motion.path
        d="M55.1624 181.135C60.6251 133.114 81.4118 98.0479 107.963 98.0479C123.844 98.0479 133.937 110.703 131.071 128.817C129.457 139.487 127.587 150.405 125.408 163.06C122.869 178.941 130.128 191.348 152.122 191.348C184.197 191.348 219.189 173.523 237.097 145.915C243.198 136.509 245.68 128.073 245.928 119.884C246.176 104.996 237.739 93.8296 222.851 93.8296C203.992 93.8296 189.6 115.17 189.6 142.465C189.6 171.745 205.481 192.341 239.208 192.341C285.066 192.341 335.86 137.292 359.199 75.8585C365.788 58.513 368.26 42.4065 368.26 31.1512C368.26 17.8057 364.042 7.55823 352.131 7.55823C340.469 7.55823 332.777 16.6141 325.829 30.9129C317.688 47.4967 311.667 71.4162 309.203 98.4549C303 166.301 316.896 191.348 349.936 191.348C390 191.348 434.542 135.534 457.286 75.6686C463.803 58.513 466.275 42.4065 466.275 31.1512C466.275 17.8057 462.057 7.55823 450.146 7.55823C438.484 7.55823 430.792 16.6141 423.844 30.9129C415.703 47.4967 409.682 71.4162 407.218 98.4549C401.015 166.301 414.911 191.348 444.416 191.348C473.874 191.348 489.877 165.67 499.471 138.402C508.955 111.447 520.618 94.8221 544.935 94.8221C565.035 94.8221 580.916 109.71 580.916 137.75C580.916 168.768 560.792 192.093 535.362 192.341C512.984 192.589 498.285 174.475 499.774 147.179C501.511 116.907 519.873 94.8221 543.943 94.8221C557.839 94.8221 569.51 100.999 578.682 107.725C603.549 125.866 622.709 114.656 630.047 96.7186"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: calc(2.8), ease: "easeInOut", delay: calc(0.7), opacity: { duration: 0.7, delay: calc(0.7) } }}
        onAnimationComplete={onAnimationComplete}
      />
    </motion.svg>
  );
};

const AppleHello = () => {
  const [key, setKey] = useState(0);

  return (
    <div className="flex flex-col items-center gap-6">
      <AnimatePresence mode="wait">
        <AppleHelloEnglishEffect key={key} />
      </AnimatePresence>

      <button
        onClick={() => setKey((k) => k + 1)}
        className="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs uppercase tracking-widest text-zinc-400 transition hover:border-teal-400/40 hover:text-teal-400"
      >
        Replay
      </button>
    </div>
  );
};

export default AppleHello;`,
},
];





