import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Shield } from 'lucide-react';
import heroMattressImgLocal from '../assets/images/sensai_hero_mattress_1785769279656.jpg';

// All the sequence assets that need to be preloaded for an elite, seamless start
const HERO_FRAMES = [
  'https://lh3.googleusercontent.com/d/10MJyg1cp5TkvallYg89DLB8MmGrwaX2L',
  'https://lh3.googleusercontent.com/d/118Wstj2B83IhVDcrkScmIcWtlHM8I_7A',
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
];

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

const SCENE_03_FRAMES = [
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

// Combine all unique static image URLs and sequence images for total preload safety
const ALL_PRELOAD_IMAGES = Array.from(
  new Set([
    heroMattressImgLocal,
    ...HERO_FRAMES,
    ...SCENE_02_FRAMES,
    ...SCENE_03_FRAMES,
  ])
);

interface GlobalLoaderProps {
  onComplete: () => void;
}

export function GlobalLoader({ onComplete }: GlobalLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initiating sleep systems...');
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    let loadedCount = 0;
    const totalCount = ALL_PRELOAD_IMAGES.length;

    // Elegant status text rotations based on load stages
    const getStatusText = (percentage: number) => {
      if (percentage < 25) return 'Aligning SmartGRID air channels...';
      if (percentage < 50) return 'Configuring dual-zone personalizations...';
      if (percentage < 75) return 'Calibrating adaptive pressure sensors...';
      if (percentage < 95) return 'Synthesizing restorative soundscapes...';
      return 'Restoration ready.';
    };

    const handleImageLoad = () => {
      loadedCount++;
      const percent = Math.floor((loadedCount / totalCount) * 100);
      setProgress(percent);
      setStatusText(getStatusText(percent));

      if (loadedCount === totalCount) {
        // Soft delay for premium cinematic transition
        setTimeout(() => {
          onComplete();
          // Allow exit animation to finish before unmounting
          setTimeout(() => {
            setShouldRender(false);
          }, 1200);
        }, 800);
      }
    };

    ALL_PRELOAD_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = handleImageLoad;
      img.onerror = handleImageLoad; // Don't block app start if an asset fails to fetch
    });

    // Fallback: safeguard in case any network requests get stuck forever
    const safeguardTimer = setTimeout(() => {
      setProgress(100);
      setStatusText('Restoration ready.');
      setTimeout(() => {
        onComplete();
        setTimeout(() => {
          setShouldRender(false);
        }, 1200);
      }, 800);
    }, 12000); // 12 seconds absolute ceiling

    return () => clearTimeout(safeguardTimer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {shouldRender && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col justify-between p-12 bg-[#030712] text-white select-none overflow-hidden"
        style={{
          background: 'radial-gradient(circle at 50% 40%, rgba(0, 59, 149, 0.15) 0%, rgba(3, 7, 18, 1) 75%)',
        }}
        id="global-luxury-loader"
      >
        {/* Subtle decorative glowing grid at background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b10_1px,transparent_1px),linear-gradient(to_bottom,#1e293b10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

        {/* Top: Brand Header */}
        <div className="flex justify-between items-center w-full max-w-7xl mx-auto z-10">
          <div className="flex items-center gap-2">
            <span className="text-[10px] tracking-[0.4em] font-light text-slate-400 uppercase">
              The Sleep Company
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500 text-xs">
            <Shield className="w-3.5 h-3.5 text-[#003B95]" />
            <span className="tracking-wider">SensAI™ Core</span>
          </div>
        </div>

        {/* Center: Experiential Typography and Line Loader */}
        <div className="w-full max-w-xl mx-auto flex flex-col items-center text-center z-10 my-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-4xl sm:text-5xl font-extralight tracking-[0.4em] text-white uppercase leading-none font-sans">
              S E N S A I
            </h1>
            <p className="text-xs tracking-[0.3em] text-[#003B95] uppercase font-semibold mt-4">
              SmartGRID Mattress Experience
            </p>
          </motion.div>

          {/* Minimal Elegant Horizontal Loading Bar */}
          <div className="w-full h-[1px] bg-white/10 rounded-full overflow-hidden mb-4 relative">
            <motion.div
              className="h-full bg-gradient-to-r from-[#003B95] via-blue-400 to-white"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.3 }}
            />
          </div>

          {/* Progress Percent & Empathetic Status Statement */}
          <div className="flex justify-between w-full text-[10px] tracking-wider text-slate-400 font-mono mb-6">
            <motion.span
              key={statusText}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="italic text-slate-300 font-light"
            >
              {statusText}
            </motion.span>
            <span className="font-semibold text-white">{progress}%</span>
          </div>
        </div>

        {/* Bottom: Luxury Wellness Mantra */}
        <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 z-10 border-t border-white/5 pt-8 text-slate-500 text-[10px] tracking-[0.25em] uppercase">
          <div>Tomorrow Begins Tonight</div>
          <div className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#003B95] animate-pulse" />
            <span>Invisible Technology • Absolute Comfort</span>
          </div>
        </div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
