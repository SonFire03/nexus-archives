import { Link } from 'react-router-dom';
import { MetricCard } from '../components/dashboard/MetricCard';
import { NetworkIntegrityGauge } from '../components/dashboard/NetworkIntegrityGauge';
import { ObjectiveList } from '../components/dashboard/ObjectiveList';
import { OperatorCard } from '../components/dashboard/OperatorCard';
import { PrimaryObjectivePanel } from '../components/dashboard/PrimaryObjectivePanel';
import { SpectralActivityChart } from '../components/dashboard/SpectralActivityChart';
import { Icon } from '../components/common/Icon';
import { Panel } from '../components/common/Panel';
import { StatusBadge } from '../components/common/StatusBadge';
import { TransmissionCard } from '../components/common/TransmissionCard';
import { archiveDocuments, chapterFiveObjectives, chapterFourObjectives, chapterSixObjectives, chapterThreeObjectives, chapterTwoObjectives, chapterZeroObjectives, locations, operators, transmissions } from '../data';
import { useProgress } from '../state/ProgressContext';

const incidents = [
  {time:'−02 MIN',category:'AUTONOME',title:'Armure autonome repérée',sector:'Profondeurs',level:'CRITIQUE'},
  {time:'−09 MIN',category:'TRANSMISSION',title:'Communication chiffrée de Crimson',sector:'Station K-13',level:'ÉLEVÉ'},
  {time:'−16 MIN',category:'CONFINEMENT',title:'Rupture de confinement',sector:'Zone Zéro',level:'OMEGA'},
  {time:'−23 MIN',category:'SPECTRAL',title:'Activité du Chœur Zéro',sector:'Cimetière',level:'ÉLEVÉ'},
  {time:'−30 MIN',category:'BIOMÉTRIE',title:'Signal A7 détecté',sector:'Indéterminé',level:'INSTABLE'},
];

const sectorState: Record<string,string> = { couronne:'SURVEILLÉ',voile:'SURVEILLÉ',profondeurs:'CRITIQUE',cimetiere:'INTERDIT',zero:'INTERDIT' };

