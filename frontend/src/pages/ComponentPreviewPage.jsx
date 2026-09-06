import React from "react";
import { useParams } from "react-router-dom";
import { components } from "../data/components";

function DefaultPreview() {
  return (
    <div className="relative w-full min-h-screen bg-[#08090D] flex items-center justify-center">
      <svg
        viewBox="0 0 240 440"
        className="w-[150px] sm:w-[190px] md:w-[230px] h-auto drop-shadow-[0_35px_50px_rgba(0,0,0,0.85)]"
      >
        <defs>
          <linearGradient id="capGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5EEAD4" />
            <stop offset="100%" stopColor="#14B8A6" />
          </linearGradient>
          <linearGradient id="glassBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#5EEAD4" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="liquid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5EEAD4" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#0F766E" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        <rect x="90" y="14" width="60" height="52" rx="4" fill="url(#capGold)" />
        <rect x="84" y="66" width="72" height="18" rx="3" fill="#111319" />
        <rect x="102" y="84" width="36" height="26" fill="url(#capGold)" />

        <path
          d="M 64,110 C 64,104 74,104 84,104 L 156,104 C 166,104 176,104 176,110 L 188,200 C 194,225 194,250 194,275 L 194,386 C 194,406 178,420 158,420 L 82,420 C 62,420 46,406 46,386 L 46,275 C 46,250 46,225 52,200 Z"
          fill="url(#glassBody)"
          stroke="url(#capGold)"
          strokeWidth="1.5"
          strokeOpacity="0.6"
        />

        <path
          d="M 52,230 C 50,260 50,290 50,320 L 50,380 C 50,398 64,410 82,410 L 158,410 C 176,410 190,398 190,380 L 190,320 C 190,290 190,260 188,230 Z"
          fill="url(#liquid)"
        />
      </svg>
    </div>
  );
}

const ComponentPreviewPage = () => {
  const { category, slug } = useParams();

  const component = components.find(
    (item) => item.category === category && item.slug === slug
  );

  const PreviewComponent = component?.preview || DefaultPreview;

  return (
    <div className="min-h-screen w-full bg-[#08090D]">
      <PreviewComponent />
    </div>
  );
};

export default ComponentPreviewPage;