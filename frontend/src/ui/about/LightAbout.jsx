import React from "react";
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
    <section className="w-full min-h-screen py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] text-[#0F172A] flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-6xl space-y-10 sm:space-y-12 lg:space-y-16">
        {/* Top Header & Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-3 sm:space-y-4"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#0EA5E9]/20 bg-[#0EA5E9]/10 px-3 sm:px-3.5 py-1 sm:py-1.5 text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
              <Rocket size={14} /> Who We Are
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-tight sm:leading-snug">
              Crafting digital tools that power the next web.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 space-y-3 sm:space-y-4"
          >
            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
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

        {/* Highlight Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
                className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 space-y-3 sm:space-y-4"
              >
                <div className="h-10 w-10 rounded-xl bg-[#0EA5E9]/10 text-[#0284C7] flex items-center justify-center shrink-0">
                  <Icon size={20} />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Counter Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#0F172A] text-[#FFFFFF] rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 lg:divide-x divide-[#334155]/50"
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`space-y-1 ${
                idx > 0 ? "pt-6 sm:pt-0 lg:pl-8" : ""
              }`}
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#38BDF8]">
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

export default LightAbout;