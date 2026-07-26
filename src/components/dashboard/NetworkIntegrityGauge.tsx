export function NetworkIntegrityGauge({ value }: { value: number }) {
  const radius = 35;
  const circumference = Math.PI * radius;
  return <div className="network-gauge"><svg viewBox="0 0 100 58" role="img" aria-label={`Intégrité réseau ${value} pour cent`}><path d="M15 50a35 35 0 0 1 70 0" pathLength="100" /><path className="network-gauge__value" d="M15 50a35 35 0 0 1 70 0" pathLength="100" strokeDasharray={`${value} ${100 - value}`} /><line x1="15" y1="50" x2="12" y2="50" /><line x1="50" y1="15" x2="50" y2="11" /><line x1="85" y1="50" x2="88" y2="50" /></svg><span><strong>{value}%</strong><small>STABILITÉ</small></span><i style={{ '--gauge-circumference': circumference } as React.CSSProperties} /></div>;
}
