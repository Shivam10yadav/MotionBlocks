// ============================================================================
// High-Fidelity Web Audio Synthesizer Engine & WAV Exporter
// ============================================================================

export const CATEGORY_ORDER = ["Feedback", "Controls", "Notifications", "Alerts", "Actions"];

export const SOUND_DEFS = [
  // ---------------------------------------------------------------- FEEDBACK
  {
    id: "click",
    name: "Tactile Switch",
    category: "Feedback",
    iconKey: "click",
    wave: "Transient Snap",
    duration: "25ms",
    desc: "Crisp mechanical keypress with ultra-fast highpass noise transient and damped low sine thud.",
    voices: [
      {
        type: "noise",
        delay: 0,
        stop: 0.012,
        filterType: "highpass",
        filterQ: 3.5,
        filterFreq: [[0, "set", 4500], [0.012, "exp", 1200]],
        gain: [[0, "set", 1.0, true], [0.012, "exp", 0.001, false]]
      },
      {
        type: "osc",
        osc: "sine",
        delay: 0.002,
        stop: 0.025,
        freq: [[0, "set", 280], [0.025, "exp", 60]],
        gain: [[0, "set", 0.8, true], [0.025, "exp", 0.001, false]]
      }
    ]
  },
  {
    id: "pop",
    name: "Bubble Pop",
    category: "Feedback",
    iconKey: "pop",
    wave: "Pitch Sweep",
    duration: "45ms",
    desc: "Organic fluid pop made with an exponential pitch sweep and acoustic resonance.",
    voices: [
      {
        type: "osc",
        osc: "sine",
        delay: 0,
        stop: 0.045,
        freq: [[0, "set", 220], [0.02, "exp", 1280], [0.045, "exp", 400]],
        gain: [[0, "set", 1.2, true], [0.045, "exp", 0.001, false]]
      },
      {
        type: "noise",
        delay: 0,
        stop: 0.015,
        filterType: "bandpass",
        filterQ: 5.0,
        filterFreq: [[0, "set", 2400]],
        gain: [[0, "set", 0.4, true], [0.015, "exp", 0.001, false]]
      }
    ]
  },
  {
    id: "glass",
    name: "Crystal Glass",
    category: "Feedback",
    iconKey: "glass",
    wave: "Resonant Ring",
    duration: "280ms",
    desc: "High-Q metallic glass chime using non-harmonic overtone ratios.",
    voices: [
      {
        type: "osc",
        osc: "sine",
        delay: 0,
        stop: 0.28,
        freq: [[0, "set", 1760]],
        gain: [[0, "set", 0.7, true], [0.28, "exp", 0.0001, false]]
      },
      {
        type: "osc",
        osc: "sine",
        delay: 0,
        stop: 0.2,
        freq: [[0, "set", 2793.83]],
        gain: [[0, "set", 0.35, true], [0.2, "exp", 0.0001, false]]
      },
      {
        type: "noise",
        delay: 0,
        stop: 0.008,
        filterType: "highpass",
        filterFreq: [[0, "set", 7000]],
        gain: [[0, "set", 0.5, true], [0.008, "exp", 0.001, false]]
      }
    ]
  },
  {
    id: "hover",
    name: "Velvet Tick",
    category: "Feedback",
    iconKey: "hover",
    wave: "Muted Tap",
    duration: "10ms",
    desc: "Non-intrusive soft tick designed for high-frequency cursor interactions.",
    voices: [
      {
        type: "osc",
        osc: "triangle",
        delay: 0,
        stop: 0.01,
        freq: [[0, "set", 1200], [0.01, "exp", 400]],
        gain: [[0, "set", 0.18, true], [0.01, "exp", 0.001, false]]
      }
    ]
  },
  {
    id: "favorite",
    name: "Favorite",
    category: "Feedback",
    iconKey: "favorite",
    wave: "Warm Pulse",
    duration: "120ms",
    desc: "Warm, rounded double pulse for liking or favoriting an item.",
    voices: [
      { type: "osc", osc: "sine", delay: 0, stop: 0.06, freq: [[0, "set", 600]], gain: [[0, "set", 0.55, true], [0.06, "exp", 0.0001, false]] },
      { type: "osc", osc: "sine", delay: 0.05, stop: 0.12, freq: [[0, "set", 900]], gain: [[0, "set", 0.65, true], [0.12, "exp", 0.0001, false]] }
    ]
  },

  // ---------------------------------------------------------------- CONTROLS
  {
    id: "toggle",
    name: "Toggle Switch",
    category: "Controls",
    iconKey: "toggle",
    wave: "Dual Micro Snap",
    duration: "35ms",
    desc: "Simulates physical spring mechanics with two distinct micro-clicks.",
    voices: [
      {
        type: "noise",
        delay: 0,
        stop: 0.008,
        filterType: "bandpass",
        filterQ: 2.0,
        filterFreq: [[0, "set", 3200]],
        gain: [[0, "set", 0.7, true], [0.008, "exp", 0.001, false]]
      },
      {
        type: "osc",
        osc: "sine",
        delay: 0.012,
        stop: 0.035,
        freq: [[0, "set", 400], [0.035, "exp", 1200]],
        gain: [[0, "set", 0.9, true], [0.035, "exp", 0.001, false]]
      }
    ]
  },
  {
    id: "lock",
    name: "Heavy Deadbolt",
    category: "Controls",
    iconKey: "lock",
    wave: "Metallic Thud",
    duration: "80ms",
    desc: "Weighted mechanical locking latch with low-end resonance and metallic friction.",
    voices: [
      {
        type: "osc",
        osc: "triangle",
        delay: 0,
        stop: 0.08,
        freq: [[0, "set", 160], [0.08, "exp", 40]],
        gain: [[0, "set", 1.2, true], [0.08, "exp", 0.001, false]]
      },
      {
        type: "noise",
        delay: 0,
        stop: 0.025,
        filterType: "bandpass",
        filterQ: 1.5,
        filterFreq: [[0, "set", 1800]],
        gain: [[0, "set", 0.8, true], [0.025, "exp", 0.001, false]]
      }
    ]
  },
  {
    id: "slider",
    name: "Notch Tick",
    category: "Controls",
    iconKey: "slider",
    wave: "Highpass Click",
    duration: "6ms",
    desc: "Ultra-precise acoustic detent tick for sliders and rotary dials.",
    voices: [
      {
        type: "noise",
        delay: 0,
        stop: 0.006,
        filterType: "highpass",
        filterFreq: [[0, "set", 5500]],
        gain: [[0, "set", 0.5, true], [0.006, "exp", 0.001, false]]
      }
    ]
  },
  {
    id: "expand",
    name: "Expand",
    category: "Controls",
    iconKey: "expand",
    wave: "Soft Rise",
    duration: "90ms",
    desc: "Smooth upward sweep for panels, accordions, or menus opening.",
    voices: [
      { type: "osc", osc: "sine", delay: 0, stop: 0.09, freq: [[0, "set", 300], [0.09, "exp", 900]], gain: [[0, "set", 0.5, true], [0.09, "exp", 0.001, false]] }
    ]
  },
  {
    id: "search",
    name: "Search",
    category: "Controls",
    iconKey: "search",
    wave: "Soft Blip",
    duration: "40ms",
    desc: "Minimal blip acknowledging a search field focus or query.",
    voices: [
      { type: "osc", osc: "sine", delay: 0, stop: 0.04, freq: [[0, "set", 1000], [0.04, "exp", 1400]], gain: [[0, "set", 0.4, true], [0.04, "exp", 0.001, false]] }
    ]
  },
  {
    id: "tabswitch",
    name: "Tab Switch",
    category: "Controls",
    iconKey: "tabswitch",
    wave: "Soft Click",
    duration: "40ms",
    desc: "Light click for switching between tabs or segments.",
    voices: [
      { type: "osc", osc: "triangle", delay: 0, stop: 0.04, freq: [[0, "set", 500], [0.04, "exp", 750]], gain: [[0, "set", 0.4, true], [0.04, "exp", 0.001, false]] }
    ]
  },
  {
    id: "poweron",
    name: "Power On",
    category: "Controls",
    iconKey: "poweron",
    wave: "Rising Hum",
    duration: "300ms",
    desc: "Warm rising sweep signaling a device or mode turning on.",
    voices: [
      { type: "osc", osc: "sine", delay: 0, stop: 0.3, freq: [[0, "set", 120], [0.3, "exp", 480]], gain: [[0, "set", 0.7, true], [0.3, "exp", 0.0001, false]] }
    ]
  },
  {
    id: "poweroff",
    name: "Power Off",
    category: "Controls",
    iconKey: "poweroff",
    wave: "Falling Hum",
    duration: "300ms",
    desc: "Warm falling sweep signaling a device or mode turning off.",
    voices: [
      { type: "osc", osc: "sine", delay: 0, stop: 0.3, freq: [[0, "set", 480], [0.3, "exp", 100]], gain: [[0, "set", 0.7, true], [0.3, "exp", 0.0001, false]] }
    ]
  },

  // ------------------------------------------------------------ NOTIFICATIONS
  {
    id: "success",
    name: "Glass Marimba",
    category: "Notifications",
    iconKey: "success",
    wave: "Major Chord",
    duration: "400ms",
    desc: "Arpeggiated C Major chord with realistic acoustic decay.",
    voices: [
      { type: "osc", osc: "sine", delay: 0, stop: 0.35, freq: [[0, "set", 523.25]], gain: [[0, "set", 0.8, true], [0.35, "exp", 0.0001, false]] },
      { type: "osc", osc: "sine", delay: 0.04, stop: 0.35, freq: [[0, "set", 659.25]], gain: [[0, "set", 0.7, true], [0.35, "exp", 0.0001, false]] },
      { type: "osc", osc: "sine", delay: 0.08, stop: 0.35, freq: [[0, "set", 783.99]], gain: [[0, "set", 0.6, true], [0.35, "exp", 0.0001, false]] },
      { type: "osc", osc: "sine", delay: 0.12, stop: 0.4, freq: [[0, "set", 1046.50]], gain: [[0, "set", 0.8, true], [0.4, "exp", 0.0001, false]] }
    ]
  },
  {
    id: "bell",
    name: "Tibetan Bell",
    category: "Notifications",
    iconKey: "bell",
    wave: "Harmonic Ring",
    duration: "600ms",
    desc: "Warm fundamental tone layered with complex resonant upper harmonics.",
    voices: [
      { type: "osc", osc: "sine", delay: 0, stop: 0.6, freq: [[0, "set", 659.25]], gain: [[0, "set", 0.9, true], [0.6, "exp", 0.0001, false]] },
      { type: "osc", osc: "sine", delay: 0, stop: 0.4, freq: [[0, "set", 1318.51]], gain: [[0, "set", 0.3, true], [0.4, "exp", 0.0001, false]] }
    ]
  },
  {
    id: "message",
    name: "Message",
    category: "Notifications",
    iconKey: "message",
    wave: "Soft Ping",
    duration: "180ms",
    desc: "Warm two-note chime for incoming chat messages.",
    voices: [
      { type: "osc", osc: "sine", delay: 0, stop: 0.14, freq: [[0, "set", 880]], gain: [[0, "set", 0.6, true], [0.14, "exp", 0.0001, false]] },
      { type: "osc", osc: "sine", delay: 0.06, stop: 0.18, freq: [[0, "set", 1108.73]], gain: [[0, "set", 0.5, true], [0.18, "exp", 0.0001, false]] }
    ]
  },
  {
    id: "mention",
    name: "Mention",
    category: "Notifications",
    iconKey: "mention",
    wave: "Bright Pluck",
    duration: "150ms",
    desc: "Crisp attention-getting pluck for mentions and tags.",
    voices: [
      { type: "osc", osc: "triangle", delay: 0, stop: 0.15, freq: [[0, "set", 1318.51], [0.15, "exp", 1760]], gain: [[0, "set", 0.55, true], [0.15, "exp", 0.0001, false]] }
    ]
  },
  {
    id: "mail",
    name: "Mail",
    category: "Notifications",
    iconKey: "mail",
    wave: "Send Chime",
    duration: "220ms",
    desc: "Light whoosh followed by a soft chime for email arrival or send.",
    voices: [
      { type: "noise", delay: 0, stop: 0.06, filterType: "bandpass", filterQ: 1.0, filterFreq: [[0, "set", 600], [0.06, "exp", 2200]], gain: [[0, "set", 0.35, true], [0.06, "exp", 0.001, false]] },
      { type: "osc", osc: "sine", delay: 0.07, stop: 0.22, freq: [[0, "set", 987.77]], gain: [[0, "set", 0.6, true], [0.22, "exp", 0.0001, false]] }
    ]
  },
  {
    id: "reminder",
    name: "Reminder",
    category: "Notifications",
    iconKey: "reminder",
    wave: "Double Tap",
    duration: "300ms",
    desc: "Gentle repeated tap to nudge attention without feeling urgent.",
    voices: [
      { type: "osc", osc: "sine", delay: 0, stop: 0.15, freq: [[0, "set", 740]], gain: [[0, "set", 0.55, true], [0.15, "exp", 0.0001, false]] },
      { type: "osc", osc: "sine", delay: 0.18, stop: 0.3, freq: [[0, "set", 740]], gain: [[0, "set", 0.55, true], [0.3, "exp", 0.0001, false]] }
    ]
  },
  {
    id: "coin",
    name: "Coin",
    category: "Notifications",
    iconKey: "coin",
    wave: "Collect Tone",
    duration: "150ms",
    desc: "Bright two-tone pickup for points, credits, or rewards.",
    voices: [
      { type: "osc", osc: "square", delay: 0, stop: 0.06, freq: [[0, "set", 988]], gain: [[0, "set", 0.22, true], [0.06, "exp", 0.0001, false]] },
      { type: "osc", osc: "square", delay: 0.05, stop: 0.15, freq: [[0, "set", 1568]], gain: [[0, "set", 0.28, true], [0.15, "exp", 0.0001, false]] }
    ]
  },
  {
    id: "combo",
    name: "Combo",
    category: "Notifications",
    iconKey: "combo",
    wave: "Rising Streak",
    duration: "250ms",
    desc: "Quick ascending run celebrating a streak or combo milestone.",
    voices: [
      { type: "osc", osc: "triangle", delay: 0, stop: 0.08, freq: [[0, "set", 600]], gain: [[0, "set", 0.5, true], [0.08, "exp", 0.001, false]] },
      { type: "osc", osc: "triangle", delay: 0.06, stop: 0.16, freq: [[0, "set", 760]], gain: [[0, "set", 0.5, true], [0.16, "exp", 0.001, false]] },
      { type: "osc", osc: "triangle", delay: 0.12, stop: 0.25, freq: [[0, "set", 980]], gain: [[0, "set", 0.55, true], [0.25, "exp", 0.0001, false]] }
    ]
  },
  {
    id: "connect",
    name: "Connect",
    category: "Notifications",
    iconKey: "connect",
    wave: "Ascending Chime",
    duration: "180ms",
    desc: "Two-tone rising chime confirming a successful connection.",
    voices: [
      { type: "osc", osc: "sine", delay: 0, stop: 0.09, freq: [[0, "set", 523.25]], gain: [[0, "set", 0.55, true], [0.09, "exp", 0.0001, false]] },
      { type: "osc", osc: "sine", delay: 0.07, stop: 0.18, freq: [[0, "set", 783.99]], gain: [[0, "set", 0.6, true], [0.18, "exp", 0.0001, false]] }
    ]
  },
  {
    id: "levelup",
    name: "Level Up",
    category: "Notifications",
    iconKey: "levelup",
    wave: "Rising Arpeggio",
    duration: "350ms",
    desc: "Playful ascending run celebrating progress or an unlocked reward.",
    voices: [
      { type: "osc", osc: "triangle", delay: 0, stop: 0.12, freq: [[0, "set", 523.25]], gain: [[0, "set", 0.55, true], [0.12, "exp", 0.001, false]] },
      { type: "osc", osc: "triangle", delay: 0.08, stop: 0.2, freq: [[0, "set", 659.25]], gain: [[0, "set", 0.55, true], [0.2, "exp", 0.001, false]] },
      { type: "osc", osc: "triangle", delay: 0.16, stop: 0.28, freq: [[0, "set", 783.99]], gain: [[0, "set", 0.55, true], [0.28, "exp", 0.001, false]] },
      { type: "osc", osc: "sine", delay: 0.24, stop: 0.35, freq: [[0, "set", 1046.5]], gain: [[0, "set", 0.65, true], [0.35, "exp", 0.0001, false]] }
    ]
  },
  {
    id: "ding",
    name: "Ding",
    category: "Notifications",
    iconKey: "ding",
    wave: "Clean Bell",
    duration: "200ms",
    desc: "Single clean bell tone for simple, neutral notifications.",
    voices: [
      { type: "osc", osc: "sine", delay: 0, stop: 0.2, freq: [[0, "set", 1046.5]], gain: [[0, "set", 0.6, true], [0.2, "exp", 0.0001, false]] }
    ]
  },

  // ------------------------------------------------------------------ ALERTS
  {
    id: "error",
    name: "Dissonant Thud",
    category: "Alerts",
    iconKey: "error",
    wave: "Low Detune",
    duration: "180ms",
    desc: "Low frequency interval beat creating instant acoustic dissonance.",
    voices: [
      { type: "osc", osc: "sawtooth", delay: 0, stop: 0.18, freq: [[0, "set", 130], [0.18, "exp", 40]], gain: [[0, "set", 1.0, true], [0.18, "exp", 0.001, false]] },
      { type: "osc", osc: "sawtooth", delay: 0, stop: 0.18, freq: [[0, "set", 138.59], [0.18, "exp", 42]], gain: [[0, "set", 0.8, true], [0.18, "exp", 0.001, false]] }
    ]
  },
  {
    id: "fail",
    name: "Fail",
    category: "Alerts",
    iconKey: "fail",
    wave: "Soft Descend",
    duration: "200ms",
    desc: "Gentle descending tone signaling an unsuccessful action.",
    voices: [
      { type: "osc", osc: "sawtooth", delay: 0, stop: 0.2, freq: [[0, "set", 300], [0.2, "exp", 120]], gain: [[0, "set", 0.45, true], [0.2, "exp", 0.001, false]] }
    ]
  },
  {
    id: "disconnect",
    name: "Disconnect",
    category: "Alerts",
    iconKey: "disconnect",
    wave: "Descending Chime",
    duration: "180ms",
    desc: "Two-tone falling chime indicating a connection was lost.",
    voices: [
      { type: "osc", osc: "sine", delay: 0, stop: 0.09, freq: [[0, "set", 783.99]], gain: [[0, "set", 0.5, true], [0.09, "exp", 0.0001, false]] },
      { type: "osc", osc: "sine", delay: 0.07, stop: 0.18, freq: [[0, "set", 523.25]], gain: [[0, "set", 0.55, true], [0.18, "exp", 0.0001, false]] }
    ]
  },
  {
    id: "warning",
    name: "Warning",
    category: "Alerts",
    iconKey: "warning",
    wave: "Double Beep",
    duration: "150ms",
    desc: "Two short soft beeps calling attention without feeling harsh.",
    voices: [
      { type: "osc", osc: "square", delay: 0, stop: 0.06, freq: [[0, "set", 480]], gain: [[0, "set", 0.28, true], [0.06, "exp", 0.001, false]] },
      { type: "osc", osc: "square", delay: 0.08, stop: 0.15, freq: [[0, "set", 480]], gain: [[0, "set", 0.28, true], [0.15, "exp", 0.001, false]] }
    ]
  },

  // ------------------------------------------------------------------ ACTIONS
  {
    id: "swipe",
    name: "Acoustic Whoosh",
    category: "Actions",
    iconKey: "swipe",
    wave: "Air Swell",
    duration: "90ms",
    desc: "Realistic air movement sound for gesture navigation.",
    voices: [
      { type: "noise", delay: 0, stop: 0.09, filterType: "bandpass", filterQ: 1.2, filterFreq: [[0, "set", 400], [0.04, "set", 1800], [0.09, "exp", 200]], gain: [[0, "set", 0.8, true], [0.09, "exp", 0.001, false]] }
    ]
  },
  {
    id: "shutter",
    name: "DSLR Camera Snap",
    category: "Actions",
    iconKey: "shutter",
    wave: "Double Transient",
    duration: "40ms",
    desc: "Two fast mechanical clicks reproducing camera mirror lockup.",
    voices: [
      { type: "noise", delay: 0, stop: 0.012, filterType: "highpass", filterFreq: [[0, "set", 4000]], gain: [[0, "set", 0.9, true], [0.012, "exp", 0.001, false]] },
      { type: "noise", delay: 0.025, stop: 0.015, filterType: "bandpass", filterQ: 3.0, filterFreq: [[0, "set", 2200]], gain: [[0, "set", 0.7, true], [0.015, "exp", 0.001, false]] }
    ]
  },
  {
    id: "delete",
    name: "Delete",
    category: "Actions",
    iconKey: "delete",
    wave: "Soft Drop",
    duration: "70ms",
    desc: "Gentle descending thud confirming an item has been removed.",
    voices: [
      { type: "osc", osc: "sine", delay: 0, stop: 0.07, freq: [[0, "set", 320], [0.07, "exp", 90]], gain: [[0, "set", 0.85, true], [0.07, "exp", 0.001, false]] },
      { type: "noise", delay: 0, stop: 0.015, filterType: "highpass", filterFreq: [[0, "set", 3000]], gain: [[0, "set", 0.3, true], [0.015, "exp", 0.001, false]] }
    ]
  },
  {
    id: "drop",
    name: "Drop",
    category: "Actions",
    iconKey: "drop",
    wave: "Landing Thud",
    duration: "80ms",
    desc: "Soft padded landing sound for drag-and-drop interactions.",
    voices: [
      { type: "osc", osc: "sine", delay: 0, stop: 0.08, freq: [[0, "set", 200], [0.08, "exp", 55]], gain: [[0, "set", 1.0, true], [0.08, "exp", 0.001, false]] },
      { type: "noise", delay: 0, stop: 0.02, filterType: "lowpass", filterFreq: [[0, "set", 1200]], gain: [[0, "set", 0.3, true], [0.02, "exp", 0.001, false]] }
    ]
  },
  {
    id: "undo",
    name: "Undo",
    category: "Actions",
    iconKey: "undo",
    wave: "Reverse Sweep",
    duration: "60ms",
    desc: "Quick downward flick indicating an action was reversed.",
    voices: [
      { type: "osc", osc: "triangle", delay: 0, stop: 0.06, freq: [[0, "set", 700], [0.06, "exp", 300]], gain: [[0, "set", 0.5, true], [0.06, "exp", 0.001, false]] }
    ]
  },
  {
    id: "redo",
    name: "Redo",
    category: "Actions",
    iconKey: "redo",
    wave: "Forward Sweep",
    duration: "60ms",
    desc: "Quick upward flick indicating an action was reapplied.",
    voices: [
      { type: "osc", osc: "triangle", delay: 0, stop: 0.06, freq: [[0, "set", 300], [0.06, "exp", 700]], gain: [[0, "set", 0.5, true], [0.06, "exp", 0.001, false]] }
    ]
  },
  {
    id: "refresh",
    name: "Refresh",
    category: "Actions",
    iconKey: "refresh",
    wave: "Loop Sweep",
    duration: "150ms",
    desc: "Circular pitch sweep suggesting content reloading.",
    voices: [
      { type: "osc", osc: "sine", delay: 0, stop: 0.15, freq: [[0, "set", 400], [0.08, "exp", 900], [0.15, "exp", 400]], gain: [[0, "set", 0.5, true], [0.15, "exp", 0.001, false]] }
    ]
  },
  {
    id: "upload",
    name: "Upload",
    category: "Actions",
    iconKey: "upload",
    wave: "Rising Air",
    duration: "180ms",
    desc: "Airy upward motion representing a file heading out.",
    voices: [
      { type: "osc", osc: "sine", delay: 0, stop: 0.18, freq: [[0, "set", 300], [0.18, "exp", 1100]], gain: [[0, "set", 0.5, true], [0.18, "exp", 0.001, false]] },
      { type: "noise", delay: 0, stop: 0.1, filterType: "highpass", filterFreq: [[0, "set", 1500]], gain: [[0, "set", 0.2, true], [0.1, "exp", 0.001, false]] }
    ]
  },
  {
    id: "download",
    name: "Download",
    category: "Actions",
    iconKey: "download",
    wave: "Falling Air",
    duration: "180ms",
    desc: "Airy downward motion representing a file arriving.",
    voices: [
      { type: "osc", osc: "sine", delay: 0, stop: 0.18, freq: [[0, "set", 1100], [0.18, "exp", 300]], gain: [[0, "set", 0.5, true], [0.18, "exp", 0.001, false]] },
      { type: "noise", delay: 0, stop: 0.1, filterType: "highpass", filterFreq: [[0, "set", 1500]], gain: [[0, "set", 0.2, true], [0.1, "exp", 0.001, false]] }
    ]
  },
  {
    id: "save",
    name: "Save",
    category: "Actions",
    iconKey: "save",
    wave: "Confirm Tone",
    duration: "150ms",
    desc: "Reassuring two-tone confirmation that changes were stored.",
    voices: [
      { type: "osc", osc: "sine", delay: 0, stop: 0.08, freq: [[0, "set", 587.33]], gain: [[0, "set", 0.55, true], [0.08, "exp", 0.0001, false]] },
      { type: "osc", osc: "sine", delay: 0.07, stop: 0.15, freq: [[0, "set", 880]], gain: [[0, "set", 0.6, true], [0.15, "exp", 0.0001, false]] }
    ]
  },
  {
    id: "share",
    name: "Share",
    category: "Actions",
    iconKey: "share",
    wave: "Triple Ping",
    duration: "150ms",
    desc: "Bright ascending triple ping suggesting content going outward.",
    voices: [
      { type: "osc", osc: "sine", delay: 0, stop: 0.06, freq: [[0, "set", 700]], gain: [[0, "set", 0.4, true], [0.06, "exp", 0.0001, false]] },
      { type: "osc", osc: "sine", delay: 0.04, stop: 0.1, freq: [[0, "set", 950]], gain: [[0, "set", 0.4, true], [0.1, "exp", 0.0001, false]] },
      { type: "osc", osc: "sine", delay: 0.08, stop: 0.15, freq: [[0, "set", 1300]], gain: [[0, "set", 0.45, true], [0.15, "exp", 0.0001, false]] }
    ]
  },
  {
    id: "sync",
    name: "Sync",
    category: "Actions",
    iconKey: "sync",
    wave: "Tick Pair",
    duration: "120ms",
    desc: "Light paired ticks representing data syncing in the background.",
    voices: [
      { type: "osc", osc: "triangle", delay: 0, stop: 0.05, freq: [[0, "set", 600]], gain: [[0, "set", 0.32, true], [0.05, "exp", 0.001, false]] },
      { type: "osc", osc: "triangle", delay: 0.07, stop: 0.12, freq: [[0, "set", 600]], gain: [[0, "set", 0.32, true], [0.12, "exp", 0.001, false]] }
    ]
  }
];

