import React, { useState, useEffect } from 'react';
import { motion, animate } from 'framer-motion';
import { FiCpu } from 'react-icons/fi';

export default function DarkProgress({ title = "Neural Pipeline" }) {
  const [currentPercent, setCurrentPercent] = useState(0);

  useEffect(() => {
    // 0.5s initial delay
    const timer = setTimeout(() => {
      const animation = animate(0, 100, {
        duration: 6, // Continuous slow creeping to 100%
        ease: "easeInOut",
        onUpdate: (latest) => setCurrentPercent(Math.round(latest)),
      });

      return () => animation.stop();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-md p-6 rounded-2xl bg-[#061A12] backdrop-blur-md border border-slate-800 shadow-2xl shadow-cyan-950/20">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <FiCpu className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-medium text-slate-200">{title}</span>
        </div>
        <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
          {currentPercent}%
        </span>
      </div>

      <div className="relative h-3 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 relative shadow-[0_0_12px_rgba(34,211,238,0.5)]"
          initial={{ width: "0%" }}
          animate={{ width: `${currentPercent}%` }}
          transition={{ ease: "linear" }}
        >
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full shadow-[0_0_8px_#ffffff]" />
          <motion.div
            className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:16px_16px]"
            animate={{ backgroundPosition: ['0px 0px', '32px 0px'] }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          />
        </motion.div>
      </div>
    </div>
  );
}