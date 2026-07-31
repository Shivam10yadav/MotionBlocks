import { motion } from "framer-motion";
import { Navbar } from "../localcomponents/Navbar";
import Sidebar from "../localcomponents/Sidebar";
import ComponentGrid from "../localcomponents/ComponentGrid";

/* ---------------------------------------------------------
   NOTE: the font-import + blueprint-grid <style> block below
   also lives in ComponentDetails.jsx. If both pages render in
   the same app, move this block into a shared root layout
   (e.g. App.jsx or index.html <head>) instead of duplicating
   it per page.
   --------------------------------------------------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
};

const Components = () => {
  return (
    <>
      <Navbar />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .font-code { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .blueprint-grid {
          background-image:
            linear-gradient(to right, rgba(94,234,212,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(94,234,212,0.06) 1px, transparent 1px);
          background-size: 32px 32px;
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
        }
      `}</style>

      <main className="min-h-screen bg-[#08090D] pt-24 text-[#F4F3F1] [--ember:#FF7A45] [--teal:#5EEAD4]">
        {/* ================= Page header (compact) ================= */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="flex flex-wrap items-end justify-between gap-4 border-b border-[#23262F] px-4 py-6 sm:px-8"
        >
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[--teal] shadow-[0_0_8px_#5EEAD4]" />
              <span className="font-code text-xs uppercase tracking-[0.2em] text-[--teal]">
                Catalog
              </span>
            </div>
            <h1 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">
              Components
            </h1>
          </div>
          <p className="max-w-md text-base leading-relaxed text-[#8B8D98]">
            Copy-paste parts for your next build — browse, preview live, grab the code.
          </p>
        </motion.div>

        {/* ================= Sidebar + grid ================= */}
        <div className="flex w-full items-start">
          <Sidebar />

          <motion.section
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="flex-1 px-4 pb-28 pt-6 sm:px-8 md:pb-8"
          >
            <ComponentGrid />
          </motion.section>
        </div>
      </main>
    </>
  );
};

export default Components;