import { Link, useParams } from 'react-router-dom';
import { AssetImage } from '../components/common/AssetImage';
import { Panel } from '../components/common/Panel';
import { RedactedText } from '../components/common/RedactedText';
import { factionImages, factions } from '../data';
import { useProgress } from '../state/ProgressContext';

export default function FactionDetailPage() {
  const { factionId } = useParams();
  const faction = factions.find((item) => item.id === factionId);
  const { progress } = useProgress();
  if (!faction) return <div className="page"><h1>FACTION INTROUVABLE</h1><Link to="/factions">RETOUR À L’INDEX</Link></div>;
  return <article className="page"><header className="detail-hero"><div><p className="eyebrow">FACTION // {faction.zone}</p><h1>{faction.name}</h1><blockquote>« {faction.motto} »</blockquote><p>{faction.description}</p></div><AssetImage src={factionImages[faction.id]} alt={`Emblème de la faction ${faction.name}`} label={faction.name} variant="faction" eager /></header><div className="detail-grid"><Panel title="OBJECTIF" code="MISSION"><p className="feature-callout">{faction.objective}</p>{faction.internalMotto && <p>Devise interne : « {faction.internalMotto} »</p>}</Panel><Panel title="DIRECTION" code="CMD">{faction.leaders.map((leader) => <div className="leader" key={leader.name}><strong>{leader.name}</strong><span>{leader.role}</span></div>)}</Panel><Panel title="RELATIONS" code="LINK">{faction.relationships.map((relation) => { const target = factions.find((item) => item.id === relation.targetId); return <Link className={`relation relation-${relation.type}`} key={relation.targetId} to={`/factions/${relation.targetId}`}><strong>{relation.type.toUpperCase()} // {target?.name}</strong><p>{relation.detail}</p></Link>; })}</Panel><Panel title="ARCHIVE INTERNE" code="CLASSIFIÉ"><RedactedText revealed={progress.accessLevel === 'NOIR ABSOLU' || progress.unlockedSecrets.includes('trace-voss')}>{faction.secret}</RedactedText></Panel></div></article>;
}