// Alias mapped for UiSoundsPage.jsx
export const INITIAL_SOUNDS = SOUND_DEFS.map((s) => ({
  ...s,
  type: s.id
}));

export const totalStop = (def) => Math.max(...def.voices.map((v) => (v.delay || 0) + v.stop));

const createNoiseBuffer = (ctx, duration) => {
  const size = Math.max(1, Math.floor(ctx.sampleRate * duration));
  const buffer = ctx.createBuffer(1, size, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < size; i++) data[i] = Math.random() * 2 - 1;
  return buffer;
};

const applyAutomation = (param, points, startTime, pitchShift, isFreq) => {
  points.forEach(([t, kind, val]) => {
    const value = isFreq ? Math.max(val * pitchShift, 1) : val;
    const time = startTime + t;
    if (kind === "set") param.setValueAtTime(value, time);
    else if (kind === "exp") param.exponentialRampToValueAtTime(Math.max(value, 0.0001), time);
    else param.linearRampToValueAtTime(value, time);
  });
};

const applyGainAutomation = (gainParam, points, startTime, safeVol) => {
  points.forEach(([t, kind, val, scaled]) => {
    const value = Math.max(scaled ? val * safeVol : val, 0.0001);
    const time = startTime + t;
    if (kind === "set") gainParam.setValueAtTime(value, time);
    else if (kind === "exp") gainParam.exponentialRampToValueAtTime(value, time);
    else gainParam.linearRampToValueAtTime(value, time);
  });
};

