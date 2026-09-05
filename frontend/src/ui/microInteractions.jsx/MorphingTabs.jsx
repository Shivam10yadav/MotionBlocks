import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TABS = ['Overview', 'Features', 'Pricing', 'Docs'];

export default function MorphingTabs() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <div className="flex space-x-1 p-1.5 bg-slate-900 border border-slate-800 rounded-full">
      {TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className="relative px-5 py-2 text-sm font-medium transition-colors text-slate-400 hover:text-white"
        >
          {activeTab === tab && (
            <motion.div
              layoutId="activeTabIndicator"
              className="absolute inset-0 bg-indigo-600 rounded-full"
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            />
          )}
          <span className={`relative z-10 ${activeTab === tab ? 'text-white' : ''}`}>
            {tab}
          </span>
        </button>
      ))}
    </div>
  );
}