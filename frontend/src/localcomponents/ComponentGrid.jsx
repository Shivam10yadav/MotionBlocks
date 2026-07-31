import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { components } from "../data/components";

const ComponentGrid = () => {
  return (
    <div>
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Browse Components
        </h1>

        <p className="mt-2 text-slate-400">
          Discover reusable React + Tailwind components.
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {components.map((component) => (
          <Link
            key={component.id}
            to={`/components/${component.category}/${component.slug}`}
            className="group block overflow-hidden rounded-2xl border border-[#30363D] bg-[#161B22] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40"
          >
            {/* Preview */}
            <div className="flex h-44 items-center justify-center border-b border-[#30363D] bg-[#0D1117]">
              <span className="text-slate-500">
                Preview
              </span>
            </div>

            {/* Content */}
            <div className="p-5">
              <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs text-cyan-400">
                {component.category}
              </span>

              <h3 className="mt-4 text-xl font-semibold text-white">
                {component.name}
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                {component.description}
              </p>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm text-cyan-400">
                  View Component
                </span>

                <ArrowUpRight className="h-5 w-5 text-cyan-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ComponentGrid;