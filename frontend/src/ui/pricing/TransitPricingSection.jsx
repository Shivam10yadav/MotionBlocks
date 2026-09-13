import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PricingCard = ({ tier, price, cadence, description, features, isFeatured, gradientType, stairClipPath, badgeText }) => {
  const gradients = {
    magenta: "bg-gradient-to-b from-pink-500 via-purple-600 to-black",
    cyan: "bg-gradient-to-b from-cyan-400 via-blue-600 to-black",
    orange: "bg-gradient-to-b from-orange-500 via-purple-600 to-black",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative w-full max-w-[340px] h-[520px] bg-black border-[10px] border-black rounded-lg shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] flex flex-col justify-between overflow-hidden cursor-pointer group ${
        isFeatured ? 'ring-4 ring-emerald-400 shadow-[0_30px_60px_-10px_rgba(16,185,129,0.3)]' : ''
      }`}
    >
      {/* Background Gradient & Pixel Stair Steps */}
      <div className={`absolute inset-0 ${gradients[gradientType]} opacity-90`}>
        <div 
          className="absolute inset-0 bg-black"
          style={{ clipPath: stairClipPath }}
        ></div>
      </div>

      {/* Top Header */}
      <div className="relative z-10 p-5 pb-2 flex justify-between items-center bg-black/40 backdrop-blur-xs border-b border-white/10">
        <span className="text-[11px] font-mono font-bold tracking-wider text-white uppercase bg-white/10 px-2.5 py-1 rounded border border-white/20">
          {tier}
        </span>
        <span className={`text-[9px] font-mono font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full flex items-center gap-1 ${
          isFeatured 
            ? 'bg-emerald-400 text-black font-bold' 
            : 'bg-white/90 text-black'
        }`}>
          {isFeatured && <Sparkles className="w-2.5 h-2.5 text-black" />}
          {badgeText}
        </span>
      </div>

      {/* Internal Content with Maximum Contrast and Dark Solid Cards for 100% Readability */}
      <div className="relative z-10 px-6 py-4 my-auto flex flex-col justify-center">
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-4xl font-black font-mono tracking-tighter text-white drop-shadow-md">{price}</span>
          <span className="text-[11px] font-mono font-bold text-white/80 uppercase">/ {cadence}</span>
        </div>
        <p className="text-[11px] font-mono text-white font-medium tracking-tight leading-relaxed mb-4 bg-black/80 p-2.5 rounded border border-white/20 shadow-sm">
          {description}
        </p>
        <div className="w-full space-y-2 border-t border-white/20 pt-3">
          {features.map((feat, idx) => (
            <div key={idx} className="flex items-center gap-2.5 text-[11px] font-mono font-medium text-white">
              <div className="w-3.5 h-3.5 rounded-full bg-white text-black flex items-center justify-center shrink-0">
                <Check className="w-2.5 h-2.5 font-bold" />
              </div>
              <span className="bg-black/80 px-2 py-0.5 rounded border border-white/10">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="relative z-10 p-5 pt-2 bg-black/40 backdrop-blur-xs border-t border-white/10">
        <motion.button 
          whileTap={{ scale: 0.98 }}
          className={`w-full py-3 text-[11px] font-mono font-bold uppercase tracking-wider transition-all duration-200 border-2 ${
            isFeatured 
              ? 'bg-emerald-400 text-black border-emerald-400 hover:bg-emerald-300 shadow-md' 
              : 'bg-white text-black border-white hover:bg-neutral-200'
          }`}
        >
          Initialize Access
        </motion.button>
      </div>
    </motion.div>
  );
};

export default function TransitPricingSection() {
  const sectionRef = useRef(null);
  const rowRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      rowRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      }
    );
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full min-h-screen py-24 px-4 flex flex-col justify-center items-center overflow-hidden bg-[#e9e3d5]"
    >
      {/* Subway Ceramic Tile Wall Background Pattern with Warm Tint */}
      <div 
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #8a8275 1px, transparent 1px),
            linear-gradient(to bottom, #8a8275 1px, transparent 1px)
          `,
          backgroundSize: '60px 30px'
        }}
      ></div>

      {/* Section Header */}
      <div className="relative z-10 text-center mb-12">
        <span className="text-xs font-mono uppercase tracking-widest bg-[#2d3230] text-[#fbf9f5] px-4 py-1.5 rounded-full shadow-sm">
          Fare Schedule // Kiosk Access
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-[#1c1f1e] font-sans tracking-tight mt-3">
          Choose your deployment tier.
        </h2>
      </div>

      {/* Pricing Row Framed Against Subway Wall */}
      <div 
        ref={rowRef}
        className="relative z-10 max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center items-center bg-[#282d2c]/10 p-8 md:p-12 rounded-2xl border-4 border-[#282d2c]/25 shadow-2xl backdrop-blur-[3px]"
      >
        <PricingCard 
          tier="Starter"
          price="$29"
          cadence="mo"
          description="Essential toolkits for solo creators starting out."
          features={["Single seat license", "Core pixel engine", "Local-first pipelines"]}
          badgeText="For Individuals"
          gradientType="magenta"
          stairClipPath="polygon(0% 0%, 100% 0%, 100% 100%, 75% 100%, 75% 80%, 55% 80%, 55% 65%, 35% 65%, 35% 50%, 15% 50%, 15% 35%, 0% 35%)"
        />

        <PricingCard 
          tier="Studio"
          price="$79"
          cadence="mo"
          description="Advanced pipelines and priority rendering for growing teams."
          features={["Up to 5 team members", "Priority rendering queues", "Git media synchronization"]}
          isFeatured={true}
          badgeText="Most Popular"
          gradientType="cyan"
          stairClipPath="polygon(0% 0%, 100% 0%, 100% 35%, 85% 35%, 85% 50%, 65% 50%, 65% 65%, 35% 65%, 35% 50%, 15% 50%, 15% 35%, 0% 35%)"
        />

        <PricingCard 
          tier="Enterprise"
          price="$199"
          cadence="mo"
          description="Uncapped infrastructure access and custom edge security."
          features={["Unlimited seat licenses", "Dedicated node clusters", "Zero-latency edge delivery"]}
          badgeText="For Institutions"
          gradientType="orange"
          stairClipPath="polygon(0% 0%, 100% 0%, 100% 35%, 85% 35%, 85% 50%, 65% 50%, 65% 65%, 45% 65%, 45% 80%, 25% 80%, 25% 100%, 0% 100%)"
        />
      </div>
    </section>
  );
}