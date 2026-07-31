import { ArrowRight, Play, Star } from "lucide-react";

/* ---------------------------------------------------------
   CtaSection — reusable call-to-action block for the library.
   Fully self-contained (own font import + background pattern)
   so it can be copy-pasted into any project on its own. Ships
   with sensible dummy defaults — every prop is optional.

   If this lives in an app that already loads Space Grotesk /
   JetBrains Mono elsewhere, delete the <style> block below to
   avoid importing the fonts twice.
   --------------------------------------------------------- */

const avatarColors = ["#FF7A45", "#5EEAD4", "#7C6CFF", "#FF5D8F"];

const CtaSection = ({
  badge = "New · v2.0 out now",
  title = "Build faster. Ship sooner.",
  description = "Everything you need to launch your next product — clean components, zero setup, fully customizable to fit your stack.",
  primaryLabel = "Get Started Free",
  primaryHref = "#",
  secondaryLabel = "Watch Demo",
  secondaryHref = "#",
  rating = 4.9,
  usersLabel = "3,200+ developers",
  avatarCount = 4,
}) => {
  return (
    <section className="relative isolate overflow-hidden rounded-3xl border border-[#23262F] bg-[#08090D] px-6 py-16 sm:px-12 sm:py-20 [--ember:#FF7A45] [--teal:#5EEAD4]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        .cta-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .cta-code { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .cta-grid {
          background-image:
            linear-gradient(to right, rgba(94,234,212,0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(94,234,212,0.07) 1px, transparent 1px);
          background-size: 32px 32px;
        }
        @media (prefers-reduced-motion: reduce) {
          .cta-glow { animation: none !important; }
        }
        @keyframes ctaPulse {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 0.9; }
        }
        .cta-glow { animation: ctaPulse 4s ease-in-out infinite; }
      `}</style>

      {/* Background texture + glow */}
      <div className="cta-grid pointer-events-none absolute inset-0" />
      <div className="cta-glow pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[--ember] opacity-60 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 translate-x-1/3 translate-y-1/3 rounded-full bg-[--teal] opacity-30 blur-[100px]" />

      {/* Corner brackets — signature frame motif */}
      {[
        "left-4 top-4 border-l border-t",
        "right-4 top-4 border-r border-t",
        "left-4 bottom-4 border-l border-b",
        "right-4 bottom-4 border-r border-b",
      ].map((pos, i) => (
        <span
          key={i}
          className={`pointer-events-none absolute h-5 w-5 border-[--teal]/40 ${pos}`}
        />
      ))}

      <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
        {/* Badge */}
        <span className="cta-code mb-6 inline-flex items-center gap-2 rounded-full border border-[#23262F] bg-[#111319] px-4 py-1.5 text-xs uppercase tracking-widest text-[--teal]">
          <span className="h-1.5 w-1.5 rounded-full bg-[--teal] shadow-[0_0_8px_#5EEAD4]" />
          {badge}
        </span>

        {/* Headline */}
        <h2 className="cta-display text-4xl font-semibold leading-tight text-[#F4F3F1] sm:text-5xl">
          {title}
        </h2>

        {/* Description */}
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#8B8D98]">
          {description}
        </p>

        {/* CTAs */}
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href={primaryHref}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-[--ember] px-7 py-3.5 text-sm font-semibold text-[#08090D] shadow-[0_0_25px_rgba(255,122,69,0.35)] transition-all duration-200 hover:scale-[1.03] hover:bg-[#ff8f63] hover:shadow-[0_0_30px_rgba(255,122,69,0.5)] active:scale-[0.97]"
          >
            {primaryLabel}
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </a>

          <a
            href={secondaryHref}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#23262F] bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-[#F4F3F1] transition-all duration-200 hover:border-white/20 hover:bg-white/[0.06]"
          >
            <Play size={14} className="text-[--teal]" />
            {secondaryLabel}
          </a>
        </div>

        {/* Social proof */}
        <div className="mt-10 flex items-center gap-4 border-t border-[#23262F] pt-6">
          <div className="flex -space-x-2.5">
            {Array.from({ length: avatarCount }).map((_, i) => (
              <div
                key={i}
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#08090D] text-[10px] font-semibold text-[#08090D]"
                style={{ backgroundColor: avatarColors[i % avatarColors.length] }}
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>

          <div className="text-left">
            <div className="flex items-center gap-1 text-[--ember]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  fill={i < Math.round(rating) ? "currentColor" : "none"}
                  strokeWidth={1.5}
                />
              ))}
              <span className="cta-code ml-1 text-xs text-[#F4F3F1]">{rating}</span>
            </div>
            <p className="cta-code mt-0.5 text-xs text-[#5C5F6B]">
              Loved by {usersLabel}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;