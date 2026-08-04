import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ShieldCheck, Cpu } from 'lucide-react';
import heroMattressImgLocal from '../assets/images/sensai_hero_mattress_1785769279656.jpg';

const CINEMATIC_FRAMES = [
  heroMattressImgLocal,
  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=80',
];

interface HeroMattressProps {
  mousePos?: { x: number; y: number };
  activeHotspot: string | null;
  setActiveHotspot: (spot: string | null) => void;
  controlledFrameIndex?: number;
}

export const HeroMattress: React.FC<HeroMattressProps> = ({
  activeHotspot,
  setActiveHotspot,
  controlledFrameIndex,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [internalFrameIndex, setInternalFrameIndex] = useState(0);

  // Scroll scrubbing listener mapped precisely across the 350vh container
  useEffect(() => {
    if (controlledFrameIndex !== undefined) return;
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;

      if (containerHeight <= 0) return;

      let progress = scrolled / containerHeight;
      progress = Math.max(0, Math.min(1, progress));

      const frameIndex = Math.min(
        CINEMATIC_FRAMES.length - 1,
        Math.floor(progress * CINEMATIC_FRAMES.length)
      );
      setInternalFrameIndex(frameIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [controlledFrameIndex]);

  const currentFrameIndex = controlledFrameIndex !== undefined ? controlledFrameIndex : internalFrameIndex;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[350vh] max-w-6xl mx-auto select-none"
    >
      {/* Pinned Sticky Stage */}
      <div className="sticky top-20 w-full h-[88vh] min-h-[520px] flex items-center justify-center px-4">
        {/* Soft Daylight Backdrop Glow */}
        <div className="absolute inset-0 max-w-5xl mx-auto rounded-3xl bg-gradient-to-b from-blue-50/80 via-sky-50/50 to-amber-50/30 blur-3xl -z-10 pointer-events-none" />

        {/* Main Cinematic Frame Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[620px] rounded-3xl overflow-hidden shadow-[0_45px_100px_rgba(0,59,149,0.22)] border border-white/90 bg-slate-900 flex items-center justify-center group"
        >
          {/* Render Active Sequence Frame with smooth crossfade */}
          {CINEMATIC_FRAMES.map((src, index) => (
            <img
              key={src + index}
              src={src}
              alt={`SensAI Cinematic Frame ${index + 1}`}
              referrerPolicy="no-referrer"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-150 ease-out ${
                currentFrameIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-102 pointer-events-none'
              }`}
            />
          ))}

          {/* Subtle Gradient Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

          {/* Hotspot 1: SmartGRID Core */}
          <div className="absolute top-[38%] left-[32%] z-25">
            <button
              onClick={() => setActiveHotspot(activeHotspot === 'grid' ? null : 'grid')}
              className="relative group/btn cursor-pointer"
              title="SmartGRID™ Technology"
            >
              <span className="absolute -inset-2 rounded-full bg-blue-600/30 animate-ping" />
              <span className="relative w-8 h-8 rounded-full bg-white/95 border-2 border-[#003B95] text-[#003B95] flex items-center justify-center shadow-xl hover:bg-[#003B95] hover:text-white transition duration-300">
                <Cpu className="w-4 h-4" />
              </span>
            </button>
            {activeHotspot === 'grid' && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute left-1/2 -translate-x-1/2 bottom-11 w-60 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-2xl text-left z-30"
              >
                <div className="text-xs font-mono font-bold text-[#003B95] flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5" /> SmartGRID™ Core
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Over 4,000 hyper-elastic gel cells providing zero-pressure spinal alignment and thermal comfort.
                </p>
              </motion.div>
            )}
          </div>

          {/* Hotspot 2: Bamboo Silk Fabric */}
          <div className="absolute top-[52%] right-[28%] z-25">
            <button
              onClick={() => setActiveHotspot(activeHotspot === 'bamboo' ? null : 'bamboo')}
              className="relative group/btn cursor-pointer"
              title="SnowFrost Bamboo Silk"
            >
              <span className="absolute -inset-2 rounded-full bg-emerald-600/30 animate-ping" />
              <span className="relative w-8 h-8 rounded-full bg-white/95 border-2 border-emerald-600 text-emerald-700 flex items-center justify-center shadow-xl hover:bg-emerald-600 hover:text-white transition duration-300">
                <ShieldCheck className="w-4 h-4" />
              </span>
            </button>
            {activeHotspot === 'bamboo' && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute right-0 bottom-11 w-60 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-2xl text-left z-30"
              >
                <div className="text-xs font-mono font-bold text-emerald-700 flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> SnowFrost Bamboo Cover
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Hypoallergenic natural bamboo weave with active phase-change cooling yarns.
                </p>
              </motion.div>
            )}
          </div>

          {/* Bottom Floating Cinematic Scrub Indicator */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-4 py-2.5 rounded-2xl bg-white/90 backdrop-blur-md border border-white/70 shadow-lg text-xs font-mono text-slate-700 z-20">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-slate-900">Scroll to scrub camera dolly sequence</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-28 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#003B95] transition-all duration-75"
                  style={{ width: `${((currentFrameIndex + 1) / CINEMATIC_FRAMES.length) * 100}%` }}
                />
              </div>
              <span className="text-[11px] text-slate-600 font-mono font-bold">
                {String(currentFrameIndex + 1).padStart(2, '0')} / {CINEMATIC_FRAMES.length}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
