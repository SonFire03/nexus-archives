import { forwardRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '../common/Icon';
import { navigationItems } from './navigationItems';

export const Sidebar = forwardRef<HTMLElement, { collapsed: boolean; mobileOpen: boolean; progress: number; onToggle: () => void }>(function Sidebar({ collapsed, mobileOpen, progress, onToggle }, ref) {
  const toggleLabel = collapsed ? 'Déployer la navigation' : 'Réduire la navigation';
  return <aside ref={ref} className={`command-sidebar ${collapsed ? 'is-collapsed' : ''} ${mobileOpen ? 'is-open' : ''}`} id="main-navigation">
    <div className="command-sidebar__rail"><span>NX/03</span><i /><span>Ω</span></div>
    <nav aria-label="Navigation principale">{navigationItems.map((item,index) => <NavLink key={item.to} to={item.to} title={collapsed ? item.label : undefined} aria-label={`${String(index + 1).padStart(2,'0')} ${item.label}`}><span className="nav-index">{String(index + 1).padStart(2,'0')}</span><Icon name={item.icon} size={19} /><span className="nav-label">{item.label}</span><i className="nav-marker" aria-hidden="true" /></NavLink>)}</nav>
    <div className="command-sidebar__footer">
      <div className="chapter-rail"><div><span>CHAPITRE 01</span><strong>{progress}%</strong></div><div className="chapter-rail__track"><i style={{height:`${Math.max(progress,4)}%`}} /></div></div>
      <div className="sidebar-spectral"><Icon name="spectral" size={22} /><span><strong>SIGNAL SPECTRAL</strong><small>ORIGINE // CIMETIÈRE</small></span><i aria-hidden="true" /></div>
      <button className="sidebar-toggle" onClick={onToggle} aria-pressed={collapsed} aria-label={toggleLabel} title={toggleLabel}><Icon name="collapse" size={18} /><span>{collapsed ? 'DÉPLOYER' : 'RÉDUIRE'}</span></button>
    </div>
  </aside>;
});
