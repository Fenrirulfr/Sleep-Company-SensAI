import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExperiencePanel } from './ExperiencePanel';

gsap.registerPlugin(ScrollTrigger);

const SMARTGRID_SEQUENCE = [
  'https://lh3.googleusercontent.com/d/1oP5EDEv2VePxUZyOMwZsA1dLbq1obW87',
  'https://lh3.googleusercontent.com/d/10n3lKo87QXnwCePuEhXuY0FdXGkr1JYx',
  'https://lh3.googleusercontent.com/d/12e-mZGV6SMhGWR2nINlM4BtEigEzPWni',
  'https://lh3.googleusercontent.com/d/15a-AzWvAhf7VJWwqhdXQbope_JJt6GSc',
  'https://lh3.googleusercontent.com/d/1AGcZUVw5Dj33rHlsRSojjSC46tEQdUaz',
  'https://lh3.googleusercontent.com/d/1DI6z336en7R8w0vQMJAtKDiU3hFAtj7j',
  'https://lh3.googleusercontent.com/d/1NSB2BgMrjAVKTQszK4Qny3fmG2GpdChq',
  'https://lh3.googleusercontent.com/d/1WjKB8nmySFXBpM5fd5_rcbacN9UpGHJp',
  'https://lh3.googleusercontent.com/d/1ZL6ac4rDkcrj3rqrvCsDRvY0kFRFQ4bb',
  'https://lh3.googleusercontent.com/d/1ZffCCpdbzBBc547kBB--qeVyX3hl0dmj',
  'https://lh3.googleusercontent.com/d/1ak1glfepV5WT2yAGl0Y1QHzZhIJf-xw5',
  'https://lh3.googleusercontent.com/d/1c4tKWrnA9u7gWvKQife1u3j1R1gaa8ep',
  'https://lh3.googleusercontent.com/d/1liiySSBLEuMs9hkItOsFEdy2arLqeY7K',
  'https://lh3.googleusercontent.com/d/1o8AgIdeBxfB8sPr0ghV3SE0YF_Bc6gHD',
  'https://lh3.googleusercontent.com/d/1ulnUUHtHEywlWqAereRIO7tEezBROcVx'
];

interface LayerHotspot {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  top: string;
  left: string;
  metrics: Array<{ label: string; value: string | number; unit?: string }>;
}

const LAYER_HOTSPOTS: LayerHotspot[] = [
  {
    id: 'comfort',
    badge: 'LAYER 01',
    title: 'Plush Comfort Layer',
    subtitle: 'TACTILE SOFTNESS',
    description: 'High-resilience memory blend cushioning initial impact without sinking.',
    top: '38%',
    left: '42%',
    metrics: [
      { label: 'Density', value: 'Plush' },
      { label: 'Pressure Relief', value: 'High' }
    ]
  },
  {
    id: 'smartgrid',
    badge: 'LAYER 02',
    title: 'SmartGRID® Core',
    subtitle: 'PATENTED MATRIX',
    description: '2,500+ hyper-elastic polymer air cells dynamically contour to spinal geometry.',
    top: '50%',
    left: '52%',
    metrics: [
      { label: 'Airflow Channels', value: '2,500+' },
      { label: 'Flex Rate', value: 'Instant' }
    ]
  },
  {
    id: 'support',
    badge: 'LAYER 03',
    title: 'Support Base',
    subtitle: 'STRUCTURAL FOUNDATION',
    description: 'Ultra-durable ergonomic base ensuring zero sag and zero motion transfer.',
    top: '62%',
    left: '60%',
    metrics: [
      { label: 'Durability', value: '10+', unit: 'years' },
      { label: 'Motion Transfer', value: '0%' }
    ]
  }
];

interface Act03Props {
  onOpenTrialModal?: () => void;
  progress?: number;
}

