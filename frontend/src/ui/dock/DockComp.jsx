import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiGrid, 
  FiCompass, 
  FiLayers, 
  FiBookmark, 
  FiSettings 
} from 'react-icons/fi';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: FiGrid },
  { id: 'explore', label: 'Explore', icon: FiCompass },
  { id: 'components', label: 'Components', icon: FiLayers },
  { id: 'saved', label: 'Saved', icon: FiBookmark },
  { id: 'settings', label: 'Settings', icon: FiSettings },
];

export default function DockComp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [hoveredTab, setHoveredTab] = useState(null);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <nav className="relative flex items-center gap-1.5 p-1.5 rounded-full bg-white/70 backdrop-blur-2xl border border-slate-200/60 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05),0_8px_10px_-6px_rgba(0,0,0,0.01)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isHovered = hoveredTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              onMouseEnter={() => setHoveredTab(item.id)}
              onMouseLeave={() => setHoveredTab(null)}
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-colors duration-200 z-10"
            >
              {/* Active Indicator Sliding Pill */}
              {isActive && (
                <motion.div
                  layoutId="activeCapsule"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 shadow-md shadow-indigo-500/20"
                />
              )}

              {/* Hover Background Pill */}
              {isHovered && !isActive && (
                <motion.div
                  layoutId="hoverCapsule"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  className="absolute inset-0 rounded-full bg-slate-100/80"
                />
              )}

              {/* Content */}
              <motion.div 
                animate={{ y: isHovered && !isActive ? -2 : 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className={`relative z-20 flex items-center gap-2 ${
                  isActive ? 'text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </motion.div>
            </button>
          );
        })}
      </nav>
    </div>
  );
}