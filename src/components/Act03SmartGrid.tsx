import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus } from 'lucide-react';
import { WebGLSequenceViewer } from './WebGLSequenceViewer';

gsap.registerPlugin(ScrollTrigger);

const SMARTGRID_SEQUENCE = [
  'https://lh3.googleusercontent.com/d/1oP5EDEv2VePxUZyOMwZsA1dLbq1obW87', // Seamless match with the final image of Section 02
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

interface Act03SmartGridProps {
  onOpenTrialModal?: () => void;
}

const HOTSPOTS = [
  { 
    id: 'comfort', 
    label: 'Comfort Layer', 
    yOffset: -12, // approximate vertical position on the canvas relative to center
    xOffset: -8,
    title: 'Cloud Layer', 
    desc: 'High-density comfort foam that provides initial plushness without compromising on durability.' 
  },
  { 
    id: 'smartgrid', 
    label: 'SmartGRID®', 
    yOffset: 4, 
    xOffset: 0,
    title: 'SmartGRID® Core', 
    desc: 'Our patented hyper-elastic polymer grid that adapts dynamically to your body\'s shape, allowing absolute airflow.' 
  },
  { 
    id: 'support', 
    label: 'Support Base', 
    yOffset: 20, 
    xOffset: 12,
    title: 'Support Base', 
    desc: 'A robust foundation layer that ensures structural integrity and long-lasting spinal alignment.' 
  },
];

export function Act03SmartGrid({ onOpenTrialModal }: Act03SmartGridProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const prefersReducedMotion = useReducedMotion();
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  const [isHovered, setIsHovered] = useState(false);

  // Mouse Parallax Effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) / 40;
      const moveY = (clientY - window.innerHeight / 2) / 40;
      setMousePos({ x: moveX, y: moveY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);  // Preload images immediately on mount
  useEffect(() => {
    SMARTGRID_SEQUENCE.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    let tl: gsap.core.Timeline | null = null;
    const timer = setTimeout(() => {
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=350%', // 3.5x height for comfortable scroll
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

  // Derived state
  const isRevealed = progress > 0.65;
  const showIntro = progress < 0.2;
  const activeHotspotData = HOTSPOTS.find(h => h.id === activeLayer);

  return (
    <section 
      id="act-03"
      ref={sectionRef} 
      className="relative w-full h-screen overflow-hidden bg-white"
      aria-label="Inside SmartGRID Section"
    >
      {/* Background Canvas */}
      <div 
        className="absolute inset-0 z-0 transition-transform duration-[2s] ease-out"
        style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <WebGLSequenceViewer urls={SMARTGRID_SEQUENCE} progress={Math.min(1, Math.max(0, progress / 0.7))} />
      </div>

      {/* Intro Narrative */}
      <div className="absolute inset-0 z-10 pointer-events-none select-none flex items-center justify-center">
        <AnimatePresence>
          {showIntro && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="text-center"
              style={{ transform: prefersReducedMotion ? 'none' : `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)` }}
            >
              <p className="text-[10px] tracking-[0.3em] font-semibold uppercase text-[#003B95] mb-6">Discover SmartGRID®</p>
              <h2 className="text-4xl sm:text-5xl font-light text-slate-800 mb-8 font-serif-editorial">
                Scroll to Uncover
              </h2>
              <div className="w-[1px] h-16 bg-gradient-to-b from-slate-400 to-transparent mx-auto animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Interactive Hotspots Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <AnimatePresence>
          {isRevealed && HOTSPOTS.map((hotspot, idx) => {
            const isActive = activeLayer === hotspot.id;
            return (
              <motion.div
                key={hotspot.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute pointer-events-auto"
                style={{
                  top: `calc(50% + ${hotspot.yOffset}%)`,
                  left: `calc(50% + ${hotspot.xOffset}%)`,
                  transform: prefersReducedMotion ? 'translate(-50%, -50%)' : `translate(calc(-50% + ${mousePos.x * 0.2}px), calc(-50% + ${mousePos.y * 0.2}px))`
                }}
              >
                <button
                  onMouseEnter={() => setActiveLayer(hotspot.id)}
                  onClick={() => setActiveLayer(isActive ? null : hotspot.id)}
                  className="relative group p-4"
                  aria-label={`Explore ${hotspot.label}`}
                >
                  <div className={`absolute inset-0 rounded-full transition-all duration-700 blur-md ${isActive ? 'bg-[#003B95]/30 scale-150' : 'bg-[#003B95]/0 group-hover:bg-[#003B95]/20 group-hover:scale-125'}`} />
                  <div className={`relative w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 shadow-xl backdrop-blur-md overflow-hidden ${isActive ? 'border-[#003B95] bg-[#003B95] text-white scale-110' : 'border-slate-300 bg-white/70 text-slate-700 hover:border-[#003B95] hover:text-[#003B95]'}`}>
                     <Plus className={`w-4 h-4 transition-transform duration-500 ${isActive ? 'rotate-45' : ''}`} />
                  </div>
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-600 drop-shadow-[0_2px_4px_rgba(255,255,255,1)]">
                      {hotspot.label}
                    </span>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Floating Information Panel */}
      <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-end pr-[5%] md:pr-[12%]">
        <AnimatePresence mode="wait">
          {activeHotspotData && (
            <motion.div
              key={activeHotspotData.id}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-[340px] bg-white/40 backdrop-blur-3xl border border-white/40 shadow-[0_40px_80px_rgba(0,0,0,0.05)] rounded-[24px] p-8 pointer-events-auto"
            >
              <div className="w-8 h-[1px] bg-[#003B95] mb-6" />
              <h3 className="text-2xl font-serif-editorial text-slate-900 mb-4 font-light">
                {activeHotspotData.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-light mb-8">
                {activeHotspotData.desc}
              </p>
              
              <button 
                onClick={onOpenTrialModal}
                className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#003B95] hover:text-slate-900 transition-colors flex items-center gap-2 group"
              >
                Learn More 
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  );
}
