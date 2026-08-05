import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'motion/react';
import { SoundscapeTrack, ActId } from './types';
import { NavigationHeader } from './components/NavigationHeader';
import { CursorGlow } from './components/CursorGlow';
import { CinematicContainer } from './components/CinematicContainer';
import { Act06NightJourney } from './components/Act06NightJourney';
import { Act07SleepInsights } from './components/Act07SleepInsights';
import { Act08ModernHomes } from './components/Act08ModernHomes';
import { Act09Experience } from './components/Act09Experience';
import { TrialModal } from './components/TrialModal';
import { GlobalLoader } from './components/GlobalLoader';
import { SleepConcierge, ConciergeState } from './components/SleepConcierge';
import { scrollToAct } from './utils/scrollHelper';
import { TransitionManager } from './components/TransitionManager';

export default function App() {
  const [soundTrack, setSoundTrack] = useState<SoundscapeTrack>('off');
  const [currentActId, setCurrentActId] = useState<ActId>('arrival');
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [isPreloading, setIsPreloading] = useState(true);
  const [conciergeState, setConciergeState] = useState<ConciergeState>('explore-layers');
  const { scrollYProgress } = useScroll();

  // Scroll lock while preloading assets
  useEffect(() => {
    const preventDefault = (e: Event) => {
      e.preventDefault();
    };

    const preventScrollKeys = (e: KeyboardEvent) => {
      const keys = ['ArrowUp', 'ArrowDown', 'Space', ' ', 'PageUp', 'PageDown', 'End', 'Home'];
      if (keys.includes(e.key)) {
        e.preventDefault();
      }
    };

    if (isPreloading) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.height = '100vh';
      document.documentElement.style.height = '100vh';

      window.addEventListener('wheel', preventDefault, { passive: false });
      window.addEventListener('touchmove', preventDefault, { passive: false });
      window.addEventListener('keydown', preventScrollKeys, { passive: false });
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.height = '';
      document.documentElement.style.height = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.height = '';
      document.documentElement.style.height = '';
      window.removeEventListener('wheel', preventDefault);
      window.removeEventListener('touchmove', preventDefault);
      window.removeEventListener('keydown', preventScrollKeys);
    };
  }, [isPreloading]);

  // Dynamically observe active scenes on scroll to update the timeline header
  useEffect(() => {
    const actToDOMMap: { id: ActId; domId: string }[] = [
      { id: 'arrival', domId: 'act-01' },
      { id: 'sensai', domId: 'act-02' },
      { id: 'smartgrid', domId: 'act-03' },
      { id: 'night-journey', domId: 'act-06' },
      { id: 'sleep-insights', domId: 'act-07' },
      { id: 'modern-homes', domId: 'act-08' },
      { id: 'experience', domId: 'act-09' }
    ];

    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const matchedAct = actToDOMMap.find((item) => item.domId === entry.target.id);
          if (matchedAct) {
            setCurrentActId(matchedAct.id);
            
            if (matchedAct.id === 'arrival' || matchedAct.id === 'sensai') {
              setConciergeState('explore-layers');
            } else if (matchedAct.id === 'smartgrid') {
              setConciergeState('try-side-sleeper');
            } else if (matchedAct.id === 'night-journey') {
              setConciergeState('change-lighting');
            } else if (matchedAct.id === 'sleep-insights') {
              setConciergeState('compare-comfort');
            } else if (matchedAct.id === 'modern-homes' || matchedAct.id === 'experience') {
              setConciergeState('reserve-trial');
            }
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    actToDOMMap.forEach((item) => {
      const el = document.getElementById(item.domId);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleSelectAct = (id: ActId) => {
    const actToDOMMap: Record<ActId, string> = {
      arrival: 'act-01',
      sensai: 'act-02',
      smartgrid: 'act-03',
      layers: 'act-03',
      'night-journey': 'act-06',
      'sleep-insights': 'act-07',
      'modern-homes': 'act-08',
      experience: 'act-09'
    };
    const targetDOMId = actToDOMMap[id];
    if (targetDOMId) {
      scrollToAct(targetDOMId);
    }
  };

  return (
    <div className="bg-white min-h-screen text-slate-900 font-sans selection:bg-[#003B95] selection:text-white overflow-x-hidden">
      
      <GlobalLoader onComplete={() => setIsPreloading(false)} />

      <CursorGlow />

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#003B95] origin-left z-[100]"
        style={{ scaleX: scrollYProgress }}
      />

      <NavigationHeader
        acts={[
          { id: 'arrival', actNumber: '01', title: 'Arrival', subtitle: 'Tomorrow Begins Tonight', navLabel: '01 Arrival' },
          { id: 'sensai', actNumber: '02', title: 'SensAI', subtitle: 'Adaptive Intelligence', navLabel: '02 SensAI' },
          { id: 'smartgrid', actNumber: '03', title: 'SmartGRID', subtitle: 'Anatomy & Core', navLabel: '03 SmartGRID' },
          { id: 'night-journey', actNumber: '04', title: 'Night Journey', subtitle: 'Your Night Journey', navLabel: '04 Night Journey' },
          { id: 'sleep-insights', actNumber: '05', title: 'SleepDNA', subtitle: 'Your SleepDNA Profile', navLabel: '05 SleepDNA' },
          { id: 'modern-homes', actNumber: '06', title: 'Modern Homes', subtitle: 'Designed For Modern Homes', navLabel: '06 Modern Homes' },
          { id: 'experience', actNumber: '07', title: 'Experience', subtitle: 'Experience SensAI', navLabel: '07 Experience' }
        ]}
        currentActId={currentActId}
        onSelectAct={handleSelectAct}
        soundTrack={soundTrack}
        onSoundTrackChange={setSoundTrack}
        onOpenTrialModal={() => setIsTrialModalOpen(true)}
        hasDnaProfile={false}
      />

      {/* Main Experience Flow */}
      <main>
        <TransitionManager />
        <CinematicContainer 
          onOpenTrialModal={() => setIsTrialModalOpen(true)} 
          onActChange={(id) => setCurrentActId(id)}
        />
        <Act06NightJourney />
        <Act07SleepInsights />
        <Act08ModernHomes />
        <Act09Experience onOpenTrialModal={() => setIsTrialModalOpen(true)} />
      </main>

      <SleepConcierge 
        currentState={conciergeState} 
        onAction={() => {
          if (conciergeState === 'reserve-trial') {
            setIsTrialModalOpen(true);
          } else if (conciergeState === 'explore-layers') {
            handleSelectAct('smartgrid');
          } else if (conciergeState === 'try-side-sleeper') {
            handleSelectAct('night-journey');
          } else if (conciergeState === 'change-lighting') {
            handleSelectAct('sleep-insights');
          } else if (conciergeState === 'compare-comfort') {
            handleSelectAct('modern-homes');
          } else {
            const nextActMap: Record<ActId, ActId> = {
              'arrival': 'sensai',
              'sensai': 'smartgrid',
              'smartgrid': 'night-journey',
              'layers': 'night-journey',
              'night-journey': 'sleep-insights',
              'sleep-insights': 'modern-homes',
              'modern-homes': 'experience',
              'experience': 'experience'
            };
            const next = nextActMap[currentActId];
            if (next) handleSelectAct(next);
          }
        }} 
      />

      <TrialModal 
        isOpen={isTrialModalOpen} 
        onClose={() => setIsTrialModalOpen(false)} 
        dnaResult={null} 
      />

    </div>
  );
}
