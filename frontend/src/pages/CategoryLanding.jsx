import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import {
  MousePointerClick,
  LayoutTemplate,
  KeyRound,
  ShoppingCart,
  Megaphone,
  Quote,
  HelpCircle,
  Type,
  Loader2,
  Images,
  ListOrdered,
  Ghost,
  Layers,
  ArrowUpRight,
  Search,
  FormInput,
  Compass,
  Sliders,
  PanelBottom,
  Footprints,
  Sparkles,
} from "lucide-react";
import { categories } from "../data/categories";
import { components } from "../data/components";

// Icons lookup map by category ID
const ICON_MAP = {
  inputs: FormInput,
  buttons: MousePointerClick,
  auth: KeyRound,
  navbars: LayoutTemplate,
  "progress-bars": Sliders,
  ecommerce: ShoppingCart,
  docks: PanelBottom,
  navigation: Compass,
  marquees: Sparkles,
  "cta-sections": Megaphone,
  testimonials: Quote,
  faq: HelpCircle,
  footers: Footprints,
  "text-effects": Type,
  loaders: Loader2,
  galleries: Images,
  pagination: ListOrdered,
  "404-pages": Ghost,
};

// UI Preview Images Map
const IMAGE_MAP = {
  inputs: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
  buttons: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
  auth: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=600&auto=format&fit=crop",
  navbars: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop",
  "progress-bars": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
  ecommerce: "https://images.unsplash.com/photo-1556742049-0a67e5127393?q=80&w=600&auto=format&fit=crop",
  docks: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop",
  navigation: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
  marquees: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop",
  "cta-sections": "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=600&auto=format&fit=crop",
  testimonials: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop",
  faq: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop",
  footers: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop",
  "text-effects": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop",
  loaders: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop",
  galleries: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=600&auto=format&fit=crop",
  pagination: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600&auto=format&fit=crop",
  "404-pages": "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?q=80&w=600&auto=format&fit=crop",
};

const CategoryLanding = () => {
  const [, setSearchParams] = useSearchParams();
  const [filterText, setFilterText] = useState("");
  const [activeHoverId, setActiveHoverId] = useState(null);
  const [isHoveringList, setIsHoveringList] = useState(false);

  // Mouse tracker for cursor-following preview card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 280, damping: 24 });
  const springY = useSpring(mouseY, { stiffness: 280, damping: 24 });

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX + 20);
    mouseY.set(e.clientY + 20);
  };

  // Combine categories with images and component counts
  const categoryList = useMemo(() => {
    return categories
      .filter((cat) => cat.id !== "all")
      .map((cat) => {
        const Icon = ICON_MAP[cat.id] || Layers;
        const image = IMAGE_MAP[cat.id] || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop";
        const count = components.filter((c) => c.category === cat.id).length;

        return {
          id: cat.id,
          title: cat.name,
          icon: Icon,
          image,
          count,
        };
      });
  }, []);

  const filteredCategories = useMemo(() => {
    if (!filterText.trim()) return categoryList;
    const q = filterText.toLowerCase();
    return categoryList.filter((c) => c.title.toLowerCase().includes(q));
  }, [categoryList, filterText]);

  const activeCategory = useMemo(() => {
    if (!activeHoverId) return null;
    return categoryList.find((c) => c.id === activeHoverId);
  }, [activeHoverId, categoryList]);

  const openCategory = (id) => {
    const next = new URLSearchParams();
    next.set("category", id);
    setSearchParams(next);
  };

  return (
    <div
      className="relative w-full space-y-8 py-6 text-[#F7F7F5]"
      onMouseMove={handleMouseMove}
    >
      {/* Floating Image Preview Following Cursor */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 hidden h-48 w-72 overflow-hidden rounded-xl border border-[#3C4050] bg-[#12141B] shadow-2xl md:block"
        style={{
          x: springX,
          y: springY,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isHoveringList && activeCategory ? 1 : 0,
          scale: isHoveringList && activeCategory ? 1 : 0.8,
        }}
        transition={{ duration: 0.15 }}
      >
        <AnimatePresence mode="wait">
          {activeCategory && (
            <motion.div
              key={activeCategory.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative h-full w-full"
            >
              <img
                src={activeCategory.image}
                alt={activeCategory.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12141B] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-[#F7F7F5]">
                  {activeCategory.title}
                </p>
                <span className="text-xs text-[#8B8D98]">
                  {activeCategory.count} items
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Header */}
      <div className="flex flex-col gap-6 border-b border-[#2A2D38] pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-wide text-[#8B8D98]">
            {categoryList.length} CATEGORIES AVAILABLE
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[#F7F7F5] sm:text-4xl">
            Component Index
          </h1>
        </div>

        {/* Search */}
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B8D98]" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search categories..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full rounded-lg border border-[#2A2D38] bg-[#12141B] py-2.5 pl-10 pr-4 text-sm text-[#F7F7F5] placeholder-[#8B8D98] transition-colors focus:border-[#FF9466] focus:outline-none focus:ring-1 focus:ring-[#FF9466]"
          />
        </div>
      </div>

      {/* List Overview */}
      <div
        className="divide-y divide-[#2A2D38] border-b border-t border-[#2A2D38]"
        onMouseEnter={() => setIsHoveringList(true)}
        onMouseLeave={() => {
          setIsHoveringList(false);
          setActiveHoverId(null);
        }}
      >
        {filteredCategories.map((cat) => {
          const Icon = cat.icon;
          const isHovered = activeHoverId === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => openCategory(cat.id)}
              onMouseEnter={() => setActiveHoverId(cat.id)}
              className="group flex w-full items-center justify-between rounded-lg px-2 py-4 text-left transition-colors hover:bg-[#12141B]/50"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-colors ${
                    isHovered
                      ? "border-[#FF9466] bg-[#FF9466]/10 text-[#FF9466]"
                      : "border-[#2A2D38] bg-[#12141B] text-[#8B8D98]"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <h3
                  className={`text-base font-medium transition-colors ${
                    isHovered ? "text-[#FF9466]" : "text-[#F7F7F5]"
                  }`}
                >
                  {cat.title}
                </h3>
              </div>

              <div className="flex items-center gap-4 text-xs text-[#8B8D98]">
                <span className="rounded-full border border-[#2A2D38] px-2.5 py-1 text-[#C7C9D1]">
                  {cat.count} {cat.count === 1 ? "component" : "components"}
                </span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#FF9466]" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryLanding;