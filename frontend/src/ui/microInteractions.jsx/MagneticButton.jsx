import React, { useRef } from 'react';
import gsap from 'gsap';

export default function MagneticButton() {
  const buttonRef = useRef(null);
  const textRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();

    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);

    gsap.to(buttonRef.current, {
      x: x * 0.35,
      y: y * 0.35,
      duration: 0.6,
      ease: 'power3.out',
    });

    gsap.to(textRef.current, {
      x: x * 0.15,
      y: y * 0.15,
      duration: 0.6,
      ease: 'power3.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to([buttonRef.current, textRef.current], {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative px-8 py-4 bg-indigo-600 rounded-full text-white font-semibold shadow-lg hover:shadow-indigo-500/50 transition-shadow duration-300"
    >
      <span ref={textRef} className="block pointer-events-none">
        Hover Magnet
      </span>
    </button>
  );
}