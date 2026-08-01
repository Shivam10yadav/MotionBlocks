import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Shield, Crown } from "lucide-react";

const plans = [
  {
    name: "Essential",
    description: "Core toolkit for independent creators and boutique builds.",
    priceMonthly: 29,
    priceYearly: 24,
    features: [
      "Access to standard component suite",
      "Single commercial project",
      "Standard documentation",
      "Email support within 48h",
    ],
    popular: false,
    cta: "Select Plan",
  },
  {
    name: "Pro Studio",
    description: "Full suite for design agencies and high-end digital products.",
    priceMonthly: 79,
    priceYearly: 64,
    features: [
      "All luxury components & micro-interactions",
      "Unlimited commercial projects",
      "Figma design system access",
      "Priority VIP support",
      "Early access to new components",
      "Custom CSS variables setup",
    ],
    popular: true,
    cta: "Unlock Pro Studio",
  },
  {
    name: "Custom Atelier",
    description: "Tailored component architecture for enterprise platforms.",
    priceMonthly: 199,
    priceYearly: 159,
    features: [
      "Custom tailored component build",
      "Full source code ownership",
      "Dedicated design team liaison",
      "Quarterly architecture review",
      "Unlimited internal seats",
      "Custom animation fine-tuning",
    ],
    popular: false,
    cta: "Request Consultation",
  },
];

const DarkBrownPricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="w-full min-h-screen bg-[#120D0B] py-16 px-4 sm:px-6 lg:px-8 text-[#F5EBE6] flex items-center justify-center">
      <div className="w-full max-w-6xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D97706]/30 bg-[#D97706]/10 px-3.5 py-1.5 text-xs font-medium uppercase tracking-widest text-[#F59E0B]">
            <Crown size={14} /> Luxury Collection
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F5EBE6]">
            Elevate Your Build
          </h2>
          <p className="text-base text-[#A8988E]">
            Transparent pricing crafted for individuals and scaling studios.
          </p>

          {/* Billing Switcher */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <span className={`text-xs sm:text-sm uppercase tracking-wider font-semibold ${!isYearly ? "text-[#F5EBE6]" : "text-[#78685E]"}`}>
              Billed Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative h-8 w-16 rounded-full border border-[#3D2E27] bg-[#1A1412] p-1 transition-colors duration-200"
            >
              <motion.div
                animate={{ x: isYearly ? 32 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="h-6 w-6 rounded-full bg-[#D97706] shadow-lg shadow-[#D97706]/30"
              />
            </button>
            <span className={`text-xs sm:text-sm uppercase tracking-wider font-semibold flex items-center gap-2 ${isYearly ? "text-[#F5EBE6]" : "text-[#78685E]"}`}>
              Billed Yearly
              <span className="rounded-md border border-[#D97706]/30 bg-[#D97706]/20 px-2 py-0.5 text-[10px] font-bold text-[#F59E0B]">
                20% OFF
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-stretch">
          {plans.map((plan, index) => {
            const price = isYearly ? plan.priceYearly : plan.priceMonthly;
            return (
              <div
                key={index}
                className={`relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-300 ${
                  plan.popular
                    ? "bg-[#1E1714] border-2 border-[#D97706] shadow-2xl shadow-[#D97706]/10 lg:-translate-y-2"
                    : "bg-[#17110E] border border-[#2E221C] hover:border-[#4A382E]"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full border border-[#F59E0B]/40 bg-[#D97706] px-4 py-1 text-[11px] font-extrabold uppercase tracking-widest text-[#120D0B] shadow-md">
                    Recommended
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-[#F5EBE6]">{plan.name}</h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#A8988E] min-h-[40px]">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-black text-[#F5EBE6]">${price}</span>
                    <span className="text-sm font-medium text-[#78685E]">/ month</span>
                  </div>

                  {/* Features */}
                  <div className="border-t border-[#2E221C] pt-6 space-y-3">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#78685E]">
                      Included Features
                    </p>
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm text-[#D4C5BC]">
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D97706]/20 text-[#F59E0B]">
                            <Check size={12} strokeWidth={3} />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Button */}
                <button
                  className={`mt-8 w-full rounded-2xl py-3.5 px-4 text-sm font-bold tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                    plan.popular
                      ? "bg-[#D97706] text-[#120D0B] hover:bg-[#F59E0B] shadow-lg shadow-[#D97706]/20"
                      : "border border-[#3D2E27] bg-[#241B17] text-[#F5EBE6] hover:bg-[#2E221C]"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DarkBrownPricing;