import { PageHeader } from '../components/common/PageHeader';
import { RedactedText } from '../components/common/RedactedText';
import { TransmissionCard } from '../components/common/TransmissionCard';
import { archiveDocuments, transmissions } from '../data';
import { useProgress } from '../state/ProgressContext';
import { accessOrder } from '../state/progress';

export default function ArchivesPage() {
  const { progress, markViewed } = useProgress();
  const currentAccess = accessOrder.indexOf(progress.accessLevel);
  const unlocked = archiveDocuments.filter((doc) => currentAccess >= accessOrder.indexOf(doc.access));
  const percentage = Math.round(((progress.viewedDocuments.length + progress.unlockedSecrets.length) / (archiveDocuments.length * 2)) * 100);
  return <div className="page"><PageHeader eyebrow="MÉMOIRE LOCALE // INDEX OMEGA" title="ARCHIVES CLASSIFIÉES">Les documents consultés et fragments déchiffrés sont stockés uniquement sur cet appareil.</PageHeader><section className="archive-status"><div><span>NIVEAU D’ACCÈS</span><strong>{progress.accessLevel}</strong></div><div><span>DOCUMENTS CONSULTÉS</span><strong>{progress.viewedDocuments.length}/{archiveDocuments.length}</strong></div><div><span>FRAGMENTS DÉBLOQUÉS</span><strong>{progress.unlockedSecrets.length}</strong></div><div><span>PROGRESSION GLOBALE</span><strong>{Math.min(100, percentage)} %</strong></div></section><div className="archive-grid">{archiveDocuments.map((document,index) => { const canOpen = unlocked.includes(document); const viewed = progress.viewedDocuments.includes(document.id); return <article className={`archive-file ${canOpen ? '' : 'locked'} ${viewed ? 'viewed' : ''}`} key={document.id}><header><span>DOC-{String(index + 1).padStart(3,'0')}</span><em>{document.access}</em></header><h2>{document.title}</h2><p>{canOpen ? document.excerpt : <RedactedText revealed={false}>Document verrouillé</RedactedText>}</p>{document.secretId && canOpen && <p className="fragment"><RedactedText revealed={progress.unlockedSecrets.includes(document.secretId)}>Fragment classifié non déchiffré.</RedactedText></p>}<button disabled={!canOpen} onClick={() => markViewed(document.id)}>{viewed ? 'CONSULTÉ' : canOpen ? 'OUVRIR LE DOCUMENT' : `ACCÈS ${document.access} REQUIS`}</button></article>; })}</div><section className="transmission-index"><h2>TRANSMISSIONS INTERCEPTÉES</h2><div>{transmissions.map((item) => <TransmissionCard key={item.id} transmission={item} />)}</div></section></div>;
}