export default function DashboardPage() {
  const { progress } = useProgress();
  const isChapterTwo = progress.activeChapter === 'chapter-two';
  const isChapterThree = progress.activeChapter === 'chapter-three';
  const isChapterFour = progress.activeChapter === 'chapter-four';
  const isChapterFive = progress.activeChapter === 'chapter-five';
  const isChapterSix = progress.activeChapter === 'chapter-six';
  const objectives = isChapterSix ? chapterSixObjectives : isChapterFive ? chapterFiveObjectives : isChapterFour ? chapterFourObjectives : isChapterThree ? chapterThreeObjectives : isChapterTwo ? chapterTwoObjectives : chapterZeroObjectives;
  const nextObjective = objectives.find((objective) => !progress.completedObjectives.includes(objective.id));
  const completed = progress.completedObjectives.filter((id) => objectives.some((objective) => objective.id === id));
  const chapterProgress = Math.round((completed.length / objectives.length) * 100);
  const lastDocument = [...progress.viewedDocuments].reverse().map((id) => archiveDocuments.find((document) => document.id === id)).find(Boolean);
  const contacted = progress.spectralContactCount > 0;

  return <div className="page dashboard-page">
    <header className="dashboard-hero"><div className="dashboard-hero__copy"><p className="eyebrow">CENTRE DE COMMANDE // CHAPITRE {isChapterSix?'06':isChapterFive?'05':isChapterFour?'04':isChapterThree?'03':isChapterTwo?'02':'01'}</p><h1>{isChapterSix?<>NOMS <span>SOUS CENDRE</span></>:isChapterFive?<>TRAQUE <span>ACTIVE</span></>:isChapterFour?<>VÉRITÉ <span>COMPROMISE</span></>:isChapterThree?<>PORTE <span>INSTABLE</span></>:isChapterTwo?<>IDENTITÉ <span>FRAGMENTÉE</span></>:<>SITUATION <span>CRITIQUE</span></>}</h1><p>{isChapterSix?'Un ordre de confinement traite encore les 63 218 victimes comme des cibles actives.':isChapterFive?'HARBINGER triangule les décisions et le rythme de saisie du terminal OMEGA-7.':isChapterFour?'Une couverture de la Nuit Zéro a été signée avant que l’incident ne commence.':isChapterThree?'Une voix infantile antérieure à A7 répond depuis le Cimetière numérique.':isChapterTwo?'Une signature archivée d’A7 émet encore depuis une installation HELIX sous Station K-13.':'L’enquête sur la Nuit Zéro révèle des contradictions dans le récit du Directoire.'}</p><div className="dashboard-hero__sync"><StatusBadge tone="critical">ALERTE OMEGA-7</StatusBadge><StatusBadge tone="success">4 SECTEURS ACTIFS</StatusBadge><span>DERNIÈRE SYNCHRONISATION // 00:14</span></div></div><div className="threat-module" aria-label="Niveau de menace Omega 7, enquête en cours"><Icon name="alert" size={34} /><div><small>NIVEAU DE MENACE</small><strong>OMEGA-7</strong><span>{progress.completedChapters.includes('chapter-six')?'CENDRE // RÉVOQUÉ':isChapterSix?'CENDRE-63218 // ACTIF':progress.completedChapters.includes('chapter-five')?'SESSION // EXTRAITE':isChapterFive?'HUNT-314 // CONVERGENCE':progress.completedChapters.includes('chapter-four')?'MIRROR-00 // DESTIN ARCHIVÉ':isChapterFour?'RÉSEAU MIROIR // ACTIF':progress.completedChapters.includes('chapter-three')?'PORTE // DÉCISION ARCHIVÉE':isChapterThree?'NŒUD 29 // ACTIF':progress.completedChapters.includes('chapter-two')?'CORPS 04 // DÉCISION ARCHIVÉE':progress.completedChapters.includes('chapter-zero')?'SIGNATURES MULTIPLES':'ENQUÊTE EN COURS'}</span></div><i aria-hidden="true" /></div></header>

    <PrimaryObjectivePanel objective={nextObjective} completed={completed.length} total={objectives.length} percentage={chapterProgress} chapter={isChapterSix?'06':isChapterFive?'05':isChapterFour?'04':isChapterThree?'03':isChapterTwo?'02':'01'} completedDescription={isChapterSix?'Le sort des 63 218 identités est archivé.':isChapterFive?'La session OMEGA-7 a quitté son point d’origine.':isChapterFour?'Le destin de MIRROR-00 est archivé.':isChapterThree?'Le statut de la Porte de Continuité est archivé.':isChapterTwo?'La décision concernant le Corps A7-04 est archivée.':undefined} completedRoute={isChapterSix?'/chapter-six':isChapterFive?'/chapter-five':isChapterFour?'/chapter-four':isChapterThree?'/chapter-three':isChapterTwo?'/chapter-two':undefined} />

    <section className="dashboard-metrics" aria-label="Indicateurs opérationnels">
      <MetricCard icon="alert" label="ALERTE VANTA" value="CRITIQUE" detail="Zone Zéro sous confinement renforcé" code="VNT-05"><span className="metric-trend is-critical">↑ +2 incidents</span></MetricCard>
      <MetricCard icon="network" label="INTÉGRITÉ RÉSEAU" value="72%" detail="4 nœuds stables sur 5" code="NET-72" tone="success"><span className="metric-trend">−3% depuis 00:14</span></MetricCard>
      <MetricCard icon="spectral" label="ACTIVITÉ SPECTRALE" value={contacted ? 'CONTACT' : 'ÉLEVÉE'} detail="Origine : Cimetière numérique" code="NX-S" tone="spectral"><span className="metric-trend is-spectral">3 impulsions critiques</span></MetricCard>
      <MetricCard icon="investigation" label="ÉTAT DE L’ENQUÊTE" value={`${progress.evidenceNodes.length} PREUVES`} detail={`${progress.evidenceRelations.length} relations confirmées`} code="INV-01" tone="cyan"><Link to="/investigation">OUVRIR LE TABLEAU →</Link></MetricCard>
    </section>

    <div className="dashboard-command-grid">
      <Panel title="STATUT DE VANTA" eyebrow="MÉGALOPOLE // CINQ NIVEAUX" code="SYS.VANTA" tone="critical" className="dashboard-vanta"><div className="vanta-overview"><div><div className="vanta-overview__alert"><span>NIVEAU D’ALERTE</span><strong>CRITIQUE</strong><small>PROTOCOLE DE CONTINUITÉ ACTIF</small></div><dl><div><dt>SECTEURS OPÉRATIONNELS</dt><dd>4 / 5</dd></div><div><dt>POPULATION SUIVIE</dt><dd>███ 218</dd></div><div><dt>INCIDENTS ACTIFS</dt><dd>05</dd></div><div><dt>COUVRE-FEU</dt><dd>22:00</dd></div></dl></div><NetworkIntegrityGauge value={72} /></div><div className="vanta-levels" aria-label="État des cinq niveaux de VANTA">{locations.map((location) => <Link key={location.id} to={`/vanta?zone=${location.id}`}><span>0{location.level}</span><i className={`is-${location.color}`} /><strong>{location.name}</strong><small>{sectorState[location.id]}</small></Link>)}</div></Panel>

      <Panel title="OBJECTIFS DU CHAPITRE" eyebrow={isChapterSix?'OPÉRATION NOMS DE CENDRE':isChapterFive?'OPÉRATION TRAQUE OMEGA':isChapterFour?'ENQUÊTE VÉRITÉ ORIGINALE':isChapterThree?'ENQUÊTE ENFANT DU CIMETIÈRE':isChapterTwo?'ENQUÊTE LES SEPT CORPS':'ENQUÊTE NUIT ZÉRO'} code={`${completed.length} / ${objectives.length} TERMINÉS`} tone="warning" className="dashboard-objectives"><ObjectiveList objectives={objectives} completedIds={progress.completedObjectives} activeId={nextObjective?.id} /></Panel>

      <Panel title="OPÉRATEURS RECHERCHÉS" eyebrow="DIRECTIVE DE CAPTURE" code="DIR.44" tone="nexus" className="dashboard-operators"><div className="operator-list">{operators.map((operator) => <OperatorCard key={operator.id} operator={operator} />)}</div></Panel>

      <Panel title="SECTEURS" eyebrow="SURVEILLANCE VANTA" code="MAP.05" className="dashboard-sectors"><ul className="sector-monitor">{locations.map((location) => <li key={location.id}><Link to={`/vanta?zone=${location.id}`}><span>{String(location.level).padStart(2,'0')}</span><div><strong>{location.name}</strong><small>FACTION // {location.dominantFaction.replaceAll('-',' ').toUpperCase()}</small></div><em>{sectorState[location.id]}<small>MENACE {location.danger}</small></em></Link></li>)}</ul></Panel>

      <Panel title="INCIDENTS RÉCENTS" eyebrow="FLUX TEMPS RÉEL" code="LIVE.05" tone="warning" className="dashboard-incidents"><ol className="incident-feed">{incidents.map((incident) => <li key={incident.title}><time>{incident.time}</time><span className="incident-feed__marker" aria-hidden="true" /><div><small>{incident.category} // {incident.sector.toUpperCase()}</small><strong>{incident.title}</strong></div><em>{incident.level}</em></li>)}</ol></Panel>

      <Panel title="TRANSMISSIONS INTERCEPTÉES" eyebrow="CANAL OMEGA-07" code="02 NON LUES" tone="nexus" className="dashboard-transmissions"><div className="transmission-stack"><TransmissionCard transmission={contacted ? transmissions.find((item) => item.id === 'nx-s-contact-01')! : transmissions[2]!} /><TransmissionCard transmission={transmissions[3]!} /></div></Panel>

      <Panel title="ACTIVITÉ SPECTRALE" eyebrow="ANALYSE NX-S" code="SPECTRE.03" tone="spectral" className="dashboard-spectral"><SpectralActivityChart contacted={contacted} /><dl className="spectral-summary"><div><dt>DERNIÈRE ORIGINE</dt><dd>CIMETIÈRE NUMÉRIQUE</dd></div><div><dt>ÉTAT DU SIGNAL</dt><dd>{contacted ? 'SOURCE LOCALE' : 'NON LOCALISABLE'}</dd></div><div><dt>DERNIÈRE PREUVE</dt><dd>{progress.evidenceNodes.at(-1)?.toUpperCase() ?? 'AUCUNE'}</dd></div><div><dt>DERNIER DOCUMENT</dt><dd>{lastDocument?.title ?? 'AUCUN'}</dd></div></dl><Link className="button-secondary" to="/terminal">ANALYSER DANS LE TERMINAL →</Link></Panel>
    </div>
  </div>;
}
