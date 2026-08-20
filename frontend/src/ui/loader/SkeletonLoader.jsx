import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineArrowPath,
  HiOutlineUser,
  HiOutlineFolder,
  HiOutlineCalendar,
  HiOutlineEye,
} from "react-icons/hi2";

export default function SkeletonLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <div className="flex flex-col items-center justify-center gap-5 py-4 font-sans">
      {/* 1. Fixed width container prevents squeezing on the blueprint grid */}
      <div className="w-[320px] rounded-[28px] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/50 text-left">
        <div className="space-y-3.5">
          
          {/* Top Banner */}
          <div className="relative h-24 w-full overflow-hidden rounded-2xl bg-slate-100">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="banner-skel"
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute inset-0 bg-slate-200/80"
                >
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
                </motion.div>
              ) : (
                <motion.div
                  key="banner-real"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                />
              )}
            </AnimatePresence>
          </div>

          {/* Avatar & Title Block */}
          <div className="-mt-9 flex flex-col items-start gap-2 px-1">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border-4 border-white shadow-sm bg-slate-100">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="avatar-skel"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="absolute inset-0 bg-slate-200/80"
                  >
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="avatar-real"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex h-full w-full items-center justify-center bg-slate-900 text-white"
                  >
                    <HiOutlineUser className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Name / Subtitle Pill */}
            <div className="relative h-5 w-28 overflow-hidden rounded-full bg-slate-100">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="name-skel"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="absolute inset-0 bg-slate-200/80"
                  >
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="name-real"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex h-full w-full items-center justify-center bg-slate-100 text-[11px] font-semibold text-slate-700"
                  >
                    Alex Morgan
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Middle Description Banner */}
          <div className="relative h-16 w-full overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/60">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="mid-skel"
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute inset-0 bg-slate-200/80"
                >
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
                </motion.div>
              ) : (
                <motion.div
                  key="mid-real"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3"
                >
                  <p className="text-xs font-semibold text-slate-800">Product Designer</p>
                  <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
                    Designing scalable UI systems & micro-interactions.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 3-Column Stats Grid */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Projects", val: "24", icon: HiOutlineFolder, color: "text-indigo-600" },
              { label: "Years", val: "5+", icon: HiOutlineCalendar, color: "text-purple-600" },
              { label: "Views", val: "12k", icon: HiOutlineEye, color: "text-pink-600" },
            ].map((stat, i) => (
              <div
                key={i}
                className="relative h-12 w-full overflow-hidden rounded-xl border border-slate-100 bg-slate-50"
              >
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key={`grid-skel-${i}`}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="absolute inset-0 bg-slate-200/80"
                    >
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`grid-real-${i}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex h-full flex-col items-center justify-center text-center p-1"
                    >
                      <stat.icon className={`h-3 w-3 ${stat.color}`} />
                      <span className="text-[9px] text-slate-400 font-medium">{stat.label}</span>
                      <span className="text-[11px] font-bold text-slate-800">{stat.val}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Bottom Button */}
          <div className="relative h-9 w-full overflow-hidden rounded-full">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="btn-skel"
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute inset-0 bg-slate-200/80"
                >
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
                </motion.div>
              ) : (
                <motion.button
                  key="btn-real"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full w-full bg-slate-900 text-xs font-semibold text-white transition hover:bg-slate-800 active:scale-95"
                >
                  View Profile
                </motion.button>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Reload Button */}
      <button
        onClick={() => setIsLoading(true)}
        disabled={isLoading}
        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-95 disabled:opacity-50"
      >
        <HiOutlineArrowPath className={`h-3.5 w-3.5 ${isLoading ? "animate-spin text-indigo-600" : ""}`} />
        <span>{isLoading ? "Loading..." : "Reload"}</span>
      </button>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}