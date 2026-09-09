import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ArrowRight, Zap, Layers, Sparkles, Cpu, ShieldCheck } from "lucide-react";

export default function FeatureBentoGrid() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".bento-card", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#050508] h-screen w-full flex items-center justify-center p-4 sm:p-6 font-sans text-white overflow-hidden selection:bg-blue-600 selection:text-white">
      <div
        ref={containerRef}
        className="max-w-5xl w-full h-full max-h-[560px] grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch"
      >
        {/* Left Column Container */}
        <div className="lg:col-span-6 flex flex-col gap-3.5 h-full">
          {/* Top Blue Card */}
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="bento-card bg-[#2539f5] rounded-[28px] p-6 sm:p-8 flex flex-col justify-between flex-1 relative overflow-hidden"
          >
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-black uppercase tracking-tight leading-[0.92] mb-3">
                FAST{" "}
                <span className="inline-flex items-center justify-center align-middle mx-1 -mt-2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white">
                  <Zap size={20} className="fill-current" />
                </span>
                <br />
                PERFORMANCE
                <br />
                BUILT IN{" "}
                <span className="inline-flex items-center justify-center align-middle mx-1 -mt-2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white">
                  <Cpu size={20} />
                </span>
              </h2>

              <p className="text-white/90 text-xs sm:text-sm max-w-xs font-semibold leading-relaxed">
                Optimized asset delivery, instantaneous page transitions, and core web vital excellence.
              </p>
            </div>

            <div className="mt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-full pl-5 pr-1.5 py-1.5 inline-flex items-center gap-3 font-extrabold uppercase text-xs tracking-wider transition-colors"
              >
                <span>EXPLORE SPEED</span>
                <span className="bg-white text-[#2539f5] rounded-full w-7 h-7 flex items-center justify-center">
                  <ArrowRight size={15} strokeWidth={3} />
                </span>
              </motion.button>
            </div>
          </motion.div>

          {/* Bottom Split Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 h-[160px]">
            {/* Bottom Left Card */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="bento-card bg-[#f28e38] text-white rounded-[28px] p-5 flex flex-col justify-between"
            >
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                <Layers size={16} />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight leading-none mb-1">
                  MODULAR UI
                </h3>
                <p className="text-white/90 text-xs font-bold leading-tight">
                  Flexible component stack.
                </p>
              </div>
            </motion.div>

            {/* Bottom Right Card */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="bento-card bg-[#f42b78] text-white rounded-[28px] p-5 flex flex-col justify-between"
            >
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                <Sparkles size={16} />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight leading-none mb-1">
                  SMART SEO
                </h3>
                <p className="text-white/90 text-xs font-bold leading-tight">
                  Automated metadata engine.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Tall Column - Beige Theme */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="lg:col-span-6 bento-card bg-[#e3dac9] text-[#1c1917] rounded-[28px] p-6 sm:p-8 flex flex-col justify-between h-full relative overflow-hidden"
        >
          <div>
            <h2 className="text-4xl sm:text-5xl lg:text-[62px] font-black uppercase tracking-tight leading-[0.90]">
              TOTAL
              <br />
              SECURITY
              <br />
              RAILS{" "}
              <span className="inline-flex items-center justify-center align-middle mx-1 -mt-2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-stone-900 text-[#e3dac9]">
                <ShieldCheck size={22} />
              </span>
              <br />
              PROTECTING
              <br />
              EVERY
              <br />
              VISITOR
            </h2>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-stone-900/10">
            <p className="text-stone-900 text-xs font-black uppercase tracking-wider">
              ENTERPRISE READY
            </p>

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-xs font-bold font-mono tracking-tight text-stone-800">
                SSL ACTIVE
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}