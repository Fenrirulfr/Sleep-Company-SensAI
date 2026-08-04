import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Sunset, Moon, Sunrise } from 'lucide-react';

type TimeOfDay = 'morning' | 'evening' | 'night' | 'sunrise';

const TIMES: { id: TimeOfDay; label: string; icon: React.FC<any>; bg: string; overlay: string }[] = [
  { id: 'morning', label: 'Morning', icon: Sun, bg: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=2000', overlay: 'bg-amber-100/10' },
  { id: 'evening', label: 'Evening', icon: Sunset, bg: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=2000', overlay: 'bg-orange-900/30' },
  { id: 'night', label: 'Night', icon: Moon, bg: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=2000', overlay: 'bg-slate-900/70' },
  { id: 'sunrise', label: 'Sunrise', icon: Sunrise, bg: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=2000', overlay: 'bg-rose-500/20' },
];

export function Act06NightJourney() {
  const [time, setTime] = useState<TimeOfDay>('night');

  const activeTime = TIMES.find(t => t.id === time) || TIMES[2];

  return (
    <section 
      id="act-06"
      className="relative w-full h-screen overflow-hidden bg-slate-900 flex items-center justify-center"
      aria-label="Your Night Journey"
    >
      {/* Background Image with Time-based Overlays */}
      <div className="absolute inset-0 z-0">
        <img 
          src={activeTime.bg} 
          alt="Luxury Bedroom" 
          className="w-full h-full object-cover transition-transform duration-[10s] ease-out scale-105"
        />
        <AnimatePresence>
          <motion.div
            key={time}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className={`absolute inset-0 ${activeTime.overlay} mix-blend-multiply`}
          />
        </AnimatePresence>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 flex justify-between items-end h-full pb-24 pointer-events-none">
        
        {/* Experience Panel */}
        <div className="w-[320px] bg-white/10 backdrop-blur-3xl border border-white/20 shadow-2xl rounded-[24px] p-8 pointer-events-auto">
          <div className="w-8 h-[1px] bg-white/50 mb-6" />
          <h3 className="text-xl font-serif-editorial text-white mb-3 font-light">
            Your Night Journey
          </h3>
          <p className="text-xs text-white/70 leading-relaxed font-light">
            SensAI adapts to your body's thermal shifts from dusk till dawn, ensuring uninterrupted recovery regardless of the room's environment.
          </p>
        </div>

        {/* Circular Time Selector */}
        <div className="pointer-events-auto flex gap-4 bg-white/10 backdrop-blur-2xl border border-white/20 p-2 rounded-full">
          {TIMES.map((t) => {
            const Icon = t.icon;
            const isActive = time === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTime(t.id)}
                className={`relative p-4 rounded-full transition-all duration-500 cursor-pointer ${isActive ? 'text-[#003B95]' : 'text-white hover:text-white/80'}`}
                aria-label={`Set time to ${t.label}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTimeBg"
                    className="absolute inset-0 bg-white rounded-full shadow-lg"
                    initial={false}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">
                  <Icon className="w-5 h-5" />
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
