import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, MapPin } from 'lucide-react';

interface Act09Props {
  onOpenTrialModal: () => void;
}

export function Act09Experience({ onOpenTrialModal }: Act09Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      id="act-09" 
      ref={containerRef} 
      className="relative min-h-screen bg-white text-slate-900 flex items-center justify-center section-padding py-16 lg:py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-white pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-4xl mx-auto text-center space-y-[var(--spacing-3xl)]"
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
        <div className="flex flex-col sm:flex-row items-center justify-center gap-[var(--spacing-md)] pt-[var(--spacing-md)]">
          {/* Large Primary CTA */}
          <button 
            onClick={onOpenTrialModal}
            className="w-full sm:w-auto px-[var(--spacing-2xl)] py-[var(--spacing-lg)] rounded-full bg-[#003B95] text-white font-semibold text-sm tracking-wide hover:bg-[#002D73] transition-all duration-300 shadow-xl shadow-[#003B95]/20 hover:scale-105 active:scale-95 flex items-center justify-center gap-[var(--spacing-sm)] cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>Experience SensAI</span>
          </button>

          {/* Secondary CTA */}
          <a 
            href="https://thesleepcompany.in/pages/our-store"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-[var(--spacing-xl)] py-[var(--spacing-lg)] rounded-full bg-white border border-slate-200 text-slate-800 font-semibold text-sm tracking-wide hover:border-[#003B95] hover:text-[#003B95] transition-all duration-300 flex items-center justify-center gap-[var(--spacing-sm)] cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-[#003B95]" />
            <span>Locate a Store</span>
          </a>
        </div>

        {/* Graceful Footer Note */}
        <div className="pt-[var(--spacing-4xl)] text-xs font-mono uppercase tracking-widest text-slate-400">
          The Sleep Company © SensAI Sleep System
        </div>
      </motion.div>
    </section>
  );
}
