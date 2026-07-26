import { OperatorCard } from '../components/dashboard/OperatorCard';
import { PageHeader } from '../components/common/PageHeader';
import { StatusBadge } from '../components/common/StatusBadge';
import { operators } from '../data';

export default function OperatorsPage() {
  return <div className="page operators-index"><PageHeader eyebrow="INDEX // PERSONNEL COMPROMIS" title="DOSSIERS OPÉRATEURS" status="2 CIBLES OMEGA ACTIVES">Les agents de cinquième génération restent reliés au réseau même après révocation.</PageHeader><section className="operator-index-summary" aria-label="État des opérateurs"><StatusBadge tone="critical">CAPTURER VIVANTS</StatusBadge><StatusBadge tone="nexus">DIRECTIVE DIR.44</StatusBadge><span>LOCALISATIONS RECALCULÉES // 00:14</span></section><div className="operator-list operator-list--index">{operators.map((operator) => <OperatorCard key={operator.id} operator={operator} />)}</div></div>;
}
