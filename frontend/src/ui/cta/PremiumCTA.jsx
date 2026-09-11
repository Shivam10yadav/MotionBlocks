import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Canvas Spark / Particle Physics Background Engine
const CanvasSparks = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.35 + 0.05,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.5 - 0.1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < 0) p.y = canvas.height;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 0, 0, ${p.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default function PremiumCTA() {
  // Stagger Animations for Framer Motion Elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.16,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <>
      {/* Import Futuristic Google Font dynamically */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@900&display=swap');
        .font-sharp-future {
          font-family: 'Orbitron', sans-serif;
          letter-spacing: -0.05em;
        }
      `}</style>

      <div className="w-screen h-screen bg-[#111111] p-4 sm:p-6 md:p-8 flex items-center justify-center font-sans overflow-hidden box-border">
        {/* Main Outer Box */}
        <div className="relative w-full h-full max-w-7xl bg-[#FF6B11] rounded-[2.5rem] p-8 sm:p-12 md:p-16 overflow-hidden text-black shadow-2xl z-10 border border-white/10 flex flex-col justify-between">
          
          {/* Background Canvas Physics Layer */}
          <CanvasSparks />

          {/* Sequential Element Stagger Container */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch"
          >
            {/* LEFT SECTION: Sharp Futuristic Typography */}
            <div className="relative flex items-center justify-center min-h-[250px] lg:min-h-full select-none">
              
              {/* Sharp, Edgy Futuristic "JOIN" */}
              <motion.h1 
                variants={itemVariants}
                className="font-sharp-future text-[7rem] sm:text-[12rem] md:text-[15rem] lg:text-[17rem] font-black leading-none text-black uppercase transform scale-y-[1.1] flex items-center drop-shadow-xl"
              >
                JOIN
              </motion.h1>

              {/* Handwritten Overlay Text "Us" */}
              <motion.span 
                variants={itemVariants}
                className="absolute right-[2%] sm:right-[6%] top-[12%] sm:top-[14%] text-5xl sm:text-7xl md:text-8xl font-serif italic text-white z-20 font-bold drop-shadow-md"
              >
                Us
              </motion.span>
            </div>

            {/* RIGHT SECTION: Content + Curved Downward Arrow + Button */}
            <div className="flex flex-col justify-between h-full pt-4 lg:pl-12 lg:border-l lg:border-black/15 relative">
              
              {/* Top Text Block */}
              <motion.div variants={itemVariants} className="max-w-xl">
                <p className="text-2xl sm:text-3xl md:text-4xl font-medium text-white leading-tight tracking-tight">
                  Ready to take control of your creative journey?{' '}
                  <a 
                    href="#join" 
                    className="underline underline-offset-8 decoration-2 decoration-black text-white hover:text-black transition-colors"
                  >
                    Join now
                  </a>{' '}
                  and let's shape the future of the art world together!
                </p>
              </motion.div>

              {/* Hand-Drawn Downward Curved Arrow pointing directly to bottom-right button */}
              <motion.div 
                variants={itemVariants}
                className="hidden lg:block absolute bottom-28 right-80 pointer-events-none z-20"
              >
                <svg
                  width="140"
                  height="80"
                  viewBox="0 0 140 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Curved path arching downward toward button */}
                  <path
                    d="M 10 15 Q 70 10 115 50"
                    stroke="black"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                  />
                  {/* Downward pointing arrowhead */}
                  <path
                    d="M 98 44 L 117 52 L 122 33"
                    stroke="black"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </motion.div>

              {/* Bottom Right CTA Action Button */}
              <motion.div variants={itemVariants} className="mt-8 lg:mt-0 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-80 h-24 bg-black text-white rounded-2xl p-6 flex items-center justify-between group shadow-2xl hover:bg-neutral-900 transition-all cursor-pointer relative overflow-hidden"
                >
                  <div className="flex flex-col items-start justify-center">
                    <span className="text-xl font-bold tracking-wide">
                      Join
                    </span>
                    <span className="text-xs text-neutral-400 font-medium">
                      Get started now
                    </span>
                  </div>

                  {/* Button Icon Circle */}
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                    <ArrowRight className="w-6 h-6 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </motion.button>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}