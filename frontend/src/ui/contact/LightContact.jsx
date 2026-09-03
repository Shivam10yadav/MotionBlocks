import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FaArrowRight, FaCopy, FaCheck } from 'react-icons/fa';

export default function LightContact() {
  const containerRef = useRef(null);
  const [copiedField, setCopiedField] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal header text
      gsap.from('.reveal-text', {
        yPercent: 100,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
      });

      // Expand dividers
      gsap.from('.divider-line', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.2,
        stagger: 0.1,
        ease: 'expo.out',
        delay: 0.2,
      });

      // Fade in contact items
      gsap.from('.contact-row', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.4,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const contactDetails = [
    { id: 'email', label: 'Email', value: 'hello@studio-craft.design', note: 'Replies within a few hours', copyable: true },
    { id: 'phone', label: 'Phone', value: '+1 (888) 492-0192', note: 'Monday to Friday', copyable: true },
    { id: 'location', label: 'Office', value: '740 Broadway, Fl 12, New York', note: 'By appointment only', copyable: false },
  ];

  const socialLinks = [
    { name: 'Twitter', handle: '@studiocraft', url: '#' },
    { name: 'GitHub', handle: 'studiocraft-dev', url: '#' },
    { name: 'LinkedIn', handle: 'studio-craft-agency', url: '#' },
    { name: 'Dribbble', handle: 'studiocraft', url: '#' },
    { name: 'Discord', handle: 'Join community', url: '#' },
  ];

  return (
    <section 
      ref={containerRef} 
      className="w-full min-h-screen bg-[#FBFBFB] text-[#111111] py-20 px-6 sm:px-12 lg:px-20 font-sans flex items-center selection:bg-black selection:text-white"
    >
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-start">
        
        {/* Left Column */}
        <div className="lg:col-span-5 flex flex-col justify-between min-h-[60vh]">
          <div>
            <div className="overflow-hidden mb-3">
              <span className="reveal-text block text-xs tracking-widest text-neutral-500 uppercase font-medium">
                Get in touch
              </span>
            </div>

            <div className="overflow-hidden">
              <h1 className="reveal-text text-5xl sm:text-7xl font-light tracking-tight leading-none text-black">
                Let's work <br />
                <span className="italic font-normal">together.</span>
              </h1>
            </div>

            <div className="overflow-hidden mt-6">
              <p className="reveal-text text-base text-neutral-600 leading-relaxed font-normal max-w-sm">
                Have a project in mind or want to say hello? Send us a message and we'll get back to you shortly.
              </p>
            </div>
          </div>

          {/* Availability note */}
          <div className="mt-12 lg:mt-0 pt-6 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500">
            <span>New York, NY</span>
            <span className="flex items-center gap-2 font-medium text-black">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Available for new projects
            </span>
          </div>
        </div>

        {/* Right Column - Contact Details */}
        <div className="lg:col-span-7 flex flex-col">
          
          <div className="divider-line w-full h-[1px] bg-neutral-200" />

          {contactDetails.map((item, idx) => (
            <React.Fragment key={item.id}>
              <div className="contact-row group py-8 transition-colors duration-300 hover:bg-neutral-100/60 px-2 sm:px-4 -mx-2 sm:-mx-4 rounded-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  
                  <div className="w-24">
                    <span className="text-xs text-neutral-400 font-medium block">
                      0{idx + 1} / {item.label}
                    </span>
                  </div>

                  <div className="flex-1">
                    <span className="text-xl sm:text-2xl font-normal text-black group-hover:translate-x-1 transition-transform duration-300 block">
                      {item.value}
                    </span>
                    <span className="text-xs text-neutral-500 mt-1 block">
                      {item.note}
                    </span>
                  </div>

                  {item.copyable && (
                    <button
                      onClick={() => handleCopy(item.value, item.id)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-neutral-300 text-xs text-neutral-700 hover:border-black hover:text-black transition-all self-start sm:self-auto bg-white shadow-sm"
                    >
                      {copiedField === item.id ? (
                        <>
                          <FaCheck className="text-emerald-600" /> Copied
                        </>
                      ) : (
                        <>
                          <FaCopy className="text-neutral-400" /> Copy
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
              <div className="divider-line w-full h-[1px] bg-neutral-200" />
            </React.Fragment>
          ))}

          {/* Social Links */}
          <div className="mt-12 pt-4">
            <span className="text-xs text-neutral-400 uppercase tracking-wider block mb-4 font-medium">
              Socials
            </span>
            <div className="flex flex-wrap gap-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="group flex items-center gap-1.5 text-sm text-neutral-700 hover:text-black font-medium transition-colors"
                >
                  <span>{social.name}</span>
                  <FaArrowRight className="text-[10px] -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-neutral-400 group-hover:text-black" />
                </a>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}