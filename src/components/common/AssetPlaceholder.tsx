export function AssetPlaceholder({ label, variant = 'operator' }: { label: string; variant?: 'operator' | 'armor' | 'faction' }) {
  return (
    <div className={`asset-placeholder asset-placeholder--${variant}`} role="img" aria-label={`Illustration technique temporaire : ${label}`}>
      <svg viewBox="0 0 320 360" aria-hidden="true">
        <defs><pattern id={`grid-${variant}`} width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="currentColor" strokeWidth=".4" /></pattern></defs>
        <rect width="320" height="360" fill={`url(#grid-${variant})`} opacity=".35" />
        <path d="M160 42l46 32 15 82 38 122-53 35h-92l-53-35 38-122 15-82z" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="160" cy="110" r="38" fill="none" stroke="currentColor" />
        <path d="M122 110h76M160 72v200M86 248h148" fill="none" stroke="currentColor" strokeDasharray="5 7" />
      </svg>
      <span>{label}</span><small>VISUEL TEMPORAIRE // REMPLAÇABLE</small>
    </div>
  );
}
