import type { HTMLAttributes, ReactNode } from 'react';

interface PanelProps extends HTMLAttributes<HTMLElement> {
  title?: string; eyebrow?: string; code?: string; status?: ReactNode; actions?: ReactNode;
  tone?: 'neutral' | 'nexus' | 'spectral' | 'warning' | 'critical' | 'success';
  children: ReactNode; as?: 'section' | 'article'; interactive?: boolean;
}

export function Panel({ title, eyebrow, code, status, actions, tone = 'neutral', interactive = false, children, className = '', as = 'section', ...props }: PanelProps) {
  const Tag = as;
  return (
    <Tag className={`panel panel--${tone} ${interactive ? 'is-interactive' : ''} ${className}`} {...props}>
      {(title || code || status || actions) && <header className="panel__header"><div>{eyebrow && <span className="panel__eyebrow">{eyebrow}</span>}{title && <h2>{title}</h2>}</div><div className="panel__meta">{status}{code && <code>{code}</code>}{actions}</div></header>}
      <div className="panel__body">{children}</div>
    </Tag>
  );
}
