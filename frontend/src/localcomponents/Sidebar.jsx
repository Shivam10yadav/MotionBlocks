import { Search, X } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { categories } from "../data/categories";
import { components } from "../data/components";

const Sidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const activeCategory = searchParams.get("category") || "all";
  const query = searchParams.get("q") || "";

  const setCategory = (id) => {
    const next = new URLSearchParams(searchParams);
    if (id === "all") next.delete("category");
    else next.set("category", id);
    setSearchParams(next);
  };

  const setQuery = (value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set("q", value);
    else next.delete("q");
    setSearchParams(next);
  };

  const countFor = (id) =>
    id === "all"
      ? components.length
      : components.filter((c) => c.category === id).length;

  return (
    <>
      {/* ================= Desktop rail ================= */}
<aside
  className="self-start hidden w-72 shrink-0
             border-r border-[#23262F] bg-[#08090D] p-6 md:block
             [--ember:#FF7A45] [--teal:#5EEAD4]"
>
        <div>
          <p className="font-code text-xs uppercase tracking-widest text-[--teal]">
            Library
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold text-[#F4F3F1]">
            Components
          </h2>
        </div>

        {/* Search */}
        <div className="relative mt-8">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5C5F6B]"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search components..."
            className="w-full rounded-xl border border-[#23262F] bg-[#111319] py-3 pl-11 pr-4 text-[#F4F3F1] placeholder:text-[#5C5F6B] focus:border-[--ember] focus:outline-none"
          />
        </div>

        {/* Categories */}
        <div className="mt-10">
          <p className="mb-4 font-code text-xs font-semibold uppercase tracking-wider text-[#5C5F6B]">
            Categories
          </p>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setCategory(category.id)}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-all duration-200 ${
                  activeCategory === category.id
                    ? "border border-[--teal]/25 bg-[--teal]/10 text-[--teal]"
                    : "text-[#8B8D98] hover:bg-[#111319] hover:text-[#F4F3F1]"
                }`}
              >
                <span>{category.name}</span>
                <span className="font-code text-xs text-[#5C5F6B]">
                  {countFor(category.id)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* ================= Mobile bottom dock ================= */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#23262F] bg-[#08090D]/95 backdrop-blur-xl md:hidden [--ember:#FF7A45] [--teal:#5EEAD4]">
        <div className="flex items-center gap-2 px-3 py-3">
          <button
            aria-label={mobileSearchOpen ? "Close search" : "Search components"}
            onClick={() => setMobileSearchOpen((v) => !v)}
            className="flex shrink-0 items-center justify-center rounded-full border border-[#23262F] bg-[#111319] p-3 text-[#8B8D98] active:scale-95"
          >
            {mobileSearchOpen ? <X size={18} /> : <Search size={18} />}
          </button>

          {mobileSearchOpen ? (
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search components..."
              className="flex-1 rounded-full border border-[#23262F] bg-[#111319] px-4 py-2.5 text-sm text-[#F4F3F1] placeholder:text-[#5C5F6B] focus:border-[--ember] focus:outline-none"
            />
          ) : (
            <div className="flex flex-1 gap-2 overflow-x-auto py-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setCategory(category.id)}
                  className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 font-code text-sm transition-all duration-200 ${
                    activeCategory === category.id
                      ? "border border-[--teal]/25 bg-[--teal]/10 text-[--teal]"
                      : "border border-[#23262F] bg-[#111319] text-[#8B8D98]"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;