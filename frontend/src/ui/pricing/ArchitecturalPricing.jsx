import React from 'react';
import { ArrowRight, Asterisk } from 'lucide-react';

export default function TiltedArchitecturalPricing() {
  return (
    <div className="h-screen w-full bg-[#E3DDD3] text-[#1A1816] px-6 py-4 flex flex-col justify-between overflow-hidden font-sans select-none">
      <div className="max-w-5xl mx-auto w-full h-full flex flex-col justify-between py-2">
        
        {/* Top Header */}
        <div className="flex justify-between items-end border-b-2 border-[#1A1816]/15 pb-3">
          <div>
            <span className="text-xs uppercase tracking-widest font-black text-[#625D56]">
              Deployment Tiering
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#1A1816] mt-0.5">
              Select Your Engine
            </h2>
          </div>
          <p className="text-xs font-semibold text-[#625D56] max-w-xs text-right hidden sm:block">
            High-availability compute, dedicated storage, and enterprise SLAs.
          </p>
        </div>

        {/* Main Cards Area with Perspective Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-auto items-center [perspective:1200px]">
          
          {/* TILTED CARD 1: STARTER PLAN */}
          <div className="bg-[#211E1B] text-[#F4F0EA] rounded-[28px] p-6 flex flex-col justify-between shadow-2xl border border-black/30 relative transition-all duration-500 hover:rotate-0 hover:scale-105 hover:z-20 -rotate-6 -translate-y-1 translate-x-2">
            
            {/* Architectural 3D Side Shadow Edge */}
            <div className="absolute -left-3 top-4 bottom-4 w-3 bg-[#141210] rounded-l-md -skew-y-12 origin-right -z-10 opacity-80" />

            <div>
              {/* Header Title & Badge */}
              <div className="flex items-center gap-2 mb-2">
                <Asterisk className="w-5 h-5 text-[#E0D5C3] stroke-[2.5]" />
                <h3 className="text-xl font-black tracking-wide uppercase text-white">
                  Starter Plan
                </h3>
              </div>
              
              <div className="mb-4">
                <span className="inline-block bg-[#36322D] text-[#E0D5C3] text-xs font-extrabold px-3 py-1 rounded-full border border-white/10 shadow-inner">
                  Free · Indie Dev
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-[#A39B90] font-medium leading-snug mb-5">
                Ideal for new serverless deployments and experimentation.
              </p>

              {/* Feature List */}
              <div className="space-y-2.5 border-t-2 border-white/10 pt-3 text-xs text-[#E6E0D6]">
                <div className="flex items-center justify-between">
                  <span><strong className="font-extrabold text-white">Up to 10k</strong> Monthly Edge Requests</span>
                </div>
                <div className="border-t border-white/10 pt-2.5 flex items-center justify-between">
                  <span><strong className="font-extrabold text-white">10GB</strong> Secure Edge Storage</span>
                </div>
                <div className="border-t border-white/10 pt-2.5 flex items-center justify-between">
                  <span><strong className="font-semibold text-[#D3C9BC]">Basic</strong> Platform Analytics</span>
                </div>
                <div className="border-t border-white/10 pt-2.5 flex items-center justify-between">
                  <span><strong className="font-extrabold text-white">Community</strong> Support Channel Access</span>
                </div>
              </div>
            </div>

            {/* Pill CTA Button */}
            <div className="mt-5 pt-1">
              <button className="w-full bg-[#F4F0EA] hover:bg-white text-[#1A1816] font-bold text-xs py-2.5 px-5 rounded-full flex items-center justify-between group transition-all shadow-md">
                <span className="font-extrabold tracking-wide">Get Started</span>
                <div className="w-6 h-6 rounded-full bg-[#1A1816] text-white flex items-center justify-center transition-transform group-hover:translate-x-1">
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </button>
            </div>
          </div>

          {/* CARD 2: PRO TEAM PLAN (Straight Card) */}
          <div className="bg-[#5C564E] text-[#F9F8F6] rounded-[28px] p-6 flex flex-col justify-between shadow-xl border border-black/10 transition-transform duration-300 hover:scale-[1.01]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Asterisk className="w-5 h-5 text-[#F0EAD8] stroke-[2.5]" />
                <h3 className="text-xl font-black tracking-wide uppercase text-white">
                  Pro Team Plan
                </h3>
              </div>

              <div className="mb-4">
                <span className="inline-block bg-[#48423B] text-[#F0EAD8] text-xs font-extrabold px-3 py-1 rounded-full border border-white/10 shadow-inner">
                  $39/mo · Pro Group
                </span>
              </div>

              <p className="text-xs text-[#D8D2C7] font-medium leading-snug mb-5">
                For teams building scalable applications with high availability.
              </p>

              <div className="space-y-2.5 border-t-2 border-white/15 pt-3 text-xs text-[#F2EFE9]">
                <div className="flex items-center justify-between">
                  <span><strong className="font-extrabold text-white">Unlimited</strong> Global Edge Requests</span>
                </div>
                <div className="border-t border-white/15 pt-2.5 flex items-center justify-between">
                  <span><strong className="font-extrabold text-white">100GB</strong> Dedicated Database Storage</span>
                </div>
                <div className="border-t border-white/15 pt-2.5 flex items-center justify-between">
                  <span><strong className="font-semibold text-[#E2DCD0]">Enhanced</strong> App-Level Performance Metrics</span>
                </div>
                <div className="border-t border-white/15 pt-2.5 flex items-center justify-between">
                  <span><strong className="font-extrabold text-white">Priority</strong> Email & Ticket Support</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-1 flex justify-start">
              <button className="w-9 h-9 rounded-full border-2 border-white/60 hover:border-white hover:bg-white/15 text-white flex items-center justify-center transition-all shadow-sm">
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Horizontal Card: ENTERPRISE */}
        <div className="bg-[#FAF8F5] border-2 border-[#1A1816]/20 rounded-[28px] p-5 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            <div className="md:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Asterisk className="w-5 h-5 text-[#1A1816] stroke-[2.5]" />
                  <h3 className="text-xl font-black tracking-wide uppercase text-[#1A1816]">
                    Enterprise Custom
                  </h3>
                </div>
                <div className="mb-2">
                  <span className="inline-block bg-[#E5DFC3] text-[#282521] text-xs font-black px-3 py-0.5 rounded-full border border-black/10">
                    Contact Sales · Multi-Org
                  </span>
                </div>
                <p className="text-xs text-[#5C564E] font-medium leading-tight max-w-xs">
                  Fully managed solutions for high-compliance and global operations.
                </p>
              </div>

              <div className="mt-3">
                <button className="w-9 h-9 rounded-full border-2 border-[#1A1816] hover:bg-[#1A1816] hover:text-white text-[#1A1816] flex items-center justify-center transition-all shadow-sm">
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>

            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#2C2925] border-t md:border-t-0 md:border-l-2 border-[#1A1816]/15 pt-3 md:pt-0 md:pl-6">
              <div className="space-y-1">
                <p className="font-extrabold text-[#1A1816]">Full SLA and Compliance Certifications (SOC2/GDPR)</p>
                <p className="font-semibold text-[#1A1816]">Multi-Region Dedicated DB Hosting</p>
              </div>
              <div className="space-y-1">
                <p className="font-extrabold text-[#1A1816]">Dedicated Solutions Architect (DSA)</p>
                <p className="font-semibold text-[#1A1816]">24/7/365 On-Call Phone & Pager Support</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}