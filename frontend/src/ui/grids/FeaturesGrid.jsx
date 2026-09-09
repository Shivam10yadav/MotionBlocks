import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { 
  LucideDollarSign, 
  LucideBitcoin, 
  LucideSend, 
  LucideMessageSquare, 
  LucideSparkles,
  LucideTrophy,
  LucideUsers,
  LucideCoins
} from "lucide-react";

export default function FeatureGrid  () {
  const centerLogoRef = useRef(null);
  const floatingIconsRef = useRef([]);

  useEffect(() => {
    floatingIconsRef.current.forEach((icon, index) => {
      if (icon) {
        gsap.to(icon, {
          y: index % 2 === 0 ? -8 : 8,
          x: index % 3 === 0 ? 5 : -5,
          duration: 2 + index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "easeInOut",
        });
      }
    });

    if (centerLogoRef.current) {
      gsap.to(centerLogoRef.current, {
        scale: 1.03,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "easeInOut",
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#071309] text-white flex items-center justify-center p-4 sm:p-8 font-sans overflow-hidden">
      <div className="relative grid grid-cols-1 md:grid-cols-12 gap-5 max-w-6xl w-full">

        {/* CARD 1: Purple Rewards */}
        <motion.div 
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
          className="md:col-span-3 bg-[#6C5CE7] rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden min-h-[320px] shadow-lg"
        >
          <div className="bg-[#0b101d] rounded-2xl p-4 shadow-2xl border border-white/10 text-center space-y-3">
            <div className="flex justify-between items-center text-xs text-emerald-400">
              <span className="bg-emerald-500/20 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide">
                ACTIVE PASS
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </div>
            <div>
              <div className="text-xl font-extrabold text-white tracking-wider">$250.00</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">BONUS BALANCE</div>
            </div>
            <div className="bg-white/5 rounded-lg py-1 px-2 text-[11px] text-gray-300">
              Level progress: <span className="text-emerald-400 font-semibold">68%</span>
            </div>
            <div className="flex justify-center gap-2 text-xs font-mono text-gray-300 font-bold pt-1">
              <span className="bg-white/10 px-1.5 py-1 rounded">04</span>
              <span>:</span>
              <span className="bg-white/10 px-1.5 py-1 rounded">12</span>
              <span>:</span>
              <span className="bg-white/10 px-1.5 py-1 rounded">45</span>
              <span>:</span>
              <span className="bg-white/10 px-1.5 py-1 rounded">09</span>
            </div>
          </div>
          <h3 className="text-xl font-bold text-white leading-tight mt-6">
            Claim instant <br /> cash and bonuses
          </h3>
        </motion.div>

        {/* CARD 2: Light Green Payments */}
        <motion.div 
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
          className="md:col-span-6 bg-[#A3F19A] text-black rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden min-h-[320px] shadow-lg"
        >
          <div className="max-w-xs z-10">
            <h2 className="text-3xl font-extrabold tracking-tight leading-tight text-gray-900">
              Fast payouts <br /> with card and <br /> crypto options <br /> anytime
            </h2>
          </div>

          <div className="absolute right-4 bottom-4 w-52 h-52 pointer-events-none">
            <div ref={(el) => (floatingIconsRef.current[0] = el)} className="absolute top-0 right-10 bg-[#00B894] text-white p-3 rounded-full shadow-lg border-2 border-white/20">
              <LucideDollarSign className="w-6 h-6 stroke-[3]" />
            </div>
            <div ref={(el) => (floatingIconsRef.current[1] = el)} className="absolute top-10 left-6 bg-[#FDCB6E] text-white p-2.5 rounded-2xl shadow-lg border-2 border-white/20 rotate-12">
              <LucideCoins className="w-5 h-5 fill-white" />
            </div>
            <div ref={(el) => (floatingIconsRef.current[2] = el)} className="absolute top-16 right-2 bg-[#0984E3] text-white p-2.5 rounded-2xl shadow-lg border-2 border-white/20 -rotate-6">
              <LucideSparkles className="w-5 h-5" />
            </div>
            <div ref={(el) => (floatingIconsRef.current[3] = el)} className="absolute bottom-16 left-12 bg-[#E17055] text-white p-2.5 rounded-2xl shadow-lg border-2 border-white/20 rotate-6">
              <LucideBitcoin className="w-5 h-5" />
            </div>
            <div ref={(el) => (floatingIconsRef.current[4] = el)} className="absolute bottom-10 right-14 bg-[#D63031] text-white p-2.5 rounded-full shadow-lg border-2 border-white/20">
              <span className="font-extrabold text-sm px-1">€</span>
            </div>
            <div ref={(el) => (floatingIconsRef.current[5] = el)} className="absolute bottom-2 left-20 bg-[#00CEC9] text-white p-2.5 rounded-full shadow-lg border-2 border-white/20">
              <LucideSend className="w-4 h-4" />
            </div>
            <div ref={(el) => (floatingIconsRef.current[6] = el)} className="absolute bottom-4 right-2 bg-[#0984E3] text-white p-2 rounded-full shadow-lg border-2 border-white/20">
              <span className="font-bold text-xs">£</span>
            </div>
          </div>
        </motion.div>

        {/* CARD 3: Grey Live Chat */}
        <motion.div 
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
          className="md:col-span-3 bg-[#8C8C8C] text-white rounded-3xl p-6 flex flex-col justify-between min-h-[320px] shadow-lg"
        >
          <h3 className="text-xl font-bold text-center leading-snug text-gray-100">
            Chat live with other players in the room
          </h3>
          <div className="bg-[#18181B] rounded-2xl p-3 space-y-2 shadow-2xl border border-white/10 text-xs">
            <div className="bg-[#27272A] rounded-xl p-2.5">
              <div className="flex justify-between items-center text-[10px] text-gray-400 mb-1">
                <span className="font-medium text-gray-300">Alex_99</span>
                <LucideMessageSquare className="w-3 h-3 text-gray-500" />
              </div>
              <p className="text-gray-300 text-[11px]">Good game everyone!</p>
            </div>
            <div className="bg-[#27272A] rounded-xl p-2.5">
              <div className="flex justify-between items-center text-[10px] text-gray-400 mb-1">
                <span className="font-medium text-gray-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Sam
                </span>
                <LucideMessageSquare className="w-3 h-3 text-gray-500" />
              </div>
              <p className="text-gray-300 text-[11px] leading-tight">
                Who wants to join the next match?
              </p>
            </div>
            <div className="bg-[#27272A] rounded-xl p-2.5">
              <div className="flex justify-between items-center text-[10px] text-gray-400 mb-1">
                <span className="font-medium text-gray-300">Chris</span>
                <LucideMessageSquare className="w-3 h-3 text-gray-500" />
              </div>
              <p className="text-gray-300 text-[11px]">Count me in 🔥</p>
            </div>
          </div>
        </motion.div>

        {/* CARD 4: Invite Squad */}
        <motion.div 
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
          className="md:col-span-3 bg-[#1C1D21] rounded-3xl p-6 flex flex-col justify-between min-h-[320px] shadow-lg relative overflow-hidden"
        >
          <h3 className="text-xl font-bold text-center leading-snug">
            Bring your squad and share the prize
          </h3>
          <div className="relative h-36 flex items-end justify-center gap-2">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-black via-gray-600 to-white/80 shadow-2xl ring-1 ring-white/20"></div>
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-black via-gray-500 to-white shadow-2xl -ml-4 ring-1 ring-white/20 z-10"></div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-black via-gray-700 to-white/70 shadow-2xl -ml-4 ring-1 ring-white/20"></div>
          </div>
        </motion.div>

        {/* CARD 5: Trending Games */}
        <motion.div 
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
          className="md:col-span-6 bg-[#E0D7FF] text-black rounded-3xl pt-16 pb-4 px-6 flex flex-col justify-between relative overflow-hidden min-h-[320px] shadow-lg"
        >
          <div className="absolute top-4 left-0 right-0 flex justify-center">
            <p className="text-3xl font-extrabold tracking-tight text-slate-500/70 font-serif italic text-center">
              Top trending matches
            </p>
          </div>
          <div className="grid grid-cols-4 gap-3 mt-auto">
            <div className="h-28 rounded-2xl overflow-hidden bg-cover bg-center shadow-lg transform hover:scale-105 transition-transform duration-300 relative group"
                 style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80')` }}>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
            </div>
            <div className="h-28 rounded-2xl overflow-hidden bg-cover bg-center shadow-lg transform hover:scale-105 transition-transform duration-300 relative group"
                 style={{ backgroundImage: `url('https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=400&q=80')` }}>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
            </div>
            <div className="h-28 rounded-2xl overflow-hidden bg-cover bg-center shadow-lg transform hover:scale-105 transition-transform duration-300 relative group"
                 style={{ backgroundImage: `url('https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=400&q=80')` }}>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
            </div>
            <div className="h-28 rounded-2xl overflow-hidden bg-cover bg-center shadow-lg transform hover:scale-105 transition-transform duration-300 relative group"
                 style={{ backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80')` }}>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
            </div>
          </div>
        </motion.div>

        {/* CARD 6: Rank Badges */}
        <motion.div 
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
          className="md:col-span-3 bg-[#FDCB6E] text-black rounded-3xl p-6 flex flex-col justify-between min-h-[320px] shadow-lg relative overflow-hidden"
        >
          <div className="relative flex justify-center items-center py-4">
            <div className="absolute left-2 top-8 bg-amber-700/80 p-2 rounded-lg text-white transform -rotate-12 shadow-md">
              <LucideTrophy className="w-4 h-4" />
            </div>
            <div className="w-28 h-28 bg-gradient-to-b from-purple-600 to-indigo-900 rounded-3xl rotate-45 flex items-center justify-center border-4 border-amber-300 shadow-2xl transform">
              <div className="-rotate-45 text-amber-300 flex items-center justify-center">
                <LucideSparkles className="w-12 h-12 fill-amber-300" />
              </div>
            </div>
            <div className="absolute right-2 top-8 bg-emerald-700/80 p-2 rounded-lg text-white transform rotate-12 shadow-md">
              <LucideUsers className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-xl font-extrabold text-center text-gray-900 leading-snug">
            Rank up to unlock <br /> VIP perks <br /> and gear
          </h3>
        </motion.div>

        {/* CENTER BRAND LOGO */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none hidden md:block">
          <div 
            ref={centerLogoRef}
            className="w-44 h-44 rounded-full bg-[#032313] border-[6px] border-[#071309] shadow-2xl flex items-center justify-center pointer-events-auto cursor-pointer"
          >
            <div className="text-center flex items-center gap-1">
              <span className="text-4xl font-extrabold text-white tracking-wider font-sans">
                Vega
              </span>
              <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block mb-1"></span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};