import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AssetImage } from '../components/common/AssetImage';
import { PageHeader } from '../components/common/PageHeader';
import { StatBar } from '../components/common/StatBar';
import { armorImages, armors } from '../data';

export default function ArmorsPage() {
  const [generation,setGeneration] = useState('toutes');
  const [functionName,setFunctionName] = useState('toutes');
  const [status,setStatus] = useState('tous');
  const filtered = useMemo(() => armors.filter((armor) => (generation === 'toutes' || armor.generation === Number(generation)) && (functionName === 'toutes' || armor.className === functionName) && (status === 'tous' || (status === 'interdit' ? armor.forbidden : !armor.forbidden))),[generation,functionName,status]);
  const classes = [...new Set(armors.map((armor) => armor.className))];

  return <div className="page"><PageHeader eyebrow="CATALOGUE // EXO-NEXUS" title="CHÂSSIS ET ARMURES">Chaque armure conserve des traces de son porteur. Toute puissance impose un coût.</PageHeader>
    <section className="filters" aria-label="Filtres du catalogue"><label>GÉNÉRATION<select value={generation} onChange={(event) => setGeneration(event.target.value)}><option value="toutes">Toutes</option>{[1,2,3,4,5,6].map((value) => <option key={value} value={value}>Génération {value}</option>)}</select></label><label>FONCTION<select value={functionName} onChange={(event) => setFunctionName(event.target.value)}><option value="toutes">Toutes</option>{classes.map((value) => <option key={value}>{value}</option>)}</select></label><label>STATUT<select value={status} onChange={(event) => setStatus(event.target.value)}><option value="tous">Tous</option><option value="autorisé">Autorisé</option><option value="interdit">Interdit</option></select></label><output>{filtered.length} MODÈLES</output></section>
    <div className="armor-grid">{filtered.map((armor) => <article className={`armor-card ${armor.forbidden ? 'is-forbidden' : ''}`} key={armor.id}><header><span>{armor.designation}</span><em>GEN.{armor.generation}</em></header><AssetImage src={armorImages[armor.id]} alt={`Vue technique de l’exo-armure ${armor.name}`} label={`${armor.designation} ${armor.name}`} variant="armor" className="armor-card__image" /><h2>{armor.name}</h2><p>{armor.role}</p><div className="compact-stats"><StatBar label="Mobilité" value={armor.stats.mobilité} /><StatBar label="Blindage" value={armor.stats.blindage} /><StatBar label="Neuro-risque" value={armor.stats.neuroRisque} color="orange" /></div><dl><div><dt>MODE</dt><dd>{armor.specialMode}</dd></div><div><dt>STATUT</dt><dd>{armor.status}</dd></div></dl><Link className="button-link" to={`/armors/${armor.id}`}>INSPECTER →</Link></article>)}</div>
    {filtered.length === 0 && <p className="empty-state">AUCUN CHÂSSIS NE CORRESPOND AUX CRITÈRES.</p>}
  </div>;
}
