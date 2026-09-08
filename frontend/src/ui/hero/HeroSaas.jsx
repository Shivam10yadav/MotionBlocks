import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroSection() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Background Interactive Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const size = 20;
    const gap = 10;
    const cols = Math.floor(width / (size + gap));
    const rows = Math.floor(height / (size + gap));

    const pixels = [];
    const mouse = { x: -1000, y: -1000, radius: 240 };

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (Math.random() < 0.22) {
          pixels.push({
            originX: c * (size + gap) + gap,
            originY: r * (size + gap) + gap,
            x: c * (size + gap) + gap,
            y: r * (size + gap) + gap,
            size: size,
            color: '#000000',
            activeColor: '#10B981',
            alpha: Math.random() * 0.08 + 0.04,
            currentAlpha: 0.05,
            scale: 1,
          });
        }
      }
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      pixels.forEach((p) => {
        const dx = mouse.x - p.originX;
        const dy = mouse.y - p.originY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (1 - dist / mouse.radius) * 18;
          p.x = p.originX - Math.cos(angle) * force;
          p.y = p.originY - Math.sin(angle) * force;
          p.currentAlpha = gsap.utils.interpolate(p.currentAlpha, 0.85, 0.15);
          p.scale = gsap.utils.interpolate(p.scale, 1.25, 0.15);
        } else {
          p.x = gsap.utils.interpolate(p.x, p.originX, 0.08);
          p.y = gsap.utils.interpolate(p.y, p.originY, 0.08);
          p.currentAlpha = gsap.utils.interpolate(p.currentAlpha, p.alpha, 0.05);
          p.scale = gsap.utils.interpolate(p.scale, 1, 0.08);
        }

        ctx.save();
        ctx.translate(p.x + p.size / 2, p.y + p.size / 2);
        ctx.scale(p.scale, p.scale);
        ctx.fillStyle = dist < mouse.radius ? p.activeColor : p.color;
        ctx.globalAlpha = p.currentAlpha;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // GSAP Entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(
        '.nav-stagger',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 }
      )
        .fromTo(
          '.hero-line-inner',
          { yPercent: 110 },
          { yPercent: 0, duration: 1, stagger: 0.1 },
          '-=0.3'
        )
        .fromTo(
          '.hero-fade',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
          '-=0.6'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#F4F4F0] text-[#000000] font-sans overflow-hidden flex flex-col justify-between selection:bg-[#10B981] selection:text-white"
    >
      {/* Background Interactive Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto z-0"
      />

      {/* Header */}
      <header className="relative z-20 w-full px-6 md:px-12 py-6 flex items-center justify-between">
        {/* Brand */}
        <div className="nav-stagger flex items-center gap-2.5">
          <span className="w-3.5 h-3.5 bg-[#10B981]" />
          <span className="font-extrabold tracking-tight text-xl uppercase text-[#000000]">
            Console<span className="font-light text-[#000000]/50">Fix</span>
          </span>
        </div>

        {/* Center Floating Capsule */}
        <nav className="nav-stagger hidden md:flex items-center gap-1 bg-[#000000] border border-white/10 px-3 py-2 rounded-full shadow-xl">
          {['Home','About','Features', 'Pricing', 'Docs'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="px-5 py-1.5 text-xs font-medium tracking-wide text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <a
            href="#login"
            className="nav-stagger text-xs font-semibold tracking-wide text-[#000000] hover:text-[#10B981] transition-colors hidden sm:inline-block"
          >
            Log In
          </a>
          <a
            href="#deploy"
            className="nav-stagger inline-flex items-center gap-2 bg-[#000000] text-white px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide hover:bg-[#10B981] transition-colors duration-200 shadow-md group"
          >
            <span>Start Free</span>
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </a>
        </div>
      </header>

      {/* Hero Content */}
      <main className="relative z-10 flex-1 px-6 md:px-16 py-12 flex flex-col justify-center items-center text-center max-w-4xl mx-auto my-auto">
        <div className="space-y-6 w-full flex flex-col items-center">
          {/* Headlines (Slightly Smaller & Cleaner Scale) */}
          <div className="space-y-0 w-full">
            <div className="overflow-hidden">
              <h1 className="hero-line-inner text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.92] text-[#000000]">
                Build Faster
              </h1>
            </div>
            <div className="overflow-hidden">
              <h1 className="hero-line-inner text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.92] text-[#10B981]">
                Launch Today
              </h1>
            </div>
          </div>

          {/* Simple, Readable Subtitle */}
          <p className="hero-fade text-sm sm:text-base md:text-lg text-[#222222] max-w-xl leading-relaxed font-normal">
            An all-in-one tool to build, test, and run your apps. Simple setup, instant results, and smooth performance.
          </p>

          {/* Action Buttons */}
          <div className="hero-fade flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-[#000000] text-white px-7 py-3.5 rounded-lg text-sm font-semibold tracking-wide hover:bg-[#10B981] transition-colors duration-200 shadow-xl">
              Get Started
            </button>
            <a
              href="#docs"
              className="w-full sm:w-auto border border-[#000000]/20 hover:border-[#000000] px-7 py-3.5 rounded-lg text-sm font-semibold tracking-wide text-[#000000] transition-colors bg-white/40 backdrop-blur-sm"
            >
              See How It Works
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}