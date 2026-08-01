import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiLock, FiUser, FiArrowRight } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaApple } from "react-icons/fa";

const LightAuth = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <section className="w-full min-h-screen bg-[#F8FAFC] py-16 px-4 flex items-center justify-center text-[#0F172A]">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-[#FFFFFF] border border-[#E2E8F0] rounded-3xl p-8 shadow-xl shadow-[#0F172A]/5 space-y-6 relative overflow-hidden"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#0EA5E9]/10 text-[#0284C7] font-bold text-lg">
            M
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-[#0F172A]">
            {isSignUp ? "Create an account" : "Welcome back"}
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            {isSignUp
              ? "Enter your details to start building"
              : "Enter your credentials to access your dashboard"}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="relative flex rounded-2xl bg-[#F1F5F9] p-1">
          <button
            type="button"
            onClick={() => setIsSignUp(false)}
            className={`relative z-10 w-1/2 py-2 text-xs font-semibold transition-colors duration-200 ${
              !isSignUp ? "text-[#0F172A]" : "text-[#64748B]"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsSignUp(true)}
            className={`relative z-10 w-1/2 py-2 text-xs font-semibold transition-colors duration-200 ${
              isSignUp ? "text-[#0F172A]" : "text-[#64748B]"
            }`}
          >
            Sign Up
          </button>
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-xl bg-[#FFFFFF] shadow-sm ${
              isSignUp ? "left-[calc(50%+2px)]" : "left-1"
            }`}
          />
        </div>

        {/* OAuth Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] py-2.5 text-xs font-semibold text-[#334155] transition-all hover:bg-[#F8FAFC] hover:border-[#CBD5E1]"
          >
            <FcGoogle className="text-lg" />
            <span className="hidden sm:inline">Google</span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] py-2.5 text-xs font-semibold text-[#334155] transition-all hover:bg-[#F8FAFC] hover:border-[#CBD5E1]"
          >
            <FaGithub className="text-lg text-[#0F172A]" />
            <span className="hidden sm:inline">GitHub</span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] py-2.5 text-xs font-semibold text-[#334155] transition-all hover:bg-[#F8FAFC] hover:border-[#CBD5E1]"
          >
            <FaApple className="text-lg text-[#0F172A]" />
            <span className="hidden sm:inline">Apple</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="w-full border-t border-[#F1F5F9]" />
          <span className="absolute bg-[#FFFFFF] px-3 text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">
            Or continue with email
          </span>
        </div>

        {/* Form Body */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <AnimatePresence mode="wait">
            {isSignUp && (
              <motion.div
                key="name-input"
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-1.5"
              >
                <label className="text-xs font-semibold text-[#334155]">Full Name</label>
                <div className="relative">
                  <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] text-base" />
                  <input
                    type="text"
                    placeholder="Shivam Yadav"
                    className="w-full rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] pl-10 pr-4 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] transition-all focus:border-[#0284C7] focus:outline-none focus:ring-4 focus:ring-[#0EA5E9]/10"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#334155]">Email Address</label>
            <div className="relative">
              <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] text-base" />
              <input
                type="email"
                placeholder="name@company.com"
                className="w-full rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] pl-10 pr-4 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] transition-all focus:border-[#0284C7] focus:outline-none focus:ring-4 focus:ring-[#0EA5E9]/10"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[#334155]">Password</label>
              {!isSignUp && (
                <a href="#forgot" className="text-xs font-semibold text-[#0284C7] hover:underline">
                  Forgot?
                </a>
              )}
            </div>
            <div className="relative">
              <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] text-base" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] pl-10 pr-4 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] transition-all focus:border-[#0284C7] focus:outline-none focus:ring-4 focus:ring-[#0EA5E9]/10"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0284C7] py-2.5 text-sm font-bold text-[#FFFFFF] shadow-lg shadow-[#0284C7]/20 transition-all hover:bg-[#0369A1] hover:scale-[1.01] active:scale-[0.99]"
          >
            <span>{isSignUp ? "Create Account" : "Sign In"}</span>
            <FiArrowRight className="text-base" />
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default LightAuth;