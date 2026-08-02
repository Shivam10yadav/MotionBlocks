import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
} from "lucide-react";
import { categories } from "../data/categories";
import { components } from "../data/components";

// Presentation-only metadata (icon + short description) keyed by category id.
// Keeps categories.js as the single source of truth for id/name/existence,
// while this stays purely visual — add a category to categories.js and it
// automatically appears here with a sensible fallback.
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.23, 1, 0.32, 1] },
  },
};

export default function Categories() {
  // Computed once per render of this data, not recalculated on every
  // parent re-render or animation frame — real counts instead of fake ones.
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

  return (
    <section className="min-h-screen bg-[#0D1117] px-4 py-20 font-sans text-[#F8FAFC] antialiased sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-14 flex flex-col items-start space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#06B6D4]/20 bg-[#06B6D4]/10 px-3 py-1 text-xs font-medium text-[#06B6D4]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#06B6D4]" />
            Categories
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-[#F8FAFC] sm:text-4xl lg:text-5xl">
            Browse by Category
          </h2>

          <p className="max-w-2xl text-base leading-relaxed text-[#94A3B8] sm:text-lg">
            Explore ready-to-use, accessible MotionBlocks components crafted for modern React applications.
          </p>
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {categoryCards.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.div key={cat.id} variants={cardVariants}>
                <Link
                  to={`/components?category=${cat.id}`}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[#30363D] bg-[#161B22] p-6 shadow-lg transition-colors duration-300 ease-out hover:border-[#06B6D4]/60 hover:shadow-[0_0_25px_rgba(6,182,212,0.12)]"
                >
                  <div>
                    {/* Top Row: Icon + Count Badge */}
                    <div className="mb-6 flex items-center justify-between">
                      <div className="rounded-xl border border-[#30363D] bg-[#0D1117] p-3 text-[#F8FAFC] transition-colors duration-300 group-hover:border-[#06B6D4]/40 group-hover:text-[#06B6D4]">
                        <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                      </div>

                      <span className="rounded-md border border-[#30363D] bg-[#0D1117] px-2.5 py-1 font-mono text-xs font-medium text-[#94A3B8] transition-colors duration-300 group-hover:border-[#30363D]/80 group-hover:text-[#F8FAFC]">
                        {cat.count} {cat.count === 1 ? "Component" : "Components"}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mb-2 text-xl font-semibold text-[#F8FAFC] transition-colors duration-300 group-hover:text-[#06B6D4]">
                      {cat.title}
                    </h3>

                    {/* Description */}
                    <p className="line-clamp-2 text-sm leading-relaxed text-[#94A3B8]">
                      {cat.description}
                    </p>
                  </div>

                  {/* Bottom Row: Exploration Arrow Link */}
                  <div className="mt-8 flex items-center justify-between border-t border-[#30363D]/50 pt-4 text-xs font-medium text-[#94A3B8] transition-colors duration-300 group-hover:text-[#F8FAFC]">
                    <span>Explore library</span>
                    <ArrowUpRight className="h-4 w-4 text-[#94A3B8] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#06B6D4]" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}