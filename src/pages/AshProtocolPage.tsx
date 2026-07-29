import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';
import { Panel } from '../components/common/Panel';
import { ashSequenceFragments, ashSequenceSolution } from '../data';
import { useProgress } from '../state/ProgressContext';

const extractionSources: Record<string,string> = {
  crimson:'CICATRICE MNÉSIQUE R-9 // TRACE HUMAINE',
  ghosts:'ÉCLAT ANALOGIQUE K-13 // TRACE MATÉRIELLE',
  spectral:'ÉCHO DU CIMETIÈRE // TRACE SPECTRALE',
};

export default function AshProtocolPage() {
  const {progress,dispatchEffects}=useProgress();
  const available=progress.unlockedSecrets.includes('ash-reconstructor-online');
  const solved=progress.solvedPuzzles.includes('ash-command-sequence');
  const [selected,setSelected]=useState<string[]>([]);
  const [error,setError]=useState(false);
  const source=extractionSources[progress.narrativeChoices['omega7-extraction'] ?? 'ghosts'];
  const remaining=useMemo(()=>ashSequenceFragments.filter(({id})=>!selected.includes(id)),[selected]);
  if (!available) return <div className="page document-denied"><p className="eyebrow">RECONSTRUCTEUR CENDRE</p><h1>CHAÎNE DE COMMANDEMENT REQUISE</h1><Link className="button-primary" to="/archives/residu-cendre-63218">RETOUR AU RÉSIDU</Link></div>;
  const validate=()=>{
    if (selected.join('|')!==ashSequenceSolution.join('|')) {setError(true);return;}
    dispatchEffects([
      {type:'solve-puzzle',id:'ash-command-sequence'},{type:'complete-objective',id:'reconstruct-ash-sequence'},
      {type:'add-evidence-node',id:'autorite-draven'},{type:'add-evidence-relation',id:'chaine-authentifie-draven'},
      {type:'flag',id:'ash-sequence-stable'},{type:'narrative-event',id:'ash-sequence-reconstructed'},
    ]);
  };
  return <div className="page ash-protocol-page">
    <PageHeader eyebrow="CHAPITRE 06 // JOURNAUX MATÉRIELS" title="QUI A DONNÉ LE DERNIER ORDRE ?">Sélectionnez les quatre fragments dans leur ordre causal. Les horodatages ne seront révélés qu’après stabilisation.</PageHeader>
    <section className="ash-origin"><span>FRAGMENT D’ORIGINE</span><strong>{source}</strong><em>{solved?'SÉQUENCE STABLE':`${selected.length} / 4 ORDRES`}</em></section>
    {solved ? <section className="ash-result"><p className="eyebrow">SÉQUENCE MATÉRIELLE AUTHENTIFIÉE</p><h2>LES SORTIES ONT ÉTÉ SCELLÉES AVANT LA SYNCHRONISATION.</h2><ol>{ashSequenceFragments.map((fragment)=><li key={fragment.id}><time>{fragment.time}</time><strong>{fragment.label}</strong><span>{fragment.detail}</span></li>)}</ol><Link className="button-primary" to="/terminal">AUTHENTIFIER KAEL DRAVEN →</Link></section> : <div className="ash-workspace">
      <Panel title="FRAGMENTS NON CLASSÉS" code={`${remaining.length.toString().padStart(2,'0')} // DISPONIBLES`}><div className="ash-fragments">{remaining.map((fragment)=><button key={fragment.id} onClick={()=>{setError(false);setSelected((current)=>[...current,fragment.id]);}}><span>TRACE MATÉRIELLE</span><strong>{fragment.label}</strong><p>{fragment.detail}</p></button>)}</div></Panel>
      <Panel title="SÉQUENCE PROPOSÉE" code={`${selected.length} / 4`} tone={error?'critical':'neutral'}><ol className="ash-proposed">{selected.map((id,index)=>{const fragment=ashSequenceFragments.find((item)=>item.id===id);return <li key={id}><span>{String(index+1).padStart(2,'0')}</span><strong>{fragment?.label}</strong><button aria-label={`Retirer ${fragment?.label}`} onClick={()=>setSelected((current)=>current.filter((item)=>item!==id))}>RETIRER</button></li>;})}</ol>{selected.length===0&&<p>Aucun ordre sélectionné.</p>}{error&&<p className="counter-error" role="alert">SÉQUENCE REJETÉE — le scellement doit précéder la synchronisation et Cendre doit rester le dernier ordre.</p>}<div className="ash-actions"><button className="button-secondary" onClick={()=>{setSelected([]);setError(false);}}>RÉINITIALISER</button><button className="button-primary" disabled={selected.length!==4} onClick={validate}>STABILISER LA SÉQUENCE</button></div></Panel>
    </div>}
  </div>;
}
