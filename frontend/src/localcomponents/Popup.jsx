import React, { useState, useEffect } from "react";
import { FaStar, FaTimes, FaGithub } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export const Popup = ({ githubUrl = "https://github.com/your-repo-here" }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Read current popup count from Session Storage
    const count = parseInt(sessionStorage.getItem("github_star_popup_count") || "0", 10);

    // If already shown twice, don't set any timer
    if (count >= 2) return;

    // First time = 2 seconds, Second time = 20 seconds
    const delay = count === 0 ? 2000 : 20000;

    const timer = setTimeout(() => {
      setIsVisible(true);
      sessionStorage.setItem("github_star_popup_count", (count + 1).toString());
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50 flex max-w-sm w-[calc(100vw-3rem)] items-center gap-3.5 rounded-2xl border border-[rgba(140,94,50,0.2)] bg-[#FFFDF9] p-4 text-[#2C241C] shadow-lg"
        >
          {/* Star Icon Badge */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[rgba(140,94,50,0.2)] bg-[#F9F6F0] text-[#8C5E32]">
            <FaStar className="h-4 w-4" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#8C5E32]">
                GitHub
              </span>
              <span className="text-xs text-[rgba(44,36,28,0.4)]">•</span>
              <p className="font-mono text-xs font-bold text-[#2C241C] truncate">
                Enjoying Motion Block?
              </p>
            </div>
            <p className="mt-0.5 text-xs text-[rgba(44,36,28,0.6)] leading-snug">
              If you like Motion Block, leave a star on GitHub!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 border-l border-[rgba(140,94,50,0.15)] pl-3">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
              className="flex items-center gap-1.5 rounded-xl bg-[#2C241C] px-3 py-2 font-mono text-xs font-semibold text-[#FFFDF9] transition-opacity hover:opacity-90"
            >
              <FaGithub className="h-3.5 w-3.5" />
              <span>Star</span>
            </a>

            <button
              onClick={handleClose}
              className="rounded-lg p-1 text-[rgba(44,36,28,0.4)] hover:bg-[#F9F6F0] hover:text-[#2C241C] transition-colors"
              title="Close"
            >
              <FaTimes className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};