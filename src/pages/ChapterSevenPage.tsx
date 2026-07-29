import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';
import { Panel } from '../components/common/Panel';
import { chapterSevenChoices } from '../data';
import type { ChapterSevenChoice } from '../data/chapterSeven';
import { canCompleteChapterSeven } from '../state/narrative';
import { useProgress } from '../state/ProgressContext';

export default function ChapterSevenPage() {
  const {progress,finishChapterSeven}=useProgress();
  const [params]=useSearchParams();
  const requested=params.get('decision');
  const initial=chapterSevenChoices.some(({id})=>id===requested)?requested as ChapterSevenChoice:null;
  const [selected,setSelected]=useState<ChapterSevenChoice|null>(initial);
  const completedChoice=progress.narrativeChoices['ascendant-host'] as ChapterSevenChoice|undefined;
  const choice=chapterSevenChoices.find(({id})=>id===(completedChoice??selected));
  if (!canCompleteChapterSeven(progress)&&!completedChoice) return <div className="page document-denied"><p className="eyebrow">NX6-OMEGA ASCENDANT</p><h1>AUTORITÉ SOVEREIGN ACTIVE</h1><p>Aucun consentement n’est valable tant que le Directoire contrôle les fonctions motrices.</p><Link className="button-primary" to="/investigation">RETOUR À L’ENQUÊTE</Link></div>;
  return <div className={`page ascendant-decision ${completedChoice?'is-complete':''}`}>
    <PageHeader eyebrow="CHAPITRE 07 // DROIT À L’INCARNATION" title={completedChoice?'DESTIN ASCENDANT ARCHIVÉ':'QUI PEUT HABITER UN CORPS CONSTRUIT COMME UNE ARME ?'}>SOVEREIGN est coupé. La matrice garantit sept identités distinctes, mais le châssis transformera toute conscience qui l’occupera.</PageHeader>
    {completedChoice ? <section className="ascendant-final"><p className="eyebrow">CHAPITRE 07 TERMINÉ // AUTORITÉ DISTANTE RÉVOQUÉE</p><h2>{choice?.label}</h2><p>{choice?.outcome}</p><blockquote>{completedChoice==='r0'?'« Je choisirai mon nom après avoir vu le ciel. »':completedChoice==='choir'?'« Demande avant chaque pas. »':'« Sept unités médicales. Aucune armée. »'}<cite>— {completedChoice==='r0'?'R-0':completedChoice==='choir'?'Les Sept':'Crimson'}</cite></blockquote><Link className="button-primary" to="/dashboard">RETOUR AU CENTRE DE COMMANDE</Link></section> : <>
      <section className="ascendant-vitals"><div><span>PARTITIONS</span><strong>7 / 7</strong></div><div><span>SOVEREIGN</span><strong>COUPÉ</strong></div><div><span>CONSENTEMENT</span><strong>REQUIS</strong></div><div><span>NEURO-RISQUE</span><strong>10 / 10</strong></div></section>
      <div className="ascendant-options" role="radiogroup" aria-label="Destins du corps ASCENDANT">{chapterSevenChoices.map((item)=><button role="radio" aria-checked={selected===item.id} className={selected===item.id?'is-selected':''} key={item.id} onClick={()=>setSelected(item.id)}><span>PROTOCOLE // {item.id.toUpperCase()}</span><strong>{item.label}</strong><p>{item.cost}</p></button>)}</div>
      <Panel title="AUTORITÉ SUR LE CORPS" code="CHOIX LOCAL PERSISTANT" tone="critical"><p>{choice?.cost??'Sélectionnez un protocole. La puissance du châssis restera liée au coût imposé à ses occupants.'}</p><button className="button-primary" disabled={!selected} onClick={()=>selected&&finishChapterSeven(selected)}>CONFIRMER {choice?.label}</button></Panel>
    </>}
  </div>;
}
