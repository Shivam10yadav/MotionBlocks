import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineExclamationTriangle,
  HiOutlineXMark,
  HiOutlineCheck,
} from "react-icons/hi2";

// 1. Static/Interactive Light Theme Modal Component with Delete Animation
export default function LightDeleteModalCard() {
  const [status, setStatus] = useState("idle"); // 'idle' | 'deleting' | 'deleted'

  const handleDelete = () => {
    setStatus("deleting");
    setTimeout(() => {
      setStatus("deleted");
    }, 1200);
  };

  const handleReset = () => {
    setStatus("idle");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-4">
      <AnimatePresence mode="wait">
        {status !== "deleted" ? (
          <motion.div
            key="modal-card"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={
              status === "deleting"
                ? {
                    scale: [1, 1.02, 0.98, 1],
                    transition: { repeat: Infinity, duration: 0.8 },
                  }
                : { opacity: 1, scale: 1, y: 0 }
            }
            exit={{
              opacity: 0,
              scale: 0.8,
              y: 20,
              filter: "blur(4px)",
              transition: { duration: 0.35, ease: "easeIn" },
            }}
            className={`relative w-full max-w-md rounded-2xl border bg-white p-6 shadow-xl transition-colors duration-300 ${
              status === "deleting"
                ? "border-rose-300 ring-4 ring-rose-100"
                : "border-slate-200"
            }`}
          >
            {/* Close Button */}
            <button
              onClick={handleReset}
              className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <HiOutlineXMark className="h-5 w-5" />
            </button>

            {/* Modal Body */}
            <div className="flex flex-col items-center text-center">
              {/* Animated Warning / Spinner Badge */}
              <div className="relative mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 text-rose-600">
                {status === "deleting" ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="h-7 w-7 rounded-full border-2 border-rose-600 border-t-transparent"
                  />
                ) : (
                  <HiOutlineExclamationTriangle className="h-7 w-7" />
                )}
              </div>

              <h3 className="text-xl font-semibold text-slate-900">
                {status === "deleting" ? "Deleting Item..." : "Delete Confirmation"}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Are you sure you want to delete{" "}
                <span className="font-medium text-slate-800">"Project Alpha"</span>
                ? This action cannot be undone.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={handleReset}
                disabled={status === "deleting"}
                className="w-1/2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 active:scale-95 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={status === "deleting"}
                className="relative w-1/2 overflow-hidden rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-rose-700 active:scale-95 disabled:opacity-80"
              >
                {status === "deleting" ? "Deleting..." : "Delete"}
              </button>
            </div>
          </motion.div>
        ) : (
          /* Deleted Success State */
          <motion.div
            key="deleted-state"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center rounded-2xl border border-emerald-200 bg-white p-6 text-center shadow-lg"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <HiOutlineCheck className="h-6 w-6" />
            </div>
            <p className="text-base font-semibold text-slate-800">
              Item Deleted Successfully
            </p>
            <button
              onClick={handleReset}
              className="mt-4 rounded-lg bg-slate-100 px-4 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-200"
            >
              Reset Preview
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}