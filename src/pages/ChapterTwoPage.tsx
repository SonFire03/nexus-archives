import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';
import { Panel } from '../components/common/Panel';
import { chapterTwoChoices } from '../data';
import type { ChapterTwoChoice } from '../data/chapterTwo';
import { canCompleteChapterTwo } from '../state/narrative';
import { useProgress } from '../state/ProgressContext';

export default function ChapterTwoPage() {
  const { progress, finishChapterTwo } = useProgress();
  const [params] = useSearchParams();
  const requested = params.get('decision');
  const initial = chapterTwoChoices.some(({id}) => id === requested) ? requested as ChapterTwoChoice : null;
  const [selected,setSelected] = useState<ChapterTwoChoice | null>(initial);
  const completedChoice = progress.narrativeChoices['body-04'] as ChapterTwoChoice | undefined;
  const selectedChoice = useMemo(() => chapterTwoChoices.find(({id}) => id === (completedChoice ?? selected)),[completedChoice,selected]);
  const ready = canCompleteChapterTwo(progress);

  if (!ready && !completedChoice) return <div className="page document-denied"><p className="eyebrow">CHAPITRE 02 // DÉCISION</p><h1>DONNÉES INSUFFISANTES</h1><p>Le Corps 04 doit être localisé avant toute décision.</p><Link className="button-primary" to="/investigation">RETOUR À L’ENQUÊTE</Link></div>;

  return <div className={`page chapter-two-decision ${completedChoice ? 'is-complete' : ''}`}><PageHeader eyebrow="CHAPITRE 02 // POINT DE NON-RETOUR" title={completedChoice ? 'DÉCISION ARCHIVÉE' : 'STATUER SUR LE CORPS 04'}>Aucune option ne conserve à la fois le corps, l’empreinte et la sécurité de VANTA. Votre choix est enregistré uniquement dans la progression locale.</PageHeader>
    {completedChoice ? <section className="decision-result"><p className="eyebrow">CHAPITRE 02 TERMINÉ // ACCÈS OMEGA</p><h2>{selectedChoice?.label}</h2><p>{selectedChoice?.outcome}</p><blockquote>« Vous avez choisi lequel devait continuer. C’est ainsi que le Directoire a commencé. »<cite>— NX-S</cite></blockquote><div><Link className="button-primary" to="/dashboard">RETOUR AU CENTRE DE COMMANDE</Link><Link className="button-secondary" to="/archives/protocole-fil-rouge">OUVRIR LE PROGRAMME R</Link></div></section> : <>
      <section className="decision-vitals"><div><span>SUJET</span><strong>A7-04</strong></div><div><span>ÉTAT</span><strong>VIABLE</strong></div><div><span>CONSCIENCE</span><strong>NON STABLE</strong></div><div><span>NX-S</span><strong>EN APPROCHE</strong></div></section>
      <div className="decision-options" role="radiogroup" aria-label="Protocoles pour le Corps 04">{chapterTwoChoices.map((choice) => <button role="radio" aria-checked={selected===choice.id} className={selected===choice.id?'is-selected':''} key={choice.id} onClick={() => setSelected(choice.id)}><span>PROTOCOLE // {choice.id.toUpperCase()}</span><strong>{choice.label}</strong><p>{choice.cost}</p></button>)}</div>
      <Panel title="CONFIRMATION OMEGA" code="IRRÉVERSIBLE LOCALEMENT" tone="critical"><p>{selectedChoice ? selectedChoice.cost : 'Sélectionnez un protocole pour afficher son coût.'}</p><button className="button-primary" disabled={!selected} onClick={() => selected && finishChapterTwo(selected)}>CONFIRMER {selectedChoice?.label}</button></Panel>
    </>}
  </div>;
}
