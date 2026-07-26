export function StatBar({ label, value, max = 10, color = 'red' }: { label: string; value: number; max?: number; color?: string }) {
  const percentage = Math.round((value / max) * 100);
  return (
    <div className="stat-bar">
      <div className="stat-bar__label"><span>{label}</span><strong>{value}/{max}</strong></div>
      <div className="stat-bar__track" role="meter" aria-label={label} aria-valuemin={0} aria-valuemax={max} aria-valuenow={value}>
        <span className={`stat-bar__fill is-${color}`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
