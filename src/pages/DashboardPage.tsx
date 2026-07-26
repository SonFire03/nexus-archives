import { Link } from 'react-router-dom';
import { Panel } from '../components/common/Panel';
import { StatBar } from '../components/common/StatBar';
import { TransmissionCard } from '../components/common/TransmissionCard';
import { chapterZeroObjectives, locations, operators, transmissions, archiveDocuments } from '../data';
import { useProgress } from '../state/ProgressContext';

const incidents = ['Armure autonome repérée // PROFONDEURS','Communication chiffrée de Crimson','Rupture de confinement // ZONE ZÉRO','Activité du Chœur Zéro','Signal A7 détecté // INSTABLE'];

export default function DashboardPage() {
  const { progress } = useProgress();
  const nextObjective = chapterZeroObjectives.find((objective) => !progress.completedObjectives.includes(objective.id));
  const chapterObjectives = progress.completedObjectives.filter((id) => chapterZeroObjectives.some((objective) => objective.id === id));
  const chapterProgress = Math.round((chapterObjectives.length / chapterZeroObjectives.length) * 100);
  const lastDocument = [...progress.viewedDocuments].reverse().map((id) => archiveDocuments.find((document) => document.id === id)).find(Boolean);
  return <div className="page dashboard-page">
    <header className="dashboard-hero"><div><p className="eyebrow">CENTRE DE COMMANDE // CHAPITRE 01</p><h1>SITUATION <span>CRITIQUE</span></h1><p>L’enquête sur la Nuit Zéro révèle des contradictions dans le récit du Directoire.</p></div><div className="alert-glyph" aria-label="Niveau d’alerte critique"><span>!</span><strong>OMEGA-7</strong><small>{progress.completedChapters.includes('chapter-zero') ? 'CONTACT NX-S CONFIRMÉ' : 'ENQUÊTE EN COURS'}</small></div></header>
    <section className="priority-objective"><div><p className="eyebrow">OBJECTIF PRIORITAIRE // {chapterObjectives.length}/8</p><h2>{nextObjective?.title.toUpperCase() ?? 'CHAPITRE 01 TERMINÉ'}</h2><p>{nextObjective?.description ?? 'Le dossier des Sept Corps est maintenant disponible.'}</p></div><div><span>PROGRESSION {chapterProgress} %</span><div><i style={{width:`${chapterProgress}%`}} /></div>{nextObjective ? <Link className="button-primary" to={nextObjective.route}>SUIVRE LA PISTE →</Link> : <Link className="button-primary" to="/archives/dossier-sept-corps">CHAPITRE SUIVANT →</Link>}</div></section>
    <div className="dashboard-grid">
      <Panel title="STATUT DE VANTA" code="SYS.01"><div className="metric-row"><strong>CRITIQUE</strong><span>NIVEAU D’ALERTE</span></div><StatBar label="Intégrité réseau" value={72} max={100} /><div className="split-metrics"><span><strong>4/5</strong>SECTEURS OPÉRATIONNELS</span><span><strong>███ 218</strong>POPULATION SUIVIE</span></div></Panel>
      <Panel title="ACTIVITÉ SPECTRALE" code="NX-S" className="spectral-panel"><div className="spectral-wave" aria-hidden="true">{Array.from({length:20},(_,i) => <i key={i} />)}</div><p><strong>{progress.spectralContactCount ? 'CONTACT CONFIRMÉ' : 'NIVEAU ÉLEVÉ'}</strong></p><p>{progress.spectralContactCount ? 'Source présente sur le terminal local.' : 'Plusieurs impulsions détectées.'}</p><small>DERNIÈRE ORIGINE : CIMETIÈRE NUMÉRIQUE</small></Panel>
      <Panel title="ÉTAT DE L’ENQUÊTE" code={`${progress.evidenceNodes.length} NŒUDS`}><dl className="data-list"><div><dt>DERNIÈRE PREUVE</dt><dd>{progress.evidenceNodes.at(-1)?.toUpperCase() ?? 'AUCUNE'}</dd></div><div><dt>DERNIER DOCUMENT</dt><dd>{lastDocument?.title ?? 'AUCUN'}</dd></div><div><dt>RELATIONS</dt><dd>{progress.evidenceRelations.length}</dd></div><div><dt>STATUT</dt><dd>{progress.completedChapters.includes('chapter-zero') ? 'CLOS // COMPROMIS' : 'ACTIF'}</dd></div></dl><Link className="button-link" to="/investigation">OUVRIR LE TABLEAU D’ENQUÊTE →</Link></Panel>
      <Panel title="OBJECTIFS DU CHAPITRE" code={`${chapterObjectives.length}/8`}><ul className="objective-list">{chapterZeroObjectives.map((objective) => <li key={objective.id} className={progress.completedObjectives.includes(objective.id) ? 'complete' : objective.id === nextObjective?.id ? 'active' : ''}><span aria-hidden="true">{progress.completedObjectives.includes(objective.id) ? '✓' : '○'}</span>{objective.title}</li>)}</ul></Panel>
      <Panel title="OPÉRATEURS RECHERCHÉS" code="DIR.44" className="span-2"><div className="operator-strip">{operators.map((operator) => <Link key={operator.id} to={`/operators/${operator.id}`}><span>{operator.matricule}</span><strong>{operator.name} // {operator.callsign}</strong><small>{operator.realStatus} · MENACE {operator.threat}</small><b>OUVRIR LE DOSSIER →</b></Link>)}</div></Panel>
      <Panel title="SECTEURS" code="MAP.05"><ul className="sector-list">{locations.map((location) => <li key={location.id}><Link to={`/vanta?zone=${location.id}`}><span>0{location.level}</span><strong>{location.name}</strong><em>{location.danger}</em></Link></li>)}</ul></Panel>
      <Panel title="INCIDENTS RÉCENTS" code="LIVE"><ol className="incident-list">{incidents.map((incident,index) => <li key={incident}><time>−{index * 7 + 2} MIN</time><span>{incident}</span></li>)}</ol></Panel>
      <Panel title="TRANSMISSIONS" code="CH.07" className="span-2"><TransmissionCard transmission={progress.spectralContactCount ? transmissions.find((item) => item.id === 'nx-s-contact-01')! : transmissions[2]!} /><TransmissionCard transmission={transmissions[3]!} /></Panel>
    </div>
  </div>;
}
