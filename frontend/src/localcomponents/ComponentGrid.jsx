import {
  ArrowUpRight,
  SearchX,
  Grid3X3,
  Sparkles,
  Filter,
  Search,
  X,
  MousePointerClick,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { components } from "../data/components";
import { categories } from "../data/categories";
import CategoryLanding from "../pages/CategoryLanding";

const ComponentGrid = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";
  const query = (searchParams.get("q") || "").trim().toLowerCase();
  const [searchInput, setSearchInput] = useState("");

  const getCategoryName = (id) => {
    if (id === "all") return "All Components";
    const cat = categories.find((c) => c.id === id);
    return cat ? cat.name : id;
  };

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

  const handleSearch = () => {
    if (searchInput.trim()) {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set("q", searchInput.trim().toLowerCase());
        return next;
      });
    }
  };

  const clearSearch = () => {
    setSearchInput("");
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete("q");
      return next;
    });
  };

  const clearCategory = () => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete("category");
      return next;
    });
  };

  return (
    <div className="[--ember:#FF7A45] space-y-12 py-4">
      {/* ── Page Header ── */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-2">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Components
          </h1>
        </div>
      </div>

      {/* ── Filtered View Hero Card ── */}
      <div className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-[#040507] p-8 shadow-2xl md:p-12">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#FF7A45]/5 blur-[100px]" />
        
        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-neutral-800 bg-neutral-900/60 px-3.5 py-1.5 font-code text-xs font-semibold uppercase tracking-wider text-neutral-400 backdrop-blur-md">
              <Filter className="h-3.5 w-3.5 text-[#FF7A45]" /> Filtered View
            </div>

            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {getCategoryName(activeCategory)}
            </h2>

            <p className="text-base leading-relaxed text-neutral-400">
              {query ? (
                <>
                  Showing results matching "
                  <span className="text-white font-medium">{query}</span>" in{" "}
                  {activeCategory === "all"
                    ? "all categories"
                    : getCategoryName(activeCategory)}
                  . Browse, preview, and grab the code.
                </>
              ) : (
                <>
                  Explore the {filtered.length} curated design elements built for
                  high-performance interfaces under{" "}
                  <span className="text-white font-medium">
                    {getCategoryName(activeCategory)}
                  </span>
                  .
                </>
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
            <div className="flex items-center gap-3.5 rounded-2xl border border-neutral-800 bg-neutral-900/40 px-5 py-4 shadow-lg backdrop-blur-xl">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-700 bg-neutral-800/50 text-neutral-200">
                <Grid3X3 className="h-5 w-5" />
              </div>
              <div>
                <p className="font-code text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
                  Results
                </p>
                <p className="text-lg font-bold text-white">{filtered.length}</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 rounded-2xl border border-neutral-800 bg-neutral-900/40 px-5 py-4 shadow-lg backdrop-blur-xl">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#FF7A45]/30 bg-[#FF7A45]/10 text-[#FF7A45]">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="font-code text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
                  Active Filter
                </p>
                <p className="text-base font-bold text-white capitalize">
                  {getCategoryName(activeCategory)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Search Bar ── */}
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search components..."
            className="w-full rounded-2xl border border-neutral-800 bg-[#040507] py-3.5 pl-11 pr-10 text-sm text-white placeholder:text-neutral-600 outline-none transition-all duration-300 focus:border-[#FF7A45] focus:ring-2 focus:ring-[#FF7A45]/20 shadow-inner"
          />
          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 transition-colors hover:bg-neutral-700 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {activeCategory !== "all" && (
          <button
            onClick={clearCategory}
            className="flex items-center gap-2 rounded-2xl border border-neutral-800 bg-[#040507] px-5 py-3.5 text-sm font-medium text-neutral-400 transition-all hover:border-[#FF7A45] hover:text-white hover:bg-neutral-900"
          >
            <X className="h-4 w-4" />
            Clear filter
          </button>
        )}
      </div>

      {/* ── Grid / Empty State ── */}
      {filtered.length === 0 ? (
        <div className="flex min-h-[320px] flex-col items-center justify-center rounded-3xl border border-dashed border-neutral-800 bg-[#040507] p-8 text-center backdrop-blur-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900">
            <SearchX className="h-7 w-7 text-neutral-500" />
          </div>
          <p className="mt-5 text-xl font-semibold text-white">
            No components found
          </p>
          <p className="mt-1.5 max-w-sm text-sm text-neutral-500">
            We couldn't find anything matching your search term "
            <span className="text-white font-medium">{query}</span>". Try adjusting your query.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((component) => {
            return (
              <Link
                key={component.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-800/80 bg-[#060709] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#FF7A45]/60 hover:shadow-xl hover:shadow-[#FF7A45]/10"
                to={`/components/${component.category}/${component.slug}`}
              >
                {/* ── Compact Header Stage ── */}
                <div className="relative flex flex-col w-full border-b border-neutral-800/80 bg-[#030406]">
                  <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-neutral-900 bg-[#040507]">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-neutral-800 group-hover:bg-red-500/80 transition-colors" />
                      <span className="h-2 w-2 rounded-full bg-neutral-800 group-hover:bg-yellow-500/80 transition-colors" />
                      <span className="h-2 w-2 rounded-full bg-neutral-800 group-hover:bg-green-500/80 transition-colors" />
                    </div>
                    <span className="font-code text-[9px] tracking-wider uppercase text-neutral-500 group-hover:text-neutral-300 transition-colors">
                      Live Preview
                    </span>
                  </div>

                  {/* Perfectly Proportioned Action Panel (h-40) */}
                  <div className="relative flex h-40 w-full items-center justify-center overflow-hidden p-6">
                    <div className="absolute inset-0 bg-[radial-gradient(#1f242d_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />

                    <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-2.5 transition-transform duration-300 group-hover:scale-105">
                      <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-neutral-800 bg-[#0B0D12] text-neutral-400 shadow-lg group-hover:border-[#FF7A45] group-hover:text-[#FF7A45] transition-all duration-300">
                        <MousePointerClick className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />
                        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7A45] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF7A45]"></span>
                        </span>
                      </div>

                      <p className="font-display text-xs font-bold tracking-wide text-neutral-300 group-hover:text-white transition-colors">
                        Click to view component
                      </p>
                    </div>
                  </div>
                </div>

                {/* ── Compact Content Box ── */}
                <div className="flex flex-1 flex-col justify-between bg-[#0B0C10] p-5">
                  <div>
                    <span className="inline-flex items-center rounded-md border border-neutral-800 bg-[#040507] px-2.5 py-0.5 font-code text-[10px] font-semibold uppercase tracking-wider text-neutral-300">
                      {component.category}
                    </span>

                    <h3 className="mt-2.5 text-lg font-bold tracking-tight text-white group-hover:text-[#FF7A45] transition-colors duration-300">
                      {component.name}
                    </h3>

                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300">
                      {component.description}
                    </p>
                  </div>

                  {/* Footer Action */}
                  <div className="mt-5 flex items-center justify-between border-t border-neutral-800/80 pt-4 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    <span className="tracking-wide group-hover:text-white transition-colors">
                      View code
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-800 bg-[#040507] text-neutral-400 transition-all duration-300 group-hover:border-[#FF7A45] group-hover:bg-[#FF7A45] group-hover:text-black">
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ComponentGrid;