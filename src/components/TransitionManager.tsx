import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ACT_02_FRAMES = [
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

const ACT_03_FRAMES = [
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

export function TransitionManager() {
  const overlayRef = useRef<HTMLDivElement>(null);
  
  // Pre-fetching logic based on scroll direction
  useEffect(() => {
    // When we scroll halfway through Act 01, we prefetch Act 02
    const act01PreloadTrigger = ScrollTrigger.create({
      trigger: '#act-01',
      start: '50% top',
      once: true,
      onEnter: () => {
        ACT_02_FRAMES.forEach(src => {
          const img = new Image();
          img.src = src;
        });
      }
    });

    // When we scroll halfway through Act 02, we prefetch Act 03
    const act02PreloadTrigger = ScrollTrigger.create({
      trigger: '#act-02',
      start: '50% top',
      once: true,
      onEnter: () => {
        ACT_03_FRAMES.forEach(src => {
          const img = new Image();
          img.src = src;
        });
      }
    });

    return () => {
      act01PreloadTrigger.kill();
      act02PreloadTrigger.kill();
    }
  }, []);

  // Crossfade between Act 02 and Act 03
  useEffect(() => {
    if (!overlayRef.current) return;
    
    let crossfadeTrigger: ScrollTrigger | null = null;
    const timer = setTimeout(() => {
      crossfadeTrigger = ScrollTrigger.create({
        trigger: '#act-03',
        start: 'top bottom', // when top of act 3 enters bottom of viewport
        end: 'top top',      // when top of act 3 reaches top of viewport
        scrub: true,
        refreshPriority: 1,
        onUpdate: (self) => {
          if (overlayRef.current) {
             let opacity = 0;
             if (self.progress <= 0 || self.progress >= 1) {
               opacity = 0;
             } else if (self.progress < 0.5) {
               opacity = self.progress / 0.5;
             } else {
               opacity = 1 - ((self.progress - 0.5) / 0.5);
             }
             
             overlayRef.current.style.opacity = String(opacity);
             overlayRef.current.style.display = opacity > 0.01 ? 'block' : 'none';
          }
        }
      });
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (crossfadeTrigger) crossfadeTrigger.kill();
    };
  }, []);

  return (
    <div 
      ref={overlayRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 50,
        opacity: 0,
        backgroundImage: 'url(https://lh3.googleusercontent.com/d/1oP5EDEv2VePxUZyOMwZsA1dLbq1obW87)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    />
  );
}
