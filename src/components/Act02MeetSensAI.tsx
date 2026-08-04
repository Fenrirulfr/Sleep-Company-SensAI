import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WebGLSequenceViewer } from './WebGLSequenceViewer';
import { ExperiencePanel } from './ExperiencePanel';

gsap.registerPlugin(ScrollTrigger);

const SCENE_02_FRAMES = [
  'https://lh3.googleusercontent.com/d/18yOY5F-D67OazSX9az_go_ZfUAVe-tcA',
  'https://lh3.googleusercontent.com/d/1DOwxqqYGhlBoP24_kbRIJaBicTOAs34E',
  'https://lh3.googleusercontent.com/d/1HR-faFz4YHIWRklxnWvCvM-yxmK_6Now',
  'https://lh3.googleusercontent.com/d/1JHicuyS9Q09yEByNDFjZzsw6yJnASfIr',
  'https://lh3.googleusercontent.com/d/1JbK7Vh4MLa1k8MoDq98ljtQIsyvjPlzw',
  'https://lh3.googleusercontent.com/d/1O4IejPanmlWP1_xT_3S6bdTo7zlw7NKz',
  'https://lh3.googleusercontent.com/d/1OIc17ULcEn-ZyorPkMb-7uK0GD8DXfYB',
  'https://lh3.googleusercontent.com/d/1VBhoX6QFXmi391SGf8zAMlQ5u4pmQ_3w',
  'https://lh3.googleusercontent.com/d/1YLVH_1UcoJKZf2SIeJI8_8JaiBHnjoJa',
  'https://lh3.googleusercontent.com/d/1_JwtZ6EYjoikpxl1K_A1Iwl6IGiUF14n',
  'https://lh3.googleusercontent.com/d/1cOPZR2IilXv2ZwhlARPMsoCmPevECu4c',
  'https://lh3.googleusercontent.com/d/1dWDV5BMZvZv9RM3fD3VtJFcW1sn56t9U',
  'https://lh3.googleusercontent.com/d/1fYI5kArPmeVA85U62BorB31abUKBlfzV',
  'https://lh3.googleusercontent.com/d/1gdqu17C5TC7f9CVyvGmTQ2DkVJyQ1W2o',
  'https://lh3.googleusercontent.com/d/1oP5EDEv2VePxUZyOMwZsA1dLbq1obW87'
];

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

const HOTSPOTS: HotspotData[] = [
  {
    id: 'grid',
    top: '38%',
    left: '48%',
    badge: 'CORE TECH',
    title: 'SmartGRID® Matrix',
    subtitle: 'HYPER-ELASTIC POLYMER',
    description: 'Instantly flexes under body weight to relieve pressure while maintaining structural support.',
    metrics: [
      { label: 'Air Channels', value: '2,500+' },
      { label: 'Pressure Relief', value: '80%', unit: 'more' }
    ]
  },
  {
    id: 'ergonomics',
    top: '52%',
    left: '35%',
    badge: 'PERSONALIZATION',
    title: 'Dual-Zone Ergonomics',
    subtitle: 'SPINAL ALIGNMENT',
    description: 'Adaptive firmness zones support lumbar curve and shoulders independently.',
    metrics: [
      { label: 'Support Zones', value: 'Dual' },
      { label: 'Motion Isolation', value: '100%' }
    ]
  },
  {
    id: 'quilt',
    top: '28%',
    left: '60%',
    badge: 'TACTILE LUXURY',
    title: 'Silk-Blend Cover',
    subtitle: 'MICRO-CLIMATE',
    description: 'Ultra-breathable Japanese quilted weave for ambient temperature regulation all night.',
    metrics: [
      { label: 'Cooling Airflow', value: 'Active' },
      { label: 'Touch Texture', value: 'Cloud' }
    ]
  }
];

export function Act02MeetSensAI() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<HotspotData>(HOTSPOTS[0]);

  useEffect(() => {
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
            setProgress(self.progress);
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
  }, []);

  return (
    <section 
      id="act-02"
      ref={containerRef} 
      className="text-slate-900 font-sans relative bg-white w-full h-screen overflow-hidden z-10"
      aria-label="SensAI Adaptive Technology Experience"
    >
        {/* Background WebGL Viewport */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <WebGLSequenceViewer urls={SCENE_02_FRAMES} progress={progress} />
        </div>

        {/* Content & Adaptive Experience Panel Overlay */}
        <div className="absolute inset-0 z-10 section-padding flex flex-col justify-between pointer-events-none">
          
          {/* Header & Editorial Title */}
          <div className="max-w-xl pointer-events-auto">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: progress > 0.05 ? 1 : 0, y: progress > 0.05 ? 0 : 10 }}
              className="text-xs font-mono uppercase tracking-widest text-[#003B95] mb-2 font-semibold"
            >
              Adaptive Intelligence
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: progress > 0.08 ? 1 : 0, y: progress > 0.08 ? 0 : 15 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light font-serif tracking-tight text-slate-900 leading-tight"
            >
              Comfort that learns <span className="italic text-[#003B95]">your body.</span>
            </motion.h2>
          </div>

          {/* Interactive Hotspots over Mattress */}
          {progress > 0.05 && progress < 0.95 && (
            <div className="absolute inset-0 pointer-events-auto">
              {HOTSPOTS.map((hotspot) => {
                const isActive = activeHotspot.id === hotspot.id;
                return (
                  <button
                    key={hotspot.id}
                    onMouseEnter={() => setActiveHotspot(hotspot)}
                    onClick={() => setActiveHotspot(hotspot)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none"
                    style={{ top: hotspot.top, left: hotspot.left }}
                    aria-label={`Inspect ${hotspot.title}`}
                  >
                    <span className={`relative flex h-8 w-8 items-center justify-center`}>
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                        isActive ? 'bg-[#003B95]/40' : 'bg-slate-400/20'
                      }`} />
                      <span className={`relative inline-flex rounded-full h-4 w-4 border-2 transition-all duration-300 ${
                        isActive ? 'bg-[#003B95] border-white scale-125' : 'bg-white border-[#003B95] group-hover:scale-110'
                      }`} />
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Floating Experience Panel (Single dynamic panel) */}
          <div className="self-end w-full max-w-md pointer-events-auto">
            {progress > 0.05 && (
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
