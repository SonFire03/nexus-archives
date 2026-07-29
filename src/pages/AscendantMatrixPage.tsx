import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';
import { Panel } from '../components/common/Panel';
import { identitySafeguards, safeIdentitySafeguardIds } from '../data';
import { useProgress } from '../state/ProgressContext';

const activationVectors: Record<string,string> = {
  broadcast:'FLUX PUBLICS DU VOILE // 63 218 NOMS',
  choir:'RÉSONANCE DU CHŒUR // 63 218 EMPREINTES',
  analog:'COPIE INTERCEPTÉE K-13 // REGISTRE ANALOGIQUE',
};

export default function AscendantMatrixPage() {
  const {progress,dispatchEffects}=useProgress();
  const available=progress.unlockedSecrets.includes('ascendant-matrix-online');
  const solved=progress.solvedPuzzles.includes('ascendant-identity-matrix');
  const [selected,setSelected]=useState<string[]>([]);
  const [error,setError]=useState(false);
  const vector=activationVectors[progress.narrativeChoices['victims-ledger'] ?? 'analog'];
  if (!available) return <div className="page document-denied"><p className="eyebrow">MATRICE ASCENDANT</p><h1>ARCHITECTURE REQUISE</h1><Link className="button-primary" to="/archives/alerte-ascendant-omega">RETOUR À L’ALERTE</Link></div>;
  const toggle=(id:string)=>{setError(false);setSelected((current)=>current.includes(id)?current.filter((item)=>item!==id):current.length<4?[...current,id]:current);};
  const validate=()=>{
    if ([...selected].sort().join('|')!==[...safeIdentitySafeguardIds].sort().join('|')) {setError(true);return;}
    dispatchEffects([
      {type:'solve-puzzle',id:'ascendant-identity-matrix'},{type:'complete-objective',id:'stabilize-identity-matrix'},
      {type:'flag',id:'individual-consent-enforced'},{type:'add-evidence-node',id:'identity-matrix'},
      {type:'narrative-event',id:'identity-matrix-stable'},
    ]);
  };
  return <div className="page ascendant-matrix-page">
    <PageHeader eyebrow="CHAPITRE 07 // GARANTIES IDENTITAIRES" title="COMBIEN DE VOIX RESTENT DES PERSONNES ?">Activez exactement quatre garanties. Une capacité plus grande n’est pas une réussite si elle exige d’effacer les limites entre les occupants.</PageHeader>
    <section className="ascendant-vector"><span>VECTEUR D’ACTIVATION</span><strong>{vector}</strong><em>{solved?'MATRICE STABLE':`${selected.length} / 4 GARANTIES`}</em></section>
    {solved ? <section className="ascendant-matrix-result"><p className="eyebrow">AUTORITÉ INDIVIDUELLE IMPOSÉE</p><h2>SEPT PARTITIONS. SEPT CONSENTEMENTS. SEPT SORTIES.</h2><p>La matrice refuse désormais toute fusion automatique, toute huitième empreinte et toute commande exigeant l’effacement d’une minorité.</p><Link className="button-primary" to="/terminal">DEMANDER LE CONSENTEMENT DE R-0 →</Link></section> : <>
      <Panel title="PROTOCOLES DE LA MATRICE" code="SÉLECTION 4 / 6" tone={error?'critical':'warning'}><div className="identity-safeguards" role="group" aria-label="Garanties identitaires ASCENDANT">{identitySafeguards.map((guard)=><button role="checkbox" aria-checked={selected.includes(guard.id)} className={selected.includes(guard.id)?'is-selected':''} key={guard.id} onClick={()=>toggle(guard.id)}><span>{guard.id.toUpperCase()}</span><strong>{guard.label}</strong><p>{guard.detail}</p><small>{guard.consequence}</small></button>)}</div></Panel>
      {error&&<p className="matrix-error" role="alert">MATRICE REJETÉE — cette configuration permet une fusion majoritaire ou conserve une autorité distante sur les occupants.</p>}
      <button className="button-primary matrix-validate" disabled={selected.length!==4} onClick={validate}>STABILISER LES QUATRE GARANTIES</button>
    </>}
  </div>;
}
