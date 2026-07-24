// Web Audio API helper for sound effects and optional retro romantic bgm

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isBgmPlaying = false;
  private bgmInterval: number | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a short cute popping dodge sound
  playDodgePop() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const startFreq = 300 + Math.random() * 200;
      const endFreq = startFreq + 200;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(startFreq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(endFreq, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {
      // Audio fallback silent ignore
    }
  }

  // Play celebratory chime/fanfare on YES click
  playCelebrationFanfare() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
      notes.forEach((freq, index) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        const startTime = this.ctx.currentTime + index * 0.1;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.45);
      });
    } catch {
      // Audio fallback silent ignore
    }
  }

  // Toggle sweet chiptune background lullaby melody
  toggleBgm(enable: boolean) {
    if (!enable) {
      this.isBgmPlaying = false;
      if (this.bgmInterval) {
        clearInterval(this.bgmInterval);
        this.bgmInterval = null;
      }
      return;
    }

    if (this.isBgmPlaying) return;
    this.isBgmPlaying = true;
    this.initCtx();

    // Soft cozy melody note loop (C Major pentatonic romantic melody)
    const melody = [
      { note: 392.00, duration: 0.3 }, // G4
      { note: 440.00, duration: 0.3 }, // A4
      { note: 523.25, duration: 0.4 }, // C5
      { note: 587.33, duration: 0.3 }, // D5
      { note: 659.25, duration: 0.6 }, // E5
      { note: 523.25, duration: 0.4 }, // C5
      { note: 587.33, duration: 0.4 }, // D5
      { note: 392.00, duration: 0.6 }, // G4
    ];

    let noteIdx = 0;
    this.bgmInterval = window.setInterval(() => {
      if (!this.isBgmPlaying || !this.ctx) return;
      const current = melody[noteIdx];
      noteIdx = (noteIdx + 1) % melody.length;

      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(current.note, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + current.duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + current.duration + 0.05);
      } catch {
        // Audio error silent ignore
      }
    }, 450);
  }
}

export const soundEngine = new SoundEngine();
