import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_WORDS = [
  { text: "Warmth", outline: false },
  { text: "Motion", outline: true },
  { text: "Ember", outline: false },
  { text: "Amber", outline: true },
  { text: "Horizon", outline: false },
  { text: "Glow", outline: true },
];

export default function HorizontalScrollText({ words = DEFAULT_WORDS }) {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const fillRef = useRef(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const wrap = wrapRef.current;

    const getScrollDistance = () =>
      track.scrollWidth - window.innerWidth + window.innerWidth * 0.1;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => "+=" + getScrollDistance() * 1.4,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (fillRef.current) {
              fillRef.current.style.width = self.progress * 100 + "%";
            }
          },
        },
      });
    }, wrap);

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, [words]);

  return (
    <div
      ref={wrapRef}
      className="relative h-screen overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 20% 30%, rgba(232,93,47,0.25), transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(244,162,89,0.18), transparent 55%), linear-gradient(180deg, #1c0f0a, #3a1a0f)",
      }}
    >
      <div className="absolute top-8 left-[8vw] text-[#f4e9dc]/50 text-xs tracking-[0.25em] uppercase">
        Swipe / Scroll
      </div>

      <div
        ref={trackRef}
        className="flex items-center h-full will-change-transform pl-[10vw]"
      >
        {words.map((w, i) => (
          <div
            key={i}
            className="text-[16vw] font-extrabold leading-none tracking-tight whitespace-nowrap mr-[6vw]"
            style={
              w.outline
                ? {
                    WebkitTextStroke: "2px #d97757",
                    color: "transparent",
                  }
                : {
                    backgroundImage:
                      "linear-gradient(90deg, #f4a259, #e85d2f, #d97757)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }
            }
          >
            {w.text}
          </div>
        ))}
      </div>

      <div className="absolute bottom-9 left-[8vw] right-[8vw] h-[2px] bg-[#f4e9dc]/15">
        <div
          ref={fillRef}
          className="h-full w-0"
          style={{
            background: "linear-gradient(90deg, #f4a259, #e85d2f)",
          }}
        />
      </div>
    </div>
  );
}