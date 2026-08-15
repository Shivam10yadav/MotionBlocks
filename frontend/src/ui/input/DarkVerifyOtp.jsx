import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DarkVerifyOtp() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-advance
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, 4).split('');
    const newOtp = [...otp];
    pasteData.forEach((char, index) => {
      if (!isNaN(char) && index < 4) {
        newOtp[index] = char;
      }
    });
    setOtp(newOtp);
    if (pasteData.length > 0) {
      inputRefs.current[Math.min(pasteData.length - 1, 3)]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.every((digit) => digit !== '')) {
      setIsVerifying(true);
      setTimeout(() => {
        setIsVerifying(false);
        setIsSubmitted(true);
      }, 1200);
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div className="w-full flex justify-center p-4">
      {/* Container Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          x: isShaking ? [-12, 12, -8, 8, -4, 4, 0] : 0,
        }}
        transition={{ duration: 0.4, x: { duration: 0.4 } }}
        className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-cyan-500/20 bg-slate-950/80 p-6 shadow-2xl shadow-cyan-950/50 backdrop-blur-xl"
      >
        {/* Subtle Background Grid Glow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#08334415_1px,transparent_1px),linear-gradient(to_bottom,#08334415_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

        {/* Top Glow Accent Bar */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[1px]" />

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form
              key="otp-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
              transition={{ duration: 0.25 }}
              onSubmit={handleSubmit}
              className="relative z-10 flex flex-col items-center text-center"
            >
              {/* Animated Cyber Lock Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="relative mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-950/40 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </motion.div>

              <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-200">
                Security Access
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Enter authorization key code
              </p>

              {/* Digit Inputs Grid */}
              <div className="my-6 flex justify-center gap-2.5" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * index }}
                    className="relative"
                  >
                    <motion.input
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      whileFocus={{ scale: 1.05 }}
                      animate={digit ? { scale: [1, 1.12, 1] } : {}}
                      className={`h-12 w-11 rounded-xl border text-center text-lg font-mono font-bold outline-none transition-all duration-300 ${
                        digit
                          ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.25)] ring-1 ring-cyan-400/50'
                          : 'border-slate-800 bg-slate-900/60 text-slate-200 focus:border-cyan-500 focus:bg-slate-900 focus:shadow-[0_0_10px_rgba(6,182,212,0.15)]'
                      }`}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Verification Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isVerifying}
                className="relative w-full overflow-hidden rounded-xl border border-cyan-500/40 bg-gradient-to-r from-cyan-950 via-slate-900 to-cyan-950 py-2.5 text-xs font-semibold uppercase tracking-wider text-cyan-300 shadow-lg shadow-cyan-950/60 transition-all hover:border-cyan-400 hover:text-white disabled:cursor-wait"
              >
                {/* Scanner Beam Animation during submit */}
                {isVerifying && (
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
                  />
                )}
                {isVerifying ? 'Authenticating...' : 'Authenticate'}
              </motion.button>
            </motion.form>
          ) : (
            /* Success State */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 16 }}
              className="relative z-10 flex flex-col items-center py-4 text-center"
            >
              <motion.div
                initial={{ rotate: -90, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 14 }}
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/40 bg-emerald-950/30 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>

              <motion.h4
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mt-4 text-sm font-semibold uppercase tracking-wider text-slate-100"
              >
                Access Granted
              </motion.h4>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                onClick={() => {
                  setOtp(['', '', '', '']);
                  setIsSubmitted(false);
                }}
                className="mt-4 text-xs font-mono text-cyan-400 hover:text-cyan-300 hover:underline"
              >
                [ Re-initialize ]
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}