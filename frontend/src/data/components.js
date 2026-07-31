import GlowButton from "../ui/buttons/GlowButton";
import GradientButton from "../ui/buttons/GradientButton";
import CtaSection from "../ui/cta/CTA-1";
import AuroraTextEffect from "../ui/text-effect/AuroraTextEffect";

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
];