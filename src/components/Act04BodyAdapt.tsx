import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExperiencePanel } from './ExperiencePanel';

export type SleepingPosition = 'back' | 'side' | 'combo';

interface PositionData {
  id: SleepingPosition;
  label: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  pressurePoints: Array<{ name: string; x: number; y: number; intensity: 'low' | 'med' | 'high' }>;
  metrics: Array<{ label: string; value: string | number; unit?: string }>;
}

const POSITIONS: PositionData[] = [
  {
    id: 'back',
    label: 'Back Sleeper',
    badge: 'LUMBAR ALIGNMENT',
    title: 'Neutral Spine Alignment',
    subtitle: 'EVEN WEIGHT DISTRIBUTION',
    description: 'SmartGRID® gently contours to the lumbar curve, preventing lower back strain and supporting cervical posture.',
    pressurePoints: [
      { name: 'Neck / Cervical', x: 50, y: 22, intensity: 'low' },
      { name: 'Lumbar Arc', x: 50, y: 52, intensity: 'med' },
      { name: 'Pelvis / Sacrum', x: 50, y: 68, intensity: 'high' }
    ],
    metrics: [
      { label: 'Lumbar Relief', value: '100%' },
      { label: 'Spinal Angle', value: '0°', unit: 'deviation' }
    ]
  },
  {
    id: 'side',
    label: 'Side Sleeper',
    badge: 'SHOULDER & HIP RELIEF',
    title: 'Deep Pressure Offloading',
    subtitle: 'ACCOMMODATING CONTOURS',
    description: 'Targeted flex zones buckle under prominent bone structures like shoulders and hips while supporting the waist.',
    pressurePoints: [
      { name: 'Acromion Joint', x: 40, y: 32, intensity: 'high' },
      { name: 'Lateral Waist', x: 48, y: 48, intensity: 'low' },
      { name: 'Greater Trochanter', x: 42, y: 65, intensity: 'high' }
    ],
    metrics: [
      { label: 'Shoulder Strain', value: '-84%' },
      { label: 'Hip Pressure', value: '-78%' }
    ]
  },
  {
    id: 'combo',
    label: 'Combination Sleeper',
    badge: 'DYNAMIC ADAPTATION',
    title: 'Instant Posture Shift',
    subtitle: 'ZERO-DELAY REACTION',
    description: 'Hyper-elastic material instantly resets as you toss or turn, ensuring continuous uninterrupted sleep cycles.',
    pressurePoints: [
      { name: 'Torso Zone', x: 45, y: 38, intensity: 'med' },
      { name: 'Core Zone', x: 52, y: 55, intensity: 'med' },
      { name: 'Leg Zone', x: 48, y: 72, intensity: 'low' }
    ],
    metrics: [
      { label: 'Response Time', value: '0.01s' },
      { label: 'Sleep Continuity', value: '99%' }
    ]
  }
];

export function Act04BodyAdapt() {
  const [selectedPos, setSelectedPos] = useState<PositionData>(POSITIONS[0]);

  return (
    <section id="act-04" className="min-h-screen bg-[#F7F9FC] text-slate-900 section-padding flex flex-col justify-center relative overflow-hidden">
      
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#003B95_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] pointer-events-none" />

      <div className="section-container grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Selector & Editorial Header (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-[#003B95] mb-2 font-semibold">
              Adaptive Comfort
            </p>
            <h2 className="text-4xl md:text-5xl font-light font-serif tracking-tight leading-tight">
              Designed around <span className="italic text-[#003B95]">your posture.</span>
            </h2>
            <p className="text-slate-600 mt-4 leading-relaxed text-sm md:text-base max-w-[560px]">
              Select your primary sleeping posture to see how SmartGRID® dynamically redistributes weight and eliminates peak pressure points.
            </p>
          </div>

          {/* Position Selector Buttons */}
          <div className="flex flex-col gap-3">
            {POSITIONS.map((pos) => {
              const isSelected = selectedPos.id === pos.id;
              return (
                <button
                  key={pos.id}
                  onClick={() => setSelectedPos(pos)}
                  className={`flex items-center justify-between p-4 md:p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#003B95] text-[#003B95] shadow-lg shadow-[#003B95]/10 scale-[1.02]'
                      : 'bg-white/60 border-slate-200/80 text-slate-700 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <span className="font-serif text-lg md:text-xl font-light">{pos.label}</span>
                  <span className={`text-xs font-mono tracking-widest uppercase px-3 py-1 rounded-full ${
                    isSelected ? 'bg-[#003B95] text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {isSelected ? 'Active' : 'Select'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Dynamic Biomechanical Mattress Visualization & Experience Panel (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center space-y-6 relative">
          <div className="relative w-full aspect-[4/3] max-w-2xl bg-white/80 backdrop-blur-xl border border-white rounded-[32px] shadow-2xl p-6 sm:p-8 flex flex-col items-center justify-center overflow-hidden">
            
            {/* Mattress Outline SVG */}
            <svg className="w-full h-full max-h-[380px]" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Mattress Surface Base */}
              <rect x="50" y="40" width="300" height="220" rx="24" fill="#003B95" fillOpacity="0.03" stroke="#003B95" strokeOpacity="0.15" strokeWidth="2" />
              
              {/* SmartGRID Cell Pattern */}
              <g opacity="0.12" stroke="#003B95" strokeWidth="1">
                {Array.from({ length: 8 }).map((_, r) => (
                  <line key={`r-${r}`} x1="70" y1={70 + r * 22} x2="330" y2={70 + r * 22} />
                ))}
                {Array.from({ length: 12 }).map((_, c) => (
                  <line key={`c-${c}`} x1={80 + c * 20} y1={60} x2={80 + c * 20} y2={240} />
                ))}
              </g>

              {/* Spine Line Animation */}
              <motion.path
                key={selectedPos.id}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                d={
                  selectedPos.id === 'back'
                    ? "M200 65 Q200 110 200 150 T200 235"
                    : selectedPos.id === 'side'
                    ? "M175 65 Q195 110 180 150 T185 235"
                    : "M190 65 Q210 120 195 160 T200 235"
                }
                stroke="#003B95"
                strokeWidth="3"
                strokeDasharray="4 4"
              />

              {/* Pressure Points (Heatmap Glows) */}
              <AnimatePresence mode="wait">
                {selectedPos.pressurePoints.map((pt, idx) => {
                  const cx = (pt.x / 100) * 400;
                  const cy = (pt.y / 100) * 300;
                  const intensityColor = 
                    pt.intensity === 'high' ? '#E11D48' : pt.intensity === 'med' ? '#F59E0B' : '#10B981';
                  
                  return (
                    <g key={pt.name + idx}>
                      {/* Pulse Ring */}
                      <motion.circle
                        cx={cx}
                        cy={cy}
                        r="24"
                        fill={intensityColor}
                        fillOpacity="0.15"
                        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                      />
                      {/* Center Point */}
                      <circle cx={cx} cy={cy} r="6" fill={intensityColor} />
                    </g>
                  );
                })}
              </AnimatePresence>
            </svg>

            {/* Pressure Legend */}
            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-100 w-full justify-center text-xs font-mono uppercase tracking-wider text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                <span>Optimal</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                <span>Adapted</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48]" />
                <span>Offloaded</span>
              </div>
            </div>

          </div>

          {/* Floating Experience Panel */}
          <div className="w-full max-w-2xl">
            <ExperiencePanel
              badge={selectedPos.badge}
              title={selectedPos.title}
              subtitle={selectedPos.subtitle}
              description={selectedPos.description}
              metrics={selectedPos.metrics}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
