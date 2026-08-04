import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExperiencePanel } from './ExperiencePanel';

interface LayerData {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  material: string;
  color: string;
  metrics: Array<{ label: string; value: string | number; unit?: string }>;
}

const LAYERS: LayerData[] = [
  {
    id: 'layer-1',
    badge: 'SURFACE LAYER',
    title: 'Japanese Silk-Blend Quilted Cover',
    subtitle: 'TACTILE TEMPERATURE CONTROL',
    description: 'Phase-change threads woven into breathable Japanese silk absorb excess body heat during initial REM entry.',
    material: 'PCM Silk Weave',
    color: 'from-slate-100 to-white',
    metrics: [
      { label: 'Thermal Cooling', value: 'Instant' },
      { label: 'Weave Density', value: '400', unit: 'GSM' }
    ]
  },
  {
    id: 'layer-2',
    badge: 'CORE LAYER',
    title: 'Hyper-Elastic SmartGRID® Matrix',
    subtitle: 'PATENTED DUAL-ZONE FLEX',
    description: 'Over 2,500 open-air channels provide continuous pressure relief and zero heat trapping.',
    material: 'Patented Polymer Grid',
    color: 'from-blue-50 to-blue-100/60',
    metrics: [
      { label: 'Air Flow', value: '2,500+', unit: 'channels' },
      { label: 'Durability', value: '10+', unit: 'years' }
    ]
  },
  {
    id: 'layer-3',
    badge: 'TRANSITION LAYER',
    title: 'High-Resilience Response Foam',
    subtitle: 'ADAPTIVE MOTION ISOLATION',
    description: 'Micro-cellular structure absorbs lateral vibrations, ensuring partner movements remain completely undetected.',
    material: 'High-Resilience Polyfoam',
    color: 'from-slate-200/80 to-slate-100',
    metrics: [
      { label: 'Motion Dampening', value: '100%' },
      { label: 'Response Time', value: '0.02s' }
    ]
  },
  {
    id: 'layer-4',
    badge: 'FOUNDATION LAYER',
    title: '5-Zone Ergonomic Base Core',
    subtitle: 'ALIGNED SPINAL FOUNDATION',
    description: 'Heavy-duty structural core engineered for lifetime anti-sag performance and total posture stability.',
    material: 'High-Density Base Core',
    color: 'from-slate-300/80 to-slate-200',
    metrics: [
      { label: 'Structural Support', value: '5-Zone' },
      { label: 'Sag Resistance', value: 'Lifetime' }
    ]
  }
];

export function Act05Layers() {
  const [activeLayer, setActiveLayer] = useState<LayerData>(LAYERS[1]);

  return (
    <section id="act-05" className="min-h-screen bg-white text-slate-900 py-16 md:py-20 lg:py-24 px-6 md:px-12 lg:px-16 flex flex-col justify-center relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Stacked Layer Visualization (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center space-y-3">
          <div className="w-full max-w-xl space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-[#003B95] mb-4 font-semibold">
              Interactive Anatomy — Hover Any Layer
            </div>

            {LAYERS.map((layer) => {
              const isSelected = activeLayer.id === layer.id;
              return (
                <motion.div
                  key={layer.id}
                  onMouseEnter={() => setActiveLayer(layer)}
                  onClick={() => setActiveLayer(layer)}
                  animate={{
                    scale: isSelected ? 1.03 : 0.98,
                    opacity: isSelected ? 1 : 0.6,
                    y: isSelected ? -4 : 0
                  }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className={`p-6 md:p-8 rounded-[20px] border cursor-pointer transition-all duration-300 bg-gradient-to-r ${layer.color} ${
                    isSelected
                      ? 'border-[#003B95] shadow-xl shadow-[#003B95]/10 ring-2 ring-[#003B95]/20'
                      : 'border-slate-200/80 hover:border-slate-300 hover:opacity-90'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest uppercase text-[#003B95] font-bold block mb-1">
                        {layer.badge}
                      </span>
                      <h3 className="text-xl md:text-2xl font-serif font-light text-slate-900">
                        {layer.title}
                      </h3>
                    </div>
                    <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                      {layer.material}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Editorial & Single Floating Experience Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-[#003B95] mb-2 font-semibold">
              Experience Every Layer
            </p>
            <h2 className="text-4xl md:text-5xl font-light font-serif tracking-tight leading-tight">
              Engineered for <span className="italic text-[#003B95]">cellular recovery.</span>
            </h2>
            <p className="text-slate-600 mt-4 leading-relaxed text-sm md:text-base max-w-[560px]">
              Each layer serves a dedicated biomechanical purpose. Hover across the anatomical slice to reveal material specifications.
            </p>
          </div>

          {/* Single Reusable Experience Panel */}
          <ExperiencePanel
            badge={activeLayer.badge}
            title={activeLayer.title}
            subtitle={activeLayer.subtitle}
            description={activeLayer.description}
            metrics={activeLayer.metrics}
          />
        </div>

      </div>
    </section>
  );
}
