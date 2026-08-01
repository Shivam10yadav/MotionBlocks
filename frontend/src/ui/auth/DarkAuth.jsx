import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiLock, FiUser, FiArrowRight, FiShield } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaApple } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

const DarkAuth = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <section className="w-full min-h-screen bg-[#08090D] flex items-stretch text-[#F4F3F1] overflow-hidden">
      {/* Left Visual Panel */}
      <div className="hidden lg:flex w-1/2 bg-[#0B0D12] border-r border-[#23262F] p-12 relative flex-col justify-between overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#06B6D4]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-[#00F5D4] text-[#08090D] flex items-center justify-center font-black">
            M
          </div>
          <span className="font-extrabold tracking-wider text-sm uppercase text-[#F4F3F1]">
            MotionBlocks
          </span>
        </div>

        <div className="relative z-10 space-y-6 max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#06B6D4]/30 bg-[#06B6D4]/10 px-3.5 py-1.5 text-xs font-semibold text-[#00F5D4]"
          >
            <HiSparkles className="text-sm" /> Developer Registry Access
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight leading-tight text-[#F4F3F1]"
          >
            Engineered UI components for modern web apps.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm text-[#8B8D98] leading-relaxed"
          >
            Join thousands of developers building ultra-responsive React interfaces powered by Tailwind CSS and Framer Motion.
          </motion.p>
        </div>

        <div className="relative z-10 flex items-center gap-3 text-xs text-[#5C5F6B]">
          <FiShield className="text-[#00F5D4] text-base" />
          <span>Encrypted Session • Zero-Trust Access</span>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm space-y-6"
        >
          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#F4F3F1]">
              {isSignUp ? "Create account" : "Sign in"}
            </h2>
            <p className="text-xs sm:text-sm text-[#8B8D98]">
              {isSignUp
                ? "Enter your details to create a new developer account"
                : "Choose your authentication provider or use email"}
            </p>
          </div>

          {/* Animated Tab Switcher */}
          <div className="relative flex rounded-xl bg-[#111319] p-1 border border-[#23262F]">
            <button
              type="button"
              onClick={() => setIsSignUp(false)}
              className={`relative z-10 w-1/2 py-2 text-xs font-semibold transition-colors duration-200 ${
                !isSignUp ? "text-[#08090D]" : "text-[#8B8D98]"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsSignUp(true)}
              className={`relative z-10 w-1/2 py-2 text-xs font-semibold transition-colors duration-200 ${
                isSignUp ? "text-[#08090D]" : "text-[#8B8D98]"
              }`}
            >
              Sign Up
            </button>
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg bg-[#00F5D4] ${
                isSignUp ? "left-[calc(50%+2px)]" : "left-1"
              }`}
            />
          </div>

          {/* OAuth Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl border border-[#23262F] bg-[#111319] py-2.5 text-xs font-semibold text-[#F4F3F1] transition-all hover:bg-[#1A1D26] hover:border-[#323644]"
            >
              <FcGoogle className="text-lg" />
              <span className="hidden sm:inline">Google</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl border border-[#23262F] bg-[#111319] py-2.5 text-xs font-semibold text-[#F4F3F1] transition-all hover:bg-[#1A1D26] hover:border-[#323644]"
            >
              <FaGithub className="text-lg text-[#F4F3F1]" />
              <span className="hidden sm:inline">GitHub</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl border border-[#23262F] bg-[#111319] py-2.5 text-xs font-semibold text-[#F4F3F1] transition-all hover:bg-[#1A1D26] hover:border-[#323644]"
            >
              <FaApple className="text-lg text-[#F4F3F1]" />
              <span className="hidden sm:inline">Apple</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-[#23262F]" />
            <span className="absolute bg-[#08090D] px-3 text-[11px] font-semibold uppercase tracking-wider text-[#5C5F6B]">
              Or continue with email
            </span>
          </div>

          {/* Form */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <AnimatePresence mode="wait">
              {isSignUp && (
                <motion.div
                  key="name-field"
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-1.5"
                >
                  <label className="text-xs font-medium text-[#8B8D98]">Full Name</label>
                  <div className="relative">
                    <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5C5F6B] text-base" />
                    <input
                      type="text"
                      placeholder="Shivam Yadav"
                      className="w-full rounded-xl border border-[#23262F] bg-[#111319] pl-10 pr-4 py-2.5 text-sm text-[#F4F3F1] placeholder-[#5C5F6B] transition-all focus:border-[#00F5D4] focus:outline-none focus:ring-1 focus:ring-[#00F5D4]"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#8B8D98]">Work Email</label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5C5F6B] text-base" />
                <input
                  type="email"
                  placeholder="developer@company.com"
                  className="w-full rounded-xl border border-[#23262F] bg-[#111319] pl-10 pr-4 py-2.5 text-sm text-[#F4F3F1] placeholder-[#5C5F6B] transition-all focus:border-[#00F5D4] focus:outline-none focus:ring-1 focus:ring-[#00F5D4]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-[#8B8D98]">Password</label>
                {!isSignUp && (
                  <button
                    type="button"
                    className="text-xs font-medium text-[#00F5D4] hover:underline bg-transparent border-none p-0 cursor-pointer"
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5C5F6B] text-base" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-[#23262F] bg-[#111319] pl-10 pr-4 py-2.5 text-sm text-[#F4F3F1] placeholder-[#5C5F6B] transition-all focus:border-[#00F5D4] focus:outline-none focus:ring-1 focus:ring-[#00F5D4]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#00F5D4] py-2.5 text-sm font-bold text-[#08090D] shadow-lg shadow-[#00F5D4]/10 transition-all hover:bg-[#06B6D4] hover:scale-[1.01] active:scale-[0.99]"
            >
              <span>{isSignUp ? "Create Account" : "Continue to Dashboard"}</span>
              <FiArrowRight className="text-base" />
            </button>
          </form>

          {/* Toggle Helper */}
          <p className="text-center text-xs text-[#8B8D98]">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-bold text-[#00F5D4] hover:underline bg-transparent border-none p-0 cursor-pointer ml-1"
            >
              {isSignUp ? "Sign in" : "Create one now"}
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default DarkAuth;