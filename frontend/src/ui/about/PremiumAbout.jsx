import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function PremiumAbout() {
  const containerRef = useRef(null);

  const pillars = [
    {
      label: 'Innovation',
      title: 'Pushing boundaries thoughtfully.',
      description:
        'We explore modern technologies and methodologies to build resilient, scalable digital solutions designed to grow alongside your business.',
    },
    {
      label: 'Performance',
      title: 'Built for seamless efficiency.',
      description:
        'Every layer of our infrastructure is tailored for high efficiency, speed, and reliable uptime, ensuring optimal experiences across all touchpoints.',
    },
    {
      label: 'Design',
      title: 'Crafted with absolute clarity.',
      description:
        'We prioritize intuitive layouts, functional aesthetics, and precise attention to detail to make complex workflows feel effortless.',
    },
  ];

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.line-divider',
        { scaleX: 0 },
        { scaleX: 1, transformOrigin: 'left center', duration: 0.8 }
      ).fromTo(
        '.fade-up',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.06 },
        '-=0.4'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-screen h-screen bg-[#FBF9F5] text-[#2C2825] font-sans px-6 md:px-12 py-6 flex flex-col justify-between overflow-hidden selection:bg-[#E6D5C3] selection:text-[#2C2825]"
    >
      <div className="max-w-5xl mx-auto w-full h-full flex flex-col justify-between">
        
        {/* TOP HEADER */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <div className="fade-up flex items-center gap-3">
              {/* Soft Gold Award Ribbon Icon */}
              <div className="w-8 h-8 rounded-full bg-[#F3E7D3] border border-[#D8C2A8] flex items-center justify-center shadow-sm">
                <svg
                  className="w-4 h-4 text-[#B8860B]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l2.4 5 5.6.8-4 4 1 5.6-5-2.6-5 2.6 1-5.6-4-4 5.6-.8z" />
                </svg>
              </div>
              <h1 className="font-serif text-2xl sm:text-4xl tracking-wide uppercase text-[#2C2825] font-bold">
                About US
              </h1>
            </div>
         
          </div>

          <div className="line-divider w-full h-[1px] bg-[#E3D9CC]" />
        </div>

        {/* MAIN TEXT SECTION (Warm Hover Effect) */}
        <div className="space-y-4 my-auto max-w-4xl">
          {/* Paragraph 1 */}
          <p className="fade-up text-lg sm:text-2xl md:text-[1.85rem] font-medium leading-[1.35] text-[#B5A89B] transition-colors duration-300 hover:text-[#2C2825] cursor-pointer">
            <span className="text-[#2C2825] font-semibold">
              ‘At the leading edge of digital innovation &amp; experience design.’
            </span>{' '}
            Lots has changed over the years, but our core philosophy has not.
          </p>

          {/* Paragraph 2 */}
          <p className="fade-up text-lg sm:text-2xl md:text-[1.85rem] font-medium leading-[1.35] text-[#B5A89B] transition-colors duration-300 hover:text-[#2C2825] cursor-pointer uppercase tracking-tight">
            Give our best. Overcommunicate always. Support clients &amp; team members. Treat others with respect. Empower growth. Take ownership. Aim higher.
          </p>

          {/* Paragraph 3 */}
          <p className="fade-up text-lg sm:text-2xl md:text-[1.85rem] font-medium leading-[1.35] text-[#B5A89B] transition-colors duration-300 hover:text-[#2C2825] cursor-pointer">
            A dedicated partner for transformative tech strategy &amp; high-performance creation —{' '}
            <span className="text-[#2C2825] font-semibold">every single time.</span>
          </p>
        </div>

        {/* BOTTOM PILLARS / TAB SECTION */}
        <div className="space-y-3 pb-2">
          <div className="line-divider w-full h-[1px] bg-[#E3D9CC]" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Tab Selectors */}
            <div className="md:col-span-4 flex flex-col space-y-1.5">
              {pillars.map((item, index) => {
                const isActive = activeTab === index;
                return (
                  <button
                    key={item.label}
                    onClick={() => setActiveTab(index)}
                    className={`fade-up text-left px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-200 flex items-center justify-between ${
                      isActive
                        ? 'bg-[#2C2825] text-[#FBF9F5] shadow-sm'
                        : 'text-[#8C827A] hover:text-[#2C2825] hover:bg-[#EFEADF]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-[10px] opacity-60">
                      0{index + 1}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Content Display Card */}
            <div className="fade-up md:col-span-8 p-4 bg-[#FAF6F0] border border-[#E3D9CC] rounded-xl flex flex-col justify-center space-y-1 shadow-sm">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C827A]">
                Pillar 0{activeTab + 1}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-[#2C2825] tracking-tight">
                {pillars[activeTab].title}
              </h2>
              <p className="text-xs sm:text-sm text-[#635B54] leading-relaxed">
                {pillars[activeTab].description}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}