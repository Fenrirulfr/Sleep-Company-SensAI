import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Act01Hero } from './Act01Hero';
import { Act02MeetSensAI } from './Act02MeetSensAI';
import { Act03SmartGrid } from './Act03SmartGrid';
import { WebGLSequenceViewer } from './WebGLSequenceViewer';
import { ActId } from '../types';

gsap.registerPlugin(ScrollTrigger);

const COMBINED_FRAMES = [
  // MASTER_FRAMES (12)
  'https://lh3.googleusercontent.com/d/10MJyg1cp5TkvallYg89DLB8MmGrwaX2L',
  'https://lh3.googleusercontent.com/d/1EMxuskimWVE_1ODgKBuz3hZBGZt8s4Hi',
  'https://lh3.googleusercontent.com/d/17hghzl2lP7c5_7PMfm69_xuW8vGbg35b',
  'https://lh3.googleusercontent.com/d/1BZR3hFQyfDAcPT5j0TUcGYPnpMBRq4TD',
  'https://lh3.googleusercontent.com/d/1D5O8lPwdjvXQDp-EZUMoCHVgJt1UcVQj',
  'https://lh3.googleusercontent.com/d/1I_xi6HsugtkLojYnMPy_N_AtDxW6jIZz',
  'https://lh3.googleusercontent.com/d/1LNZ3f-F5QCRogROXFjheXSQbpctS3w8H',
  'https://lh3.googleusercontent.com/d/1jgwDIA9BOlg0Q5yuUb4Nkc_K9fA_WiL_',
  'https://lh3.googleusercontent.com/d/1qxYWM4j00ig63QaOj2pHO7XVpLnzKSwH',
  'https://lh3.googleusercontent.com/d/1sevIxfbqqu-qqYAQDB7-dvv7GBXOJ4ve',
  'https://lh3.googleusercontent.com/d/1tcANjGm2Cc0a0JIRPhnle4xNnwtUQ017',
  'https://lh3.googleusercontent.com/d/1yesArPetn8DlPN29Qe4n5d2IwQwO5XP0',

  // SCENE_02_FRAMES (Craftsmanship Frames)
  'https://lh3.googleusercontent.com/d/1JHicuyS9Q09yEByNDFjZzsw6yJnASfIr',
  'https://lh3.googleusercontent.com/d/1YLVH_1UcoJKZf2SIeJI8_8JaiBHnjoJa',
  'https://lh3.googleusercontent.com/d/1_JwtZ6EYjoikpxl1K_A1Iwl6IGiUF14n',
  'https://lh3.googleusercontent.com/d/1q8vvTwoTJAl7Iaw37fhzxUSKrmkoapDL',
  'https://lh3.googleusercontent.com/d/1gdqu17C5TC7f9CVyvGmTQ2DkVJyQ1W2o',
  'https://lh3.googleusercontent.com/d/12zJ5HAPFZDPfVPW6hQnFzbIeKAOO8Asv',
  'https://lh3.googleusercontent.com/d/1kOXElLTj5KDMSvucXH3IIMlKgF-8nhU-',

  // SMARTGRID_SEQUENCE (8)
  'https://lh3.googleusercontent.com/d/1DIMBAUnaqCRd6FrhgSVgnAATxSVxDh2M',
  'https://lh3.googleusercontent.com/d/14ZcqnC7ngW-vNEoZAq1dANMacnRbRZBE',
  'https://lh3.googleusercontent.com/d/1fsoeq_PVhUz-p-UYNEomdFL5ovcBKrub',
  'https://lh3.googleusercontent.com/d/1XGi572hGDFQgoLJ8hIaBdUp9YKwbKjye',
  'https://lh3.googleusercontent.com/d/1jyDtgBK6-P-4yh3AbYMsGpmzrISWFRYy',
  'https://lh3.googleusercontent.com/d/1QOehZlEkZM4xL7nEKVhR3Rr_YBov3M84',
  'https://lh3.googleusercontent.com/d/1xE3UiwMCQhAmpxCm_qYt_tS-C8P3EWeK',
  'https://lh3.googleusercontent.com/d/1XrETq8mSMrQ0I8IV-b0jr3ZuYdhcx4I1'
];

interface CinematicContainerProps {
  onOpenTrialModal: () => void;
  onActChange?: (id: ActId) => void;
}

