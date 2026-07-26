import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AssetPlaceholder } from '../components/common/AssetPlaceholder';
import { Panel } from '../components/common/Panel';
import { RedactedText } from '../components/common/RedactedText';
import { StatBar } from '../components/common/StatBar';
import { armors, operators } from '../data';
import { useProgress } from '../state/ProgressContext';

export default function OperatorDetailPage() {
  const { operatorId } = useParams();
  const operator = operators.find((item) => item.id === operatorId);
  const { progress, update } = useProgress();
  useEffect(() => {
    if (operator && !progress.completedObjectives.includes(`view-${operator.id}`)) update({ completedObjectives: [...progress.completedObjectives, `view-${operator.id}`] });
  }, [operator, progress.completedObjectives, update]);
  if (!operator) return <div className="page"><h1>OPÉRATEUR INTROUVABLE</h1><Link to="/operators">RETOUR AUX DOSSIERS</Link></div>;
  const armor = armors.find((item) => item.id === operator.armorId);
  return <article className={`page operator-detail operator-${operator.id}`}>
    <header className="operator-header"><div><p className="eyebrow">DOSSIER {operator.matricule} // CLASSIFICATION {operator.threat}</p><h1>{operator.name}<span>{operator.callsign}</span></h1><p>{operator.description}</p></div><AssetPlaceholder label={operator.matricule} /></header>
    <div className="detail-grid">
      <Panel title="IDENTITÉ" code="BIO"><dl className="data-list"><div><dt>NOM CIVIL</dt><dd>{operator.civilName}</dd></div><div><dt>SEXE</dt><dd>{operator.gender}</dd></div><div><dt>ÂGE ESTIMÉ</dt><dd>{operator.age}</dd></div><div><dt>TAILLE</dt><dd>{operator.height}</dd></div><div><dt>STATUT OFFICIEL</dt><dd>{operator.officialStatus}</dd></div><div><dt>STATUT RÉEL</dt><dd>{operator.realStatus}</dd></div><div><dt>ORDRE</dt><dd>{operator.order}</dd></div></dl></Panel>
      <Panel title="ÉTAT NEURAL" code="LIVE"><StatBar label="Compatibilité NEXUS" value={operator.compatibility} max={100} color={operator.id === 'crimson' ? 'red' : 'blue'} /><StatBar label="Stabilité identitaire" value={operator.id === 'a7' ? 31 : 58} max={100} /><StatBar label={operator.id === 'crimson' ? 'Niveau REDLINE' : 'Corruption NX-S'} value={operator.id === 'a7' ? 67 : 42} max={100} color={operator.id === 'a7' ? 'blue' : 'red'} /><p className="warning">Toute connexion prolongée fragmente davantage l’identité.</p></Panel>
      <Panel title="PROFIL ET RÔLES" code="PSY"><h3>PROFIL</h3><ul>{operator.profile.map((item) => <li key={item}>{item}</li>)}</ul><h3>CAPACITÉS OPÉRATIONNELLES</h3><ul className="tag-list">{operator.roles.map((item) => <li key={item}>{item}</li>)}</ul><h3>ORIGINES POSSIBLES</h3><ul>{operator.origins.map((item) => <li key={item}>{item}</li>)}</ul></Panel>
      <Panel title="ARMURE ET ARMEMENT" code={armor?.designation}><h3>{armor?.designation} {armor?.name}</h3><p>Mode spécial : <strong>{armor?.specialMode}</strong></p><ul>{operator.weapons.map((item) => <li key={item}>{item}</li>)}</ul><h3>FAIBLESSES</h3><ul>{operator.weaknesses.map((item) => <li key={item}>{item}</li>)}</ul><Link className="button-link" to={`/armors/${operator.armorId}`}>DOSSIER DE L’ARMURE →</Link></Panel>
      <Panel title="NUIT ZÉRO" code="0.Z" className="span-2"><div className="event-strip">{operator.nightZero.map((item,index) => <div key={item}><span>0{index + 1}</span><p>{item}</p></div>)}</div><Link className="button-link" to="/timeline">OUVRIR LA CHRONOLOGIE →</Link></Panel>
      <Panel title="RELATIONS" code="LINK">{operator.relationships.map((relation) => <div className="relation" key={relation.target}><strong>{relation.target}</strong><p>{relation.detail}</p></div>)}</Panel>
      <Panel title="SECRETS" code={`${operator.secrets.filter((secret) => progress.unlockedSecrets.includes(secret.id)).length}/${operator.secrets.length}`}>{operator.secrets.map((secret) => <p key={secret.id}><RedactedText revealed={progress.unlockedSecrets.includes(secret.id)}>{secret.label}</RedactedText></p>)}</Panel>
      <Panel title="CITATIONS INTERCEPTÉES" code="VOX" className="span-2"><div className="quotes">{operator.quotes.map((quote) => <blockquote key={quote}>« {quote} »</blockquote>)}</div></Panel>
    </div>
  </article>;
}
