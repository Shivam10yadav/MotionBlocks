import React from 'react';
import { motion } from 'framer-motion';

export const GradientButton = ({ children, onClick, className = '' }) => {
  return (
    <div className="relative group inline-block">
      {/* 1. Animated Glow Background */}
      <motion.div
        className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-75 blur-md group-hover:opacity-100 transition duration-500 group-hover:duration-200"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundSize: '200% 200%',
        }}
      />

      {/* 2. Main Interactive Button */}
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`relative flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gray-950 text-white font-medium text-sm tracking-wide shadow-2xl overflow-hidden cursor-pointer ${className}`}
      >
        {/* Animated Gradient Border Overlay */}
        <motion.div
          className="absolute inset-0 rounded-xl p-[1px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 -z-10"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            backgroundSize: '200% 200%',
          }}
        />

        {/* Shimmer Light Effect */}
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
          animate={{
            translateX: ['-100%', '200%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
            ease: 'easeInOut',
          }}
        />

        {/* Button Content */}
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </motion.button>
    </div>
  );
};

export default GradientButton;