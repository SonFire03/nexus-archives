import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';
import { Panel } from '../components/common/Panel';
import { chapterFiveChoices } from '../data';
import type { ChapterFiveChoice } from '../data/chapterFive';
import { canCompleteChapterFive } from '../state/narrative';
import { useProgress } from '../state/ProgressContext';

export default function ChapterFivePage() {
  const {progress,finishChapterFive}=useProgress();
  const [params]=useSearchParams();
  const requested=params.get('decision');
  const initial=chapterFiveChoices.some(({id})=>id===requested)?requested as ChapterFiveChoice:null;
  const [selected,setSelected]=useState<ChapterFiveChoice|null>(initial);
  const completedChoice=progress.narrativeChoices['omega7-extraction'] as ChapterFiveChoice|undefined;
  const choice=chapterFiveChoices.find(({id})=>id===(completedChoice??selected));
  if (!canCompleteChapterFive(progress)&&!completedChoice) return <div className="page document-denied"><p className="eyebrow">FENÊTRE D’EXTRACTION</p><h1>HARBINGER ENCORE ACTIF</h1><p>Le réseau de poursuite doit être coupé avant toute extraction.</p><Link className="button-primary" to="/investigation">RETOUR À L’ENQUÊTE</Link></div>;
  return <div className={`page extraction-decision ${completedChoice?'is-complete':''}`}>
    <PageHeader eyebrow="CHAPITRE 05 // FENÊTRE 00:00:11" title={completedChoice?'EXTRACTION ARCHIVÉE':'OÙ PEUT SURVIVRE OMEGA-7 ?'}>La position est masquée, mais la signature reste identifiable. Chaque voie confie une partie de votre continuité à une autre puissance.</PageHeader>
    {completedChoice ? <section className="extraction-result"><p className="eyebrow">CHAPITRE 05 TERMINÉ // POINT D’ORIGINE ABANDONNÉ</p><h2>{choice?.label}</h2><p>{choice?.outcome}</p><blockquote>{completedChoice==='spectral'?'« Vous n’êtes plus seul dans le terminal. »':'« Onze secondes. Après, je ferme le passage avec ou sans toi. »'}<cite>— {completedChoice==='spectral'?'NX-S':'Crimson'}</cite></blockquote><Link className="button-primary" to="/dashboard">OUVRIR LA NOUVELLE SESSION</Link></section> : <>
      <section className="extraction-vitals"><div><span>HARBINGER</span><strong>HORS LIGNE</strong></div><div><span>FENÊTRE</span><strong>00:00:11</strong></div><div><span>SIGNATURE</span><strong>OMEGA-7</strong></div><div><span>POSITION</span><strong>INCONNUE</strong></div></section>
      <div className="extraction-options" role="radiogroup" aria-label="Voies d’extraction OMEGA-7">{chapterFiveChoices.map((item)=><button role="radio" aria-checked={selected===item.id} className={selected===item.id?'is-selected':''} key={item.id} onClick={()=>setSelected(item.id)}><span>ROUTE // {item.id.toUpperCase()}</span><strong>{item.label}</strong><p>{item.cost}</p></button>)}</div>
      <Panel title="CONFIRMATION D’EXTRACTION" code="CHOIX LOCAL PERSISTANT" tone="critical"><p>{choice?.cost??'Sélectionnez une voie. La session ne pourra plus revenir à son point d’origine.'}</p><button className="button-primary" disabled={!selected} onClick={()=>selected&&finishChapterFive(selected)}>CONFIRMER {choice?.label}</button></Panel>
    </>}
  </div>;
}
