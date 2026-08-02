import { Link } from "react-router-dom";
import {
  FilePlus2,
  FileJson2,
  GitPullRequest,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  ListChecks,
} from "lucide-react";

const steps = [
  {
    icon: FilePlus2,
    number: "01",
    title: "Create your component",
    text: "Build your component as a normal .jsx file inside the right folder under src/ui/ (e.g. src/ui/buttons/YourButton.jsx). Use plain Tailwind utility classes with real hex colors only — no CSS variables like --ember, no shadcn, no external UI kits. If it needs a package, keep it minimal (framer-motion, lucide-react, gsap, etc).",
    code: `src/ui/buttons/YourButton.jsx

const YourButton = () => {
  return (
    <button className="rounded-xl bg-[#FF7A45] px-6 py-3 font-semibold text-black transition-all duration-300 hover:scale-105">
      Click Me
    </button>
  );
};

export default YourButton;`,
  },
  {
    icon: FileJson2,
    number: "02",
    title: "Register it in components.js",
    text: "Open src/data/components.js. Import your component AND its raw code file at the top, then add ONE new object to the components array. The code field now references the imported raw file (using the ?raw Vite suffix) instead of an inline template string. This is the only file that connects your component to the grid, search, and docs page.",
    code: `// at the top of the file
import YourButton from "../ui/buttons/YourButton";
import YourButtonCode from "../ui/buttons/YourButton.jsx?raw";

// inside the components array, add:
{
  id: 4, // next available id
  slug: "your-button",         // unique, lowercase, dash-separated
  name: "Your Button",
  category: "buttons",         // must match an existing category id
  description: "A short one-line description of what it does.",
  preview: YourButton,          // the imported component (live preview)
  install: "npm install framer-motion", // or omit if no deps
  usage: \`<YourButton />\`,
  code: YourButtonCode           // the imported raw code (not inline)
},`,
  },
  {
    icon: GitPullRequest,
    number: "03",
    title: "Only touch categories.js if it's a new category",
    text: "If your component fits an existing category (buttons, cards, loaders, 404-pages, etc), skip this step entirely. Only edit src/data/categories.js if you're introducing a category that doesn't exist yet.",
    code: `// src/data/categories.js
// only add this if the category truly doesn't exist:
{
  id: "modals",
  name: "Modals",
  description: "Dialogs and overlays.",
},`,
  },
];

const dontTouch = [
  "Sidebar.jsx",
  "ComponentGrid.jsx",
  "ComponentDetails.jsx (docs page)",
];

