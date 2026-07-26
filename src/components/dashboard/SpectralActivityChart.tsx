const activity = [18,24,20,45,31,63,38,27,52,72,33,29,48,39,78,43,34,58,31,67,46,35,61,42];

export function SpectralActivityChart({ contacted = false, compact = false }: { contacted?: boolean; compact?: boolean }) {
  const points = activity.map((value, index) => `${(index / (activity.length - 1)) * 100},${90 - value}`).join(' ');
  return <figure className={`spectral-chart ${compact ? 'is-compact' : ''}`}><svg viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-labelledby="spectral-title spectral-desc"><title id="spectral-title">Activité spectrale récente</title><desc id="spectral-desc">Signal {contacted ? 'confirmé sur le terminal local' : 'élevé et instable'}, avec trois impulsions au-dessus du seuil nominal.</desc><g className="spectral-chart__grid"><path d="M0 20h100M0 50h100M0 80h100M20 0v100M40 0v100M60 0v100M80 0v100" /><path className="spectral-chart__threshold" d="M0 38h100" /></g><polygon points={`0,90 ${points} 100,90`} /><polyline points={points} /><circle cx="65.2" cy="12" r="1.8" /><circle cx="82.6" cy="23" r="1.8" /></svg><figcaption><span><i />SEUIL NOMINAL</span><strong>{contacted ? 'SOURCE LOCALE' : 'NIVEAU ÉLEVÉ'}</strong></figcaption></figure>;
}
