// src/localcomponents/PageTransition.jsx

import React, { useRef, useImperativeHandle, forwardRef } from "react";
import gsap from "gsap";

// Generates a natural jagged tear edge
function generateTearPath(width, segments = 24, jitter = 18) {
  const points = [];
  const step = width / segments;

  for (let i = 0; i <= segments; i++) {
    const x = i * step;
    const y = i === 0 || i === segments ? 0 : (Math.random() - 0.5) * jitter;
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }

  return points;
}

const PageTransition = forwardRef(function PageTransition(
  { onComplete },
  ref
) {
  const overlayRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const glowLineRef = useRef(null);

  const topClipRef = useRef(null);
  const bottomClipRef = useRef(null);
  const glowPolyRef = useRef(null);

  useImperativeHandle(ref, () => ({
    play(navigateCallback) {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const tearY = height / 2;

      // Generate points for the jagged tear line
      const edge = generateTearPath(width, 28, 20);

      // --- POLYGON PATH BUILDERS ---
      const topPoints = edge
        .map((point) => {
          const [x, y] = point.split(",");
          return `${(width - parseFloat(x)).toFixed(1)},${(
            tearY + parseFloat(y)
          ).toFixed(1)}`;
        })
        .join(" ");

      const bottomPoints = edge
        .map((point) => {
          const [x, y] = point.split(",");
          return `${parseFloat(x).toFixed(1)},${(
            tearY + parseFloat(y)
          ).toFixed(1)}`;
        })
        .join(" ");

      const topPoly = `0,0 ${width},0 ${width},${tearY} ${topPoints} 0,${tearY}`;
      const bottomPoly = `0,${tearY} ${bottomPoints} ${width},${tearY} ${width},${height} 0,${height}`;

      // Set Clip Paths
      topClipRef.current?.setAttribute("points", topPoly);
      bottomClipRef.current?.setAttribute("points", bottomPoly);
      glowPolyRef.current?.setAttribute("points", bottomPoints);

      // Kill running animations & show overlay container
      gsap.killTweensOf([
        topRef.current,
        bottomRef.current,
        glowLineRef.current,
        overlayRef.current,
      ]);

      gsap.set(overlayRef.current, { display: "block" });

      // Reset positions to off-screen (Scale/Slide inward)
      gsap.set(topRef.current, {
        y: `-${height * 0.5}px`,
        opacity: 0,
        scaleY: 1.05,
      });

      gsap.set(bottomRef.current, {
        y: `${height * 0.5}px`,
        opacity: 0,
        scaleY: 1.05,
      });

      gsap.set(glowLineRef.current, { opacity: 0, scaleX: 0 });

      // --- MASTER TIMELINE ---
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlayRef.current, { display: "none" });
          onComplete?.();
        },
      });

      // 1. PHASE ONE: Snap Cover (Slices Slam Together)
      tl.to([topRef.current, bottomRef.current], {
        y: "0px",
        opacity: 1,
        duration: 0.38,
        ease: "power4.out",
        stagger: 0.02,
      })
        // Pulse seam light along the tear
        .to(
          glowLineRef.current,
          {
            opacity: 1,
            scaleX: 1,
            duration: 0.25,
            ease: "expo.out",
          },
          "-=0.15"
        )
        // 2. NAVIGATE ROUTE (Screen fully covered at this exact frame)
        .add(() => {
          navigateCallback?.();
        })
        // Brief pause to anchor visual impact
        .to({}, { duration: 0.08 })

        // 3. PHASE TWO: Explosive Tear & Reveal
        .to(
          glowLineRef.current,
          {
            opacity: 0,
            duration: 0.15,
            ease: "power2.in",
          },
          "+=0.02"
        )
        .to(
          topRef.current,
          {
            y: `-${height * 0.75}px`,
            rotate: -3.5,
            skewX: -2,
            opacity: 0,
            duration: 0.65,
            ease: "expo.inOut",
          },
          "<"
        )
        .to(
          bottomRef.current,
          {
            y: `${height * 0.75}px`,
            rotate: 3.5,
            skewX: 2,
            opacity: 0,
            duration: 0.65,
            ease: "expo.inOut",
          },
          "<"
        );

      return tl;
    },
  }));

  return (
    <div
      ref={overlayRef}
      style={{ display: "none" }}
      className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
    >
      {/* SVG Clip Path Definitions */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="tear-top-clip" clipPathUnits="userSpaceOnUse">
            <polygon ref={topClipRef} points="" />
          </clipPath>

          <clipPath id="tear-bottom-clip" clipPathUnits="userSpaceOnUse">
            <polygon ref={bottomClipRef} points="" />
          </clipPath>
        </defs>
      </svg>

      {/* TOP HALF */}
      <div
        ref={topRef}
        className="absolute inset-0 bg-[#090A0F] border-b border-cyan-500/10"
        style={{
          clipPath: "url(#tear-top-clip)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.85)",
          willChange: "transform, opacity",
        }}
      />

      {/* BOTTOM HALF */}
      <div
        ref={bottomRef}
        className="absolute inset-0 bg-[#090A0F] border-t border-cyan-500/10"
        style={{
          clipPath: "url(#tear-bottom-clip)",
          boxShadow: "0 -12px 40px rgba(0,0,0,0.85)",
          willChange: "transform, opacity",
        }}
      />

      {/* ILLUMINATED SEAM GLOW (Overlay along tear line) */}
      <svg
        ref={glowLineRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10 origin-center"
        style={{ willChange: "transform, opacity" }}
      >
        <polyline
          ref={glowPolyRef}
          fill="none"
          stroke="rgba(56, 189, 248, 0.85)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: "drop-shadow(0 0 10px rgba(56,189,248,0.9))" }}
        />
      </svg>
    </div>
  );
});

export default PageTransition;