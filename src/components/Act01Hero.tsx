import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollToAct } from '../utils/scrollHelper';

gsap.registerPlugin(ScrollTrigger);

const MASTER_FRAMES = [
  'https://lh3.googleusercontent.com/d/10MJyg1cp5TkvallYg89DLB8MmGrwaX2L', // 0
  'https://lh3.googleusercontent.com/d/118Wstj2B83IhVDcrkScmIcWtlHM8I_7A', // 2
  'https://lh3.googleusercontent.com/d/17hghzl2lP7c5_7PMfm69_xuW8vGbg35b', // 3
  'https://lh3.googleusercontent.com/d/1BZR3hFQyfDAcPT5j0TUcGYPnpMBRq4TD', // 5
  'https://lh3.googleusercontent.com/d/1D5O8lPwdjvXQDp-EZUMoCHVgJt1UcVQj', // 6
  'https://lh3.googleusercontent.com/d/1I_xi6HsugtkLojYnMPy_N_AtDxW6jIZz', // 8
  'https://lh3.googleusercontent.com/d/1LNZ3f-F5QCRogROXFjheXSQbpctS3w8H', // 9
  'https://lh3.googleusercontent.com/d/1jgwDIA9BOlg0Q5yuUb4Nkc_K9fA_WiL_', // 11
  'https://lh3.googleusercontent.com/d/1qxYWM4j00ig63QaOj2pHO7XVpLnzKSwH', // 12
  'https://lh3.googleusercontent.com/d/1sevIxfbqqu-qqYAQDB7-dvv7GBXOJ4ve', // 14
  'https://lh3.googleusercontent.com/d/1tcANjGm2Cc0a0JIRPhnle4xNnwtUQ017', // 15
  'https://lh3.googleusercontent.com/d/1yesArPetn8DlPN29Qe4n5d2IwQwO5XP0', // 17
];

