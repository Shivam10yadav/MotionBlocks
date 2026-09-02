import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiChevronDown, FiCompass, FiLayers, FiZap, FiCheckCircle } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  {
    id: "01",
    year: "2023",
    tag: "Genesis",
    title: "Reimagining Digital Architecture",
    description: "Started with a clear objective: remove interface bloat and build web experiences rooted in spatial clarity and rapid response times.",
    expandedText: "Our core team spent months auditing modern Web vitals. We reduced base bundle sizes by 65% and set strict guidelines to prohibit unnecessary DOM nesting, high-contrast drop shadows, and artificial layout grids.",
    stats: [
      { label: "Core Web Vitals", val: "99/100" },
      { label: "Design System Tokens", val: "120+" }
    ],
    icon: FiCompass
  },
  {
    id: "02",
    year: "2024",
    tag: "Evolution",
    title: "Kinetic Motion Engine",
    description: "Integrated GSAP hardware acceleration into our component workflow, delivering fluid 60fps micro-interactions without performance overhead.",
    expandedText: "By isolating heavy transforms into GPU layers, we created an animation architecture that smoothly tracks user scroll and mouse positions without interrupting UI responsiveness.",
    stats: [
      { label: "Target Framerate", val: "60 FPS" },
      { label: "Interaction Latency", val: "< 16ms" }
    ],
    icon: FiZap
  },
  {
    id: "03",
    year: "2025",
    tag: "Scale",
    title: "Adaptive Interface Systems",
    description: "Expanded our design language into scalable UI systems relied upon by modern software teams for responsive, light-mode experiences.",
    expandedText: "Developed reusable layout primitives, light-theme token palettes, and fluid typography engines that adjust automatically across viewport sizes.",
    stats: [
      { label: "Active Deployments", val: "400+" },
      { label: "Component Libraries", val: "3 Core" }
    ],
    icon: FiLayers
  },
  {
    id: "04",
    year: "2026",
    tag: "Present",
    title: "Essentialist Craftsmanship",
    description: "Continuing to push web standards by pairing strict typographic systems with natural ambient lighting and intuitive interaction patterns.",
    expandedText: "Our current focus centers on ambient lighting algorithms, gesture-driven canvas navigations, and human-first UI patterns built specifically for web applications.",
    stats: [
      { label: "User Satisfaction", val: "99.4%" },
      { label: "Design Iterations", val: "Daily" }
    ],
    icon: FiCheckCircle
  }
];

export default function TimelineAboutSection() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  useEffect(() => {
    if (!lineRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#F9F6F0] text-slate-900 py-24 px-8 md:px-16 overflow-hidden select-none"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 pb-8 border-b border-slate-200">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-800 font-semibold block mb-3">
              [ 02 // OUR JOURNEY ]
            </span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-slate-950">
              Evolution through <span className="font-serif italic text-emerald-900">restraint</span>.
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-xs mt-4 md:mt-0 font-normal leading-relaxed">
            Click on any milestone card to expand full technical specs and context.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 md:pl-12">
          {/* Static Background Line */}
          <div className="absolute left-2 md:left-4 top-2 bottom-2 w-[2px] bg-slate-200" />

          {/* GSAP Animated Fill Line */}
          <div
            ref={lineRef}
            className="absolute left-2 md:left-4 top-2 bottom-2 w-[2px] bg-emerald-700 origin-top"
          />

          {/* Timeline Items */}
          <div className="space-y-12">
            {MILESTONES.map((item, index) => {
              const Icon = item.icon;
              const isExpanded = expandedId === item.id;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex flex-col md:flex-row md:items-start gap-6 group"
                >
                  {/* Timeline Node Icon */}
                  <div
                    onClick={() => toggleExpand(item.id)}
                    className={`absolute -left-[31px] md:-left-[55px] top-1 w-8 h-8 rounded-full cursor-pointer flex items-center justify-center transition-colors duration-300 z-10 ${
                      isExpanded
                        ? 'bg-emerald-900 text-slate-50 border border-emerald-900'
                        : 'bg-[#F8F9FA] border border-slate-300 text-slate-700 group-hover:border-emerald-800 group-hover:bg-emerald-800 group-hover:text-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Year & Tag */}
                  <div className="md:w-32 shrink-0 pt-1">
                    <span className="font-mono text-2xl font-medium text-slate-950 block">
                      {item.year}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider text-emerald-800 font-medium block mt-0.5">
                      {item.tag}
                    </span>
                  </div>

                  {/* Expandable Card Container */}
                  <motion.div
                    layout
                    onClick={() => toggleExpand(item.id)}
                    className={`flex-1 p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                      isExpanded
                        ? 'bg-white border-emerald-800/40 shadow-md'
                        : 'bg-white/80 hover:bg-white border-slate-200/80 hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-medium text-slate-950 tracking-tight pr-4">
                        {item.title}
                      </h3>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-slate-400 group-hover:text-slate-900 shrink-0 mt-1"
                      >
                        <FiChevronDown className="w-5 h-5" />
                      </motion.div>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed font-normal mt-2">
                      {item.description}
                    </p>

                    {/* Expandable Content Area */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden border-t border-slate-100 mt-6 pt-6"
                        >
                          <p className="text-sm text-slate-700 leading-relaxed font-normal mb-6">
                            {item.expandedText}
                          </p>

                          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                            {item.stats.map((stat, i) => (
                              <div key={i}>
                                <span className="font-mono text-xs uppercase text-slate-400 block">
                                  {stat.label}
                                </span>
                                <span className="font-mono text-base font-semibold text-slate-900 block mt-0.5">
                                  {stat.val}
                                </span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>

    // forced chnage comment 
  );
}