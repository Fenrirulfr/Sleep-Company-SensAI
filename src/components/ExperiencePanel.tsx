import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface ExperiencePanelProps {
  badge?: string;
  title: string;
  subtitle?: string;
  description?: string;
  metrics?: Array<{ label: string; value: string | number; unit?: string }>;
  children?: React.ReactNode;
  className?: string;
  dark?: boolean;
}

export function ExperiencePanel({
  badge,
  title,
  subtitle,
  description,
  metrics,
  children,
  className = '',
  dark = false
}: ExperiencePanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-[20px] md:rounded-[32px] p-6 sm:p-8 md:p-10 backdrop-blur-[24px] transition-all duration-300 shadow-2xl ${
        dark
          ? 'bg-slate-900/60 border border-white/10 text-white'
          : 'bg-white/90 border border-black/[0.06] text-slate-900 shadow-slate-900/[0.04]'
      } ${className}`}
      style={{
        boxShadow: dark
          ? '0 32px 64px rgba(0, 0, 0, 0.4)'
          : '0 32px 64px rgba(0, 0, 0, 0.05)',
      }}
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={title + (subtitle || '')}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 md:space-y-6"
        >
          {badge && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] md:text-[11px] font-mono tracking-widest uppercase bg-[#003B95]/10 text-[#003B95] dark:bg-white/10 dark:text-white/90 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#003B95] dark:bg-blue-400 animate-pulse" />
              {badge}
            </div>
          )}

          <div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-light font-serif tracking-tight leading-[1.1]">
              {title}
            </h3>
            {subtitle && (
              <p className={`text-[10px] md:text-[11px] font-mono uppercase tracking-[0.2em] mt-2 font-bold ${
                dark ? 'text-slate-400' : 'text-[#003B95]'
              }`}>
                {subtitle}
              </p>
            )}
          </div>

          {description && (
            <p className={`text-sm md:text-base lg:text-lg leading-relaxed max-w-[560px] font-light ${
              dark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {description}
            </p>
          )}

          {metrics && metrics.length > 0 && (
            <div className={`grid grid-cols-${Math.min(metrics.length, 3)} gap-4 md:gap-8 pt-6 border-t ${
              dark ? 'border-white/10' : 'border-slate-200/60'
            }`}>
              {metrics.map((metric, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className={`text-xl md:text-3xl font-light font-serif ${
                    dark ? 'text-white' : 'text-[#003B95]'
                  }`}>
                    {metric.value}
                    {metric.unit && <span className="text-[10px] md:text-xs font-sans ml-0.5 text-slate-400 font-bold uppercase">{metric.unit}</span>}
                  </div>
                  <div className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.15em] text-slate-400 font-bold">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {children}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
