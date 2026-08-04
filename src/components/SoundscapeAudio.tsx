import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Radio, CloudRain, Waves, Sparkles } from 'lucide-react';
import { SoundscapeTrack } from '../types';

interface SoundscapeAudioProps {
  currentTrack: SoundscapeTrack;
  onTrackChange: (track: SoundscapeTrack) => void;
}

export const SoundscapeAudio: React.FC<SoundscapeAudioProps> = ({
  currentTrack,
  onTrackChange,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const activeNodesRef = useRef<(OscillatorNode | AudioBufferSourceNode | BiquadFilterNode)[]>([]);

  useEffect(() => {
    // Lazy init audio context on user interaction
    return () => {
      stopAudio();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const ensureAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
      gainNodeRef.current = audioCtxRef.current.createGain();
      gainNodeRef.current.gain.value = volume;
      gainNodeRef.current.connect(audioCtxRef.current.destination);
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const stopAudio = () => {
    activeNodesRef.current.forEach((node) => {
      try {
        if ('stop' in node && typeof node.stop === 'function') {
          node.stop();
        }
        node.disconnect();
      } catch {
        // ignore
      }
    });
    activeNodesRef.current = [];
  };

  const playTrack = (track: SoundscapeTrack) => {
    ensureAudioContext();
    stopAudio();

    if (track === 'off' || !audioCtxRef.current || !gainNodeRef.current) {
      setIsPlaying(false);
      return;
    }

    const ctx = audioCtxRef.current;
    const masterGain = gainNodeRef.current;

    if (track === 'delta') {
      // 432Hz + 434Hz for a deep 2Hz binaural delta wave
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();

      osc1.type = 'sine';
      osc1.frequency.value = 432;

      osc2.type = 'sine';
      osc2.frequency.value = 434;

      filter.type = 'lowpass';
      filter.frequency.value = 250;

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(masterGain);

      osc1.start();
      osc2.start();
      activeNodesRef.current = [osc1, osc2, filter];
      setIsPlaying(true);
    } else if (track === 'pink' || track === 'rain' || track === 'waves') {
      // Synthetic noise generator
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.11;
        b6 = white * 0.115926;
      }

      const whiteSource = ctx.createBufferSource();
      whiteSource.buffer = noiseBuffer;
      whiteSource.loop = true;

      const filter = ctx.createBiquadFilter();

      if (track === 'rain') {
        filter.type = 'lowpass';
        filter.frequency.value = 800;
      } else if (track === 'waves') {
        filter.type = 'bandpass';
        filter.frequency.value = 400;
        filter.Q.value = 1.2;

        // LFO to swell wave sound
        const lfo = ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 0.12; // wave frequency ~8 sec
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 200;
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        lfo.start();
        activeNodesRef.current.push(lfo);
      } else {
        filter.type = 'lowpass';
        filter.frequency.value = 1200;
      }

      whiteSource.connect(filter);
      filter.connect(masterGain);
      whiteSource.start();

      activeNodesRef.current.push(whiteSource, filter);
      setIsPlaying(true);
    }
  };

  const handleTrackSelect = (track: SoundscapeTrack) => {
    onTrackChange(track);
    playTrack(track);
  };

  const toggleMute = () => {
    if (currentTrack === 'off') {
      handleTrackSelect('delta');
    } else {
      handleTrackSelect('off');
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = val;
    }
  };

  return (
    <div 
      style={{ backgroundColor: '#10347e' }}
      className="flex items-center gap-2 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800 text-xs"
    >
      <button
        onClick={toggleMute}
        className="p-1 rounded-full hover:bg-slate-800 transition text-white/80 hover:text-blue-400"
        title={isPlaying ? 'Mute Soundscape' : 'Start Acoustic Delta Soundscape'}
      >
        {isPlaying ? <Volume2 className="w-3.5 h-3.5 text-blue-400 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
      </button>

      <div className="hidden sm:flex items-center gap-1">
        <button
          onClick={() => handleTrackSelect('delta')}
          className={`px-2 py-0.5 rounded-full transition ${
            currentTrack === 'delta' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'text-white/70 hover:text-white'
          }`}
        >
          <Sparkles className="w-3 h-3 inline mr-1" />
          432Hz Delta
        </button>

        <button
          onClick={() => handleTrackSelect('rain')}
          className={`px-2 py-0.5 rounded-full transition ${
            currentTrack === 'rain' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'text-white/70 hover:text-white'
          }`}
        >
          <CloudRain className="w-3 h-3 inline mr-1" />
          Nocturnal Rain
        </button>

        <button
          onClick={() => handleTrackSelect('waves')}
          className={`px-2 py-0.5 rounded-full transition ${
            currentTrack === 'waves' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'text-white/70 hover:text-white'
          }`}
        >
          <Waves className="w-3 h-3 inline mr-1" />
          Deep Surge
        </button>
      </div>

      {isPlaying && (
        <input
          type="range"
          min="0"
          max="0.8"
          step="0.05"
          value={volume}
          onChange={handleVolumeChange}
          className="w-12 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-400 hidden md:block"
        />
      )}
    </div>
  );
};
