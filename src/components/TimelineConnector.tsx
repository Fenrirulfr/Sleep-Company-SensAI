import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface TimelineConnectorProps {
  fromActNumber: string;
  toActNumber: string;
  fromLabel: string;
  toLabel: string;
  theme?: 'dawn' | 'biometric' | 'polymer' | 'intelligence' | 'night' | 'blueprint';
}

export const TimelineConnector: React.FC<TimelineConnectorProps> = ({
  fromActNumber,
  toActNumber,
  fromLabel,
  toLabel,
  theme = 'dawn',
}) => {
  // Theme based subtle lighting gradient transitions
  const themeGradients = {
    dawn: 'from-amber-200/20 via-sky-200/15 to-indigo-100/10',
    biometric: 'from-sky-200/20 via-indigo-200/20 to-purple-100/10',
    polymer: 'from-cyan-200/20 via-sky-300/15 to-slate-900/10',
    intelligence: 'from-indigo-300/20 via-cyan-200/15 to-slate-900/20',
    night: 'from-[#0a142c]/40 via-indigo-950/30 to-slate-950/20',
    blueprint: 'from-slate-900/40 via-cyan-950/30 to-amber-100/20',
  };

  return (
    <div className="relative py-12 flex flex-col items-center justify-center overflow-hidden pointer-events-none select-none">
      {/* 1. Continuous Ambient Lighting Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-b ${themeGradients[theme]} blur-3xl opacity-60`} />

      {/* 2. Seamless Camera Axis Luminescent Track */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Top Connecting Node */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/80 text-[10px] font-mono text-slate-300 shadow-md backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>CONTINUOUS TIMELINE TRACK — ACT {fromActNumber} → ACT {toActNumber}</span>
        </motion.div>

        {/* Vertical Luminescent Laser Spine Line */}
        <div className="relative my-3 w-px h-20 bg-gradient-to-b from-cyan-400/80 via-indigo-500/50 to-amber-300/60 shadow-[0_0_12px_rgba(56,189,248,0.5)]">
          {/* Animated Travelling Photon */}
          <motion.div
            animate={{ y: [0, 80] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 -left-1 w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_10px_#38bdf8]"
          />
        </div>

        {/* Transition Hint & Inherited Visual Cue */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="text-center"
        >
          <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-slate-500 flex items-center justify-center gap-1.5">
            <span>{fromLabel}</span>
            <ChevronDown className="w-3.5 h-3.5 text-cyan-500 animate-bounce" />
            <span>{toLabel}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
