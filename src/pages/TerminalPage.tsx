import { PageHeader } from '../components/common/PageHeader';
import { Terminal } from '../components/terminal/Terminal';
import { useProgress } from '../state/ProgressContext';

export default function TerminalPage() {
  const { progress } = useProgress();
  const nextCommand = progress.discoveredClues.includes('clue-z-2219') && !progress.completedObjectives.includes('decrypt-z-2219') ? 'decrypt z-2219' : progress.completedObjectives.includes('read-restoration-log') && !progress.completedObjectives.includes('detect-seven-signatures') ? 'echo a7' : 'objectives';
  return <div className="page terminal-page"><PageHeader eyebrow="INTERFACE DE COMMANDE // LOCAL" title="TERMINAL OMEGA">Les commandes s’exécutent uniquement dans votre navigateur. Aucune donnée ne quitte ce terminal.</PageHeader><div className="terminal-layout"><Terminal /><aside className="terminal-aside"><p className="eyebrow">SESSION</p><dl><div><dt>IDENTITÉ</dt><dd>NON RECONNUE</dd></div><div><dt>ACCÈS</dt><dd>{progress.accessLevel}</dd></div><div><dt>CHAPITRE</dt><dd>01 // NUIT ZÉRO</dd></div><div><dt>PREUVES</dt><dd>{progress.evidenceNodes.length}</dd></div><div><dt>ÉTAT SPECTRAL</dt><dd>{progress.spectralContactCount ? 'CONTACT' : 'INSTABLE'}</dd></div></dl><h2>COMMANDE SUGGÉRÉE</h2><code>{nextCommand}</code><h2>COMMANDES CONTEXTUELLES</h2><code>objectives</code><code>evidence</code><code>scan nx-s</code><code>compare zero</code><p>Utilisez ↑ et ↓ pour parcourir l’historique. Tab complète une commande sans ambiguïté.</p></aside></div></div>;
}
