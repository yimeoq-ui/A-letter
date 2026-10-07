// Realistic Web Audio API Synthesizer for Natural Kraft Paper (Giấy Craft Tự Nhiên)
// Warm, dry, fibrous paper friction and gentle folding acoustics without harsh high hiss or synthetic chimes.

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Creates a natural dry kraft paper friction grain ("tiếng giấy craft tự nhiên"):
 * Uses warm brown/pink filtered noise with organic fiber micro-impulses and a
 * natural low-pass roll-off so it sounds like thick, unbleached craft paper.
 */
function triggerKraftPaperStroke(
  ctx: AudioContext,
  startTime: number,
  duration: number,
  bodyFreqStart: number,
  bodyFreqEnd: number,
  peakGain: number,
  grainRate = 14
) {
  const sampleRate = ctx.sampleRate;
  const bufferSize = Math.floor(sampleRate * duration);
  const buffer = ctx.createBuffer(1, bufferSize, sampleRate);
  const data = buffer.getChannelData(0);

  // Warm brown-pink noise state for thick fibrous paper body
  let lastOut = 0;
  let b0 = 0,
    b1 = 0,
    b2 = 0;

  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;

    // Brownian integration for warm low-mid paper thickness
    lastOut = (lastOut + 0.045 * white) / 1.045;
    // Soft pink layer for dry surface fiber friction
    b0 = 0.997 * b0 + white * 0.029;
    b1 = 0.985 * b1 + white * 0.048;
    b2 = 0.94 * b2 + white * 0.085;
    const fiber = lastOut * 1.8 + (b0 + b1 + b2) * 0.22;

    // Irregular dry paper crease micro-impulses (natural kraft crinkle)
    const t = i / sampleRate;
    const handMovementEnvelope =
      0.55 +
      0.45 *
        Math.sin(2 * Math.PI * grainRate * t + Math.sin(2 * Math.PI * 3.7 * t) * 1.6);

    // Subtle dry fiber snap when kraft paper bends
    const dryFiberSnap =
      Math.random() > 0.992 ? (Math.random() * 2 - 1) * 0.45 : 0;

    data[i] = (fiber * handMovementEnvelope + dryFiberSnap) * 0.55;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  // 1. High-pass filter to remove sub-bass rumble (< 120Hz)
  const highpass = ctx.createBiquadFilter();
  highpass.type = 'highpass';
  highpass.frequency.setValueAtTime(125, startTime);

  // 2. Warm resonant bandpass representing thick kraft paper cavity (300Hz - 950Hz)
  const bandpass = ctx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.Q.setValueAtTime(1.15, startTime);
  bandpass.frequency.setValueAtTime(bodyFreqStart, startTime);
  bandpass.frequency.exponentialRampToValueAtTime(bodyFreqEnd, startTime + duration);

  // 3. Natural low-pass roll-off to eliminate synthetic/plastic high-frequency hiss
  const lowpass = ctx.createBiquadFilter();
  lowpass.type = 'lowpass';
  lowpass.frequency.setValueAtTime(1550, startTime);
  lowpass.Q.setValueAtTime(0.7, startTime);

  // Smooth organic amplitude envelope
  const gainNode = ctx.createGain();
  gainNode.gain.setValueAtTime(0.0001, startTime);
  gainNode.gain.linearRampToValueAtTime(peakGain, startTime + duration * 0.18);
  gainNode.gain.setValueAtTime(peakGain * 0.82, startTime + duration * 0.62);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  source.connect(highpass);
  highpass.connect(bandpass);
  bandpass.connect(lowpass);
  lowpass.connect(gainNode);
  gainNode.connect(ctx.destination);

  source.start(startTime);
  source.stop(startTime + duration + 0.02);
}

/**
 * Subtle warm paper thump/flex when thick cardstock bends or unfolds.
 */
function triggerPaperFlexThud(ctx: AudioContext, startTime: number, gainAmount = 0.12) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(155, startTime);
  osc.frequency.exponentialRampToValueAtTime(68, startTime + 0.075);

  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.linearRampToValueAtTime(gainAmount, startTime + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.08);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(startTime);
  osc.stop(startTime + 0.085);
}

/**
 * Full natural kraft envelope opening & card unfolding sound sequence.
 */
export function playCardOpeningSound(muted = false): void {
  if (muted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // 1. Gentle cardstock flex as wax seal lifts
  triggerPaperFlexThud(ctx, now, 0.14);

  // 2. Lifting the thick kraft envelope flap (0.03s -> 0.42s)
  triggerKraftPaperStroke(ctx, now + 0.03, 0.38, 420, 780, 0.55, 12);
  triggerKraftPaperStroke(ctx, now + 0.08, 0.32, 680, 460, 0.38, 16);

  // 3. Sliding the heavy textured card out of the kraft sleeve (0.34s -> 0.85s)
  triggerKraftPaperStroke(ctx, now + 0.34, 0.48, 360, 640, 0.62, 10);
  triggerKraftPaperStroke(ctx, now + 0.42, 0.42, 720, 510, 0.42, 15);

  // 4. Unfolding the letter flat with a soft paper settle (0.76s -> 1.15s)
  triggerPaperFlexThud(ctx, now + 0.78, 0.1);
  triggerKraftPaperStroke(ctx, now + 0.76, 0.36, 480, 820, 0.46, 13);
}

/**
 * Short, tactile dry kraft paper touch sound when hovering/tapping stickers or folding the card.
 */
export function playPaperRustleShort(muted = false): void {
  if (muted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  triggerPaperFlexThud(ctx, now, 0.07);
  triggerKraftPaperStroke(ctx, now + 0.01, 0.22, 460, 740, 0.42, 14);
  triggerKraftPaperStroke(ctx, now + 0.07, 0.18, 690, 430, 0.3, 18);
}
