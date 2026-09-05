import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CursorTrail() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Spawn particle dot
      const dot = document.createElement('div');
      dot.className = 'absolute w-3 h-3 bg-indigo-500 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 blur-[1px]';
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      container.appendChild(dot);

      // Animate size decay & fade out
      gsap.to(dot, {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => dot.remove(),
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-64 bg-[#050203] border border-slate-800 rounded-2xl overflow-hidden cursor-crosshair flex items-center justify-center select-none"
    >
      <p className="text-slate-500 text-sm font-medium pointer-events-none">
        Move cursor here to view trail
      </p>
    </div>
  );
}