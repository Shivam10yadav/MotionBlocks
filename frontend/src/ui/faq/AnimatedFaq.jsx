import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import {
  FiPlus,
  FiMinus,
  FiDisc,
  FiHelpCircle,
  FiArrowUpRight,
  FiZap,
  FiShield,
  FiLayers
} from 'react-icons/fi';

const faqCategories = [
  { id: 'all', label: 'All Questions', icon: FiHelpCircle },
  { id: 'product', label: 'Product & Features', icon: FiZap },
  { id: 'pricing', label: 'Billing & Plans', icon: FiLayers },
  { id: 'security', label: 'Security & Privacy', icon: FiShield },
];

const faqData = [
  {
    id: 1,
    category: 'product',
    number: '01',
    question: 'How does Aura integrate with our existing workflow?',
    answer:
      'Aura offers seamless API integrations and one-click plugins for Figma, GitHub, and Slack. You can import design tokens, automate release notes, and sync user permissions in seconds without writing boilerplates.',
  },
  {
    id: 2,
    category: 'pricing',
    number: '02',
    question: 'What happens when we exceed our plan limits?',
    answer:
      'We will never interrupt your production pipelines. If you exceed limit thresholds, your workspace seamlessly transitions to soft-cap metering, and we send proactive notifications before any billing adjustments.',
  },
  {
    id: 3,
    category: 'security',
    number: '03',
    question: 'Is my data encrypted at rest and in transit?',
    answer:
      'Yes, absolutely. We utilize enterprise-grade AES-256 bit encryption at rest and TLS 1.3 in transit. We are fully SOC2 Type II certified and compliant with GDPR regulations worldwide.',
  },
  {
    id: 4,
    category: 'product',
    number: '04',
    question: 'Can I customize micro-animations with GSAP directly?',
    answer:
      'Aura exposes full access to GSAP timeline control hooks inside React. You can override ease functions, tweak delay offsets, or build custom layout physics directly through our developer config file.',
  },
  {
    id: 5,
    category: 'pricing',
    number: '05',
    question: 'Do you offer custom enterprise pricing and SLA agreements?',
    answer:
      'We provide tailored enterprise tiers complete with 99.99% uptime SLAs, dedicated solutions architects, custom contract billing, and 24/7 priority emergency channels.',
  },
];

export default function AnimatedFaq() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openId, setOpenId] = useState(1);

  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-faq-header',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.gsap-faq-item',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out', delay: 0.4 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const filteredFaqs =
    activeCategory === 'all'
      ? faqData
      : faqData.filter((item) => item.category === activeCategory);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#0a0a0c] text-[#f5f2eb] px-6 py-20 lg:py-32 overflow-hidden font-sans selection:bg-[#ff5e00] selection:text-black"
    >
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#ff5e00]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#ff7a28]/10 rounded-full blur-[160px] pointer-events-none" />

      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#f5f2eb 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 border-b border-[#262422] pb-12">
          <div className="lg:col-span-8 space-y-4">
            <div className="gsap-faq-header inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181614] border border-[#ff5e00]/30 text-[#ff5e00] text-xs font-semibold uppercase tracking-widest">
              <FiDisc className="animate-spin-slow" />
              <span>Curated Knowledge</span>
            </div>

            <h2 className="gsap-faq-header text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#f5f2eb] uppercase leading-[0.95]">
              Got Questions? <br />
              <span className="text-[#ff5e00] italic font-serif font-normal">
                We've got answers.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-4 gsap-faq-header flex flex-col justify-end">
            <p className="text-[#a39e93] text-sm sm:text-base leading-relaxed">
              Everything you need to know about the product, billing, and system mechanics. Can’t find what you need?
            </p>
            <a
              href="#contact"
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#ff5e00] hover:text-[#ff7a28] group transition-colors"
            >
              <span>Talk to our technical team</span>
              <FiArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        <div className="gsap-faq-header flex flex-wrap gap-3 mb-12">
          {faqCategories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 ${
                  isActive
                    ? 'bg-[#ff5e00] text-black shadow-lg shadow-[#ff5e00]/20 scale-105'
                    : 'bg-[#141312] text-[#a39e93] border border-[#262422] hover:border-[#ff5e00]/40 hover:text-[#f5f2eb]'
                }`}
              >
                <Icon className={isActive ? 'text-black' : 'text-[#ff5e00]'} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`gsap-faq-item rounded-3xl transition-all duration-500 overflow-hidden border ${
                  isOpen
                    ? 'bg-[#161412] border-[#ff5e00]/50 shadow-[0_16px_40px_-12px_rgba(255,94,0,0.15)]'
                    : 'bg-[#0f0e0d] border-[#242220] hover:border-[#383430]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full text-left p-6 sm:p-8 flex items-center justify-between gap-6 cursor-pointer group"
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span
                      className={`text-xs sm:text-sm font-mono font-bold transition-colors ${
                        isOpen ? 'text-[#ff5e00]' : 'text-[#635e56] group-hover:text-[#a39e93]'
                      }`}
                    >
                      {faq.number}
                    </span>
                    <h3
                      className={`text-lg sm:text-2xl font-bold tracking-tight transition-colors ${
                        isOpen ? 'text-[#f5f2eb]' : 'text-[#d8d3c7] group-hover:text-[#ff5e00]'
                      }`}
                    >
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? 'bg-[#ff5e00] text-black rotate-180'
                        : 'bg-[#1c1a18] text-[#f5f2eb] border border-[#2e2a27] group-hover:border-[#ff5e00]'
                    }`}
                  >
                    {isOpen ? (
                      <FiMinus className="w-5 h-5 stroke-[3]" />
                    ) : (
                      <FiPlus className="w-5 h-5 stroke-[3]" />
                    )}
                  </div>
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="p-6 sm:p-8 pt-0 border-t border-[#24211e]/40 mt-2">
                      <p className="text-[#b5afa3] text-base sm:text-lg leading-relaxed max-w-4xl pt-4">
                        {faq.answer}
                      </p>

                      <div className="mt-6 pt-6 border-t border-[#24211e]/60 flex items-center justify-between">
                        <span className="text-xs text-[#635e56] font-mono">
                          Was this helpful?
                        </span>
                        <div className="flex items-center gap-3">
                          <button 
                            type="button"
                            className="px-3 py-1 rounded-lg bg-[#211f1c] hover:bg-[#ff5e00] hover:text-black text-xs font-semibold text-[#a39e93] transition-colors"
                          >
                            Yes
                          </button>
                          <button 
                            type="button"
                            className="px-3 py-1 rounded-lg bg-[#211f1c] hover:bg-[#2e2a27] text-xs font-semibold text-[#a39e93] transition-colors"
                          >
                            No
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-[#181512] via-[#241a12] to-[#181512] border border-[#ff5e00]/30 rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-2xl font-bold text-[#f5f2eb] tracking-tight">
              Still have unanswered questions?
            </h4>
            <p className="text-[#a39e93] text-sm mt-1">
              Our support team usually responds in under 15 minutes.
            </p>
          </div>
          <button
            type="button"
            className="shrink-0 px-8 py-4 bg-[#ff5e00] hover:bg-[#ff7a28] text-black font-extrabold text-sm rounded-2xl uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-[#ff5e00]/20"
          >
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}