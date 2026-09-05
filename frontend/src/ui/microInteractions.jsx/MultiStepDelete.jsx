import React, { useState, useRef } from 'react';
import gsap from 'gsap';

export default function MultiStepDelete() {
  const [state, setState] = useState('idle'); // 'idle' | 'confirm' | 'deleting'
  const fillRef = useRef(null);

  const handleInitialClick = () => {
    if (state === 'idle') setState('confirm');
  };

  const handleConfirm = () => {
    setState('deleting');

    gsap.fromTo(
      fillRef.current,
      { width: '0%' },
      {
        width: '100%',
        duration: 1.5,
        ease: 'power1.inOut',
        onComplete: () => {
          setState('idle');
        },
      }
    );
  };

  return (
    <div className="relative inline-block overflow-hidden rounded-xl border border-rose-500/30 bg-slate-900">
      {state === 'deleting' && (
        <div ref={fillRef} className="absolute inset-0 bg-rose-600/30 z-0" />
      )}

      <div className="relative z-10 flex items-center">
        {state === 'idle' && (
          <button
            onClick={handleInitialClick}
            className="px-6 py-3 text-rose-400 font-medium hover:bg-rose-500/10 transition-colors"
          >
            Delete Account
          </button>
        )}

        {state === 'confirm' && (
          <div className="flex items-center space-x-2 px-3 py-1.5">
            <span className="text-xs text-slate-300 font-medium px-2">Are you sure?</span>
            <button
              onClick={handleConfirm}
              className="px-3 py-1.5 bg-rose-600 text-white text-xs font-semibold rounded-lg hover:bg-rose-500 transition-colors"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => setState('idle')}
              className="px-3 py-1.5 bg-slate-800 text-slate-300 text-xs font-medium rounded-lg hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}

        {state === 'deleting' && (
          <div className="px-6 py-3 text-rose-400 font-medium text-sm flex items-center space-x-2">
            <span>Deleting...</span>
          </div>
        )}
      </div>
    </div>
  );
}