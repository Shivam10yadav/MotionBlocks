import React from 'react';
import { motion } from 'framer-motion';
import {
  MousePointerClick,
  SquareStack,
  LayoutTemplate,
  FileCheck2,
  TextCursorInput,
  Compass,
  Loader2,
  Type,
  Layers,
  ArrowUpRight,
} from 'lucide-react';

const CATEGORIES = [
  {
    id: 'buttons',
    title: 'Buttons',
    description: 'Interactive triggers with micro-animations and loading states.',
    count: 32,
    icon: MousePointerClick,
  },
  {
    id: 'cards',
    title: 'Cards',
    description: 'Versatile containers with glass effects and hover glows.',
    count: 24,
    icon: SquareStack,
  },
  {
    id: 'hero-sections',
    title: 'Hero Sections',
    description: 'High-impact entry layouts built to capture developer attention.',
    count: 18,
    icon: LayoutTemplate,
  },
  {
    id: 'forms',
    title: 'Forms',
    description: 'Accessible form layouts with multi-step validation flows.',
    count: 20,
    icon: FileCheck2,
  },
  {
    id: 'inputs',
    title: 'Inputs',
    description: 'Sleek text fields, selectors, switches, and search boxes.',
    count: 28,
    icon: TextCursorInput,
  },
  {
    id: 'navigation',
    title: 'Navigation',
    description: 'Floating headers, command palettes, and sidebars.',
    count: 16,
    icon: Compass,
  },
  {
    id: 'loaders',
    title: 'Loaders',
    description: 'Smooth progress indicators, skeletons, and spinners.',
    count: 22,
    icon: Loader2,
  },
  {
    id: 'text-effects',
    title: 'Text Effects',
    description: 'Gradient shifts, typewriter styles, and kinetic typography.',
    count: 19,
    icon: Type,
  },
  {
    id: 'backgrounds',
    title: 'Backgrounds',
    description: 'Subtle animated grids, particles, and blurred mesh gradients.',
    count: 14,
    icon: Layers,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

export default function Categories() {
  return (
    <section className="min-h-screen bg-[#0D1117] text-[#F8FAFC] py-20 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col items-start mb-14 space-y-3">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]" />
            Categories
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F8FAFC]">
            Browse by Category
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl leading-relaxed">
            Explore ready-to-use, accessible MotionBlocks components crafted for modern React applications.
          </p>
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.a
                key={cat.id}
                href={`#${cat.id}`}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="group relative flex flex-col justify-between p-6 rounded-2xl bg-[#161B22] border border-[#30363D] shadow-lg hover:border-[#06B6D4]/60 hover:shadow-[0_0_25px_rgba(6,182,212,0.12)] transition-all duration-300 ease-out overflow-hidden"
              >
                <div>
                  {/* Top Row: Icon + Count Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-xl bg-[#0D1117] border border-[#30363D] text-[#F8FAFC] group-hover:border-[#06B6D4]/40 group-hover:text-[#06B6D4] transition-colors duration-300">
                      <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                    </div>

                    <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-[#0D1117] border border-[#30363D] text-[#94A3B8] group-hover:text-[#F8FAFC] group-hover:border-[#30363D]/80 transition-colors duration-300">
                      {cat.count} Components
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-[#F8FAFC] mb-2 group-hover:text-[#06B6D4] transition-colors duration-300">
                    {cat.title}
                  </h3>

                  {/* One-Line Description */}
                  <p className="text-sm text-[#94A3B8] line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Bottom Row: Exploration Arrow Link */}
                <div className="mt-8 pt-4 border-t border-[#30363D]/50 flex items-center justify-between text-xs font-medium text-[#94A3B8] group-hover:text-[#F8FAFC] transition-colors duration-300">
                  <span>Explore library</span>
                  <ArrowUpRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#06B6D4] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}