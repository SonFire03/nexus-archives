import { Link } from 'react-router-dom';
import { operatorImages } from '../../data';
import type { Operator } from '../../types';
import { AssetImage } from '../common/AssetImage';
import { Icon } from '../common/Icon';

export function OperatorCard({ operator }: { operator: Operator }) {
  const isA7 = operator.id === 'a7';
  return <article className={`operator-card operator-card--${operator.id}`}><AssetImage src={operatorImages[operator.id]} alt={`Portrait de surveillance de ${operator.name}`} label={operator.matricule} variant="operator" className="operator-card__visual" /><div className="operator-card__identity"><span>{operator.matricule}</span><h3>{operator.name}<small>// {operator.callsign}</small></h3><p>{operator.className}</p><dl><div><dt>ARMURE</dt><dd>NX5 // {operator.armorId.toUpperCase()}</dd></div><div><dt>LOCALISATION</dt><dd>{isA7 ? 'TRACE INSTABLE // CIMETIÈRE' : 'RELAIS K-13 // PROFONDEURS'}</dd></div></dl></div><div className="operator-card__status"><span className="threat-label">MENACE {operator.threat}</span><strong>{operator.realStatus}</strong><span><i />SYNC {operator.compatibility}%</span><Link to={`/operators/${operator.id}`}>OUVRIR LE DOSSIER <Icon name="archives" size={16} /></Link></div></article>;
}
