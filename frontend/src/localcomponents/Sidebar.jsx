import { Search } from "lucide-react";
import { useState } from "react";

const categories = [
  "All Components",
  "Buttons",
  "Cards",
  "Hero Sections",
  "Backgrounds",
  "Loaders",
  "Forms",
  "Navigation",
  "Text Effects",
];

const Sidebar = () => {
  const [active, setActive] = useState(0);

  return (
    <>
      {/* ================= Desktop rail ================= */}
      <aside className="sticky top-[88px] hidden h-[calc(100vh-88px)] w-72 shrink-0 border-r border-[#23262F] bg-[#08090D] p-6 md:block [--ember:#FF7A45] [--teal:#5EEAD4]">
        {/* Heading */}
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
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setActive(index)}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-all duration-200 ${
                  active === index
                    ? "border border-[--teal]/25 bg-[--teal]/10 text-[--teal]"
                    : "text-[#8B8D98] hover:bg-[#111319] hover:text-[#F4F3F1]"
                }`}
              >
                <span>{category}</span>

                <span className="font-code text-xs text-[#5C5F6B]">
                  {Math.floor(Math.random() * 20) + 5}
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
            aria-label="Search components"
            className="flex shrink-0 items-center justify-center rounded-full border border-[#23262F] bg-[#111319] p-3 text-[#8B8D98] active:scale-95"
          >
            <Search size={18} />
          </button>

          <div className="flex flex-1 gap-2 overflow-x-auto py-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setActive(index)}
                className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 font-code text-sm transition-all duration-200 ${
                  active === index
                    ? "border border-[--teal]/25 bg-[--teal]/10 text-[--teal]"
                    : "border border-[#23262F] bg-[#111319] text-[#8B8D98]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;