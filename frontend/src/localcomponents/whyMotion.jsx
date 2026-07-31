import React from 'react';
import { motion } from 'framer-motion';
import { Copy, Sliders, ShieldCheck, Code2 } from 'lucide-react';

const FEATURES = [
  {
    id: 'copy-paste',
    step: '01',
    title: 'Copy & Paste Components',
    description: 'No npm packages, locks, or hidden bloat. Grab component source files and plug them straight into your codebase.',
    icon: Copy,
  },
  {
    id: 'customizable',
    step: '02',
    title: 'Fully Customizable',
    description: 'Built on standard Tailwind utilities so you can tweak animations, colors, and layouts instantly.',
    icon: Sliders,
  },
  {
    id: 'production-ready',
    step: '03',
    title: 'Production Ready',
    description: 'Fully accessible, keyboard navigable, and optimized for smooth 60fps Framer Motion transitions.',
    icon: ShieldCheck,
  },
  {
    id: 'react-tailwind',
    step: '04',
    title: 'React + Tailwind CSS',
    description: 'Designed specifically for modern React app router architectures and Next.js projects.',
    icon: Code2,
  },
];

export default function WhyMotions() {
  return (
    <section className="bg-[#0D1117] text-[#F8FAFC] py-24 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-start mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]" />
            Why MotionBlocks
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F8FAFC]">
            Built for Developers
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl leading-relaxed">
            Engineered to streamline your workflow without sacrificing design fidelity or flexibility.
          </p>
        </div>

        {/* Vertical Stack List */}
        <div className="flex flex-col gap-4">
          {FEATURES.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className="group p-6 sm:p-8 rounded-2xl bg-[#161B22] border border-[#30363D] hover:border-[#06B6D4]/60 hover:shadow-[0_0_25px_rgba(6,182,212,0.10)] transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
              >
                <div className="flex items-start sm:items-center gap-5">
                  <span className="text-xs font-mono text-[#06B6D4] bg-[#06B6D4]/10 border border-[#06B6D4]/20 px-2.5 py-1 rounded-md shrink-0">
                    {item.step}
                  </span>
                  
                  <div className="p-3 rounded-xl bg-[#0D1117] border border-[#30363D] text-[#F8FAFC] group-hover:border-[#06B6D4]/40 group-hover:text-[#06B6D4] shrink-0 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-[#F8FAFC] group-hover:text-[#06B6D4] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#94A3B8] mt-1 max-w-xl leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}