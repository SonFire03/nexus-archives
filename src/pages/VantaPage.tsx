import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { VantaMap } from '../components/map/VantaMap';
import { PageHeader } from '../components/common/PageHeader';
import { Panel } from '../components/common/Panel';
import { locations, factions } from '../data';
import { useProgress } from '../state/ProgressContext';
import type { Location } from '../types';

export default function VantaPage() {
  const [params, setParams] = useSearchParams();
  const initial = locations.find((item) => item.id === params.get('zone')) ?? locations[0]!;
  const [selected, setSelected] = useState<Location>(initial);
  const { progress, update } = useProgress();
  const choose = (location: Location) => { setSelected(location); setParams({ zone: location.id }); };
  useEffect(() => {
    if (selected.id === 'zero' && !progress.completedObjectives.includes('analyze-zero')) update({ completedObjectives: [...progress.completedObjectives, 'analyze-zero'] });
  }, [selected.id, progress.completedObjectives, update]);
  const faction = factions.find((item) => item.id === selected.dominantFaction);
  return <div className="page"><PageHeader eyebrow="CARTOGRAPHIE TACTIQUE // 51 A.Z." title="VANTA // VILLE VERTICALE">Mégalopole construite autour du plus grand centre de données neuronal du continent.</PageHeader><div className="map-layout"><section className="map-stage" aria-label="Carte de VANTA"><VantaMap locations={locations} selectedId={selected.id} onSelect={choose} /><div className="map-legend"><span className="red">DIRECTOIRE / DANGER</span><span className="blue">NX-S / SPECTRAL</span><span className="orange">CONFINEMENT</span></div></section><Panel title={selected.name.toUpperCase()} code={`NIVEAU 0${selected.level}`} className={`zone-detail is-${selected.color}`}><p className="zone-status">{selected.status.toUpperCase()} // MENACE {selected.danger}</p><p>{selected.description}</p><h3>ENVIRONNEMENT</h3><p>{selected.atmosphere}</p><h3>POINTS D’INTÉRÊT</h3><ul>{selected.points.map((point) => <li key={point}>{point}</li>)}</ul><h3>INCIDENTS</h3><ul>{selected.incidents.map((incident) => <li key={incident}>{incident}</li>)}</ul><dl className="data-list"><div><dt>FACTION DOMINANTE</dt><dd>{faction?.name}</dd></div><div><dt>COORDONNÉES</dt><dd>VN-{selected.level} // {86 - selected.level * 9}.02</dd></div></dl>{selected.id === 'zero' ? <div className="zone-evidence"><h3>PREUVES NUIT ZÉRO</h3><Link to="/archives/rapport-nuit-zero">RAPPORT OFFICIEL →</Link>{progress.unlockedSecrets.includes('document-restauration-2224') && <Link to="/archives/restauration-2224">RESTAURATION 22:24 →</Link>}{progress.completedObjectives.includes('compare-zero-versions') && <Link to="/investigation">TABLEAU D’ENQUÊTE →</Link>}</div> : <button className="button-primary" onClick={() => choose(selected)}>OUVRIR LE DOSSIER COMPLET</button>}</Panel></div><section className="text-map"><h2>ALTERNATIVE TEXTUELLE DE LA CARTE</h2><ol>{locations.map((location) => <li key={location.id}><button onClick={() => choose(location)}><strong>Niveau {location.level} — {location.name}</strong><span>{location.description} Danger {location.danger}.</span></button></li>)}</ol></section></div>;
}
