import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { components } from "../data/components";

const ComponentGrid = () => {
  return (
    <div className="[--ember:#FF7A45] [--teal:#5EEAD4]">
      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
        {components.map((component) => (
          <Link
            key={component.id}
            to={`/components/${component.category}/${component.slug}`}
            className="group block overflow-hidden rounded-2xl border border-[#23262F] bg-[#111319] transition-all duration-300 hover:-translate-y-1 hover:border-[--ember]/40"
          >
            {/* Preview — schematic tile, matches the datasheet viewport */}
            <div className="blueprint-grid relative flex h-44 items-center justify-center overflow-hidden border-b border-[#23262F] bg-[#0B0D12]">
              {[
                "left-2.5 top-2.5 border-l border-t",
                "right-2.5 top-2.5 border-r border-t",
                "left-2.5 bottom-2.5 border-l border-b",
                "right-2.5 bottom-2.5 border-r border-b",
              ].map((pos, i) => (
                <span
                  key={i}
                  className={`absolute h-3 w-3 border-[--teal]/40 ${pos}`}
                />
              ))}
              <span className="font-code text-sm text-[#5C5F6B]">Preview</span>
            </div>

            {/* Content */}
            <div className="p-5">
              <span className="rounded-full bg-[--teal]/10 px-3 py-1 font-code text-xs uppercase tracking-wide text-[--teal]">
                {component.category}
              </span>

              <h3 className="mt-4 text-xl font-semibold text-[#F4F3F1]">
                {component.name}
              </h3>

              <p className="mt-2 text-sm text-[#8B8D98]">
                {component.description}
              </p>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm text-[--ember]">View Component</span>

                <ArrowUpRight className="h-5 w-5 text-[--ember] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ComponentGrid;