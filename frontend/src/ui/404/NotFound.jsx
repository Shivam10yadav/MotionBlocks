import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Sparkles } from "lucide-react";

export const NotFound = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-slate-50 text-slate-800 antialiased selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Subtle Light-Theme Ambient Gradient Glows */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[450px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-b from-indigo-200/60 via-purple-100/40 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-1/3 h-[400px] w-[500px] rounded-full bg-gradient-to-t from-pink-200/50 via-indigo-100/30 to-transparent blur-3xl" />

      {/* Floating Decorative Elements */}
      <motion.div
        className="pointer-events-none absolute top-1/4 left-1/6 hidden lg:block"
        animate={{
          y: [-10, 10, -10],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-white/70 px-4 py-2.5 shadow-xl shadow-slate-200/50 backdrop-blur-md">
          <Sparkles className="h-4 w-4 text-indigo-500" />
          <span className="font-mono text-xs font-medium text-slate-500">Lost in Space</span>
        </div>
      </motion.div>

      {/* Main Content Card Container */}
      <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center px-6 text-center">
        
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-indigo-50/80 px-3.5 py-1.5 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500" />
          </span>
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Error 404
          </span>
        </motion.div>

        {/* Animated Floating 404 Headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mt-6 select-none"
        >
          <motion.h1
            animate={{ y: [-6, 6, -6] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="font-display text-8xl font-black tracking-tight text-slate-900 sm:text-9xl"
          >
            4
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              0
            </span>
            4
          </motion.h1>
        </motion.div>

        {/* Text Details */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="mt-4 text-2xl font-semibold text-slate-900 sm:text-3xl">
            Page not found
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-500 sm:text-lg">
            Sorry, we couldn’t find the page you’re looking for. It might have been moved, renamed, or no longer exists.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <a
            href="/"
            className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-slate-900/10 transition-all duration-200 hover:bg-slate-800 hover:shadow-2xl hover:shadow-slate-900/20 active:scale-[0.98]"
          >
            <Home className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
            <span>Back to Home</span>
          </a>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200/80 bg-white/80 px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-md transition-all duration-200 hover:border-slate-300 hover:bg-white hover:text-slate-900 active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Go Back</span>
          </button>
        </motion.div>
      </div>

      {/* Footer copyright / Branding */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute bottom-6 text-center font-mono text-xs text-slate-400"
      >
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </motion.footer>
    </div>
  );
};

export default NotFound;