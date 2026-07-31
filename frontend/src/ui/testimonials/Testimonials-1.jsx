import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonialsData = [
  {
    id: 1,
    quote:
      "This library completely revolutionized how fast we build landing pages. The components are ridiculously polished, smooth, and effortless to integrate into our stack.",
    name: "Sophia Martinez",
    role: "Lead Product Designer",
    company: "Vortex Labs",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "The micro-animations and physics-based motion in these components added a level of luxury to our web app that our users mention in almost every feedback survey.",
    name: "Alexandre Dubois",
    role: "Senior Frontend Engineer",
    company: "Lumière Digital",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "Clean code, exceptional performance, and zero dependency bloat. Easily one of the best UI component sets I've used in years.",
    name: "Elena Rostova",
    role: "Co-Founder & CTO",
    company: "Aether AI",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250",
    rating: 5,
  },
];

export const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const current = testimonialsData[currentIndex];

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-50/50 p-8 sm:p-12 lg:p-16 antialiased selection:bg-indigo-100 selection:text-indigo-900">
      {/* Subtle Light Backdrop Glows */}
      <div className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-indigo-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-80 w-80 rounded-full bg-purple-100/50 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Decorative Watermark Quote Icon */}
        <Quote className="absolute -top-4 -left-4 h-24 w-24 text-slate-200/50 pointer-events-none" />

        {/* Dynamic Testimonial Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center text-center sm:items-start sm:text-left"
          >
            {/* Rating Stars */}
            <div className="flex items-center gap-1 text-amber-400">
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>

            {/* Testimonial Quote */}
            <p className="mt-6 text-2xl font-medium leading-relaxed tracking-tight text-slate-800 sm:text-3xl lg:text-4xl">
              "{current.quote}"
            </p>

            {/* Author Profile */}
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:items-center">
              <img
                src={current.avatar}
                alt={current.name}
                className="h-14 w-14 rounded-full border-2 border-white object-cover shadow-md shadow-slate-200"
              />
              <div>
                <h4 className="text-base font-semibold text-slate-900">{current.name}</h4>
                <p className="text-sm font-medium text-slate-500">
                  {current.role} at <span className="text-indigo-600 font-semibold">{current.company}</span>
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Navigation Controls */}
        <div className="mt-10 flex items-center justify-between border-t border-slate-200/80 pt-6">
          <div className="flex items-center gap-2">
            {testimonialsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "w-8 bg-indigo-600" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/80 bg-white text-slate-700 shadow-sm backdrop-blur-md transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/80 bg-white text-slate-700 shadow-sm backdrop-blur-md transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;