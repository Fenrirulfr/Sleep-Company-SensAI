import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { scrollToAct } from '../utils/scrollHelper';

export function Act01Hero({ progress = 0 }: { progress?: number }) {
  // Parallax tracking
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const x = (e.clientX - w / 2) / (w / 2);
      const y = (e.clientY - h / 2) / (h / 2);
      setMousePos({ x: x * 15, y: y * 15 });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Typography Timings based on passed progress
  // Headline: Fade in after 5%, out before 85%
  let headlineOpacity = 0;
  if (progress > 0.05 && progress < 0.15) {
    headlineOpacity = (progress - 0.05) / (0.15 - 0.05);
  } else if (progress >= 0.15 && progress <= 0.80) {
    headlineOpacity = 1;
  } else if (progress > 0.80 && progress < 0.85) {
    headlineOpacity = 1 - (progress - 0.80) / (0.85 - 0.80);
  }

  // Subheadline: Appear slightly after headline, exit before headline
  let subheadlineOpacity = 0;
  if (progress > 0.10 && progress < 0.20) {
    subheadlineOpacity = (progress - 0.10) / (0.20 - 0.10);
  } else if (progress >= 0.20 && progress <= 0.75) {
    subheadlineOpacity = 1;
  } else if (progress > 0.75 && progress < 0.80) {
    subheadlineOpacity = 1 - (progress - 0.75) / (0.80 - 0.75);
  }

  // CTA: Appear after subheadline, exit first
  let ctaOpacity = 0;
  if (progress > 0.15 && progress < 0.25) {
    ctaOpacity = (progress - 0.15) / (0.25 - 0.15);
  } else if (progress >= 0.25 && progress <= 0.70) {
    ctaOpacity = 1;
  } else if (progress > 0.70 && progress < 0.75) {
    ctaOpacity = 1 - (progress - 0.70) / (0.75 - 0.70);
  }
  
  const boxOpacity = Math.max(headlineOpacity, subheadlineOpacity, ctaOpacity);

  return (
    <div className="w-full h-full bg-transparent text-slate-900 font-sans selection:bg-[#003B95] selection:text-white">
      {/* Single Section: Hero Experience */}
      <section 
        className="relative w-full h-full overflow-hidden bg-transparent z-10"
        aria-label="SensAI Hero Introduction"
      >
        {/* Subtle light ambient overlay for parallax */}
        <div 
          className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-300 z-0" 
          style={{
            background: `radial-gradient(circle at ${50 + mousePos.x}%, ${50 + mousePos.y}%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)`,
            opacity: 0.5
          }}
        />

        {/* Interactive Layer */}
        <div 
          className="absolute inset-0 z-10 flex flex-col justify-start pt-[var(--spacing-4xl)] sm:pt-[var(--spacing-4xl)] section-padding-x pointer-events-none select-none"
          style={{ transform: prefersReducedMotion ? 'none' : `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)` }}
        >
          <motion.div 
            style={{ opacity: boxOpacity }}
            className="flex flex-col items-start justify-start max-w-2xl gap-[var(--spacing-lg)] sm:gap-[var(--spacing-xl)] mt-[var(--spacing-md)] sm:mt-[var(--spacing-sm)] p-[var(--spacing-lg)] sm:p-[var(--spacing-xl)] md:p-[var(--spacing-2xl)] rounded-3xl bg-white/80 backdrop-blur-2xl border border-white shadow-[0_32px_64px_rgba(0,0,0,0.12)]"
          >
            {/* Framed Badge just before Tomorrow Begins Tonight */}
            <motion.div
              style={{ opacity: headlineOpacity }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/[0.04] border border-slate-900/10 backdrop-blur-md text-[11px] font-mono uppercase tracking-[0.2em] text-slate-700 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#003B95]" />
              <span>The Sleep Company • SensAI™</span>
            </motion.div>

            {/* Headline */}
            <motion.div
              style={{
                opacity: headlineOpacity,
                pointerEvents: 'none'
              }}
              className="w-full flex justify-start"
            >
              <div className="text-left">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light font-serif tracking-tight text-slate-900 leading-tight">
                  Tomorrow Begins <span className="italic text-slate-500 font-normal">Tonight.</span>
                </h1>
              </div>
            </motion.div>

            {/* Subheadline */}
            <motion.div
              style={{
                opacity: subheadlineOpacity,
                pointerEvents: 'none'
              }}
              className="w-full flex justify-start"
            >
              <div className="max-w-lg text-left drop-shadow-[0_4px_24px_rgba(255,255,255,0.4)]">
                <h2 className="text-lg sm:text-xl font-light text-slate-700 leading-relaxed">
                  Meet <span className="text-[#003B95] font-normal italic">SensAI</span> — the adaptive sleep experience designed for premium comfort and restorative recovery.
                </h2>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              style={{
                opacity: ctaOpacity,
                pointerEvents: ctaOpacity > 0.5 ? 'auto' : 'none'
              }}
              className="flex justify-start"
            >
              <button
                aria-label="Start the SensAI Experience"
                onClick={() => {
                  scrollToAct('act-02');
                }}
                className="px-8 py-3.5 rounded-full border border-slate-200 bg-white/80 backdrop-blur-md text-slate-900 hover:bg-white hover:border-[#003B95]/30 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#003B95] focus:ring-offset-2 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] text-sm font-semibold flex items-center gap-2.5 cursor-pointer pointer-events-auto"
              >
                <Sparkles className="w-4 h-4 text-[#003B95]" aria-hidden="true" />
                <span>Experience SensAI</span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
