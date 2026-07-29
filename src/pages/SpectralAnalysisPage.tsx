import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';
import { Panel } from '../components/common/Panel';
import { authenticVoiceIds, voiceFragments } from '../data';
import { useProgress } from '../state/ProgressContext';

export default function SpectralAnalysisPage() {
  const {progress,dispatchEffects}=useProgress();
  const available=progress.unlockedSecrets.includes('spectral-analyzer-online');
  const solved=progress.solvedPuzzles.includes('voice-authentication');
  const [selected,setSelected]=useState<string[]>([]);
  const [error,setError]=useState(false);
  if (!available) return <div className="page document-denied"><p className="eyebrow">ANALYSE SPECTRALE</p><h1>FRAGMENTS INDISPONIBLES</h1><Link className="button-primary" to="/archives/protocole-fil-rouge">RETOUR AU PROGRAMME R</Link></div>;
  const toggle=(id:string)=>{setError(false);setSelected((current)=>current.includes(id)?current.filter((item)=>item!==id):current.length<3?[...current,id]:current);};
  const validate=()=>{
    if ([...selected].sort().join('|')!==[...authenticVoiceIds].sort().join('|')) {setError(true);return;}
    dispatchEffects([{type:'solve-puzzle',id:'voice-authentication'},{type:'complete-objective',id:'authenticate-child-voice'},{type:'flag',id:'child-voice-authenticated'},{type:'add-evidence-node',id:'voix-spectrale'},{type:'add-evidence-relation',id:'nxs-imite-enfant'},{type:'narrative-event',id:'child-voice-authenticated'}]);
  };
  return <div className="page spectral-analysis-page"><PageHeader eyebrow="CHAPITRE 03 // AUTHENTIFICATION VOCALE" title="QUI PARLE AVEC SA VOIX ?">Sélectionnez exactement trois fragments humains. Une identité réelle hésite, respire et peut douter de ses propres souvenirs.</PageHeader>
    <section className="spectral-analysis-status"><span>ANALYSE R-0 // NŒUD 29</span><strong>{solved?'SOURCE AUTHENTIFIÉE':`${selected.length} / 3 SÉLECTIONNÉS`}</strong><em>{solved?'HUMAINE // PARTIELLE':'NX-S // INTERFÉRENCE'}</em></section>
    {solved?<section className="voice-result"><p className="eyebrow">VOIX R-0 AUTHENTIFIÉE</p><h2>LES IMPERFECTIONS ONT SERVI DE SIGNATURE.</h2><p>NX-S reproduit le timbre et le vocabulaire de l’enfant, mais supprime ses hésitations. Deux demandes d’ouverture provenaient du Spectre.</p><blockquote>« N’ouvre pas la porte tant que Mère Écho ne se souvient pas de moi. »</blockquote><Link className="button-primary" to="/terminal">VÉRIFIER LA SIGNATURE NX-S →</Link></section>:<div className="voice-analysis-grid"><Panel title="FRAGMENTS INTERCEPTÉS" code="05 // MIXTES" tone="spectral"><div className="voice-fragments">{voiceFragments.map((fragment)=><button key={fragment.id} className={selected.includes(fragment.id)?'is-selected':''} aria-pressed={selected.includes(fragment.id)} onClick={()=>toggle(fragment.id)}><span>{fragment.channel}</span><p>« {fragment.text} »</p><small>{fragment.marker}</small></button>)}</div></Panel><Panel title="CRITÈRES HUMAINS" code="R-0" tone={error?'critical':'neutral'}><ul><li>Respiration ou bruit cardiaque individuel</li><li>Hésitation et incertitude autobiographique</li><li>Temps de pause irrégulier</li><li>Absence de voix multiple</li></ul>{error&&<p className="memory-error" role="alert">SIGNATURE INCOHÉRENTE — au moins une sélection possède une prosodie synthétique parfaite.</p>}<button className="button-primary" disabled={selected.length!==3} onClick={validate}>AUTHENTIFIER LES TROIS FRAGMENTS</button></Panel></div>}
  </div>;
}
