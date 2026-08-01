import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Copy,
  Check,
  Terminal,
  PlayCircle,
  Maximize2,
  X,
} from "lucide-react";
import { components } from "../data/components";
import { getHighlighter } from "../lib/Highlighter";

const partNumber = (slug = "") => {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return String((hash % 900) + 100);
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
};

const TABS = [
  { key: "install", label: "Install" },
  { key: "usage", label: "Usage" },
  { key: "code", label: "Code" },
];

const ComponentDetails = () => {
  const { category, slug } = useParams();
  const [tab, setTab] = useState("code");
  const [copied, setCopied] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [highlightedHtml, setHighlightedHtml] = useState("");

  const component = components.find(
    (item) => item.category === category && item.slug === slug
  );

  const serial = useMemo(() => `MB-${partNumber(slug)}`, [slug]);

  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e) => e.key === "Escape" && setFullscreen(false);
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [fullscreen]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category, slug]);

  const panelContent = component
    ? {
        install: component.install,
        usage: component.usage,
        code: component.code,
      }[tab]
    : "";

  useEffect(() => {
    if (!panelContent) return;
    let cancelled = false;

    const lang = tab === "install" ? "bash" : "jsx";

    getHighlighter().then((highlighter) => {
      if (cancelled) return;
      const html = highlighter.codeToHtml(panelContent, {
        lang,
        theme: "dracula",
      });
      setHighlightedHtml(html);
    });

    return () => {
      cancelled = true;
    };
  }, [panelContent, tab]);

  if (!component) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08090D] px-6 text-center text-[#F4F3F1]">
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-[#8B8D98]">
            404 / no matching part
          </p>
          <h1 className="text-3xl font-semibold sm:text-4xl">Component not found</h1>
          <Link
            to="/components"
            className="mt-6 inline-flex items-center gap-2 text-base text-[#FF7A45] hover:text-[#ff8f63]"
          >
            <ArrowLeft size={16} /> Back to components
          </Link>
        </div>
      </div>
    );
  }

  const PreviewComponent = component.preview;

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(panelContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#08090D] text-[#F4F3F1] [--ember:#FF7A45] [--teal:#5EEAD4]">
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .font-code { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .blueprint-grid {
          background-image:
            linear-gradient(to right, rgba(94,234,212,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(94,234,212,0.08) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .shiki-wrapper pre {
          background: transparent !important;
          margin: 0;
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
        }
      `}</style>

      <div className="w-full max-w-full px-4 py-8 sm:px-6 sm:py-12 lg:px-12 lg:py-16">
        {/* Back */}
        <Link
          to="/components"
          className="group mb-6 inline-flex items-center gap-2 font-code text-xs uppercase tracking-widest text-[#8B8D98] transition hover:text-[#F4F3F1] sm:mb-10 sm:text-sm"
        >
          <ArrowLeft size={16} className="transition group-hover:-translate-x-0.5" />
          Back to components
        </Link>

        <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-[240px_1fr] lg:gap-12">
          {/* ============= Sidebar: spec strip ============= */}
          <motion.aside
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="lg:sticky lg:top-12 lg:self-start"
          >
            <div className="mb-6 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[--teal] shadow-[0_0_8px_#5EEAD4]" />
              <span className="font-code text-xs uppercase tracking-[0.2em] text-[--teal] sm:text-sm">
                {component.category}
              </span>
            </div>

            <dl className="grid grid-cols-3 gap-4 border-l border-[#23262F] pl-4 font-code text-sm text-[#8B8D98] sm:block sm:space-y-5">
              <div>
                <dt className="text-xs uppercase tracking-widest text-[#5C5F6B]">Part No.</dt>
                <dd className="mt-1.5 truncate text-sm text-[#F4F3F1] sm:text-base">{serial}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-[#5C5F6B]">Slug</dt>
                <dd className="mt-1.5 truncate text-sm text-[#F4F3F1] sm:break-all sm:text-base">{component.slug}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-[#5C5F6B]">Stack</dt>
                <dd className="mt-1.5 truncate text-sm text-[#F4F3F1] sm:text-base">React · Tailwind</dd>
              </div>
            </dl>

            <nav className="mt-6 hidden space-y-2 border-l border-[#23262F] pl-4 sm:mt-9 lg:block">
              {[
                { id: "preview", label: "Preview" },
                { id: "spec", label: "Install · Usage · Code" },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block py-1 text-base text-[#8B8D98] transition hover:text-[--ember]"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.aside>

          {/* ============= Main column ============= */}
          <div className="w-full min-w-0">
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="font-display text-3xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
            >
              {component.name}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="mt-4 max-w-3xl text-base leading-relaxed text-[#8B8D98] sm:mt-5 sm:text-lg lg:text-xl"
            >
              {component.description}
            </motion.p>

            {/* ================= Preview / schematic viewport ================= */}
            <motion.section
              id="preview"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={3}
              className="relative mt-8 w-full min-w-0 scroll-mt-24 sm:mt-12"
            >
              <div className="mb-4 flex flex-col gap-3 font-code text-xs uppercase tracking-widest text-[#5C5F6B] sm:flex-row sm:items-center sm:justify-between sm:text-sm">
                <span className="inline-flex items-center gap-2">
                  <PlayCircle size={16} /> Live preview
                </span>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <span className="inline-flex items-center gap-2 text-[--ember]">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[--ember]" />
                    rendering
                  </span>

                  <button
                    onClick={() => setFullscreen(true)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#23262F] bg-[#111319] px-3 py-1.5 normal-case tracking-normal text-[#8B8D98] transition hover:border-[--teal]/40 hover:text-[--teal] cursor-pointer"
                  >
                    <Maximize2 size={14} />
                    Fullscreen
                  </button>
                </div>
              </div>

              <div className="relative w-full min-w-0 rounded-2xl border border-[#23262F] bg-[#111319] p-2">
                <div className="blueprint-grid relative flex min-h-[16rem] w-full min-w-0 items-center justify-center overflow-auto rounded-xl border border-dashed border-[#2A2E38] bg-[#0B0D12] p-4 sm:min-h-[22rem] sm:p-8">
                  {/* corner brackets */}
                  {[
                    "left-3 top-3 border-l border-t",
                    "right-3 top-3 border-r border-t",
                    "left-3 bottom-3 border-l border-b",
                    "right-3 bottom-3 border-r border-b",
                  ].map((pos, i) => (
                    <span
                      key={i}
                      className={`pointer-events-none absolute h-4 w-4 border-[--teal]/60 ${pos}`}
                    />
                  ))}

                  {PreviewComponent ? (
                    <div className="flex w-full min-w-0 items-center justify-center">
                      <PreviewComponent />
                    </div>
                  ) : (
                    <span className="font-code text-sm text-[#5C5F6B] sm:text-base">
                      No preview available for this part
                    </span>
                  )}
                </div>
              </div>
            </motion.section>

            {/* ================= Tabbed spec panel ================= */}
            <motion.section
              id="spec"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={4}
              className="mt-6 w-full min-w-0 scroll-mt-24 overflow-hidden rounded-2xl border border-[#23262F] bg-[#111319] sm:mt-8"
            >
              <div className="flex items-center justify-between gap-2 border-b border-[#23262F] px-3">
                <div className="flex overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {TABS.map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setTab(t.key)}
                      className={`relative shrink-0 whitespace-nowrap px-3 py-4 font-code text-xs uppercase tracking-widest transition sm:px-5 sm:py-5 sm:text-sm ${
                        tab === t.key ? "text-[#F4F3F1]" : "text-[#5C5F6B] hover:text-[#8B8D98]"
                      }`}
                    >
                      {t.label}
                      {tab === t.key && (
                        <motion.span
                          layoutId="tab-underline"
                          className="absolute inset-x-2 -bottom-px h-px bg-[--ember] sm:inset-x-3"
                        />
                      )}
                    </button>
                  ))}
                </div>

                <button
                  onClick={copyCode}
                  className="flex shrink-0 items-center gap-1.5 rounded-lg bg-[#FF7A45] px-3 py-2 text-xs font-semibold text-[#08090D] transition hover:bg-[#ff8f63] sm:gap-2 sm:px-4 sm:text-sm"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>

              <div className="flex items-center gap-2 overflow-hidden border-b border-[#23262F] bg-[#0D0F14] px-4 py-2.5 font-code text-xs text-[#5C5F6B] sm:px-5 sm:py-3 sm:text-sm">
                <Terminal size={14} className="shrink-0" />
                <span className="truncate">
                  {tab === "install" && "terminal"}
                  {tab === "usage" && `${component.slug}.jsx`}
                  {tab === "code" && `${component.slug}.jsx`}
                </span>
              </div>

              {highlightedHtml ? (
                <div
                  className="shiki-wrapper max-h-[24rem] overflow-auto px-4 py-4 font-code text-xs leading-relaxed sm:max-h-[32rem] sm:px-6 sm:py-6 sm:text-base sm:leading-loose"
                  dangerouslySetInnerHTML={{ __html: highlightedHtml }}
                />
              ) : (
                <pre className="max-h-[24rem] overflow-auto px-4 py-4 font-code text-xs leading-relaxed text-[#C9CBD3] sm:max-h-[32rem] sm:px-6 sm:py-6 sm:text-base sm:leading-loose">
                  <code>{panelContent}</code>
                </pre>
              )}
            </motion.section>
          </div>
        </div>
      </div>

      {/* ================= Fullscreen preview overlay ================= */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col bg-[#08090D]/98 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setFullscreen(false)}
          >
            <div className="flex flex-col gap-3 border-b border-[#23262F] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
              <div className="flex min-w-0 items-center gap-2 font-code text-xs uppercase tracking-widest text-[--teal] sm:text-sm">
                <span className="h-2 w-2 shrink-0 rounded-full bg-[--teal] shadow-[0_0_8px_#5EEAD4]" />
                <span className="truncate">{component.name} · {serial}</span>
              </div>
              <button
                onClick={() => setFullscreen(false)}
                className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-lg border border-[#23262F] bg-[#111319] px-3 py-1.5 font-code text-xs uppercase tracking-widest text-[#8B8D98] transition hover:border-[--ember]/40 hover:text-[--ember] cursor-pointer sm:self-auto"
              >
                <X size={14} />
                Close (Esc)
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05, duration: 0.25 }}
              className="blueprint-grid flex flex-1 items-center justify-center overflow-auto p-4 sm:p-8"
            >
              {PreviewComponent && <PreviewComponent />}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default ComponentDetails;