export function CinematicContainer({ onOpenTrialModal, onActChange }: CinematicContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [globalProgress, setGlobalProgress] = useState(0);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  // Preload frames at the container level
  useEffect(() => {
    let active = true;
    let count = 0;
    const total = COMBINED_FRAMES.length;

    COMBINED_FRAMES.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        if (!active) return;
        count++;
        setLoadedCount(count);
        if (count >= total * 0.8) {
          setIsPreloaded(true);
        }
      };
      img.onerror = () => {
        if (!active) return;
        count++;
        setLoadedCount(count);
        if (count >= total * 0.8) {
          setIsPreloaded(true);
        }
      };
    });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current || !isPreloaded) return;

    // 1. Master Pinning ScrollTrigger
    const pinDistance = window.innerHeight * 3;

    const masterTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: `+=${pinDistance}`,
      pin: true,
      scrub: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        setGlobalProgress(self.progress);
      }
    });

    // 2. Individual target markers for pixel-perfect menu link scrolling.
    const t1 = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=0%',
      id: 'act-01',
    });

    const t2 = ScrollTrigger.create({
      trigger: containerRef.current,
      start: `top top-=${pinDistance * 0.35}`,
      end: '+=0%',
      id: 'act-02',
    });

    const t3 = ScrollTrigger.create({
      trigger: containerRef.current,
      start: `top top-=${pinDistance * 0.68}`,
      end: '+=0%',
      id: 'act-03',
    });

    return () => {
      masterTrigger.kill();
      t1.kill();
      t2.kill();
      t3.kill();
    };
  }, [isPreloaded]);

  const p = globalProgress;

  // Track and notify parent about current active act in the cinematic timeline
  useEffect(() => {
    let activeId: ActId = 'arrival';
    if (p >= 0.32 && p < 0.65) {
      activeId = 'sensai';
    } else if (p >= 0.65) {
      activeId = 'smartgrid';
    }
    onActChange?.(activeId);
  }, [p, onActChange]);

  // Map progress values into smooth cross-fading opacities and subtle float offsets
  const act1Progress = Math.max(0, Math.min(1, p / 0.35));
  let act1Opacity = 1;
  let y1 = 0;
  if (p > 0.27 && p <= 0.35) {
    const ratio = (p - 0.27) / 0.08;
    act1Opacity = 1 - ratio;
    y1 = -20 * ratio;
  } else if (p > 0.35) {
    act1Opacity = 0;
    y1 = -20;
  }

  const act2Progress = Math.max(0, Math.min(1, (p - 0.32) / 0.33));
  let act2Opacity = 0;
  let y2 = 20;
  if (p >= 0.28 && p < 0.35) {
    const ratio = (p - 0.28) / 0.07;
    act2Opacity = ratio;
    y2 = 20 * (1 - ratio);
  } else if (p >= 0.35 && p <= 0.60) {
    act2Opacity = 1;
    y2 = 0;
  } else if (p > 0.60 && p <= 0.68) {
    const ratio = (p - 0.60) / 0.08;
    act2Opacity = 1 - ratio;
    y2 = -20 * ratio;
  } else if (p > 0.68) {
    act2Opacity = 0;
    y2 = -20;
  }

  const act3Progress = Math.max(0, Math.min(1, (p - 0.65) / 0.35));
  let act3Opacity = 0;
  let y3 = 20;
  if (p >= 0.61 && p < 0.68) {
    const ratio = (p - 0.61) / 0.07;
    act3Opacity = ratio;
    y3 = 20 * (1 - ratio);
  } else if (p >= 0.68) {
    act3Opacity = 1;
    y3 = 0;
  }

  return (
    <div 
      id="cinematic-container"
      ref={containerRef} 
      className="relative w-full h-screen bg-white select-none overflow-hidden"
    >
      {/* Anchor DOM nodes for section targeting */}
      <div id="act-01" className="absolute top-0 w-full h-1 pointer-events-none" />
      <div id="act-02" className="absolute top-0 w-full h-1 pointer-events-none" />
      <div id="act-03" className="absolute top-0 w-full h-1 pointer-events-none" />

      {/* Global Minimalist Loader */}
      {!isPreloaded && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-2 border-slate-200 border-t-[#003B95] rounded-full animate-spin mb-4" />
          <p className="text-xs font-mono tracking-widest text-slate-500 uppercase">
            Loading Cinematic Journey ({Math.round((loadedCount / COMBINED_FRAMES.length) * 100)}%)
          </p>
        </div>
      )}

      {/* Unified, fixed image sequence viewer spanning the entire container background */}
      {isPreloaded && (() => {
        const numFrames = COMBINED_FRAMES.length;
        let targetIndex = 0;
        const p = globalProgress;

        if (p < 0.35) {
          const act1Progress = Math.min(1, p / 0.35);
          targetIndex = Math.round(act1Progress * 11);
        } else if (p >= 0.35 && p < 0.65) {
          const act2Progress = Math.min(1, (p - 0.35) / 0.30);
          targetIndex = 12 + Math.round(act2Progress * 6);
        } else {
          const act3Progress = Math.min(1, (p - 0.65) / 0.35);
          const act3FrameIdx = Math.min(7, Math.round(act3Progress * 7));
          targetIndex = 19 + act3FrameIdx;
        }

        const mappedGlobalProgress = targetIndex / (numFrames - 1);

        return (
          <div className="absolute inset-0 z-0 pointer-events-none select-none bg-white">
            <WebGLSequenceViewer urls={COMBINED_FRAMES} progress={mappedGlobalProgress} />
          </div>
        );
      })()}

      {/* Render Act 01 (Arrival) */}
      {isPreloaded && act1Opacity > 0 && (
        <div 
          className="absolute inset-0 w-full h-full bg-transparent"
          style={{ 
            transform: `translate3d(0, ${y1}px, 0)`,
            opacity: act1Opacity,
            zIndex: 10,
            pointerEvents: p < 0.32 ? 'auto' : 'none'
          }}
        >
          <Act01Hero progress={act1Progress} />
        </div>
      )}

      {/* Render Act 02 (SensAI) */}
      {isPreloaded && act2Opacity > 0 && (
        <div 
          className="absolute inset-0 w-full h-full bg-transparent"
          style={{ 
            transform: `translate3d(0, ${y2}px, 0)`,
            opacity: act2Opacity,
            zIndex: 20,
            pointerEvents: (p >= 0.32 && p < 0.65) ? 'auto' : 'none'
          }}
        >
          <Act02MeetSensAI progress={act2Progress} />
        </div>
      )}

      {/* Render Act 03 (SmartGRID) */}
      {isPreloaded && act3Opacity > 0 && (
        <div 
          className="absolute inset-0 w-full h-full bg-transparent"
          style={{ 
            transform: `translate3d(0, ${y3}px, 0)`,
            opacity: act3Opacity,
            zIndex: 30,
            pointerEvents: p >= 0.65 ? 'auto' : 'none'
          }}
        >
          <Act03SmartGrid onOpenTrialModal={onOpenTrialModal} progress={act3Progress} />
        </div>
      )}
    </div>
  );
}
