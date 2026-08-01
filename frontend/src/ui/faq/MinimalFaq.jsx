import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How do I import components into my project?",
    answer:
      "Simply browse through our component library, select the one you like, and copy the source code directly into your React project. Make sure you have Tailwind CSS and Framer Motion installed.",
  },
  {
    question: "Are these components accessible (a11y)?",
    answer:
      "Yes! All components are constructed using semantic HTML tags and follow standard accessibility guidelines, ensuring proper keyboard navigation and ARIA state management.",
  },
  {
    question: "Can I use these components in commercial projects?",
    answer:
      "Absolutely. Everything in this library is released under the open-source MIT license, meaning you can freely use them in personal, educational, or commercial projects.",
  },
  {
    question: "Do I need to install any heavy npm packages?",
    answer:
      "No! The entire library relies only on React, Tailwind CSS, Framer Motion, and Lucide React icons to keep your bundle size lightweight.",
  },
];

const MinimalFaq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full min-h-screen bg-[#08090D] px-4 py-12 sm:px-6 lg:px-8 text-[#F4F3F1] flex items-center justify-center">
      <div className="w-full max-w-3xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#5EEAD4]/20 bg-[#5EEAD4]/10 px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider text-[#5EEAD4]">
            <HelpCircle size={14} className="text-[#5EEAD4]" />
            Got Questions?
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#8B8D98]">
            Everything you need to know about integrating MotionBlocks into your workflow.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`overflow-hidden rounded-2xl border transition-colors duration-200 ${
                  isOpen
                    ? "border-[#323644] bg-[#111319]"
                    : "border-[#23262F] bg-[#0B0D12] hover:border-[#323644]"
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between p-5 sm:p-6 text-left transition-colors duration-150"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold sm:text-lg text-[#F4F3F1]">
                    {faq.question}
                  </span>
                  <div
                    className={`ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[#23262F] bg-[#111319] text-[#8B8D98] transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#FF7A45] border-[#FF7A45]/30" : ""
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="border-t border-[#23262F]/60 px-5 pb-6 pt-4 sm:px-6 text-sm sm:text-base leading-relaxed text-[#8B8D98]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MinimalFaq;