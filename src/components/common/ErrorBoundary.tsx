import { Component, type ErrorInfo, type ReactNode } from 'react';

export class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error('Erreur NEXUS interceptée', error, info); }
  render() {
    if (this.state.failed) return <main className="fatal-error"><p className="eyebrow">ERREUR DE CONTINUITÉ</p><h1>ARCHIVE CORROMPUE</h1><p>Le terminal a isolé le segment défaillant.</p><button onClick={() => window.location.assign(import.meta.env.BASE_URL)}>REVENIR AU TERMINAL</button></main>;
    return this.props.children;
  }
}
