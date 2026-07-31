import { useParams } from "react-router-dom";
import { components } from "../data/components";

const ComponentDetails = () => {
  const { category, slug } = useParams();

  const component = components.find(
    (item) =>
      item.category === category &&
      item.slug === slug
  );

  if (!component) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0D1117] text-white">
        <h1 className="text-3xl font-bold">Component Not Found</h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0D1117] text-white">
      <div className="mx-auto max-w-6xl px-8 py-12">
        {/* Category */}
        <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-400">
          {component.category}
        </span>

        {/* Title */}
        <h1 className="mt-6 text-5xl font-bold">
          {component.name}
        </h1>

        {/* Description */}
        <p className="mt-4 max-w-2xl text-lg text-slate-400">
          {component.description}
        </p>

        {/* Preview */}
        <div className="mt-12 rounded-2xl border border-[#30363D] bg-[#161B22] p-10">
          <h2 className="mb-6 text-2xl font-semibold">
            Live Preview
          </h2>

          <div className="flex h-80 items-center justify-center rounded-xl border border-dashed border-[#30363D]">
            <span className="text-slate-500">
              Component Preview Coming Soon
            </span>
          </div>
        </div>

        {/* Code */}
        <div className="mt-10 rounded-2xl border border-[#30363D] bg-[#161B22] p-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              Code
            </h2>

            <button className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-black">
              Copy Code
            </button>
          </div>

          <pre className="overflow-x-auto rounded-lg bg-[#0D1117] p-6 text-sm text-slate-300">
{`// Component code will appear here`}
          </pre>
        </div>
      </div>
    </main>
  );
};

export default ComponentDetails;