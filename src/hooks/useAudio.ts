import { useCallback } from 'react';

export function useAudio(enabled: boolean, volume: number) {
  return useCallback((kind: 'terminal' | 'alert' | 'spectral' = 'terminal') => {
    if (!enabled) return;
    const AudioContextClass = window.AudioContext;
    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = kind === 'spectral' ? 'sine' : kind === 'alert' ? 'square' : 'triangle';
    oscillator.frequency.value = kind === 'spectral' ? 170 : kind === 'alert' ? 420 : 680;
    gain.gain.setValueAtTime(Math.min(volume, 0.3), context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.12);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.12);
    oscillator.addEventListener('ended', () => void context.close());
  }, [enabled, volume]);
}
