import { Link, useParams } from 'react-router-dom';
import { AssetPlaceholder } from '../components/common/AssetPlaceholder';
import { Panel } from '../components/common/Panel';
import { StatBar } from '../components/common/StatBar';
import { armors, operators } from '../data';

export default function ArmorDetailPage() {
  const { armorId } = useParams();
  const armor = armors.find((item) => item.id === armorId);
  if (!armor) return <div className="page"><h1>CHÂSSIS INTROUVABLE</h1><Link to="/armors">RETOUR AU CATALOGUE</Link></div>;
  const operator = operators.find((item) => item.id === armor.operatorId);
  return <article className="page"><header className="detail-hero"><div><p className="eyebrow">{armor.designation} // GÉNÉRATION {armor.generation}</p><h1>{armor.name}</h1><p>{armor.appearance}</p><span className={`status-badge ${armor.forbidden ? 'danger' : ''}`}>{armor.status}</span></div><AssetPlaceholder label={`${armor.designation} ${armor.name}`} variant="armor" /></header><div className="detail-grid"><Panel title="PARAMÈTRES TACTIQUES" code="STAT">{Object.entries(armor.stats).map(([label,value]) => <StatBar key={label} label={label.replace('guerreÉlectronique','Guerre électronique').replace('neuroRisque','Neuro-risque')} value={value} color={label === 'neuroRisque' ? 'orange' : 'red'} />)}</Panel><Panel title="FONCTION" code={armor.className.toUpperCase()}><p>{armor.role}</p><h3>MODE SPÉCIAL</h3><p className="feature-callout">{armor.specialMode}</p><p>Le mode spécial augmente les performances au prix de l’autonomie ou de la stabilité neuronale.</p></Panel><Panel title="CAPACITÉS" code="SYS"><ul>{armor.abilities.map((item) => <li key={item}>{item}</li>)}</ul></Panel><Panel title="FAIBLESSES" code="RISK"><ul>{armor.weaknesses.map((item) => <li key={item}>{item}</li>)}</ul><p>Signature : {armor.colors}</p></Panel>{operator && <Panel title="OPÉRATEUR LIÉ" code={operator.matricule} className="span-2"><h3>{operator.name} // {operator.callsign}</h3><p>{operator.realStatus}</p><Link className="button-link" to={`/operators/${operator.id}`}>OUVRIR LE DOSSIER OPÉRATEUR →</Link></Panel>}</div></article>;
}
