import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineCloudArrowUp,
  HiOutlineDocumentText,
  HiOutlineXMark,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
} from "react-icons/hi2";

// 1. Interactive Light-Theme Preview Component
export default function FileUpload() {
  const [files, setFiles] = useState([
    {
      id: "1",
      name: "design_specifications_v2.pdf",
      size: 2450000,
      progress: 100,
      status: "complete",
    },
    {
      id: "2",
      name: "hero_dashboard_banner.png",
      size: 1120000,
      progress: 65,
      status: "uploading",
    },
  ]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const handleFiles = (newFiles) => {
    setError("");
    const validFiles = Array.from(newFiles).filter((file) => {
      // 10MB limit check
      if (file.size > 10 * 1024 * 1024) {
        setError("File size exceeds 10MB limit.");
        return false;
      }
      return true;
    });

    const formattedFiles = validFiles.map((file, index) => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      size: file.size,
      progress: 0,
      status: "uploading",
    }));

    setFiles((prev) => [...prev, ...formattedFiles]);

    // Simulate progress for newly added files
    formattedFiles.forEach((fileObj) => {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 20;
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileObj.id
              ? {
                  ...f,
                  progress: currentProgress,
                  status: currentProgress >= 100 ? "complete" : "uploading",
                }
              : f
          )
        );
        if (currentProgress >= 100) clearInterval(interval);
      }, 300);
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl text-left font-sans">
      {/* Drop Zone Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200 ${
          isDragging
            ? "border-indigo-500 bg-indigo-50/50 scale-[0.99]"
            : "border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-slate-50"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />

        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-slate-200/50 border border-slate-100 text-indigo-600">
          <HiOutlineCloudArrowUp className="h-6 w-6" />
        </div>

        <p className="text-sm font-semibold text-slate-800">
          Click to upload <span className="font-normal text-slate-500">or drag and drop</span>
        </p>
        <p className="mt-1 text-xs text-slate-400">
          SVG, PNG, JPG, or PDF (max. 10MB)
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-rose-50 p-2.5 text-xs font-medium text-rose-600">
          <HiOutlineExclamationCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* File List */}
      <div className="mt-5 space-y-3">
        <AnimatePresence>
          {files.map((file) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="group relative flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 transition hover:bg-slate-50"
            >
              <div className="flex items-center gap-3 min-w-0 pr-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-500 shadow-sm">
                  <HiOutlineDocumentText className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-slate-800">
                    {file.name}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {formatFileSize(file.size)}
                  </p>

                  {/* Progress Bar */}
                  {file.status === "uploading" && (
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                      <motion.div
                        className="h-full bg-indigo-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${file.progress}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Status / Action Button */}
              <div className="flex items-center gap-2">
                {file.status === "complete" ? (
                  <HiOutlineCheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
                ) : (
                  <span className="text-[10px] font-semibold text-indigo-600">
                    {file.progress}%
                  </span>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(file.id);
                  }}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-200/60 hover:text-slate-600"
                >
                  <HiOutlineXMark className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}