import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { 
  RiTwitterXFill, 
  RiInstagramLine, 
  RiYoutubeFill, 
  RiDiscordFill, 
  RiGithubFill,
  RiSparklingFill
} from 'react-icons/ri';

export default function RetroCTA() {
  const buttonRef = useRef(null);
  const badgeGreenRef = useRef(null);
  const badgeBlueRef = useRef(null);
  const stampRedRef = useRef(null);
  const stampPurpleRef = useRef(null);

  // GSAP Interactive Animations
  const handleButtonMouseEnter = () => {
    gsap.to(buttonRef.current, {
      scale: 1.05,
      rotate: -1.5,
      boxShadow: '8px 10px 0px 0px #000000',
      duration: 0.25,
      ease: 'back.out(1.7)',
    });
  };

  const handleButtonMouseLeave = () => {
    gsap.to(buttonRef.current, {
      scale: 1,
      rotate: 0,
      boxShadow: '5px 7px 0px 0px #000000',
      duration: 0.25,
      ease: 'power2.out',
    });
  };

  const handleBadgeHover = (ref, extraRotate = 12) => {
    gsap.to(ref.current, {
      rotate: `+=${extraRotate}`,
      scale: 1.12,
      duration: 0.3,
      ease: 'elastic.out(1, 0.4)',
    });
  };

  const handleBadgeLeave = (ref, defaultRotate) => {
    gsap.to(ref.current, {
      rotate: defaultRotate,
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <section className="w-screen h-screen bg-[#F4EFE6] flex items-center justify-center p-3 sm:p-6 overflow-hidden font-sans select-none">
      {/* Outer Container - Constrained to 1 Viewport */}
      <div className="w-full max-w-5xl h-full max-h-[92vh] bg-[#FFFDF5] border-4 sm:border-8 border-white shadow-2xl rounded-2xl overflow-hidden flex flex-col justify-between">
        
        {/* TOP SECTION: Red Grid Banner */}
        <div className="relative bg-[#E8431E] flex-1 min-h-0 px-6 sm:px-12 flex items-center justify-center overflow-hidden">
          
          {/* Top Wavy Edge */}
          <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
            <svg
              className="relative block w-full h-[18px] sm:h-[24px] text-[#FFFDF5] fill-current"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path d="M0,0 C150,90 350,-40 500,50 C650,140 900,-20 1200,40 L1200,0 L0,0 Z" />
            </svg>
          </div>

          {/* Grid Overlay */}
          <div
            className="absolute inset-0 opacity-80 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, #1a1a1a 1.5px, transparent 1.5px),
                linear-gradient(to bottom, #1a1a1a 1.5px, transparent 1.5px)
              `,
              backgroundSize: '75px 65px',
            }}
          />

          {/* Background Sparkles */}
          <motion.div 
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/3 left-1/4 text-yellow-300 text-xl pointer-events-none"
          >
            <RiSparklingFill />
          </motion.div>
          <motion.div 
            animate={{ opacity: [0.2, 0.9, 0.2], scale: [1, 1.3, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            className="absolute bottom-1/3 right-1/4 text-yellow-300 text-lg pointer-events-none"
          >
            ✦
          </motion.div>

          {/* STAMP 1: Green Ticket Stamp (Top Left) */}
          <motion.div
            ref={badgeGreenRef}
            initial={{ rotate: -12, scale: 0.9 }}
            animate={{ rotate: -12, scale: 1 }}
            onMouseEnter={() => handleBadgeHover(badgeGreenRef)}
            onMouseLeave={() => handleBadgeLeave(badgeGreenRef, -12)}
            className="absolute left-3 sm:left-8 top-5 sm:top-8 z-20 cursor-pointer"
          >
            <div className="relative bg-[#4ADE80] border-2 sm:border-3 border-black px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-md shadow-[3px_3px_0px_0px_#000] text-black font-extrabold text-[10px] sm:text-xs tracking-tight text-center uppercase">
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#E8431E] rounded-full border-r-2 border-black" />
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#E8431E] rounded-full border-l-2 border-black" />
              
              <div className="leading-tight">
                <span>RESERVE</span>
                <span className="inline-block bg-black text-white rounded-full w-3.5 h-3.5 text-[9px] ml-1 text-center align-middle">
                  !
                </span>
                <div className="italic font-serif capitalize text-xs sm:text-sm tracking-normal">
                  Your Seat
                </div>
              </div>
            </div>
          </motion.div>

          {/* STAMP 2: Circular Postmark Stamp (Bottom Left) */}
          <motion.div
            ref={stampRedRef}
            initial={{ rotate: 15, scale: 0.9 }}
            animate={{ rotate: 15, scale: 1 }}
            onMouseEnter={() => handleBadgeHover(stampRedRef, -15)}
            onMouseLeave={() => handleBadgeLeave(stampRedRef, 15)}
            className="absolute left-6 sm:left-14 bottom-5 sm:bottom-8 z-20 cursor-pointer"
          >
            <div className="w-14 h-14 sm:w-20 sm:h-20 bg-[#FF6B6B] border-2 sm:border-3 border-black rounded-full flex flex-col items-center justify-center shadow-[3px_3px_0px_0px_#000] p-1 text-black font-bold text-center">
              <span className="text-[9px] sm:text-[11px] leading-tight font-mono tracking-tighter uppercase">
                ★ 100% ★
              </span>
              <span className="text-[11px] sm:text-sm font-extrabold underline decoration-1">
                FRESH
              </span>
            </div>
          </motion.div>

          {/* Center Main CTA Button */}
          <motion.button
            ref={buttonRef}
            onMouseEnter={handleButtonMouseEnter}
            onMouseLeave={handleButtonMouseLeave}
            whileTap={{ scale: 0.95 }}
            className="relative z-20 bg-[#FFB800] border-3 sm:border-4 border-black text-black px-8 sm:px-14 py-3.5 sm:py-5 rounded-full font-serif text-xl sm:text-3xl font-bold tracking-wide underline decoration-2 underline-offset-4 shadow-[5px_7px_0px_0px_#000] transition-shadow cursor-pointer"
          >
            Book a Call
          </motion.button>

          {/* STAMP 3: Starburst "Sale!" Stamp (Right) */}
          <motion.div
            ref={badgeBlueRef}
            initial={{ rotate: 8, scale: 0.9 }}
            animate={{ rotate: 8, scale: 1 }}
            onMouseEnter={() => handleBadgeHover(badgeBlueRef)}
            onMouseLeave={() => handleBadgeLeave(badgeBlueRef, 8)}
            className="absolute right-3 sm:right-8 top-6 sm:top-10 z-20 cursor-pointer"
          >
            <div className="relative w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center">
              <div
                className="absolute inset-0 bg-[#2563EB] border-2 sm:border-3 border-black"
                style={{
                  clipPath:
                    'polygon(100% 50%, 88% 65%, 95% 82%, 77% 85%, 75% 100%, 58% 93%, 45% 100%, 35% 88%, 18% 90%, 18% 72%, 0% 65%, 8% 50%, 0% 35%, 18% 28%, 18% 10%, 35% 12%, 45% 0%, 58% 7%, 75% 0%, 77% 15%, 95% 18%, 88% 35%)',
                }}
              />
              <span className="relative z-10 text-white font-serif italic text-sm sm:text-xl font-bold -rotate-6">
                Sale!
              </span>
            </div>
          </motion.div>

          {/* STAMP 4: Purple Oval "VIP Pass" Stamp (Bottom Right) */}
          <motion.div
            ref={stampPurpleRef}
            initial={{ rotate: -10, scale: 0.9 }}
            animate={{ rotate: -10, scale: 1 }}
            onMouseEnter={() => handleBadgeHover(stampPurpleRef)}
            onMouseLeave={() => handleBadgeLeave(stampPurpleRef, -10)}
            className="absolute right-6 sm:right-16 bottom-5 sm:bottom-8 z-20 cursor-pointer"
          >
            <div className="bg-[#A855F7] border-2 sm:border-3 border-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-[3px_3px_0px_0px_#000] text-white font-extrabold text-[10px] sm:text-xs tracking-wider uppercase flex items-center gap-1">
              <span className="text-yellow-300">★</span> VIP ACCESS
            </div>
          </motion.div>

          {/* Bottom Wavy Edge */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
            <svg
              className="relative block w-full h-[18px] sm:h-[24px] text-[#FFFDF5] fill-current"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path d="M0,0 C150,90 350,-40 500,50 C650,140 900,-20 1200,40 L1200,120 L0,120 Z" />
            </svg>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="px-6 sm:px-12 py-5 sm:py-7 flex flex-col justify-between gap-6 sm:gap-8 bg-[#FFFDF5] shrink-0">
          
          {/* Tagline */}
          <div className="flex justify-end">
            <p className="max-w-md text-right font-bold text-black text-xs sm:text-sm leading-snug tracking-tight">
              From Smashed Patties At Shake Shack To Glamburgers At Honky Tonk,
              There&apos;s A Little Something For Everyone.
            </p>
          </div>

          {/* Footer: New Brand Name & Socials */}
          <div className="flex items-end justify-between pt-2 border-t-2 border-black/10">
            
            {/* Updated Brand Name & Interactive Mascot */}
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-3xl sm:text-5xl font-black tracking-tighter text-black font-sans lowercase">
                cravecraft
              </span>

              <motion.div
                whileHover={{ rotate: [0, -15, 15, -10, 0], scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="w-8 h-8 sm:w-11 sm:h-11 border-2 sm:border-3 border-black rounded-full flex items-center justify-center bg-[#FFB800] shadow-[2px_2px_0px_0px_#000] cursor-pointer"
              >
                <span className="text-base sm:text-xl">🍔</span>
              </motion.div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2 sm:gap-2.5 text-black">
              {[
                { Icon: RiTwitterXFill, label: "Twitter X" },
                { Icon: RiInstagramLine, label: "Instagram" },
                { Icon: RiYoutubeFill, label: "YouTube" },
                { Icon: RiDiscordFill, label: "Discord" },
                { Icon: RiGithubFill, label: "GitHub" },
              ].map(({ Icon, label }, index) => (
                <motion.a
                  key={index}
                  href="#"
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ y: 0, scale: 0.95 }}
                  className="p-1.5 sm:p-2 rounded-full border-2 border-black bg-white shadow-[2px_2px_0px_0px_#000] hover:bg-[#FFB800] transition-colors"
                >
                  <Icon className="w-4 h-4 sm:w-4 sm:h-4" />
                </motion.a>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}