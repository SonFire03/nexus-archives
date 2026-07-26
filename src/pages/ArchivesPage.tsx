import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';
import { RedactedText } from '../components/common/RedactedText';
import { TransmissionCard } from '../components/common/TransmissionCard';
import { archiveDocuments, transmissions } from '../data';
import { isDocumentAvailable } from '../state/narrative';
import { useProgress } from '../state/ProgressContext';

export default function ArchivesPage() {
  const { progress } = useProgress();
  const [category, setCategory] = useState('toutes');
  const [state, setState] = useState('tous');
  const filtered = useMemo(() => archiveDocuments.filter((document) => {
    const available = isDocumentAvailable(document, progress); const viewed = progress.viewedDocuments.includes(document.id);
    return (category === 'toutes' || document.category === category) && (state === 'tous' || (state === 'lu' && viewed) || (state === 'non-lu' && available && !viewed) || (state === 'verrouille' && !available));
  }), [category, state, progress]);
  const percentage = Math.round((progress.completedObjectives.filter((id) => ['view-official-zero-report','identify-z-2219','decrypt-z-2219','read-restoration-log','compare-zero-versions','detect-seven-signatures','link-main-evidence','identify-nx-s-intervention'].includes(id)).length / 8) * 100);
  return <div className="page"><PageHeader eyebrow="MÉMOIRE LOCALE // CHAPITRE 01" title="ARCHIVES CLASSIFIÉES">Chaque document consulté peut révéler un code, une contradiction ou une nouvelle piste.</PageHeader>
    <section className="archive-status"><div><span>NIVEAU D’ACCÈS</span><strong>{progress.accessLevel}</strong></div><div><span>DOCUMENTS CONSULTÉS</span><strong>{progress.viewedDocuments.length}/{archiveDocuments.length}</strong></div><div><span>INDICES DÉCOUVERTS</span><strong>{progress.discoveredClues.length}</strong></div><div><span>CHAPITRE 01</span><strong>{percentage} %</strong></div></section>
    <section className="filters" aria-label="Filtres des archives"><label>CATÉGORIE<select value={category} onChange={(event) => setCategory(event.target.value)}><option value="toutes">Toutes</option>{[...new Set(archiveDocuments.map((item) => item.category))].map((item) => <option key={item} value={item}>{item.toUpperCase()}</option>)}</select></label><label>ÉTAT<select value={state} onChange={(event) => setState(event.target.value)}><option value="tous">Tous</option><option value="lu">Lus</option><option value="non-lu">Non lus</option><option value="verrouille">Verrouillés</option></select></label><output>{filtered.length} DOCUMENTS</output></section>
    <div className="archive-grid">{filtered.map((document,index) => { const available = isDocumentAvailable(document, progress); const viewed = progress.viewedDocuments.includes(document.id); return <article className={`archive-file ${available ? '' : 'locked'} ${viewed ? 'viewed' : ''}`} key={document.id}><header><span>{document.code}</span><em>{document.classification}</em></header><p className="archive-category">CH.{document.chapterId === 'chapter-zero' ? '01' : '—'} // {document.category}</p><h2>{document.title}</h2><p>{available ? document.summary : <RedactedText revealed={false}>Document verrouillé</RedactedText>}</p><dl><div><dt>ÉMETTEUR</dt><dd>{available ? document.issuer : 'CLASSIFIÉ'}</dd></div><div><dt>PAGES</dt><dd>{document.pages.length}</dd></div></dl>{available ? <Link className="archive-open" to={`/archives/${document.id}`}>{viewed ? 'ROUVRIR LE DOCUMENT' : 'OUVRIR LE DOCUMENT'} →</Link> : <button disabled>ACCÈS {document.classification} OU INDICE REQUIS</button>}<small>INDEX {String(index + 1).padStart(3,'0')}</small></article>; })}</div>
    {filtered.length === 0 && <p className="empty-state">AUCUN DOCUMENT NE CORRESPOND AUX FILTRES.</p>}
    <section className="transmission-index"><h2>TRANSMISSIONS INTERCEPTÉES</h2><div>{transmissions.filter((item) => !item.id.includes('contact') || progress.unlockedSecrets.includes(item.id)).map((item) => <TransmissionCard key={item.id} transmission={item} />)}</div></section>
  </div>;
}
