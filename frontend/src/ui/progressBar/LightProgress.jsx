import React, { useState, useEffect } from 'react';
import { motion, animate } from 'framer-motion';

export default function LightProgress({ title = "Uploading Files" }) {
  const [currentPercent, setCurrentPercent] = useState(0);

  useEffect(() => {
    // 0.5s initial delay before starting fill
    const timer = setTimeout(() => {
      const animation = animate(0, 100, {
        duration: 6, // Total duration to reach 100%
        ease: "easeInOut", // Smooth slow start and slow landing
        onUpdate: (latest) => setCurrentPercent(Math.round(latest)),
      });

      return () => animation.stop();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-md p-6 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-sm font-semibold text-slate-800">{title}</h4>
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100/80">
          {currentPercent}%
        </span>
      </div>

      <div className="relative h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative"
          initial={{ width: "0%" }}
          animate={{ width: `${currentPercent}%` }}
          transition={{ ease: "linear" }}
        >
          {/* Continuous Shimmer Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
          />
        </motion.div>
      </div>
    </div>
  );
}