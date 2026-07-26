import { PageHeader } from '../components/common/PageHeader';
import { Terminal } from '../components/terminal/Terminal';
import { useProgress } from '../state/ProgressContext';

export default function TerminalPage() {
  const { progress } = useProgress();
  return <div className="page terminal-page"><PageHeader eyebrow="INTERFACE DE COMMANDE // LOCAL" title="TERMINAL OMEGA">Les commandes s’exécutent uniquement dans votre navigateur. Aucune donnée ne quitte ce terminal.</PageHeader><div className="terminal-layout"><Terminal /><aside className="terminal-aside"><p className="eyebrow">SESSION</p><dl><div><dt>IDENTITÉ</dt><dd>NON RECONNUE</dd></div><div><dt>ACCÈS</dt><dd>{progress.accessLevel}</dd></div><div><dt>FRAGMENTS</dt><dd>{progress.unlockedSecrets.length}</dd></div><div><dt>COMMANDES</dt><dd>{progress.terminalHistory.length}</dd></div></dl><h2>PISTES</h2><code>scan nx-s</code><code>decrypt zero</code><code>memory crimson</code><code>echo a7</code><code>trace voss</code><p>Utilisez ↑ et ↓ pour parcourir l’historique. Tab complète une commande sans ambiguïté.</p></aside></div></div>;
}