export function Act01Hero() {

  const [isPreloaded, setIsPreloaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [velocity, setVelocity] = useState(0);

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

  // Typography Shadow for Readability
  const textShadowStyle = {
    textShadow: '0 2px 20px rgba(255,255,255,0.9), 0 0 10px rgba(255,255,255,0.5)'
  };

  // Preload frames
  useEffect(() => {
    let active = true;
    const loadedImages: HTMLImageElement[] = [];
    let loaded = 0;

    MASTER_FRAMES.forEach((src, idx) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        if (!active) return;
        loadedImages[idx] = img;
        loaded += 1;
        if (loaded === MASTER_FRAMES.length) {
          imagesRef.current = loadedImages;
          setIsPreloaded(true);
        }
      };
      img.onerror = () => {
        if (!active) return;
        loaded += 1;
        if (loaded === MASTER_FRAMES.length) {
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

  // Canvas render loop based on scroll
  useEffect(() => {
    if (!isPreloaded || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const renderCanvas = (prog: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      
      const dpr = window.devicePixelRatio || 1;
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        ctx.scale(dpr, dpr);
      }

      ctx.fillStyle = '#ffffff'; // Pure white luxury studio
      ctx.fillRect(0, 0, w, h);

      const numFrames = MASTER_FRAMES.length;
      const exactFrameFloat = prog * (numFrames - 1);
      const frameIndex = Math.min(numFrames - 1, Math.round(exactFrameFloat));

      const img = imagesRef.current[frameIndex];

      if (img) {
        ctx.save();
        
        const iw = img.width;
        const ih = img.height;
        const r = Math.max(w / iw, h / ih); // cover

        const zoom = 1 + (prog > 0.9 ? (prog - 0.9) * 0.2 : 0);
        const nw = iw * r * zoom;
        const nh = ih * r * zoom;
        
        const dx = (w - nw) / 2;
        const dy = (h - nh) / 2;
        
        ctx.drawImage(img, dx, dy, nw, nh);
        ctx.restore();
      }
    };

    const progressState = { current: 0 };
    const handleResize = () => renderCanvas(progressState.current);

    window.addEventListener('resize', handleResize);
    
    // Initial render
    renderCanvas(0);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=220%',
        scrub: true,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const v = Math.abs(self.getVelocity());
          setVelocity(v);
          progressState.current = self.progress;
          renderCanvas(self.progress);
          setProgress(self.progress);

          // Ensure blur resets when scrolling stops
          if (v < 10) {
            gsap.to(canvasRef.current, {
              filter: 'blur(0px)',
              duration: 0.3,
              overwrite: 'auto'
            });
          }
        }
      }
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      tl.kill();
    };
  }, [isPreloaded]);

  // Typography Timings
  // Headline: Fade in after 5%, out before 85%
  let headlineOpacity = 0;
  if (progress > 0.05 && progress < 0.15) {
    headlineOpacity = (progress - 0.05) / (0.15 - 0.05);
  } else if (progress >= 0.15 && progress <= 0.80) {
    headlineOpacity = 1;
  } else if (progress > 0.80 && progress < 0.85) {
    headlineOpacity = 1 - (progress - 0.80) / (0.85 - 0.80);
  }

  // Subheadline: Appear slightly after headline, exit before headline
  let subheadlineOpacity = 0;
  if (progress > 0.10 && progress < 0.20) {
    subheadlineOpacity = (progress - 0.10) / (0.20 - 0.10);
  } else if (progress >= 0.20 && progress <= 0.75) {
    subheadlineOpacity = 1;
  } else if (progress > 0.75 && progress < 0.80) {
    subheadlineOpacity = 1 - (progress - 0.75) / (0.80 - 0.75);
  }

  // CTA: Appear after subheadline, exit first
  let ctaOpacity = 0;
  if (progress > 0.15 && progress < 0.25) {
    ctaOpacity = (progress - 0.15) / (0.25 - 0.15);
  } else if (progress >= 0.25 && progress <= 0.70) {
    ctaOpacity = 1;
  } else if (progress > 0.70 && progress < 0.75) {
    ctaOpacity = 1 - (progress - 0.70) / (0.75 - 0.70);
  }
  
  const boxOpacity = Math.max(headlineOpacity, subheadlineOpacity, ctaOpacity);

  return (
    <div id="act-01" className="bg-white text-slate-900 font-sans selection:bg-[#003B95] selection:text-white">
      {!isPreloaded && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-2 border-slate-200 border-t-[#003B95] rounded-full animate-spin mb-4" />
          <p className="text-xs font-mono tracking-widest text-slate-500 uppercase">
            Loading Cinematic Sequence...
          </p>
        </div>
      )}

      {/* Single Section: Hero Experience */}
      <section 
        ref={containerRef} 
        className="relative w-full h-screen overflow-hidden bg-white z-10"
        aria-label="SensAI Hero Introduction"
      >
        
          {/* Background Canvas */}
          <div className="absolute inset-0 z-0 pointer-events-none select-none bg-white">
            <canvas 
              ref={canvasRef} 
              className="w-full h-full block" 
              role="img" 
              aria-label="Cinematic sequence of the SensAI mattress showcasing its premium design and materials."
              style={{ 
                filter: prefersReducedMotion ? 'none' : `blur(${Math.min(velocity / 600, 4)}px)`,
                willChange: 'filter',
                transition: 'filter 0.15s ease-out'
              }}
            />
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
          <div 
            className="absolute inset-0 z-10 flex flex-col justify-start pt-20 sm:pt-28 section-padding-x pointer-events-none select-none"
            style={{ transform: prefersReducedMotion ? 'none' : `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)` }}
          >
            
              <motion.div 
                style={{ opacity: boxOpacity }}
                className="flex flex-col items-start justify-start max-w-2xl gap-6 sm:gap-8 mt-4 sm:mt-6 p-6 sm:p-8 md:p-10 rounded-3xl bg-white/80 backdrop-blur-2xl border border-white shadow-[0_32px_64px_rgba(0,0,0,0.12)]"
              >
              {/* Headline */}
              <motion.div
                style={{
                  opacity: headlineOpacity,
                  pointerEvents: 'none'
                }}
                className="w-full flex justify-start"
              >
                <div className="text-left">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light font-serif-editorial tracking-tight text-slate-900 leading-tight drop-shadow-sm">
                    Tomorrow Begins <span className="italic text-slate-500 font-normal font-serif-editorial">Tonight.</span>
                  </h1>
                </div>
              </motion.div>

              {/* Subheadline */}
              <motion.div
                style={{
                  opacity: subheadlineOpacity,
                  pointerEvents: 'none'
                }}
                className="w-full flex justify-start"
              >
                <div className="max-w-lg text-left drop-shadow-[0_4px_24px_rgba(255,255,255,0.4)]">
                  <h2 className="text-lg sm:text-xl font-light text-slate-700 leading-relaxed">
                    Meet <span className="text-[#003B95] font-normal font-serif-editorial italic">SensAI</span> — the adaptive sleep experience designed for premium comfort and restorative recovery.
                  </h2>
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                style={{
                  opacity: ctaOpacity,
                  pointerEvents: ctaOpacity > 0.5 ? 'auto' : 'none'
                }}
                className="flex justify-start"
              >
                <button
                  aria-label="Start the SensAI Experience"
                  onClick={() => {
                    scrollToAct('act-02');
                  }}
                  className="px-8 py-3.5 rounded-full border border-slate-200 bg-white/80 backdrop-blur-md text-slate-900 hover:bg-white hover:border-[#003B95]/30 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#003B95] focus:ring-offset-2 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] text-sm font-semibold flex items-center gap-2.5 cursor-pointer pointer-events-auto"
                >
                  <Sparkles className="w-4 h-4 text-[#003B95]" aria-hidden="true" />
                  <span>Experience SensAI</span>
                </button>
              </motion.div>
            </motion.div>

          </div>
      </section>

    </div>
  );
}
