import { Component, type ErrorInfo, type ReactNode } from 'react';

export class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error('Erreur NEXUS interceptée', error, info); }
  reloadPublishedVersion = () => {
    const target = new URL(import.meta.env.BASE_URL,window.location.origin);
    target.searchParams.set('reload',String(Date.now()));
    target.hash = window.location.hash || '#/dashboard';
    window.location.replace(target.toString());
  };
  resetProgress = () => {
    try { localStorage.removeItem('nexus-archives:v1'); } catch { /* stockage indisponible */ }
    window.location.replace(`${import.meta.env.BASE_URL}?reset=1#/`);
  };
  render() {
    if (this.state.failed) return <main className="fatal-error"><span className="error-code">SYS.503</span><p className="eyebrow">ERREUR DE CONTINUITÉ</p><h1>ARCHIVE CORROMPUE</h1><p>Le terminal a isolé le segment défaillant. Une ancienne version en cache peut empêcher le chargement des modules.</p><div className="button-row"><button className="button-primary" onClick={this.reloadPublishedVersion}>RECHARGER LA VERSION PUBLIÉE</button><button className="button-danger" onClick={this.resetProgress}>RÉINITIALISER LA PROGRESSION</button></div><small>La première action conserve votre progression locale.</small></main>;
    return this.props.children;
  }
}
