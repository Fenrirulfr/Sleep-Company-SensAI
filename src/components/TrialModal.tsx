import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, ShieldCheck, CheckCircle2, Truck, Sparkles, MapPin, Phone, User, Mail, Sparkle } from 'lucide-react';
import { SleepDnaResult } from '../types';

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  dnaResult: SleepDnaResult | null;
}

export const TrialModal: React.FC<TrialModalProps> = ({ isOpen, onClose, dnaResult }) => {
  const [size, setSize] = useState<'queen' | 'king' | 'custom'>('king');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
          {/* Animated Background Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-[24px] p-8 sm:p-10 max-w-xl w-full relative border border-slate-100 shadow-[0_30px_70px_rgba(0,0,0,0.12)] max-h-[90vh] overflow-y-auto z-10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close Trial Reservation Modal"
            className="absolute top-6 right-6 p-2 rounded-full bg-slate-50 border border-slate-100 text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-all duration-300 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {submitted ? (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto text-emerald-600 animate-pulse">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-3xl font-light text-slate-900 font-serif-editorial">
                  In-Home Trial Reserved
                </h3>
                <p className="text-xs text-[#003B95] font-semibold tracking-widest uppercase">
                  Tomorrow Begins Tonight
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                Thank you, <span className="font-semibold text-slate-900">{formData.name || 'Valued Guest'}</span>. A SensAI Sleep Concierge representative will contact you shortly at <span className="text-[#003B95] font-medium">{formData.phone || 'your phone number'}</span> to coordinate white-glove setup and pre-calibrate your mattress with your Sleep DNA Profile.
              </p>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 text-left space-y-2.5 max-w-md mx-auto">
                <h4 className="text-[10px] font-mono font-bold text-slate-400 tracking-wider uppercase">Reservation Summary</h4>
                <div className="h-[1px] bg-slate-200/60 w-full" />
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-light">Mattress Size:</span>
                    <span className="text-slate-800 font-semibold capitalize">{size} Size</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-light">Trial Window:</span>
                    <span className="text-[#003B95] font-semibold">100 Nights Risk-Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-light">Pre-Calibrated Mode:</span>
                    <span className="text-slate-800 font-semibold">{dnaResult?.recommendedSmartGridMode || 'Zero-Gravity Adaptive REM'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-light">Concierge Delivery:</span>
                    <span className="text-emerald-600 font-medium">Complimentary Setup</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-4 rounded-full bg-slate-900 text-white font-medium text-xs tracking-widest uppercase hover:bg-slate-800 transition-all duration-300 shadow-md cursor-pointer mt-4"
              >
                Return to Experience
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-3xl font-light text-slate-900 font-serif-editorial leading-tight">
                  Reserve 100-Night Trial
                </h3>
                <p className="text-xs text-slate-500 mt-1.5">
                  Sleep on SensAI for 100 nights in your own bedroom. Experience absolute comfort with zero financial obligation.
                </p>
              </div>

              {/* Size Selection */}
              <div>
                <label className="block text-[10px] font-semibold tracking-wider text-slate-400 uppercase mb-2.5">
                  Select Mattress Dimension:
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'queen', label: 'Queen', dim: '60" x 80"' },
                    { id: 'king', label: 'King', dim: '76" x 80"' },
                    { id: 'custom', label: 'Custom Duo', dim: 'Dual-Zone Sync' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSize(item.id as 'queen' | 'king' | 'custom')}
                      className={`p-3.5 rounded-2xl text-center border transition-all duration-300 cursor-pointer ${
                        size === item.id
                          ? 'bg-[#003B95]/5 border-[#003B95] text-[#003B95] shadow-sm'
                          : 'bg-slate-50/50 border-slate-200/80 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className={`text-xs font-semibold ${size === item.id ? 'text-[#003B95]' : 'text-slate-800'}`}>
                        {item.label}
                      </div>
                      <div className="text-[9px] text-slate-400 font-mono mt-0.5">{item.dim}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-semibold tracking-wider text-slate-400 uppercase mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Elizabeth Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#003B95] focus:border-[#003B95] transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-semibold tracking-wider text-slate-400 uppercase mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder="elizabeth@residences.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#003B95] focus:border-[#003B95] transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold tracking-wider text-slate-400 uppercase mb-1.5">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#003B95] focus:border-[#003B95] transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold tracking-wider text-slate-400 uppercase mb-1.5">
                    City / Region
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mumbai, Maharashtra"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#003B95] focus:border-[#003B95] transition-all duration-300"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 flex items-start gap-3">
                <Truck className="w-4 h-4 text-[#003B95] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Complimentary unboxing, custom bedroom placement, SmartGRID calibration, and old mattress removal are fully covered by our expert delivery squad.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#003B95] text-white font-semibold text-xs tracking-widest uppercase hover:bg-[#002a6b] active:scale-[0.98] transition-all duration-300 shadow-[0_10px_30px_rgba(0,59,149,0.15)] hover:shadow-[0_15px_40px_rgba(0,59,149,0.25)] cursor-pointer"
              >
                Confirm 100-Night In-Home Trial
              </button>
            </form>
          )}
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
};
