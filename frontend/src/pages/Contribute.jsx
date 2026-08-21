import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import {
  Copy,
  Check,
  ArrowLeft,
  ArrowRight,
  FolderTree,
  HeartHandshake,
  PlusCircle,
  FolderPlus,
} from "lucide-react";

// Standard code snippet block
const CodeBlock = ({ code, language = "jsx" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/80 border-b border-zinc-800">
        <span className="text-xs font-mono text-zinc-400">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <Check size={13} className="text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 font-mono text-xs sm:text-sm text-zinc-200 overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default function Contribute() {
  const pageRef = useRef(null);

  // Smooth entrance animation
  useEffect(() => {
    gsap.fromTo(
      pageRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
    );
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-[#08090D] text-zinc-100 antialiased font-sans">
      
      {/* 3-Column Full-Viewport Grid Layout */}
      <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-zinc-800">

        {/* LEFT COLUMN: Sticky Navigation Sidebar (3 columns) */}
        <aside className="lg:col-span-3 border-r border-zinc-800/80 p-6 lg:p-8 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto bg-zinc-950/50">
          <Link
            to="/components"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Back to components
          </Link>

          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
                Contribution Guide
              </p>
              <nav className="space-y-1">
                <a href="#welcome" className="block px-3 py-2 text-sm text-white font-medium rounded-md bg-zinc-900 border border-zinc-800">
                  Welcome
                </a>
                <a href="#component-contribution" className="block px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-900/50 rounded-md transition-colors">
                  Add UI Component
                </a>
                <a href="#new-category" className="block px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-900/50 rounded-md transition-colors">
                  Add New Category
                </a>
                <a href="#logo-contribution" className="block px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-900/50 rounded-md transition-colors">
                  Add Vector Logo
                </a>
                <a href="#pull-request" className="block px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-900/50 rounded-md transition-colors">
                  Submit PR
                </a>
              </nav>
            </div>

            <div className="pt-6 border-t border-zinc-800/80">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
                Quick Links
              </p>
              <div className="space-y-2">
                <Link to="/docs" className="flex items-center justify-between px-3 py-2 text-xs text-zinc-300 hover:text-white border border-zinc-800 rounded-md bg-zinc-900/30">
                  <span>Documentation</span>
                  <ArrowRight size={12} />
                </Link>
                <Link to="/logos" className="flex items-center justify-between px-3 py-2 text-xs text-zinc-300 hover:text-white border border-zinc-800 rounded-md bg-zinc-900/30">
                  <span>Logo Collection</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* MIDDLE COLUMN: Main Documentation Area (6 columns) */}
        <main className="lg:col-span-6 p-6 sm:p-10 lg:p-12 space-y-12">
          
          {/* Header */}
          <header className="border-b border-zinc-800 pb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-[#8C5E32] font-semibold">
              Community
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
              Contribute Assets
            </h1>
            <p className="mt-3 text-base text-zinc-400 leading-relaxed">
              Help grow this open-source library by contributing standard React UI components or customizable vector logos.
            </p>
          </header>

          {/* Welcome Section */}
          <section id="welcome" className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight border-b border-zinc-800/80 pb-2">
              Welcome Contributors
            </h2>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Contributing a component or logo is completely modular. You add your React component file under its corresponding category folder, register its metadata, and push a pull request.
            </p>
          </section>

          {/* Step 1: UI Component Contribution */}
          <section id="component-contribution" className="space-y-6">
            <h2 className="text-xl font-bold text-white tracking-tight border-b border-zinc-800/80 pb-2">
              1. Adding a UI Component
            </h2>

            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-white">Step A: Create Your Component File</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Place your component inside its relevant category folder under <code className="text-zinc-200 bg-zinc-900 px-1.5 py-0.5 rounded text-xs font-mono">src/ui/[category]/</code> (for example: <code className="text-zinc-200 bg-zinc-900 px-1.5 py-0.5 rounded text-xs font-mono">src/ui/buttons/GlowButton.jsx</code>).
                </p>
                <CodeBlock
                  language="jsx"
                  code={`// src/ui/buttons/GlowButton.jsx
import React from "react";

export default function GlowButton({ label = "Click Me" }) {
  return (
    <button className="px-5 py-2.5 rounded-lg bg-zinc-900 text-white border border-zinc-700 hover:border-[#8C5E32] transition-colors">
      {label}
    </button>
  );
}`}
                />
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-semibold text-white">Step B: Register Component Data</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Register your component inside <code className="text-zinc-200 bg-zinc-900 px-1.5 py-0.5 rounded text-xs font-mono">src/data/components.js</code> so it renders in the UI gallery:
                </p>
                <CodeBlock
                  language="javascript"
                  code={`{
  id: "glow-button",
  name: "Glow Button",
  category: "Buttons",
  description: "A button component with standard hover states.",
  code: \`// Paste source code string here\`,
}`}
                />
              </div>
            </div>
          </section>

          {/* Step 2: Creating a New Category */}
          <section id="new-category" className="space-y-6">
            <h2 className="text-xl font-bold text-white tracking-tight border-b border-zinc-800/80 pb-2 flex items-center gap-2">
              <FolderPlus size={18} className="text-[#8C5E32]" />
              2. Creating a New Category
            </h2>

            <div className="space-y-4">
              <p className="text-sm text-zinc-400 leading-relaxed">
                If your component belongs to a category that doesn't exist yet, follow these two quick steps:
              </p>

              <div className="space-y-1">
                <h3 className="text-base font-semibold text-white">Step A: Add New Directory</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Create a new subfolder inside <code className="text-zinc-200 bg-zinc-900 px-1.5 py-0.5 rounded text-xs font-mono">src/ui/</code> matching your category name (e.g. <code className="text-zinc-200 bg-zinc-900 px-1.5 py-0.5 rounded text-xs font-mono">src/ui/modals/</code>).
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-semibold text-white">Step B: Register in category.js</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Open <code className="text-zinc-200 bg-zinc-900 px-1.5 py-0.5 rounded text-xs font-mono">src/data/category.js</code> and add your new category entry:
                </p>
                <CodeBlock
                  language="javascript"
                  code={`// Inside src/data/category.js
export const categories = [
  "Buttons",
  "Cards",
  "Modals", // <-- Add your new category here
];`}
                />
              </div>
            </div>
          </section>

          {/* Step 3: Vector Logo Contribution */}
          <section id="logo-contribution" className="space-y-6">
            <h2 className="text-xl font-bold text-white tracking-tight border-b border-zinc-800/80 pb-2">
              3. Adding a Vector Logo
            </h2>

            <div className="space-y-4">
              <p className="text-sm text-zinc-400 leading-relaxed">
                Logos live in <code className="text-zinc-200 bg-zinc-900 px-1.5 py-0.5 rounded text-xs font-mono">src/data/logo.js</code>.
              </p>

              <div className="space-y-1">
                <h3 className="text-base font-semibold text-white">Step A: Append Logo Entry</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Add your logo data object to <code className="text-zinc-200 bg-zinc-900 px-1.5 py-0.5 rounded text-xs font-mono">logo.js</code>. Use dynamic color strings <code className="text-zinc-200 bg-zinc-900 px-1.5 py-0.5 rounded text-xs font-mono">(c)</code> inside <code className="text-zinc-200 bg-zinc-900 px-1.5 py-0.5 rounded text-xs font-mono">renderSvg</code> so live color pickers work:
                </p>
                <CodeBlock
                  language="javascript"
                  code={`// Inside src/data/logo.js
{
  id: "tech-emblem",
  name: "Tech Emblem",
  category: "Tech",
  number: "12",
  desc: "Clean geometric icon with customizable fills.",
  defaultColors: { 
    primary: "#8C5E32", 
    secondary: "#D9822B", 
    accent: "#18181B" 
  },
  renderSvg: (c) => \`<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="60" stroke="\${c.primary}" stroke-width="12"/>
    <path d="M70 100 L130 100" stroke="\${c.secondary}" stroke-width="8" stroke-linecap="round"/>
  </svg>\`,
},`}
                />
              </div>
            </div>
          </section>

          {/* Submitting PR */}
          <section id="pull-request" className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight border-b border-zinc-800/80 pb-2">
              4. Submit a Pull Request
            </h2>
            <div className="space-y-2 text-sm text-zinc-300">
              <p className="text-zinc-400 leading-relaxed">
                Commit your files and push your feature branch to submit a PR:
              </p>
              <CodeBlock
                language="bash"
                code={`# Create feature branch
git checkout -b feat/add-glow-button

# Stage and commit
git add .
git commit -m "feat: added GlowButton component and registered Modals category"

# Push branch
git push origin feat/add-glow-button`}
              />
            </div>
          </section>

        </main>

        {/* RIGHT COLUMN: Info / Specs Sidebar (3 columns) */}
        <aside className="lg:col-span-3 border-l border-zinc-800/80 p-6 lg:p-8 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto bg-zinc-950/50">
          <div className="space-y-6">
            
            {/* Folder Layout Quick Reference */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
                <FolderTree size={14} className="text-[#8C5E32]" />
                Directory Structure
              </h3>
              <pre className="text-[11px] font-mono text-zinc-400 leading-relaxed">
{`src/
├── ui/
│   ├── buttons/
│   │   └── GlowButton.jsx
│   └── [category]/
│       └── [Component].jsx
└── data/
    ├── category.js
    ├── components.js
    └── logo.js`}
              </pre>
            </div>

            {/* Quality Checklist Box */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                <HeartHandshake size={14} className="text-[#8C5E32]" />
                Guidelines
              </h3>
              <div className="space-y-2 text-xs text-zinc-400 leading-relaxed">
                <p>
                  <strong className="text-zinc-200">Tailwind Native:</strong> Stick strictly to Tailwind CSS utility classes.
                </p>
                <p>
                  <strong className="text-zinc-200">Category Sync:</strong> Ensure category names match in both <code className="text-zinc-300 font-mono">category.js</code> and <code className="text-zinc-300 font-mono">components.js</code>.
                </p>
                <p>
                  <strong className="text-zinc-200">Clean Imports:</strong> Use standard imports and exports.
                </p>
              </div>
            </div>

          </div>
        </aside>

      </div>
    </div>
  );
}