import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import {
  FiLock,
  FiMail,
  FiUser,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiCheckCircle,
} from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Sparkles } from 'lucide-react';

export default function AnimatedAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  // GSAP Animation Refs
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const tabIndicatorRef = useRef(null);
  const formFieldsRef = useRef(null);
  const nameFieldRef = useRef(null);
  const floatCard1Ref = useRef(null);
  const floatCard2Ref = useRef(null);

  // Initial Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main Card Fade & Slide Up
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' }
      );

      // Staggered Form Elements Fade In
      gsap.fromTo(
        '.gsap-fade-in',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out', delay: 0.3 }
      );

      // Floating Dynamic Cards Animation
      gsap.to(floatCard1Ref.current, {
        y: -12,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });

      gsap.to(floatCard2Ref.current, {
        y: 12,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 0.5
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Handle Tab Switch Animation
  const handleTabChange = (toLogin) => {
    if (isLogin === toLogin) return;

    // Animate Tab Active Indicator
    gsap.to(tabIndicatorRef.current, {
      xPercent: toLogin ? 0 : 100,
      duration: 0.4,
      ease: 'power3.inOut'
    });

    // Fade Out Current Content, Update State, Fade In New Content
    gsap.to(formFieldsRef.current, {
      opacity: 0,
      y: toLogin ? -10 : 10,
      duration: 0.2,
      onComplete: () => {
        setIsLogin(toLogin);
        gsap.fromTo(
          formFieldsRef.current,
          { opacity: 0, y: toLogin ? 10 : -10 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
        );
      }
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#f8fafc] text-slate-800 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-hidden font-sans"
    >
      {/* Ambient Gradient Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-indigo-200/50 to-pink-200/40 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-tl from-blue-200/50 to-purple-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glassmorphic Card */}
      <div
        ref={cardRef}
        className="relative z-10 w-full max-w-5xl bg-white/75 backdrop-blur-2xl rounded-3xl border border-white/80 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] grid grid-cols-1 lg:grid-cols-12 overflow-hidden"
      >
        {/* Left Section: Auth Form */}
        <div className="lg:col-span-7 p-8 sm:p-12 md:p-14 flex flex-col justify-between">
          <div>
            {/* Branding Header */}
            <div className="gsap-fade-in flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-md">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="font-bold text-xl tracking-tight text-slate-900">Aura</span>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                GSAP Animated
              </span>
            </div>

            {/* GSAP Segmented Switch */}
            <div className="gsap-fade-in relative flex bg-slate-100/80 p-1.5 rounded-2xl mb-8 border border-slate-200/60">
              <div
                ref={tabIndicatorRef}
                className="absolute top-1.5 bottom-1.5 left-1.5 w-[calc(50%-0.375rem)] rounded-xl bg-white shadow-sm border border-slate-200/50 pointer-events-none"
              />
              <button
                type="button"
                onClick={() => handleTabChange(true)}
                className={`relative flex-1 py-2.5 text-sm font-semibold transition-colors duration-300 z-10 ${
                  isLogin ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => handleTabChange(false)}
                className={`relative flex-1 py-2.5 text-sm font-semibold transition-colors duration-300 z-10 ${
                  !isLogin ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Form Fields Container */}
            <div ref={formFieldsRef}>
              {/* Dynamic Form Header */}
              <div className="mb-6">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {isLogin ? 'Welcome back.' : 'Start your journey.'}
                </h1>
                <p className="text-slate-500 mt-2 text-sm sm:text-base">
                  {isLogin
                    ? 'Enter your credentials to access your workspace.'
                    : 'Join thousands of creators building the future today.'}
                </p>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-3 px-4 border border-slate-200 rounded-2xl bg-white text-slate-700 font-medium text-sm shadow-sm hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98] transition-all"
                >
                  <FcGoogle className="w-5 h-5" />
                  <span>Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-3 px-4 border border-slate-200 rounded-2xl bg-white text-slate-700 font-medium text-sm shadow-sm hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98] transition-all"
                >
                  <FaGithub className="w-5 h-5 text-slate-900" />
                  <span>GitHub</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex items-center justify-center mb-6">
                <div className="w-full border-t border-slate-200" />
                <span className="absolute bg-white/80 backdrop-blur-md px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Or continue with email
                </span>
              </div>

              {/* Inputs Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div ref={nameFieldRef}>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Alex Morgan"
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50/70 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white text-slate-800 placeholder-slate-400 transition-all font-medium text-sm"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@example.com"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50/70 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white text-slate-800 placeholder-slate-400 transition-all font-medium text-sm"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Password
                    </label>
                    {isLogin && (
                      <a href="#forgot" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                        Forgot password?
                      </a>
                    )}
                  </div>
                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••••••"
                      className="w-full pl-12 pr-12 py-3.5 bg-slate-50/70 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white text-slate-800 placeholder-slate-400 transition-all font-medium text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full mt-2 py-4 px-6 bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white font-semibold rounded-2xl shadow-xl shadow-slate-900/10 flex items-center justify-center gap-2 group transition-all"
                >
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>

          {/* Footer Terms */}
          <p className="gsap-fade-in text-xs text-slate-400 mt-8 text-center sm:text-left">
            By continuing, you agree to Aura's{' '}
            <a href="#terms" className="underline hover:text-slate-600">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#privacy" className="underline hover:text-slate-600">
              Privacy Policy
            </a>
            .
          </p>
        </div>

        {/* Right Section: Award-Style Hero Showcase Panel */}
        <div className="hidden lg:flex lg:col-span-5 relative bg-gradient-to-br from-indigo-50/80 via-slate-100/50 to-pink-50/50 p-12 flex-col justify-between border-l border-slate-200/50 overflow-hidden">
          {/* Subtle Ambient Glows */}
          <div className="absolute top-12 right-12 w-48 h-48 bg-indigo-300/30 rounded-full blur-2xl" />
          <div className="absolute bottom-12 left-12 w-48 h-48 bg-pink-300/30 rounded-full blur-2xl" />

          {/* Live System Indicator */}
          <div className="gsap-fade-in relative z-10 flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold tracking-wide text-slate-600 uppercase">
              System Operational
            </span>
          </div>

          {/* Centerpiece Floating Cards (GSAP Managed) */}
          <div className="relative z-10 my-auto py-12">
            <div
              ref={floatCard1Ref}
              className="bg-white/80 backdrop-blur-xl border border-white p-6 rounded-3xl shadow-xl mb-6 transform -rotate-2 hover:rotate-0 transition-transform duration-500"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-600">
                  <FiCheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Smart Automation</h4>
                  <p className="text-xs text-slate-500">Real-time workflow integration</p>
                </div>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full w-[80%] rounded-full" />
              </div>
            </div>

            <div
              ref={floatCard2Ref}
              className="bg-white/90 backdrop-blur-xl border border-white p-6 rounded-3xl shadow-xl ml-8 transform rotate-3 hover:rotate-0 transition-transform duration-500"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Active Users
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  +24% this week
                </span>
              </div>
              <p className="text-2xl font-black text-slate-900">142,850</p>
            </div>
          </div>

          {/* Award Testimonial Section */}
          <div className="gsap-fade-in relative z-10">
            <blockquote className="text-slate-700 text-sm font-medium leading-relaxed mb-4">
              "Aura has completely transformed how our design team operates. The speed and quality are unmatched."
            </blockquote>
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div>
                <p className="text-xs font-bold text-slate-900">Sophia Chen</p>
                <p className="text-[11px] text-slate-500">Design Lead at StudioX</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}