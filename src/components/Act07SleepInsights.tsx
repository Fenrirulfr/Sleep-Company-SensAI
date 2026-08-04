import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sliders, 
  Wind, 
  Activity, 
  Sparkles, 
  Check, 
  RotateCcw, 
  ArrowRight,
  ShieldAlert,
  Moon,
  Compass
} from 'lucide-react';
import { scrollToAct } from '../utils/scrollHelper';

interface PositionOption {
  id: 'back' | 'side' | 'combination' | 'stomach';
  label: string;
  desc: string;
  visualName: string;
}

interface ComfortOption {
  id: 'soft' | 'balanced' | 'firm';
  label: string;
  desc: string;
  glowColor: string;
}

interface EnvironmentOption {
  id: 'cool' | 'neutral' | 'warm';
  label: string;
  desc: string;
  ambientClass: string;
}

interface MovementOption {
  id: 'little' | 'occasional' | 'frequent';
  label: string;
  desc: string;
}

const POSITION_OPTIONS: PositionOption[] = [
  { id: 'back', label: 'Back Sleeper', desc: 'Promotes spinal alignment and uniform lumbar support.', visualName: 'Supine Alignment' },
  { id: 'side', label: 'Side Sleeper', desc: 'Cradles hips and shoulders to alleviate pressure points.', visualName: 'Lateral Contouring' },
  { id: 'combination', label: 'Combination Sleeper', desc: 'Dynamically responds to shifting positions effortlessly.', visualName: 'Adaptive Pivot' },
  { id: 'stomach', label: 'Stomach Sleeper', desc: 'Provides firm counter-pressure to prevent lumbar sag.', visualName: 'Neutral Spine' },
];

const COMFORT_OPTIONS: ComfortOption[] = [
  { id: 'soft', label: 'Soft Comfort', desc: 'Plush cloud-like cushioning with deep luxurious sink.', glowColor: 'rgba(56, 189, 248, 0.6)' },
  { id: 'balanced', label: 'Balanced Support', desc: 'Perfect harmony of supportive response and contouring pressure relief.', glowColor: 'rgba(99, 102, 241, 0.6)' },
  { id: 'firm', label: 'Firm Adaptive', desc: 'Structured alignment with immediate pushback and grid resilience.', glowColor: 'rgba(234, 179, 8, 0.6)' },
];

const ENVIRONMENT_OPTIONS: EnvironmentOption[] = [
  { id: 'cool', label: 'Cool Climate', desc: 'Refreshing night airflow with blue thermal aura.', ambientClass: 'from-sky-500/10 via-cyan-500/5 to-transparent' },
  { id: 'neutral', label: 'Neutral Breeze', desc: 'Balanced gentle microclimate with ivory aura.', ambientClass: 'from-slate-400/10 via-indigo-100/5 to-transparent' },
  { id: 'warm', label: 'Warm Coziness', desc: 'Comforting secure insulation with golden sunset aura.', ambientClass: 'from-amber-500/10 via-orange-500/5 to-transparent' },
];

const MOVEMENT_OPTIONS: MovementOption[] = [
  { id: 'little', label: 'Calm Sanctuary', desc: 'Uninterrupted stillness with minimal sleep motion.' },
  { id: 'occasional', label: 'Fluid Comfort', desc: 'Periodic transitions requiring quick grid adaptations.' },
  { id: 'frequent', label: 'Active Rejuvenation', desc: 'Continuous adjustments supported by instantaneous grid response.' },
];

