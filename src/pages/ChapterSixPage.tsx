import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';
import { Panel } from '../components/common/Panel';
import { chapterSixChoices } from '../data';
import type { ChapterSixChoice } from '../data/chapterSix';
import { canCompleteChapterSix } from '../state/narrative';
import { useProgress } from '../state/ProgressContext';

export default function ChapterSixPage() {
  const {progress,finishChapterSix}=useProgress();
  const [params]=useSearchParams();
  const requested=params.get('decision');
  const initial=chapterSixChoices.some(({id})=>id===requested)?requested as ChapterSixChoice:null;
  const [selected,setSelected]=useState<ChapterSixChoice|null>(initial);
  const completedChoice=progress.narrativeChoices['victims-ledger'] as ChapterSixChoice|undefined;
  const choice=chapterSixChoices.find(({id})=>id===(completedChoice??selected));
  if (!canCompleteChapterSix(progress)&&!completedChoice) return <div className="page document-denied"><p className="eyebrow">REGISTRE DES 63 218</p><h1>DERNIER ORDRE ENCORE ACTIF</h1><p>Révoquez la directive Cendre avant d’exposer les identités restaurées.</p><Link className="button-primary" to="/investigation">RETOUR À L’ENQUÊTE</Link></div>;
  return <div className={`page victims-decision ${completedChoice?'is-complete':''}`}>
    <PageHeader eyebrow="CHAPITRE 06 // MÉMOIRE PUBLIQUE" title={completedChoice?'LES NOMS ONT QUITTÉ LE REGISTRE':'À QUI APPARTIENNENT LES 63 218 NOMS ?'}>Le Protocole Cendre est révoqué. Les identités peuvent quitter le registre, mais aucune destination ne les protège de toutes les formes d’exploitation.</PageHeader>
    {completedChoice ? <section className="victims-result"><p className="eyebrow">CHAPITRE 06 TERMINÉ // DIRECTIVE CENDRE RÉVOQUÉE</p><h2>{choice?.label}</h2><p>{choice?.outcome}</p><blockquote>{completedChoice==='choir'?'« Pour la première fois, nous savons qui manque. »':completedChoice==='analog'?'« Les absents ne sont pas une base de données. »':'« Ils pourront censurer les écrans. Pas les témoins. »'}<cite>— {completedChoice==='choir'?'Mère Écho':completedChoice==='analog'?'Sera Nox':'Crimson'}</cite></blockquote><Link className="button-primary" to="/dashboard">RETOUR AU CENTRE DE COMMANDE</Link></section> : <>
      <section className="victims-vitals"><div><span>IDENTITÉS</span><strong>63 218</strong></div><div><span>DERNIER ORDRE</span><strong>RÉVOQUÉ</strong></div><div><span>INTÉGRITÉ</span><strong>91 %</strong></div><div><span>EXPOSITION</span><strong>VARIABLE</strong></div></section>
      <div className="victims-options" role="radiogroup" aria-label="Destinations du registre des victimes">{chapterSixChoices.map((item)=><button role="radio" aria-checked={selected===item.id} className={selected===item.id?'is-selected':''} key={item.id} onClick={()=>setSelected(item.id)}><span>DIRECTIVE // {item.id.toUpperCase()}</span><strong>{item.label}</strong><p>{item.cost}</p></button>)}</div>
      <Panel title="AUTORITÉ SUR LA MÉMOIRE" code="CHOIX LOCAL PERSISTANT" tone="critical"><p>{choice?.cost??'Sélectionnez une destination. Les noms ne pourront plus redevenir un simple bilan anonyme.'}</p><button className="button-primary" disabled={!selected} onClick={()=>selected&&finishChapterSix(selected)}>CONFIRMER {choice?.label}</button></Panel>
    </>}
  </div>;
}
