import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const BANNER_TEXT = 'Kuchu Puchu tum kaha hoo';

export default function PlaneAnimation() {
  const letters = BANNER_TEXT.split('');
  const groupRef = useRef(null);
  const lettersRef = useRef([]);
  const stringRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Continuous left -> right flight loop
      gsap.fromTo(
        groupRef.current,
        { x: '-30vw' },
        {
          x: '130vw',
          duration: 9,
          repeat: -1,
          ease: 'none',
        }
      );

      // Gentle up/down bob, independent timing from the flight
      gsap.to(groupRef.current, {
        y: -10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // String sway
      gsap.to(stringRef.current, {
        rotate: 2,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        transformOrigin: '0% 50%',
      });

      // Banner letters ripple like fabric, staggered back-to-front
      gsap.to(lettersRef.current, {
        y: -5,
        rotate: -8,
        duration: 0.7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          each: 0.07,
          from: 'end',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full h-64">
      <div ref={groupRef} className="absolute flex items-center" style={{ top: '70%' }}>

        {/* Waving banner — trails behind the plane */}
        <div className="flex items-center gap-[2px] whitespace-nowrap mr-[-2px]">
          {letters.map((char, i) => (
            <span
              key={i}
              ref={(el) => (lettersRef.current[i] = el)}
              className="inline-block text-white font-bold text-lg tracking-wide"
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>

        {/* String connecting banner to the plane's tail */}
        <svg
          ref={stringRef}
          width="50"
          height="14"
          viewBox="0 0 50 14"
          className="shrink-0"
        >
          <path d="M0 7 Q 25 12 50 7" fill="none" stroke="#64748b" strokeWidth="1.5" />
        </svg>

        {/* Plane — leads the way, nose pointing right */}
        <svg
          width="90"
          height="34"
          viewBox="0 0 90 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          <path
            d="M2 17 C2 14 8 12 18 12 L68 12 C74 12 78 14.5 84 16.2 C86 16.8 86 17.2 84 17.8 C78 19.5 74 22 68 22 L18 22 C8 22 2 20 2 17 Z"
            fill="#e2e8f0"
            stroke="#94a3b8"
            strokeWidth="0.8"
          />
          <path d="M78 15.2 C81 15.8 83.5 16.5 84 17 C83.5 17.5 81 18.2 78 18.8 Z" fill="#38bdf8" />
          <path d="M38 12 L20 1 L28 1 L46 12 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="0.6" />
          <path d="M38 22 L20 33 L28 33 L46 22 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="0.6" />
          <path d="M8 12 L4 4 L12 12 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="0.6" />
          <path d="M8 22 L4 30 L12 22 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="0.6" />
          <circle cx="30" cy="17" r="1.2" fill="#64748b" />
          <circle cx="36" cy="17" r="1.2" fill="#64748b" />
          <circle cx="42" cy="17" r="1.2" fill="#64748b" />
          <circle cx="48" cy="17" r="1.2" fill="#64748b" />
          <circle cx="54" cy="17" r="1.2" fill="#64748b" />
          <circle cx="60" cy="17" r="1.2" fill="#64748b" />
        </svg>
      </div>
    </div>
  );
}