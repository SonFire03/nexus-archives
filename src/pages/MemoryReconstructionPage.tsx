import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';
import { Panel } from '../components/common/Panel';
import { memoryFragments, memorySolution } from '../data';
import { useProgress } from '../state/ProgressContext';

const scrambledFragments = [memoryFragments[2]!,memoryFragments[0]!,memoryFragments[3]!,memoryFragments[1]!];

export default function MemoryReconstructionPage() {
  const { progress, dispatchEffects } = useProgress();
  const solved = progress.solvedPuzzles.includes('memory-0417');
  const available = progress.unlockedSecrets.includes('memory-reconstructor-0417');
  const [selected,setSelected] = useState<string[]>([]);
  const [error,setError] = useState(false);

  if (!available) return <div className="page document-denied"><p className="eyebrow">MODULE HORS LIGNE</p><h1>RECONSTRUCTEUR VERROUILLÉ</h1><p>Un registre contenant des fragments mnésiques est requis.</p><Link className="button-primary" to="/archives/dossier-sept-corps">RETOUR AU DOSSIER DES SEPT CORPS</Link></div>;

  const validate = () => {
    if (selected.join('|') !== memorySolution.join('|')) { setError(true); return; }
    dispatchEffects([
      {type:'solve-puzzle',id:'memory-0417'},{type:'complete-objective',id:'reconstruct-memory-0417'},
      {type:'unlock-secret',id:'memory-0417-restored'},{type:'add-evidence-node',id:'memoire-0417'},
      {type:'narrative-event',id:'memory-0417-restored'},
    ]);
  };
  const resetSequence = () => { setSelected([]); setError(false); };

  return <div className="page memory-page"><PageHeader eyebrow="CHAPITRE 02 // RECONSTRUCTION MNÉSIQUE" title="SÉQUENCE 04:17">Sélectionnez les fragments dans leur ordre causal. Les horodatages sont révélés uniquement après stabilisation.</PageHeader>
    <section className="memory-status" aria-label={solved ? 'Mémoire reconstruite' : `Reconstruction ${selected.length} sur 4`}><span>MNEM-0417</span><strong>{solved ? 'INTÉGRITÉ 74 %' : `${selected.length} / 4 FRAGMENTS`}</strong><em>{solved ? 'STABILISÉE' : 'ORDRE INCONNU'}</em></section>
    {solved ? <section className="memory-restored"><p className="eyebrow">SÉQUENCE RESTAURÉE</p><ol>{memoryFragments.map((fragment) => <li key={fragment.id}><time>{fragment.time}</time><div><strong>{fragment.source}</strong><p>{fragment.text}</p></div></li>)}</ol><div className="document-transmission"><span>DIRECTIVE R-9</span><p>« Préserver le Corps 04. Rejeter la sauvegarde la plus récente. Empêcher toute synchronisation. »</p></div><Link className="button-primary" to="/terminal">VÉRIFIER LA SIGNATURE DE CRIMSON →</Link></section> : <div className="memory-workspace">
      <Panel title="FRAGMENTS NON CLASSÉS" code="BUFFER.04" tone="warning"><div className="memory-fragments">{scrambledFragments.map((fragment,index) => <button key={fragment.id} disabled={selected.includes(fragment.id)} onClick={() => {setSelected((current) => [...current,fragment.id]);setError(false);}}><span>FRAGMENT {String(index + 1).padStart(2,'0')}</span><strong>{fragment.source}</strong><p>{fragment.text}</p></button>)}</div></Panel>
      <Panel title="SÉQUENCE PROPOSÉE" code={`${selected.length}.04`} tone={error ? 'critical' : 'success'}><ol className="memory-sequence">{selected.map((id,index) => {const fragment=memoryFragments.find((item) => item.id===id)!;return <li key={id}><span>{String(index + 1).padStart(2,'0')}</span><strong>{fragment.source}</strong><button aria-label={`Retirer le fragment ${fragment.source}`} onClick={() => setSelected((current) => current.filter((item) => item !== id))}>RETIRER</button></li>;})}</ol>{selected.length === 0 && <p>Aucun fragment sélectionné.</p>}{error && <p className="memory-error" role="alert">ÉCHEC DE COHÉRENCE — la relation de cause à effet est impossible. La première anomalie doit précéder la directive R-9.</p>}<div className="memory-actions"><button className="button-secondary" disabled={selected.length===0} onClick={resetSequence}>RÉINITIALISER</button><button className="button-primary" disabled={selected.length!==memorySolution.length} onClick={validate}>STABILISER LA MÉMOIRE</button></div></Panel>
    </div>}
  </div>;
}
