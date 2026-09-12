import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import {
  Star,
  TrendingUp,
  DollarSign,
  Search,
  ArrowUpRight,
  ShieldCheck,
  CreditCard,
  Zap,
} from "lucide-react";

export default function EmeraldGrid() {
  const gridRef = useRef(null);

  // GSAP subtle floating effect for dynamic cards & badges
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".float-card-1", {
        y: -6,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
      gsap.to(".float-card-2", {
        y: 6,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 0.3,
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  // Framer motion container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <div className="min-h-screen bg-slate-100/70 p-4 md:p-10 flex items-center justify-center font-sans text-slate-900">
      <motion.div
        ref={gridRef}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-[minmax(190px,auto)]"
      >
        {/* ================= CARD 1: Left Tall Card (Mobile App Feature) ================= */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="md:col-span-4 md:row-span-2 bg-[#064E2E] text-white rounded-[36px] p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group shadow-lg shadow-emerald-950/10"
        >
          {/* Content Top */}
          <div className="z-10 relative">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight">
              Step By Step Guide <br /> To Manage Finance
            </h3>
            <p className="text-emerald-200/80 text-xs md:text-sm mt-3 font-normal leading-relaxed">
              Shop smarter and get rewarded! Earn cashback and exclusive deals
              every time.
            </p>
          </div>

          {/* Mobile Screen Mockup */}
          <div className="mt-8 relative flex justify-center translate-y-4 group-hover:translate-y-2 transition-transform duration-300">
            <div className="w-[240px] bg-white rounded-t-[36px] border-4 border-slate-900/10 p-4 pt-3 text-slate-900 shadow-2xl">
              {/* Dynamic Island / Notch Header */}
              <div className="flex justify-between items-center text-[10px] font-semibold text-slate-400 mb-4 px-2">
                <span>9:41</span>
                <div className="w-12 h-3 bg-slate-900 rounded-full"></div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-slate-900 rounded-full"></span>
                </div>
              </div>

              {/* Inside App Content */}
              <h4 className="text-lg font-extrabold leading-tight text-slate-900">
                Your debit card <br /> is ready!
              </h4>
              <p className="text-[10px] text-slate-400 mt-1 mb-4">
                Add your card to bauman studio and use your app to pay in-store and online.
              </p>

              {/* Virtual Card Graphic */}
              <div className="bg-gradient-to-br from-emerald-100 to-green-50 p-3 rounded-2xl border border-emerald-200/60 shadow-inner relative overflow-hidden min-h-[100px] flex flex-col justify-between">
                <span className="text-[11px] font-bold text-slate-700">
                  Muhamad, Hujaifa
                </span>
                <div className="w-7 h-5 rounded-md bg-emerald-500/20 flex items-center justify-center">
                  <div className="w-4 h-3 rounded border border-emerald-600"></div>
                </div>
                {/* Abstract Wave decorative SVG */}
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-emerald-500/20 rounded-full blur-md"></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= CARD 2: Top Right Wide (Account Management & Live Balance) ================= */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="md:col-span-8 bg-[#EBF7E9] rounded-[36px] p-6 md:p-8 flex flex-col md:flex-row justify-between relative overflow-hidden shadow-sm group"
        >
          {/* Text Left */}
          <div className="max-w-xs z-10 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                Account Management
              </h3>
              <p className="text-xs md:text-sm text-slate-500 mt-2">
                Easy access to balances, transactions, and statements.
              </p>
            </div>
          </div>

          {/* Phone Preview Floating right */}
          <div className="relative mt-6 md:mt-0 flex justify-center md:justify-end items-end">
            <div className="w-[230px] bg-white rounded-t-[32px] shadow-xl p-3 border border-slate-200/80 translate-y-6 group-hover:translate-y-4 transition-transform duration-300">
              {/* Phone Header */}
              <div className="flex items-center justify-between text-slate-400 mb-2 px-1">
                <Search className="w-3 h-3" />
                <span className="text-[10px] font-semibold text-slate-800">
                  Savings account
                </span>
                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
              </div>

              <div className="text-center my-2">
                <span className="text-lg font-black text-slate-900">$125,768.07</span>
              </div>

              <div className="flex gap-1 justify-center my-2">
                <span className="text-[9px] bg-slate-900 text-white px-2 py-0.5 rounded-full font-medium">
                  Deposit
                </span>
                <span className="text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                  Send
                </span>
              </div>
            </div>

            {/* Overlapping Badge Pill */}
            <div className="float-card-1 absolute bottom-4 -left-4 md:-left-10 bg-[#064E2E] text-white px-4 py-2.5 rounded-2xl shadow-lg border border-emerald-400/20 flex items-center justify-between gap-4 z-20">
              <div>
                <div className="text-[10px] text-emerald-300">Cards balance ⓘ</div>
                <div className="text-xs font-bold">$125,768.07</div>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.5 rounded-md">
                +14.5%
              </span>
            </div>
          </div>
        </motion.div>

        {/* ================= CARD 3: Middle Center (Trusted By Users) ================= */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="md:col-span-3 bg-[#EBF7E9] rounded-[36px] p-6 flex flex-col justify-center items-center text-center shadow-sm relative overflow-hidden"
        >
          <h4 className="text-xl font-bold text-slate-900 leading-tight">
            Trusted By <br /> 254k+ Users
          </h4>

          {/* User Avatars Row */}
          <div className="flex items-center justify-center -space-x-2 my-4">
            <img
              className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm"
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="User"
            />
            <img
              className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm"
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
              alt="User"
            />
            <img
              className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
              alt="User"
            />
            <img
              className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm"
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
              alt="User"
            />
            <div className="w-9 h-9 rounded-full border-2 border-white bg-[#064E2E] text-emerald-400 text-xs font-bold flex items-center justify-center gap-0.5 shadow-sm">
              5 <Star className="w-2.5 h-2.5 fill-current" />
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-600">
            <Star className="w-3.5 h-3.5 fill-slate-800 text-slate-800" />
            <span>Ratings from 48k+ Users</span>
          </div>
        </motion.div>

        {/* ================= CARD 4: Middle Right (Loan & Credit Services) ================= */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="md:col-span-5 bg-[#064E2E] text-white rounded-[36px] p-6 md:p-8 flex flex-col justify-between relative overflow-hidden shadow-lg shadow-emerald-950/10 group"
        >
          <div className="max-w-xs z-10">
            <h3 className="text-xl md:text-2xl font-bold leading-tight">
              Loan & Credit Services
            </h3>
            <p className="text-xs text-emerald-200/80 mt-2 leading-relaxed">
              Shop smarter and get rewarded! Earn cashback and exclusive deals
              every time
            </p>
          </div>

          {/* Floating Multi-Currency Cards Stack */}
          <div className="relative mt-6 flex justify-end">
            {/* Card 1: EUR */}
            <div className="float-card-1 bg-white text-slate-900 p-3 rounded-2xl shadow-xl w-36 border border-slate-100 z-10">
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-blue-600 flex items-center justify-center text-[7px] text-white font-bold">
                    €
                  </span>
                  <span>Main EUR account</span>
                </div>
              </div>
              <div className="text-sm font-extrabold text-slate-900 mt-1">
                2,598 EUR
              </div>
              <div className="text-[9px] font-bold text-emerald-500 mt-0.5">
                +9.87%
              </div>
            </div>

            {/* Card 2: USD Behind */}
            <div className="float-card-2 absolute -bottom-2 right-12 bg-white/95 text-slate-900 p-2.5 rounded-2xl shadow-md w-32 border border-slate-200 translate-y-2">
              <div className="text-[9px] text-slate-400">Main USD account</div>
              <div className="text-xs font-bold text-slate-800">1,486 USD</div>
            </div>
          </div>
        </motion.div>

        {/* ================= CARD 5: Bottom Left (Vibrant Lime Cashback Banner) ================= */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="md:col-span-7 bg-[#00E640] rounded-[36px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-md group"
        >
          <div className="max-w-xs mb-6 md:mb-0">
            <h3 className="text-xl md:text-2xl font-black text-slate-950 leading-tight">
              Awesome Deals With Pro Features
            </h3>
            <p className="text-xs font-semibold text-slate-900/80 mt-2">
              Online applications for loans, credit cards, and mortgages
            </p>
          </div>

          {/* Cashback Pill Badge Card */}
          <div className="bg-[#064E2E] text-white p-4 rounded-3xl shadow-xl border border-emerald-400/20 max-w-xs w-full md:w-auto transform group-hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center font-bold text-xs">
                $
              </div>
              <span className="text-sm font-bold text-white">
                Receive 10% Cashback
              </span>
            </div>
            <p className="text-[10px] text-emerald-200/70 leading-normal pl-8">
              Upgrade your subscription to get more exciting discount plans from top brands
            </p>
          </div>
        </motion.div>

        {/* ================= CARD 6: Bottom Right (Track Finance & Donut Chart) ================= */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="md:col-span-5 bg-[#EBF7E9] rounded-[36px] p-6 md:p-8 flex items-center justify-between relative overflow-hidden shadow-sm"
        >
          <div className="max-w-[170px] z-10">
            <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-tight">
              Track Your Finance With Ease
            </h3>
            <p className="text-xs text-slate-500 mt-2">
              Quick money transfers, bill payments, and mobile deposits
            </p>
          </div>

          {/* Donut Chart Widget Card */}
          <div className="bg-white rounded-2xl p-3 shadow-md border border-slate-100 min-w-[150px] text-center">
            <div className="text-[9px] font-semibold text-slate-400 text-left">
              Monthly Expenses
            </div>
            <div className="text-[8px] text-slate-400 text-left mb-2">
              You're using 60% of available budgets
            </div>

            {/* Circular Progress SVG */}
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center my-1">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#9333EA]"
                  strokeDasharray="60, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#00E640]"
                  strokeDasharray="25, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-xs font-black text-slate-900">$2,400</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}