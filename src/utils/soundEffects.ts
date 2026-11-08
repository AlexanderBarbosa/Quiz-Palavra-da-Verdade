class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;

  constructor() {
    // Check saved preference
    const savedMute = localStorage.getItem('quiz_muted');
    if (savedMute !== null) {
      this.isMuted = savedMute === 'true';
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    localStorage.setItem('quiz_muted', String(this.isMuted));
    if (!this.isMuted) {
      // Play a lovely melodic test chime when unmuting!
      this.playChimePreview();
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  // Melodic preview chime
  public playChimePreview(): void {
    const ctx = this.getContext();
    if (!ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      this.playBellNote(ctx, freq, ctx.currentTime + i * 0.08, 0.4, 0.2);
    });
  }

  // Helper: Bell / Marimba synthesis with warm natural harmonics
  private playBellNote(
    ctx: AudioContext,
    freq: number,
    startTime: number,
    duration: number = 0.5,
    volume: number = 0.2
  ): void {
    // Fundamental sine
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, startTime);

    gain1.gain.setValueAtTime(0.0001, startTime);
    gain1.gain.exponentialRampToValueAtTime(volume, startTime + 0.015);
    gain1.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc1.connect(gain1);
    gain1.connect(this.masterGain || ctx.destination);

    osc1.start(startTime);
    osc1.stop(startTime + duration + 0.05);

    // Harmonic overtone (octave + fifth) for sparkling crystal tone
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2.756, startTime);

    gain2.gain.setValueAtTime(0.0001, startTime);
    gain2.gain.exponentialRampToValueAtTime(volume * 0.35, startTime + 0.01);
    gain2.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.6);

    osc2.connect(gain2);
    gain2.connect(this.masterGain || ctx.destination);

    osc2.start(startTime);
    osc2.stop(startTime + duration + 0.05);
  }

  // Attractive click / selection: Warm Wooden Kalimba tap
  public playClick(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const t = ctx.currentTime;
    // Layer 1: Body tone
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(587.33, t); // D5
    osc.frequency.exponentialRampToValueAtTime(880, t + 0.04);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    osc.connect(gain);
    gain.connect(this.masterGain || ctx.destination);

    osc.start(t);
    osc.stop(t + 0.09);

    // Layer 2: Soft wood tap transient
    const tap = ctx.createOscillator();
    const tapGain = ctx.createGain();
    tap.type = 'sine';
    tap.frequency.setValueAtTime(1200, t);
    tap.frequency.exponentialRampToValueAtTime(300, t + 0.02);

    tapGain.gain.setValueAtTime(0.15, t);
    tapGain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);

    tap.connect(tapGain);
    tapGain.connect(this.masterGain || ctx.destination);

    tap.start(t);
    tap.stop(t + 0.04);
  }

  // Realistic Acoustic Studio Woodblock Tick
  public playTick(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(920, t);
    osc.frequency.exponentialRampToValueAtTime(650, t + 0.035);

    gain.gain.setValueAtTime(0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

    osc.connect(gain);
    gain.connect(this.masterGain || ctx.destination);

    osc.start(t);
    osc.stop(t + 0.05);
  }

  // Cinematic Suspense Lock-in: Deep dramatic brass swell & metallic chime
  public playLockIn(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const t = ctx.currentTime;

    // Sub-bass dramatic swell
    const sub = ctx.createOscillator();
    const subGain = ctx.createGain();
    sub.type = 'triangle';
    sub.frequency.setValueAtTime(110, t); // A2
    sub.frequency.exponentialRampToValueAtTime(82.4, t + 0.5); // E2

    subGain.gain.setValueAtTime(0.001, t);
    subGain.gain.linearRampToValueAtTime(0.3, t + 0.12);
    subGain.gain.exponentialRampToValueAtTime(0.01, t + 0.6);

    sub.connect(subGain);
    subGain.connect(this.masterGain || ctx.destination);

    sub.start(t);
    sub.stop(t + 0.65);

    // Dramatic metallic tension chord
    [220, 277.18, 329.63].forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.55);

      osc.connect(gain);
      gain.connect(this.masterGain || ctx.destination);

      osc.start(t);
      osc.stop(t + 0.6);
    });
  }

  // Triumphant Celestial Fanfare (Majestic brass + golden bells)
  public playCorrect(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const t = ctx.currentTime;
    // Harmonic arpeggio: G4, C5, E5, G5, C6 (radiant major chord)
    const melody = [
      { freq: 392.00, delay: 0.00, dur: 0.35, vol: 0.22 }, // G4
      { freq: 523.25, delay: 0.08, dur: 0.35, vol: 0.24 }, // C5
      { freq: 659.25, delay: 0.16, dur: 0.38, vol: 0.26 }, // E5
      { freq: 783.99, delay: 0.24, dur: 0.42, vol: 0.28 }, // G5
      { freq: 1046.50, delay: 0.34, dur: 0.85, vol: 0.32 }, // C6 (high triumphant resolution)
    ];

    melody.forEach((note) => {
      const noteTime = t + note.delay;

      // Layer A: Golden warm bell
      this.playBellNote(ctx, note.freq, noteTime, note.dur, note.vol);

      // Layer B: Harmonic warmth (sawtooth filtered into brass warmth)
      const brass = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const brassGain = ctx.createGain();

      brass.type = 'sawtooth';
      brass.frequency.setValueAtTime(note.freq, noteTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, noteTime);

      brassGain.gain.setValueAtTime(0.001, noteTime);
      brassGain.gain.linearRampToValueAtTime(note.vol * 0.4, noteTime + 0.03);
      brassGain.gain.exponentialRampToValueAtTime(0.001, noteTime + note.dur * 0.7);

      brass.connect(filter);
      filter.connect(brassGain);
      brassGain.connect(this.masterGain || ctx.destination);

      brass.start(noteTime);
      brass.stop(noteTime + note.dur);
    });
  }

  // Soft Sorrowful Descent (Low warm cello note + muted bell, not an aggressive buzz)
  public playWrong(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const t = ctx.currentTime;

    // Sorrowful minor descent: Eb4 -> C4 -> Ab3
    const tones = [
      { freq: 311.13, delay: 0.00 }, // Eb4
      { freq: 261.63, delay: 0.14 }, // C4
      { freq: 207.65, delay: 0.28 }, // Ab3
    ];

    tones.forEach((tone) => {
      const noteTime = t + tone.delay;
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(tone.freq, noteTime);
      osc.frequency.exponentialRampToValueAtTime(tone.freq * 0.95, noteTime + 0.35);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, noteTime);

      gain.gain.setValueAtTime(0.001, noteTime);
      gain.gain.linearRampToValueAtTime(0.22, noteTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.4);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain || ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.45);
    });

    // Deep gentle low gong
    const gong = ctx.createOscillator();
    const gongGain = ctx.createGain();
    gong.type = 'sine';
    gong.frequency.setValueAtTime(110, t);
    gong.frequency.exponentialRampToValueAtTime(65, t + 0.6);

    gongGain.gain.setValueAtTime(0.25, t);
    gongGain.gain.exponentialRampToValueAtTime(0.001, t + 0.7);

    gong.connect(gongGain);
    gongGain.connect(this.masterGain || ctx.destination);

    gong.start(t);
    gong.stop(t + 0.75);
  }

  // Sparkling Heavenly Harp Glissando (Lifelines: Cartas, Estudiosos, Placas)
  public playLifeline(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const t = ctx.currentTime;
    // Pentatonic heavenly scale: C5, D5, E5, G5, A5, C6
    const harpNotes = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];

    harpNotes.forEach((freq, idx) => {
      const noteTime = t + idx * 0.055;
      this.playBellNote(ctx, freq, noteTime, 0.45, 0.18);
    });
  }

  // Grand Celestial Symphony for 1 Million Victory!
  public playMillionWin(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const t = ctx.currentTime;

    // Glorious multi-stage fanfare chords
    const chordProgressions = [
      { notes: [523.25, 659.25, 783.99], time: 0.0, dur: 0.3 }, // C Major
      { notes: [587.33, 739.99, 880.00], time: 0.28, dur: 0.3 }, // D Major
      { notes: [659.25, 783.99, 987.77], time: 0.56, dur: 0.35 }, // E Minor
      { notes: [783.99, 987.77, 1174.66], time: 0.90, dur: 0.4 }, // G Major
      { notes: [1046.50, 1318.51, 1567.98, 2093.00], time: 1.30, dur: 2.2 }, // Triumphant C Major High
    ];

    chordProgressions.forEach((chord) => {
      const chordTime = t + chord.time;
      chord.notes.forEach((freq) => {
        this.playBellNote(ctx, freq, chordTime, chord.dur, 0.22);

        // Rich synth layer
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, chordTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1800, chordTime);

        gain.gain.setValueAtTime(0.001, chordTime);
        gain.gain.linearRampToValueAtTime(0.12, chordTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, chordTime + chord.dur * 0.9);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain || ctx.destination);

        osc.start(chordTime);
        osc.stop(chordTime + chord.dur);
      });
    });
  }
}

export const sound = new SoundManager();
