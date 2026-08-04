import React from 'react';
import { motion } from 'motion/react';
import { ExperiencePanel } from './ExperiencePanel';

interface MetricItem {
  id: string;
  label: string;
  value: string;
  sub: string;
  progressVal: number;
}

const METRICS: MetricItem[] = [
  {
    id: 'comfort',
    label: 'Comfort Balance',
    value: '98%',
    sub: 'Equilibrium Achieved',
    progressVal: 98
  },
  {
    id: 'movement',
    label: 'Movement Index',
    value: '1.2',
    sub: 'Micro-shifts per hour',
    progressVal: 12
  },
  {
    id: 'recovery',
    label: 'Recovery Efficiency',
    value: '94%',
    sub: 'Deep Delta Stage',
    progressVal: 94
  },
  {
    id: 'duration',
    label: 'Sleep Duration',
    value: '8h 15m',
    sub: '100% Target Met',
    progressVal: 85
  }
];

export function Act07SleepInsights() {
  return (
    <section id="act-07" className="min-h-screen bg-[#F8F9FC] text-slate-900 section-padding flex flex-col justify-center relative overflow-hidden">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#003B95]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="section-container grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Editorial & Description (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-[#003B95] mb-2 font-semibold">
              Sleep Insights
            </p>
            <h2 className="text-4xl md:text-5xl font-light font-serif tracking-tight leading-tight">
              Understand your <span className="italic text-[#003B95]">nightly recovery.</span>
            </h2>
            <p className="text-slate-600 mt-4 leading-relaxed text-sm md:text-base max-w-[560px]">
              SensAI collects non-invasive spatial biomechanical indicators, painting a clear picture of your body's nightly rejuvenation cycles.
            </p>
          </div>

          <ExperiencePanel
            badge="CONCEPTUAL METRICS"
            title="Restorative Dynamics"
            subtitle="NON-CLINICAL BIOMETRIC HARMONY"
            description="Analyzes structural contouring and micro-pressure shifts without wearable sensors or intrusive equipment."
            metrics={[
              { label: 'Overall Recovery', value: '96%', unit: 'score' },
              { label: 'REM Delta Shift', value: 'Optimal' }
            ]}
          />

          <p className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">
            * Illustrative visualization.
          </p>
        </div>

        {/* Right Column: Sequential Conceptual Dashboard (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white/80 backdrop-blur-2xl border border-white rounded-[32px] p-8 md:p-10 shadow-2xl shadow-slate-900/5 space-y-8">
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-serif font-light text-slate-900">Sleep Intelligence Dashboard</h3>
                <p className="text-xs font-mono uppercase tracking-widest text-[#003B95] mt-1">Live Spatial Telemetry</p>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {/* Sequential Metrics List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {METRICS.map((metric, idx) => (
                <motion.div
                  key={metric.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="bg-slate-50/80 border border-slate-200/60 rounded-2xl p-6 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-500">{metric.label}</span>
                    <span className="text-2xl font-serif text-[#003B95] font-light">{metric.value}</span>
                  </div>
                  <p className="text-xs text-slate-400 font-sans">{metric.sub}</p>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200/80 h-1.5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${metric.progressVal}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 + idx * 0.15, ease: "easeOut" }}
                      className="bg-[#003B95] h-full rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
