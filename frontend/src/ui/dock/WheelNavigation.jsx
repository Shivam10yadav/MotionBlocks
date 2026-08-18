import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import gsap from 'gsap';

const MENU_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'series', label: 'Series' },
  { id: 'films', label: 'Films' },
  { id: 'live', label: 'Live' },
  { id: 'sports', label: 'Sports' },
  { id: 'kids', label: 'Kids' },
  { id: 'music', label: 'Music' },
  { id: 'mylist', label: 'My List' },
];

export default function WheelNavigation() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const wheelRef = useRef(null);
  const currentRotation = useRef(0);

  const totalItems = MENU_ITEMS.length;
  const angleStep = 360 / totalItems;
  const radius = 170;

  // Lucky Draw Fast Spin Animation Function
  const spinTo = (targetIndex, direction = 1) => {
    if (isSpinning) return; // Prevent overlapping spins
    setIsSpinning(true);

    // Calculate item target base angle
    let diff = (targetIndex - selectedIndex) % totalItems;
    if (diff > totalItems / 2) diff -= totalItems;
    if (diff < -totalItems / 2) diff += totalItems;

    // Add 2 full extra spins (720 deg) for the rapid "lucky draw" wheel effect
    const extraSpins = 360 * 2 * direction;
    const targetRotation = currentRotation.current - diff * angleStep - extraSpins;

    gsap.to(wheelRef.current, {
      rotation: targetRotation,
      duration: 1.8, // Duration of fast spin + slow deceleration
      ease: 'power4.out', // Starts super fast, then gradually decelerates and lands softly
      onUpdate: () => {
        currentRotation.current = gsap.getProperty(wheelRef.current, 'rotation');

        // Keep item labels upright throughout high-speed rotation
        const items = wheelRef.current.querySelectorAll('.wheel-item-label');
        items.forEach((item) => {
          gsap.set(item, { rotation: -currentRotation.current });
        });
      },
      onComplete: () => {
        setIsSpinning(false);
      },
    });

    setSelectedIndex((targetIndex + totalItems) % totalItems);
  };

  const handleNext = () => spinTo((selectedIndex + 1) % totalItems, 1);
  const handlePrev = () => spinTo((selectedIndex - 1 + totalItems) % totalItems, -1);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#121316] text-zinc-100 font-sans">
      {/* Outer Console Device Panel */}
      <div 
        className="relative flex h-[580px] w-[680px] items-center justify-center rounded-[40px] bg-[#1a1c20] p-8"
        style={{
          boxShadow: '18px 18px 36px #0d0e10, -18px -18px 36px #272a30, inset 1px 1px 2px rgba(255,255,255,0.08)',
        }}
      >
        {/* Top Winner Pointer */}
        <div className="absolute top-10 z-30 flex flex-col items-center">
          <div 
            className="h-0 w-0 border-x-[10px] border-x-transparent border-t-[14px] border-t-emerald-400"
            style={{
              filter: 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.8)) drop-shadow(0px 0px 8px rgba(52,211,153,0.8))',
            }}
          />
        </div>

        {/* Sunken Wheel Track */}
        <div 
          className="absolute h-[340px] w-[340px] rounded-full"
          style={{
            boxShadow: 'inset 4px 4px 8px #0d0e10, inset -4px -4px 8px #272a30',
          }}
        />

        {/* Rapid Spinning Dial */}
        <div 
          ref={wheelRef} 
          className="absolute flex h-[340px] w-[340px] items-center justify-center rounded-full"
          style={{ transformOrigin: 'center center' }}
        >
          {MENU_ITEMS.map((item, index) => {
            const angleDeg = index * angleStep - 90;
            const angleRad = (angleDeg * Math.PI) / 180;
            const x = Math.cos(angleRad) * radius;
            const y = Math.sin(angleRad) * radius;

            const isActive = index === selectedIndex;

            return (
              <div
                key={item.id}
                onClick={() => spinTo(index)}
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="absolute z-20 cursor-pointer"
              >
                <div
                  className={`wheel-item-label flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition-all duration-300 select-none ${
                    isActive
                      ? 'text-zinc-950 bg-gradient-to-b from-emerald-300 to-emerald-500 scale-105'
                      : 'text-zinc-300 bg-gradient-to-b from-[#24272d] to-[#181a1e]'
                  }`}
                  style={
                    isActive
                      ? {
                          boxShadow: '0px 4px 12px rgba(52,211,153,0.5), inset 0px 2px 2px rgba(255,255,255,0.6), inset 0px -2px 4px rgba(0,0,0,0.4)',
                        }
                      : {
                          boxShadow: '6px 6px 12px #0d0e10, -4px -4px 10px #272a30, inset 0px 1px 1px rgba(255,255,255,0.1)',
                        }
                  }
                >
                  <span className="whitespace-nowrap pointer-events-none">{item.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Central Display & Trigger */}
        <div 
          className="z-30 flex h-56 w-56 flex-col items-center justify-center rounded-full bg-gradient-to-b from-[#22252b] to-[#16171b]"
          style={{
            boxShadow: '12px 12px 24px #0c0d0f, -10px -10px 20px #282b31, inset 0px 1px 2px rgba(255,255,255,0.15)',
          }}
        >
          <div 
            className="flex flex-col items-center justify-center px-6 py-2 rounded-2xl bg-[#101114] border border-[#1e2025]"
            style={{
              boxShadow: 'inset 3px 3px 6px #08080a, inset -3px -3px 6px #181a1e',
            }}
          >
            <span className="text-[9px] font-bold tracking-widest text-emerald-400 uppercase">
              {isSpinning ? 'Spinning...' : 'Selected'}
            </span>

            <div className="h-8 my-0.5 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={MENU_ITEMS[selectedIndex].id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="text-xl font-extrabold text-zinc-100 tracking-wider"
                >
                  {MENU_ITEMS[selectedIndex].label}
                </motion.h2>
              </AnimatePresence>
            </div>
          </div>

          {/* Trigger Buttons */}
          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={handlePrev}
              disabled={isSpinning}
              className="flex h-11 w-11 items-center justify-center rounded-full text-zinc-950 bg-gradient-to-b from-emerald-300 to-emerald-500 active:scale-95 disabled:opacity-50 transition-transform"
              style={{
                boxShadow: '3px 3px 8px #0c0d0f, -2px -2px 6px #282b31, inset 0px 2px 2px rgba(255,255,255,0.5)',
              }}
              aria-label="Previous Item"
            >
              <FiChevronLeft size={22} />
            </button>
            <button
              onClick={handleNext}
              disabled={isSpinning}
              className="flex h-11 w-11 items-center justify-center rounded-full text-zinc-300 bg-gradient-to-b from-[#26292f] to-[#181a1e] active:scale-95 disabled:opacity-50 transition-transform"
              style={{
                boxShadow: '4px 4px 8px #0c0d0f, -3px -3px 7px #282b31, inset 0px 1px 1px rgba(255,255,255,0.1)',
              }}
              aria-label="Next Item"
            >
              <FiChevronRight size={22} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}