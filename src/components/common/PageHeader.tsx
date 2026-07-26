import type { ReactNode } from 'react';

export function PageHeader({ eyebrow, title, children, actions, status }: { eyebrow: string; title: string; children?: ReactNode; actions?: ReactNode; status?: string }) {
  return <header className="page-header"><div className="page-header__title"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{status && <span className="page-header__status">{status}</span>}</div>{children && <p>{children}</p>}{actions && <div className="page-header__actions">{actions}</div>}</header>;
}
