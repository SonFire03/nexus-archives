import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useProgress } from '../../state/ProgressContext';
import { useAudio } from '../../hooks/useAudio';
import { NarrativeNotification } from '../feedback/NarrativeNotification';
import { TopCommandBar } from './TopCommandBar';
import { Sidebar } from '../navigation/Sidebar';
import { chapterFiveObjectives, chapterFourObjectives, chapterSixObjectives, chapterThreeObjectives, chapterTwoObjectives, chapterZeroObjectives } from '../../data';

const SIDEBAR_KEY = 'nexus-archives:sidebar-collapsed';

function readSidebarPreference(): boolean {
  try { return localStorage.getItem(SIDEBAR_KEY) === 'true'; } catch { return false; }
}

export function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(readSidebarPreference);
  const [time, setTime] = useState(() => new Date());
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const { progress, update } = useProgress();
  const play = useAudio(progress.audioEnabled, progress.volume);

  useEffect(() => { setMenuOpen(false); update({ lastVisitedRoute: location.pathname }); document.getElementById('main-content')?.focus({ preventScroll:true }); }, [location.pathname, update]);
  useEffect(() => { const timer = window.setInterval(() => setTime(new Date()), 30000); return () => window.clearInterval(timer); }, []);
  useEffect(() => { try { localStorage.setItem(SIDEBAR_KEY,String(sidebarCollapsed)); } catch { /* préférence non persistante */ } }, [sidebarCollapsed]);
  useEffect(() => {
    if (!menuOpen) return;
    sidebarRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMenuOpen(false); menuButtonRef.current?.focus(); } };
    window.addEventListener('keydown',closeOnEscape);
    return () => window.removeEventListener('keydown',closeOnEscape);
  }, [menuOpen]);
  const closeMobileMenu = () => { setMenuOpen(false); menuButtonRef.current?.focus(); };
  const objectives = progress.activeChapter === 'chapter-six' ? chapterSixObjectives : progress.activeChapter === 'chapter-five' ? chapterFiveObjectives : progress.activeChapter === 'chapter-four' ? chapterFourObjectives : progress.activeChapter === 'chapter-three' ? chapterThreeObjectives : progress.activeChapter === 'chapter-two' ? chapterTwoObjectives : chapterZeroObjectives;
  const objectiveCount = progress.completedObjectives.filter((id) => objectives.some((objective) => objective.id === id)).length;
  const chapterProgress = Math.round((objectiveCount / objectives.length) * 100);

  return (
    <div className={`app-shell ${sidebarCollapsed ? 'sidebar-collapsed' : ''} ${progress.reducedEffects ? 'reduced-effects' : ''}`}>
      <a className="skip-link" href="#main-content">Aller au contenu</a>
      <TopCommandBar accessLevel={progress.accessLevel} activeChapter={progress.activeChapter} chapterComplete={progress.completedChapters.includes(progress.activeChapter)} audioEnabled={progress.audioEnabled} menuOpen={menuOpen} time={time} menuButtonRef={menuButtonRef} onMenu={() => setMenuOpen((value) => !value)} onAudio={() => { update({ audioEnabled: !progress.audioEnabled }); if (!progress.audioEnabled) window.setTimeout(() => play('terminal'),0); }} />
      <Sidebar ref={sidebarRef} collapsed={sidebarCollapsed} mobileOpen={menuOpen} progress={chapterProgress} onToggle={() => setSidebarCollapsed((value) => !value)} />
      {menuOpen && <button className="mobile-navigation-overlay" aria-label="Fermer la navigation" onClick={closeMobileMenu} />}
      <main id="main-content" className="main-content" tabIndex={-1}><Outlet /></main>
      <footer className="technical-footer"><span>NXS-OS 6.14.02</span><span>SESSION NON AUTORISÉE</span><span>AUCUNE TÉLÉMÉTRIE EXTERNE</span></footer>
      <NarrativeNotification />
      <div className="scanline" aria-hidden="true" />
    </div>
  );
}
