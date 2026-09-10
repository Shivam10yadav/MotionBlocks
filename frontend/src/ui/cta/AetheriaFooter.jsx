import React from 'react';
import { motion } from 'framer-motion';
import { 
  RiFacebookFill, 
  RiInstagramLine, 
  RiLinkedinFill, 
  RiBehanceFill 
} from 'react-icons/ri';

export default function AetheriaFooter() {
  const footerSections = [
    {
      title: "NAVIGATION",
      links: ["Overview", "Our Mission", "Platform", "Clinical Trials", "Get in Touch"]
    },
    {
      title: "PLATFORM",
      links: ["GeneEdit Pro", "CellSyn", "BioMatrix", "ProteoFold", "SequenX"]
    },
    {
      title: "RESOURCES",
      links: ["Whitepapers", "Case Studies", "Press Kit", "System Status", "Developer Docs"]
    }
  ];

  // Animation variants for popup effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 14,
      },
    },
  };

  return (
    <footer className="w-full h-screen bg-[#DED6E8] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans relative overflow-hidden">
      
      {/* Background Floral Accents */}
      <div className="absolute top-0 right-0 w-80 sm:w-[500px] h-80 sm:h-[500px] opacity-60 pointer-events-none translate-x-1/4 -translate-y-1/4">
        <svg viewBox="0 0 200 200" className="w-full h-full fill-[#815EA0]/30 text-[#4C286A]/40">
          <circle cx="100" cy="100" r="80" />
          <path d="M100 20 C120 60, 180 80, 180 100 C180 120, 120 140, 100 180 C80 140, 20 120, 20 100 C20 80, 80 60, 100 20 Z" />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 w-80 sm:w-[500px] h-80 sm:h-[500px] opacity-60 pointer-events-none -translate-x-1/4 translate-y-1/4">
        <svg viewBox="0 0 200 200" className="w-full h-full fill-[#815EA0]/30 text-[#4C286A]/40">
          <circle cx="100" cy="100" r="80" />
          <path d="M100 20 C120 60, 180 80, 180 100 C180 120, 120 140, 100 180 C80 140, 20 120, 20 100 C20 80, 80 60, 100 20 Z" />
        </svg>
      </div>

      {/* Main Container - Single Viewport Constraint (max-h-[90vh] & max-w-[1400px]) */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="w-full max-w-[1400px] max-h-[90vh] bg-[#E2EFE0] rounded-3xl px-8 sm:px-14 py-8 sm:py-10 shadow-xl relative z-10 text-[#1B2918] flex flex-col justify-between overflow-hidden"
      >
        
        {/* Top Grid: Columns & CTA Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 pb-6 sm:pb-8 border-b border-black/10">
          
          {/* Navigation Columns */}
          {footerSections.map((section, idx) => (
            <motion.div key={idx} variants={itemVariants} className="flex flex-col gap-2">
              <span className="text-[10px] font-mono tracking-widest text-black/50 uppercase font-bold">
                {section.title}
              </span>
              <ul className="flex flex-col gap-1.5">
                {section.links.map((link, linkIdx) => (
                  <motion.li key={linkIdx} variants={itemVariants}>
                    <a 
                      href="#" 
                      className="text-xs sm:text-sm font-medium text-black/80 hover:text-black transition-colors inline-block"
                    >
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact & Social Section */}
          <motion.div variants={itemVariants} className="flex flex-col justify-between col-span-2 md:col-span-1 gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono tracking-widest text-black/50 uppercase font-bold">
                SAY HELLO
              </span>
              <a 
                href="mailto:contact@aetheria.bio" 
                className="text-lg sm:text-xl font-serif underline decoration-1 underline-offset-4 text-black hover:opacity-80 transition-opacity font-medium tracking-tight"
              >
                contact@aetheria.bio
              </a>
            </div>

            {/* Legal & Social Icons */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2.5 text-[9px] font-mono uppercase tracking-wider text-black/50">
                <a href="#" className="hover:text-black">PRIVACY POLICY</a>
                <span>•</span>
                <a href="#" className="hover:text-black">TERMS OF USE</a>
                <span>•</span>
                <span>© 2026</span>
              </div>

              <div className="flex items-center gap-2">
                {[
                  { Icon: RiFacebookFill, href: "#" },
                  { Icon: RiInstagramLine, href: "#" },
                  { Icon: RiLinkedinFill, href: "#" },
                  { Icon: RiBehanceFill, href: "#" },
                ].map(({ Icon, href }, iconIdx) => (
                  <motion.a
                    key={iconIdx}
                    href={href}
                    variants={itemVariants}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-7 h-7 rounded-full bg-black/5 flex items-center justify-center text-black/70 hover:bg-black hover:text-white transition-colors text-xs"
                  >
                    <Icon />
                  </motion.a>
                ))}
              </div>
            </div>

          </motion.div>

        </div>

        {/* Bottom Horizontal Branding Row */}
        <div className="pt-4 sm:pt-6 flex items-center justify-between gap-4">
          <motion.h1 
            variants={itemVariants}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif tracking-tighter text-black leading-none font-normal"
          >
            aetheria
          </motion.h1>

          {/* Compact Bio Motif */}
          <motion.div variants={itemVariants} className="flex flex-col gap-1 text-black shrink-0">
            <div className="w-8 sm:w-10 h-12 sm:h-16 flex flex-col items-center justify-between">
              <div className="w-3 sm:w-3.5 h-3 sm:h-3.5 bg-black rounded-full" />
              <div className="w-8 sm:w-10 h-1 bg-black rounded-full" />
              <div className="w-3 sm:w-3.5 h-3 sm:h-3.5 bg-black rounded-full" />
              <div className="w-8 sm:w-10 h-1 bg-black rounded-full" />
              <div className="w-3 sm:w-3.5 h-3 sm:h-3.5 bg-black rounded-full" />
            </div>
          </motion.div>
        </div>

      </motion.div>
    </footer>
  );
}