import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaBuilding, FaRocket,  FaGripHorizontal } from 'react-icons/fa';

export default function CompactPricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      icon: <FaGripHorizontal className="text-amber-500" />,
      tagline: 'Perfect for side projects & solos.',
      priceMonthly: 19,
      priceAnnual: 15,
      popular: false,
      features: [
        'Up to 3 projects',
        'Basic analytics',
        '24/7 Community support',
        '1GB cloud storage',
      ],
      cta: 'Start Free Trial',
      buttonStyle: 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200',
    },
    {
      id: 'pro',
      name: 'Pro',
      icon: <FaRocket className="text-indigo-600" />,
      tagline: 'Best for growing startups & teams.',
      priceMonthly: 49,
      priceAnnual: 39,
      popular: true,
      features: [
        'Unlimited projects',
        'Advanced analytics',
        'Priority email support',
        '50GB cloud storage',
        'Custom domain integration',
      ],
      cta: 'Get Started with Pro',
      buttonStyle: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/25',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      icon: <FaBuilding className="text-emerald-500" />,
      tagline: 'Custom power for large organizations.',
      priceMonthly: 99,
      priceAnnual: 79,
      popular: false,
      features: [
        'Dedicated account manager',
        'Custom SLA & security',
        '24/7 Phone & Slack support',
        'Unlimited cloud storage',
        'SSO & audit logs',
      ],
      cta: 'Contact Sales',
      buttonStyle: 'bg-slate-900 hover:bg-slate-800 text-white',
    },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-slate-50 via-white to-slate-50 py-16 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full inline-block mb-3"
          >
            Flexible Pricing
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            Simple plans for every stage
          </motion.h2>

          {/* Billing Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 flex items-center justify-center gap-3"
          >
            <span className={`text-xs sm:text-sm font-semibold transition-colors ${!isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>
              Monthly
            </span>

            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-14 h-8 bg-slate-200 rounded-full p-1 relative flex items-center transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            >
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className={`w-6 h-6 rounded-full shadow-md ${isAnnual ? 'bg-indigo-600 translate-x-6' : 'bg-white translate-x-0'}`}
              />
            </button>

            <span className={`text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors ${isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>
              Annual
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </span>
          </motion.div>
        </div>

        {/* 3-Tier Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, index) => {
            const price = isAnnual ? plan.priceAnnual : plan.priceMonthly;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className={`relative bg-white rounded-2xl p-6 flex flex-col justify-between transition-all border ${
                  plan.popular
                    ? 'border-indigo-500 shadow-xl shadow-indigo-500/10 ring-2 ring-indigo-500/20'
                    : 'border-slate-200/80 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-md">
                    Most Popular
                  </div>
                )}

                <div>
                  {/* Title & Icon */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      {plan.icon} {plan.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mb-4">{plan.tagline}</p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 py-3 border-y border-slate-100">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={price}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="text-3xl font-extrabold text-slate-900"
                      >
                        ${price}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-xs text-slate-400 font-medium">/month</span>
                  </div>

                  {/* Compact Feature List */}
                  <ul className="mt-4 space-y-2.5">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-xs text-slate-600">
                        <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 text-[10px] font-bold">
                          <FaCheck />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full mt-6 py-2.5 px-4 rounded-xl text-xs font-bold transition-colors ${plan.buttonStyle}`}
                >
                  {plan.cta}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}