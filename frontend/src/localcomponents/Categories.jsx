import { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

gsap.registerPlugin(ScrollTrigger);

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

export default function Categories() {
  const sectionRef = useRef(null);

  // Computed once — real counts instead of hardcoded/fake ones, and
  // recalculates only if categories/components data actually changes.
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

  useEffect(() => {
    const cards = gsap.utils.toArray(sectionRef.current.querySelectorAll("[data-category-card]"));

    const ctx = gsap.context(() => {
      gsap.set(cards, { opacity: 0, y: 28 });

      ScrollTrigger.batch(cards, {
        start: "top 88%",
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.08,
            overwrite: true,
          }),
        once: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [categoryCards]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#08090D] px-4 py-20 font-sans text-[#F4F3F1] antialiased sm:px-6 lg:px-8 [--ember:#FF7A45] [--teal:#5EEAD4]"
    >
      {/* Ambient brand glow, matches the rest of the site */}
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-[--ember] opacity-[0.07] blur-[130px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[--teal] opacity-[0.07] blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-14 flex flex-col items-start space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[--teal]/20 bg-[--teal]/10 px-3 py-1 font-code text-xs font-medium uppercase tracking-wider text-[--teal]">
            <span className="h-1.5 w-1.5 rounded-full bg-[--teal] shadow-[0_0_8px_#5EEAD4]" />
            Categories
          </div>

          <h2 className="font-display text-3xl font-bold tracking-tight text-[#F4F3F1] sm:text-4xl lg:text-5xl">
            Browse by Category
          </h2>

          <p className="max-w-2xl text-base leading-relaxed text-[#8B8D98] sm:text-lg">
            Explore ready-to-use, accessible MotionBlocks components crafted for modern React applications.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categoryCards.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                data-category-card
                to={`/components?category=${cat.id}`}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[#23262F] bg-[#111319] p-6 shadow-lg transition-colors duration-300 ease-out hover:border-[--ember]/40 hover:shadow-[0_0_25px_rgba(255,122,69,0.12)]"
              >
                <div>
                  {/* Top Row: Icon + Count Badge */}
                  <div className="mb-6 flex items-center justify-between">
                    <div className="rounded-xl border border-[#23262F] bg-[#0B0D12] p-3 text-[#F4F3F1] transition-colors duration-300 group-hover:border-[--ember]/40 group-hover:text-[--ember]">
                      <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                    </div>

                    <span className="rounded-md border border-[#23262F] bg-[#0B0D12] px-2.5 py-1 font-code text-xs font-medium text-[#8B8D98] transition-colors duration-300 group-hover:border-[#23262F]/80 group-hover:text-[#F4F3F1]">
                      {cat.count} {cat.count === 1 ? "Component" : "Components"}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 text-xl font-semibold text-[#F4F3F1] transition-colors duration-300 group-hover:text-[--ember]">
                    {cat.title}
                  </h3>

                  {/* Description */}
                  <p className="line-clamp-2 text-sm leading-relaxed text-[#8B8D98]">
                    {cat.description}
                  </p>
                </div>

                {/* Bottom Row: Exploration Arrow Link */}
                <div className="mt-8 flex items-center justify-between border-t border-[#23262F]/60 pt-4 font-code text-xs font-medium text-[#8B8D98] transition-colors duration-300 group-hover:text-[#F4F3F1]">
                  <span>Explore library</span>
                  <ArrowUpRight className="h-4 w-4 text-[#8B8D98] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[--teal]" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}