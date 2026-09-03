import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaCheck, FaPaperPlane } from 'react-icons/fa';

export default function DarkContact() {
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  
  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', budget: '$25k - $50k', message: '' });
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Magnetic Button Micro-Interaction
  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(buttonRef.current, {
      x: x * 0.35,
      y: y * 0.35,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  // Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split Text Stagger Reveal
      gsap.from('.reveal-text', {
        yPercent: 120,
        rotateX: -10,
        duration: 1.1,
        stagger: 0.08,
        ease: 'power4.out',
      });

      // Expand dividers with elastic feel
      gsap.from('.divider-line', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.4,
        stagger: 0.1,
        ease: 'expo.out',
        delay: 0.2,
      });

      // Staggered entry for inputs
      gsap.from('.form-row', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.3,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1600);
  };

  const budgetOptions = ['< $10k', '$10k - $25k', '$25k - $50k', '$50k+'];

  const directContacts = [
    { label: 'Direct Line', value: 'hello@deepcode.io', note: 'Response ~ 2h' },
    { label: 'Global Call', value: '+1 (415) 890-1234', note: 'Mon — Fri / PST' },
    { label: 'Studio Base', value: '799 Market St, SF', note: 'Appointment Only' },
  ];

  return (
    <section 
      ref={containerRef} 
      className="w-full min-h-screen bg-black text-white py-20 px-6 sm:px-12 lg:px-20 font-sans flex items-center justify-center selection:bg-emerald-400 selection:text-black overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
        
        {/* Left Editorial Header & Details */}
        <div className="lg:col-span-5 flex flex-col justify-between min-h-[72vh]">
          <div>
            <div className="overflow-hidden mb-3">
              <span className="reveal-text block text-xs tracking-[0.25em] text-emerald-400 uppercase font-mono">
                [ 01 // DIRECT CHANNEL ]
              </span>
            </div>

            <div className="overflow-hidden">
              <h1 className="reveal-text text-5xl sm:text-7xl font-light tracking-tight leading-[0.92] text-white">
                LET'S MAKE <br />
                <span className="italic font-normal text-zinc-400">AN IMPACT</span>
                <span className="text-emerald-400">.</span>
              </h1>
            </div>

            <div className="overflow-hidden mt-6">
              <p className="reveal-text text-base text-zinc-300 leading-relaxed font-normal max-w-sm">
                Engineering platforms, design systems, and digital products for high-growth teams.
              </p>
            </div>
          </div>

          {/* Contact Details List */}
          <div className="mt-12 space-y-5">
            <div className="divider-line w-full h-[1px] bg-zinc-800" />
            {directContacts.map((contact, idx) => (
              <div key={idx} className="group py-1.5 flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] text-zinc-500 font-mono block uppercase tracking-wider mb-0.5">
                    0{idx + 1} / {contact.label}
                  </span>
                  <span className="text-lg font-medium text-white group-hover:text-emerald-400 transition-colors duration-300">
                    {contact.value}
                  </span>
                </div>
                <span className="text-xs text-zinc-500 font-mono">
                  {contact.note}
                </span>
              </div>
            ))}
            <div className="divider-line w-full h-[1px] bg-zinc-800" />
          </div>

          {/* Availability Indicator */}
          <div className="mt-8 pt-4 flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span>SAN FRANCISCO, CA</span>
            <span className="flex items-center gap-2 font-medium text-white">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Q3/Q4 AVAILABLE
            </span>
          </div>
        </div>

        {/* Right Editorial Interactive Form */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                onSubmit={handleSubmit} 
                className="space-y-10"
              >
                {/* Inputs: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  
                  {/* Name Input */}
                  <div className="form-row relative group">
                    <div className="flex justify-between items-center mb-2">
                      <label 
                        className={`text-xs uppercase tracking-wider font-mono transition-colors duration-300 ${
                          focusedField === 'name' ? 'text-emerald-400' : 'text-zinc-400'
                        }`}
                      >
                        01 // Your Name *
                      </label>
                      {formData.name && <FaCheck className="text-xs text-emerald-400" />}
                    </div>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Alex Morgan"
                      className="w-full bg-transparent border-b-2 border-zinc-800 py-3 text-xl text-white placeholder-zinc-600 outline-none transition-colors duration-300 focus:border-emerald-400"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="form-row relative group">
                    <div className="flex justify-between items-center mb-2">
                      <label 
                        className={`text-xs uppercase tracking-wider font-mono transition-colors duration-300 ${
                          focusedField === 'email' ? 'text-emerald-400' : 'text-zinc-400'
                        }`}
                      >
                        02 // Email Address *
                      </label>
                      {formData.email && <FaCheck className="text-xs text-emerald-400" />}
                    </div>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full bg-transparent border-b-2 border-zinc-800 py-3 text-xl text-white placeholder-zinc-600 outline-none transition-colors duration-300 focus:border-emerald-400"
                    />
                  </div>
                </div>

                {/* Micro-Interaction: Budget Selector Pills */}
                <div className="form-row">
                  <label className="block text-xs uppercase tracking-wider font-mono text-zinc-400 mb-4">
                    03 // Project Scope / Budget
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {budgetOptions.map((option) => {
                      const isSelected = formData.budget === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setFormData({ ...formData, budget: option })}
                          className={`relative px-5 py-2.5 rounded-full text-xs font-mono transition-all duration-300 border ${
                            isSelected
                              ? 'bg-emerald-400 text-black border-emerald-400 font-bold scale-105 shadow-[0_0_20px_rgba(52,211,153,0.3)]'
                              : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-500 hover:text-white'
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Input: Message */}
                <div className="form-row relative group">
                  <div className="flex justify-between items-center mb-2">
                    <label 
                      className={`text-xs uppercase tracking-wider font-mono transition-colors duration-300 ${
                        focusedField === 'message' ? 'text-emerald-400' : 'text-zinc-400'
                      }`}
                    >
                      04 // Project Details *
                    </label>
                    {formData.message && <FaCheck className="text-xs text-emerald-400" />}
                  </div>
                  <textarea
                    required
                    rows={3}
                    value={formData.message}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe your objectives, scope, or timeline..."
                    className="w-full bg-transparent border-b-2 border-zinc-800 py-3 text-xl text-white placeholder-zinc-600 outline-none transition-colors duration-300 focus:border-emerald-400 resize-none"
                  />
                </div>

                {/* Magnetic Interactive Submit Button */}
                <div className="form-row pt-4 flex items-center justify-between">
                  <div 
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="inline-block"
                  >
                    <button
                      ref={buttonRef}
                      type="submit"
                      disabled={isSubmitting}
                      className="relative group inline-flex items-center gap-6 px-10 py-5 rounded-full bg-white text-black text-sm font-semibold overflow-hidden transition-colors duration-300 hover:bg-emerald-400 disabled:opacity-70 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      ) : (
                        <>
                          <span className="relative z-10">TRANSMIT MESSAGE</span>
                          <span className="relative z-10 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-black group-hover:text-emerald-400">
                            <FaArrowRight className="text-xs -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                          </span>
                        </>
                      )}
                    </button>
                  </div>

                  <span className="text-[10px] font-mono text-zinc-500 uppercase hidden sm:block">
                    [ Encrypted Transmission ]
                  </span>
                </div>
              </motion.form>
            ) : (
              /* Success State Reveal */
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-16 space-y-6"
              >
                <div className="w-16 h-16 rounded-full border border-emerald-400 flex items-center justify-center text-emerald-400 text-xl">
                  <FaCheck />
                </div>
                <div>
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-1">
                    // Transmission Received
                  </span>
                  <h3 className="text-4xl font-light text-white">Message Logged.</h3>
                  <p className="text-base text-zinc-300 mt-3 max-w-md leading-relaxed font-normal">
                    Thank you, <span className="text-white font-semibold">{formData.name}</span>. Our lead team has received your project details ({formData.budget}) and will reach out shortly.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', budget: '$25k - $50k', message: '' });
                  }}
                  className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-emerald-400 uppercase tracking-wider transition-colors pt-6"
                >
                  <FaPaperPlane className="text-[10px]" /> Reset & Send Another
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}