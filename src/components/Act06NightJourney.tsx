import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Sunset, Moon } from 'lucide-react';
import { ExperiencePanel } from './ExperiencePanel';

type TimeOfDay = 'morning' | 'evening' | 'night';

interface TimeSetting {
  id: TimeOfDay;
  label: string;
  icon: React.FC<any>;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  bgGradient: string;
  lightingOverlay: string;
  metrics: Array<{ label: string; value: string | number; unit?: string }>;
}

const TIME_SETTINGS: TimeSetting[] = [
  {
    id: 'morning',
    label: 'Morning',
    icon: Sun,
    badge: '6:30 AM — NATURAL AWAKENING',
    title: 'Sunrise Thermal Ramp',
    subtitle: 'ENERGIZING CIRCADIAN TRANSITION',
    description: 'SensAI subtly warms the perimeter cells 15 minutes before your alarm, gently signaling your endocrine system to wake.',
    bgGradient: 'from-amber-100/40 via-orange-50/20 to-slate-900/60',
    lightingOverlay: 'radial-gradient(circle at 80% 20%, rgba(253, 230, 138, 0.4) 0%, transparent 60%)',
    metrics: [
      { label: 'Thermal Lift', value: '+1.5', unit: '°C' },
      { label: 'Awakening Quality', value: '100%', unit: 'refreshed' }
    ]
  },
  {
    id: 'evening',
    label: 'Evening',
    icon: Sunset,
    badge: '10:00 PM — SLEEP PREPARATION',
    title: 'Pre-Sleep Cooling Down',
    subtitle: 'MELATONIN SYNC',
    description: 'Active thermal reduction dissipates residual body heat, lowering core temperature to trigger natural sleep onset.',
    bgGradient: 'from-amber-900/40 via-indigo-950/60 to-slate-950',
    lightingOverlay: 'radial-gradient(circle at 20% 40%, rgba(249, 115, 22, 0.25) 0%, transparent 70%)',
    metrics: [
      { label: 'Core Temp Shift', value: '-1.2', unit: '°C' },
      { label: 'Sleep Onset', value: '12', unit: 'mins' }
    ]
  },
  {
    id: 'night',
    label: 'Night',
    icon: Moon,
    badge: '2:00 AM — DEEP REM RECOVERY',
    title: 'Zero-Interruption REM',
    subtitle: 'DEEP CELLULAR RESTORATION',
    description: 'Constant thermal stability and continuous pressure adaptation maintain maximum slow-wave delta sleep.',
    bgGradient: 'from-[#001D4A]/80 via-slate-950 to-black',
    lightingOverlay: 'radial-gradient(circle at 50% 30%, rgba(59, 130, 246, 0.2) 0%, transparent 60%)',
    metrics: [
      { label: 'Delta Sleep Lift', value: '+35%' },
      { label: 'Micro-Arousals', value: '0' }
    ]
  }
];

export function Act06NightJourney() {
  const [time, setTime] = useState<TimeOfDay>('night');
  const activeSetting = TIME_SETTINGS.find(t => t.id === time) || TIME_SETTINGS[2];

  return (
    <section 
      id="act-06"
      className="relative w-full min-h-screen overflow-hidden bg-slate-950 text-white flex items-center justify-center section-padding"
      aria-label="Your Night Journey"
    >
      {/* Luxury Bedroom Ambient Background Image & Dynamic Lighting Overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=2000" 
          alt="Luxury Bedroom Scene" 
          className="w-full h-full object-cover opacity-40 scale-105 transition-transform duration-[8s] ease-out"
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={time}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute inset-0 bg-gradient-to-b ${activeSetting.bgGradient}`}
          />
        </AnimatePresence>

        <div 
          className="absolute inset-0 pointer-events-none transition-all duration-1000"
          style={{ background: activeSetting.lightingOverlay }}
        />
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 section-container grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Editorial & Selector (6 cols) */}
        <div className="lg:col-span-6 space-y-8">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-2 font-semibold">
              Your Night Journey
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light font-serif tracking-tight leading-tight">
              Circadian rhythm <br />
              <span className="italic text-blue-300">synchronization.</span>
            </h2>
            <p className="text-slate-300 mt-4 leading-relaxed text-sm md:text-base max-w-[560px]">
              SensAI actively modulates thermal and ergonomic support across all phases of your night.
            </p>
          </div>

          {/* Time Selector Controls */}
          <div className="inline-flex gap-2 p-2 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full">
            {TIME_SETTINGS.map((setting) => {
              const Icon = setting.icon;
              const isActive = time === setting.id;
              return (
                <button
                  key={setting.id}
                  onClick={() => setTime(setting.id)}
                  className={`relative px-6 py-3 rounded-full text-xs font-mono uppercase tracking-widest flex items-center gap-2 transition-all duration-500 cursor-pointer ${
                    isActive ? 'text-slate-900 font-semibold' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTimeBg"
                      className="absolute inset-0 bg-white rounded-full shadow-lg"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span>{setting.label}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Experience Panel (6 cols) */}
        <div className="lg:col-span-6 flex justify-end">
          <div className="w-full max-w-md">
            <ExperiencePanel
              dark={true}
              badge={activeSetting.badge}
              title={activeSetting.title}
              subtitle={activeSetting.subtitle}
              description={activeSetting.description}
              metrics={activeSetting.metrics}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
