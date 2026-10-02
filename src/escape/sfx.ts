let ctx: AudioContext | null = null;
let muted = false;
try {
  muted = localStorage.getItem('chroma-muted') === '1';
} catch {
  /* ignore */
}

export const isMuted = () => muted;
export const setMuted = (m: boolean) => {
  muted = m;
  try {
    localStorage.setItem('chroma-muted', m ? '1' : '0');
  } catch {
    /* ignore */
  }
};

const tone = (freq: number, start: number, dur: number, type: OscillatorType = 'sine', vol = 0.08) => {
  if (muted) return;
  try {
    ctx = ctx ?? new AudioContext();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.setValueAtTime(vol, ctx.currentTime + start);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + dur);
    o.connect(g).connect(ctx.destination);
    o.start(ctx.currentTime + start);
    o.stop(ctx.currentTime + start + dur);
  } catch {
    /* audio unavailable */
  }
};

export const sfx = {
  click: () => tone(520, 0, 0.08, 'triangle'),
  found: () => {
    tone(660, 0, 0.1);
    tone(880, 0.09, 0.15);
  },
  bad: () => {
    tone(200, 0, 0.18, 'sawtooth', 0.06);
    tone(150, 0.12, 0.22, 'sawtooth', 0.06);
  },
  ok: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.1, 0.22, 'triangle')),
  travel: () => [330, 392, 440, 523, 587].forEach((f, i) => tone(f, i * 0.28, 0.3, 'sine', 0.05)),
  vault: () => [262, 330, 392, 523, 659, 784].forEach((f, i) => tone(f, i * 0.12, 0.3, 'triangle')),
};
