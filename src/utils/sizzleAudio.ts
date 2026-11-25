export class KitchenSizzleAudio {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private sizzleFilter: BiquadFilterNode | null = null;
  private simmerGain: GainNode | null = null;
  private crackleTimer: number | null = null;
  private enabled = false;
  private currentStep = 1;

  toggle(): boolean {
    if (this.enabled) {
      this.stop();
      return false;
    }
    this.start();
    return true;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  setStep(step: number): void {
    this.currentStep = step;
    if (!this.ctx || !this.sizzleFilter || !this.simmerGain || !this.enabled) return;
    const now = this.ctx.currentTime;
    const freqMap: Record<number, number> = { 1: 4200, 2: 3400, 3: 1800, 4: 1100 };
    const gainMap: Record<number, number> = { 1: 0.08, 2: 0.1, 3: 0.075, 4: 0.04 };
    this.sizzleFilter.frequency.setTargetAtTime(freqMap[step] ?? 2600, now, 0.35);
    this.simmerGain.gain.setTargetAtTime(gainMap[step] ?? 0.06, now, 0.35);
  }

  start(): void {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    if (!this.ctx) {
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0;
      this.masterGain.connect(this.ctx.destination);

      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let b0 = 0;
      let b1 = 0;
      let b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99765 * b0 + white * 0.099046;
        b1 = 0.963 * b1 + white * 0.2965164;
        b2 = 0.57 * b2 + white * 1.0526913;
        data[i] = (b0 + b1 + b2 + white * 0.1848) * 0.15;
      }

      const source = this.ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;

      this.sizzleFilter = this.ctx.createBiquadFilter();
      this.sizzleFilter.type = 'bandpass';
      this.sizzleFilter.frequency.value = 3200;
      this.sizzleFilter.Q.value = 0.7;

      this.simmerGain = this.ctx.createGain();
      this.simmerGain.gain.value = 0.07;

      source.connect(this.sizzleFilter);
      this.sizzleFilter.connect(this.simmerGain);
      this.simmerGain.connect(this.masterGain);
      source.start();
    }

    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }

    this.enabled = true;
    const now = this.ctx.currentTime;
    this.masterGain?.gain.setTargetAtTime(0.85, now, 0.25);
    this.setStep(this.currentStep);
    this.scheduleCrackle();
  }

  private scheduleCrackle(): void {
    if (!this.enabled || !this.ctx || !this.masterGain) return;
    const delay =
      this.currentStep <= 2 ? 120 + Math.random() * 260 : 240 + Math.random() * 480;
    this.crackleTimer = window.setTimeout(() => {
      this.triggerPop();
      this.scheduleCrackle();
    }, delay);
  }

  private triggerPop(): void {
    if (!this.ctx || !this.masterGain || !this.enabled) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    if (this.currentStep <= 2) {
      osc.type = 'triangle';
      const freq = 1800 + Math.random() * 2400;
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.035);
      filter.type = 'highpass';
      filter.frequency.value = 1200;
      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.045);
    } else {
      osc.type = 'sine';
      const freq = 180 + Math.random() * 140;
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.65, now + 0.06);
      gain.gain.setValueAtTime(0.028, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.075);
    }
  }

  stop(): void {
    this.enabled = false;
    if (this.crackleTimer !== null) {
      clearTimeout(this.crackleTimer);
      this.crackleTimer = null;
    }
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.15);
    }
  }

  dispose(): void {
    this.stop();
    if (this.ctx) {
      void this.ctx.close();
      this.ctx = null;
    }
  }
}
