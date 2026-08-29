import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  RiPaletteLine, 
  RiFileCopyLine, 
  RiCheckLine, 
  RiRefreshLine, 
  RiAddLine, 
  RiDeleteBinLine,
  RiSparklingFill
} from "react-icons/ri";

// Imported Preset Data
import { GRADIENT_PRESETS } from "../data/gradients";
import { Navbar } from "../localcomponents/Navbar";

// Light Design System Tokens
const CANVAS_BG = "#FAF8F5";
const CARD_BG = "#FFFFFF";
const TEXT_DARK = "#191715";
const TEXT_MUTED = "rgba(25, 23, 21, 0.6)";
const BORDER_WARM = "rgba(125, 90, 60, 0.15)";
const ACCENT_CLAY = "#8C522B";

async function executeCopy(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return true;
  }
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
    textArea.remove();
    return true;
  } catch {
    textArea.remove();
    return false;
  }
}

export default function BackgroundGradientGenerator() {
  // Generator State
  const [bgType, setBgType] = useState("linear"); // "linear" | "radial" | "solid"
  const [colors, setColors] = useState(GRADIENT_PRESETS[0].colors);
  const [angle, setAngle] = useState(GRADIENT_PRESETS[0].angle);
  const [selectedPresetId, setSelectedPresetId] = useState(GRADIENT_PRESETS[0].id);
  const [copiedFormat, setCopiedFormat] = useState(null);
  const [codeTab, setCodeTab] = useState("CSS");

  // Compute CSS Output
  const cssBackground = useMemo(() => {
    if (bgType === "solid") return colors[0];
    if (bgType === "radial") return `radial-gradient(circle, ${colors.join(", ")})`;
    return `linear-gradient(${angle}deg, ${colors.join(", ")})`;
  }, [bgType, colors, angle]);

  // Compute Tailwind Output
  const tailwindOutput = useMemo(() => {
    if (bgType === "solid") return `bg-[${colors[0]}]`;
    return `bg-[${cssBackground}]`;
  }, [bgType, colors, cssBackground]);

  // Load Preset into Custom Engine Controls
  const handleSelectPreset = (preset) => {
    setSelectedPresetId(preset.id);
    setBgType(preset.type);
    setAngle(preset.angle);
    setColors([...preset.colors]);
  };

  const handleAddStop = () => {
    if (colors.length < 5) {
      setColors([...colors, "#FFFFFF"]);
    }
  };

  const handleRemoveStop = (index) => {
    if (colors.length > 2) {
      setColors(colors.filter((_, i) => i !== index));
    }
  };

  const handleColorChange = (index, value) => {
    const updated = [...colors];
    updated[index] = value;
    setColors(updated);
  };

  const handleRandomize = () => {
    const randomHex = () =>
      "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
    setColors([randomHex(), randomHex()]);
    setAngle(Math.floor(Math.random() * 360));
    setSelectedPresetId(null);
  };

  const handleCopyCode = async (format) => {
    const snippet = format === "CSS" ? `background: ${cssBackground};` : tailwindOutput;
    const ok = await executeCopy(snippet);
    if (ok) {
      setCopiedFormat(format);
      setTimeout(() => setCopiedFormat(null), 1500);
    }
  };

  return (
    <div className="min-h-screen font-sans antialiased pb-32" style={{ backgroundColor: CANVAS_BG, color: TEXT_DARK }}>

      <Navbar/>
      
      {/* Header */}
      <section className="mx-auto max-w-7xl px-4 sm:px-8 pt-12 sm:pt-20">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b" style={{ borderColor: BORDER_WARM }}>
          <div>
         
            <h1 className="mt-3 font-display text-5xl sm:text-7xl font-black uppercase tracking-tight text-[#191715]">
              Gradient <span className="text-[#8C522B]">Lab</span>
            </h1>
            <p className="mt-3 text-sm sm:text-base max-w-lg leading-relaxed font-medium" style={{ color: TEXT_MUTED }}>
              Select a pre-built preset to instantly tweak colors, angles, and types, or build your own custom background from scratch.
            </p>
          </div>

          <button
            onClick={handleRandomize}
            className="flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 font-mono text-xs font-bold text-white bg-[#8C522B] hover:bg-[#734222] transition-all shadow-md active:scale-95"
          >
            <RiRefreshLine className="h-4 w-4" />
            <span>Randomize Generator</span>
          </button>
        </div>
      </section>

      {/* Main Studio System Grid */}
      <main className="mx-auto max-w-7xl px-4 sm:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Presets Library (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-[28px] border bg-white p-6 shadow-sm space-y-4" style={{ borderColor: BORDER_WARM }}>
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-xs font-extrabold uppercase text-[#8C522B]">
                  Presets Catalog ({GRADIENT_PRESETS.length})
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {GRADIENT_PRESETS.map((preset) => {
                  const isSelected = selectedPresetId === preset.id;
                  const bgStyle = preset.type === "radial" 
                    ? `radial-gradient(circle, ${preset.colors.join(", ")})`
                    : `linear-gradient(${preset.angle}deg, ${preset.colors.join(", ")})`;
                  
                  return (
                    <button
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      className={`group p-3.5 rounded-2xl border flex items-center justify-between text-left transition-all ${
                        isSelected 
                          ? "border-[#8C522B] bg-[#FAF8F5] shadow-sm" 
                          : "border-black/10 hover:border-black/30"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div 
                          className="h-10 w-10 rounded-xl border border-black/10 shrink-0 shadow-inner" 
                          style={{ background: bgStyle }} 
                        />
                        <div>
                          <p className="font-mono text-xs font-extrabold text-[#191715] uppercase">
                            {preset.name}
                          </p>
                          <p className="font-mono text-[10px] text-black/50 uppercase">
                            {preset.category} • {preset.colors.length} Colors
                          </p>
                        </div>
                      </div>

                      <span className="font-mono text-[10px] uppercase font-black px-2.5 py-1 rounded-full bg-black/5 text-black/60">
                        {preset.type}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: Active Generator Controls & Stage (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Interactive Stage Box */}
            <div
              className="relative rounded-[32px] p-8 sm:p-10 border shadow-xl transition-all duration-300 overflow-hidden min-h-[340px] flex flex-col justify-between"
              style={{
                background: cssBackground,
                borderColor: BORDER_WARM,
              }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase font-extrabold px-3 py-1 rounded-full bg-white/40 backdrop-blur-md text-[#191715] border border-white/20">
                  Live Stage Preview
                </span>
                <RiSparklingFill className="h-6 w-6 text-white/80 drop-shadow-md" />
              </div>

              <div className="my-6 p-6 rounded-2xl bg-white/40 backdrop-blur-md border border-white/30 shadow-md max-w-md">
                <h4 className="font-display text-2xl font-black uppercase text-[#191715]">
                  UI Background Test
                </h4>
                <p className="mt-1 font-sans text-xs font-semibold leading-relaxed text-[#191715]/80">
                  Verify how your custom color stops and gradient angles look behind standard card containers and typography.
                </p>
              </div>

              <div className="font-mono text-xs font-bold text-[#191715] bg-white/40 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20 self-start">
                {bgType.toUpperCase()} {bgType === "linear" ? `(${angle}°)` : ""}
              </div>
            </div>

            {/* Custom Control Panel */}
            <div className="rounded-[28px] border bg-white p-6 shadow-sm space-y-6" style={{ borderColor: BORDER_WARM }}>
              
              {/* Type Switcher */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-xs font-extrabold uppercase text-black/60 block mb-2">
                    Style Mode
                  </label>
                  <div className="flex p-1 rounded-2xl bg-[#FAF8F5] border" style={{ borderColor: BORDER_WARM }}>
                    {["linear", "radial", "solid"].map((type) => (
                      <button
                        key={type}
                        onClick={() => setBgType(type)}
                        className={`flex-1 py-2 rounded-xl font-mono text-xs font-bold capitalize transition-all ${
                          bgType === type ? "bg-[#8C522B] text-white shadow-sm" : "text-black/60 hover:text-black"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Angle Slider */}
                {bgType === "linear" && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="font-mono text-xs font-extrabold uppercase text-black/60">
                        Angle ({angle}°)
                      </label>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={angle}
                      onChange={(e) => setAngle(Number(e.target.value))}
                      className="w-full accent-[#8C522B] cursor-pointer mt-2"
                    />
                  </div>
                )}
              </div>

              {/* Color Stops Manager */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-mono text-xs font-extrabold uppercase text-black/60">
                    Active Color Stops ({colors.length})
                  </label>
                  {bgType !== "solid" && colors.length < 5 && (
                    <button
                      onClick={handleAddStop}
                      className="flex items-center gap-1 font-mono text-xs font-bold text-[#8C522B] hover:underline"
                    >
                      <RiAddLine className="h-4 w-4" />
                      <span>Add Stop</span>
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  {colors.map((color, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-2.5 p-2.5 rounded-2xl border bg-[#FAF8F5]" 
                      style={{ borderColor: BORDER_WARM }}
                    >
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => handleColorChange(index, e.target.value)}
                        className="h-7 w-8 rounded-lg border border-black/10 cursor-pointer bg-transparent p-0"
                      />
                      <input
                        type="text"
                        value={color.toUpperCase()}
                        onChange={(e) => handleColorChange(index, e.target.value)}
                        className="w-20 bg-transparent font-mono text-xs font-extrabold outline-none uppercase"
                      />
                      {colors.length > 2 && bgType !== "solid" && (
                        <button
                          onClick={() => handleRemoveStop(index)}
                          className="text-black/40 hover:text-rose-600 transition-colors"
                        >
                          <RiDeleteBinLine className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Code Export Output */}
            <div className="rounded-[28px] border bg-white p-6 shadow-sm space-y-4" style={{ borderColor: BORDER_WARM }}>
              <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: BORDER_WARM }}>
                <div className="flex items-center gap-2">
                  {["CSS", "Tailwind"].map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setCodeTab(fmt)}
                      className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
                        codeTab === fmt ? "bg-[#8C522B] text-white" : "bg-[#FAF8F5] text-black/60"
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handleCopyCode(codeTab)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8C522B] text-white text-xs font-mono font-bold hover:bg-[#734222] transition-colors"
                >
                  {copiedFormat === codeTab ? <RiCheckLine className="h-4 w-4 text-emerald-300" /> : <RiFileCopyLine className="h-4 w-4" />}
                  <span>{copiedFormat === codeTab ? "Copied!" : "Copy Code"}</span>
                </button>
              </div>

              <div className="relative rounded-2xl bg-[#0D0C0A] p-4 font-mono text-xs text-amber-200 overflow-x-auto">
                <code>
                  {codeTab === "CSS" ? `background: ${cssBackground};` : tailwindOutput}
                </code>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}