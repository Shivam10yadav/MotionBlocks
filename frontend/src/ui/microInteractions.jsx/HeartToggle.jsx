import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function HeartToggle() {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      onClick={() => setIsLiked(!isLiked)}
      className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-slate-400 hover:text-white transition-colors"
    >
      <motion.svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill={isLiked ? '#EF4444' : 'none'}
        stroke={isLiked ? '#EF4444' : 'currentColor'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{
          scale: isLiked ? [1, 1.4, 1] : 1,
          rotate: isLiked ? [0, -15, 15, 0] : 0,
        }}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </motion.svg>
    </motion.button>
  );
}