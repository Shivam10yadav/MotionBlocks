import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Smartphone, Tablet, Monitor, RotateCw, ArrowLeft } from "lucide-react";
import { components } from "../data/components";

const DEVICES = [
  { key: "mobile", label: "Mobile", icon: Smartphone, width: "375px" },
  { key: "tablet", label: "Tablet", icon: Tablet, width: "768px" },
  { key: "desktop", label: "Desktop", icon: Monitor, width: "100%" },
];

// Rendered on its own route (/preview/:category/:slug), opened via window.open
// from ComponentDetails' "Open in browser" button. No app chrome — just the
// component, full page, so it can be viewed, shared, or dropped into an iframe
// on its own.
const ComponentPreviewPage = () => {
  const { category, slug } = useParams();
  const [device, setDevice] = useState("desktop");
  const [previewKey, setPreviewKey] = useState(0);

  const component = components.find(
    (item) => item.category === category && item.slug === slug
  );

  if (!component) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08090D] px-6 text-center text-[#F4F3F1]">
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-[#8B8D98]">
            404 / no matching part
          </p>
          <h1 className="text-2xl font-semibold">Component not found</h1>
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

  return (
    <div className="min-h-screen w-full bg-[#08090D] text-[#F4F3F1] [--ember:#FF7A45] [--teal:#5EEAD4]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-code { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .blueprint-grid {
          background-image:
            linear-gradient(to right, rgba(94,234,212,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(94,234,212,0.08) 1px, transparent 1px);
          background-size: 28px 28px;
        }
      `}</style>

      <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 border-b border-[#23262F] bg-[#08090D]/95 px-4 py-3 backdrop-blur-md sm:px-6">
        <div className="flex min-w-0 items-center gap-2 font-code text-xs uppercase tracking-widest text-[--teal] sm:text-sm">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[--teal] shadow-[0_0_8px_#5EEAD4]" />
          <span className="truncate">{component.name}</span>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <div className="flex items-center gap-1 rounded-lg border border-[#23262F] bg-[#111319] p-1">
            {DEVICES.map((d) => {
              const Icon = d.icon;
              return (
                <button
                  key={d.key}
                  onClick={() => setDevice(d.key)}
                  aria-label={d.label}
                  title={d.label}
                  className={`flex items-center justify-center rounded-md p-1.5 transition cursor-pointer ${
                    device === d.key
                      ? "bg-[--teal]/10 text-[--teal]"
                      : "text-[#8B8D98] hover:text-[#F4F3F1]"
                  }`}
                >
                  <Icon size={14} />
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setPreviewKey((k) => k + 1)}
            aria-label="Refresh Preview"
            title="Refresh Preview"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#23262F] bg-[#111319] px-3 py-1.5 font-code text-xs uppercase tracking-widest text-[#8B8D98] transition hover:border-[--teal]/40 hover:text-[--teal] cursor-pointer"
          >
            <RotateCw size={14} />
            Refresh
          </button>
        </div>
      </div>

      <div className="blueprint-grid flex min-h-[calc(100vh-57px)] w-full items-center justify-center p-4 sm:p-10">
        {PreviewComponent ? (
          <div
            key={previewKey}
            className="flex w-full items-center justify-center transition-[width] duration-300"
            style={{ width: DEVICES.find((d) => d.key === device)?.width, maxWidth: "100%" }}
          >
            <PreviewComponent />
          </div>
        ) : (
          <span className="font-code text-sm text-[#5C5F6B]">No preview available for this part</span>
        )}
      </div>
    </div>
  );
};

export default ComponentPreviewPage;