import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Layers } from 'lucide-react';

export function Act05Layers() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const layer1Y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const layer3Y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0.3, 0.5, 0.8], [0, 1, 0]);

  return (
    <div id="act-05" ref={containerRef} className="relative h-[200vh] bg-slate-900 text-white overflow-hidden">
      <div className="sticky top-0 h-screen flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto px-6 gap-12">
        
        <motion.div style={{ opacity }} className="flex-1 max-w-lg z-10">
          <div className="flex items-center gap-3 text-slate-400 font-mono text-xs uppercase tracking-widest mb-6">
            <Layers className="w-4 h-4" />
            <span>Act 05 — Experience Layers</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-light tracking-tight leading-tight mb-8 font-serif">
            Engineered for <br />
            <span className="italic text-slate-400">recovery.</span>
          </h2>
          <p className="text-xl text-slate-400 leading-relaxed">
            Every layer serves a distinct physiological purpose. From temperature regulation to deep spinal support, working in perfect harmony.
          </p>
        </motion.div>

        <div className="flex-1 relative h-[60vh] w-full max-w-lg perspective-1000">
          <motion.div 
            style={{ y: layer1Y }}
            className="absolute top-1/4 left-0 right-0 h-32 bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-2xl flex items-center px-8 shadow-2xl transform rotate-x-12"
          >
            <div>
              <h3 className="text-xl text-white font-medium mb-1">Cooling Cover</h3>
              <p className="text-slate-400 text-sm font-mono uppercase tracking-wider">Phase Change Material</p>
            </div>
          </motion.div>

          <motion.div 
            style={{ y: layer2Y }}
            className="absolute top-2/4 left-0 right-0 h-32 bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-2xl flex items-center px-8 shadow-2xl transform rotate-x-12"
          >
            <div>
              <h3 className="text-xl text-white font-medium mb-1">Adaptive Comfort</h3>
              <p className="text-slate-400 text-sm font-mono uppercase tracking-wider">SensAI SmartGRID</p>
            </div>
          </motion.div>

          <motion.div 
            style={{ y: layer3Y }}
            className="absolute top-3/4 left-0 right-0 h-32 bg-slate-800/40 backdrop-blur-md border border-slate-700/30 rounded-2xl flex items-center px-8 shadow-2xl transform rotate-x-12"
          >
            <div>
              <h3 className="text-xl text-white font-medium mb-1">Deep Support</h3>
              <p className="text-slate-400 text-sm font-mono uppercase tracking-wider">Ergonomic Base</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
