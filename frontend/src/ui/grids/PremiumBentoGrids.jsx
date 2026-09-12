import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import {
  TrendingUp,
  Heart,
  Play,
  Plus,
  BarChart3,
  Users,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function PremiumBentoGrid() {
  const containerRef = useRef(null);

  // GSAP animation for subtle floating elements inside the central card
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".float-element-1", {
        y: -8,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
      gsap.to(".float-element-2", {
        y: 8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 0.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Card Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-black text-slate-900 p-4 md:p-8 flex items-center justify-center font-sans">
      {/* Grid Container */}
      <motion.div
        ref={containerRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.1 }}
        className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]"
      >
        {/* ================= CARD 1: Top Left - First Round Funding ================= */}
        <motion.div
          variants={cardVariants}
          className="bg-[#FDE8EC] rounded-[32px] p-6 flex flex-col justify-between relative overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="text-center font-bold text-slate-800 text-sm md:text-base leading-tight">
            First Round of<br />funding
          </div>

          {/* Donut Progress Chart */}
          <div className="relative w-32 h-32 mx-auto my-3 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-white/60"
                strokeWidth="4"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#FF5C75]"
                strokeDasharray="75, 100"
                strokeWidth="4"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-xl font-black text-slate-900">75%</span>
              <span className="block text-[10px] text-slate-500 font-medium -mt-1">In progress</span>
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-black text-slate-900">2.5K</div>
            <div className="text-[11px] text-slate-500 font-medium">
              263 Contributions in the last year
            </div>
          </div>
        </motion.div>

        {/* ================= CARD 2: Top Middle Left - Project Views ================= */}
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-[32px] p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <span className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
              4.875
            </span>
            <span className="text-slate-800 text-lg">♥</span>
          </div>

          <div className="mt-4">
            <p className="text-sm font-bold text-slate-800 leading-snug">
              Project Views<br />last year
            </p>
          </div>
        </motion.div>

        {/* ================= CARD 3: Top Middle Right - New Users ================= */}
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-[32px] p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="text-right">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              New Users
            </span>
          </div>

          <div>
            <div className="text-4xl md:text-5xl font-black text-slate-900">57K</div>
            <div className="text-green-500 text-xs font-bold mt-1 flex items-center justify-end gap-0.5">
              <span>+10%</span>
            </div>
          </div>
        </motion.div>

        {/* ================= CARD 4: Top Right - Team & Daily Clients ================= */}
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-[32px] p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
        >
          <div>
            <h3 className="font-bold text-slate-900 text-sm md:text-base leading-tight mb-3">
              Team of passionate designers and developers
            </h3>

            {/* Avatar Stack */}
            <div className="flex items-center -space-x-2">
              <img
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Team member"
              />
              <img
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                alt="Team member"
              />
              <img
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                alt="Team member"
              />
              <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-800 text-white text-[10px] font-bold flex items-center justify-center">
                +2
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="text-xs font-semibold text-slate-500">Daily New clients</div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">54</span>
              <span className="text-xs font-bold text-[#FF5C75]">+40%</span>
            </div>
          </div>
        </motion.div>

        {/* ================= CARD 5: Bottom Left - Smart Digital Agency ================= */}
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-[32px] p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
        >
          {/* Dark Pill Headline */}
          <div className="bg-slate-950 text-white p-3 rounded-2xl">
            <h3 className="font-bold text-sm leading-tight">
              Smart Digital Agency For Your Business
            </h3>
          </div>

          {/* Floating Person Cards */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="relative rounded-2xl overflow-hidden h-28 bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80"
                alt="Agent"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative rounded-2xl overflow-hidden h-28 bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80"
                alt="Agent"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* ================= CARD 6: Main Hero Central Card (Spans 2 cols, 2 rows) ================= */}
        <motion.div
          variants={cardVariants}
          className="md:col-span-2 md:row-span-2 bg-[#FDE8EC] rounded-[36px] p-6 md:p-8 flex flex-col justify-between relative overflow-hidden min-h-[380px]"
        >
          {/* Background Decorative Graphic */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-pink-300/40 pointer-events-none" />

          {/* Floating Widget 1: Top Right Chart */}
          <div className="float-element-1 absolute top-6 right-6 bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-md border border-white/50 text-[10px]">
            <div className="text-slate-400 font-semibold mb-1">Segmentation Age</div>
            <div className="flex items-end gap-1 h-8">
              <span className="w-1.5 bg-amber-400 h-3 rounded-full"></span>
              <span className="w-1.5 bg-amber-400 h-6 rounded-full"></span>
              <span className="w-1.5 bg-[#FF5C75] h-8 rounded-full"></span>
              <span className="w-1.5 bg-amber-400 h-4 rounded-full"></span>
              <span className="w-1.5 bg-amber-400 h-5 rounded-full"></span>
            </div>
          </div>

          {/* Hero Image Centered */}
          <div className="relative z-10 flex justify-center items-center my-auto">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"
                alt="Hero User"
                className="w-48 h-64 md:w-56 md:h-72 object-cover rounded-full border-4 border-white shadow-xl"
              />

              {/* Floating Badge: Video Views */}
              <div className="float-element-2 absolute bottom-12 -left-8 bg-white/95 backdrop-blur-md px-3 py-2 rounded-full shadow-lg flex items-center gap-2 border border-white">
                <div className="w-6 h-6 rounded-full bg-[#FF5C75] flex items-center justify-center text-white">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span className="text-xs font-bold text-slate-800">26,807</span>
              </div>

              {/* Floating Badge: Engagement Rate */}
              <div className="float-element-1 absolute -bottom-4 -right-8 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-white min-w-[130px]">
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                  <span>Engagement</span>
                  <Heart className="w-3 h-3 text-[#FF5C75] fill-[#FF5C75]" />
                </div>
                <div className="text-base font-black text-slate-900">19.46%</div>
                <div className="text-[10px] font-bold text-emerald-500 mt-0.5">
                  ▲ 102.48%
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= CARD 7: Middle Right - CUBO Brand ================= */}
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-[32px] p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
        >
          {/* Logo Icon */}
          <div className="w-12 h-12 mb-2 relative flex items-center justify-center">
            <div className="w-6 h-6 rounded-full border-2 border-slate-900 absolute -top-1 -left-1"></div>
            <div className="w-6 h-6 rounded-full border-2 border-slate-900 absolute -top-1 -right-1"></div>
            <div className="w-6 h-6 rounded-full border-2 border-slate-900 absolute bottom-0"></div>
          </div>
          <span className="text-xl font-black tracking-widest text-slate-900">CUBO</span>
        </motion.div>

        {/* ================= CARD 8: Bottom Middle Left - Font Spec ================= */}
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-[32px] p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
        >
          <div>
            <h4 className="text-xl font-bold text-slate-900">Font</h4>
            <p className="text-xs text-slate-500 mt-1">Sk- Modernist</p>
          </div>

          {/* Color Palette Samples */}
          <div className="flex items-center gap-2 mt-4">
            <div className="w-6 h-6 rounded-lg bg-slate-800"></div>
            <div className="w-6 h-6 rounded-lg bg-slate-300"></div>
            <div className="w-6 h-6 rounded-lg bg-[#FF5C75]"></div>
            <div className="w-6 h-6 rounded-lg bg-[#FDE8EC]"></div>
          </div>
        </motion.div>

        {/* ================= CARD 9: Bottom Right - Future Banner ================= */}
        <motion.div
          variants={cardVariants}
          className="md:col-span-2 bg-[#FDE8EC] rounded-[32px] p-6 md:p-8 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
        >
          <div className="max-w-xs z-10">
            <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">
              We Build Future of Design Industry
            </h3>
            <p className="text-xs text-slate-600 font-medium mt-2">
              Crafting Meaningful UX/UI Design
            </p>
          </div>

          {/* 3D Asterisk / Star Graphic Element */}
          <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
            <Sparkles className="w-16 h-16 text-slate-900 stroke-[1.5]" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}