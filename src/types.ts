export interface AppConfig {
  title: string;
  recipientName: string;
  anniversaryDate: string; // e.g. "2024-02-14" or custom label
  customMessage: string;
  enableMusic: boolean;
  enableSoundEffects: boolean;
}

export interface DodgeState {
  x: number;
  y: number;
  isAbsolute: boolean;
  count: number;
  phrase: string;
}

export interface MemoryPhoto {
  id: string;
  url: string;
  caption: string;
}
