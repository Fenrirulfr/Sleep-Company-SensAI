export type ActId = 
  | 'arrival'
  | 'sensai'
  | 'smartgrid'
  | 'body-adapt'
  | 'layers'
  | 'night-journey'
  | 'modern-homes'
  | 'experience';

export interface ActConfig {
  id: ActId;
  actNumber: string;
  title: string;
  subtitle: string;
  navLabel: string;
}

export type SleepPosition = 'side' | 'back' | 'stomach' | 'combo';
export type BodyType = 'light' | 'medium' | 'heavy' | 'athletic';
export type TemperatureTendency = 'hot' | 'neutral' | 'cold' | 'sweats';
export type PrimaryDisturbance = 'toss' | 'lumbar' | 'snore' | 'restless';

export interface SleepProfile {
  position: SleepPosition;
  bodyType: BodyType;
  temperature: TemperatureTendency;
  disturbance: PrimaryDisturbance;
  customNotes: string;
}

export interface SleepDnaResult {
  recoveryScore: number;
  sleepDnaSummary: string;
  pressureReliefFocus: string[];
  recommendedSmartGridMode: string;
  tailoredMicroAdjustments: string;
  wellnessTips: string[];
}

export type SleepModeId = 'zerog' | 'rem' | 'snore' | 'thermo' | 'wake';

export interface SleepMode {
  id: SleepModeId;
  name: string;
  tagline: string;
  description: string;
  elevation: string;
  frequency: string;
  airflow: string;
  benefit: string;
  iconName: string;
}

export type SoundscapeTrack = 'off' | 'delta' | 'rain' | 'waves' | 'pink';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'sensai';
  text: string;
  timestamp: string;
}
