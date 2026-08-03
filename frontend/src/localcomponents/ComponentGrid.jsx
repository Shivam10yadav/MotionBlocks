import {
  ArrowUpRight,
  SearchX,
  Grid3X3,
  Sparkles,
  Filter,
  Search,
  X,
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

  // Helper to get category name
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

  // When no filters active, show the CategoryLanding page
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
    <div className="[--ember:#FF7A45] [--teal:#5EEAD4] space-y-10 py-4">
      {/* ── Page Header ── */}
      <div className="flex flex-col gap-6  lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-2">
        
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Components
          </h1>
        </div>
       
      </div>

      {/* ── Filtered View Hero Card ── */}
      <div className="relative overflow-hidden rounded-3xl border border-[#23262F] bg-[#090A0F] p-8 shadow-2xl md:p-12">
        {/* Glow accents */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#FF7A45]/10 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#5EEAD4]/8 blur-[100px]" />

        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Left: Context + Title + Subtitle */}
          <div className="max-w-2xl space-y-4">
            {/* Filter Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#23262F] bg-[#111319] px-3.5 py-1.5 font-code text-xs font-semibold uppercase tracking-wider text-[#8B8D98]">
              <Filter className="h-3.5 w-3.5" /> Filtered View
            </div>

            {/* Dynamic Title */}
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {getCategoryName(activeCategory)}
            </h2>

            {/* Subtitle */}
            <p className="text-base leading-relaxed text-[#8B8D98]">
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
                  Browse and preview the {filtered.length} components available
                  in the{" "}
                  <span className="text-white font-medium">
                    {getCategoryName(activeCategory)}
                  </span>{" "}
                  category.
                </>
              )}
            </p>
          </div>

          {/* Right: Stats */}
          <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
            <div className="flex items-center gap-3.5 rounded-2xl border border-[#23262F] bg-[#111319]/90 px-5 py-4 shadow-lg backdrop-blur-xl">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#5EEAD4]/30 bg-[#5EEAD4]/10 text-[#5EEAD4]">
                <Grid3X3 className="h-5 w-5" />
              </div>
              <div>
                <p className="font-code text-[10px] font-semibold uppercase tracking-wider text-[#8B8D98]">
                  Results
                </p>
                <p className="text-lg font-bold text-white">{filtered.length}</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 rounded-2xl border border-[#23262F] bg-[#111319]/90 px-5 py-4 shadow-lg backdrop-blur-xl">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#FF7A45]/30 bg-[#FF7A45]/10 text-[#FF7A45]">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="font-code text-[10px] font-semibold uppercase tracking-wider text-[#8B8D98]">
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

      {/* ── Search Bar (when in filtered view) ── */}
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B8D98]" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search components..."
            className="w-full rounded-xl border border-[#23262F] bg-[#111319] py-3 pl-11 pr-10 text-sm text-white placeholder:text-[#5C5F6B] outline-none transition-colors duration-300 focus:border-[--ember] focus:ring-1 focus:ring-[--ember]/30"
          />
          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-md bg-[#23262F] text-[#8B8D98] transition-colors hover:bg-[#2a2d3a] hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {activeCategory !== "all" && (
          <button
            onClick={clearCategory}
            className="flex items-center gap-2 rounded-xl border border-[#23262F] bg-[#111319] px-4 py-3 text-sm text-[#8B8D98] transition-colors hover:border-[--ember] hover:text-white"
          >
            <X className="h-4 w-4" />
            Clear filter
          </button>
        )}
      </div>

      {/* ── Grid / Empty State ── */}
      {filtered.length === 0 ? (
        <div className="flex min-h-[320px] flex-col items-center justify-center rounded-3xl border border-dashed border-[#23262F] bg-[#090A0F] p-8 text-center backdrop-blur-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#23262F] bg-[#050608]">
            <SearchX className="h-7 w-7 text-[#8B8D98]" />
          </div>
          <p className="mt-5 text-xl font-semibold text-[#F4F3F1]">
            No components found
          </p>
          <p className="mt-1.5 max-w-sm text-sm text-[#8B8D98]">
            We couldn't find anything matching your search term "
            <span className="text-white font-medium">{query}</span>" in{" "}
            {activeCategory === "all"
              ? "all categories"
              : getCategoryName(activeCategory)}
            . Try adjusting your filters or search term.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((component) => {
            const Preview = component.preview;

            return (
              <Link
                key={component.id}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-[#23262F] bg-[#111319] p-2 shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-[--ember] hover:shadow-2xl hover:shadow-[--ember]/10"
                to={`/components/${component.category}/${component.slug}`}
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[--ember]/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Preview Container */}
                <div className="relative flex h-48 w-full items-center justify-center overflow-hidden rounded-2xl border border-[#23262F] bg-[#0B0D12]">
                  {/* Blueprint corner markers */}
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

                  {/* Component Preview */}
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
                <div className="flex flex-1 flex-col justify-between p-6 pt-5">
                  <div>
                    <span className="inline-flex items-center rounded-md border border-[#23262F] bg-[#0B0D12] px-2.5 py-1 font-code text-[11px] font-medium uppercase tracking-wider text-[#8B8D98] transition-colors duration-300 group-hover:border-[--teal]/30 group-hover:text-[--teal]">
                      {component.category}
                    </span>

                    <h3 className="mt-3 text-xl font-bold tracking-tight text-[#F4F3F1] transition-colors duration-300 group-hover:text-white">
                      {component.name}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#8B8D98] transition-colors duration-300 group-hover:text-white/80">
                      {component.description}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-6 flex items-center justify-between border-t border-[#23262F]/80 pt-5 text-xs font-semibold uppercase tracking-wider text-[#8B8D98] transition-colors duration-300 group-hover:text-white">
                    <span className="tracking-wide">View Component</span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#23262F] bg-[#050608] transition-all duration-300 group-hover:border-[--ember] group-hover:bg-[--ember] group-hover:text-black">
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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
