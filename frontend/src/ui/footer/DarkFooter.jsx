import React from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

export default function DarkFooter() {
  const categories = [
    { name: "Product", items: ["Overview", "Features", "Integrations", "Pricing", "Releases"] },
    { name: "Company", items: ["About", "Careers", "Press", "News", "Media Kit"] },
    { name: "Resources", items: ["Blog", "Newsletter", "Events", "Help Center", "Support"] },
    { name: "Legal", items: ["Terms", "Privacy", "Cookies", "Licenses", "Settings"] },
  ];

  return (
    <footer className="relative bg-[#0D0F12] text-[#F3F4F6] px-6 py-20 md:px-16 lg:px-24 overflow-hidden border-t border-white/10">
      {/* Animated Ambient Light Orbs */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-gradient-to-r from-violet-600/30 to-indigo-600/30 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-10 w-[400px] h-[300px] bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top CTA Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 md:p-12 rounded-2xl bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-20"
        >
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-3">
              <HiSparkles className="w-3.5 h-3.5" /> Next Gen Platform
            </span>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">Ready to build something iconic?</h3>
            <p className="text-sm text-[#9CA3AF] mt-1">Get started with our tools or talk to our engineering team.</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full md:w-auto px-6 py-3 rounded-xl bg-white text-black font-medium text-sm hover:bg-gray-200 transition-colors"
            >
              Get Started
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full md:w-auto px-6 py-3 rounded-xl bg-white/5 border border-white/10 font-medium text-sm hover:bg-white/10 transition-colors"
            >
              Contact Sales
            </motion.button>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 pb-16">
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-violet-500 flex items-center justify-center font-bold text-xs text-black">N</div>
              <span className="font-semibold tracking-wider text-sm">NEXUS</span>
            </div>
            <p className="text-xs text-[#9CA3AF] leading-relaxed">
              Empowering developer teams worldwide with ultra-fast cloud primitives.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {[FiTwitter, FiGithub, FiLinkedin].map((Icon, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#9CA3AF] hover:text-white hover:bg-white/10 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {categories.map((col, idx) => (
            <motion.div
              key={col.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="space-y-3"
            >
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">{col.name}</h4>
              <ul className="space-y-2">
                {col.items.map((item) => (
                  <li key={item}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 3 }}
                      className="text-xs text-[#9CA3AF] hover:text-white transition-colors flex items-center gap-1 group"
                    >
                      {item}
                      <FiArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-violet-400" />
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs text-[#6B7280] gap-4">
          <p>© {new Date().getFullYear()} Nexus Technologies Inc.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#9CA3AF] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#9CA3AF] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#9CA3AF] transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}