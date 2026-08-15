import React from "react";
import { motion } from "framer-motion";

export default function LightMarquee() {
  const logos = [
    { name: "Apex", logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80" },
    { name: "Vortex", logo: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=120&q=80" },
    { name: "Sphere", logo: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=120&q=80" },
    { name: "Prism", logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80" },
    { name: "Lumina", logo: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=120&q=80" },
    { name: "Nova", logo: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=120&q=80" },
  ];

  // Duplicate array to guarantee seamless looping
  const marqueeLogos = [...logos, ...logos, ...logos];

  return (
    <section className="relative w-full overflow-hidden bg-[#FAF7F2] py-12 border-y border-[#E8E2D8]">
      {/* Side Fade Gradients */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#FAF7F2] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#FAF7F2] to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto mb-8 text-center">
        <p className="text-xs uppercase tracking-widest font-semibold text-[#A8A29E]">
          Trusted by Industry Leaders
        </p>
      </div>

      <div className="flex w-full overflow-hidden select-none">
        <motion.div
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex flex-shrink-0 items-center gap-12 md:gap-16 pr-12"
        >
          {marqueeLogos.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-[#F3ECE0] border border-[#E8E2D8] hover:border-[#D97706] transition-colors cursor-pointer group"
            >
              <img
                src={item.logo}
                alt={item.name}
                className="w-7 h-7 rounded-lg object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
              <span className="text-sm font-medium text-[#57534E] group-hover:text-[#2D2A26] transition-colors">
                {item.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}