import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArchiveBlockRenderer } from '../components/archive/ArchiveBlockRenderer';
import { ClassifiedComparison } from '../components/archive/ClassifiedComparison';
import { archiveDocuments } from '../data';
import { isDocumentAvailable, requirementMet } from '../state/narrative';
import { useProgress } from '../state/ProgressContext';

export default function ArchiveDocumentPage() {
  const { documentId } = useParams();
  const document = archiveDocuments.find((item) => item.id === documentId);
  const { progress, markViewed, setReadingProgress, dispatchEffects } = useProgress();
  const initialPage = document ? Math.min(progress.documentReadingProgress[document.id] ?? 0, document.pages.length - 1) : 0;
  const [pageIndex, setPageIndex] = useState(initialPage);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const available = document ? isDocumentAvailable(document, progress) : false;

  useEffect(() => { titleRef.current?.focus(); }, [documentId]);
  useEffect(() => {
    if (!document || !available) return;
    markViewed(document.id);
    if (document.onOpenEffects) dispatchEffects(document.onOpenEffects);
  }, [document, available, markViewed, dispatchEffects]);
  useEffect(() => { if (document && available) setReadingProgress(document.id, pageIndex); }, [document, available, pageIndex, setReadingProgress]);

  const availableDocuments = useMemo(() => archiveDocuments.filter((item) => isDocumentAvailable(item, progress)), [progress]);
  if (!document) return <div className="page document-denied"><p className="eyebrow">INDEX CORROMPU</p><h1 ref={titleRef} tabIndex={-1}>DOCUMENT INTROUVABLE</h1><Link className="button-primary" to="/archives">RETOUR AUX ARCHIVES</Link></div>;
  if (!available) return <div className="page document-denied"><p className="eyebrow">ACCÈS REFUSÉ // {document.classification}</p><h1 ref={titleRef} tabIndex={-1}>DOCUMENT VERROUILLÉ</h1><p>Les conditions narratives ou le niveau d’accès requis ne sont pas satisfaits.</p><Link className="button-primary" to="/archives">RETOUR AUX ARCHIVES</Link></div>;
  const page = document.pages[pageIndex]!;
  const currentDocumentIndex = availableDocuments.findIndex((item) => item.id === document.id);
  const previousDocument = availableDocuments[currentDocumentIndex - 1];
  const nextDocument = availableDocuments[currentDocumentIndex + 1];
  const comparisonAvailable = document.comparison && (!document.comparison.requirement || requirementMet(document.comparison.requirement, progress));
  const goToPage = (next: number) => { setPageIndex(Math.max(0, Math.min(document.pages.length - 1, next))); window.scrollTo({ top: 0, behavior: progress.reducedEffects ? 'auto' : 'smooth' }); };

  return <article className="page archive-document">
    <nav className="document-breadcrumb" aria-label="Fil d’Ariane"><Link to="/archives">ARCHIVES</Link><span>/</span><span>{document.code}</span></nav>
    <header className="document-header"><div><p className="eyebrow">{document.code} // {document.classification}</p><h1 ref={titleRef} tabIndex={-1}>{document.title}</h1><p>{document.summary}</p></div><dl><div><dt>DATE</dt><dd>{document.date}</dd></div><div><dt>ÉMETTEUR</dt><dd>{document.issuer}</dd></div><div><dt>AUTEUR</dt><dd>{document.author ?? 'NON ATTRIBUÉ'}</dd></div><div><dt>STATUT</dt><dd>{document.status}</dd></div></dl></header>
    <div className="document-layout">
      <aside className="document-toc"><h2>SOMMAIRE</h2><ol>{document.pages.map((item,index) => <li key={item.id}><button className={index === pageIndex ? 'active' : ''} aria-current={index === pageIndex ? 'page' : undefined} onClick={() => goToPage(index)}><span>0{index + 1}</span>{item.title}</button></li>)}</ol>{comparisonAvailable && <a href="#comparison">ANALYSE CONTRADICTOIRE</a>}<p>LECTURE {Math.round(((pageIndex + 1) / document.pages.length) * 100)} %</p></aside>
      <section className="document-reader" aria-labelledby="document-page-title"><header><span>PAGE {String(pageIndex + 1).padStart(2,'0')} / {String(document.pages.length).padStart(2,'0')}</span><span>{document.code}</span></header><h2 id="document-page-title">{page.title}</h2>{page.blocks.map((block,index) => <ArchiveBlockRenderer key={`${page.id}-${index}`} block={block} unlockedSecrets={progress.unlockedSecrets} />)}<footer><button className="button-ghost" disabled={pageIndex === 0} onClick={() => goToPage(pageIndex - 1)}>← PAGE PRÉCÉDENTE</button><button className="button-ghost" disabled={pageIndex === document.pages.length - 1} onClick={() => goToPage(pageIndex + 1)}>PAGE SUIVANTE →</button></footer></section>
      <aside className="document-sidecar"><h2>PIÈCES JOINTES</h2>{document.attachments?.map((attachment) => <div key={attachment.id}><strong>{attachment.label}</strong><span>{attachment.type}</span><small>{attachment.status}</small></div>) ?? <p>AUCUNE PIÈCE JOINTE</p>}<h2>RÉFÉRENCES</h2>{document.references?.map((reference) => <Link key={`${reference.type}-${reference.id}`} to={reference.route}>{reference.label} →</Link>)}</aside>
    </div>
    {comparisonAvailable && document.comparison && <div id="comparison"><ClassifiedComparison comparison={document.comparison} recorded={progress.completedObjectives.includes('compare-zero-versions')} onRecord={() => dispatchEffects(document.comparison!.onRecordEffects)} /></div>}
    <nav className="document-sequence" aria-label="Documents disponibles">{previousDocument ? <Link to={`/archives/${previousDocument.id}`}>← {previousDocument.title}</Link> : <span />}{nextDocument && <Link to={`/archives/${nextDocument.id}`}>{nextDocument.title} →</Link>}</nav>
  </article>;
}