// Play audio live in browser
export const playSoundEffect = (type, pitchShift = 1, volume = 0.2, externalCtx = null) => {
  try {
    const def = SOUND_DEFS.find((d) => d.id === type);
    if (!def) return;

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass && !externalCtx) return;

    const ctx = externalCtx || new AudioContextClass();
    const now = ctx.currentTime;
    const safeVol = Math.max(0.01, Math.min(volume, 0.5));

    def.voices.forEach((voice) => {
      const startTime = now + (voice.delay || 0);
      const gainNode = ctx.createGain();

      if (voice.type === "noise") {
        const src = ctx.createBufferSource();
        src.buffer = createNoiseBuffer(ctx, voice.stop);
        const filter = ctx.createBiquadFilter();
        filter.type = voice.filterType || "bandpass";
        filter.Q.value = voice.filterQ ?? 1;
        applyAutomation(filter.frequency, voice.filterFreq || [], startTime, pitchShift, true);
        src.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        applyGainAutomation(gainNode.gain, voice.gain || [], startTime, safeVol);
        src.start(startTime);
        src.stop(startTime + voice.stop);
      } else {
        const osc = ctx.createOscillator();
        osc.type = voice.osc;
        if (voice.detune) osc.detune.setValueAtTime(voice.detune, startTime);
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        applyAutomation(osc.frequency, voice.freq || [], startTime, pitchShift, true);
        applyGainAutomation(gainNode.gain, voice.gain || [], startTime, safeVol);
        osc.start(startTime);
        osc.stop(startTime + voice.stop);
      }
    });

    // For offline (export) contexts, the caller is responsible for calling
    // startRendering() once every voice above has been scheduled.
    return ctx;
  } catch (e) {
    console.warn("AudioContext error:", e);
    return null;
  }
};

