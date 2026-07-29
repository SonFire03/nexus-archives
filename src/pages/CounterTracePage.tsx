import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';
import { Panel } from '../components/common/Panel';
import { counterTraceChoices, safeCounterTraceIds } from '../data';
import { useProgress } from '../state/ProgressContext';

const exposureLabels: Record<string,string> = {
  broadcast:'FILIGRANE DE REBOND DÉTECTÉ DANS LA DIFFUSION',
  preserve:'OUVERTURE DU COFFRE MIRROR-00 JOURNALISÉE',
  fragment:'CORRÉLATION DES TROIS ÉCLATS MIRROR-00',
};
const stageLabels={masque:'01 // MASQUE DE SOURCE',dérive:'02 // DÉRIVE TEMPORELLE',sortie:'03 // NŒUD DE SORTIE'} as const;

export default function CounterTracePage() {
  const {progress,dispatchEffects}=useProgress();
  const available=progress.unlockedSecrets.includes('counter-trace-online');
  const solved=progress.solvedPuzzles.includes('harbinger-counter-trace');
  const [selected,setSelected]=useState<Record<string,string>>({});
  const [error,setError]=useState(false);
  const truthChoice=progress.narrativeChoices['mirror-00'] ?? 'fragment';
  if (!available) return <div className="page document-denied"><p className="eyebrow">CONTRE-TRAQUE HARBINGER</p><h1>JOURNAL REQUIS</h1><Link className="button-primary" to="/archives/ordre-capture-omega-7">RETOUR À HUNT-314</Link></div>;
  const validate=()=>{
    const ids=Object.values(selected);
    if (ids.length!==3 || [...ids].sort().join('|')!==[...safeCounterTraceIds].sort().join('|')) {setError(true);return;}
    dispatchEffects([
      {type:'solve-puzzle',id:'harbinger-counter-trace'},{type:'complete-objective',id:'break-triangulation'},
      {type:'flag',id:'harbinger-position-lost'},{type:'add-evidence-node',id:'station-k13-exit'},
      {type:'narrative-event',id:'triangulation-broken'},
    ]);
  };
  return <div className="page counter-trace-page">
    <PageHeader eyebrow="CHAPITRE 05 // CONTRE-SURVEILLANCE" title="ROMPRE LA TRIANGULATION">Choisissez une contre-mesure par couche. Évitez de déplacer la poursuite vers des civils ou d’abandonner votre identité à un autre système.</PageHeader>
    <section className="hunt-status"><span>ORIGINE DE L’EXPOSITION</span><strong>{exposureLabels[truthChoice] ?? exposureLabels.fragment}</strong><em>{solved?'POSITION PERDUE':`${Object.keys(selected).length} / 3 COUCHES`}</em></section>
    {solved ? <section className="counter-trace-result"><p className="eyebrow">TRIANGULATION INTERROMPUE</p><h2>HARBINGER CONNAÎT VOTRE SIGNATURE. PLUS VOTRE POSITION.</h2><p>La trace traverse K-13, dérive sur le rythme mnésique de Crimson puis disparaît dans un canal déclaré mort.</p><Link className="button-primary" to="/terminal">AUTHENTIFIER LE CANAL CRIMSON →</Link></section> : <>
      <div className="counter-trace-grid">{(['masque','dérive','sortie'] as const).map((stage)=><Panel key={stage} title={stageLabels[stage]} code="CHOIX UNIQUE" tone={error?'critical':'neutral'}><div className="counter-options" role="radiogroup" aria-label={stageLabels[stage]}>{counterTraceChoices.filter((choice)=>choice.stage===stage).map((choice)=><button role="radio" aria-checked={selected[stage]===choice.id} className={selected[stage]===choice.id?'is-selected':''} key={choice.id} onClick={()=>{setError(false);setSelected((current)=>({...current,[stage]:choice.id}));}}><strong>{choice.label}</strong><p>{choice.detail}</p><small>{choice.risk}</small></button>)}</div></Panel>)}</div>
      {error&&<p className="counter-error" role="alert">ROUTE REJETÉE — cette combinaison expose des civils, reste prédictible ou compromet l’identité OMEGA-7.</p>}
      <button className="button-primary counter-validate" disabled={Object.keys(selected).length!==3} onClick={validate}>EXÉCUTER LA CONTRE-TRAQUE</button>
    </>}
  </div>;
}
