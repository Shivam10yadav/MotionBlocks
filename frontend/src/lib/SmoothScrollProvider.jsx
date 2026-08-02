import { createContext, useContext, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext(null);

// Wrap your whole app with this ONCE (in App.jsx / main.jsx).
// Every component that needs scroll-driven animation should use
// ScrollTrigger directly and read from this shared Lenis instance
// instead of creating a `new Lenis()` of its own — multiple Lenis
// instances on one page fight each other and cause janky/duplicated
// scroll behavior.
export const SmoothScrollProvider = ({ children }) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
  );
};

// Optional: components can read the shared instance if they need
// direct control (e.g. lenis.scrollTo(...) for a "back to top" button).
export const useLenis = () => useContext(LenisContext);