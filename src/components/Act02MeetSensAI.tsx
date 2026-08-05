import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExperiencePanel } from './ExperiencePanel';

gsap.registerPlugin(ScrollTrigger);

interface HotspotData {
  id: string;
  top: string;
  left: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  metrics: Array<{ label: string; value: string | number; unit?: string }>;
}

const CRAFTSMANSHIP_HOTSPOTS: HotspotData[] = [
  {
    id: 'fabric',
    top: '32%',
    left: '46%',
    badge: 'TACTILE ELEGANCE',
    title: 'Premium Knit Fabric',
    subtitle: 'BESPOKE TEXTILE',
    description: 'Woven with ultra-fine high-density fibers for a supple, breathable surface that invites touch while retaining pristine, long-lasting structure.',
    metrics: [
      { label: 'Thread Quality', value: 'Ultra-Fine' },
      { label: 'Handfeel', value: 'Silk-Touch' }
    ]
  },
  {
    id: 'stitching',
    top: '48%',
    left: '58%',
    badge: 'EXQUISITE DETAIL',
    title: 'Precision Stitching',
    subtitle: 'TAILORED QUILTING',
    description: 'Micro-stepped geometric quilting creates balanced tension distribution across every seam and a subtle signature motif.',
    metrics: [
      { label: 'Quilting Pattern', value: 'Geometric' },
      { label: 'Tension', value: 'Balanced' }
    ]
  },
  {
    id: 'edge',
    top: '64%',
    left: '35%',
    badge: 'STRUCTURAL POISE',
    title: 'Reinforced Edge Finish',
    subtitle: 'ARCHITECTURAL BINDING',
    description: 'Hand-finished side piping provides elegant structural containment, preventing roll-off while defining a crisp, tailored silhouette.',
    metrics: [
      { label: 'Perimeter Support', value: 'Full-360°' },
      { label: 'Craft Finish', value: 'Hand-Piped' }
    ]
  },
  {
    id: 'surface',
    top: '38%',
    left: '68%',
    badge: 'LUSTROUS WEAVE',
    title: 'Premium Surface Finish',
    subtitle: 'PLUSH REFLECTION',
    description: 'Subtle sheen and architectural light interaction showcase the depth, soft contours, and timeless refinement of luxury materials.',
    metrics: [
      { label: 'Light Diffusion', value: 'Soft-Matte' },
      { label: 'Finish Type', value: 'Luxury Plush' }
    ]
  }
];

export function Act02MeetSensAI({ progress: customProgress }: { progress?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [internalProgress, setInternalProgress] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<HotspotData>(CRAFTSMANSHIP_HOTSPOTS[0]);

  const progress = customProgress !== undefined ? customProgress : internalProgress;

  useEffect(() => {
    if (progress < 0.25) {
      setActiveHotspot(CRAFTSMANSHIP_HOTSPOTS[0]);
    } else if (progress < 0.5) {
      setActiveHotspot(CRAFTSMANSHIP_HOTSPOTS[1]);
    } else if (progress < 0.75) {
      setActiveHotspot(CRAFTSMANSHIP_HOTSPOTS[2]);
    } else {
      setActiveHotspot(CRAFTSMANSHIP_HOTSPOTS[3]);
    }
  }, [progress]);

  useEffect(() => {
    if (customProgress !== undefined) return;
    if (!containerRef.current) return;

    let tl: gsap.core.Timeline | null = null;
    const timer = setTimeout(() => {
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          scrub: true,
          pin: true,
          anticipatePin: 1,
          refreshPriority: 10,
          onUpdate: (self) => {
            setInternalProgress(self.progress);
          }
        }
      });
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, 50);

    return () => {
      clearTimeout(timer);
      if (tl) tl.kill();
    };
  }, [customProgress]);

  return (
    <section 
      id="act-02"
      ref={containerRef} 
      className="text-slate-900 font-sans relative bg-transparent w-full h-screen overflow-hidden z-10"
      aria-label="SensAI Craftsmanship Experience"
    >
      {/* Ambient Lighting Highlight */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-700 z-0"
        style={{
          background: 'radial-gradient(circle at 40% 40%, rgba(0, 59, 149, 0.03) 0%, rgba(255, 255, 255, 0) 60%)'
        }}
      />

      {/* Primary Interactive Hotspots Layer */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {CRAFTSMANSHIP_HOTSPOTS.map((hotspot) => {
          const isActive = activeHotspot.id === hotspot.id;
          return (
            <button
              key={hotspot.id}
              id={`hotspot-${hotspot.id}`}
              onClick={() => setActiveHotspot(hotspot)}
              onMouseEnter={() => setActiveHotspot(hotspot)}
              className="absolute group flex items-center justify-center transition-all duration-300 pointer-events-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#003B95] focus-visible:ring-offset-2 rounded-full"
              style={{
                top: hotspot.top,
                left: hotspot.left,
                transform: 'translate(-50%, -50%)',
                width: '48px',
                height: '48px',
              }}
              aria-label={`Explore ${hotspot.title}`}
            >

              

            </button>
          );
        })}
      </div>

      {/* Content & Craftsmanship Experience Overlay */}
      <div className="absolute inset-0 z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-12 flex items-center select-none pointer-events-none">
        
        {/* Editorial Content Column (Desktop: left col-span-5, mobile: full stack) */}
        <div className="w-full lg:max-w-[540px] max-w-xl pointer-events-auto text-left flex flex-col justify-center space-y-8">
          
          {/* Editorial Typography Header Block */}
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: progress > 0.04 ? 1 : 0, y: progress > 0.04 ? 0 : 10 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#003B95]" />
              <p 
                className="text-[14px] font-mono uppercase tracking-[0.2em] text-white font-semibold leading-none"
                style={{ color: '#ffffff' }}
              >
                CRAFTSMANSHIP
              </p>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: progress > 0.06 ? 1 : 0, y: progress > 0.06 ? 0 : 15 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-[32px] sm:text-[40px] lg:text-[56px] font-semibold font-serif tracking-tight text-slate-900 leading-[1.05]"
            >
              Luxury begins long before <span className="italic text-[#003B95] font-normal">you lie down.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: progress > 0.08 ? 1 : 0, y: progress > 0.08 ? 0 : 15 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[16px] sm:text-[17px] lg:text-[18px] text-[#2B2B2B] font-normal leading-[1.7] max-w-[520px]"
            >
              Crafted with thoughtful detail. Designed to feel premium before you even lie down.
            </motion.p>
          </div>

          {/* Floating Glass Experience Panel - beautifully aligned underneath */}
          <div className="w-full max-w-[420px] transition-all duration-300">
            <AnimatePresence mode="wait">
              {progress > 0.08 && (
                <motion.div
                  key={activeHotspot.id}
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ExperiencePanel
                    badge={activeHotspot.badge}
                    title={activeHotspot.title}
                    subtitle={activeHotspot.subtitle}
                    description={activeHotspot.description}
                    metrics={activeHotspot.metrics}
                    className="w-full"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}

