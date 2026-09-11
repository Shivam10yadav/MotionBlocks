import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Free Plan',
    price: 'Free',
    period: '',
    features: [
      'Send up to 2 transfers per month',
      'Basic transaction history',
      'Email support',
      'Limited currency support (USD, EUR, GBP)',
      'Basic security features',
    ],
    highlighted: false,
  },
  {
    name: 'Standard Plan',
    price: '$9.99',
    period: '/m',
    features: [
      'Unlimited transfers',
      'Transaction history with export options',
      'Priority email support',
      'Expanded currency support',
      'Advanced security features',
    ],
    highlighted: true,
  },
  {
    name: 'Pro Plan',
    price: '$19.99',
    period: '/m',
    features: [
      'Unlimited transfers with priority processing',
      'Comprehensive transaction analytics',
      '24/7 priority support',
      'Full currency support',
      'Enhanced security features',
    ],
    highlighted: false,
  },
];

export default function GlassPricing() {
  const [isBilledYearly, setIsBilledYearly] = useState(false);

  return (
    <section className="relative min-h-screen bg-[#050505] text-white overflow-hidden py-28 px-4 flex flex-col items-center justify-center font-sans">
      
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-gradient-to-tr from-zinc-600/20 via-white/10 to-zinc-900/10 blur-[100px] pointer-events-none rounded-full" />

      {/* Massive Background Heading */}
      <div className="absolute top-12 left-0 right-0 z-0 text-center pointer-events-none select-none">
        <h1 className="text-[14vw] leading-none font-black tracking-tight text-white drop-shadow-2xl uppercase">
          Pricing
        </h1>
      </div>

      {/* Pricing Cards Grid */}
      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 items-center mt-20">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -6 }}
            className={`relative rounded-[32px] p-8 flex flex-col justify-between overflow-hidden
              border transition-all duration-300 ${
                plan.highlighted
                  ? 'bg-zinc-950/70 border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)]'
                  : 'bg-zinc-950/60 border-white/15 shadow-[0_20px_40px_rgba(0,0,0,0.6)]'
              }`}
            style={{
              boxShadow: plan.highlighted
                ? 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.4), 0 20px 50px rgba(0, 0, 0, 0.8)'
                : 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.2), 0 20px 40px rgba(0, 0, 0, 0.6)',
            }}
          >
            {/* Top Blurred Glass Overlay Layer (Fades blur only at the top over the Pricing text) */}
            <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none backdrop-blur-md bg-gradient-to-b from-white/[0.08] to-transparent [mask-image:linear-gradient(to_bottom,black_0%,transparent_100%)]" />

            {/* Upper Card Content */}
            <div className="relative z-10">
              <p className="text-sm font-medium text-zinc-300 mb-3">{plan.name}</p>
              
              <div className="flex items-baseline mb-8">
                <span className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                  {plan.price}
                </span>
                <span className="text-zinc-400 text-base font-normal ml-1">{plan.period}</span>
              </div>

              {/* Thin Glass Divider */}
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

              {/* Features List */}
              <ul className="space-y-4 mb-12">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start text-sm text-zinc-300 font-normal">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              className={`relative z-10 w-full py-3.5 px-6 rounded-full font-medium text-sm transition-all duration-200 ${
                plan.highlighted
                  ? 'bg-white text-black hover:bg-zinc-100 shadow-[0_0_25px_rgba(255,255,255,0.3)]'
                  : 'bg-black text-white border border-white/20 hover:bg-zinc-900'
              }`}
            >
              Get Started
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Billing Toggle */}
      <div
        className="relative z-10 flex items-center mt-14 space-x-3 cursor-pointer"
        onClick={() => setIsBilledYearly(!isBilledYearly)}
      >
        <div
          className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
            isBilledYearly ? 'bg-white' : 'bg-white/10 border border-white/20'
          }`}
        >
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className={`w-4 h-4 rounded-full ${isBilledYearly ? 'bg-black ml-6' : 'bg-white ml-0'}`}
          />
        </div>
        <span className="text-sm text-zinc-300 font-medium select-none">Billed Yearly</span>
      </div>

    </section>
  );
}