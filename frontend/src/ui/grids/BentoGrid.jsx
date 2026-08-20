import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineFunnel,
  HiOutlinePlay,
  HiOutlineChartBar,
  HiOutlineCursorArrowRays,
  HiOutlineUsers,
  HiOutlineBell,
  HiOutlineXMark,
} from "react-icons/hi2";

// 1. Data Structure (Easily customizable for consuming apps)
const BENTO_ITEMS = [
  {
    id: "funnels",
    title: "Funnels",
    description:
      "Watch every step of a journey and see exactly where people drop off.",
    icon: HiOutlineFunnel,
    colSpan: "col-span-1 md:col-span-2",
  },
  {
    id: "session-replay",
    title: "Session replay",
    description:
      "Replay the exact session behind any metric and jump straight to the friction.",
    icon: HiOutlinePlay,
    colSpan: "col-span-1 md:col-span-1",
  },
  {
    id: "retention",
    title: "Retention",
    description:
      "Cohort curves that show who comes back, and the feature that brought them.",
    icon: HiOutlineChartBar,
    colSpan: "col-span-1 md:col-span-1",
  },
  {
    id: "autocapture",
    title: "Autocapture",
    description:
      "Every click, tap and pageview captured from day one, no tracking plan required.",
    icon: HiOutlineCursorArrowRays,
    colSpan: "col-span-1 md:col-span-2",
  },
  {
    id: "user-profiles",
    title: "User profiles",
    description:
      "Single customer views aggregating behavior, properties, and feature usage.",
    icon: HiOutlineUsers,
    colSpan: "col-span-1 md:col-span-1",
  },
  {
    id: "alerts",
    title: "Real-time alerts",
    description:
      "Get notified instantly when key user action metrics spike or drop.",
    icon: HiOutlineBell,
    colSpan: "col-span-1 md:col-span-2",
  },
];

// 2. Main Reusable Bento Grid Component
export default function BentoGrid() {
  const [selectedCard, setSelectedCard] = useState(null);

  const activeItem = BENTO_ITEMS.find((item) => item.id === selectedCard);

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-amber-50/70 via-stone-100 to-amber-100/60 p-6 font-sans text-slate-800 transition-colors duration-300">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header Section */}
        <div className="text-left space-y-1.5">
          <h2 className="font-serif text-3xl md:text-4xl font-normal tracking-tight text-slate-900">
            See what changed.
          </h2>
          <p className="text-sm md:text-base text-slate-600">
            Six surfaces, one line to install. Open any card to go deeper.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {BENTO_ITEMS.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedCard === item.id;

            return (
              <motion.div
                key={item.id}
                layoutId={`card-${item.id}`}
                onClick={() => setSelectedCard(item.id)}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={`group relative flex flex-col justify-between cursor-pointer rounded-3xl border p-6 text-left shadow-sm transition-all duration-200 ${
                  item.colSpan
                } ${
                  isSelected
                    ? "border-slate-800 ring-2 ring-slate-800/10 bg-[#FAF7F2]"
                    : "border-stone-200/80 bg-[#FAF7F2]/90 hover:bg-[#FAF7F2] hover:border-stone-300 hover:shadow-md"
                }`}
              >
                {/* Top Row: Icon & Expand Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-200/60 text-slate-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <HiOutlineFunnel className="h-4 w-4 text-slate-400 transition group-hover:text-slate-700" />
                </div>

                {/* Body Content */}
                <div className="space-y-2">
                  <h3 className="font-serif text-lg font-medium text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Pop-up Modal & Backdrop Dim */}
      <AnimatePresence>
        {selectedCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Light Dim Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCard(null)}
              className="fixed inset-0 bg-stone-900/20 backdrop-blur-sm"
            />

            {/* Expanded Modal Content */}
            {activeItem && (
              <motion.div
                layoutId={`card-${activeItem.id}`}
                className="relative z-10 w-full max-w-xl overflow-hidden rounded-3xl border border-stone-200 bg-[#FAF7F2] p-8 text-left shadow-2xl"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-stone-200/70 text-slate-800">
                    <activeItem.icon className="h-6 w-6" />
                  </div>
                  <button
                    onClick={() => setSelectedCard(null)}
                    className="rounded-full p-2 text-slate-400 hover:bg-stone-200/60 hover:text-slate-700"
                  >
                    <HiOutlineXMark className="h-5 w-5" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl font-normal text-slate-900">
                    {activeItem.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {activeItem.description}
                  </p>

                  <div className="mt-6 rounded-2xl border border-stone-200/60 bg-white/60 p-4 text-xs text-slate-500">
                    Interactive sandbox, live preview charts, or analytics controls can be added inside this expanded surface.
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => setSelectedCard(null)}
                    className="rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-medium text-white shadow-sm transition hover:bg-slate-800"
                  >
                    Close Preview
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

