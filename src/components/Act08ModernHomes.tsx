import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const STYLES = [
  { id: 'modern', label: 'Modern', image: 'https://images.unsplash.com/photo-1595514535314-1e0e7195d852?q=80&w=2000' },
  { id: 'minimal', label: 'Minimal', image: 'https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?q=80&w=2000' },
  { id: 'luxury', label: 'Luxury', image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2000' },
  { id: 'scandinavian', label: 'Scandinavian', image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=2000' },
];

export function Act08ModernHomes() {
  const [style, setStyle] = useState(STYLES[0].id);

  const activeStyle = STYLES.find(s => s.id === style) || STYLES[0];

  return (
    <section 
      id="act-08"
      className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-slate-900"
      aria-label="Designed For Modern Homes"
    >
      <div className="absolute inset-0 z-0">
        <AnimatePresence>
          <motion.img
            key={style}
            src={activeStyle.image}
            alt={activeStyle.label}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 flex flex-col justify-between h-full py-24 pointer-events-none">
        
        <div>
          <p className="text-[10px] tracking-[0.3em] font-semibold uppercase text-white/70 mb-4">Section 08</p>
          <h2 className="text-4xl md:text-5xl font-light text-white font-serif-editorial">
            Designed For<br />Modern Homes
          </h2>
        </div>

        <div className="flex justify-end w-full">
          {/* Experience Panel */}
          <div className="w-[320px] bg-white/10 backdrop-blur-3xl border border-white/20 shadow-2xl rounded-[24px] p-8 pointer-events-auto">
            <div className="w-8 h-[1px] bg-white/50 mb-6" />
            
            <div className="flex flex-col gap-3 mb-6">
              {STYLES.map(s => (
                <button
                  key={s.id}
                  onClick={() => setStyle(s.id)}
                  className={`text-left text-xs uppercase tracking-widest font-semibold transition-colors duration-300 ${style === s.id ? 'text-white' : 'text-white/40 hover:text-white/80'}`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <p className="text-xs text-white/70 leading-relaxed font-light">
              Elevate your bedroom aesthetic. SensAI is designed with premium materials that complement any architectural interior.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