const Contribute = () => {
  return (
    <div className="w-full min-h-screen bg-[#08090D] px-4 py-8 sm:px-8 lg:px-12 [--ember:#FF7A45] [--teal:#5EEAD4]">
      <div className="mx-auto max-w-[1600px] space-y-8">
        
        {/* Full-Width Hero Section */}
        <header className="relative overflow-hidden rounded-3xl border border-[#23262F] bg-[#111319] p-8 sm:p-12">
          {/* Subtle Background Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[--ember] opacity-10 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-[--teal] opacity-10 blur-[120px]" />

          <div className="relative z-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-[--teal]/20 bg-[--teal]/10 px-3.5 py-1.5 font-code text-xs font-medium uppercase tracking-wider text-[--teal]">
                <span className="h-1.5 w-1.5 rounded-full bg-[--teal] shadow-[0_0_8px_#5EEAD4]" />
                Contributing Guide
              </span>
              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-[#F4F3F1] sm:text-5xl lg:text-6xl">
                Add your component
              </h1>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#8B8D98]">
                Three quick steps to get your component live in the library. No routing
                changes, no page rebuilds — just a new component file and one registry entry.
              </p>
            </div>

            {/* Quick Action CTA Box */}
            <div className="flex w-full shrink-0 flex-col gap-3 rounded-2xl border border-[#23262F] bg-[#0B0D12] p-5 sm:w-auto sm:min-w-[280px]">
              <div className="flex items-center justify-between font-code text-xs text-[#8B8D98]">
                <span>Status</span>
                <span className="text-[--teal]">Open for PRs</span>
              </div>
              <div className="h-px bg-[#23262F]" />
              <Link
                to="/components"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[--ember] px-5 py-3 text-sm font-semibold text-[#08090D] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                View Components
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </header>

        {/* Main Full-Width Widescreen Layout (2-Column Desktop Grid) */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* Left Column: 3 Steps (8 Cols) */}
          <main className="space-y-6 lg:col-span-7 xl:col-span-8">
            <div className="flex items-center justify-between px-1">
              <h2 className="font-display text-xl font-semibold text-[#F4F3F1]">
                Step-by-Step Workflow
              </h2>
              <span className="font-code text-xs text-[#5C5F6B]">03 Steps Total</span>
            </div>

            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <article
                  key={step.number}
                  className="group relative overflow-hidden rounded-2xl border border-[#23262F] bg-[#111319] p-6 transition-colors duration-200 hover:border-[#323644] sm:p-8"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#23262F] bg-[#0B0D12] font-code text-sm font-bold text-[--ember]">
                        {step.number}
                      </span>
                      <div className="flex items-center gap-2.5">
                        <Icon size={20} className="text-[--teal]" />
                        <h3 className="text-xl font-semibold text-[#F4F3F1]">
                          {step.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-[#8B8D98]">
                    {step.text}
                  </p>

                  <div className="relative mt-5 overflow-hidden rounded-xl border border-[#23262F] bg-[#0B0D12]">
                    <div className="flex items-center justify-between border-b border-[#23262F] px-4 py-2 font-code text-xs text-[#5C5F6B]">
                      <span>Code Example</span>
                      <span>JSX / JS</span>
                    </div>
                    <pre className="overflow-x-auto p-4 font-code text-xs sm:text-sm leading-relaxed text-[#D4D4D8]">
                      <code>{step.code}</code>
                    </pre>
                  </div>
                </article>
              );
            })}
          </main>

          {/* Right Column: Guidelines, Warnings & Pre-PR Checklist (4 or 5 Cols) */}
          <aside className="space-y-6 lg:col-span-5 xl:col-span-4">
            
            {/* What NOT to Touch Card */}
            <section className="rounded-2xl border border-[#23262F] bg-[#111319] p-6 sm:p-7">
              <div className="flex items-center gap-2.5 text-[--ember]">
                <AlertTriangle size={18} className="shrink-0 text-[--ember]" />
                <h3 className="font-semibold text-[#F4F3F1]">
                  Files you should never need to edit
                </h3>
              </div>

              <div className="mt-4 rounded-xl border border-[#23262F]/80 bg-[#0B0D12] p-4">
                <ul className="space-y-3">
                  {dontTouch.map((file) => (
                    <li
                      key={file}
                      className="flex items-center gap-2.5 font-code text-xs sm:text-sm text-[#8B8D98]"
                    >
                      <ShieldAlert size={14} className="shrink-0 text-[--ember]" />
                      <span>{file}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-4 text-xs sm:text-sm leading-relaxed text-[#8B8D98]">
                These pages are generic and read entirely from{" "}
                <span className="font-code font-medium text-[#F4F3F1]">components.js</span> and{" "}
                <span className="font-code font-medium text-[#F4F3F1]">categories.js</span>. If your PR
                modifies any of them, explain why in the PR description.
              </p>
            </section>

            {/* Checklist Before PR Card */}
            <section className="rounded-2xl border border-[#23262F] bg-[#111319] p-6 sm:p-7">
              <div className="flex items-center gap-2 text-[--teal]">
                <ListChecks size={18} className="shrink-0 text-[--teal]" />
                <h3 className="font-semibold text-[#F4F3F1]">
                  Before opening a PR
                </h3>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  "Component uses plain hex colors, not CSS variables (--ember, --teal)",
                  "No shadcn/ui or other external UI kit dependencies",
                  "id, slug, and category are correct and unique in components.js",
                  "Both component and code imports added at the top of components.js",
                  "code field references the imported ?raw file, not an inline string",
                  "Preview renders correctly with no console errors",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl border border-[#23262F]/40 bg-[#0B0D12]/60 p-3">
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0 text-[--teal]"
                    />
                    <span className="text-xs sm:text-sm leading-snug text-[#8B8D98]">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Bottom Floating CTA Banner */}
            <div className="relative overflow-hidden rounded-2xl border border-[#23262F] bg-[linear-gradient(135deg,#111319_0%,#181B24_100%)] p-6">
              <h3 className="text-lg font-semibold text-[#F4F3F1]">
                Ready to submit?
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#8B8D98]">
                Fork the repo, add your component, and open a pull request.
              </p>
              <Link
                to="/components"
                className="group mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[--ember] px-5 py-3 text-sm font-semibold text-[#08090D] transition-all duration-200 hover:scale-[1.01]"
              >
                Browse Component Library
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </div>

          </aside>
        </div>

      </div>
    </div>
  );
};

export default Contribute;
