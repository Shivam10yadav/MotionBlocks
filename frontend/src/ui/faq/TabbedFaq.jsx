import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Search, Sparkles, Layers, ShieldCheck, Zap } from "lucide-react";

const categories = [
  { id: "all", label: "All Questions", icon: Layers },
  { id: "general", label: "General", icon: Sparkles },
  { id: "tech", label: "Technical", icon: Zap },
  { id: "license", label: "Licensing", icon: ShieldCheck },
];

const faqsData = [
  {
    id: 1,
    category: "general",
    question: "What makes MotionBlocks different from component libraries?",
    answer:
      "MotionBlocks is completely copy-and-paste. You don't have to install npm packages, worry about version mismatches, or fight against locked component APIs.",
  },
  {
    id: 2,
    category: "tech",
    question: "How do I customize the theme or colors?",
    answer:
      "Since all components are built using native Tailwind CSS utility classes with hex codes, you can directly edit the class names or modify Tailwind's config file.",
  },
  {
    id: 3,
    category: "general",
    question: "Can I contribute my own components to MotionBlocks?",
    answer:
      "Yes! Check out our contribution guide in the repository. Simply create your component file under src/ui/ and register it in components.js.",
  },
  {
    id: 4,
    category: "tech",
    question: "Is TypeScript supported out of the box?",
    answer:
      "All code samples are written in standard React JSX for max flexibility, but converting them to TSX is straightforward by adding interface types for props.",
  },
  {
    id: 5,
    category: "license",
    question: "Can I use these components for client projects?",
    answer:
      "Yes, you are free to build client applications, commercial SaaS applications, or personal portfolio projects using any component from this library.",
  },
  {
    id: 6,
    category: "license",
    question: "Do I need to attribute MotionBlocks in my app?",
    answer:
      "Attribution is strictly optional but appreciated! You are free to remove any comments or credit lines in your production code.",
  },
];

const TabbedFaq = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const filteredFaqs = useMemo(() => {
    return faqsData.filter((faq) => {
      const matchesCategory = activeTab === "all" || faq.category === activeTab;
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  return (
    <section className="w-full min-h-screen bg-[#08090D] px-4 py-12 sm:px-8 lg:px-12 text-[#F4F3F1]">
      <div className="mx-auto max-w-5xl space-y-10">
        {/* Header */}
        <div className="flex flex-col gap-6 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
          <div className="max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#FF7A45]/20 bg-[#FF7A45]/10 px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider text-[#FF7A45]">
              Knowledge Base
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
              Help Center & FAQ
            </h2>
            <p className="text-base text-[#8B8D98]">
              Search or filter through categories to find quick answers to common questions.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full max-w-md mx-auto lg:mx-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B8D98]" size={18} />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-[#23262F] bg-[#111319] py-3.5 pl-11 pr-4 text-sm text-[#F4F3F1] placeholder-[#5C5F6B] outline-none transition duration-200 focus:border-[#FF7A45]"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 border-b border-[#23262F] pb-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-medium sm:text-sm transition-all duration-200 ${
                  isActive ? "text-[#08090D]" : "text-[#8B8D98] hover:text-[#F4F3F1]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute inset-0 rounded-xl bg-[#5EEAD4]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon size={16} />
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = expandedId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`flex flex-col justify-between rounded-2xl border p-5 transition-all duration-200 ${
                    isOpen
                      ? "border-[#FF7A45]/40 bg-[#111319]"
                      : "border-[#23262F] bg-[#0B0D12] hover:border-[#323644]"
                  }`}
                >
                  <button
                    onClick={() => setExpandedId(isOpen ? null : faq.id)}
                    className="flex items-start justify-between gap-4 text-left"
                  >
                    <span className="font-semibold text-[#F4F3F1] sm:text-lg">
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                        isOpen
                          ? "border-[#FF7A45] bg-[#FF7A45] text-[#08090D]"
                          : "border-[#23262F] bg-[#111319] text-[#8B8D98]"
                      }`}
                    >
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p className="mt-4 border-t border-[#23262F] pt-4 text-xs sm:text-sm leading-relaxed text-[#8B8D98]">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-12 text-center text-[#8B8D98]">
              No questions found matching your search criteria.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TabbedFaq;