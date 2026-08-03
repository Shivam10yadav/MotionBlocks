import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import {
  MousePointerClick,
  LayoutTemplate,
  KeyRound,
  ShoppingCart,
  Megaphone,
  Quote,
  HelpCircle,
  Users,
  Type,
  Loader2,
  Images,
  ListOrdered,
  Ghost,
  Layers,
  ArrowUpRight,
  Search,
  Sparkles,
  Grid,
} from "lucide-react";
import { categories } from "../data/categories";
import { components } from "../data/components";

const CATEGORY_META = {
  buttons: { icon: MousePointerClick, description: "Interactive triggers with micro-animations and loading states." },
  hero: { icon: LayoutTemplate, description: "High-impact entry layouts built to capture attention." },
  auth: { icon: KeyRound, description: "Sign-in, sign-up, and authentication flows." },
  ecommerce: { icon: ShoppingCart, description: "Product cards, checkout, and shopping components." },
  "cta-sections": { icon: Megaphone, description: "Conversion-focused call-to-action blocks." },
  testimonials: { icon: Quote, description: "Social proof layouts and customer quotes." },
  faq: { icon: HelpCircle, description: "Accordion and expandable question layouts." },
  about: { icon: Users, description: "Team, mission, and story sections." },
  "text-effects": { icon: Type, description: "Gradient shifts, typewriter styles, kinetic typography." },
  loaders: { icon: Loader2, description: "Smooth progress indicators, skeletons, and spinners." },
  galleries: { icon: Images, description: "Image grids, lightboxes, and carousels." },
  pagination: { icon: ListOrdered, description: "Page controls and infinite-scroll patterns." },
  "404-pages": { icon: Ghost, description: "Playful and minimal not-found pages." },
};

const FALLBACK_META = { icon: Layers, description: "Explore curated components in this category." };

// Variants for staggered entrance animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

/**
 * Enhanced Category Card with Interactive Mouse Spotlight
 * Uses framer-motion for smooth spring-based movement.
 */
const CategoryCard = ({ cat, openCategory }) => {
  const Icon = cat.icon;

  // UseMotionValue handles dynamic values without triggering re-renders
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Updates mouse coordinates relative to the card dimensions
  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  // Creates the dynamic background gradient string (the spotlight)
  const spotlightGradient = useMotionTemplate`
    radial-gradient(
      350px circle at ${mouseX}px ${mouseY}px,
      rgba(255, 122, 69, 0.22),
      transparent 80%
    )
  `;

  return (
    <motion.button
      variants={cardVariants}
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => openCategory(cat.id)}
      onMouseMove={handleMouseMove}
      // Added transition-colors to the main background and border for smooth state changes
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#23262F] bg-[#0D0E14] p-8 text-left shadow-xl transition-colors duration-300 hover:border-[#FF7A45] hover:shadow-2xl hover:shadow-[#FF7A45]/15"
    >
      {/* 
        Interactive Orange Spotlight Layer
        Fades in smoothly on hover, then tracks the mouse.
      */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlightGradient }}
      />

      {/* 
        Static Orange Split Accent Layer (Top-Right Gradient Pop-up)
        Provides base glow contrast behind the dynamic spotlight.
      */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 scale-125 rounded-full bg-gradient-to-br from-[#FF7A45]/25 to-transparent blur-3xl opacity-30 transition-all duration-500 group-hover:scale-150 group-hover:opacity-100" />

      {/* 
        Teal Blueprint Corner Crosshairs
        Transitions color and sharpens intensity on hover.
      */}
      <div className="pointer-events-none absolute left-4 top-4 h-2.5 w-2.5 border-l border-t border-[#5EEAD4]/30 transition-colors duration-300 group-hover:border-[#FF7A45]" />
      <div className="pointer-events-none absolute right-4 top-4 h-2.5 w-2.5 border-r border-t border-[#5EEAD4]/30 transition-colors duration-300 group-hover:border-[#FF7A45]" />
      <div className="pointer-events-none absolute bottom-4 left-4 h-2.5 w-2.5 border-b border-l border-[#5EEAD4]/30 transition-colors duration-300 group-hover:border-[#FF7A45]" />
      <div className="pointer-events-none absolute bottom-4 right-4 h-2.5 w-2.5 border-b border-r border-[#5EEAD4]/30 transition-colors duration-300 group-hover:border-[#FF7A45]" />

      <div className="relative z-10">
        {/* Header Row: Icon and Component Count */}
        <div className="flex items-center justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#23262F] bg-[#050608] text-[#F4F3F1] shadow-inner transition-all duration-300 group-hover:border-[#FF7A45] group-hover:bg-[#FF7A45]/10 group-hover:text-[#FF7A45] group-hover:shadow-md group-hover:shadow-[#FF7A45]/10">
            <Icon className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
          </div>

          <span className="rounded-full border border-[#23262F] bg-[#050608] px-3.5 py-1.5 font-code text-xs font-semibold text-[#8B8D98] transition-colors duration-300 group-hover:border-[#FF7A45]/30 group-hover:text-[#FF7A45] group-hover:shadow-lg group-hover:shadow-[#FF7A45]/5">
            {cat.count} {cat.count === 1 ? "Component" : "Components"}
          </span>
        </div>

        {/* Content Section: Title and Description */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-[#FF7A45]">
            {cat.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[#8B8D98] transition-colors duration-300 group-hover:text-white/80">
            {cat.description}
          </p>
        </div>
      </div>

      {/* Footer Section: View Call-to-Action */}
      <div className="relative z-10 mt-10 flex items-center justify-between border-t border-[#23262F]/80 pt-5 font-code text-xs font-semibold tracking-wider text-[#8B8D98] transition-colors duration-300 group-hover:text-white">
        <span>VIEW COLLECTION</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#23262F] bg-[#050608] transition-all duration-300 group-hover:border-[#FF7A45] group-hover:bg-[#FF7A45] group-hover:text-black">
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </div>
    </motion.button>
  );
};

const CategoryLanding = () => {
  const [, setSearchParams] = useSearchParams();
  const [filterText, setFilterText] = useState("");

  // Memoize card data calculation to avoid expensive re-renders
  const categoryCards = useMemo(() => {
    return categories
      .filter((cat) => cat.id !== "all")
      .map((cat) => {
        const meta = CATEGORY_META[cat.id] ?? FALLBACK_META;
        const count = components.filter((c) => c.category === cat.id).length;
        return {
          id: cat.id,
          title: cat.name,
          description: meta.description,
          icon: meta.icon,
          count,
        };
      });
  }, []);

  // Sync state and compute filter in one render phase
  const filteredCategories = useMemo(() => {
    if (!filterText.trim()) return categoryCards;
    const q = filterText.toLowerCase();
    return categoryCards.filter(
      (c) => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
    );
  }, [categoryCards, filterText]);

  // Compute total count for the high-contrast stats banner
  const totalComponents = useMemo(
    () => categoryCards.reduce((acc, curr) => acc + curr.count, 0),
    [categoryCards]
  );

  const openCategory = (id) => {
    const next = new URLSearchParams();
    next.set("category", id);
    setSearchParams(next);
  };

  return (
    <div className="[--ember:#FF7A45] [--teal:#5EEAD4] space-y-12 py-4">
      {/* High Contrast, Sleek Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-3xl border border-[#23262F] bg-[#090A0F] p-8 shadow-2xl md:p-12"
      >
        {/* Glow Spheres for depth */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#FF7A45]/15 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#5EEAD4]/10 blur-[100px]" />

        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-4">
          
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Browse Categories
            </h1>
            <p className="text-base leading-relaxed text-[#8B8D98]">
              Select a design category below to mount live previews on demand. This pattern keeps the index extremely fast with zero canvas lag.
            </p>
          </div>

          {/* High-Contrast Stats Banner: Now includes colored iconography */}
          <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-[#23262F] bg-[#111319]/90 p-4 shadow-xl backdrop-blur-xl sm:flex-nowrap">
            <div className="flex items-center gap-3.5 border-r border-[#23262F] pr-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#5EEAD4]/30 bg-[#5EEAD4]/10 text-[#5EEAD4]">
                <Grid className="h-6 w-6" />
              </div>
              <div>
                <p className="font-code text-xs font-medium uppercase tracking-wider text-[#8B8D98]">Categories</p>
                <p className="text-xl font-bold text-white">{categoryCards.length}</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 pl-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#FF7A45]/30 bg-[#FF7A45]/10 text-[#FF7A45]">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <p className="font-code text-xs font-medium uppercase tracking-wider text-[#8B8D98]">Components</p>
                <p className="text-xl font-bold text-white">{totalComponents}</p>
              </div>
            </div>
          </div>
        </div>

        {/* High-Contrast Search Bar */}
        <div className="relative mt-10 max-w-lg">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8B8D98]" />
          <input
            type="text"
            placeholder="Search categories..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full rounded-2xl border border-[#23262F] bg-[#050608] py-4 pl-12 pr-4 text-sm text-[#F4F3F1] placeholder-[#8B8D98] shadow-inner transition-all duration-300 focus:border-[#FF7A45] focus:outline-none focus:ring-2 focus:ring-[#FF7A45]/20"
          />
        </div>
      </motion.div>

      {/* Grid with extra spacing and staggered entrance animations */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3"
      >
        {filteredCategories.map((cat) => (
          <CategoryCard key={cat.id} cat={cat} openCategory={openCategory} />
        ))}
      </motion.div>

      {/* Empty Search State */}
      {filteredCategories.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex min-h-[240px] flex-col items-center justify-center rounded-3xl border border-dashed border-[#23262F] bg-[#090A0F] p-8 text-center"
        >
          <p className="text-lg font-semibold text-white">No categories found matching "{filterText}"</p>
          <button
            onClick={() => setFilterText("")}
            className="mt-3 rounded-lg bg-[#FF7A45]/10 px-4 py-2 font-code text-xs font-bold text-[#FF7A45] transition-colors hover:bg-[#FF7A45]/20"
          >
            Reset Search
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default CategoryLanding;