export function Act03SmartGrid({ onOpenTrialModal, progress: customProgress }: Act03Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [internalProgress, setInternalProgress] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<LayerHotspot>(LAYER_HOTSPOTS[1]);

  const progress = customProgress !== undefined ? customProgress : internalProgress;

  useEffect(() => {
    if (progress < 0.35) {
      setActiveHotspot(LAYER_HOTSPOTS[0]);
    } else if (progress < 0.7) {
      setActiveHotspot(LAYER_HOTSPOTS[1]);
    } else {
      setActiveHotspot(LAYER_HOTSPOTS[2]);
    }
  }, [progress]);

  useEffect(() => {
    if (customProgress !== undefined) return;
    if (!sectionRef.current) return;

    let tl: gsap.core.Timeline | null = null;
    const timer = setTimeout(() => {
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: true,
          anticipatePin: 1,
          refreshPriority: 5,
          onUpdate: (self) => {
            setInternalProgress(self.progress);
          }
        }
      });
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, 60);

    return () => {
      clearTimeout(timer);
      if (tl) tl.kill();
    };
  }, [customProgress]);

  const handleLayerClick = (index: number) => {
    const triggers = ScrollTrigger.getAll();
    // Try to find the master container ScrollTrigger by id or trigger reference
    const master = triggers.find(
      (t) => 
        (t.trigger as HTMLElement)?.id === 'cinematic-container' || 
        (t.vars as any)?.id === 'cinematic-container'
    ) || triggers[0];

    if (master) {
      // Act 3 occupies progress from 0.65 to 1.0.
      // We map index 0, 1, 2 into points within this 0.65-1.0 progress block.
      const targetAct3Progs = [0.15, 0.50, 0.85];
      const globalP = 0.65 + targetAct3Progs[index] * 0.35;
      const targetScroll = master.start + globalP * (master.end - master.start);
      
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="act-03"
      ref={sectionRef}
      className="relative w-full h-screen flex items-center overflow-hidden bg-transparent"
      aria-label="Inside SmartGRID Discovery"
    >
      {/* Interactive pulsing visual hotspots layered over the 3D visual mattress */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {LAYER_HOTSPOTS.map((layer, idx) => {
          const isActive = activeHotspot.id === layer.id;
          return (
            <button
              key={`hotspot-${layer.id}`}
              onClick={() => handleLayerClick(idx)}
              className="absolute pointer-events-auto group focus:outline-none -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
              style={{ top: layer.top, left: layer.left }}
              title={`View ${layer.title}`}
            >
              <div className="relative flex items-center justify-center">
                {/* Outer pulsing ring */}
                <div className={`absolute w-9 h-9 rounded-full transition-all duration-500 ${
                  isActive 
                    ? 'bg-[#003B95]/20 animate-ping opacity-100 scale-125' 
                    : 'bg-slate-900/5 group-hover:bg-[#003B95]/10 group-hover:scale-110 opacity-60'
                }`} />
                {/* Secondary core ring */}
                <div className={`absolute w-6 h-6 rounded-full border transition-all duration-300 ${
                  isActive 
                    ? 'border-[#003B95] bg-white scale-110 shadow-lg shadow-slate-950/10' 
                    : 'border-slate-300 bg-white/90 group-hover:border-[#003B95]'
                }`} />
                {/* Center active dot */}
                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive ? 'bg-[#003B95]' : 'bg-slate-400 group-hover:bg-[#003B95]'
                }`} />
                
                {/* Floating Tooltip Label */}
                <div className={`absolute left-8 px-2.5 py-1 rounded-md bg-slate-900/90 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-white whitespace-nowrap transition-all duration-300 shadow-md ${
                  isActive 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-1'
                }`}>
                  {layer.title}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Discovery Canvas Overlay with split layout to prevent vertical cutting-off */}
      <div className="absolute inset-0 z-10 px-6 py-12 md:px-12 md:py-16 lg:px-20 lg:py-24 flex flex-col justify-between lg:grid lg:grid-cols-12 lg:items-center lg:gap-12 pointer-events-none">
        
        {/* Left Column: Header Title and Interactive Vertical Progress Stepper */}
        <div className="lg:col-span-5 flex flex-col h-full justify-between lg:justify-center lg:gap-12 pointer-events-auto">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#003B95] mb-2 font-semibold">
              Inside the Core
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-light font-serif tracking-tight text-slate-900 leading-tight">
              Patented <span className="italic text-[#003B95] font-normal">SmartGRID®</span> technology.
            </h2>
            <p className="text-sm text-slate-500 mt-2 font-mono uppercase tracking-wider">
              {progress < 0.2 ? 'Scroll to reveal internal core' : 'Adaptive comfort revealed layer by layer'}
            </p>
          </div>

          {/* Elegant Interactive Layer Sidebar Timeline */}
          <div className="hidden lg:flex flex-col gap-5 mt-6 relative pl-4 border-l border-slate-200/60">
            {LAYER_HOTSPOTS.map((layer, idx) => {
              const isActive = activeHotspot.id === layer.id;
              return (
                <button
                  key={`timeline-${layer.id}`}
                  onClick={() => handleLayerClick(idx)}
                  className="group text-left focus:outline-none transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    {/* Active Line Segment Dot */}
                    <div className="relative flex items-center justify-center mt-1">
                      <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        isActive 
                          ? 'bg-[#003B95] scale-125 ring-4 ring-[#003B95]/15' 
                          : 'bg-slate-300 group-hover:bg-[#003B95]/50'
                      }`} />
                    </div>
                    <div>
                      <p className={`text-[9px] font-mono tracking-widest transition-colors duration-300 uppercase ${
                        isActive ? 'text-[#003B95] font-semibold' : 'text-slate-400'
                      }`}>
                        {layer.badge}
                      </p>
                      <h4 className={`text-sm font-sans font-medium transition-colors duration-300 ${
                        isActive ? 'text-slate-950' : 'text-slate-500 group-hover:text-slate-800'
                      }`}>
                        {layer.title}
                      </h4>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Floating Reusable Experience Panel (Glass Box) */}
        <div className="lg:col-span-7 flex justify-end items-center h-full pointer-events-auto">
          <div className="w-full max-w-[440px] lg:self-center">
            <AnimatePresence mode="wait">
              {progress > 0.05 && (
                <motion.div
                  key={activeHotspot.id}
                  initial={{ opacity: 0, x: 20, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ExperiencePanel
                    badge={activeHotspot.badge}
                    title={activeHotspot.title}
                    subtitle={activeHotspot.subtitle}
                    description={activeHotspot.description}
                    metrics={activeHotspot.metrics}
                    className="w-full shadow-2xl"
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
