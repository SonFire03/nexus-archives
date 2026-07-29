import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';
import { Panel } from '../components/common/Panel';
import { chapterFourChoices } from '../data';
import type { ChapterFourChoice } from '../data/chapterFour';
import { canCompleteChapterFour } from '../state/narrative';
import { useProgress } from '../state/ProgressContext';

export default function ChapterFourPage() {
  const {progress,finishChapterFour}=useProgress();
  const [params]=useSearchParams();
  const requested=params.get('decision');
  const initial=chapterFourChoices.some(({id})=>id===requested)?requested as ChapterFourChoice:null;
  const [selected,setSelected]=useState<ChapterFourChoice|null>(initial);
  const completedChoice=progress.narrativeChoices['mirror-00'] as ChapterFourChoice|undefined;
  const choice=chapterFourChoices.find(({id})=>id===(completedChoice??selected));
  if (!canCompleteChapterFour(progress)&&!completedChoice) return <div className="page document-denied"><p className="eyebrow">RÉSEAU DU MIROIR</p><h1>CARTOGRAPHIE INCOMPLÈTE</h1><p>Les relais de remplacement doivent être identifiés avant toute action sur MIRROR-00.</p><Link className="button-primary" to="/investigation">RETOUR À L’ENQUÊTE</Link></div>;
  return <div className={`page truth-decision ${completedChoice?'is-complete':''}`}>
    <PageHeader eyebrow="CHAPITRE 04 // AUTORITÉ NARRATIVE" title={completedChoice?'DESTIN DE MIRROR-00 ARCHIVÉ':'QUI POSSÈDE LA VÉRITÉ ?'}>Onze relais peuvent imposer un récit à VANTA. Détruire le mensonge, le publier ou le répartir produit chaque fois une nouvelle autorité.</PageHeader>
    {completedChoice ? <section className="truth-decision-result"><p className="eyebrow">CHAPITRE 04 TERMINÉ // SIGNATURE EXPOSÉE</p><h2>{choice?.label}</h2><p>{choice?.outcome}</p><blockquote>« Vous avez choisi ce que VANTA devra croire. Vous travaillez déjà pour le Miroir. »<cite>— Orin Vale</cite></blockquote><Link className="button-primary" to="/dashboard">RETOUR AU CENTRE DE COMMANDE</Link></section> : <>
      <section className="mirror-vitals"><div><span>RELAIS</span><strong>11 / 11</strong></div><div><span>ARCHIVES CIVILES</span><strong>COMPROMISES</strong></div><div><span>MIRROR-00</span><strong>INTÉGRITÉ 43 %</strong></div><div><span>ORIN VALE</span><strong>CONNECTÉ</strong></div></section>
      <div className="truth-options" role="radiogroup" aria-label="Protocoles de diffusion de MIRROR-00">{chapterFourChoices.map((item)=><button role="radio" aria-checked={selected===item.id} className={selected===item.id?'is-selected':''} key={item.id} onClick={()=>setSelected(item.id)}><span>DIRECTIVE // {item.id.toUpperCase()}</span><strong>{item.label}</strong><p>{item.cost}</p></button>)}</div>
      <Panel title="AUTORITÉ NOIR ABSOLU" code="CHOIX LOCAL PERSISTANT" tone="critical"><p>{choice?.cost??'Sélectionnez une directive. Aucune option ne restitue une vérité neutre.'}</p><button className="button-primary" disabled={!selected} onClick={()=>selected&&finishChapterFour(selected)}>CONFIRMER {choice?.label}</button></Panel>
    </>}
  </div>;
}
