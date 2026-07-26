import { Link } from 'react-router-dom';
import { Panel } from '../components/common/Panel';
import { StatBar } from '../components/common/StatBar';
import { TransmissionCard } from '../components/common/TransmissionCard';
import { locations, operators, transmissions } from '../data';
import { useProgress } from '../state/ProgressContext';

const incidents = ['Armure autonome repérée // PROFONDEURS','Communication chiffrée de Crimson','Rupture de confinement // ZONE ZÉRO','Activité du Chœur Zéro','Signal A7 détecté // INSTABLE'];
const objectives = [
  ['view-a7','Consulter le dossier A7'], ['view-crimson','Consulter le dossier Crimson'], ['analyze-zero','Analyser Zone Zéro'], ['terminal-command','Entrer une commande'], ['unlock-fragment','Débloquer un fragment'],
] as const;

export default function DashboardPage() {
  const { progress } = useProgress();
  return <div className="page dashboard-page">
    <header className="dashboard-hero"><div><p className="eyebrow">CENTRE DE COMMANDE // VANTA</p><h1>SITUATION <span>CRITIQUE</span></h1><p>Le réseau présente une activité spectrale incompatible avec les modèles du Directoire.</p></div><div className="alert-glyph" aria-label="Niveau d’alerte critique"><span>!</span><strong>OMEGA-7</strong><small>INTRUSION NON LOCALISÉE</small></div></header>
    <div className="dashboard-grid">
      <Panel title="STATUT DE VANTA" code="SYS.01"><div className="metric-row"><strong>CRITIQUE</strong><span>NIVEAU D’ALERTE</span></div><StatBar label="Intégrité réseau" value={72} max={100} /><div className="split-metrics"><span><strong>4/5</strong>SECTEURS OPÉRATIONNELS</span><span><strong>███ 218</strong>POPULATION SUIVIE</span></div></Panel>
      <Panel title="ACTIVITÉ SPECTRALE" code="NX-S" className="spectral-panel"><div className="spectral-wave" aria-hidden="true">{Array.from({length:20},(_,i) => <i key={i} />)}</div><p><strong>NIVEAU ÉLEVÉ</strong></p><p>Plusieurs impulsions détectées.</p><small>DERNIÈRE ORIGINE : CIMETIÈRE NUMÉRIQUE</small></Panel>
      <Panel title="OPÉRATEURS RECHERCHÉS" code="DIR.44" className="span-2"><div className="operator-strip">{operators.map((operator) => <Link key={operator.id} to={`/operators/${operator.id}`}><span>{operator.matricule}</span><strong>{operator.name} // {operator.callsign}</strong><small>{operator.realStatus} · MENACE {operator.threat}</small><b>OUVRIR LE DOSSIER →</b></Link>)}</div></Panel>
      <Panel title="SECTEURS" code="MAP.05"><ul className="sector-list">{locations.map((location) => <li key={location.id}><Link to={`/vanta?zone=${location.id}`}><span>0{location.level}</span><strong>{location.name}</strong><em>{location.danger}</em></Link></li>)}</ul></Panel>
      <Panel title="INCIDENTS RÉCENTS" code="LIVE"><ol className="incident-list">{incidents.map((incident,index) => <li key={incident}><time>−{index * 7 + 2} MIN</time><span>{incident}</span></li>)}</ol></Panel>
      <Panel title="OBJECTIFS NARRATIFS" code={`${progress.completedObjectives.length}/5`}><ul className="objective-list">{objectives.map(([id,label]) => <li key={id} className={progress.completedObjectives.includes(id) ? 'complete' : ''}><span aria-hidden="true">{progress.completedObjectives.includes(id) ? '✓' : '○'}</span>{label}</li>)}</ul></Panel>
      <Panel title="TRANSMISSIONS" code="CH.07"><TransmissionCard transmission={transmissions[2]!} /><TransmissionCard transmission={transmissions[3]!} /></Panel>
    </div>
  </div>;
}
