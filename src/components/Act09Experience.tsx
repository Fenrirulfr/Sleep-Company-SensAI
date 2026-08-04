import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, MapPin } from 'lucide-react';

interface Act09Props {
  onOpenTrialModal: () => void;
}

export function Act09Experience({ onOpenTrialModal }: Act09Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end']
  });

  const opacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const y = useTransform(scrollYProgress, [0.1, 0.4], [30, 0]);

  return (
    <section 
      id="act-09" 
      ref={containerRef} 
      className="relative min-h-screen bg-white text-slate-900 flex items-center justify-center py-16 md:py-20 lg:py-24 px-6 md:px-12 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-white pointer-events-none" />

      <motion.div 
        style={{ opacity, y }}
        className="relative z-10 max-w-4xl mx-auto text-center space-y-12"
      >
        <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#003B95] font-semibold">
          Flagship Sleep System
        </p>

        {/* Headline */}
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-light font-serif tracking-tight leading-[1.05]">
          Tomorrow Begins <br />
          <span className="italic font-normal text-[#003B95]">Tonight.</span>
        </h2>

        <p className="text-slate-600 max-w-xl mx-auto leading-relaxed text-base md:text-lg font-light">
          Experience true restorative sleep with our 100-night risk-free trial or visit our flagship studio for a personalized sleep consultation.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          {/* Large Primary CTA */}
          <button 
            onClick={onOpenTrialModal}
            className="w-full sm:w-auto px-10 py-5 rounded-full bg-[#003B95] text-white font-semibold text-sm tracking-wide hover:bg-[#002D73] transition-all duration-300 shadow-xl shadow-[#003B95]/20 hover:scale-105 active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>Experience SensAI</span>
          </button>

          {/* Secondary CTA */}
          <button 
            onClick={() => {
              alert("Store Locator: Finding your nearest SensAI Flagship Store...");
            }}
            className="w-full sm:w-auto px-8 py-5 rounded-full bg-white border border-slate-200 text-slate-800 font-semibold text-sm tracking-wide hover:border-[#003B95] hover:text-[#003B95] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-[#003B95]" />
            <span>Locate a Store</span>
          </button>
        </div>

        {/* Graceful Footer Note */}
        <div className="pt-16 text-xs font-mono uppercase tracking-widest text-slate-400">
          The Sleep Company © SensAI Sleep System
        </div>
      </motion.div>
    </section>
  );
}
