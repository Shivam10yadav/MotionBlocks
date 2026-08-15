import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VerifyOtp() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-advance to next input
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
      setIsSubmitted(true);
    } else {
      // Trigger shake animation if incomplete
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div className="w-full flex justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 15 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          x: isShaking ? [-10, 10, -8, 8, -4, 4, 0] : 0,
        }}
        transition={{
          duration: 0.4,
          x: { duration: 0.4 },
        }}
        className="w-full max-w-sm rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-sm"
      >
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form
              key="otp-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              onSubmit={handleSubmit}
              className="flex flex-col items-center text-center"
            >
              {/* Animated Shield/Lock Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
                className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </motion.div>

              <h3 className="text-lg font-semibold text-slate-800">Verification Code</h3>
              <p className="mt-1 text-xs text-slate-500">
                Enter the 4-digit code sent to your device
              </p>

              {/* Staggered Animated Input Slots */}
              <div className="my-5 flex justify-center gap-2.5" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <motion.input
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      whileFocus={{ scale: 1.08, translateY: -2 }}
                      animate={digit ? { scale: [1, 1.15, 1] } : {}}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      className={`h-12 w-11 rounded-xl border text-center text-lg font-bold text-slate-700 outline-none transition-all ${
                        digit
                          ? 'border-indigo-500 bg-indigo-50/40 shadow-sm shadow-indigo-100 ring-2 ring-indigo-500/20'
                          : 'border-slate-200 bg-slate-50/60 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100'
                      }`}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={otp.some((digit) => digit === '')}
                className="w-full rounded-xl bg-indigo-600 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-200 transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
              >
                Verify Code
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 250, damping: 18 }}
              className="flex flex-col items-center py-2 text-center"
            >
              <motion.div
                initial={{ rotate: -45, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.15 }}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-sm"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>

              <motion.h4
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mt-3 text-base font-semibold text-slate-800"
              >
                Verified Successfully
              </motion.h4>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                onClick={() => {
                  setOtp(['', '', '', '']);
                  setIsSubmitted(false);
                }}
                className="mt-3 text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
              >
                Reset demo
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}