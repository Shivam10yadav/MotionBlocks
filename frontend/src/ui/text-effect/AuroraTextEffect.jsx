import React, { useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

export const AuroraTextEffect = ({
  text = "QUANTUM FLUX",
  subtitle = "Advanced motion components. Premium visual experiences.",
}) => {
  // Mouse position values for 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid mouse reaction
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
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = (e.clientX - rect.left) / width - 0.5;
    const mouseYPos = (e.clientY - rect.top) / height - 0.5;

    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Letter Stagger Animation Variants
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
      {/* 1. Ambient Background Glows */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-amber-500/20 via-indigo-500/20 to-blue-500/20 blur-[120px]" />

      {/* 2. Interactive Tilt Container */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* 3. Main Text Heading */}
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
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        {/* 4. Subtitle Fade-In */}
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

export default AuroraTextEffect;