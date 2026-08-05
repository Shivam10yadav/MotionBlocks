import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Shield, ArrowRight, Target } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function WarHero() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);

  useGSAP(
    () => {
      // 1. Initial Intro Animation Timeline
      const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      introTl
        .from('.war-badge', {
          y: -20,
          opacity: 0,
          duration: 0.6,
          delay: 0.2,
        })
        .from(
          '.war-title-line',
          {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
          },
          '-=0.3'
        )
        .from(
          '.war-subtext',
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
          },
          '-=0.4'
        )
        .from(
          '.war-cta-group',
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
          },
          '-=0.3'
        )
        .from(
          '.war-bg-glow',
          {
            scale: 0.8,
            opacity: 0,
            duration: 1.2,
            ease: 'sine.out',
          },
          0
        );

      // 2. ScrollTrigger Scrubbing Animation (Hero Exit / Pinning Effect)
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
        yPercent: 20,
        opacity: 0.15,
        filter: 'blur(8px)',
        scale: 0.95,
      });

      // 3. Parallax effect on the background tactical grid & embers
      gsap.to('.war-grid-bg', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        yPercent: -15,
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#0d0d0e] text-[#e2e0d8] overflow-hidden selection:bg-[#8b0000] selection:text-white"
    >
      {/* Background Layer: Tactical Grid & War Glows */}
      <div className="war-grid-bg absolute inset-0 bg-[radial-gradient(#1f1f22_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none" />
      
      {/* Dark Crimson Ambient Fire Glow */}
      <div className="war-bg-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,#6b0000_0%,#1a0505_40%,transparent_70%)] opacity-60 blur-3xl pointer-events-none" />

      {/* Hero Content Wrapper */}
      <div
        ref={heroRef}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen max-w-5xl mx-auto px-6 py-20 text-center"
      >
        {/* Tactical Badge */}
        <div className="war-badge inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-sm bg-[#1a0505] border border-[#8b0000]/40 text-[#c83232] text-xs uppercase tracking-[0.25em] font-mono">
          <Target className="w-3.5 h-3.5 animate-pulse" />
          <span>Operational Readiness // Sector 07</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#f0eee6] leading-[1.05] mb-6">
          <span className="war-title-line block">Forged In The</span>
          <span className="war-title-line block text-transparent bg-clip-text bg-gradient-to-r from-[#8b0000] via-[#c83232] to-[#d97706]">
            Fires Of Victory
          </span>
        </h1>

        {/* Subtitle */}
        <p className="war-subtext max-w-2xl text-base sm:text-lg text-[#a3a096] leading-relaxed mb-10 font-normal">
          Deploy high-stakes visual architectures engineered for maximum impact. 
          Uncompromising precision, strategic dominance, and unrelenting performance.
        </p>

        {/* CTA Group */}
        <div className="war-cta-group flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#8b0000] hover:bg-[#a30000] text-white font-bold uppercase tracking-wider text-sm transition-all duration-200 border border-[#b82e2e] shadow-[0_0_25px_rgba(139,0,0,0.4)] hover:shadow-[0_0_35px_rgba(198,50,50,0.6)]">
            <span>Initiate Protocol</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent hover:bg-[#1a191a] text-[#c5c2b8] hover:text-white font-bold uppercase tracking-wider text-sm transition-colors duration-200 border border-[#343336]">
            <Shield className="w-4 h-4 text-[#8b0000]" />
            <span>Read Specs</span>
          </button>
        </div>
      </div>
    </div>
  );
}