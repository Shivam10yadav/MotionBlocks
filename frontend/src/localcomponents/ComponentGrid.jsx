import { ArrowUpRight, SearchX } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { components } from "../data/components";
import CategoryLanding from "../pages/CategoryLanding";

const ComponentGrid = () => {
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";
  const query = (searchParams.get("q") || "").trim().toLowerCase();

  const filtered = useMemo(() => {
    return components.filter((c) => {
      const matchesCategory =
        activeCategory === "all" || c.category === activeCategory;
      const matchesQuery =
        !query ||
        c.name.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  if (activeCategory === "all" && !query) {
    return <CategoryLanding />;
  }

  if (filtered.length === 0) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#23262F] bg-[#111319]/50 p-8 text-center backdrop-blur-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#23262F] bg-[#0B0D12]">
          <SearchX className="h-6 w-6 text-[#8B8D98]" />
        </div>
        <p className="mt-4 text-lg font-semibold text-[#F4F3F1]">
          No components found
        </p>
        <p className="mt-1 max-w-sm text-sm text-[#8B8D98]">
          We couldn't find anything matching your search. Try adjusting your filters or search term.
        </p>
      </div>
    );
  }

  return (
    <div className="[--ember:#FF7A45] [--teal:#5EEAD4]">
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((component) => {
          const Preview = component.preview;

          return (
            <Link
              key={component.id}
              to={`/components/${component.category}/${component.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#23262F] bg-[#111319] shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-[--ember]/40 hover:shadow-2xl hover:shadow-[--ember]/5"
            >
              {/* Background Glow Effect on Hover */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[--ember]/5 blur-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100" />

              {/* Preview Container */}
              <div className="blueprint-grid relative flex h-48 w-full items-center justify-center overflow-hidden border-b border-[#23262F] bg-[#0B0D12]">
                {/* Blueprint Technical Corner Markers */}
                {[
                  "left-3 top-3 border-l border-t",
                  "right-3 top-3 border-r border-t",
                  "left-3 bottom-3 border-l border-b",
                  "right-3 bottom-3 border-r border-b",
                ].map((pos, i) => (
                  <span
                    key={i}
                    className={`pointer-events-none absolute z-10 h-3 w-3 border-[--teal]/30 transition-colors duration-300 group-hover:border-[--teal]/70 ${pos}`}
                  />
                ))}

                {/* Component Preview Render */}
                {Preview ? (
                  <div className="pointer-events-none absolute left-1/2 top-1/2 w-[640px] origin-center -translate-x-1/2 -translate-y-1/2 scale-[0.28] transition-transform duration-500 group-hover:scale-[0.30]">
                    <Preview />
                  </div>
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="font-code text-xs uppercase tracking-wider text-[#5C5F6B]">
                      Preview Unavailable
                    </span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center rounded-md border border-[--teal]/20 bg-[--teal]/10 px-2.5 py-0.5 font-code text-[11px] font-medium uppercase tracking-wider text-[--teal]">
                      {component.category}
                    </span>
                  </div>

                  <h3 className="mt-3 text-lg font-semibold text-[#F4F3F1] transition-colors duration-200 group-hover:text-white">
                    {component.name}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#8B8D98]">
                    {component.description}
                  </p>
                </div>

                {/* Card Footer Link */}
                <div className="mt-6 flex items-center justify-between border-t border-[#23262F]/50 pt-4 text-xs font-medium text-[--ember]">
                  <span className="tracking-wide group-hover:underline">
                    View Component
                  </span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ComponentGrid;