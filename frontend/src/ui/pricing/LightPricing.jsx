import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Starter",
    description: "Perfect for freelancers and individual developers.",
    priceMonthly: 19,
    priceYearly: 15,
    features: [
      "Access to 50+ basic components",
      "Single developer license",
      "Community Discord support",
      "Standard documentation",
      "Free lifetime updates",
    ],
    popular: false,
    cta: "Start Free Trial",
  },
  {
    name: "Pro",
    description: "Ideal for growing teams and active production apps.",
    priceMonthly: 49,
    priceYearly: 39,
    features: [
      "Access to all 200+ components",
      "Up to 5 team members",
      "Priority email & chat support",
      "Figma design files included",
      "Commercial usage license",
      "Advanced animated templates",
    ],
    popular: true,
    cta: "Get Started Pro",
  },
  {
    name: "Enterprise",
    description: "Custom solutions for large agencies and corporations.",
    priceMonthly: 99,
    priceYearly: 79,
    features: [
      "Unlimited team members",
      "Custom component requests",
      "Dedicated account manager",
      "1-on-1 code integration support",
      "Custom SLA & security audit",
      "Source code repository access",
    ],
    popular: false,
    cta: "Contact Sales",
  },
];

const LightPricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="w-full min-h-screen bg-[#F8FAFC] py-16 px-4 sm:px-6 lg:px-8 text-[#0F172A] flex items-center justify-center">
      <div className="w-full max-w-6xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0EA5E9]/20 bg-[#0EA5E9]/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
            <Sparkles size={14} /> Flexible Pricing
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A]">
            Simple plans for every project
          </h2>
          <p className="text-base sm:text-lg text-[#64748B]">
            Start free, scale seamlessly. Choose the plan that best fits your workflow.
          </p>

          {/* Toggle Button */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <span className={`text-sm font-medium ${!isYearly ? "text-[#0F172A]" : "text-[#64748B]"}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative h-8 w-16 rounded-full bg-[#E2E8F0] p-1 transition-colors duration-200"
            >
              <motion.div
                animate={{ x: isYearly ? 32 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="h-6 w-6 rounded-full bg-[#0284C7] shadow-md"
              />
            </button>
            <span className={`text-sm font-medium flex items-center gap-1.5 ${isYearly ? "text-[#0F172A]" : "text-[#64748B]"}`}>
              Yearly
              <span className="rounded-full bg-[#10B981]/10 border border-[#10B981]/20 px-2 py-0.5 text-[10px] font-bold text-[#059669]">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* 3-Tier Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-stretch">
          {plans.map((plan, index) => {
            const price = isYearly ? plan.priceYearly : plan.priceMonthly;
            return (
              <div
                key={index}
                className={`relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-300 ${
                  plan.popular
                    ? "bg-[#FFFFFF] border-2 border-[#0284C7] shadow-xl shadow-[#0284C7]/10 lg:-translate-y-2"
                    : "bg-[#FFFFFF] border border-[#E2E8F0] shadow-sm hover:border-[#CBD5E1]"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#0284C7] px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#FFFFFF] shadow-md">
                    Most Popular
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-[#0F172A]">{plan.name}</h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#64748B] min-h-[40px]">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price Display */}
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-black text-[#0F172A]">${price}</span>
                    <span className="text-sm font-medium text-[#64748B]">/month</span>
                  </div>

                  {/* Features List */}
                  <div className="border-t border-[#F1F5F9] pt-6 space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
                      What's Included
                    </p>
                    <ul className="space-y-2.5">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm text-[#334155]">
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0284C7]/10 text-[#0284C7]">
                            <Check size={12} strokeWidth={3} />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  className={`mt-8 w-full rounded-2xl py-3.5 px-4 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                    plan.popular
                      ? "bg-[#0284C7] text-[#FFFFFF] hover:bg-[#0369A1] shadow-lg shadow-[#0284C7]/20"
                      : "bg-[#F1F5F9] text-[#0F172A] hover:bg-[#E2E8F0]"
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

export default LightPricing;