import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WebGLSequenceViewer } from './WebGLSequenceViewer';
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
}

export function Act03SmartGrid({ onOpenTrialModal }: Act03Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isHoveringGrid, setIsHoveringGrid] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<LayerHotspot>(LAYER_HOTSPOTS[1]);

  useEffect(() => {
    if (!sectionRef.current) return;

    let tl: gsap.core.Timeline | null = null;
    const timer = setTimeout(() => {
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=350%',
          pin: true,
          scrub: true,
          anticipatePin: 1,
          refreshPriority: 5,
          onUpdate: (self) => {
            setProgress(self.progress);
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
  }, []);

  return (
    <section 
      id="act-03"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-white"
      aria-label="Inside SmartGRID Discovery"
    >
      {/* Background WebGL Viewport (Fabric lifts as you scroll) */}
      <div 
        className={`absolute inset-0 z-0 transition-all duration-700 ${
          isHoveringGrid ? 'scale-[1.02] brightness-105' : 'scale-100'
        }`}
        onMouseEnter={() => setIsHoveringGrid(true)}
        onMouseLeave={() => setIsHoveringGrid(false)}
      >
        <WebGLSequenceViewer urls={SMARTGRID_SEQUENCE} progress={progress} />
      </div>

      {/* Discovery Canvas Overlay */}
      <div className="absolute inset-0 z-10 p-6 md:p-12 lg:p-16 flex flex-col justify-between pointer-events-none">
        
        {/* Header Title */}
        <div className="max-w-xl pointer-events-auto">
          <p className="text-xs font-mono uppercase tracking-widest text-[#003B95] mb-2 font-semibold">
            Inside the Core
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light font-serif tracking-tight text-slate-900 leading-tight">
            Patented <span className="italic text-[#003B95]">SmartGRID®</span> technology.
          </h2>
          <p className="text-sm text-slate-500 mt-2 font-mono uppercase tracking-wider">
            {progress < 0.2 ? 'Scroll to lift the cover' : isHoveringGrid ? 'Hovering Internal Core' : 'Select a hotspot to explore'}
          </p>
        </div>

        {/* Hotspots over layers */}
        {progress > 0.25 && (
          <div className="absolute inset-0 pointer-events-auto">
            {LAYER_HOTSPOTS.map((hotspot) => {
              const isActive = activeHotspot.id === hotspot.id;
              return (
                <button
                  key={hotspot.id}
                  onClick={() => setActiveHotspot(hotspot)}
                  onMouseEnter={() => setActiveHotspot(hotspot)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none group"
                  style={{ top: hotspot.top, left: hotspot.left }}
                  aria-label={`Explore ${hotspot.title}`}
                >
                  <span className="relative flex h-9 w-9 items-center justify-center">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                      isActive ? 'bg-[#003B95]/40' : 'bg-slate-400/20'
                    }`} />
                    <span className={`relative inline-flex items-center justify-center rounded-full h-5 w-5 text-[10px] font-mono font-bold transition-all duration-300 ${
                      isActive ? 'bg-[#003B95] text-white scale-125' : 'bg-white text-slate-700 border border-slate-300 group-hover:scale-110'
                    }`}>
                      +
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Floating Reusable Experience Panel */}
        <div className="self-end w-full max-w-md pointer-events-auto">
          {progress > 0.3 && (
            <ExperiencePanel
              badge={activeHotspot.badge}
              title={activeHotspot.title}
              subtitle={activeHotspot.subtitle}
              description={activeHotspot.description}
              metrics={activeHotspot.metrics}
            />
          )}
        </div>

      </div>
    </section>
  );
}
