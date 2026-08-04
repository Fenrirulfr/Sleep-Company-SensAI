import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Menu, X, CheckCircle2, Film } from 'lucide-react';
import { ActId, ActConfig, SoundscapeTrack } from '../types';
import { SoundscapeAudio } from './SoundscapeAudio';

interface NavigationHeaderProps {
  acts: ActConfig[];
  currentActId: ActId;
  onSelectAct: (id: ActId) => void;
  soundTrack: SoundscapeTrack;
  onSoundTrackChange: (track: SoundscapeTrack) => void;
  onOpenTrialModal: () => void;
  hasDnaProfile: boolean;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  acts,
  currentActId,
  onSelectAct,
  soundTrack,
  onSoundTrackChange,
  onOpenTrialModal,
  hasDnaProfile,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeActIndex = acts.findIndex((a) => a.id === currentActId);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8 pointer-events-none transition-all duration-700">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* 1. Brand Logo Badge */}
        <button
          onClick={() => onSelectAct('arrival')}
          className="flex items-center gap-2.5 group text-left brand-pill px-4 py-2.5 rounded-full shadow-md hover:border-[#003B95]/40 transition duration-500"
        >
          <img 
            src="https://thesleepcompany.in/cdn/shop/files/new_logo.webp?v=1706780127&width=600" 
            alt="The Sleep Company" 
            referrerPolicy="no-referrer"
            className="h-6 w-auto object-contain"
          />
          <span className="text-[9px] uppercase tracking-widest text-[#003B95] font-mono bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 font-bold hidden sm:inline-block">
            SensAI
          </span>
        </button>

        {/* Right Audio & Trial Controls */}
        <div className="flex items-center gap-2">
          {/* Soundscape Audio Engine */}
          <div className="brand-pill rounded-full px-1.5 py-1 shadow-md">
            <SoundscapeAudio
              currentTrack={soundTrack}
              onTrackChange={onSoundTrackChange}
            />
          </div>

          {hasDnaProfile && (
            <button
              onClick={() => onSelectAct('modern-homes')}
              className="hidden sm:flex items-center gap-1.5 text-xs bg-blue-50 border border-blue-200 text-[#003B95] px-3.5 py-1.5 rounded-full hover:bg-blue-100/80 transition shadow-sm font-semibold"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#003B95]" />
              <span className="font-mono text-[11px]">SLEEP DNA ACTIVE</span>
            </button>
          )}

          <button
            onClick={onOpenTrialModal}
            className="hidden md:flex items-center gap-2 px-5 py-2 text-xs font-semibold rounded-full bg-[#003B95] text-white hover:bg-[#002f77] transition shadow-md duration-300"
          >
            <Calendar className="w-3.5 h-3.5 text-sky-200" />
            <span>100-Night Trial</span>
          </button>

          {/* Mobile Scene Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full brand-pill text-slate-800 shadow-md"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#003B95]" /> : <Menu className="w-5 h-5 text-slate-800" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="lg:hidden mt-3 surface-card rounded-3xl p-5 shadow-2xl pointer-events-auto max-w-xl mx-auto"
          >
            <div className="flex items-center justify-between text-xs uppercase tracking-widest text-slate-500 font-mono mb-4 border-b border-slate-200 pb-2 font-semibold">
              <span className="flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5 text-[#003B95]" />
                <span>CINEMATIC TIMELINE ({acts.length} ACTS)</span>
              </span>
              <span className="text-[#003B95] font-bold">{activeActIndex + 1} / {acts.length}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
              {acts.map((act) => {
                const isSelected = act.id === currentActId;
                return (
                  <button
                    key={act.id}
                    onClick={() => {
                      onSelectAct(act.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`p-3 text-left rounded-2xl text-xs transition flex flex-col justify-between border ${
                      isSelected
                        ? 'bg-blue-50 text-[#003B95] border-[#003B95] shadow-sm font-semibold'
                        : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-[10px] text-slate-400 mb-1">
                      <span>ACT {act.actNumber}</span>
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#003B95]" />}
                    </div>
                    <div className="font-semibold truncate text-slate-900">{act.navLabel}</div>
                    <div className="text-[10px] text-slate-500 font-mono truncate mt-0.5">{act.title}</div>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => {
                  onOpenTrialModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 text-center text-xs font-semibold bg-[#003B95] text-white rounded-2xl shadow-md hover:bg-[#002f77] transition flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-sky-200" />
                <span>Reserve 100-Night In-Home Concierge Trial</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};


