import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface Act09ExperienceProps {
  onOpenTrialModal: () => void;
}

export function Act09Experience({ onOpenTrialModal }: Act09ExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0.2, 0.5], [50, 0]);

  return (
    <div id="act-09" ref={containerRef} className="relative min-h-screen bg-slate-50 flex items-center justify-center overflow-hidden py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50" />
      
      <motion.div 
        style={{ opacity, y }}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
      >
        <div className="flex items-center justify-center gap-3 text-slate-500 font-mono text-xs uppercase tracking-widest mb-8">
          <Sparkles className="w-4 h-4 text-[#003B95]" />
          <span>Act 09 — The Future of Sleep</span>
        </div>
        
        <h2 className="text-5xl md:text-8xl font-light text-slate-900 tracking-tight leading-tight mb-8 font-serif">
          Ready to experience <br />
          <span className="italic text-[#003B95]">tomorrow?</span>
        </h2>
        
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-16">
          Reserve your SensAI Sleep Consultation. Experience the world's most advanced sleep system in the comfort of your home for 100 nights.
        </p>

        <button 
          onClick={onOpenTrialModal}
          className="group relative inline-flex items-center justify-center gap-4 bg-[#003B95] text-white px-10 py-5 rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          <span className="relative text-sm font-semibold tracking-wide uppercase">Reserve Your Trial</span>
          <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
}
