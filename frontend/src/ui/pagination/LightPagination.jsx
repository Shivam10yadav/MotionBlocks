import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiMoreHorizontal } from "react-icons/fi";

export const LightPagination = ({
  totalPages = 10,
  initialPage = 1,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageClick = (page) => {
    setCurrentPage(page);
    if (onPageChange) onPageChange(page);
  };

  const getPageNumbers = () => {
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
    <div className="flex items-center justify-center gap-1.5 p-2 bg-white/80 backdrop-blur-md rounded-2xl border border-neutral-200/80 shadow-sm w-fit">
      {/* Prev Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={currentPage === 1}
        onClick={() => handlePageClick(currentPage - 1)}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-900 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-neutral-600"
      >
        <FiChevronLeft className="text-base" />
      </motion.button>

      {/* Page Items */}
      {getPageNumbers().map((item, index) => {
        if (item === "DOTS_LEFT" || item === "DOTS_RIGHT") {
          return (
            <div key={`dots-${index}`} className="flex h-9 w-7 items-center justify-center text-neutral-400">
              <FiMoreHorizontal className="text-xs" />
            </div>
          );
        }

        const isSelected = currentPage === item;

        return (
          <button
            key={item}
            onClick={() => handlePageClick(item)}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl text-xs font-semibold transition-colors"
          >
            {isSelected && (
              <motion.div
                layoutId="light-pagination-active"
                className="absolute inset-0 rounded-xl bg-neutral-900 shadow-md shadow-neutral-900/10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className={`relative z-10 ${isSelected ? "text-white" : "text-neutral-600 hover:text-neutral-900"}`}>
              {item}
            </span>
          </button>
        );
      })}

      {/* Next Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={currentPage === totalPages}
        onClick={() => handlePageClick(currentPage + 1)}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-900 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-neutral-600"
      >
        <FiChevronRight className="text-base" />
      </motion.button>
    </div>
  );
};

export default LightPagination;