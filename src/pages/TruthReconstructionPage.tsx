import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';
import { Panel } from '../components/common/Panel';
import { invariantTruthIds, truthFragments } from '../data';
import { useProgress } from '../state/ProgressContext';

const originLabels: Record<string,string> = {
  open:'COPIE DISTRIBUÉE PAR LA PORTE OUVERTE',
  seal:'CACHE EXFILTRÉ PAR MÈRE ÉCHO AVANT SCELLEMENT',
  isolate:'CHECKSUM CONSERVÉ DANS LE SUPPORT ANALOGIQUE R-0',
};

export default function TruthReconstructionPage() {
  const {progress,dispatchEffects}=useProgress();
  const available=progress.unlockedSecrets.includes('truth-reconstructor-online');
  const solved=progress.solvedPuzzles.includes('mirror-truth-invariants');
  const [selected,setSelected]=useState<string[]>([]);
  const [error,setError]=useState(false);
  const gateChoice=progress.narrativeChoices['continuity-gate'] ?? 'isolate';
  if (!available) return <div className="page document-denied"><p className="eyebrow">RECONSTRUCTEUR MIRROR</p><h1>REGISTRE INCOMPLET</h1><Link className="button-primary" to="/archives/verite-originale">RETOUR À MIRROR-00</Link></div>;
  const toggle=(id:string)=>{setError(false);setSelected((current)=>current.includes(id)?current.filter((item)=>item!==id):current.length<4?[...current,id]:current);};
  const validate=()=>{
    if ([...selected].sort().join('|')!==[...invariantTruthIds].sort().join('|')) {setError(true);return;}
    dispatchEffects([
      {type:'solve-puzzle',id:'mirror-truth-invariants'},{type:'complete-objective',id:'reconstruct-original-truth'},
      {type:'flag',id:'mirror-facts-reconstructed'},{type:'add-evidence-node',id:'preuve-preincident'},
      {type:'add-evidence-relation',id:'preuve-authentifie-vale'},{type:'narrative-event',id:'original-truth-reconstructed'},
    ]);
  };
  return <div className="page truth-reconstruction-page">
    <PageHeader eyebrow="CHAPITRE 04 // MATRICE DE COHÉRENCE" title="CE QUI N’A PAS PU ÊTRE RÉÉCRIT">Sélectionnez exactement quatre assertions soutenues par une trace matérielle indépendante du réseau du Miroir.</PageHeader>
    <section className="truth-origin"><span>ORIGINE DE MIRROR-00</span><strong>{originLabels[gateChoice] ?? originLabels.isolate}</strong><em>{solved?'COHÉRENCE ÉTABLIE':`${selected.length} / 4 FAITS`}</em></section>
    {solved ? <section className="truth-result"><p className="eyebrow">RECONSTRUCTION TERMINÉE</p><h2>LE MENSONGE PRÉCÈDE LA CATASTROPHE.</h2><p>Quatre traces matérielles concordent. Orin Vale a signé le récit terroriste avant l’activation du Projet Continuité.</p><blockquote>« La vérité originale est datée de dix-huit heures avant les faits qu’elle prétend expliquer. »</blockquote><Link className="button-primary" to="/terminal">AUTHENTIFIER LA SIGNATURE VALE →</Link></section> : <div className="truth-grid">
      <Panel title="ASSERTIONS RÉCUPÉRÉES" code="06 // 02 INSERTIONS" tone="warning"><div className="truth-fragments">{truthFragments.map((fragment)=><button key={fragment.id} aria-pressed={selected.includes(fragment.id)} className={selected.includes(fragment.id)?'is-selected':''} onClick={()=>toggle(fragment.id)}><span>{fragment.version}</span><p>{fragment.text}</p><small>{fragment.marker}</small></button>)}</div></Panel>
      <Panel title="PROTOCOLE DE VALIDATION" code="MIRROR-CRC" tone={error?'critical':'neutral'}><ul><li>Privilégier les horodatages matériels.</li><li>Recouper les télémétries indépendantes.</li><li>Rejeter les communiqués sans source primaire.</li><li>Ne pas confondre répétition et authenticité.</li></ul>{error&&<p className="memory-error" role="alert">COHÉRENCE REFUSÉE — au moins une assertion provient uniquement d’une version publique révisable.</p>}<button className="button-primary" disabled={selected.length!==4} onClick={validate}>ISOLER LES FAITS INVARIANTS</button></Panel>
    </div>}
  </div>;
}
