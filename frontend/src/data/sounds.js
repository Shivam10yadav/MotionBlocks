// Pure Web Audio API Synthesizer Engine (Zero external .mp3 files needed)
export const playSoundEffect = (type, pitchShift = 1, volume = 0.2) => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const safeVol = Math.max(0.01, Math.min(volume, 0.5));

    switch (type) {
      // 1. Tactile Click
      case "click":
        osc.type = "sine";
        osc.frequency.setValueAtTime(800 * pitchShift, now);
        osc.frequency.exponentialRampToValueAtTime(400 * pitchShift, now + 0.04);
        gain.gain.setValueAtTime(safeVol, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
        break;

      // 2. Toggle Pop
      case "toggle":
        osc.type = "triangle";
        osc.frequency.setValueAtTime(300 * pitchShift, now);
        osc.frequency.exponentialRampToValueAtTime(1200 * pitchShift, now + 0.06);
        gain.gain.setValueAtTime(safeVol, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.06);
        osc.start(now);
        osc.stop(now + 0.06);
        break;

      // 3. Success Chime (Two-tone chord)
      case "success":
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25 * pitchShift, now); // C5
        osc.frequency.setValueAtTime(659.25 * pitchShift, now + 0.08); // E5
        gain.gain.setValueAtTime(safeVol, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
        break;

      // 4. Alert Thud
      case "error":
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(180 * pitchShift, now);
        osc.frequency.linearRampToValueAtTime(110 * pitchShift, now + 0.12);
        gain.gain.setValueAtTime(safeVol, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
        break;

      // 5. Micro Bubble
      case "pop":
        osc.type = "sine";
        osc.frequency.setValueAtTime(400 * pitchShift, now);
        osc.frequency.exponentialRampToValueAtTime(900 * pitchShift, now + 0.03);
        gain.gain.setValueAtTime(safeVol * 1.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.03);
        osc.start(now);
        osc.stop(now + 0.03);
        break;

      // 6. Trash Sweep
      case "delete":
        osc.type = "sine";
        osc.frequency.setValueAtTime(600 * pitchShift, now);
        osc.frequency.linearRampToValueAtTime(150 * pitchShift, now + 0.1);
        gain.gain.setValueAtTime(safeVol, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
        break;

      // 7. Metallic Lock (Snap switch)
      case "lock":
        osc.type = "square";
        osc.frequency.setValueAtTime(1200 * pitchShift, now);
        osc.frequency.exponentialRampToValueAtTime(300 * pitchShift, now + 0.02);
        gain.gain.setValueAtTime(safeVol * 0.7, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
        osc.start(now);
        osc.stop(now + 0.025);
        break;

      // 8. Glass Tap (High clarity interface pin)
      case "glass":
        osc.type = "sine";
        osc.frequency.setValueAtTime(1800 * pitchShift, now);
        osc.frequency.exponentialRampToValueAtTime(1400 * pitchShift, now + 0.08);
        gain.gain.setValueAtTime(safeVol * 0.9, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
        break;

      // 9. Level Up (3-step rising arpeggio)
      case "levelup":
        osc.type = "triangle";
        osc.frequency.setValueAtTime(440 * pitchShift, now); // A4
        osc.frequency.setValueAtTime(554.37 * pitchShift, now + 0.06); // C#5
        osc.frequency.setValueAtTime(659.25 * pitchShift, now + 0.12); // E5
        gain.gain.setValueAtTime(safeVol, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);
        osc.start(now);
        osc.stop(now + 0.28);
        break;

      // 10. Cyber Swipe (Fast frequency slide)
      case "swipe":
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(250 * pitchShift, now);
        osc.frequency.exponentialRampToValueAtTime(1500 * pitchShift, now + 0.07);
        gain.gain.setValueAtTime(safeVol * 0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.07);
        osc.start(now);
        osc.stop(now + 0.07);
        break;

      // 11. Subtle Hover (Ultra-soft low tick)
      case "hover":
        osc.type = "sine";
        osc.frequency.setValueAtTime(1200 * pitchShift, now);
        gain.gain.setValueAtTime(safeVol * 0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);
        osc.start(now);
        osc.stop(now + 0.015);
        break;

      // 12. Notification Bell (Warm decaying sine wave)
      case "bell":
        osc.type = "sine";
        osc.frequency.setValueAtTime(987.77 * pitchShift, now); // B5
        gain.gain.setValueAtTime(safeVol * 0.8, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.start(now);
        osc.stop(now + 0.45);
        break;

      // 13. Camera Shutter (Dual pulse click)
      case "shutter":
        osc.type = "square";
        osc.frequency.setValueAtTime(800 * pitchShift, now);
        osc.frequency.setValueAtTime(400 * pitchShift, now + 0.02);
        gain.gain.setValueAtTime(safeVol * 0.6, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
        break;

      // 14. Expand Drawer (Low-to-high swell)
      case "expand":
        osc.type = "triangle";
        osc.frequency.setValueAtTime(220 * pitchShift, now);
        osc.frequency.linearRampToValueAtTime(440 * pitchShift, now + 0.09);
        gain.gain.setValueAtTime(safeVol * 0.7, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.09);
        osc.start(now);
        osc.stop(now + 0.09);
        break;

      // 15. Minimal Drop (Drip drop effect)
      case "drop":
        osc.type = "sine";
        osc.frequency.setValueAtTime(1400 * pitchShift, now);
        osc.frequency.exponentialRampToValueAtTime(600 * pitchShift, now + 0.05);
        gain.gain.setValueAtTime(safeVol * 0.9, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
        break;

      default:
        break;
    }
  } catch (e) {
    console.warn("AudioContext error:", e);
  }
};

// Returns exact JS function snippet for modal & copying
export const getJsCodeSnippet = (soundType) => {
  const functionName = soundType.charAt(0).toUpperCase() + soundType.slice(1);
  
  const snippets = {
    click: `osc.type = "sine";
  osc.frequency.setValueAtTime(800, now);
  osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);
  gain.gain.setValueAtTime(0.15, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);
  osc.start(now);
  osc.stop(now + 0.04);`,

    toggle: `osc.type = "triangle";
  osc.frequency.setValueAtTime(300, now);
  osc.frequency.exponentialRampToValueAtTime(1200, now + 0.06);
  gain.gain.setValueAtTime(0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.06);
  osc.start(now);
  osc.stop(now + 0.06);`,

    success: `osc.type = "sine";
  osc.frequency.setValueAtTime(523.25, now); // C5
  osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
  gain.gain.setValueAtTime(0.18, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
  osc.start(now);
  osc.stop(now + 0.25);`,

    error: `osc.type = "sawtooth";
  osc.frequency.setValueAtTime(180, now);
  osc.frequency.linearRampToValueAtTime(110, now + 0.12);
  gain.gain.setValueAtTime(0.22, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
  osc.start(now);
  osc.stop(now + 0.12);`,

    pop: `osc.type = "sine";
  osc.frequency.setValueAtTime(400, now);
  osc.frequency.exponentialRampToValueAtTime(900, now + 0.03);
  gain.gain.setValueAtTime(0.3, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.03);
  osc.start(now);
  osc.stop(now + 0.03);`,

    delete: `osc.type = "sine";
  osc.frequency.setValueAtTime(600, now);
  osc.frequency.linearRampToValueAtTime(150, now + 0.1);
  gain.gain.setValueAtTime(0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
  osc.start(now);
  osc.stop(now + 0.1);`,

    lock: `osc.type = "square";
  osc.frequency.setValueAtTime(1200, now);
  osc.frequency.exponentialRampToValueAtTime(300, now + 0.02);
  gain.gain.setValueAtTime(0.14, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
  osc.start(now);
  osc.stop(now + 0.025);`,

    glass: `osc.type = "sine";
  osc.frequency.setValueAtTime(1800, now);
  osc.frequency.exponentialRampToValueAtTime(1400, now + 0.08);
  gain.gain.setValueAtTime(0.18, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
  osc.start(now);
  osc.stop(now + 0.08);`,

    levelup: `osc.type = "triangle";
  osc.frequency.setValueAtTime(440, now); // A4
  osc.frequency.setValueAtTime(554.37, now + 0.06); // C#5
  osc.frequency.setValueAtTime(659.25, now + 0.12); // E5
  gain.gain.setValueAtTime(0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);
  osc.start(now);
  osc.stop(now + 0.28);`,

    swipe: `osc.type = "sawtooth";
  osc.frequency.setValueAtTime(250, now);
  osc.frequency.exponentialRampToValueAtTime(1500, now + 0.07);
  gain.gain.setValueAtTime(0.1, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.07);
  osc.start(now);
  osc.stop(now + 0.07);`,

    hover: `osc.type = "sine";
  osc.frequency.setValueAtTime(1200, now);
  gain.gain.setValueAtTime(0.05, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);
  osc.start(now);
  osc.stop(now + 0.015);`,

    bell: `osc.type = "sine";
  osc.frequency.setValueAtTime(987.77, now); // B5
  gain.gain.setValueAtTime(0.16, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
  osc.start(now);
  osc.stop(now + 0.45);`,

    shutter: `osc.type = "square";
  osc.frequency.setValueAtTime(800, now);
  osc.frequency.setValueAtTime(400, now + 0.02);
  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
  osc.start(now);
  osc.stop(now + 0.05);`,

    expand: `osc.type = "triangle";
  osc.frequency.setValueAtTime(220, now);
  osc.frequency.linearRampToValueAtTime(440, now + 0.09);
  gain.gain.setValueAtTime(0.14, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.09);
  osc.start(now);
  osc.stop(now + 0.09);`,

    drop: `osc.type = "sine";
  osc.frequency.setValueAtTime(1400, now);
  osc.frequency.exponentialRampToValueAtTime(600, now + 0.05);
  gain.gain.setValueAtTime(0.18, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
  osc.start(now);
  osc.stop(now + 0.05);`
  };

  const bodyCode = snippets[soundType] || snippets.click;

  return `// Pure Web Audio API Synthesizer (Zero external .mp3 files needed)
export const play${functionName}Sound = () => {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  ${bodyCode}
};`;
};

// 15 Premium Unique Sound Definitions
export const INITIAL_SOUNDS = [
  {
    id: "click",
    name: "Tactile Click",
    category: "Feedback",
    desc: "Soft physical switch click response for main buttons, menu items, and tab navigation.",
    iconKey: "click",
    type: "click",
    duration: "40ms",
    wave: "Sine"
  },
  {
    id: "toggle",
    name: "Toggle Pop",
    category: "Controls",
    desc: "Snap pitch response for switch toggles, radio buttons, and accordion expands.",
    iconKey: "toggle",
    type: "toggle",
    duration: "60ms",
    wave: "Triangle"
  },
  {
    id: "success",
    name: "Chime Success",
    category: "Notifications",
    desc: "Harmonic two-frequency trigger for successful forms, payments, and save states.",
    iconKey: "success",
    type: "success",
    duration: "250ms",
    wave: "Sine Chord"
  },
  {
    id: "error",
    name: "Alert Thud",
    category: "Alerts",
    desc: "Low-frequency warning pulse for invalid inputs, failed operations, or destructive actions.",
    iconKey: "error",
    type: "error",
    duration: "120ms",
    wave: "Sawtooth"
  },
  {
    id: "pop",
    name: "Micro Bubble",
    category: "Feedback",
    desc: "Crisp acoustic pop effect designed for tooltip triggers, badge count updates, and tags.",
    iconKey: "pop",
    type: "pop",
    duration: "30ms",
    wave: "Fast Sine"
  },
  {
    id: "delete",
    name: "Trash Sweep",
    category: "Actions",
    desc: "Descending frequency sweep for clearing tasks, deleting records, or dropping cards.",
    iconKey: "delete",
    type: "delete",
    duration: "100ms",
    wave: "Linear Sine"
  },
  {
    id: "lock",
    name: "Mechanical Lock",
    category: "Controls",
    desc: "Sharp square-wave latch effect for privacy settings, password locks, and permissions.",
    iconKey: "lock",
    type: "lock",
    duration: "25ms",
    wave: "Square Snap"
  },
  {
    id: "glass",
    name: "Glass Tap",
    category: "Feedback",
    desc: "High-frequency resonant ping for pinned items, bookmarking, or quick selections.",
    iconKey: "glass",
    type: "glass",
    duration: "80ms",
    wave: "Resonant Sine"
  },
  {
    id: "levelup",
    name: "Achievement Arp",
    category: "Notifications",
    desc: "Rising 3-note arpeggio chord trigger for milestones, badge unlocks, and level-ups.",
    iconKey: "levelup",
    type: "levelup",
    duration: "280ms",
    wave: "Arpeggio"
  },
  {
    id: "swipe",
    name: "Cyber Swipe",
    category: "Actions",
    desc: "Fast pitch slide designed for carousel navigation, tab switching, and card swiping.",
    iconKey: "swipe",
    type: "swipe",
    duration: "70ms",
    wave: "Ramp Saw"
  },
  {
    id: "hover",
    name: "Subtle Hover",
    category: "Feedback",
    desc: "Ultra-quiet micro tick intended for desktop hover states without causing audio fatigue.",
    iconKey: "hover",
    type: "hover",
    duration: "15ms",
    wave: "Micro Pulse"
  },
  {
    id: "bell",
    name: "Warm Bell",
    category: "Notifications",
    desc: "Smooth decaying single-tone chime ideal for inbox messages and push alerts.",
    iconKey: "bell",
    type: "bell",
    duration: "450ms",
    wave: "Decay Sine"
  },
  {
    id: "shutter",
    name: "Snap Shutter",
    category: "Actions",
    desc: "Dual-pulse crisp click suitable for screenshots, upload triggers, and camera buttons.",
    iconKey: "shutter",
    type: "shutter",
    duration: "50ms",
    wave: "Dual Square"
  },
  {
    id: "expand",
    name: "Drawer Swell",
    category: "Controls",
    desc: "Low-to-mid frequency swell effect for expanding sidebars, modals, and accordion menus.",
    iconKey: "expand",
    type: "expand",
    duration: "90ms",
    wave: "Linear Triangle"
  },
  {
    id: "drop",
    name: "Liquid Drop",
    category: "Actions",
    desc: "Fluid pitch-drop drip effect tailored for drag-and-drop file upload zones.",
    iconKey: "drop",
    type: "drop",
    duration: "50ms",
    wave: "Fluid Pitch"
  }
];