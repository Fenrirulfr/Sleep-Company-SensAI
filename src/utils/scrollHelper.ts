import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger to be safe
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function scrollToAct(domId: string) {
  const target = document.getElementById(domId);
  if (!target) {
    console.warn(`scrollToAct: Target element with ID "${domId}" not found.`);
    return;
  }

  // Find all GSAP ScrollTrigger instances
  const triggers = ScrollTrigger.getAll();
  
  // Find a trigger whose target matches either by element reference or by DOM ID
  const match = triggers.find(
    (st) => st.trigger === target || st.trigger?.id === domId || (st.vars as any)?.id === domId
  );

  if (match) {
    // If a ScrollTrigger exists, match.start represents the exact pixel start scroll position
    window.scrollTo({
      top: match.start,
      behavior: 'smooth',
    });
  } else {
    // Fallback: standard DOM client coordinates
    const yOffset = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: yOffset,
      behavior: 'smooth',
    });
  }
}
