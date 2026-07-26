import type { HTMLAttributes, ReactNode } from 'react';

interface PanelProps extends HTMLAttributes<HTMLElement> { title?: string; code?: string; children: ReactNode; as?: 'section' | 'article' }

export function Panel({ title, code, children, className = '', as = 'section', ...props }: PanelProps) {
  const Tag = as;
  return (
    <Tag className={`panel ${className}`} {...props}>
      {(title || code) && <header className="panel__header">{title && <h2>{title}</h2>}{code && <span>{code}</span>}</header>}
      <div className="panel__body">{children}</div>
    </Tag>
  );
}
