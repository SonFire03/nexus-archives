import type { ReactNode } from 'react';

export function StatusBadge({ children, tone = 'neutral', pulse = false }: { children: ReactNode; tone?: 'neutral' | 'nexus' | 'spectral' | 'warning' | 'success' | 'critical'; pulse?: boolean }) {
  return <span className={`status-indicator tone-${tone} ${pulse ? 'has-pulse' : ''}`}><i aria-hidden="true" />{children}</span>;
}
