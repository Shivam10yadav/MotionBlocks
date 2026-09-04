import React from 'react';
import { motion } from 'framer-motion';
import { FiInbox } from 'react-icons/fi';

export default function DarkEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-zinc-900 border border-zinc-800 rounded-2xl text-center max-w-sm mx-auto">
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative mb-5"
      >
        <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/20">
          <FiInbox className="w-8 h-8" />
        </div>
        <motion.span 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full"
        />
      </motion.div>

      <h3 className="text-lg font-semibold text-zinc-100 mb-1">
        Inbox Zero Achieved
      </h3>

      <p className="text-sm text-zinc-400 mb-6 max-w-xs">
        You're all caught up! No pending notifications or unread messages right now.
      </p>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="px-4 py-2 bg-emerald-500 text-zinc-950 text-sm font-semibold rounded-lg hover:bg-emerald-400 transition-colors"
      >
        Check Again
      </motion.button>
    </div>
  );
}