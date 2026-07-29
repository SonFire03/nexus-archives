import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';
import { Panel } from '../components/common/Panel';
import { chapterThreeChoices } from '../data';
import type { ChapterThreeChoice } from '../data/chapterThree';
import { canCompleteChapterThree } from '../state/narrative';
import { useProgress } from '../state/ProgressContext';

export default function ChapterThreePage() {
  const {progress,finishChapterThree}=useProgress();
  const [params]=useSearchParams();
  const requested=params.get('decision');
  const initial=chapterThreeChoices.some(({id})=>id===requested)?requested as ChapterThreeChoice:null;
  const [selected,setSelected]=useState<ChapterThreeChoice|null>(initial);
  const completedChoice=progress.narrativeChoices['continuity-gate'] as ChapterThreeChoice|undefined;
  const choice=chapterThreeChoices.find(({id})=>id===(completedChoice??selected));
  if (!canCompleteChapterThree(progress)&&!completedChoice) return <div className="page document-denied"><p className="eyebrow">PORTE DE CONTINUITÉ</p><h1>TÉMOIGNAGE MANQUANT</h1><p>Mère Écho doit être contactée avant l’exécution d’un protocole.</p><Link className="button-primary" to="/investigation">RETOUR À L’ENQUÊTE</Link></div>;
  return <div className={`page gate-decision ${completedChoice?'is-complete':''}`}><PageHeader eyebrow="CHAPITRE 03 // NŒUD MÉMORIEL 29" title={completedChoice?'STATUT DE LA PORTE ARCHIVÉ':'PORTE DE CONTINUITÉ'}>La Porte contient des consciences fragmentaires, une empreinte infantile et une partie de NX-S. Aucun protocole ne peut les séparer parfaitement.</PageHeader>
    {completedChoice?<section className="gate-result"><p className="eyebrow">CHAPITRE 03 TERMINÉ // NOIR ABSOLU</p><h2>{choice?.label}</h2><p>{choice?.outcome}</p><blockquote>« Vous appelez cela une porte parce que vous avez besoin de croire qu’elle possède deux côtés. »<cite>— NX-S</cite></blockquote><Link className="button-primary" to="/dashboard">RETOUR AU CENTRE DE COMMANDE</Link></section>:<><section className="gate-vitals"><div><span>EMPREINTES</span><strong>63 218</strong></div><div><span>R-0</span><strong>STABLE 61 %</strong></div><div><span>NX-S</span><strong>PRÉSENT</strong></div><div><span>PORTE</span><strong>EN ATTENTE</strong></div></section><div className="gate-options" role="radiogroup" aria-label="Protocoles de la Porte de Continuité">{chapterThreeChoices.map((item)=><button role="radio" aria-checked={selected===item.id} className={selected===item.id?'is-selected':''} key={item.id} onClick={()=>setSelected(item.id)}><span>PROTOCOLE // {item.id.toUpperCase()}</span><strong>{item.label}</strong><p>{item.cost}</p></button>)}</div><Panel title="AUTORISATION NOIR ABSOLU" code="CHOIX LOCAL PERSISTANT" tone="critical"><p>{choice?.cost??'Sélectionnez un protocole. Aucun choix ne sera exécuté sans confirmation.'}</p><button className="button-primary" disabled={!selected} onClick={()=>selected&&finishChapterThree(selected)}>CONFIRMER {choice?.label}</button></Panel></>}
  </div>;
}
