import React from "react";
import { motion } from "framer-motion";

export const LuxuryLoader = () => {
  const bars = [0, 1, 2, 3, 4];

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-[#14080A] rounded-2xl border border-[#2E151A] shadow-2xl">
      <div className="flex items-center gap-2 h-16">
        {bars.map((index) => (
          <motion.div
            key={index}
            className="w-2.5 rounded-full bg-gradient-to-t from-[#E63946] via-[#FF0055] to-[#FFB703]"
            animate={{
              height: ["20%", "100%", "20%"],
              boxShadow: [
                "0 0 0px rgba(230,57,70,0)",
                "0 0 16px rgba(255,0,85,0.8)",
                "0 0 0px rgba(230,57,70,0)",
              ],
            }}
            transition={{
              duration: 1.1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.15,
            }}
          />
        ))}
      </div>

      <motion.p
        className="mt-4 text-xs font-medium tracking-widest text-[#E2A9B0]"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        Initializing Experience
      </motion.p>
    </div>
  );
};

export default LuxuryLoader