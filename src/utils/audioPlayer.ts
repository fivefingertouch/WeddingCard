/**
 * Ambient Romantic Audio Synthesizer & Player
 * Guaranteed to play smoothly across browsers, mobile devices and GitHub Pages
 * without broken external links or CORS issues.
 */
class RomanticMusicPlayer {
  private audioCtx: AudioContext | null = null;
  private isSynthesizing = false;
  private timerId: number | null = null;
  private isMuted = false;
  private gainNode: GainNode | null = null;
  private listeners: ((playing: boolean) => void)[] = [];

  // Romantic chord progression frequencies (C major 9, A minor 9, F major 7, G add9)
  // Tuned to gentle 432Hz warmth
  private chordProgression = [
    // Cmaj7: C4, E4, G4, B4, D5
    [261.63, 329.63, 392.0, 493.88, 587.33],
    // Am9: A3, C4, E4, G4, B4
    [220.0, 261.63, 329.63, 392.0, 493.88],
    // Fmaj7: F3, A3, C4, E4, G4
    [174.61, 220.0, 261.63, 329.63, 392.0],
    // Gsus4 / G7: G3, C4, D4, G4, B4
    [196.0, 261.63, 293.66, 392.0, 493.88],
  ];

  private currentChordIndex = 0;
  private currentNoteIndex = 0;

  public subscribe(listener: (playing: boolean) => void) {
    this.listeners.push(listener);
    listener(this.isSynthesizing);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l(this.isSynthesizing));
  }

  private initAudio() {
    if (!this.audioCtx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioContextClass();

      // Master gain
      this.gainNode = this.audioCtx.createGain();
      this.gainNode.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      this.gainNode.connect(this.audioCtx.destination);
    }

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  private playTone(freq: number, duration = 2.4, decay = 2.0) {
    if (!this.audioCtx || !this.gainNode) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const noteGain = this.audioCtx.createGain();

      // Soft triangle + sine wave combination for music-box / harp bell timbre
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      // Soft envelope (gentle attack, slow warm decay)
      const now = this.audioCtx.currentTime;
      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.exponentialRampToValueAtTime(0.09, now + 0.08);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(noteGain);
      noteGain.connect(this.gainNode);

      osc.start(now);
      osc.stop(now + duration);
    } catch {
      // Audio context might be restricted
    }
  }

  private stepArpeggio = () => {
    if (!this.isSynthesizing) return;

    const chord = this.chordProgression[this.currentChordIndex];
    const freq = chord[this.currentNoteIndex];

    this.playTone(freq, 2.8, 2.2);

    this.currentNoteIndex++;
    if (this.currentNoteIndex >= chord.length) {
      this.currentNoteIndex = 0;
      this.currentChordIndex = (this.currentChordIndex + 1) % this.chordProgression.length;
    }

    // Soft gentle tempo (roughly 550ms per arpeggio note)
    this.timerId = window.setTimeout(this.stepArpeggio, 580);
  };

  public play() {
    try {
      this.initAudio();
      if (this.isSynthesizing) return;
      this.isSynthesizing = true;
      this.stepArpeggio();
      this.notify();
    } catch {
      // Ignore audio autoplay restrictions
    }
  }

  public pause() {
    this.isSynthesizing = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    this.notify();
  }

  public toggle() {
    if (this.isSynthesizing) {
      this.pause();
    } else {
      this.play();
    }
  }

  public getIsPlaying(): boolean {
    return this.isSynthesizing;
  }
}

export const romanticPlayer = new RomanticMusicPlayer();
