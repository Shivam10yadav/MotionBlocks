import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineFolderAdd } from 'react-icons/hi';

export default function LightEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl text-center max-w-sm mx-auto shadow-sm">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-4 text-slate-600"
      >
        <HiOutlineFolderAdd className="w-8 h-8" />
      </motion.div>

      <motion.h3 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="text-lg font-semibold text-slate-800 mb-1"
      >
        No Projects Found
      </motion.h3>

      <motion.p 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="text-sm text-slate-500 mb-6 max-w-xs"
      >
        Get started by creating your first project folder to keep your files organized.
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors shadow-sm"
      >
        Create New Project
      </motion.button>
    </div>
  );
}