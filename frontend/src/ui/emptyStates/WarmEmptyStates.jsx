import React from 'react';
import { motion } from 'framer-motion';
import { TbSearchOff } from 'react-icons/tb';

export default function WarmEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-amber-50/60 border border-amber-200/60 rounded-3xl text-center max-w-sm mx-auto">
      <motion.div
        animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
        className="w-20 h-20 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mb-4"
      >
        <TbSearchOff className="w-10 h-10" />
      </motion.div>

      <h3 className="text-xl font-bold text-amber-950 mb-2">
        No Results Match Your Search
      </h3>

      <p className="text-sm text-amber-800/80 mb-6 leading-relaxed">
        We couldn't find anything matching your filters. Try adjusting your search keywords or clearing active filters.
      </p>

      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="px-4 py-2 bg-amber-700 text-amber-50 text-sm font-medium rounded-xl hover:bg-amber-800 transition-colors shadow-sm"
        >
          Clear Filters
        </motion.button>
      </div>
    </div>
  );
}