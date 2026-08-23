import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

gsap.registerPlugin(useGSAP);

export default function ScratchCard({
  children,
  width = 400,
  height = 250,
  brushSize = 32,
  revealThreshold = 0.08, // ⚡ Auto-scratches after scratching just ~8%
  onReveal = () => {},
  className,
}) {
  const containerRef = useRef();
  const canvasRef = useRef();
  const particleCanvasRef = useRef();
  const contentRef = useRef();
  
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPoint, setLastPoint] = useState({ x: 0, y: 0 });
  const [sheenPosition, setSheenPosition] = useState({ x: 50, y: 50 });
  
  const particlesRef = useRef([]);
  const animFrameRef = useRef();
  const autoScratchTriggered = useRef(false);

  // 1. Particle System Setup
  const createSparkles = (x, y, count = 6) => {
    for (let i = 0; i < count; i++) {
      particlesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 7,
        vy: (Math.random() - 0.5) * 7 - 1.5,
        size: Math.random() * 5 + 2,
        color: ['#ffd700', '#f59e0b', '#ffffff', '#e2e8f0'][Math.floor(Math.random() * 4)],
        alpha: 1,
        decay: Math.random() * 0.04 + 0.02,
        rotation: Math.random() * Math.PI,
      });
    }
  };

  useEffect(() => {
    const pCanvas = particleCanvasRef.current;
    if (!pCanvas) return;
    const ctx = pCanvas.getContext('2d');
    pCanvas.width = width;
    pCanvas.height = height;

    const renderParticles = () => {
      ctx.clearRect(0, 0, width, height);

      particlesRef.current.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particlesRef.current.splice(index, 1);
        } else {
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.lineTo(p.size / 2, 0);
          ctx.lineTo(0, p.size);
          ctx.lineTo(-p.size / 2, 0);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
      });

      animFrameRef.current = requestAnimationFrame(renderParticles);
    };

    renderParticles();
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [width, height]);

  // 2. Texture & Sheen Foil Setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    canvas.width = width;
    canvas.height = height;

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#e2e8f0');
    gradient.addColorStop(0.5, '#f8fafc');
    gradient.addColorStop(1, '#cbd5e1');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 18;
      data[i] += noise;
      data[i + 1] += noise;
      data[i + 2] += noise;
    }
    ctx.putImageData(imageData, 0, 0);
  }, [width, height]);

  // 3. Auto-Scratch Sweep Function
  const triggerAutoScratch = useCallback(() => {
    if (autoScratchTriggered.current) return;
    autoScratchTriggered.current = true;
    setIsDrawing(false);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const state = { radius: brushSize, opacity: 1 };
    const maxRadius = Math.hypot(width, height);

    // GSAP Auto-Erase Sweep Animation
    gsap.to(state, {
      radius: maxRadius,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
      onUpdate: () => {
        if (!canvasRef.current) return;
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(lastPoint.x, lastPoint.y, state.radius, 0, Math.PI * 2);
        ctx.fill();

        // Emit sparkles along the expanding wave
        if (Math.random() > 0.3) {
          const angle = Math.random() * Math.PI * 2;
          const px = lastPoint.x + Math.cos(angle) * (state.radius * 0.7);
          const py = lastPoint.y + Math.sin(angle) * (state.radius * 0.7);
          createSparkles(px, py, 3);
        }
      },
      onComplete: () => {
        setIsRevealed(true);
        onReveal();
      }
    });
  }, [width, height, brushSize, lastPoint, onReveal]);

  // 4. Scratch Threshold Check
  const checkRevealThreshold = useCallback(() => {
    if (autoScratchTriggered.current || isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    let clearedPixels = 0;
    const totalPixels = width * height;

    for (let i = 3; i < data.length; i += 4 * 10) {
      if (data[i] === 0) clearedPixels++;
    }

    // Trigger auto-scratch once minor threshold is hit
    if (clearedPixels / (totalPixels / 10) >= revealThreshold) {
      triggerAutoScratch();
    }
  }, [width, height, revealThreshold, isRevealed, triggerAutoScratch]);

  const getCoordinates = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const touch = event.touches ? event.touches[0] : null;
    return {
      x: (touch ? touch.clientX : event.clientX) - rect.left,
      y: (touch ? touch.clientY : event.clientY) - rect.top,
    };
  };

  const startDrawing = (e) => {
    if (isRevealed || autoScratchTriggered.current) return;
    setIsDrawing(true);
    const point = getCoordinates(e);
    setLastPoint(point);
    createSparkles(point.x, point.y);
  };

  const draw = (e) => {
    if (!isDrawing || isRevealed || autoScratchTriggered.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    const currentPoint = getCoordinates(e);

    setSheenPosition({
      x: (currentPoint.x / width) * 100,
      y: (currentPoint.y / height) * 100,
    });

    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = brushSize;

    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(currentPoint.x, currentPoint.y);
    ctx.stroke();

    createSparkles(currentPoint.x, currentPoint.y);

    setLastPoint(currentPoint);
    checkRevealThreshold();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // 5. Revealed Content Excitement Animation
  useGSAP(() => {
    if (isRevealed) {
      gsap.fromTo(contentRef.current, 
        { scale: 0.88, filter: 'blur(6px)' },
        { 
          scale: 1, 
          filter: 'blur(0px)', 
          duration: 0.6, 
          ease: 'back.out(1.7)' 
        }
      );
    }
  }, { scope: containerRef, dependencies: [isRevealed] });

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: isRevealed ? [1, 1.04, 1] : 1,
      }}
      transition={{ duration: 0.4 }}
      whileHover={!isRevealed ? { scale: 1.015 } : {}}
      className={clsx(
        "relative overflow-hidden rounded-3xl select-none cursor-crosshair",
        "bg-white border border-slate-200/80 shadow-2xl shadow-slate-200/50",
        className
      )}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {/* Hidden Content (Prize) */}
      <div 
        ref={contentRef}
        className="absolute inset-0 z-0 flex items-center justify-center p-6"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        {children}
      </div>

      {/* Sheen Overlay */}
      {!isRevealed && (
        <div 
          className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${sheenPosition.x}% ${sheenPosition.y}%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 60%)`,
          }}
        />
      )}

      {/* Foil Scratch Canvas */}
      {!isRevealed && (
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="absolute inset-0 z-20 touch-none block"
          style={{ width: `${width}px`, height: `${height}px` }}
        />
      )}

      {/* Particle Sparkle Layer */}
      <canvas
        ref={particleCanvasRef}
        className="absolute inset-0 z-30 pointer-events-none block"
        style={{ width: `${width}px`, height: `${height}px` }}
      />

      {/* Call To Action Badge */}
      {!isRevealed && !isDrawing && !autoScratchTriggered.current && (
        <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
          <motion.span 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="px-5 py-2.5 rounded-full bg-slate-900/90 text-white text-xs font-semibold tracking-wider uppercase shadow-xl backdrop-blur-md"
          >
            ✨ Touch & Scratch
          </motion.span>
        </div>
      )}
    </motion.div>
  );
}