import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AssetImage } from '../components/common/AssetImage';
import { Panel } from '../components/common/Panel';
import { RedactedText } from '../components/common/RedactedText';
import { StatBar } from '../components/common/StatBar';
import { archiveDocuments, armors, operatorImages, operators } from '../data';
import { isDocumentAvailable } from '../state/narrative';
import { useProgress } from '../state/ProgressContext';

export default function OperatorDetailPage() {
  const { operatorId } = useParams();
  const operator = operators.find((item) => item.id === operatorId);
  const { progress, update, dispatchEffects } = useProgress();
  useEffect(() => {
    if (operator && !progress.completedObjectives.includes(`view-${operator.id}`)) update({ completedObjectives: [...progress.completedObjectives, `view-${operator.id}`] });
  }, [operator, progress.completedObjectives, update]);
  useEffect(() => {
    if (operator?.id === 'crimson' && progress.completedObjectives.includes('detect-seven-signatures') && !progress.unlockedSecrets.includes('message-future-crimson')) dispatchEffects([
      { type:'unlock-secret', id:'message-future-crimson' }, { type:'transmission', id:'crimson-future' }, { type:'narrative-event', id:'future-message-found' },
    ]);
  }, [operator, progress.completedObjectives, progress.unlockedSecrets, dispatchEffects]);
  if (!operator) return <div className="page"><h1>OPÉRATEUR INTROUVABLE</h1><Link to="/operators">RETOUR AUX DOSSIERS</Link></div>;
  const armor = armors.find((item) => item.id === operator.armorId);
  return <article className={`page operator-detail operator-${operator.id}`}>
    <header className="operator-header"><div><p className="eyebrow">DOSSIER {operator.matricule} // CLASSIFICATION {operator.threat}</p><h1>{operator.name}<span>{operator.callsign}</span></h1><p>{operator.description}</p></div><AssetImage src={operatorImages[operator.id]} alt={`Portrait classifié de ${operator.name}, ${operator.callsign}`} label={operator.matricule} variant="operator" eager /></header>
    <div className="detail-grid">
      <Panel title="IDENTITÉ" code="BIO"><dl className="data-list"><div><dt>NOM CIVIL</dt><dd>{operator.civilName}</dd></div><div><dt>SEXE</dt><dd>{operator.gender}</dd></div><div><dt>ÂGE ESTIMÉ</dt><dd>{operator.age}</dd></div><div><dt>TAILLE</dt><dd>{operator.height}</dd></div><div><dt>STATUT OFFICIEL</dt><dd>{operator.officialStatus}</dd></div><div><dt>STATUT RÉEL</dt><dd>{operator.realStatus}</dd></div><div><dt>ORDRE</dt><dd>{operator.order}</dd></div></dl></Panel>
      <Panel title="ÉTAT NEURAL" code="LIVE"><StatBar label="Compatibilité NEXUS" value={operator.compatibility} max={100} color={operator.id === 'crimson' ? 'red' : 'blue'} /><StatBar label="Stabilité identitaire" value={operator.id === 'a7' ? 31 : 58} max={100} /><StatBar label={operator.id === 'crimson' ? 'Niveau REDLINE' : 'Corruption NX-S'} value={operator.id === 'a7' ? 67 : 42} max={100} color={operator.id === 'a7' ? 'blue' : 'red'} /><p className="warning">Toute connexion prolongée fragmente davantage l’identité.</p></Panel>
      <Panel title="PROFIL ET RÔLES" code="PSY"><h3>PROFIL</h3><ul>{operator.profile.map((item) => <li key={item}>{item}</li>)}</ul><h3>CAPACITÉS OPÉRATIONNELLES</h3><ul className="tag-list">{operator.roles.map((item) => <li key={item}>{item}</li>)}</ul><h3>ORIGINES POSSIBLES</h3><ul>{operator.origins.map((item) => <li key={item}>{item}</li>)}</ul></Panel>
      <Panel title="ARMURE ET ARMEMENT" code={armor?.designation}><h3>{armor?.designation} {armor?.name}</h3><p>Mode spécial : <strong>{armor?.specialMode}</strong></p><ul>{operator.weapons.map((item) => <li key={item}>{item}</li>)}</ul><h3>FAIBLESSES</h3><ul>{operator.weaknesses.map((item) => <li key={item}>{item}</li>)}</ul><Link className="button-link" to={`/armors/${operator.armorId}`}>DOSSIER DE L’ARMURE →</Link></Panel>
      <Panel title="NUIT ZÉRO" code="0.Z" className="span-2"><div className="event-strip">{operator.nightZero.map((item,index) => <div key={item}><span>0{index + 1}</span><p>{item}</p></div>)}</div><Link className="button-link" to="/timeline">OUVRIR LA CHRONOLOGIE →</Link></Panel>
      <Panel title="RELATIONS" code="LINK">{operator.relationships.map((relation) => <div className="relation" key={relation.target}><strong>{relation.target}</strong><p>{relation.detail}</p></div>)}</Panel>
      <Panel title="SECRETS" code={`${operator.secrets.filter((secret) => progress.unlockedSecrets.includes(secret.id)).length}/${operator.secrets.length}`}>{operator.secrets.map((secret) => <p key={secret.id}><RedactedText revealed={progress.unlockedSecrets.includes(secret.id)}>{secret.label}</RedactedText></p>)}</Panel>
      {operator.id === 'a7' && <Panel title="SIGNATURES NEURONALES" code={progress.completedObjectives.includes('detect-seven-signatures') ? '7 DÉTECTÉES' : '1 PRÉSUMÉE'} className="span-2">{progress.completedObjectives.includes('detect-seven-signatures') ? <><p className="feature-callout">SEPT SIGNATURES NEURONALES DÉTECTÉES</p><p>Aucune ne possède l’intégralité des souvenirs. Une seule prétend être originale.</p><ul className="signature-list">{['A7-01 // DÉTRUITE','A7-02 // ABSENTE','A7-03 // ARCHIVÉE','A7-04 // ACTIVE','A7-05 // CORROMPUE','A7-06 // INCONNUE','A7-07 // OBSERVE'].map((item) => <li key={item}>{item}</li>)}</ul><Link className="button-link" to="/investigation">RELIER AUX PREUVES →</Link></> : <><p>Une signature unique est présumée. Le journal de restauration suggère une méthode d’analyse supplémentaire.</p><code>TERMINAL // echo a7</code></>}</Panel>}
      {operator.id === 'a7' && progress.completedObjectives.includes('open-seven-bodies') && <Panel title="CORPS A7-04" code={progress.completedObjectives.includes('locate-body-04') ? 'LOCALISÉ' : 'TRACE PARTIELLE'} className="span-2"><p className="feature-callout">UNE RECONSTRUCTION BIOLOGIQUE VIABLE EST ASSOCIÉE À A7-04.</p><p>Elle ne possède ni les souvenirs de la Nuit Zéro ni la contamination NX-S de l’A7 actif.</p>{progress.narrativeChoices['body-04'] ? <p>Décision archivée : <strong>{progress.narrativeChoices['body-04'].toUpperCase()}</strong></p> : <Link className="button-link" to="/archives/dossier-sept-corps">OUVRIR L’ENQUÊTE DES SEPT CORPS →</Link>}</Panel>}
      {operator.id === 'crimson' && <Panel title="FIL MNÉSIQUE // SAUVEGARDES" code={progress.unlockedSecrets.includes('message-future-crimson') ? 'MESSAGE REÇU' : 'ANALYSE'} className="span-2"><StatBar label="Intégrité du Fil" value={61} max={100} color="red" /><p>La sauvegarde A7-04 a été sélectionnée manuellement à 22:24. La sauvegarde la plus récente a été rejetée.</p><div className="button-row"><Link className="button-link" to="/archives/restauration-2224">JOURNAL RESTAURATION 22:24 →</Link>{progress.unlockedSecrets.includes('message-future-crimson') && <Link className="button-link" to="/archives/message-future-crimson">MESSAGE À LA PROCHAINE VERSION →</Link>}</div></Panel>}
      {operator.id === 'crimson' && progress.completedObjectives.includes('verify-crimson-memory') && <Panel title="DIRECTIVE 04:17" code="R-9 // CONFIRMÉE" className="span-2"><blockquote>« Préserver le Corps 04. Rejeter la sauvegarde la plus récente. Empêcher toute synchronisation. »</blockquote><p>La signature biométrique correspond au Fil Mnésique de Crimson, mais le message précède ses souvenirs les plus anciens.</p><Link className="button-link" to="/archives/memoire-source-a7-04">CONSULTER LA MÉMOIRE SOURCE →</Link></Panel>}
      <Panel title="DOCUMENTS ASSOCIÉS" code="ARCH" className="span-2"><div className="reference-links">{archiveDocuments.filter((document) => document.references?.some((reference) => reference.type === 'operator' && reference.id === operator.id) && isDocumentAvailable(document,progress)).map((document) => <Link key={document.id} to={`/archives/${document.id}`}>{document.code} // {document.title} →</Link>)}</div></Panel>
      <Panel title="CITATIONS INTERCEPTÉES" code="VOX" className="span-2"><div className="quotes">{operator.quotes.map((quote) => <blockquote key={quote}>« {quote} »</blockquote>)}</div></Panel>
    </div>
  </article>;
}
