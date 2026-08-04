import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollToAct } from '../utils/scrollHelper';
import { WebGLSequenceViewer } from './WebGLSequenceViewer';

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
  'https://lh3.googleusercontent.com/d/1dWDV5BMZwZv9RM3fD3VtJFcW1sn56t9U',
  'https://lh3.googleusercontent.com/d/1fYI5kArPmeVA85U62BorB31abUKBlfzV',
  'https://lh3.googleusercontent.com/d/1gdqu17C5TC7f9CVyvGmTQ2DkVJyQ1W2o',
  'https://lh3.googleusercontent.com/d/1oP5EDEv2VePxUZyOMwZsA1dLbq1obW87'
];

export function Act02MeetSensAI() {

  const [isPreloaded, setIsPreloaded] = useState(false);
  const [isExploring, setIsExploring] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // Parallax tracking
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Preload frames
  useEffect(() => {
    let active = true;
    const loadedImages: HTMLImageElement[] = [];
    let loaded = 0;

    SCENE_02_FRAMES.forEach((src, idx) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        if (!active) return;
        loadedImages[idx] = img;
        loaded += 1;
        if (loaded === SCENE_02_FRAMES.length) {
          imagesRef.current = loadedImages;
          setIsPreloaded(true);
        }
      };
      img.onerror = () => {
        if (!active) return;
        loaded += 1;
        if (loaded === SCENE_02_FRAMES.length) {
          imagesRef.current = loadedImages;
          setIsPreloaded(true);
        }
      };
    });

    return () => {
      active = false;
    };
  }, []);

  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const x = (e.clientX - w / 2) / (w / 2);
      const y = (e.clientY - h / 2) / (h / 2);
      setMousePos({ x: x * 15, y: y * 15 });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    let tl: gsap.core.Timeline | null = null;
    const timer = setTimeout(() => {
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=350%',
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

  // Typography Timings for Scene 02
  
  // Title (The Introduction): 5%-25%
  let headlineOpacity = 0;
  if (progress > 0.02 && progress < 0.12) {
    headlineOpacity = (progress - 0.02) / (0.12 - 0.02);
  } else if (progress >= 0.12 && progress <= 0.85) {
    headlineOpacity = 1;
  } else if (progress > 0.85 && progress < 0.95) {
    headlineOpacity = 1 - (progress - 0.85) / (0.95 - 0.85);
  }

  // Body Copy (The Context): 15%-35%
  let bodyOpacity = 0;
  if (progress > 0.10 && progress < 0.25) {
    bodyOpacity = (progress - 0.10) / (0.25 - 0.10);
  } else if (progress >= 0.25 && progress <= 0.85) {
    bodyOpacity = 1;
  } else if (progress > 0.85 && progress < 0.95) {
    bodyOpacity = 1 - (progress - 0.85) / (0.95 - 0.85);
  }

  // Feature Breakdown (Quadrant-based reveals)
  
  // Card 1: Top Right Quadrant (Focus on Grid)
  let card1Opacity = 0;
  if (progress > 0.40 && progress < 0.50) {
    card1Opacity = (progress - 0.40) / (0.50 - 0.40);
  } else if (progress >= 0.50 && progress <= 0.85) {
    card1Opacity = 1;
  } else if (progress > 0.85 && progress < 0.95) {
    card1Opacity = 1 - (progress - 0.85) / (0.95 - 0.85);
  }

  // Card 2: Bottom Left Quadrant (Focus on Support)
  let card2Opacity = 0;
  if (progress > 0.55 && progress < 0.65) {
    card2Opacity = (progress - 0.55) / (0.65 - 0.55);
  } else if (progress >= 0.65 && progress <= 0.85) {
    card2Opacity = 1;
  } else if (progress > 0.85 && progress < 0.95) {
    card2Opacity = 1 - (progress - 0.85) / (0.95 - 0.85);
  }

  // Card 3: Bottom Right Quadrant (Final Detail)
  let card3Opacity = 0;
  if (progress > 0.70 && progress < 0.80) {
    card3Opacity = (progress - 0.70) / (0.80 - 0.70);
  } else if (progress >= 0.80 && progress <= 0.85) {
    card3Opacity = 1;
  } else if (progress > 0.85 && progress < 0.95) {
    card3Opacity = 1 - (progress - 0.85) / (0.95 - 0.85);
  }

  // Hotspot: Appears at the end of the scene
  let hotspotOpacity = 0;
  if (progress > 0.85 && progress < 0.90) {
    hotspotOpacity = (progress - 0.85) / (0.90 - 0.85);
  } else if (progress >= 0.90) {
    hotspotOpacity = 1;
  }

  const handleExplore = () => {
    setIsExploring(true);
    setTimeout(() => {
      scrollToAct('act-03');
    }, 600);
  };

  return (
    <div id="act-02" className="text-slate-900 font-sans selection:bg-[#003B95] selection:text-white relative">
      {!isPreloaded && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-2 border-slate-200 border-t-[#003B95] rounded-full animate-spin mb-4" />
          <p className="text-xs font-mono tracking-widest text-slate-500 uppercase">
            Loading SensAI Dynamics...
          </p>
        </div>
      )}

      {/* Single Section: Hero Experience */}
      <section 
        ref={containerRef} 
        className="relative w-full h-screen overflow-hidden z-10"
        aria-label="SensAI Adaptive Technology Experience"
      >
        
          {/* Background Canvas */}
          <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
            <div 
              className="w-full h-full transform origin-center transition-transform duration-300 ease-out"
              style={{
                transform: `scale(${1 + (progress < 0.1 ? (0.1 - progress) * 0.1 : 0) * (isExploring ? 1.05 : 1)})`,
                filter: isExploring ? 'brightness(0.9) contrast(1.05)' : 'none'
              }}
            >
              <WebGLSequenceViewer urls={SCENE_02_FRAMES} progress={progress} />
            </div>
            {/* Subtle light ambient overlay for parallax */}
            <div 
              className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-300" 
              style={{
                background: `radial-gradient(circle at ${50 + mousePos.x}%, ${50 + mousePos.y}%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)`,
                opacity: 0.5
              }}
            />
          </div>

          {/* Interactive Layer */}
          <div className="absolute inset-0 z-10 pointer-events-none select-none">
            
            {/* Spatial Layout: Narrative frames the product */}
            <div className="absolute inset-0 flex flex-col md:flex-row justify-between p-[6%] md:p-[8%] pointer-events-none">
              
              {/* Left Column: Narrative Intro */}
              <div 
                className="w-full md:w-[35%] flex flex-col justify-start pt-[4vh] md:pt-[8vh] gap-8"
                style={{ transform: prefersReducedMotion ? 'none' : `translate(${mousePos.x * 0.15}px, ${mousePos.y * 0.15}px)` }}
              >
                <motion.div style={{ opacity: headlineOpacity }}>
                  <h1 className="text-5xl sm:text-7xl lg:text-8xl font-light font-serif-editorial tracking-tight text-slate-900 leading-[0.9] drop-shadow-[0_0_40px_rgba(255,255,255,0.8)]">
                    Adaptive <br />
                    <span className="italic font-normal text-[#003B95]">Intelligence.</span>
                  </h1>
                </motion.div>
                
                <motion.div style={{ opacity: bodyOpacity }} className="max-w-[320px]">
                  <p className="text-lg sm:text-xl font-light text-slate-800 leading-relaxed bg-white/10 backdrop-blur-sm rounded-lg">
                    SensAI mirrors your movement. Every shift is met with instant relief through our patented SmartGRID technology.
                  </p>
                </motion.div>

                {/* Card 2: Moved to left column for better balance */}
                <motion.div 
                  style={{ 
                    opacity: card2Opacity, 
                    x: prefersReducedMotion ? 0 : (card2Opacity - 1) * 30,
                  }}
                  className="mt-auto hidden md:block max-w-[280px]"
                  role="region"
                  aria-label="Personalization and Firmness Detail"
                >
                  <div className="bg-white/40 backdrop-blur-3xl border border-white/60 shadow-[0_20px_40px_rgba(0,0,0,0.04)] rounded-3xl p-6 lg:p-8">
                    <span className="text-[9px] tracking-[0.3em] font-bold uppercase text-[#003B95] block mb-3">Personalization</span>
                    <h3 className="text-xl lg:text-2xl font-serif-editorial italic text-slate-900 mb-2">Firmness Control</h3>
                    <p className="text-xs lg:text-sm text-slate-600 leading-relaxed font-light">
                      Dual-zone adjustment for tailored support where you need it most.
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Technical Details */}
              <div className="w-full md:w-[30%] flex flex-col justify-between items-end pb-[4vh] md:pb-[8vh]">
                
                {/* Card 1: Top Right */}
                <motion.div 
                  style={{ 
                    opacity: card1Opacity, 
                    x: prefersReducedMotion ? 0 : (1 - card1Opacity) * 30,
                    transform: prefersReducedMotion ? 'none' : `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)`
                  }}
                  className="max-w-[280px] self-end"
                  role="region"
                  aria-label="SmartGRID Technology Detail"
                >
                  <div className="bg-white/40 backdrop-blur-3xl border border-white/60 shadow-[0_20px_40px_rgba(0,0,0,0.04)] rounded-3xl p-6 lg:p-8">
                    <span className="text-[9px] tracking-[0.3em] font-bold uppercase text-[#003B95] block mb-3">Core Tech</span>
                    <h3 className="text-xl lg:text-2xl font-serif-editorial italic text-slate-900 mb-2">SmartGRID</h3>
                    <p className="text-xs lg:text-sm text-slate-600 leading-relaxed font-light">
                      2500+ air channels for superior airflow and temperature neutrality.
                    </p>
                  </div>
                </motion.div>

                {/* Card 3: Bottom Right */}
                <motion.div 
                  style={{ 
                    opacity: card3Opacity, 
                    y: prefersReducedMotion ? 0 : (1 - card3Opacity) * 30,
                    transform: prefersReducedMotion ? 'none' : `translate(${mousePos.x * 0.6}px, ${mousePos.y * 0.6}px)`
                  }}
                  className="max-w-[320px] self-end"
                  role="region"
                  aria-label="Restorative Sleep Results"
                >
                  <div className="bg-[#003B95]/5 backdrop-blur-3xl border border-[#003B95]/20 shadow-[0_32px_64px_rgba(0,0,0,0.06)] rounded-3xl p-6 lg:p-8">
                    <span className="text-[9px] tracking-[0.3em] font-bold uppercase text-[#003B95] block mb-3">Result</span>
                    <h3 className="text-xl lg:text-2xl font-serif-editorial text-slate-900 mb-2">Restorative Sleep</h3>
                    <p className="text-xs lg:text-sm text-slate-900/80 leading-relaxed font-light">
                      Optimized spinal alignment leads to deeper REM cycles and faster recovery.
                    </p>
                  </div>
                </motion.div>
              </div>

            </div>

            {/* Mobile-only Card 2 (since it's hidden in the column above) */}
            <motion.div 
              style={{ opacity: card2Opacity }}
              className="absolute bottom-[25vh] left-[6%] right-[6%] md:hidden pointer-events-none"
            >
               <div className="bg-white/60 backdrop-blur-3xl border border-white shadow-[0_20px_40px_rgba(0,0,0,0.05)] rounded-2xl p-6">
                <span className="text-[8px] tracking-[0.3em] font-bold uppercase text-[#003B95] block mb-2">Personalization</span>
                <h3 className="text-lg font-serif-editorial italic text-slate-900">Firmness Control</h3>
              </div>
            </motion.div>

            {/* Explore Layers Hotspot */}
            <motion.div
              style={{ 
                opacity: hotspotOpacity,
                display: progress > 0.85 ? 'flex' : 'none'
              }}
              className="absolute bottom-[15vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 pointer-events-auto"
            >
              <button
                onClick={handleExplore}
                className="group relative px-8 py-4 bg-white/90 backdrop-blur-xl border border-[#003B95]/20 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.15)] transition-all duration-500 overflow-hidden"
              >
                <div className="relative z-10 flex items-center gap-3 text-[#003B95] font-semibold tracking-wide">
                  <span>Explore Layers</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    →
                  </motion.span>
                </div>
                <div className="absolute inset-0 bg-[#003B95] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <div className="absolute inset-0 bg-white group-hover:hidden" />
                <span className="absolute inset-0 flex items-center justify-center text-white font-semibold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Explore Layers →
                </span>
              </button>
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#003B95]/60 font-bold">Peer Inside the Technology</p>
            </motion.div>

          </div>
      </section>

    </div>
  );
}
