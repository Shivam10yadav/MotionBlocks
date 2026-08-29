// ============================================================================
// High-Fidelity Web Audio Synthesizer Engine
// Modern UI Audio Design featuring Dynamic Filtering, ADSR Envelopes,
// Resonant Modal Synthesis, and Micro-Transient Layers.
// ============================================================================

export const SOUND_DEFS = [
  // ---------------------------------------------------------------- FEEDBACK
  {
    id: "click",
    name: "Tactile Switch",
    category: "Feedback",
    iconKey: "click",
    wave: "Transient Snap",
    desc: "Crisp tactile mechanical keypress with ultra-fast highpass noise transient and damped low sine thud.",
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
    wave: "Acoustic Pitch Sweep",
    desc: "Organic fluid pop made with an exponential fast pitch sweep and a mid-register acoustic resonance.",
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
    wave: "Resonant Harmony",
    desc: "High-Q metallic glass chime using non-harmonic overtone ratios.",
    voices: [
      {
        type: "osc",
        osc: "sine",
        delay: 0,
        stop: 0.28,
        freq: [[0, "set", 1760]], // A6
        gain: [[0, "set", 0.7, true], [0.28, "exp", 0.0001, false]]
      },
      {
        type: "osc",
        osc: "sine",
        delay: 0,
        stop: 0.2,
        freq: [[0, "set", 2793.83]], // C#7 (Major 3rd overtone)
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
    wave: "Filtered Soft Tap",
    desc: "Non-intrusive muted woodblock tick designed for high-frequency cursor interactions.",
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
    id: "search",
    name: "Radar Sweep",
    category: "Feedback",
    iconKey: "search",
    wave: "Sweeping Bandpass",
    desc: "Sci-fi radar pulse created with filter movement across smooth triangle waves.",
    voices: [
      {
        type: "osc",
        osc: "sine",
        delay: 0,
        stop: 0.09,
        freq: [[0, "set", 440], [0.09, "exp", 1320]],
        gain: [[0, "set", 0.6, true], [0.09, "exp", 0.001, false]]
      },
      {
        type: "noise",
        delay: 0,
        stop: 0.09,
        filterType: "bandpass",
        filterQ: 4.0,
        filterFreq: [[0, "set", 600], [0.09, "exp", 2800]],
        gain: [[0, "set", 0.3, true], [0.09, "exp", 0.001, false]]
      }
    ]
  },
  {
    id: "favorite",
    name: "Star Sparkle",
    category: "Feedback",
    iconKey: "favorite",
    wave: "Ascending Arp",
    desc: "Bright shimmering triad arpeggio (D Major) with high-frequency noise sparkle.",
    voices: [
      {
        type: "osc",
        osc: "sine",
        delay: 0,
        stop: 0.22,
        freq: [[0, "set", 587.33], [0.04, "set", 739.99], [0.08, "set", 880], [0.12, "set", 1174.66]],
        gain: [[0, "set", 0.8, true], [0.22, "exp", 0.001, false]]
      },
      {
        type: "noise",
        delay: 0.12,
        stop: 0.08,
        filterType: "highpass",
        filterFreq: [[0, "set", 6500]],
        gain: [[0, "set", 0.4, true], [0.08, "exp", 0.001, false]]
      }
    ]
  },

  // ---------------------------------------------------------------- CONTROLS
  {
    id: "toggle",
    name: "iOS Toggle Switch",
    category: "Controls",
    iconKey: "toggle",
    wave: "Dual Micro Snap",
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
    wave: "Sub Metallic Impact",
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
      },
      {
        type: "osc",
        osc: "square",
        delay: 0.02,
        stop: 0.03,
        freq: [[0, "set", 800], [0.03, "exp", 200]],
        gain: [[0, "set", 0.4, true], [0.03, "exp", 0.001, false]]
      }
    ]
  },
  {
    id: "expand",
    name: "Pneumatic Drawer",
    category: "Controls",
    iconKey: "expand",
    wave: "Air Pressure Swell",
    desc: "Smooth atmospheric slide sound simulating an opening pressurized panel.",
    voices: [
      {
        type: "noise",
        delay: 0,
        stop: 0.14,
        filterType: "lowpass",
        filterQ: 2.0,
        filterFreq: [[0, "set", 200], [0.14, "lin", 1200]],
        gain: [[0, "set", 0.01, true], [0.05, "lin", 0.5, true], [0.14, "exp", 0.001, false]]
      },
      {
        type: "osc",
        osc: "sine",
        delay: 0,
        stop: 0.14,
        freq: [[0, "set", 150], [0.14, "lin", 320]],
        gain: [[0, "set", 0.4, true], [0.14, "exp", 0.001, false]]
      }
    ]
  },
  {
    id: "refresh",
    name: "Ratchet Whir",
    category: "Controls",
    iconKey: "refresh",
    wave: "Frequency Modulation",
    desc: "Dynamic mechanical whir generated by fast pitch oscillation.",
    voices: [
      {
        type: "osc",
        osc: "sawtooth",
        delay: 0,
        stop: 0.12,
        freq: [
          [0, "set", 300],
          [0.03, "exp", 800],
          [0.06, "exp", 400],
          [0.09, "exp", 1000],
          [0.12, "exp", 200]
        ],
        gain: [[0, "set", 0.4, true], [0.12, "exp", 0.001, false]]
      }
    ]
  },
  {
    id: "save",
    name: "Rubber Stamp",
    category: "Controls",
    iconKey: "save",
    wave: "Weighted Thud",
    desc: "Satisfying rubberized stamp landing effect.",
    voices: [
      {
        type: "osc",
        osc: "sine",
        delay: 0,
        stop: 0.07,
        freq: [[0, "set", 320], [0.07, "exp", 50]],
        gain: [[0, "set", 1.2, true], [0.07, "exp", 0.001, false]]
      },
      {
        type: "noise",
        delay: 0,
        stop: 0.03,
        filterType: "lowpass",
        filterFreq: [[0, "set", 450]],
        gain: [[0, "set", 0.6, true], [0.03, "exp", 0.001, false]]
      }
    ]
  },
  {
    id: "tabswitch",
    name: "Card Flip",
    category: "Controls",
    iconKey: "tabswitch",
    wave: "Subtle Double Click",
    desc: "Light tactile double-tap reminiscent of shuffling index cards.",
    voices: [
      {
        type: "osc",
        osc: "sine",
        delay: 0,
        stop: 0.015,
        freq: [[0, "set", 800], [0.015, "exp", 300]],
        gain: [[0, "set", 0.5, true], [0.015, "exp", 0.001, false]]
      },
      {
        type: "osc",
        osc: "sine",
        delay: 0.02,
        stop: 0.015,
        freq: [[0, "set", 1200], [0.015, "exp", 400]],
        gain: [[0, "set", 0.4, true], [0.015, "exp", 0.001, false]]
      }
    ]
  },
  {
    id: "slider",
    name: "Notch Tick",
    category: "Controls",
    iconKey: "slider",
    wave: "Highpass Click",
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

  // ------------------------------------------------------------ NOTIFICATIONS
  {
    id: "success",
    name: "Glass Marimba Chime",
    category: "Notifications",
    iconKey: "success",
    wave: "Major Triad Stagger",
    desc: "Elegant C Major arpeggio (C5 - E5 - G5 - C6) with realistic acoustic decay.",
    voices: [
      { type: "osc", osc: "sine", delay: 0, stop: 0.35, freq: [[0, "set", 523.25]], gain: [[0, "set", 0.8, true], [0.35, "exp", 0.0001, false]] },
      { type: "osc", osc: "sine", delay: 0.04, stop: 0.35, freq: [[0, "set", 659.25]], gain: [[0, "set", 0.7, true], [0.35, "exp", 0.0001, false]] },
      { type: "osc", osc: "sine", delay: 0.08, stop: 0.35, freq: [[0, "set", 783.99]], gain: [[0, "set", 0.6, true], [0.35, "exp", 0.0001, false]] },
      { type: "osc", osc: "sine", delay: 0.12, stop: 0.4, freq: [[0, "set", 1046.50]], gain: [[0, "set", 0.8, true], [0.4, "exp", 0.0001, false]] }
    ]
  },
  {
    id: "bell",
    name: "Tibetan Bowl Bell",
    category: "Notifications",
    iconKey: "bell",
    wave: "Overtone Ring",
    desc: "Warm fundamental tone layered with complex resonant upper harmonics.",
    voices: [
      { type: "osc", osc: "sine", delay: 0, stop: 0.6, freq: [[0, "set", 659.25]], gain: [[0, "set", 0.9, true], [0.6, "exp", 0.0001, false]] },
      { type: "osc", osc: "sine", delay: 0, stop: 0.4, freq: [[0, "set", 1318.51]], gain: [[0, "set", 0.3, true], [0.4, "exp", 0.0001, false]] },
      { type: "osc", osc: "sine", delay: 0, stop: 0.25, freq: [[0, "set", 1977.77]], gain: [[0, "set", 0.15, true], [0.25, "exp", 0.0001, false]] }
    ]
  },
  {
    id: "message",
    name: "Soft Pop Droplet",
    category: "Notifications",
    iconKey: "message",
    wave: "Two-Tone Sine",
    desc: "Non-intrusive dual pitch pop for incoming chat messages.",
    voices: [
      { type: "osc", osc: "sine", delay: 0, stop: 0.06, freq: [[0, "set", 600], [0.06, "exp", 900]], gain: [[0, "set", 0.8, true], [0.06, "exp", 0.001, false]] },
      { type: "osc", osc: "sine", delay: 0.05, stop: 0.1, freq: [[0, "set", 1200], [0.1, "exp", 800]], gain: [[0, "set", 0.6, true], [0.1, "exp", 0.001, false]] }
    ]
  },
  {
    id: "mention",
    name: "Attention Pulse",
    category: "Notifications",
    iconKey: "mention",
    wave: "Filtered Pulse",
    desc: "Urgent two-note staccato ping.",
    voices: [
      { type: "osc", osc: "sine", delay: 0, stop: 0.05, freq: [[0, "set", 880]], gain: [[0, "set", 0.9, true], [0.05, "exp", 0.001, false]] },
      { type: "osc", osc: "sine", delay: 0.07, stop: 0.09, freq: [[0, "set", 1318.51]], gain: [[0, "set", 0.9, true], [0.09, "exp", 0.001, false]] }
    ]
  },
  {
    id: "mail",
    name: "Acoustic Envelope",
    category: "Notifications",
    iconKey: "mail",
    wave: "Warm Swell",
    desc: "Gentle pad swell for unread inbox delivery.",
    voices: [
      {
        type: "osc",
        osc: "sine",
        delay: 0,
        stop: 0.25,
        freq: [[0, "set", 440], [0.12, "exp", 659.25]],
        gain: [[0, "set", 0.01, true], [0.08, "lin", 0.8, true], [0.25, "exp", 0.001, false]]
      }
    ]
  },
  {
    id: "reminder",
    name: "Calendar Staccato",
    category: "Notifications",
    iconKey: "reminder",
    wave: "Triple Ping",
    desc: "Rhythmic triple ping sequence.",
    voices: [
      { type: "osc", osc: "sine", delay: 0, stop: 0.05, freq: [[0, "set", 1046.50]], gain: [[0, "set", 0.8, true], [0.05, "exp", 0.001, false]] },
      { type: "osc", osc: "sine", delay: 0.08, stop: 0.05, freq: [[0, "set", 1046.50]], gain: [[0, "set", 0.8, true], [0.05, "exp", 0.001, false]] },
      { type: "osc", osc: "sine", delay: 0.16, stop: 0.08, freq: [[0, "set", 1318.51]], gain: [[0, "set", 0.9, true], [0.08, "exp", 0.001, false]] }
    ]
  },
  {
    id: "ding",
    name: "Crystal Service Bell",
    category: "Notifications",
    iconKey: "ding",
    wave: "High Pure Tone",
    desc: "High clarity desk-bell ping.",
    voices: [
      { type: "osc", osc: "sine", delay: 0, stop: 0.4, freq: [[0, "set", 2093.00]], gain: [[0, "set", 0.8, true], [0.4, "exp", 0.0001, false]] }
    ]
  },

  // ------------------------------------------------------------------ ALERTS
  {
    id: "error",
    name: "Dissonant Thud",
    category: "Alerts",
    iconKey: "error",
    wave: "Detuned Low Frequency",
    desc: "Low frequency interval beat (Minor 2nd interval) creating instant acoustic dissonance.",
    voices: [
      { type: "osc", osc: "sawtooth", delay: 0, stop: 0.18, freq: [[0, "set", 130], [0.18, "exp", 40]], gain: [[0, "set", 1.0, true], [0.18, "exp", 0.001, false]] },
      { type: "osc", osc: "sawtooth", delay: 0, stop: 0.18, freq: [[0, "set", 138.59], [0.18, "exp", 42]], gain: [[0, "set", 0.8, true], [0.18, "exp", 0.001, false]] }
    ]
  },
  {
    id: "fail",
    name: "Buzz Rejection",
    category: "Alerts",
    iconKey: "fail",
    wave: "Lowpass Distortion",
    desc: "Harsh low-pass buzz for invalid inputs and denied permissions.",
    voices: [
      { type: "osc", osc: "square", delay: 0, stop: 0.2, freq: [[0, "set", 180], [0.2, "lin", 90]], gain: [[0, "set", 0.8, true], [0.2, "exp", 0.001, false]] },
      { type: "noise", delay: 0, stop: 0.1, filterType: "lowpass", filterFreq: [[0, "set", 600]], gain: [[0, "set", 0.5, true], [0.1, "exp", 0.001, false]] }
    ]
  },
  {
    id: "warning",
    name: "Industrial Hazard",
    category: "Alerts",
    iconKey: "warning", wave: "Alternating Square",
    desc: "Dual pitch siren pulse.",
    voices: [
      { type: "osc", osc: "square", delay: 0, stop: 0.22, freq: [[0, "set", 600], [0.07, "set", 450], [0.14, "set", 600]], gain: [[0, "set", 0.7, true], [0.22, "exp", 0.001, false]] }
    ]
  },

  // ------------------------------------------------------------------ ACTIONS
  {
    id: "delete",
    name: "Paper Shred Swish",
    category: "Actions",
    iconKey: "delete",
    wave: "Descending Noise",
    desc: "Downward air friction sweep simulating discarding an item.",
    voices: [
      { type: "noise", delay: 0, stop: 0.1, filterType: "bandpass", filterQ: 2.5, filterFreq: [[0, "set", 2800], [0.1, "exp", 300]], gain: [[0, "set", 0.7, true], [0.1, "exp", 0.001, false]] },
      { type: "osc", osc: "sine", delay: 0, stop: 0.08, freq: [[0, "set", 500], [0.08, "exp", 120]], gain: [[0, "set", 0.5, true], [0.08, "exp", 0.001, false]] }
    ]
  },
  {
    id: "swipe",
    name: "Acoustic Whoosh",
    category: "Actions",
    iconKey: "swipe",
    wave: "Filtered Noise Flutter",
    desc: "Realistic air movement sound for gesture navigation.",
    voices: [
      { type: "noise", delay: 0, stop: 0.09, filterType: "bandpass", filterQ: 1.2, filterFreq: [[0, "set", 400], [0.04, "set", 1800], [0.09, "exp", 200]], gain: [[0, "set", 0.8, true], [0.09, "exp", 0.001, false]] }
    ]
  },
  {
    id: "shutter",
    name: "DSLR Mechanical Shutter",
    category: "Actions",
    iconKey: "shutter",
    wave: "Micro Mechanical Snap",
    desc: "Two fast mechanical clicks reproducing camera mirror lockup.",
    voices: [
      { type: "noise", delay: 0, stop: 0.012, filterType: "highpass", filterFreq: [[0, "set", 4000]], gain: [[0, "set", 0.9, true], [0.012, "exp", 0.001, false]] },
      { type: "noise", delay: 0.025, stop: 0.015, filterType: "bandpass", filterQ: 3.0, filterFreq: [[0, "set", 2200]], gain: [[0, "set", 0.7, true], [0.015, "exp", 0.001, false]] }
    ]
  },
  {
    id: "drop",
    name: "Water Droplet",
    category: "Actions",
    iconKey: "drop",
    wave: "Resonant Fluid Pitch",
    desc: "Hyper-realistic liquid drop pitch bend.",
    voices: [
      { type: "osc", osc: "sine", delay: 0, stop: 0.06, freq: [[0, "set", 600], [0.03, "exp", 1800], [0.06, "exp", 1200]], gain: [[0, "set", 1.0, true], [0.06, "exp", 0.001, false]] }
    ]
  },
  {
    id: "undo",
    name: "Reverse Spring",
    category: "Actions",
    iconKey: "undo",
    wave: "Downward Bend",
    desc: "Elastic downward pitch snap.",
    voices: [
      { type: "osc", osc: "sine", delay: 0, stop: 0.08, freq: [[0, "set", 700], [0.08, "exp", 200]], gain: [[0, "set", 0.7, true], [0.08, "exp", 0.001, false]] }
    ]
  },
  {
    id: "redo",
    name: "Forward Snap",
    category: "Actions",
    iconKey: "redo",
    wave: "Upward Bend",
    desc: "Elastic upward pitch snap.",
    voices: [
      { type: "osc", osc: "sine", delay: 0, stop: 0.08, freq: [[0, "set", 200], [0.08, "exp", 700]], gain: [[0, "set", 0.7, true], [0.08, "exp", 0.001, false]] }
    ]
  },
  {
    id: "upload",
    name: "Air Launch",
    category: "Actions",
    iconKey: "upload",
    wave: "Rising Noise + Sine",
    desc: "Rising smooth swell.",
    voices: [
      { type: "osc", osc: "sine", delay: 0, stop: 0.12, freq: [[0, "set", 300], [0.12, "exp", 900]], gain: [[0, "set", 0.6, true], [0.12, "exp", 0.001, false]] },
      { type: "noise", delay: 0, stop: 0.12, filterType: "bandpass", filterQ: 2.0, filterFreq: [[0, "set", 400], [0.12, "exp", 2400]], gain: [[0, "set", 0.4, true], [0.12, "exp", 0.001, false]] }
    ]
  },
  {
    id: "download",
    name: "Soft Touchdown",
    category: "Actions",
    iconKey: "download",
    wave: "Falling Air + Thud",
    desc: "Descending tone landing into a cushioned low thud.",
    voices: [
      { type: "osc", osc: "sine", delay: 0, stop: 0.1, freq: [[0, "set", 900], [0.1, "exp", 250]], gain: [[0, "set", 0.6, true], [0.1, "exp", 0.001, false]] },
      { type: "osc", osc: "sine", delay: 0.09, stop: 0.03, freq: [[0, "set", 120], [0.03, "exp", 40]], gain: [[0, "set", 0.8, true], [0.03, "exp", 0.001, false]] }
    ]
  },
  {
    id: "share",
    name: "Pitched Flare",
    category: "Actions",
    iconKey: "share",
    wave: "High Sweep",
    desc: "Ascending beam flare.",
    voices: [
      { type: "osc", osc: "sine", delay: 0, stop: 0.09, freq: [[0, "set", 400], [0.09, "exp", 1600]], gain: [[0, "set", 0.6, true], [0.09, "exp", 0.001, false]] }
    ]
  },

  // -------------------------------------------------------------- GAMIFICATION
  {
    id: "levelup",
    name: "8-Bit Victory Fanfare",
    category: "Gamification",
    iconKey: "levelup",
    wave: "Square Chord Harmony",
    desc: "Classic arcade level-up sequence ending in a sustained major chord.",
    voices: [
      { type: "osc", osc: "square", delay: 0, stop: 0.25, freq: [[0, "set", 523.25], [0.05, "set", 659.25], [0.1, "set", 783.99], [0.15, "set", 1046.50]], gain: [[0, "set", 0.6, true], [0.25, "exp", 0.001, false]] },
      { type: "osc", osc: "square", delay: 0.15, stop: 0.2, freq: [[0, "set", 1318.51]], gain: [[0, "set", 0.4, true], [0.2, "exp", 0.001, false]] }
    ]
  },
  {
    id: "coin",
    name: "Arcade Coin Pickup",
    category: "Gamification",
    iconKey: "coin",
    wave: "Interval Jump",
    desc: "Iconic minor-to-major interval pickup.",
    voices: [
      { type: "osc", osc: "square", delay: 0, stop: 0.12, freq: [[0, "set", 987.77], [0.04, "set", 1318.51]], gain: [[0, "set", 0.6, true], [0.12, "exp", 0.001, false]] }
    ]
  },
  {
    id: "combo",
    name: "Combo Multiplier",
    category: "Gamification",
    iconKey: "combo",
    wave: "Fast Ascending Arp",
    desc: "Rapid 5-note pentatonic scale run.",
    voices: [
      { type: "osc", osc: "square", delay: 0, stop: 0.2, freq: [[0, "set", 440], [0.03, "set", 523.25], [0.06, "set", 659.25], [0.09, "set", 783.99], [0.12, "set", 1046.50]], gain: [[0, "set", 0.6, true], [0.2, "exp", 0.001, false]] }
    ]
  },

  // -------------------------------------------------------------------- SYSTEM
  {
    id: "poweron",
    name: "System Boot Up",
    category: "System",
    iconKey: "poweron",
    wave: "Sub Pitch Riser",
    desc: "Deep sub frequency sweep ending on a bright sine note.",
    voices: [
      { type: "osc", osc: "sine", delay: 0, stop: 0.25, freq: [[0, "set", 80], [0.25, "exp", 600]], gain: [[0, "set", 0.9, true], [0.25, "exp", 0.001, false]] }
    ]
  },
  {
    id: "poweroff",
    name: "System Power Down",
    category: "System",
    iconKey: "poweroff",
    wave: "Sub Pitch Fall",
    desc: "Mirror image descent of System Boot Up.",
    voices: [
      { type: "osc", osc: "sine", delay: 0, stop: 0.25, freq: [[0, "set", 600], [0.25, "exp", 80]], gain: [[0, "set", 0.9, true], [0.25, "exp", 0.001, false]] }
    ]
  },
  {
    id: "connect",
    name: "Hardware Connect",
    category: "System",
    iconKey: "connect",
    wave: "Major Fifth Interval",
    desc: "Confident fifth-interval double tone.",
    voices: [
      { type: "osc", osc: "sine", delay: 0, stop: 0.08, freq: [[0, "set", 440]], gain: [[0, "set", 0.7, true], [0.08, "exp", 0.001, false]] },
      { type: "osc", osc: "sine", delay: 0.06, stop: 0.1, freq: [[0, "set", 659.25]], gain: [[0, "set", 0.8, true], [0.1, "exp", 0.001, false]] }
    ]
  },
  {
    id: "disconnect",
    name: "Hardware Disconnect",
    category: "System",
    iconKey: "disconnect",
    wave: "Descending Fifth",
    desc: "Inverted fifth interval for device detachment.",
    voices: [
      { type: "osc", osc: "sine", delay: 0, stop: 0.08, freq: [[0, "set", 659.25]], gain: [[0, "set", 0.7, true], [0.08, "exp", 0.001, false]] },
      { type: "osc", osc: "sine", delay: 0.06, stop: 0.1, freq: [[0, "set", 440]], gain: [[0, "set", 0.8, true], [0.1, "exp", 0.001, false]] }
    ]
  },
  {
    id: "sync",
    name: "Data Sync Orbit",
    category: "System",
    iconKey: "sync",
    wave: "LFO Modulation",
    desc: "Pulsing tone for syncing and background updates.",
    voices: [
      { type: "osc", osc: "sine", delay: 0, stop: 0.2, freq: [[0, "set", 500], [0.05, "exp", 700], [0.1, "exp", 500], [0.15, "exp", 700]], gain: [[0, "set", 0.5, true], [0.2, "exp", 0.001, false]] }
    ]
  }
];

export const CATEGORY_ORDER = ["Feedback", "Controls", "Notifications", "Alerts", "Actions", "Gamification", "System"];

const totalStop = (def) => Math.max(...def.voices.map((v) => (v.delay || 0) + v.stop));

export const INITIAL_SOUNDS = SOUND_DEFS.map((def) => ({
  id: def.id,
  name: def.name,
  category: def.category,
  desc: def.desc,
  iconKey: def.iconKey,
  type: def.id,
  duration: `${Math.round(totalStop(def) * 1000)}ms`,
  wave: def.wave
}));

const rampMethod = (kind) =>
  kind === "set" ? "setValueAtTime" : kind === "exp" ? "exponentialRampToValueAtTime" : "linearRampToValueAtTime";

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

export const playSoundEffect = (type, pitchShift = 1, volume = 0.2) => {
  try {
    const def = SOUND_DEFS.find((d) => d.id === type);
    if (!def) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
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
  } catch (e) {
    console.warn("AudioContext error:", e);
  }
};

export const getJsCodeSnippet = (soundType) => {
  const def = SOUND_DEFS.find((d) => d.id === soundType) || SOUND_DEFS[0];

  const voiceBlocks = def.voices
    .map((voice, i) => {
      const n = i + 1;
      const startExpr = voice.delay ? `now + ${voice.delay}` : "now";

      if (voice.type === "noise") {
        const filterLines = (voice.filterFreq || [])
          .map(([t, kind, hz]) => `  filter${n}.frequency.${rampMethod(kind)}(${hz}, ${t ? `${startExpr} + ${t}` : startExpr});`)
          .join("\n");
        const gainLines = (voice.gain || [])
          .map(([t, kind, val, scaled]) => {
            const v = scaled ? +(val * 0.2).toFixed(3) : val;
            return `  gain${n}.gain.${rampMethod(kind)}(${v}, ${t ? `${startExpr} + ${t}` : startExpr});`;
          })
          .join("\n");
        return `  // Voice ${n}: Filtered Transient Noise Burst
  const noise${n} = ctx.createBufferSource();
  noise${n}.buffer = createNoiseBuffer(ctx, ${voice.stop});
  const filter${n} = ctx.createBiquadFilter();
  filter${n}.type = "${voice.filterType || "bandpass"}";
  filter${n}.Q.value = ${voice.filterQ ?? 1};
  const gain${n} = ctx.createGain();
  noise${n}.connect(filter${n});
  filter${n}.connect(gain${n});
  gain${n}.connect(ctx.destination);
${filterLines}
${gainLines}
  noise${n}.start(${startExpr});
  noise${n}.stop(${startExpr} + ${voice.stop});`;
      }

      const freqLines = (voice.freq || [])
        .map(([t, kind, hz]) => `  osc${n}.frequency.${rampMethod(kind)}(${hz}, ${t ? `${startExpr} + ${t}` : startExpr});`)
        .join("\n");
      const gainLines = (voice.gain || [])
        .map(([t, kind, val, scaled]) => {
          const v = scaled ? +(val * 0.2).toFixed(3) : val;
          return `  gain${n}.gain.${rampMethod(kind)}(${v}, ${t ? `${startExpr} + ${t}` : startExpr});`;
        })
        .join("\n");
      const detuneLine = voice.detune ? `  osc${n}.detune.setValueAtTime(${voice.detune}, ${startExpr});\n` : "";
      return `  // Voice ${n}: ${voice.osc} Oscillator Layer
  const osc${n} = ctx.createOscillator();
  const gain${n} = ctx.createGain();
  osc${n}.type = "${voice.osc}";
${detuneLine}  osc${n}.connect(gain${n});
  gain${n}.connect(ctx.destination);
${freqLines}
${gainLines}
  osc${n}.start(${startExpr});
  osc${n}.stop(${startExpr} + ${voice.stop});`;
    })
    .join("\n\n");

  return `// Pure Web Audio API Synthesizer Snippet
const createNoiseBuffer = (ctx, duration) => {
  const size = Math.max(1, Math.floor(ctx.sampleRate * duration));
  const buffer = ctx.createBuffer(1, size, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < size; i++) data[i] = Math.random() * 2 - 1;
  return buffer;
};

export const play${def.id.charAt(0).toUpperCase() + def.id.slice(1)}Sound = () => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const ctx = new AudioContext();
  const now = ctx.currentTime;

${voiceBlocks}
};`;
};