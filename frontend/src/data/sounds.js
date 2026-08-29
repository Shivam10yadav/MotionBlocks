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
  } catch (e) {
    console.warn("AudioContext error:", e);
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
  const def = SOUND_DEFS.find((d) => d.id === soundId);
  if (!def) return;

  const sampleRate = 44100;
  const duration = totalStop(def) + 0.05;
  const offlineCtx = new OfflineAudioContext(1, Math.ceil(sampleRate * duration), sampleRate);

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
  URL.revokeObjectURL(url);
};