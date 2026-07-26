import type { IconName } from '../common/Icon';
import { Icon } from '../common/Icon';

export function MetricCard({ label, value, detail, code, tone = 'nexus', icon, children }: { label: string; value: string; detail: string; code: string; tone?: 'nexus' | 'spectral' | 'cyan' | 'success'; icon: IconName; children?: React.ReactNode }) {
  return <article className={`metric-card metric-card--${tone}`}><header><span className="metric-card__icon"><Icon name={icon} /></span><span>{label}</span><code>{code}</code></header><strong>{value}</strong><p>{detail}</p>{children}</article>;
}
