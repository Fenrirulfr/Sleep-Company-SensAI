import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExperiencePanel } from './ExperiencePanel';

gsap.registerPlugin(ScrollTrigger);

interface LayerHotspot {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  top: string;
  left: string;
  metrics?: Array<{ label: string; value: string | number; unit?: string }>;
}

const LAYER_HOTSPOTS: LayerHotspot[] = [
  {
    id: 'layer-2',
    badge: 'LAYER 01',
    title: 'Comfort Layer',
    subtitle: 'COMFORT LAYER',
    description: 'Provides an inviting cushioning surface that works in harmony with the layers below for a balanced sleep experience.',
    top: '22%',
    left: '72%',
  },
  {
    id: 'layer-3',
    badge: 'LAYER 02',
    title: 'SmartGRID®',
    subtitle: 'SMARTGRID® CORE',
    description: 'The signature SmartGRID® layer adapts to changing pressure, helping deliver responsive comfort while maintaining support where it is needed.',
    top: '37%',
    left: '72%',
  },
  {
    id: 'layer-4',
    badge: 'LAYER 03',
    title: 'Transition Layer',
    subtitle: 'TRANSITION LAYER',
    description: 'Helps each layer work together smoothly, creating a consistent and balanced feel across the mattress.',
    top: '52%',
    left: '72%',
  },
  {
    id: 'layer-5',
    badge: 'LAYER 04',
    title: 'Support Core',
    subtitle: 'SUPPORT CORE',
    description: 'A stable support structure that contributes to alignment and complements the adaptive comfort layers above.',
    top: '67%',
    left: '72%',
  },
  {
    id: 'layer-6',
    badge: 'LAYER 05',
    title: 'Foundation Base',
    subtitle: 'FOUNDATION BASE',
    description: 'Forms the durable foundation of the mattress, supporting the overall construction and long-term performance.',
    top: '82%',
    left: '72%',
  }
];

interface Act03Props {
  onOpenTrialModal?: () => void;
  progress?: number;
}

