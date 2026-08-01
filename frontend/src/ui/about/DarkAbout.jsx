import React from "react";
import { motion } from "framer-motion";
import { Compass, Sparkles, CheckCircle2 } from "lucide-react";

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
    <section className="w-full min-h-screen bg-[#08090D] py-20 px-4 sm:px-6 lg:px-8 text-[#F4F3F1] flex items-center justify-center relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#06B6D4]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-6xl space-y-16 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#06B6D4]/30 bg-[#06B6D4]/10 px-3.5 py-1.5 text-xs font-medium uppercase tracking-widest text-[#00F5D4]"
          >
            <Compass size={14} /> Our Philosophy
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F4F3F1]"
          >
            Built for developers who care about details.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-[#8B8D98] leading-relaxed"
          >
            We eliminate the friction between complex motion design and production code, delivering interfaces that feel deliberate and ultra-responsive.
          </motion.p>
        </div>

        {/* Content Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Feature Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 bg-[#111319] border border-[#23262F] rounded-3xl p-8 space-y-6 relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 h-32 w-32 bg-[#06B6D4]/5 rounded-bl-full transition-all group-hover:scale-125" />
            <div className="h-12 w-12 rounded-2xl bg-[#1A1D26] border border-[#23262F] text-[#00F5D4] flex items-center justify-center">
              <Sparkles size={24} />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-[#F4F3F1]">Craftsmanship First</h3>
              <p className="text-sm text-[#8B8D98] leading-relaxed">
                We don't do cookie-cutter components. Each element in our registry is hand-built with React, Tailwind CSS, and Framer Motion.
              </p>
            </div>
            <div className="pt-4 border-t border-[#23262F] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#5C5F6B]">
              <span>Est. 2026</span>
              <span className="text-[#00F5D4]">MotionBlocks Suite</span>
            </div>
          </motion.div>

          {/* Right Values List */}
          <div className="lg:col-span-7 space-y-4">
            {values.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-[#0B0D12] border border-[#23262F] hover:border-[#323644] rounded-2xl p-6 transition-colors duration-300 flex items-start gap-4"
              >
                <div className="mt-1 text-[#00F5D4] shrink-0">
                  <CheckCircle2 size={20} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-[#F4F3F1]">{val.title}</h4>
                  <p className="text-sm text-[#8B8D98] leading-relaxed">{val.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DarkAbout;