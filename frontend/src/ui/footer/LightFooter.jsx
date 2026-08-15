import React from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiSend, FiHeart } from "react-icons/fi";

export default function LightFooter() {
  const footerLinks = [
    { title: "Navigation", links: ["Home", "About", "Services", "Work", "Contact"] },
    { title: "Services", links: ["UI/UX Design", "Development", "Branding", "Strategy", "Copywriting"] },
    { title: "Socials", links: ["Twitter / X", "LinkedIn", "GitHub", "Instagram", "Dribbble"] },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#FAF7F2] text-[#2D2A26] px-6 py-16 md:px-16 lg:px-24 rounded-t-3xl border-t border-[#E8E2D8]">
      {/* Subtle Warm Background Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#F3E5D8] blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#E8E2D8]">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-serif font-medium tracking-tight">Studio.</h2>
              <p className="mt-3 text-[#78716C] max-w-sm text-sm leading-relaxed">
                Crafting meaningful digital experiences with warmth, precision, and purpose.
              </p>
            </motion.div>

            {/* Interactive Input */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative max-w-sm"
            >
              <input
                type="email"
                placeholder="Join our newsletter"
                className="w-full bg-[#F3ECE0] text-[#2D2A26] placeholder-[#A8A29E] px-4 py-3 pr-12 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706] transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-[#2D2A26] text-[#FAF7F2] rounded-full flex items-center justify-center hover:bg-[#D97706] transition-colors"
              >
                <FiSend className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </div>

          {/* Links Column */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            {footerLinks.map((col, idx) => (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * (idx + 1) }}
                className="space-y-4"
              >
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#A8A29E]">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <motion.a
                        href="#"
                        whileHover={{ x: 4 }}
                        className="text-sm text-[#57534E] hover:text-[#2D2A26] transition-colors inline-flex items-center gap-1 group"
                      >
                        {link}
                        <FiArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Big Brand Text */}
        <div className="py-8 overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[12vw] font-serif font-medium leading-none text-[#E8E2D8] select-none text-center"
          >
            CREATIVE
          </motion.h1>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-[#E8E2D8] text-xs text-[#78716C] gap-4">
          <p>© {new Date().getFullYear()} Studio Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <FiHeart className="w-3.5 h-3.5 fill-red-400 text-red-400" /> for creators everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}