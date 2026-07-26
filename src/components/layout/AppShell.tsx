import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useProgress } from '../../state/ProgressContext';
import { useAudio } from '../../hooks/useAudio';
import { NarrativeNotification } from '../feedback/NarrativeNotification';

const navItems = [
  ['/dashboard','Tableau de bord'], ['/vanta','VANTA'], ['/operators','Opérateurs'], ['/armors','Armures'],
  ['/factions','Factions'], ['/timeline','Chronologie'], ['/terminal','Terminal'], ['/archives','Archives'], ['/investigation','Enquête'],
] as const;

export function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState(() => new Date());
  const location = useLocation();
  const { progress, update } = useProgress();
  const play = useAudio(progress.audioEnabled, progress.volume);

  useEffect(() => { setMenuOpen(false); update({ lastVisitedRoute: location.pathname }); document.getElementById('main-content')?.focus(); }, [location.pathname, update]);
  useEffect(() => { const timer = window.setInterval(() => setTime(new Date()), 30000); return () => window.clearInterval(timer); }, []);

  return (
    <div className={`app-shell ${progress.reducedEffects ? 'reduced-effects' : ''}`}>
      <a className="skip-link" href="#main-content">Aller au contenu</a>
      <header className="topbar">
        <NavLink to="/dashboard" className="brand" aria-label="NEXUS Archives, tableau de bord"><span>N</span><strong>NEXUS</strong><small>ARCHIVES OMEGA</small></NavLink>
        <div className="topbar__status"><span>ACCÈS <strong>{progress.accessLevel}</strong></span><span className="network-dot">RÉSEAU COMPROMIS</span><span className="spectral-status">NX-S // ACTIF</span><time>{time.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</time></div>
        <div className="topbar__actions">
          <button className="icon-button" aria-label={progress.audioEnabled ? 'Désactiver le son' : 'Activer le son'} aria-pressed={progress.audioEnabled} onClick={() => { update({ audioEnabled: !progress.audioEnabled }); if (!progress.audioEnabled) window.setTimeout(() => play('terminal'), 0); }}>{progress.audioEnabled ? 'SON ON' : 'SON OFF'}</button>
          <NavLink className="icon-button" to="/settings">RÉGLAGES</NavLink>
          <button className="menu-button" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen((value) => !value)}>MENU</button>
        </div>
      </header>
      <aside className={`sidebar ${menuOpen ? 'is-open' : ''}`} id="main-navigation">
        <nav aria-label="Navigation principale">{navItems.map(([to,label], index) => <NavLink key={to} to={to} className={({isActive}) => isActive ? 'active' : ''}><span>0{index + 1}</span>{label}</NavLink>)}</nav>
        <div className="sidebar__signal"><span>SIGNAL SPECTRAL</span><div><i /><i /><i /><i /><i /></div><small>ORIGINE : CIMETIÈRE</small></div>
      </aside>
      <main id="main-content" className="main-content" tabIndex={-1}><Outlet /></main>
      <footer className="technical-footer"><span>NXS-OS 6.14.02</span><span>SESSION NON AUTORISÉE</span><span>AUCUNE TÉLÉMÉTRIE EXTERNE</span></footer>
      <NarrativeNotification />
      <div className="scanline" aria-hidden="true" />
    </div>
  );
}