export function Act03SmartGrid({ onOpenTrialModal, progress = 0 }: Act03Props) {
  const [activeHotspot, setActiveHotspot] = useState<LayerHotspot>(LAYER_HOTSPOTS[2]); // Default SmartGRID
  const [hoveredHotspot, setHoveredHotspot] = useState<LayerHotspot | null>(null);

  const isInteractiveState = progress >= 0.85;
  const isAnyHovered = hoveredHotspot !== null;
  const displayedHotspot = hoveredHotspot || activeHotspot;

  const handleLayerClick = (index: number) => {
    setActiveHotspot(LAYER_HOTSPOTS[index]);
    const triggers = ScrollTrigger.getAll();
    const master = triggers.find(
      (t) => 
        (t.trigger as HTMLElement)?.id === 'cinematic-container' || 
        (t.vars as any)?.id === 'cinematic-container'
    ) || triggers[0];

    if (master) {
      const targetAct3Progs = [0.2, 0.4, 0.6, 0.8, 1.0];
      const globalP = 0.65 + targetAct3Progs[index] * 0.35;
      const targetScroll = master.start + globalP * (master.end - master.start);
      
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  const handleContinue = () => {
    const triggers = ScrollTrigger.getAll();
    const master = triggers.find(
      (t) => 
        (t.trigger as HTMLElement)?.id === 'cinematic-container' || 
        (t.vars as any)?.id === 'cinematic-container'
    ) || triggers[0];

    if (master) {
      const targetScroll = master.start + 1.0 * (master.end - master.start) + 200;
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="act-03"
      className="relative w-full h-screen flex flex-col justify-between overflow-hidden bg-transparent"
      aria-label="Inside SensAI Discovery"
    >
      {/* Soft navy reflections in the background changing subtly based on interaction */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-500 ease-out z-0"
        style={{
          background: isAnyHovered 
            ? 'radial-gradient(circle at 50% 50%, rgba(0, 59, 149, 0.08) 0%, rgba(255,255,255,0) 70%)'
            : 'radial-gradient(circle at 50% 50%, rgba(0, 59, 149, 0.04) 0%, rgba(255,255,255,0) 70%)',
        }}
      />

      {/* Main Responsive Experience Grid */}
      <div className="relative w-full h-full flex flex-col justify-between p-6 md:p-12 lg:px-20 lg:py-16 select-none z-10 pointer-events-none">
        
        {/* TOP: Editorial content column */}
        <div className="w-full lg:max-w-xl pointer-events-auto mt-2 md:mt-4">
          <div className="flex items-center gap-3 mb-2">
            <span 
              className="text-[13px] font-mono uppercase tracking-[0.2em] text-[#003B95] font-semibold"
              id="inside-label"
            >
              INSIDE SENSAI
            </span>
            <span className="w-8 h-[1px] bg-[#003B95]/30" />
            <span className="text-[11px] font-sans tracking-wide text-slate-400 uppercase">
              Interactive product visualization
            </span>
          </div>
          <h2 className="text-2xl md:text-[46px] md:leading-[1.1] font-semibold tracking-tight text-[#2E2E2E] font-serif">
            Every layer has a purpose.<br />
            Every night benefits from it.
          </h2>
          <p className="text-xs md:text-[16px] text-slate-500 mt-3 leading-relaxed max-w-[500px]">
            Premium comfort is created through thoughtful construction. Explore each layer to understand how carefully selected materials work together to deliver the SensAI experience.
          </p>
        </div>



        {/* BOTTOM / EXTREME RIGHT: Experience Panel container + Editorial CTA */}
        <div className="w-full flex flex-col lg:absolute lg:right-16 lg:bottom-16 lg:w-[420px] gap-4 pointer-events-auto z-30 mt-auto">
          <AnimatePresence mode="wait">
            {isInteractiveState && (
              <motion.div
                key={displayedHotspot.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <ExperiencePanel
                  badge={displayedHotspot.badge}
                  title={displayedHotspot.title}
                  subtitle={displayedHotspot.subtitle}
                  description={displayedHotspot.description}
                  metrics={displayedHotspot.metrics}
                  className="w-full shadow-2xl rounded-[24px] bg-white/94 backdrop-blur-[24px] border border-slate-100"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Editorial CTA */}
          <AnimatePresence>
            {isInteractiveState && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl border border-slate-200/60 shadow-lg w-full"
              >
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-0.5">NEXT CHAPTER</p>
                  <h5 className="text-sm font-serif font-medium text-slate-900">Experience how it adapts to you.</h5>
                </div>
                <button
                  onClick={handleContinue}
                  className="px-6 py-2.5 rounded-xl bg-[#003B95] text-white text-xs font-sans font-medium tracking-wide hover:bg-[#002d73] transition-all duration-300 shadow-sm hover:shadow active:scale-95"
                >
                  Continue
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Floating Hotspots layer (Fade in cleanly as soon as Frame 10 is reached) */}
      <AnimatePresence>
        {isInteractiveState && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-20 pointer-events-none"
          >
            {LAYER_HOTSPOTS.map((layer, idx) => {
              const isHovered = hoveredHotspot?.id === layer.id;
              const isSelected = activeHotspot.id === layer.id;
              const isCurrent = displayedHotspot.id === layer.id;

              return (
                <button
                  key={`hotspot-${layer.id}`}
                  onMouseEnter={() => setHoveredHotspot(layer)}
                  onMouseLeave={() => setHoveredHotspot(null)}
                  onClick={() => handleLayerClick(idx)}
                  onFocus={() => setHoveredHotspot(layer)}
                  onBlur={() => setHoveredHotspot(null)}
                  className="absolute pointer-events-auto group focus:outline-none -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                  style={{ 
                    top: layer.top, 
                    left: layer.left,
                    opacity: isAnyHovered ? (isHovered ? 1 : 0.4) : (isSelected ? 1 : 0.75),
                    transform: `translate3d(-50%, -50%, 0) scale(${isHovered ? 1.15 : 1})`,
                    transition: 'opacity 300ms cubic-bezier(0.25, 1, 0.5, 1), transform 300ms cubic-bezier(0.25, 1, 0.5, 1)'
                  }}
                  aria-label={`View details of ${layer.title}`}
                >
                  <div className="relative flex items-center justify-center w-12 h-12">
                    {/* Soft ambient layer illumination behind current hotspot */}
                    <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
                      isCurrent ? 'bg-[#003B95]/15 blur-md scale-125' : 'bg-transparent'
                    }`} />

                    {/* Outer slow luxury pulsing ring */}
                    <motion.div
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.6, 0.15, 0.6]
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute w-8 h-8 rounded-full border border-[#003B95]/30"
                    />

                    {/* Interactive dot core with focus outline */}
                    <div className={`w-3.5 h-3.5 rounded-full transition-all duration-300 flex items-center justify-center ${
                      isCurrent 
                        ? 'bg-[#003B95] ring-4 ring-[#003B95]/20' 
                        : 'bg-slate-400 group-hover:bg-[#003B95] group-focus-visible:ring-4 group-focus-visible:ring-[#003B95]/40'
                    }`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>


                  </div>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
