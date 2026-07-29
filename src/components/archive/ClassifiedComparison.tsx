import { useEffect, useRef, useState } from 'react';
import type { ArchiveComparison } from '../../types';

export function ClassifiedComparison({ comparison, recorded, onRecord }: { comparison: ArchiveComparison; recorded: boolean; onRecord: () => void }) {
  const [index, setIndex] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const current = comparison.differences[index]!;
  useEffect(() => { headingRef.current?.focus(); }, [index]);
  const move = (direction: number) => setIndex((value) => (value + direction + comparison.differences.length) % comparison.differences.length);
  return <section className="classified-comparison" aria-labelledby="comparison-title">
    <header><div><p className="eyebrow">ANALYSE CONTRADICTOIRE // {comparison.differences.length} ÉCARTS</p><h2 id="comparison-title">{comparison.officialTitle} / {comparison.classifiedTitle}</h2></div><span>DIFFÉRENCE {index + 1}/{comparison.differences.length}</span></header>
    <p className="comparison-summary">{comparison.summary}</p>
    <h3 ref={headingRef} tabIndex={-1} className="comparison-focus">{current.label}</h3>
    <div className="comparison-columns">
      <article><span aria-hidden="true">○</span><p>{comparison.officialTitle}</p><strong>{current.official}</strong><small>RÉFÉRENCE A</small></article>
      <article className="classified"><span aria-hidden="true">◆</span><p>{comparison.classifiedTitle}</p><strong>{current.classified}</strong><small>RÉFÉRENCE B</small></article>
    </div>
    <p className="visually-hidden" role="status">Différence {index + 1} : {current.label}. Version officielle : {current.official} Version classifiée : {current.classified}</p>
    <div className="comparison-actions"><button className="button-ghost" onClick={() => move(-1)}>← DIFFÉRENCE PRÉCÉDENTE</button><button className="button-ghost" onClick={() => move(1)}>DIFFÉRENCE SUIVANTE →</button><button className="button-primary" disabled={recorded} onClick={onRecord}>{recorded ? 'PREUVE ENREGISTRÉE' : 'ENREGISTRER COMME PREUVE'}</button></div>
  </section>;
}
