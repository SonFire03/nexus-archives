import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { InvestigationGraph } from '../components/investigation/InvestigationGraph';
import { PageHeader } from '../components/common/PageHeader';
import { Panel } from '../components/common/Panel';
import { TransmissionCard } from '../components/common/TransmissionCard';
import { chapterTwoObjectives, chapterZeroObjectives, evidenceNodes, evidenceRelations, transmissions } from '../data';
import { canCompleteChapterTwo, canCompleteChapterZero } from '../state/narrative';
import { useProgress } from '../state/ProgressContext';
import type { EvidenceNode } from '../types';

export default function InvestigationPage() {
  const { progress, finishChapterZero } = useProgress();
  const discoveredNodes = useMemo(() => evidenceNodes.filter((node) => progress.evidenceNodes.includes(node.id)), [progress.evidenceNodes]);
  const discoveredRelations = useMemo(() => evidenceRelations.filter((relation) => progress.evidenceRelations.includes(relation.id) && progress.evidenceNodes.includes(relation.from) && progress.evidenceNodes.includes(relation.to)), [progress.evidenceNodes,progress.evidenceRelations]);
  const [selected, setSelected] = useState<EvidenceNode | undefined>(discoveredNodes[0]);
  const chapterTwoStarted = progress.completedObjectives.includes('open-seven-bodies') || progress.completedChapters.includes('chapter-two');
  const objectives = chapterTwoStarted ? chapterTwoObjectives : chapterZeroObjectives;
  const chapterId = chapterTwoStarted ? 'chapter-two' : 'chapter-zero';
  const chapterNumber = chapterTwoStarted ? '02' : '01';
  const chapterTitle = chapterTwoStarted ? 'LES SEPT CORPS' : 'NUIT ZÉRO';
  const chapterComplete = progress.completedChapters.includes(chapterId);
  const canComplete = chapterTwoStarted ? canCompleteChapterTwo(progress) : canCompleteChapterZero(progress);
  const nextObjective = objectives.find((objective) => !progress.completedObjectives.includes(objective.id));
  const progressValue = Math.round((progress.completedObjectives.filter((id) => objectives.some((objective) => objective.id === id)).length / objectives.length) * 100);

  return <div className={`page investigation-page ${chapterComplete ? 'spectral-contact' : ''}`}><PageHeader eyebrow={`CHAPITRE ${chapterNumber} // ${chapterTitle}`} title="TABLEAU D’ENQUÊTE">Les relations sont établies uniquement à partir de preuves consultées. Les zones inconnues restent volontairement absentes.</PageHeader>
    <section className="chapter-progress" aria-label={`Progression du chapitre ${progressValue} %`}><div><span>PROGRESSION CHAPITRE {chapterNumber}</span><strong>{progressValue} %</strong></div><div className="chapter-progress__bar"><i style={{width:`${progressValue}%`}} /></div><span>{chapterComplete ? 'TERMINÉ' : 'ENQUÊTE ACTIVE'}</span></section>
    {progress.completedChapters.includes('chapter-zero') && !chapterTwoStarted && <section className="chapter-complete"><p>INTRUSION SPECTRALE DÉTECTÉE</p><h2>CHAPITRE 01 TERMINÉ</h2><strong>ACCÈS TACTIQUE ACCORDÉ</strong><TransmissionCard transmission={transmissions.find((item) => item.id === 'nx-s-contact-01')!} /><Link className="button-primary" to="/archives/dossier-sept-corps">OUVRIR LE DOSSIER DES SEPT CORPS</Link></section>}
    {progress.completedChapters.includes('chapter-two') && <section className="chapter-complete"><p>DÉCISION IDENTITAIRE ARCHIVÉE</p><h2>CHAPITRE 02 TERMINÉ</h2><strong>ACCÈS OMEGA ACCORDÉ</strong><TransmissionCard transmission={transmissions.find((item) => item.id === 'nx-s-body-04')!} /><Link className="button-primary" to="/chapter-two">CONSULTER LA DÉCISION</Link></section>}
    <div className="investigation-layout"><section className="investigation-stage"><InvestigationGraph nodes={discoveredNodes} relations={discoveredRelations} selectedId={selected?.id} onSelect={setSelected} />{discoveredNodes.length === 0 && <p className="graph-empty">AUCUNE PREUVE ENREGISTRÉE — CONSULTEZ LE RAPPORT NUIT ZÉRO.</p>}</section><Panel title="PREUVE SÉLECTIONNÉE" code={selected?.category.toUpperCase() ?? 'INCONNUE'}>{selected ? <><h3>{selected.label}</h3><p>{selected.summary}</p><h3>RELATIONS ÉTABLIES</h3>{discoveredRelations.filter((relation) => relation.from === selected.id || relation.to === selected.id).map((relation) => { const from=evidenceNodes.find((node) => node.id === relation.from); const to=evidenceNodes.find((node) => node.id === relation.to); return <p className="relation" key={relation.id}><strong>{from?.label} → {relation.label} → {to?.label}</strong></p>; })}{selected.route && <Link className="button-link" to={selected.route}>OUVRIR LA SOURCE →</Link>}</> : <p>Sélectionnez une preuve dans le graphe ou la liste textuelle.</p>}</Panel></div>
    <section className="evidence-text"><h2>REPRÉSENTATION TEXTUELLE DES PREUVES</h2><div className="evidence-text__grid"><div><h3>NŒUDS DÉCOUVERTS</h3><ul>{discoveredNodes.map((node) => <li key={node.id}><button onClick={() => setSelected(node)}><strong>{node.label}</strong><span>{node.summary}</span></button></li>)}</ul></div><div><h3>RELATIONS ÉTABLIES</h3><ul>{discoveredRelations.map((relation) => <li key={relation.id}><strong>{evidenceNodes.find((node) => node.id === relation.from)?.label}</strong> → {relation.label} → <strong>{evidenceNodes.find((node) => node.id === relation.to)?.label}</strong><small>Source : {relation.sourceDocumentId}</small></li>)}</ul></div></div></section>
    {!chapterComplete && <section className="investigation-next"><p className="eyebrow">PROCHAINE PISTE</p><h2>{canComplete ? chapterTwoStarted ? 'LE CORPS 04 ATTEND UNE DÉCISION' : 'LES RELATIONS ESSENTIELLES SONT ÉTABLIES' : nextObjective?.title.toUpperCase()}</h2><p>{canComplete ? chapterTwoStarted ? 'Réveil, isolement ou effacement : aucun protocole ne préserve toutes les identités.' : 'La reconstruction est cohérente. Une présence observe cependant le tableau.' : nextObjective?.hint ?? nextObjective?.description}</p>{canComplete ? chapterTwoStarted ? <Link className="button-primary" to="/chapter-two">OUVRIR LA CONSOLE DE DÉCISION</Link> : <button className="button-primary" onClick={finishChapterZero}>ÉTABLIR LA SYNTHÈSE FINALE</button> : nextObjective && <Link className="button-primary" to={nextObjective.route}>SUIVRE LA PISTE →</Link>}</section>}
  </div>;
}
