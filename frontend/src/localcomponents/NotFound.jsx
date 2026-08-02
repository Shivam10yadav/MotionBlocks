import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { Home, LayoutGrid, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const containerRef = useRef(null);
  const digitsRef = useRef([]);
  const glowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      gsap.set(digitsRef.current, { opacity: 0, y: 40, scale: 0.8 });
      gsap.set("[data-fade]", { opacity: 0, y: 16 });
      gsap.set(glowRef.current, { opacity: 0, scale: 0.6 });

      tl.to(glowRef.current, { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" })
        .to(
          digitsRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "back.out(1.7)",
          },
          "-=0.8"
        )
        .to("[data-fade]", { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, "-=0.2");

      // Gentle idle float on the "0" digit for a bit of life after entrance
      gsap.to(digitsRef.current[1], {
        y: -10,
        duration: 2.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.6,
      });

      // Slow ambient glow pulse
      gsap.to(glowRef.current, {
        opacity: 0.6,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#08090D] px-6 text-center text-[#F4F3F1] [--ember:#FF7A45] [--teal:#5EEAD4]"
    >
      <style>{`
        .blueprint-grid {
          background-image:
            linear-gradient(to right, rgba(94,234,212,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(94,234,212,0.06) 1px, transparent 1px);
          background-size: 32px 32px;
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
        }
      `}</style>

      {/* Background grid + ambient glow */}
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-60" />
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[--ember] opacity-40 blur-[130px]"
      />
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-64 w-64 rounded-full bg-[--teal] opacity-20 blur-[110px]" />

      {/* 404 digits */}
      <div className="relative flex items-center justify-center gap-3 font-display text-8xl font-bold tracking-tighter sm:gap-5 sm:text-9xl">
        {["4", "0", "4"].map((digit, i) => (
          <span
            key={i}
            ref={(el) => (digitsRef.current[i] = el)}
            className="bg-gradient-to-br from-[#F4F3F1] via-[#F4F3F1] to-[--teal] bg-clip-text text-transparent drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
          >
            {digit}
          </span>
        ))}
      </div>

      <p
        data-fade
        className="relative mt-6 font-code text-xs uppercase tracking-[0.3em] text-[--ember]"
      >
        Component not found
      </p>

      <h1 data-fade className="relative mt-4 max-w-xl text-2xl font-semibold sm:text-3xl">
        This part isn't in the catalog
      </h1>

      <p data-fade className="relative mt-3 max-w-md text-sm leading-relaxed text-[#8B8D98] sm:text-base">
        The page you're looking for doesn't exist, was moved, or never made it into the library.
      </p>

      <div data-fade className="relative mt-9 flex flex-col items-center gap-3 sm:flex-row">
   
           <Link
  to="/"
  style={{ backgroundColor: "#FF7A45", color: "#08090D" }}
  className="relative inline-flex cursor-pointer items-center gap-2 rounded-full px-6 py-3 text-xs font-semibold shadow-[0_0_20px_rgba(255,122,69,0.35)] transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
>
  Back to Home
</Link>

        <Link
          to="/components"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#23262F] bg-[#111319] px-6 py-3 text-sm font-semibold text-[#F4F3F1] transition-all duration-200 hover:border-[--teal]/40 hover:text-[--teal] active:scale-[0.97] sm:w-auto"
        >
          <LayoutGrid size={16} />
          Browse Components
        </Link>
      </div>

      <button
        data-fade
        onClick={() => window.history.back()}
        className="group relative mt-8 inline-flex items-center gap-1.5 font-code text-xs uppercase tracking-widest text-[#5C5F6B] transition hover:text-[#8B8D98]"
      >
        <ArrowLeft size={14} className="transition group-hover:-translate-x-0.5" />
        Go back
      </button>
    </div>
  );
}