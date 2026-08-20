import React from "react";
import { motion } from "framer-motion";
import {
  HiOutlineBriefcase,
  HiOutlineUserGroup,
  HiOutlineCodeBracketSquare,
  HiOutlineStar,
} from "react-icons/hi2";

const STATS = [
  {
    id: 1,
    label: "Projects Completed",
    value: "142+",
    change: "+12% this month",
    icon: HiOutlineBriefcase,
  },
  {
    id: 2,
    label: "Active Clients",
    value: "48",
    change: "+5 new clients",
    icon: HiOutlineUserGroup,
  },
  {
    id: 3,
    label: "Lines of Code",
    value: "350k+",
    change: "Clean architecture",
    icon: HiOutlineCodeBracketSquare,
  },
  {
    id: 4,
    label: "Client Rating",
    value: "4.9/5",
    change: "From 90+ reviews",
    icon: HiOutlineStar,
  },
];

export default function StatsCard({
  tagline = "Performance Overview",
  title = "Impact in Numbers",
  stats = STATS,
}) {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-amber-200/80 bg-gradient-to-br from-amber-100/90 via-orange-100/70 to-amber-200/80 p-6 md:p-10 font-sans text-slate-900 shadow-xl text-left">
      {/* Background Lighting */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-amber-400/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-orange-400/30 blur-3xl" />

      {/* Header */}
      <div className="relative z-10 mb-8 border-b border-amber-900/10 pb-5">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-900/70">
          {tagline}
        </span>
        <h2 className="mt-1 font-serif text-3xl font-normal text-slate-900 md:text-4xl">
          {title}
        </h2>
      </div>

      {/* 4-Stat Grid */}
      <div className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.id || idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-amber-900/10 bg-white/60 p-5 shadow-sm backdrop-blur-md transition hover:bg-white/80"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                  {stat.label}
                </span>
                {Icon && (
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-900/5 text-amber-900">
                    <Icon className="h-5 w-5" />
                  </div>
                )}
              </div>

              {/* Number Slide-Down Container */}
              <div className="mt-3 overflow-hidden py-1">
                <motion.div
                  initial={{ y: "-100%", opacity: 0 }}
                  whileInView={{ y: "0%", opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.1 + 0.1,
                    ease: [0.16, 1, 0.3, 1], // Smooth, fast drop ease
                  }}
                  className="font-serif text-3xl font-bold tracking-tight text-slate-900 md:text-4xl"
                >
                  {stat.value}
                </motion.div>
              </div>

              {/* Bottom Meta */}
              {stat.change && (
                <div className="mt-2 flex items-center justify-between border-t border-amber-900/5 pt-2.5 text-[11px] font-medium text-amber-900/70">
                  <span>{stat.change}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}