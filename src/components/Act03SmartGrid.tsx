import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExperiencePanel } from './ExperiencePanel';

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
  const [activeHotspot, setActiveHotspot] = useState<LayerHotspot>(LAYER_HOTSPOTS[1]); // Default SmartGRID
  const [hoveredHotspot, setHoveredHotspot] = useState<LayerHotspot | null>(null);

  const isInteractiveState = progress >= 0.85;
  const isAnyHovered = hoveredHotspot !== null;
  const displayedHotspot = hoveredHotspot || activeHotspot;

  const handleLayerClick = (index: number) => {
    setActiveHotspot(LAYER_HOTSPOTS[index]);
  };

  return (
    <section 
      id="act-03"
      className="relative w-full min-h-screen lg:h-screen flex flex-col justify-between overflow-y-auto lg:overflow-hidden bg-transparent py-12 lg:py-0"
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
      <div className="relative w-full h-full flex flex-col lg:grid lg:grid-cols-12 justify-between px-6 md:px-12 lg:px-20 lg:py-16 select-none z-10 pointer-events-none gap-8 lg:gap-12 items-center">
        
        {/* LEFT COLUMN: Editorial content & Layer Feature Navigator (Col 5 on Desktop) */}
        <div className="w-full lg:col-span-5 pointer-events-auto flex flex-col justify-center mt-4 lg:mt-0">
          <div className="flex items-center gap-3 mb-2 md:mb-3">
            <span 
              className="text-xs md:text-[13px] lg:text-[14px] font-mono uppercase tracking-[0.2em] text-[#003B95] font-semibold"
              id="inside-label"
            >
              INSIDE SENSAI
            </span>
            <span className="w-8 h-[1px] bg-[#003B95]/30" />
            <span className="text-[11px] font-sans tracking-wide text-slate-400 uppercase hidden sm:inline">
              Interactive Visualization
            </span>
          </div>

          <h2 className="text-headline">
            Every layer has a purpose.<br />
            Every night benefits from it.
          </h2>

          <p className="text-base md:text-lg lg:text-xl text-slate-600 mt-4 leading-relaxed max-w-[560px]">
            Premium comfort is created through thoughtful construction. Explore each layer to understand how carefully selected materials work together to deliver the SensAI experience.
          </p>
        </div>

        {/* RIGHT COLUMN / PANEL AREA (Col 7 on Desktop, Stacked on Tablet/Mobile) */}
        <div 
          className="w-full lg:col-span-7 flex flex-col justify-center items-center lg:items-end pointer-events-auto z-30 gap-6"
          aria-live="polite"
        >
          
          {/* Experience Panel Card */}
          <AnimatePresence mode="wait">
            {isInteractiveState && (
              <motion.div
                key={displayedHotspot.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-lg lg:w-[425px]"
              >
                <ExperiencePanel
                  badge={displayedHotspot.badge}
                  title={displayedHotspot.title}
                  subtitle={displayedHotspot.subtitle}
                  description={displayedHotspot.description}
                  metrics={displayedHotspot.metrics}
                  className="w-full shadow-2xl rounded-[20px] lg:rounded-[24px] bg-white/95 backdrop-blur-[24px] border border-slate-200/80 p-5 md:p-6"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Floating Hotspots layer over background sequence (Hidden on small screens where touch list is used, visible on laptop/desktop) */}
      <AnimatePresence>
        {isInteractiveState && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-20 pointer-events-none hidden lg:block"
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
                  className="absolute pointer-events-auto group focus:outline-none -translate-x-1/2 -translate-y-1/2 transition-all duration-300 min-w-[48px] min-h-[48px] flex items-center justify-center"
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

