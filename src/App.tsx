import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'motion/react';
import { SoundscapeTrack, ActId } from './types';
import { NavigationHeader } from './components/NavigationHeader';
import { CursorGlow } from './components/CursorGlow';
import { Act01Hero } from './components/Act01Hero';
import { Act02MeetSensAI } from './components/Act02MeetSensAI';
import { Act03SmartGrid } from './components/Act03SmartGrid';
import { Act04BodyAdapt } from './components/Act04BodyAdapt';
import { Act05Layers } from './components/Act05Layers';
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
    if (isPreloading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isPreloading]);

  // Dynamically observe active scenes on scroll to update the timeline header
  useEffect(() => {
    const actToDOMMap: { id: ActId; domId: string }[] = [
      { id: 'arrival', domId: 'act-01' },
      { id: 'sensai', domId: 'act-02' },
      { id: 'smartgrid', domId: 'act-03' },
      { id: 'body-adapt', domId: 'act-04' },
      { id: 'layers', domId: 'act-05' },
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
            } else if (matchedAct.id === 'body-adapt') {
              setConciergeState('explore-layers');
            } else if (matchedAct.id === 'layers') {
              setConciergeState('change-lighting');
            } else if (matchedAct.id === 'night-journey') {
              setConciergeState('view-recovery');
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
      'body-adapt': 'act-04',
      layers: 'act-05',
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
          { id: 'smartgrid', actNumber: '03', title: 'SmartGRID', subtitle: 'Inside the Core', navLabel: '03 SmartGRID' },
          { id: 'body-adapt', actNumber: '04', title: 'Body Adapt', subtitle: 'Designed Around Your Body', navLabel: '04 Body Adapt' },
          { id: 'layers', actNumber: '05', title: 'Layers', subtitle: 'Experience Every Layer', navLabel: '05 Layers' },
          { id: 'night-journey', actNumber: '06', title: 'Night Journey', subtitle: 'Your Night Journey', navLabel: '06 Night Journey' },
          { id: 'sleep-insights', actNumber: '07', title: 'Sleep Insights', subtitle: 'Restorative Dynamics', navLabel: '07 Sleep Insights' },
          { id: 'modern-homes', actNumber: '08', title: 'Modern Homes', subtitle: 'Designed For Modern Homes', navLabel: '08 Modern Homes' },
          { id: 'experience', actNumber: '09', title: 'Experience', subtitle: 'Experience SensAI', navLabel: '09 Experience' }
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
        <Act01Hero />
        <Act02MeetSensAI />
        <Act03SmartGrid onOpenTrialModal={() => setIsTrialModalOpen(true)} />
        <Act04BodyAdapt />
        <Act05Layers />
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
            handleSelectAct('body-adapt');
          } else if (conciergeState === 'change-lighting') {
            handleSelectAct('night-journey');
          } else if (conciergeState === 'view-recovery') {
            handleSelectAct('sleep-insights');
          } else if (conciergeState === 'compare-comfort') {
            handleSelectAct('modern-homes');
          } else {
            const nextActMap: Record<ActId, ActId> = {
              'arrival': 'sensai',
              'sensai': 'smartgrid',
              'smartgrid': 'body-adapt',
              'body-adapt': 'layers',
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
