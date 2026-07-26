import { Link } from 'react-router-dom';
import { AssetPlaceholder } from '../components/common/AssetPlaceholder';
import { PageHeader } from '../components/common/PageHeader';
import { operators } from '../data';

export default function OperatorsPage() {
  return <div className="page"><PageHeader eyebrow="INDEX // PERSONNEL COMPROMIS" title="DOSSIERS OPÉRATEURS">Les agents de cinquième génération restent reliés au réseau même après révocation.</PageHeader><div className="card-grid">{operators.map((operator) => <article className="dossier-card" key={operator.id}><AssetPlaceholder label={operator.matricule} /><div><p className="eyebrow">{operator.matricule}</p><h2>{operator.name} <span>// {operator.callsign}</span></h2><p>{operator.description}</p><dl><div><dt>STATUT</dt><dd>{operator.realStatus}</dd></div><div><dt>COMPATIBILITÉ</dt><dd>{operator.compatibility} %</dd></div><div><dt>MENACE</dt><dd>{operator.threat}</dd></div></dl><Link className="button-link" to={`/operators/${operator.id}`}>OUVRIR LE DOSSIER →</Link></div></article>)}</div></div>;
}