// Returns standard JavaScript code snippet for drawer view
export const getJsCodeSnippet = (type) => {
  const sound = SOUND_DEFS.find((s) => s.id === type);
  if (!sound) return `// Sound effect '${type}' not found`;

  return `// Native Web Audio API implementation for '${sound.name}'
const play${sound.id.charAt(0).toUpperCase() + sound.id.slice(1)} = () => {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const now = ctx.currentTime;
  
  // Synthesizer voice configuration
  ${JSON.stringify(sound.voices, null, 2)}
};`;
};

// ----------------------------------------------------------------------------
// WAV EXPORT
//
// Fix notes: the previous implementation used a *hard-coded* 0.5s render
// window for every sound. Any sound whose envelope actually finishes later
// than 0.5s (e.g. "bell" at 600ms) got hard-cut mid-decay, which produced a
// file that some media players/OSes refuse to play cleanly (the buffer ends
// on a loud, non-zero sample instead of silence). This version always sizes
// the render window from the sound's own definition (`totalStop`), adds a
// short silent tail so every envelope fully reaches zero before the buffer
// ends, and falls back to `webkitOfflineAudioContext` for older Safari.
// ----------------------------------------------------------------------------

// Convert AudioBuffer to 16-bit PCM WAV Blob
const bufferToWav = (buffer) => {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const format = 1;
  const bitDepth = 16;
  const bytesPerSample = bitDepth / 8;
  const blockAlign = numChannels * bytesPerSample;
  const dataSize = buffer.length * blockAlign;
  const headerSize = 44;
  const arrayBuffer = new ArrayBuffer(headerSize + dataSize);
  const view = new DataView(arrayBuffer);

  const writeString = (offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, format, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitDepth, true);
  writeString(36, 'data');
  view.setUint32(40, dataSize, true);

  let offset = 44;
  for (let i = 0; i < buffer.length; i++) {
    for (let channel = 0; channel < numChannels; channel++) {
      let sample = buffer.getChannelData(channel)[i];
      sample = Math.max(-1, Math.min(1, sample));
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
      offset += 2;
    }
  }

  return new Blob([arrayBuffer], { type: 'audio/wav' });
};

// Render audio offline and trigger browser WAV download
export const downloadSoundAsWav = async (soundId) => {
  try {
    const def = SOUND_DEFS.find((d) => d.id === soundId);
    if (!def) return;

    const OfflineAudioContextClass = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    if (!OfflineAudioContextClass) {
      console.warn("OfflineAudioContext is not supported in this browser.");
      return;
    }

    const sampleRate = 44100;
    // Always derive the render length from the sound itself (never hard-code
    // it), plus a small silent tail so exponential decays fully settle to
    // silence instead of being clipped mid-ramp.
    const duration = totalStop(def) + 0.15;
    const offlineCtx = new OfflineAudioContextClass(1, Math.ceil(sampleRate * duration), sampleRate);

    playSoundEffect(soundId, 1, 0.2, offlineCtx);

    const renderedBuffer = await offlineCtx.startRendering();
    const wavBlob = bufferToWav(renderedBuffer);

    const url = URL.createObjectURL(wavBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${def.id}.wav`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // Revoke slightly after click so the download has time to start in every browser.
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch (e) {
    console.error("Failed to export WAV:", e);
  }
};