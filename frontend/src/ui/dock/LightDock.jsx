import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Search, Folder, Mail, Star, CircleUserRound } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'search', label: 'Search', icon: Search },
  { id: 'projects', label: 'Projects', icon: Folder },
  { id: 'saved', label: 'Favorites', icon: Star },
  { id: 'mail', label: 'Inbox', icon: Mail },
  { id: 'profile', label: 'Profile', icon: CircleUserRound },
];

export default function LightDock() {
  const [activeId, setActiveId] = useState('home');
  const [hoveredId, setHoveredId] = useState(null);

  return (
<div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
    <div
        onMouseLeave={() => setHoveredId(null)}
        className="flex items-center gap-3 px-4 py-3 rounded-full bg-white/70 backdrop-blur-xl border border-white/90 shadow-[0_8px_32px_0_rgba(31,38,135,0.08)] shadow-slate-200/40"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;
          const isHovered = hoveredId === item.id;

          return (
            <div key={item.id} className="relative flex flex-col items-center">
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.92 }}
                    animate={{ opacity: 1, y: -44, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.92 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                    className="absolute bottom-full whitespace-nowrap pointer-events-none px-2.5 py-1 rounded-lg bg-slate-900/85 text-white text-[11px] font-medium tracking-wide shadow-lg"
                  >
                    {item.label}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-1.5 h-1.5 -mt-[3px] rotate-45 bg-slate-900/85" />
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                onClick={() => setActiveId(item.id)}
                onMouseEnter={() => setHoveredId(item.id)}
                animate={{ y: isHovered ? -10 : 0, scale: isHovered ? 1.25 : 1 }}
                transition={{ type: 'spring', stiffness: 420, damping: 22, mass: 0.6 }}
                style={{ originY: 1 }}
                className="relative flex items-center justify-center w-12 h-12 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/70"
              >
                <motion.div
                  animate={{
                    opacity: isActive || isHovered ? 1 : 0,
                    scale: isActive || isHovered ? 1 : 0.85,
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  className={`absolute inset-0 rounded-2xl ${
                    isActive
                      ? 'bg-gradient-to-b from-indigo-500 to-violet-600 shadow-md shadow-indigo-500/30'
                      : 'bg-slate-900/[0.06]'
                  }`}
                />
                <Icon
                  className={`relative z-10 w-5 h-5 transition-colors duration-200 ${
                    isActive ? 'text-white' : 'text-slate-700'
                  }`}
                  strokeWidth={2}
                />
              </motion.button>

              <motion.div
                animate={{
                  opacity: isActive ? 1 : 0,
                  y: isActive ? (isHovered ? -8 : -2) : 0,
                }}
                transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-indigo-600"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}