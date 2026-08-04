import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Layers, Moon, Activity, SlidersHorizontal } from 'lucide-react';

export type ConciergeState = 
  | 'explore-layers' 
  | 'try-side-sleeper' 
  | 'change-lighting' 
  | 'view-recovery' 
  | 'compare-comfort'
  | 'reserve-trial';

interface SleepConciergeProps {
  currentState?: ConciergeState;
  onAction?: () => void;
}

export function SleepConcierge({ currentState = 'explore-layers', onAction }: SleepConciergeProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay initial appearance for cinematic effect
    const timer = setTimeout(() => setIsVisible(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const config = {
    'explore-layers': {
      label: 'Explore Layers',
      icon: Layers,
    },
    'try-side-sleeper': {
      label: 'Try Side Sleeper',
      icon: Moon,
    },
    'change-lighting': {
      label: 'Change Lighting',
      icon: Sparkles,
    },
    'view-recovery': {
      label: 'View Recovery',
      icon: Activity,
    },
    'compare-comfort': {
      label: 'Compare Comfort',
      icon: SlidersHorizontal,
    },
    'reserve-trial': {
      label: 'Reserve Trial',
      icon: ArrowRight,
    }
  };

  const currentConfig = config[currentState];
  const Icon = currentConfig.icon;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-8 right-8 z-[100]"
        >
          <div className="relative group">
            {/* Soft ambient glow behind the button */}
            <div className="absolute inset-0 bg-[#003B95]/10 rounded-full blur-xl group-hover:bg-[#003B95]/20 transition-all duration-700" />
            
            <button
              onClick={onAction}
              className="relative flex items-center gap-3 pl-4 pr-5 py-3 bg-white/80 backdrop-blur-xl border border-white/40 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.12)] transition-all duration-500 overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-8 h-8 rounded-full bg-[#003B95]/5 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-[#003B95]" />
              </div>
              
              <div className="flex flex-col items-start">
                <span className="text-[9px] font-semibold tracking-[0.2em] text-slate-400 uppercase">
                  Sleep Concierge
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentState}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.4 }}
                    className="text-xs font-medium text-slate-800 tracking-wide"
                  >
                    {currentConfig.label}
                  </motion.span>
                </AnimatePresence>
              </div>

              <div className="w-6 h-6 rounded-full flex items-center justify-center ml-2 group-hover:translate-x-1 transition-transform duration-500">
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
