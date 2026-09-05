import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ClickRipple() {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };

    setRipples((prev) => [...prev, newRipple]);
  };

  const removeRipple = (id) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div
      onClick={handleClick}
      className="relative w-full h-64 bg-white border border-slate-800 rounded-2xl overflow-hidden cursor-pointer flex items-center justify-center select-none"
    >
      <p className="text-black text-sm font-medium pointer-events-none">
        Click anywhere to generate ripples
      </p>

      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            initial={{ scale: 0, opacity: 0.75 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            onAnimationComplete={() => removeRipple(r.id)}
            style={{
              left: r.x - 25,
              top: r.y - 25,
            }}
            className="absolute w-12 h-12 rounded-full border-2 border-indigo-500 pointer-events-none"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}