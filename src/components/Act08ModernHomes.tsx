import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExperiencePanel } from './ExperiencePanel';

type RoomStyle = 'modern' | 'scandinavian' | 'minimal' | 'luxury';

interface StyleConfig {
  id: RoomStyle;
  label: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  metrics: Array<{ label: string; value: string | number; unit?: string }>;
}

const ROOM_STYLES: StyleConfig[] = [
  {
    id: 'modern',
    label: 'Modern',
    badge: 'ARCHITECTURAL ESSENTIAL',
    title: 'Contemporary Luxury',
    subtitle: 'CLEAN GEOMETRIC INTEGRATION',
    description: 'Crisp industrial lines and soft ambient lighting framed by warm natural materials.',
    image: 'https://images.unsplash.com/photo-1595514535314-1e0e7195d852?q=80&w=2000',
    metrics: [
      { label: 'Room Height', value: 'High' },
      { label: 'Material Tone', value: 'Cool Neutral' }
    ]
  },
  {
    id: 'scandinavian',
    label: 'Scandinavian',
    badge: 'NORDIC CALM',
    title: 'Nordic Light Sanctuary',
    subtitle: 'ORGANIC TIMBER & WOOL',
    description: 'Soft oak timbers, muted earth tones, and warm organic linen textures.',
    image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=2000',
    metrics: [
      { label: 'Natural Light', value: 'Abundant' },
      { label: 'Palette', value: 'Warm Oak' }
    ]
  },
  {
    id: 'minimal',
    label: 'Minimal',
    badge: 'PURE ESSENCE',
    title: 'Monolithic Minimal',
    subtitle: 'UNCLUTTERED TRANQUILITY',
    description: 'Zero visual noise. Focus purely on rest, negative space, and architectural stillness.',
    image: 'https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?q=80&w=2000',
    metrics: [
      { label: 'Visual Noise', value: 'Zero' },
      { label: 'Aesthetic', value: 'Monolith' }
    ]
  },
  {
    id: 'luxury',
    label: 'Luxury',
    badge: 'FLAGSHIP RESIDENCE',
    title: 'Penthouse Elegance',
    subtitle: 'RICH VELVET & BRASS',
    description: 'Deep velvet accents, soft brass details, and panoramic skyline views.',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2000',
    metrics: [
      { label: 'Finish Level', value: 'Flagship' },
      { label: 'Lighting', value: 'Warm Brass' }
    ]
  }
];

export function Act08ModernHomes() {
  const [activeStyleId, setActiveStyleId] = useState<RoomStyle>('modern');
  const activeConfig = ROOM_STYLES.find(s => s.id === activeStyleId) || ROOM_STYLES[0];

  return (
    <section 
      id="act-08"
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center bg-slate-950 text-white py-16 md:py-20 lg:py-24 px-6 md:px-12"
      aria-label="Designed For Modern Homes"
    >
      {/* Background Room Transition Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeStyleId}
            src={activeConfig.image}
            alt={activeConfig.label}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.5, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Title & Room Selectors (6 cols) */}
        <div className="lg:col-span-6 space-y-8">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-2 font-semibold">
              Designed For Modern Homes
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light font-serif tracking-tight leading-tight">
              Harmonizes with <br />
              <span className="italic text-blue-300">any interior vision.</span>
            </h2>
            <p className="text-slate-300 mt-4 leading-relaxed text-sm md:text-base max-w-[560px]">
              Switch room environments to see how SensAI seamlessly integrates into diverse architectural aesthetics.
            </p>
          </div>

          {/* Style Selector Buttons */}
          <div className="grid grid-cols-2 gap-3 max-w-md">
            {ROOM_STYLES.map((style) => {
              const isActive = activeStyleId === style.id;
              return (
                <button
                  key={style.id}
                  onClick={() => setActiveStyleId(style.id)}
                  className={`px-5 py-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-white text-slate-900 border-white shadow-xl scale-[1.02]'
                      : 'bg-white/10 text-white/80 border-white/20 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  <div className="text-sm font-serif">{style.label}</div>
                  <div className={`text-[10px] font-mono tracking-widest uppercase mt-0.5 ${
                    isActive ? 'text-[#003B95]' : 'text-slate-400'
                  }`}>
                    {isActive ? 'Active Room' : 'Select'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Reusable Experience Panel (6 cols) */}
        <div className="lg:col-span-6 flex justify-end">
          <div className="w-full max-w-md">
            <ExperiencePanel
              dark={true}
              badge={activeConfig.badge}
              title={activeConfig.title}
              subtitle={activeConfig.subtitle}
              description={activeConfig.description}
              metrics={activeConfig.metrics}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
