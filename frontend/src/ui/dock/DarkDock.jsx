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

export default function DarkDock() {
  const [activeId, setActiveId] = useState('home');
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
      <div
        onMouseLeave={() => setHoveredId(null)}
        className="relative flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#070A10]/90 backdrop-blur-xl border border-cyan-400/10 shadow-[0_0_40px_-8px_rgba(34,211,238,0.15),0_8px_32px_0_rgba(0,0,0,0.5)]"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;
          const isHovered = hoveredId === item.id;

          return (
            <div key={item.id} className="relative flex flex-col items-center">
              {/* Tooltip: scales in from center, no arrow — feels like a HUD readout */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6, y: 6 }}
                    animate={{ opacity: 1, scale: 1, y: -46 }}
                    exit={{ opacity: 0, scale: 0.6, y: 6 }}
                    transition={{ type: 'spring', stiffness: 460, damping: 26 }}
                    className="absolute bottom-full whitespace-nowrap pointer-events-none px-2.5 py-1 rounded-md bg-cyan-400/10 border border-cyan-400/30 text-cyan-200 text-[10px] font-semibold tracking-widest uppercase backdrop-blur-sm"
                  >
                    {item.label}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Glow ring that pulses outward on hover */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0.6, scale: 0.7 }}
                    animate={{ opacity: 0, scale: 1.6 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="absolute w-12 h-12 rounded-2xl border border-cyan-400/60 pointer-events-none"
                  />
                )}
              </AnimatePresence>

              <motion.button
                onClick={() => setActiveId(item.id)}
                onMouseEnter={() => setHoveredId(item.id)}
                animate={{
                  y: isHovered ? -8 : 0,
                  scale: isHovered ? 1.18 : 1,
                  rotate: isHovered ? [0, -6, 4, 0] : 0,
                }}
                transition={{
                  y: { type: 'spring', stiffness: 300, damping: 14 },
                  scale: { type: 'spring', stiffness: 300, damping: 14 },
                  rotate: { duration: 0.45, ease: 'easeOut' },
                }}
                className="relative flex items-center justify-center w-12 h-12 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
              >
                {/* Active state: glass panel, glowing border */}
                {isActive && (
                  <motion.div
                    layoutId="darkDockActive"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-2xl bg-cyan-400/10 border border-cyan-400/40 shadow-[0_0_18px_-2px_rgba(34,211,238,0.5)]"
                  />
                )}
                {/* Hover-only wash for non-active items */}
                {isHovered && !isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 rounded-2xl bg-white/[0.06]"
                  />
                )}

                <Icon
                  className={`relative z-10 w-5 h-5 transition-colors duration-300 ${
                    isActive
                      ? 'text-cyan-300 drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]'
                      : isHovered
                      ? 'text-cyan-200'
                      : 'text-slate-500'
                  }`}
                  strokeWidth={1.75}
                />
              </motion.button>

              {/* Sliding glow bar underneath — morphs position between items */}
              {isActive && (
                <motion.div
                  layoutId="darkDockGlowBar"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  className="absolute -bottom-2 w-6 h-[2px] rounded-full bg-cyan-400 shadow-[0_0_8px_2px_rgba(34,211,238,0.7)]"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}