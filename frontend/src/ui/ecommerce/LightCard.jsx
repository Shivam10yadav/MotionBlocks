import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiHeart, FiShoppingBag, FiCheck, FiStar } from "react-icons/fi";

export const LightCard = () => {
  const [selectedColor, setSelectedColor] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const colors = [
    { name: "Sand", hex: "#E5D9C5", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop" },
    { name: "Olive", hex: "#556B2F", image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=800&auto=format&fit=crop" },
    { name: "Charcoal", hex: "#2C3539", image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=800&auto=format&fit=crop" },
  ];

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative w-full max-w-sm rounded-3xl bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-neutral-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-shadow duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-100">
        <motion.img
          key={selectedColor}
          initial={{ opacity: 0.6, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          src={colors[selectedColor].image}
          alt="Product"
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges & Favorite */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="rounded-full bg-white/80 backdrop-blur-md px-3 py-1 text-xs font-semibold text-neutral-800 shadow-sm">
            NEW
          </span>

          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setIsLiked(!isLiked)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-md text-neutral-700 shadow-sm transition-colors hover:bg-white"
          >
            <FiHeart className={`text-base transition-colors ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
          </motion.button>
        </div>

        {/* Quick Add Button */}
        <div className="absolute bottom-3 right-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleAddToCart}
            className={`flex h-11 items-center justify-center gap-2 rounded-full px-4 text-xs font-bold text-white shadow-lg backdrop-blur-md transition-all ${
              isAdded ? "bg-emerald-600" : "bg-neutral-900 hover:bg-neutral-800"
            }`}
          >
            <AnimatePresence mode="wait">
              {isAdded ? (
                <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1.5">
                  <FiCheck className="text-sm" /> Added
                </motion.span>
              ) : (
                <motion.span key="cart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5">
                  <FiShoppingBag className="text-sm" /> + Add
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="mt-4 px-1 space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">Footwear</p>
          <div className="flex items-center gap-1 text-xs font-semibold text-amber-500">
            <FiStar className="fill-amber-400" />
            <span>4.9</span>
          </div>
        </div>

        <h3 className="text-base font-bold text-neutral-800 group-hover:text-neutral-900">
          Aero Dynamic Runner
        </h3>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            {colors.map((color, idx) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(idx)}
                className={`h-5 w-5 rounded-full border-2 transition-all ${
                  selectedColor === idx ? "border-neutral-900 scale-110" : "border-transparent opacity-70 hover:opacity-100"
                }`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>

          <div className="text-right">
            <span className="text-sm font-extrabold text-neutral-900">$149.00</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LightCard;