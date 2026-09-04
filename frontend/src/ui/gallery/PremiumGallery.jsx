import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ArrowLeft, ArrowRight, Expand } from 'lucide-react';

const IMAGES = [
  {
    id: 1,
    title: 'Architectural Serenity',
    category: 'Design & Space',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    description: 'Clean geometric lines and soft ambient natural light.',
  },
  {
    id: 2,
    title: 'Alpine Peak Horizon',
    category: 'Landscape',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
    description: 'Crisp mountain horizons reflecting across tranquil glacial waters.',
  },
  {
    id: 3,
    title: 'Monochrome Shadows',
    category: 'Abstract Art',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
    description: 'Interplay of light, form, and dramatic curves.',
  },
  {
    id: 4,
    title: 'Metropolitan Neon',
    category: 'Urban Life',
    url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1600&q=80',
    description: 'Vibrant rain-slicked city streets glistening under twilight.',
  },
  {
    id: 5,
    title: 'Emerald Forest',
    category: 'Nature',
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80',
    description: 'Deep woodland foliage enveloped in soft morning mist.',
  },
  {
    id: 6,
    title: 'Coastal Twilight',
    category: 'Seascape',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    description: 'Minimalist shorelines stretching beneath endless sky hues.',
  },
  {
    id: 7,
    title: 'Golden Dunes',
    category: 'Desert',
    url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=80',
    description: 'Smooth wind-sculpted sand dunes illuminated by warm sunlight.',
  },
  {
    id: 8,
    title: 'Nordic Winter',
    category: 'Wilderness',
    url: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=1600&q=80',
    description: 'Frost-covered pines under quiet Arctic skies.',
  },
];

export default function PremiumGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const cursorRef = useRef(null);
  const cardRefs = useRef([]);

  const total = IMAGES.length;
  const angleStep = 360 / total;
  const radius = 220; // Exact orbit radius in px

  // Auto-rotate
  useEffect(() => {
    if (isPaused || selectedImage) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 3800);

    return () => clearInterval(interval);
  }, [isPaused, selectedImage, total]);

  // GSAP Mouse Follower
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3.out' });

    const handleMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleMouseEnter = (index) => {
    setIsPaused(true);
    gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3 });
    if (cardRefs.current[index]) {
      gsap.to(cardRefs.current[index], { scale: 1.05, duration: 0.4, ease: 'power2.out' });
    }
  };

  const handleMouseLeave = (index) => {
    setIsPaused(false);
    gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.3 });
    if (cardRefs.current[index]) {
      gsap.to(cardRefs.current[index], { scale: 1, duration: 0.4, ease: 'power2.out' });
    }
  };

  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + total) % total);
  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % total);

  const activeItem = IMAGES[activeIndex];

  return (
    <div className="relative w-full h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden flex flex-col justify-between items-center select-none">
      {/* GSAP Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-14 h-14 bg-slate-900/10 backdrop-blur-md rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center border border-slate-900/20 opacity-0 scale-0"
      >
        <Expand className="w-5 h-5 text-slate-900" />
      </div>

      {/* Header */}
      <header className="z-20 pt-6 px-8 text-center">
        <span className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold block mb-0.5">
          Interactive Exhibition
        </span>
        <h1 className="text-2xl md:text-3xl font-light tracking-tight text-slate-900">
          Centered Wheel Gallery
        </h1>
      </header>

      {/* Dead-Center Stage */}
      <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden">
        {/* Active Card Info Box */}
        <div className="absolute z-20 pointer-events-none text-center px-4 max-w-xs">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="bg-white/90 backdrop-blur-xl border border-white/80 p-5 rounded-2xl shadow-xl shadow-slate-200/50"
            >
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold block mb-1">
                0{activeItem.id} / 0{total} • {activeItem.category}
              </span>
              <h2 className="text-base font-medium text-slate-900 mb-1">{activeItem.title}</h2>
              <p className="text-slate-500 text-xs line-clamp-2">{activeItem.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Rotating Wheel Container centered with flex */}
        <motion.div
          className="relative flex items-center justify-center rounded-full border border-slate-200/50"
          style={{ width: radius * 2, height: radius * 2 }}
          animate={{ rotate: -activeIndex * angleStep }}
          transition={{ type: 'spring', stiffness: 120, damping: 22, mass: 0.8 }}
        >
          {IMAGES.map((item, index) => {
            const itemAngle = index * angleStep - 90; // Start top center (-90deg)
            const angleRad = (itemAngle * Math.PI) / 180;
            const x = Math.cos(angleRad) * radius;
            const y = Math.sin(angleRad) * radius;
            const isActive = index === activeIndex;

            return (
              <div
                key={item.id}
                className="absolute flex items-center justify-center"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
              >
                {/* Counter-rotation to keep card perfectly upright */}
                <motion.div
                  animate={{ rotate: activeIndex * angleStep }}
                  transition={{ type: 'spring', stiffness: 120, damping: 22, mass: 0.8 }}
                >
                  <motion.div
                    ref={(el) => (cardRefs.current[index] = el)}
                    layoutId={`disk-card-${item.id}`}
                    onClick={() => (isActive ? setSelectedImage(item) : setActiveIndex(index))}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                    animate={{
                      opacity: isActive ? 1 : 0.4,
                      scale: isActive ? 1.2 : 0.85,
                    }}
                    transition={{ duration: 0.4 }}
                    className={`cursor-pointer rounded-2xl overflow-hidden shadow-lg border-2 border-white bg-white transition-all duration-300 ${
                      isActive
                        ? 'z-30 shadow-slate-400/60 ring-2 ring-slate-900/10'
                        : 'hover:opacity-75'
                    }`}
                    style={{
                      width: '120px',
                      height: '160px',
                    }}
                  >
                    <div className="w-full h-full relative overflow-hidden">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60" />
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Footer Controls */}
      <footer className="z-20 pb-6 px-6 w-full max-w-md flex items-center justify-between gap-4">
        <div className="flex items-center gap-6 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full border border-slate-200/80 shadow-lg shadow-slate-200/60 w-full justify-between">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-1.5">
            {IMAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx
                    ? 'w-6 bg-slate-900'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </footer>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              layoutId={`disk-card-${selectedImage.id}`}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="relative max-w-lg w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-white cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                  {selectedImage.category}
                </span>
                <h3 className="text-xl font-light text-slate-900">{selectedImage.title}</h3>
                <p className="text-slate-600 text-sm mb-4">{selectedImage.description}</p>

                <button
                  onClick={() => setSelectedImage(null)}
                  className="w-full py-2.5 rounded-full bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}