export function Act07SleepInsights() {
  const [position, setPosition] = useState<'back' | 'side' | 'combination' | 'stomach' | null>(null);
  const [comfort, setComfort] = useState<'soft' | 'balanced' | 'firm' | null>(null);
  const [environment, setEnvironment] = useState<'cool' | 'neutral' | 'warm' | null>(null);
  const [movement, setMovement] = useState<'little' | 'occasional' | 'frequent' | null>(null);

  // Stepper state
  const [currentStep, setCurrentStep] = useState<number>(0);

  const isCompleted = position && comfort && environment && movement;

  const handleReset = () => {
    setPosition(null);
    setComfort(null);
    setEnvironment(null);
    setMovement(null);
    setCurrentStep(0);
  };

  // Determine current ambient environment class
  const getAmbientClass = () => {
    if (environment === 'cool') return ENVIRONMENT_OPTIONS[0].ambientClass;
    if (environment === 'neutral') return ENVIRONMENT_OPTIONS[1].ambientClass;
    if (environment === 'warm') return ENVIRONMENT_OPTIONS[2].ambientClass;
    return 'from-slate-100/10 to-transparent';
  };

  // Create descriptive notes based on options selected
  const getDynamicFeedback = () => {
    if (!position && !comfort && !environment && !movement) {
      return {
        title: "Adaptive Personalization",
        desc: "SensAI's SmartGRID adapts seamlessly to your individual body signature.",
        badge: "CONCIERGE INVITATION"
      };
    }
    
    if (position && !comfort) {
      const pOpt = POSITION_OPTIONS.find(o => o.id === position);
      return {
        title: `${pOpt?.visualName} Mode`,
        desc: `For a ${pOpt?.label}, SensAI recalibrates its dual-zone core to maintain optimal spinal curvature.`,
        badge: "DYNAMICS ENGAGED"
      };
    }

    if (comfort && !environment) {
      const cOpt = COMFORT_OPTIONS.find(o => o.id === comfort);
      return {
        title: `${cOpt?.label} Profiling`,
        desc: `Configured for ${cOpt?.desc.toLowerCase()} maintaining absolute breathability and response.`,
        badge: "COMFORT PROFILE"
      };
    }

    if (environment && !movement) {
      const eOpt = ENVIRONMENT_OPTIONS.find(o => o.id === environment);
      return {
        title: `${eOpt?.label} Aura`,
        desc: `SensAI's open-grid design supports continuous air circulation, promoting your body's natural thermal regulation.`,
        badge: "THERMAL FLOW"
      };
    }

    if (movement) {
      const mOpt = MOVEMENT_OPTIONS.find(o => o.id === movement);
      return {
        title: "Active Posture Response",
        desc: `SensAI reacts instantly to ${mOpt?.label.toLowerCase()} conditions without disturbing sleep phases.`,
        badge: "SPATIAL ADAPTATION"
      };
    }

    return {
      title: "Your SleepDNA Profile",
      desc: "A bespoke sleep environment designed for deep recovery.",
      badge: "DNA SYNCHRONIZED"
    };
  };

  const feedback = getDynamicFeedback();

  return (
    <section 
      id="act-07" 
      className="min-h-screen bg-[#FAF9F6] text-slate-900 py-20 lg:py-28 relative overflow-hidden transition-colors duration-1000"
    >
      {/* Immersive Background Image from Google Drive */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <img 
          src="https://lh3.googleusercontent.com/d/1kOXElLTj5KDMSvucXH3IIMlKgF-8nhU-" 
          alt="SensAI SleepDNA Ambience" 
          className="w-full h-full object-cover opacity-[0.25] mix-blend-darken transition-all duration-1000 scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Ambient atmospheric mask to preserve elegant light falloff and contrast */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FAF9F6] via-[#FAF9F6]/85 to-transparent" />
      </div>

      {/* Immersive background ambient environment lighting */}
      <div className={`absolute inset-0 bg-gradient-to-tr ${getAmbientClass()} opacity-[0.45] transition-all duration-1000 pointer-events-none`} />
      
      {/* Decorative luxury architectural light columns */}
      <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-slate-200/40 via-slate-200/10 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-slate-200/40 via-slate-200/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#003B95] mb-3 font-semibold">
            PERSONALIZED EXPERIENCE
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-light font-serif tracking-tight text-slate-950 leading-tight">
            Your SleepDNA<span className="text-[#003B95]">.</span>
          </h2>
          <p className="text-xl font-light text-slate-500 font-serif-editorial mt-3 italic">
            Because no two nights are the same.
          </p>
          <p className="text-[15px] leading-relaxed text-slate-600 mt-5 max-w-[560px]">
            Explore how your sleeping preferences can influence the comfort experience. Select the options that best describe you to discover a personalized SensAI experience.
          </p>
          <p className="text-[11px] text-slate-400 mt-3 font-mono">
            * This experience is an interactive visualization designed to help you explore mattress preferences. It is not a medical assessment.
          </p>
        </div>

        {/* Master Configurator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Interactive Stepper (Col Span 5) */}
          <div className="lg:col-span-5 space-y-10">
            
            <AnimatePresence mode="wait">
              {isCompleted ? (
                // Summary Card
                <motion.div
                  key="result-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white/90 border border-slate-200/60 rounded-[32px] p-8 shadow-xl shadow-slate-900/5 space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-[#003B95]/10 text-[#003B95]">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono tracking-widest text-[#003B95] uppercase font-bold">bespoke results</span>
                      <h3 className="text-2xl font-serif text-slate-950 font-light">Your SleepDNA Experience</h3>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    Based on your preferences, here's a conceptual visualization of how SensAI can support your preferred sleep style.
                  </p>

                  <div className="border-t border-slate-100 pt-5 space-y-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-mono uppercase tracking-wider">Position</span>
                      <span className="font-semibold text-slate-800">{POSITION_OPTIONS.find(o => o.id === position)?.label}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-mono uppercase tracking-wider">Comfort</span>
                      <span className="font-semibold text-slate-800">{COMFORT_OPTIONS.find(o => o.id === comfort)?.label}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-mono uppercase tracking-wider">Climate</span>
                      <span className="font-semibold text-slate-800">{ENVIRONMENT_OPTIONS.find(o => o.id === environment)?.label}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-mono uppercase tracking-wider">Movement</span>
                      <span className="font-semibold text-slate-800">{MOVEMENT_OPTIONS.find(o => o.id === movement)?.label}</span>
                    </div>
                  </div>

                  <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-4 text-[11px] text-slate-500 font-mono">
                    <p className="leading-relaxed">
                      Personalized visualization based on your selections. SensAI continuously self-corrects without requiring manual configurations.
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={() => scrollToAct('act-08')}
                      className="flex-1 py-3 px-5 bg-[#003B95] hover:bg-[#00245E] text-white rounded-full font-medium text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#003B95]/10"
                    >
                      Explore SensAI <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={handleReset}
                      className="py-3 px-5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-full font-medium text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Reset
                    </button>
                  </div>
                </motion.div>
              ) : (
                // Multi-step Interactive Configurator Panel
                <motion.div
                  key="configurator-panel"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  {/* Step Indicators */}
                  <div className="flex items-center gap-2 border-b border-slate-200/50 pb-4">
                    {[0, 1, 2, 3].map((stepIdx) => {
                      const stepTitles = ["Position", "Comfort", "Climate", "Movement"];
                      const isPast = currentStep > stepIdx;
                      const isCurrent = currentStep === stepIdx;
                      return (
                        <button
                          key={stepIdx}
                          onClick={() => setCurrentStep(stepIdx)}
                          className="flex-1 text-left focus:outline-none group"
                        >
                          <div className={`h-1 rounded-full transition-all duration-500 ${
                            isCurrent ? 'bg-[#003B95]' : isPast ? 'bg-[#003B95]/60' : 'bg-slate-200'
                          }`} />
                          <span className={`block text-[10px] font-mono tracking-wider uppercase mt-1.5 transition-all duration-300 ${
                            isCurrent ? 'text-slate-900 font-semibold' : 'text-slate-400 group-hover:text-slate-600'
                          }`}>
                            {stepTitles[stepIdx]}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Step 1: Sleeping Position */}
                  {currentStep === 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-[#003B95] tracking-widest uppercase">step 01</span>
                        <h4 className="text-xl font-serif text-slate-950 font-light">How do you sleep?</h4>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {POSITION_OPTIONS.map((opt) => {
                          const isSel = position === opt.id;
                          return (
                            <button
                              key={opt.id}
                              onClick={() => {
                                setPosition(opt.id);
                                setTimeout(() => setCurrentStep(1), 400);
                              }}
                              className={`text-left p-4 rounded-2xl border transition-all duration-300 focus:outline-none flex items-start gap-4 ${
                                isSel 
                                  ? 'bg-white border-[#003B95] ring-2 ring-[#003B95]/5 shadow-md shadow-slate-900/5 scale-[1.01]' 
                                  : 'bg-white/60 hover:bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-sm'
                              }`}
                            >
                              <div className={`w-5 h-5 rounded-full border mt-0.5 flex items-center justify-center transition-all duration-300 ${
                                isSel ? 'border-[#003B95] bg-[#003B95] text-white' : 'border-slate-300 bg-white'
                              }`}>
                                {isSel && <Check className="w-3 h-3" />}
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold text-sm text-slate-950">{opt.label}</p>
                                <p className="text-xs text-slate-500 mt-1 font-sans leading-relaxed">{opt.desc}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Comfort Preference */}
                  {currentStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-[#003B95] tracking-widest uppercase">step 02</span>
                        <h4 className="text-xl font-serif text-slate-950 font-light">Choose your comfort preference</h4>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {COMFORT_OPTIONS.map((opt) => {
                          const isSel = comfort === opt.id;
                          return (
                            <button
                              key={opt.id}
                              onClick={() => {
                                setComfort(opt.id);
                                setTimeout(() => setCurrentStep(2), 400);
                              }}
                              className={`text-left p-4 rounded-2xl border transition-all duration-300 focus:outline-none flex items-start gap-4 ${
                                isSel 
                                  ? 'bg-white border-[#003B95] ring-2 ring-[#003B95]/5 shadow-md shadow-slate-900/5 scale-[1.01]' 
                                  : 'bg-white/60 hover:bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-sm'
                              }`}
                            >
                              <div className={`w-5 h-5 rounded-full border mt-0.5 flex items-center justify-center transition-all duration-300 ${
                                isSel ? 'border-[#003B95] bg-[#003B95] text-white' : 'border-slate-300 bg-white'
                              }`}>
                                {isSel && <Check className="w-3 h-3" />}
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold text-sm text-slate-950">{opt.label}</p>
                                <p className="text-xs text-slate-500 mt-1 font-sans leading-relaxed">{opt.desc}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Sleep Environment */}
                  {currentStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-[#003B95] tracking-widest uppercase">step 03</span>
                        <h4 className="text-xl font-serif text-slate-950 font-light">Choose your sleep environment</h4>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {ENVIRONMENT_OPTIONS.map((opt) => {
                          const isSel = environment === opt.id;
                          return (
                            <button
                              key={opt.id}
                              onClick={() => {
                                setEnvironment(opt.id);
                                setTimeout(() => setCurrentStep(3), 400);
                              }}
                              className={`text-left p-4 rounded-2xl border transition-all duration-300 focus:outline-none flex items-start gap-4 ${
                                isSel 
                                  ? 'bg-white border-[#003B95] ring-2 ring-[#003B95]/5 shadow-md shadow-slate-900/5 scale-[1.01]' 
                                  : 'bg-white/60 hover:bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-sm'
                              }`}
                            >
                              <div className={`w-5 h-5 rounded-full border mt-0.5 flex items-center justify-center transition-all duration-300 ${
                                isSel ? 'border-[#003B95] bg-[#003B95] text-white' : 'border-slate-300 bg-white'
                              }`}>
                                {isSel && <Check className="w-3 h-3" />}
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold text-sm text-slate-950">{opt.label}</p>
                                <p className="text-xs text-slate-500 mt-1 font-sans leading-relaxed">{opt.desc}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Movement Preference */}
                  {currentStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-[#003B95] tracking-widest uppercase">step 04</span>
                        <h4 className="text-xl font-serif text-slate-950 font-light">Choose your movement style</h4>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {MOVEMENT_OPTIONS.map((opt) => {
                          const isSel = movement === opt.id;
                          return (
                            <button
                              key={opt.id}
                              onClick={() => {
                                setMovement(opt.id);
                              }}
                              className={`text-left p-4 rounded-2xl border transition-all duration-300 focus:outline-none flex items-start gap-4 ${
                                isSel 
                                  ? 'bg-white border-[#003B95] ring-2 ring-[#003B95]/5 shadow-md shadow-slate-900/5 scale-[1.01]' 
                                  : 'bg-white/60 hover:bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-sm'
                              }`}
                            >
                              <div className={`w-5 h-5 rounded-full border mt-0.5 flex items-center justify-center transition-all duration-300 ${
                                isSel ? 'border-[#003B95] bg-[#003B95] text-white' : 'border-slate-300 bg-white'
                              }`}>
                                {isSel && <Check className="w-3 h-3" />}
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold text-sm text-slate-950">{opt.label}</p>
                                <p className="text-xs text-slate-500 mt-1 font-sans leading-relaxed">{opt.desc}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* Manual Stepper Navigation */}
                  <div className="flex items-center justify-between pt-4">
                    <button
                      disabled={currentStep === 0}
                      onClick={() => setCurrentStep(prev => prev - 1)}
                      className="text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-[#003B95] disabled:opacity-35 disabled:hover:text-slate-400 transition-colors"
                    >
                      &larr; Back
                    </button>
                    {currentStep < 3 ? (
                      <button
                        onClick={() => setCurrentStep(prev => prev + 1)}
                        className="text-xs font-mono uppercase tracking-wider text-[#003B95] font-semibold hover:text-[#00245E] transition-colors"
                      >
                        Next &rarr;
                      </button>
                    ) : (
                      <button
                        disabled={!isCompleted}
                        onClick={() => {}}
                        className="text-xs font-mono uppercase tracking-wider text-[#003B95] font-bold hover:text-[#00245E] disabled:opacity-30 transition-colors"
                      >
                        Complete Profile
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Right Column: Premium Interactive 3D Mattress & Silhouette Visualization (Col Span 7) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[480px] lg:min-h-[580px] w-full">
            
            {/* Configurator Reset and Quick info indicators */}
            <div className="absolute bottom-0 text-center w-full max-w-md pointer-events-auto">
              <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-slate-400">
                {!position ? "Select sleeping position to begin setup" : 
                 !comfort ? "Choose comfort level to align spine" : 
                 !environment ? "Customize climate profile" : 
                 !movement ? "Configure dynamic adjustments" : 
                 "SleepDNA profile is fully generated"}
              </p>
              {position && (
                <button
                  onClick={handleReset}
                  className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-slate-500 hover:text-[#003B95] border-b border-dashed border-slate-300 hover:border-[#003B95] pb-0.5 transition-all"
                >
                  <RotateCcw className="w-3 h-3" /> Reset Selections
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
