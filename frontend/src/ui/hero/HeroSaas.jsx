import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroSection() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Dynamic Editorial Theme Palette
  const theme = {
    bg: '#F6F3EE',          // Warm Editorial Paper
    ink: '#121110',         // Deep Black Ink
    muted: '#706E6B',       // Muted Charcoal
    accent: '#D9383A',      // Vibrant Luxury Crimson Red
    gridBase: '#E2DDD5',    // Subtle Inactive Grid Point
  };

  // Upgraded Interactive Dot Grid Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = 0;
    let height = 0;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const size = 16;
    const gap = 14;
    const cols = Math.floor(width / (size + gap));
    const rows = Math.floor(height / (size + gap));

    const pixels = [];
    const mouse = { x: -1000, y: -1000, radius: 260 };

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (Math.random() < 0.28) {
          pixels.push({
            originX: c * (size + gap) + gap,
            originY: r * (size + gap) + gap,
            x: c * (size + gap) + gap,
            y: r * (size + gap) + gap,
            size: size,
            color: theme.gridBase,
            activeColor: theme.accent,
            alpha: Math.random() * 0.25 + 0.08,
            currentAlpha: 0.08,
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
          const force = (1 - dist / mouse.radius) * 24;
          p.x = p.originX - Math.cos(angle) * force;
          p.y = p.originY - Math.sin(angle) * force;
          p.currentAlpha = gsap.utils.interpolate(p.currentAlpha, 0.95, 0.12);
          p.scale = gsap.utils.interpolate(p.scale, 1.3, 0.12);
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

        if (dist < mouse.radius) {
          ctx.shadowColor = 'rgba(217, 56, 58, 0.3)';
          ctx.shadowBlur = 10;
        }

        ctx.beginPath();
        ctx.roundRect(-p.size / 2, -p.size / 2, p.size, p.size, 3);
        ctx.fill();
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

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(
        '.nav-stagger',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.06 }
      )
        .fromTo(
          '.hero-badge',
          { scale: 0.9, opacity: 0, y: 10 },
          { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.4)' },
          '-=0.4'
        )
        .fromTo(
          '.hero-line-inner',
          { yPercent: 110, rotateX: -20, opacity: 0 },
          { yPercent: 0, rotateX: 0, opacity: 1, duration: 1.1, stagger: 0.1 },
          '-=0.4'
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
      style={{ backgroundColor: theme.bg, color: theme.ink }}
      className="relative min-h-screen w-full font-sans overflow-hidden flex flex-col justify-between selection:bg-[#D9383A] selection:text-white antialiased"
    >
      {/* Background Interactive Pixel Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto z-0 opacity-70"
      />

      {/* Header */}
      <header className="relative z-20 w-full px-8 md:px-16 py-8 flex items-center justify-between border-b border-[#121110]/10">
        {/* Brand Details */}
        <div className="nav-stagger flex items-center gap-3 cursor-pointer group">
          <div className="w-3.5 h-3.5 bg-[#D9383A] rounded-sm group-hover:rotate-45 transition-transform duration-500 ease-out" />
          <span className="font-extrabold tracking-widest text-sm uppercase">
            Console<span className="font-light italic font-serif text-[#D9383A]">/Fix</span>
          </span>
        </div>

        {/* Floating Capsule Header */}
        <nav className="nav-stagger hidden md:flex items-center gap-1 bg-[#121110] text-[#F6F3EE] px-4 py-2 rounded-full shadow-xl">
          {['Overview', 'Features', 'Pricing', 'Docs'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="px-4 py-1.5 text-xs font-mono tracking-widest text-neutral-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 uppercase"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest">
          <a
            href="#deploy"
            className="nav-stagger inline-flex items-center gap-2 bg-[#D9383A] text-white px-6 py-2.5 rounded-full font-bold hover:bg-[#121110] transition-colors duration-300 shadow-lg shadow-[#D9383A]/20 group"
          >
            <span>Start Free</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </header>

      {/* Main Hero Content */}
      <main className="relative z-10 flex-1 px-8 md:px-16 py-12 flex flex-col justify-center items-center text-center max-w-6xl mx-auto my-auto">
        <div className="space-y-8 w-full flex flex-col items-center">
          
          {/* Editorial Micro-Badge */}
          <div className="hero-badge inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#D9383A]/25 bg-[#D9383A]/10 text-[#D9383A] text-xs font-mono uppercase tracking-widest backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D9383A] animate-pulse" />
            <span>ConsoleFix v3.0 Released</span>
          </div>

          {/* Typography Layout */}
          <div className="space-y-1 w-full [perspective:1000px]">
            <div className="overflow-hidden">
              <h1 className="hero-line-inner text-6xl sm:text-8xl lg:text-[105px] font-extrabold tracking-tighter uppercase leading-[0.88]">
                Simply <span className="font-serif italic font-normal text-[#121110] lowercase">Better.</span>
              </h1>
            </div>
            <div className="overflow-hidden">
              <h1 className="hero-line-inner text-6xl sm:text-8xl lg:text-[105px] font-extrabold tracking-tighter uppercase leading-[0.88] text-[#D9383A]">
                Ready, Set, Go.
              </h1>
            </div>
          </div>

          {/* Subtitle */}
          <p className="hero-fade text-base sm:text-lg md:text-xl text-[#706E6B] max-w-xl leading-relaxed font-normal tracking-wide">
            An all-in-one developer engine built for clarity, precision, and speed. Simple setup, instant execution, zero overhead.
          </p>

          {/* Action Row */}
          <div className="hero-fade flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto font-mono text-xs uppercase tracking-widest">
            <button className="w-full sm:w-auto bg-[#121110] text-white px-9 py-4 rounded-xl font-bold hover:bg-[#D9383A] transition-colors duration-300 shadow-xl">
              Get Started Now
            </button>
            <a
              href="#docs"
              className="w-full sm:w-auto border border-[#121110]/20 hover:border-[#121110] px-9 py-4 rounded-xl font-bold text-[#121110] transition-colors bg-white/40 backdrop-blur-sm"
            >
              See How It Works
            </a>
          </div>

        </div>
      </main>

      {/* Footer Telemetry Bar */}
      <footer className="relative z-10 w-full px-8 md:px-16 py-6 border-t border-[#121110]/10 flex flex-col sm:flex-row items-center justify-between font-mono text-[11px] uppercase tracking-widest text-[#706E6B] gap-4">
        <div className="flex items-center gap-8">
          <span>LATENCY / &lt;12MS</span>
          <span>UPTIME / 99.99%</span>
          <span>REFRESH / 120 FPS</span>
        </div>
        <div className="flex items-center gap-2.5 bg-white/70 px-4 py-1.5 rounded-full border border-[#121110]/10 shadow-sm backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-[#D9383A] animate-pulse" />
          <span className="font-semibold text-[#121110]">All Systems Operational</span>
        </div>
      </footer>
    </div>
  );
}