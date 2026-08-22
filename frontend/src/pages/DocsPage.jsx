import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import {
  Copy,
  Check,
  ArrowLeft,
  ArrowRight,
  Terminal,
  Zap,
} from "lucide-react";
import { Navbar } from "../localcomponents/Navbar";

// Standard code block component
const CodeBlock = ({ code, language = "bash" }) => {
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

export default function DocsPage() {
  const pageRef = useRef(null);

  // Smooth entry animation
  useEffect(() => {
    gsap.fromTo(
      pageRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
    );
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-[#08090D] text-zinc-100 antialiased font-sans">
      
      {/* Fixed Navbar */}
      <Navbar />
      
      {/* Container with explicit pt-32 clearance so content renders BELOW the floating navbar */}
      <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-zinc-800 pt-28 sm:pt-36">

        {/* LEFT COLUMN: Sticky Navigation Sidebar */}
        <aside className="lg:col-span-3 border-r border-zinc-800/80 p-6 lg:p-8 lg:sticky lg:top-28 lg:h-[calc(100vh-7rem)] lg:overflow-y-auto bg-zinc-950/50">
          <Link
            to="/components"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Back to components
          </Link>

          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
                Documentation
              </p>
              <nav className="space-y-1">
                <a href="#overview" className="block px-3 py-2 text-sm text-white font-medium rounded-md bg-zinc-900 border border-zinc-800">
                  Overview
                </a>
                <a href="#getting-started" className="block px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-900/50 rounded-md transition-colors">
                  Getting Started
                </a>
                <a href="#logos-archive" className="block px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-900/50 rounded-md transition-colors">
                  Logos & Vector Assets
                </a>
                <a href="#directory-structure" className="block px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-900/50 rounded-md transition-colors">
                  Project Structure
                </a>
              </nav>
            </div>

            <div className="pt-6 border-t border-zinc-800/80">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
                Quick Links
              </p>
              <div className="space-y-2">
                <Link to="/components" className="flex items-center justify-between px-3 py-2 text-xs text-zinc-300 hover:text-white border border-zinc-800 rounded-md bg-zinc-900/30">
                  <span>UI Components</span>
                  <ArrowRight size={12} />
                </Link>
                <Link to="/logo" className="flex items-center justify-between px-3 py-2 text-xs text-zinc-300 hover:text-white border border-zinc-800 rounded-md bg-zinc-900/30">
                  <span>Logo Collection</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* MIDDLE COLUMN: Main Content Area */}
        <main className="lg:col-span-6 p-6 sm:p-10 lg:p-12 space-y-12">
          
          {/* Header */}
          <header className="border-b border-zinc-800 pb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-[#8C5E32] font-semibold">
              DOCUMENTATION
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
              How It Works
            </h1>
            <p className="mt-3 text-base text-zinc-400 leading-relaxed">
              Copy components and editable vector logos directly into your repository. No external NPM packages or rigid setup constraints.
            </p>
          </header>

          {/* Overview Section */}
          <section id="overview" className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight border-b border-zinc-800/80 pb-2">
              Overview
            </h2>
            <p className="text-zinc-300 text-sm leading-relaxed">
              This library provides pure source code built with React and Tailwind CSS. Instead of importing a heavy third-party UI library into <code className="text-zinc-200 bg-zinc-900 px-1 py-0.5 rounded text-xs font-mono">node_modules</code>, you copy the component source code straight into your project.
            </p>
          </section>

          {/* Getting Started Section */}
          <section id="getting-started" className="space-y-6">
            <h2 className="text-xl font-bold text-white tracking-tight border-b border-zinc-800/80 pb-2">
              Getting Started
            </h2>

            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-white">1. Select an Asset</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Browse the component gallery or logo collection. Every asset includes an interactive live preview.
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-semibold text-white">2. Copy Code</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Click <strong>Copy Code</strong> or <strong>Copy SVG</strong> to place the raw snippet directly onto your clipboard.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-semibold text-white">3. Install Dependencies</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Install standard helper libraries required for animations and icons:
                </p>
                <CodeBlock code="npm install framer-motion lucide-react gsap" language="bash" />
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-semibold text-white">4. Customize Directly</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  You own the code once copied. Edit Tailwind classes, state logic, or structural markup inside your editor freely.
                </p>
              </div>
            </div>
          </section>

          {/* Logos Archive Section */}
          <section id="logos-archive" className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight border-b border-zinc-800/80 pb-2">
              Logos & Vector Assets
            </h2>
            <p className="text-zinc-300 text-sm leading-relaxed">
              The logo archive provides vector SVG marks with live color customization:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-zinc-300 pt-1">
              <li>
                <strong className="text-white">Color Pickers:</strong> Click any logo to open color options and change primary, secondary, and accent colors live.
              </li>
              <li>
                <strong className="text-white">Copy Inline SVG:</strong> Grab inline vector code directly for React components or HTML files.
              </li>
              <li>
                <strong className="text-white">Export SVG Files:</strong> Click download to export standalone <code className="text-zinc-200 bg-zinc-900 px-1 py-0.5 rounded text-xs font-mono">.svg</code> vector files for Figma or Illustrator.
              </li>
            </ul>
          </section>

          {/* Directory Structure Section */}
          <section id="directory-structure" className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight border-b border-zinc-800/80 pb-2">
              Recommended Directory Structure
            </h2>
            <p className="text-sm text-zinc-400">
              Keep your components organized inside a clean directory structure:
            </p>
            <CodeBlock
              language="structure"
              code={`src/
├── components/
│   ├── Navbar.jsx
│   └── ui/
│       ├── buttons/
│       ├── cta/
│       └── motion/
├── pages/
│   ├── ComponentsPage.jsx
│   ├── LogosPage.jsx
│   └── DocsPage.jsx`}
            />
          </section>

        </main>

        {/* RIGHT COLUMN: Info Sidebar */}
        <aside className="lg:col-span-3 border-l border-zinc-800/80 p-6 lg:p-8 lg:sticky lg:top-28 lg:h-[calc(100vh-7rem)] lg:overflow-y-auto bg-zinc-950/50">
          <div className="space-y-6">
            
            {/* Tech Stack Summary */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
                <Terminal size={14} className="text-[#8C5E32]" />
                Tech Stack
              </h3>
              <ul className="space-y-2 text-xs text-zinc-300 font-mono">
                <li className="flex justify-between border-b border-zinc-800/60 pb-1.5">
                  <span className="text-zinc-500">Framework</span>
                  <span>React 18+</span>
                </li>
                <li className="flex justify-between border-b border-zinc-800/60 pb-1.5">
                  <span className="text-zinc-500">Styling</span>
                  <span>Tailwind CSS</span>
                </li>
                <li className="flex justify-between border-b border-zinc-800/60 pb-1.5">
                  <span className="text-zinc-500">Icons</span>
                  <span>Lucide React</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-zinc-500">Animation</span>
                  <span>Framer / GSAP</span>
                </li>
              </ul>
            </div>

            {/* Principles Box */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                <Zap size={14} className="text-[#8C5E32]" />
                Key Benefits
              </h3>
              <div className="space-y-2 text-xs text-zinc-400 leading-relaxed">
                <p>
                  <strong className="text-zinc-200">Zero Dependencies:</strong> No heavy bundle sizes or forced themes.
                </p>
                <p>
                  <strong className="text-zinc-200">100% Owned:</strong> Edit code directly inside your project repository.
                </p>
              </div>
            </div>

          </div>
        </aside>

      </div>
    </div>
  );
}