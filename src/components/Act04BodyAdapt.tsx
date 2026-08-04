import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Crosshair, MoveRight } from 'lucide-react';

export function Act04BodyAdapt() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0.95, 1, 0.95]);

  return (
    <div id="act-04" ref={containerRef} className="relative h-[150vh] bg-[#f8f9fa] overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
        <div className="w-[800px] h-[800px] rounded-full border-[1px] border-slate-900" />
        <div className="absolute w-[600px] h-[600px] rounded-full border-[1px] border-slate-900" />
        <div className="absolute w-[400px] h-[400px] rounded-full border-[1px] border-slate-900" />
      </div>
      
      <motion.div 
        style={{ opacity, scale }}
        className="max-w-4xl mx-auto px-6 text-center sticky top-1/2 -translate-y-1/2"
      >
        <div className="flex items-center justify-center gap-3 text-slate-500 font-mono text-xs uppercase tracking-widest mb-6">
          <Crosshair className="w-4 h-4" />
          <span>Act 04 — Adaptive Comfort</span>
        </div>
        
        <h2 className="text-5xl md:text-7xl font-light text-slate-900 tracking-tight leading-tight mb-8 font-serif">
          Adapts to every <br />
          <span className="italic text-[#003B95]">micro-movement.</span>
        </h2>
        
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          The SensAI algorithm continuously analyzes your sleeping posture, actively relieving pressure points before you even realize you need to shift.
        </p>

        <motion.div 
          style={{ y: y1 }}
          className="mt-16 flex items-center justify-center gap-12"
        >
          <div className="text-left">
            <div className="text-3xl font-light text-[#003B95] mb-2">2,500+</div>
            <div className="text-sm font-mono tracking-wider text-slate-500 uppercase">Sensors</div>
          </div>
          <div className="h-12 w-[1px] bg-slate-300" />
          <div className="text-left">
            <div className="text-3xl font-light text-[#003B95] mb-2">Real-time</div>
            <div className="text-sm font-mono tracking-wider text-slate-500 uppercase">Adjustment</div>
          </div>
          <div className="h-12 w-[1px] bg-slate-300" />
          <div className="text-left">
            <div className="text-3xl font-light text-[#003B95] mb-2">Zero</div>
            <div className="text-sm font-mono tracking-wider text-slate-500 uppercase">Pressure</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
