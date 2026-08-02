import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiMaximize2 } from "react-icons/fi";

export const DarkPagination = ({
  totalPages = 10,
  initialPage = 1,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [direction, setDirection] = useState(0); // -1 for prev, 1 for next

  const handlePageClick = (page) => {
    if (page === currentPage) return;
    setDirection(page > currentPage ? 1 : -1);
    setCurrentPage(page);
    if (onPageChange) onPageChange(page);
  };

  const getVisiblePages = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("DOTS_LEFT");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("DOTS_RIGHT");
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex items-center gap-3 p-1.5 bg-[#0B0F17] rounded-2xl border border-cyan-500/20 shadow-[0_0_25px_rgba(6,182,212,0.1)] w-fit select-none">
      {/* Page Counter Badge with Spring Flip Animation */}
      <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-cyan-950/40 rounded-xl border border-cyan-500/30 text-xs font-mono text-cyan-400">
        <FiMaximize2 className="text-cyan-400 text-xs animate-pulse" />
        <span className="text-neutral-400">PAGE</span>
        <div className="relative w-4 h-4 overflow-hidden flex items-center justify-center font-bold">
          <AnimatePresence custom={direction} initial={false}>
            <motion.span
              key={currentPage}
              custom={direction}
              initial={{ y: direction * 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -direction * 12, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              {currentPage}
            </motion.span>
          </AnimatePresence>
        </div>
        <span className="text-neutral-500">/ {totalPages}</span>
      </div>

      {/* Main Track Controls */}
      <div className="flex items-center gap-1 bg-[#121824] p-1 rounded-xl border border-neutral-800">
        {/* Prev Button */}
        <motion.button
          whileHover={{ scale: 1.1, x: -2 }}
          whileTap={{ scale: 0.9 }}
          disabled={currentPage === 1}
          onClick={() => handlePageClick(currentPage - 1)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-neutral-400"
        >
          <FiChevronLeft className="text-lg" />
        </motion.button>

        {/* Dynamic Items */}
        {getVisiblePages().map((item, index) => {
          if (item === "DOTS_LEFT" || item === "DOTS_RIGHT") {
            return (
              <div
                key={"dark-dots-" + index}
                className="flex h-8 w-6 items-center justify-center text-xs font-mono text-cyan-500/40"
              >
                ••
              </div>
            );
          }

          const isSelected = currentPage === item;

          return (
            <button
              key={item}
              onClick={() => handlePageClick(item)}
              className="relative flex h-8 w-8 items-center justify-center text-xs font-mono font-medium transition-colors"
            >
              {/* Animated Floating Glow Capsule */}
              {isSelected && (
                <motion.div
                  layoutId="cyber-track-glow"
                  className="absolute inset-0 rounded-lg bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.8)]"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span
                className={
                  "relative z-10 transition-colors duration-150 " +
                  (isSelected
                    ? "text-[#0B0F17] font-bold"
                    : "text-neutral-400 hover:text-cyan-300")
                }
              >
                {item}
              </span>
            </button>
          );
        })}

        {/* Next Button */}
        <motion.button
          whileHover={{ scale: 1.1, x: 2 }}
          whileTap={{ scale: 0.9 }}
          disabled={currentPage === totalPages}
          onClick={() => handlePageClick(currentPage + 1)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-neutral-400"
        >
          <FiChevronRight className="text-lg" />
        </motion.button>
      </div>
    </div>
  );
};

export default DarkPagination;