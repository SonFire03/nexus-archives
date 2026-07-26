import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { InvestigationGraph } from '../components/investigation/InvestigationGraph';
import { PageHeader } from '../components/common/PageHeader';
import { Panel } from '../components/common/Panel';
import { TransmissionCard } from '../components/common/TransmissionCard';
import { chapterZeroObjectives, evidenceNodes, evidenceRelations, transmissions } from '../data';
import { canCompleteChapterZero } from '../state/narrative';
import { useProgress } from '../state/ProgressContext';
import type { EvidenceNode } from '../types';

export default function InvestigationPage() {
  const { progress, finishChapterZero } = useProgress();
  const discoveredNodes = useMemo(() => evidenceNodes.filter((node) => progress.evidenceNodes.includes(node.id)), [progress.evidenceNodes]);
  const discoveredRelations = useMemo(() => evidenceRelations.filter((relation) => progress.evidenceRelations.includes(relation.id)), [progress.evidenceRelations]);
  const [selected, setSelected] = useState<EvidenceNode | undefined>(discoveredNodes[0]);
  const chapterComplete = progress.completedChapters.includes('chapter-zero');
  const canComplete = canCompleteChapterZero(progress);
  const nextObjective = chapterZeroObjectives.find((objective) => !progress.completedObjectives.includes(objective.id));
  const progressValue = Math.round((progress.completedObjectives.filter((id) => chapterZeroObjectives.some((objective) => objective.id === id)).length / chapterZeroObjectives.length) * 100);

  return <div className={`page investigation-page ${chapterComplete ? 'spectral-contact' : ''}`}><PageHeader eyebrow="CHAPITRE 01 // NUIT ZÉRO" title="TABLEAU D’ENQUÊTE">Les relations sont établies uniquement à partir de preuves consultées. Les zones inconnues restent volontairement absentes.</PageHeader>
    <section className="chapter-progress" aria-label={`Progression du chapitre ${progressValue} %`}><div><span>PROGRESSION CHAPITRE 01</span><strong>{progressValue} %</strong></div><div className="chapter-progress__bar"><i style={{width:`${progressValue}%`}} /></div><span>{chapterComplete ? 'TERMINÉ' : 'ENQUÊTE ACTIVE'}</span></section>
    {chapterComplete && <section className="chapter-complete"><p>INTRUSION SPECTRALE DÉTECTÉE</p><h2>CHAPITRE 01 TERMINÉ</h2><strong>ACCÈS TACTIQUE ACCORDÉ</strong><TransmissionCard transmission={transmissions.find((item) => item.id === 'nx-s-contact-01')!} /><Link className="button-primary" to="/archives/dossier-sept-corps">OUVRIR LE DOSSIER DES SEPT CORPS</Link></section>}
    <div className="investigation-layout"><section className="investigation-stage"><InvestigationGraph nodes={discoveredNodes} relations={discoveredRelations} selectedId={selected?.id} onSelect={setSelected} />{discoveredNodes.length === 0 && <p className="graph-empty">AUCUNE PREUVE ENREGISTRÉE — CONSULTEZ LE RAPPORT NUIT ZÉRO.</p>}</section><Panel title="PREUVE SÉLECTIONNÉE" code={selected?.category.toUpperCase() ?? 'INCONNUE'}>{selected ? <><h3>{selected.label}</h3><p>{selected.summary}</p><h3>RELATIONS ÉTABLIES</h3>{discoveredRelations.filter((relation) => relation.from === selected.id || relation.to === selected.id).map((relation) => { const from=evidenceNodes.find((node) => node.id === relation.from); const to=evidenceNodes.find((node) => node.id === relation.to); return <p className="relation" key={relation.id}><strong>{from?.label} → {relation.label} → {to?.label}</strong></p>; })}{selected.route && <Link className="button-link" to={selected.route}>OUVRIR LA SOURCE →</Link>}</> : <p>Sélectionnez une preuve dans le graphe ou la liste textuelle.</p>}</Panel></div>
    <section className="evidence-text"><h2>REPRÉSENTATION TEXTUELLE DES PREUVES</h2><div className="evidence-text__grid"><div><h3>NŒUDS DÉCOUVERTS</h3><ul>{discoveredNodes.map((node) => <li key={node.id}><button onClick={() => setSelected(node)}><strong>{node.label}</strong><span>{node.summary}</span></button></li>)}</ul></div><div><h3>RELATIONS ÉTABLIES</h3><ul>{discoveredRelations.map((relation) => <li key={relation.id}><strong>{evidenceNodes.find((node) => node.id === relation.from)?.label}</strong> → {relation.label} → <strong>{evidenceNodes.find((node) => node.id === relation.to)?.label}</strong><small>Source : {relation.sourceDocumentId}</small></li>)}</ul></div></div></section>
    {!chapterComplete && <section className="investigation-next"><p className="eyebrow">PROCHAINE PISTE</p><h2>{canComplete ? 'LES RELATIONS ESSENTIELLES SONT ÉTABLIES' : nextObjective?.title.toUpperCase()}</h2><p>{canComplete ? 'La reconstruction est cohérente. Une présence observe cependant le tableau.' : nextObjective?.hint ?? nextObjective?.description}</p>{canComplete ? <button className="button-primary" onClick={finishChapterZero}>ÉTABLIR LA SYNTHÈSE FINALE</button> : nextObjective && <Link className="button-primary" to={nextObjective.route}>SUIVRE LA PISTE →</Link>}</section>}
  </div>;
}
