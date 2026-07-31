import { Search } from "lucide-react";

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
  return (
    <aside className="w-72 h-[calc(100vh-88px)] sticky top-[88px] border-r border-[#30363D] bg-[#0D1117] p-6">
      {/* Heading */}
      <div>
        <p className="text-xs uppercase tracking-widest text-cyan-400">
          Library
        </p>

        <h2 className="mt-2 text-2xl font-bold text-white">
          Components
        </h2>
      </div>

      {/* Search */}
      <div className="relative mt-8">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
        />

        <input
          type="text"
          placeholder="Search components..."
          className="w-full rounded-xl border border-[#30363D] bg-[#161B22] py-3 pl-11 pr-4 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
        />
      </div>

      {/* Categories */}
      <div className="mt-10">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Categories
        </p>

        <div className="space-y-2">
          {categories.map((category, index) => (
            <button
              key={category}
              className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-all duration-200 ${
                index === 0
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                  : "text-slate-400 hover:bg-[#161B22] hover:text-white"
              }`}
            >
              <span>{category}</span>

              <span className="text-xs text-slate-500">
                {Math.floor(Math.random() * 20) + 5}
              </span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;