import { Link } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';
import { factions } from '../data';

export default function FactionsPage() {
  return <div className="page"><PageHeader eyebrow="ANALYSE GÉOPOLITIQUE // VANTA" title="FACTIONS ACTIVES">Aucune faction ne possède toute la vérité. A7 et Crimson restent au centre des lignes de fracture.</PageHeader>
    <section className="relationship-graph" aria-labelledby="graph-title"><h2 id="graph-title">GRAPHE DES RELATIONS</h2><div className="graph-visual" aria-hidden="true"><span className="graph-core">A7<br />CRIMSON</span>{factions.map((faction,index) => <span key={faction.id} style={{ '--index': index } as React.CSSProperties}>{faction.name}</span>)}</div><div className="graph-text"><h3>REPRÉSENTATION TEXTUELLE</h3><ul><li>Le Directoire est allié à l’Ordre du Miroir et mandate les Sentinelles.</li><li>Les Fantômes Libres s’opposent au Directoire et coopèrent parfois avec HELIX.</li><li>Le Chœur Zéro s’oppose aux Sentinelles.</li><li>HELIX refuse l’immortalité numérique.</li><li>NX-S constitue une menace systémique pour tous.</li></ul></div></section>
    <div className="faction-grid">{factions.map((faction) => <article className={`faction-card is-${faction.color}`} key={faction.id}><span className="faction-sigil" aria-hidden="true">{faction.name.slice(0,2).toUpperCase()}</span><div><p className="eyebrow">{faction.zone}</p><h2>{faction.name}</h2><blockquote>« {faction.motto} »</blockquote><p>{faction.description}</p><strong>OBJECTIF</strong><p>{faction.objective}</p><Link className="button-link" to={`/factions/${faction.id}`}>DOSSIER DE FACTION →</Link></div></article>)}</div>
  </div>;
}
