import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';
import { timeline } from '../data';
import { useProgress } from '../state/ProgressContext';

const zeroMinutes = [
  ['21 h 17','ACTIVATION DU PROJET CONTINUITÉ','Test de routine selon le communiqué.','Synchronisation de masse autorisée par Voss.'],
  ['21 h 23','FERMETURE DES SORTIES','Mesure sanitaire préventive.','Les habitants deviennent des sujets captifs.'],
  ['21 h 41','SYNCHRONISATION COLLECTIVE','Défaillance réseau imprévisible.','Chaque implant du quartier est connecté au même noyau.'],
  ['21 h 52','NAISSANCE DE NX-S','Logiciel hostile externe.','Les empreintes fusionnent pour survivre.'],
  ['22 h 06','RÉVOLTE DES ARMURES','Sabotage terroriste.','Les châssis obéissent à leurs opérateurs morts.'],
  ['22 h 19',"ORDRE D’EXÉCUTER A7",'Aucun opérateur impliqué.',"Crimson reçoit l’ordre et détruit l’ancre.",'ordre-execution-a7'],
  ['22 h 24',"CONNEXION R-9",'Aucune activité enregistrée.',"Crimson connecte son Fil Mnésique au noyau A7.",'restauration-2224'],
  ['22 h 31',"RUPTURE DE L’ANCRE",'Réacteur neutralisé.',"A7 revient après l’intervention du Fil Mnésique.",'restauration-2224'],
  ['22 h 44','PROTOCOLE CENDRE','Évacuation contrôlée.','Le Directoire détruit les preuves et les survivants.'],
  ['23 h 02',"DISPARITION D’A7",'Sujet déclaré mort.','Signal déplacé hors de Zone Zéro.'],
];

export default function TimelinePage() {
  const [classified, setClassified] = useState(false);
  const { progress } = useProgress();
  return <div className="page"><PageHeader eyebrow="CALENDRIER CLASSIFIÉ // A.Z. — P.Z." title="CHRONOLOGIE DE CONTINUITÉ">L’année 0 sépare l’histoire officielle de ce que les archives tentent encore de cacher.</PageHeader><div className="timeline">{timeline.map((event) => <article key={event.id} className={event.id === 'nuit-zero' ? 'zero-event' : ''}><time>{event.date}</time><div><span>{event.sort < 0 ? 'AVANT ZÉRO' : event.sort === 0 ? 'INCIDENT CENTRAL' : 'POST-ZÉRO'}</span><h2>{event.title}</h2><p>{event.description}</p>{event.classified && <p className="classified-summary">{event.classified}</p>}</div></article>)}</div><section className="zero-console"><header><div><p className="eyebrow">ANNÉE 0 // RAPPORT 63 218</p><h2>NUIT ZÉRO — MINUTE PAR MINUTE</h2></div><button className="toggle" aria-pressed={classified} onClick={() => setClassified((value) => !value)}>{classified ? 'VERSION CLASSIFIÉE' : 'VERSION OFFICIELLE'}</button></header><div className="zero-log">{zeroMinutes.map(([time,title,official,truth,documentId]) => { const unlocked=documentId === 'restauration-2224' ? progress.unlockedSecrets.includes('document-restauration-2224') : documentId === 'ordre-execution-a7' ? progress.accessLevel !== 'CIVIL' : false; return <article key={time}><time>{time}</time><div><h3>{title}</h3><p>{classified ? truth : official}</p>{documentId && unlocked && <Link to={`/archives/${documentId}`}>OUVRIR LE DOCUMENT ASSOCIÉ →</Link>}</div></article>; })}</div><p className="zero-total">BILAN CONFIDENTIEL <strong>63 218</strong> MORTS OU DISPARUS</p></section></div>;
}
