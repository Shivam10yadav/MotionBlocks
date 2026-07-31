import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Copy,
  Check,
  FolderTree,
  Palette,
  Puzzle,
  Terminal,
  ArrowRight,
  BookOpen,
  Sparkles,
  Zap,
  Code2,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";

const steps = [
  {
    icon: Puzzle,
    title: "Browse components",
    text: "Explore buttons, cards, loaders, CTAs and more from the Components page. Every item has a live preview so you know exactly what you're getting.",
  },
  {
    icon: Copy,
    title: "Copy the code",
    text: "Open any component's docs page, hit the Copy button on the code block, and paste it straight into your project. No CLI, no config wizard.",
  },
  {
    icon: Terminal,
    title: "Install dependencies",
    text: "Each component lists the exact npm packages it needs (usually just lucide-react or framer-motion). Run the install command shown on that component's page.",
  },
  {
    icon: Palette,
    title: "Make it yours",
    text: "Every component is plain Tailwind + React — no wrapper library, no theme provider. Edit classNames directly to match your brand.",
  },
];

const principles = [
  {
    icon: Zap,
    title: "No package to install",
    text: "You're not adding a heavy dependency to your app bundle. You own the source code the moment you paste it — tweak, delete, or scale without constraints.",
  },
  {
    icon: Code2,
    title: "Tailwind Native",
    text: "Every component is built purely with core Tailwind utility classes. No custom plugin, setup wizard, or config extension required to get started.",
  },
  {
    icon: Sparkles,
    title: "Composable by default",
    text: "Components accept clean props for high-frequency variables (labels, state, links) without hiding styling details behind rigid abstraction layers.",
  },
];

const CodeSnippet = ({ code, language = "bash" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/80 shadow-xl w-full">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-900/60 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
          <span className="ml-2 font-mono text-xs text-zinc-500">{language}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md bg-zinc-800/80 px-2.5 py-1 font-mono text-xs text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-200"
        >
          {copied ? (
            <>
              <Check size={13} className="text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body */}
      <pre className="overflow-x-auto p-4 font-mono text-xs sm:text-sm leading-relaxed text-zinc-300">
        <code>{code}</code>
      </pre>
    </div>
  );
};

const DocsPage = () => {
  return (
    <div className="w-full min-h-screen px-4 py-10 sm:px-8 lg:px-12 text-zinc-100 [--ember:#FF7A45] [--teal:#5EEAD4]">
      {/* Full-width Container */}

       
      <div className="mx-auto max-w-7xl space-y-16">
        
          <Link
                  to="/components"
                  className="mt-6 inline-flex items-center gap-2 text-base text-[#dadada] hover:text-[#f4f1f0]"
                >
                  <ArrowLeft size={16} /> Back to components
                </Link>
        {/* Hero Header Section */}
        <div className="relative border-b border-zinc-800/80 pb-12">
          <div className="pointer-events-none absolute -left-20 -top-20 -z-10 h-72 w-96 rounded-full bg-[--teal]/5 blur-3xl" />
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[--teal]/20 bg-[--teal]/10 px-3.5 py-1 font-mono text-xs font-medium uppercase tracking-widest text-[--teal]">
                <BookOpen size={13} />
                Documentation
              </div>
              <h1 className="mt-4 font-sans text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
                How it works
              </h1>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-zinc-400 max-w-2xl">
                This isn't a third-party package you install into `node_modules` — it's an expansive collection of copy-paste React + Tailwind components. Own your code, direct from day one.
              </p>
            </div>

            <Link
              to="/components"
              className="group inline-flex items-center gap-2 rounded-xl bg-[--ember] px-5 py-3 text-sm font-semibold text-zinc-950 transition-all duration-200 hover:bg-orange-400 active:scale-95 shrink-0"
            >
              <span>Explore All Components</span>
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* Workflow Horizontal Progression Rows */}
        <div className="space-y-6">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Integration Steps
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-6 backdrop-blur-md transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/60"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 text-[--teal] shadow-inner">
                        <Icon size={18} />
                      </div>
                      <span className="font-mono text-xs font-bold text-[--ember] bg-[--ember]/10 border border-[--ember]/20 px-2.5 py-0.5 rounded-full">
                        0{i + 1}
                      </span>
                    </div>

                    <h3 className="mt-5 text-lg font-bold text-zinc-100">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-400">
                      {step.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Wide Split Section: Code Example & Directory Structure */}
        <div className="grid gap-8 lg:grid-cols-12">
          
          {/* Quick Example - Left 7 columns */}
          <div className="lg:col-span-7 space-y-6 rounded-3xl border border-zinc-800/80 bg-zinc-900/30 p-6 sm:p-8 backdrop-blur-md">
            <div>
              <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-[--teal]">
                Quick Code Setup
              </h2>
              <p className="mt-1 text-sm text-zinc-400">
                Copy the packages and component code directly into your app.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <span className="mb-2 block text-xs font-medium text-zinc-400">
                  1. Install required dependencies:
                </span>
                <CodeSnippet code="npm install framer-motion lucide-react" language="bash" />
              </div>

              <div>
                <span className="mb-2 block text-xs font-medium text-zinc-400">
                  2. Import into your page:
                </span>
                <CodeSnippet
                  code={`import MotionBlock from "./components/ui/MotionBlock";\n\nexport default function App() {\n  return (\n    <main className="p-8">\n      <MotionBlock />\n    </main>\n  );\n}`}
                  language="jsx"
                />
              </div>
            </div>
          </div>

          {/* Directory Architecture - Right 5 columns */}
          <div className="lg:col-span-5 space-y-6 rounded-3xl border border-zinc-800/80 bg-zinc-900/30 p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-500">
                <FolderTree size={15} className="text-[--ember]" />
                Recommended Folder Layout
              </div>
              <p className="mt-1 text-sm text-zinc-400">
                Keep your UI components organized inside clean directories:
              </p>
            </div>

            <div className="mt-4 flex-1 flex">
              <CodeSnippet
                language="structure"
                code={`src/
├── components/
│   └── ui/
│       ├── buttons/
│       │   └── GlowButton.jsx
│       ├── cta/
│       │   └── CTASection.jsx
│       └── motion/
│           └── MotionBlock.jsx
├── data/
│   └── components.js
└── pages/
    ├── ComponentsPage.jsx
    └── DocsPage.jsx`}
              />
            </div>
          </div>

        </div>

        {/* Full-width Guiding Principles Horizontal Bar */}
        <div className="space-y-6 border-t border-zinc-800/80 pt-12">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Guiding Principles
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            {principles.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="flex items-start gap-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-6 backdrop-blur-md transition-all hover:border-zinc-700 hover:bg-zinc-900/60"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 text-[--ember]">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-zinc-200">{p.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                      {p.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Wide CTA Banner */}
        <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 p-8 sm:p-12 shadow-2xl">
          <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 h-64 w-64 rounded-full bg-[--ember]/10 blur-3xl" />

          <div className="relative z-10 flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Ready to start building?
              </h3>
              <p className="mt-2 text-sm sm:text-base text-zinc-400">
                Browse our complete set of interactive Tailwind components and build beautiful interfaces faster.
              </p>
            </div>

            <Link
              to="/components"
              className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-[--ember] px-7 py-4 text-base font-semibold text-zinc-950 shadow-lg shadow-[--ember]/20 transition-all duration-300 hover:scale-[1.02] hover:bg-orange-400 hover:shadow-orange-500/25 active:scale-[0.98]"
            >
              Browse Components
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DocsPage;