import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

// Brand-colored parallax layers replacing the original external images —
// same 4-layer depth effect, built from gradients/shapes in your palette
// instead of someone else's copyrighted assets.
const LAYERS = [
  {
    layer: "1",
    yPercent: 70,
    content: (
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,122,69,0.25),transparent_60%)]" />
    ),
  },
  {
    layer: "2",
    yPercent: 55,
    content: (
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(94,234,212,0.2),transparent_55%)]" />
    ),
  },
  {
    layer: "3",
    yPercent: 40,
    content: (
      <div className="flex h-full w-full flex-col items-center justify-center gap-5 px-4 text-center">
        <h2 className="tahoe-glass-text select-none text-[3.2rem] font-bold tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl">
          Motion Blocks
        </h2>
        <p className="max-w-md text-sm font-light text-[#C4C6CF] sm:max-w-lg sm:text-lg md:text-xl">
          A copy-paste library of animated React and Tailwind components — no install, no config, just scroll and grab what you need.
        </p>
      </div>
    ),
  },
  {
    layer: "4",
    yPercent: 10,
    content: (
      <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(94,234,212,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(94,234,212,0.06)_1px,transparent_1px)] [background-size:36px_36px]" />
    ),
  },
];

export function Hero() {
  const parallaxRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggerElement = parallaxRef.current?.querySelector("[data-parallax-layers]");
    let tl;

    if (triggerElement) {
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "0% 0%",
          end: "100% 0%",
          scrub: 0,
        },
      });

      LAYERS.forEach((layerObj, idx) => {
        tl.to(
          triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
          {
            yPercent: layerObj.yPercent,
            ease: "none",
          },
          idx === 0 ? undefined : "<"
        );
      });
    }

    // No local Lenis instance here — SmoothScrollProvider (mounted once
    // at the app root) already drives scroll + syncs ScrollTrigger.update.

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      if (triggerElement) gsap.killTweensOf(triggerElement);
    };
  }, []);

  return (
    <div ref={parallaxRef} className="relative bg-[#08090D] text-[#F4F3F1]">
      <style>{`
        .tahoe-glass-text {
          color: transparent;
          background: linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.5) 30%, rgba(94,234,212,0.85) 50%, rgba(255,255,255,0.3) 70%, #ffffff 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-stroke: 1px rgba(255,255,255,0.2);
          filter: drop-shadow(0 15px 35px rgba(0,0,0,0.85)) drop-shadow(0 0 15px rgba(255,122,69,0.25));
          animation: shimmer 8s linear infinite;
        }
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: 0% center; }
        }
      `}</style>

      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <div data-parallax-layers className="absolute inset-0">
            {LAYERS.map((l) => (
              <div
                key={l.layer}
                data-parallax-layer={l.layer}
                className="absolute inset-0 will-change-transform"
              >
                {l.content}
              </div>
            ))}
          </div>

          {/* Bottom fade into the rest of the page */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#08090D] to-transparent" />
        </div>
      </section>

      <section className="relative flex h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center [--ember:#FF7A45] [--teal:#5EEAD4]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 160 160"
          className="h-14 w-14 text-[--ember] opacity-80 sm:h-16 sm:w-16"
          fill="none"
        >
          <rect
            x="35"
            y="35"
            width="90"
            height="90"
            rx="18"
            transform="rotate(45 80 80)"
            stroke="currentColor"
            strokeWidth="10"
          />
          <circle cx="80" cy="80" r="10" fill="currentColor" />
        </svg>

        <h3 className="text-2xl font-semibold text-white sm:text-3xl">
          Built for builders, not browsers.
        </h3>

        <p className="max-w-md text-sm leading-relaxed text-[#8B8D98] sm:text-base">
          Every component here is plain React and Tailwind — copy it, own it, and ship it however you like. No lock-in, no dependencies you didn't ask for.
        </p>
     <Link
  to="/components"
  style={{ backgroundColor: "#FF7A45", color: "#08090D" }}
  className="relative inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold shadow-[0_0_20px_rgba(255,122,69,0.35)] transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
>
  Browse Components
</Link>
      </section>
    </div>
  );
}

export default Hero;