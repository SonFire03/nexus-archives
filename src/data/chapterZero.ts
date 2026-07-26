import type { EvidenceNode, EvidenceRelation, NarrativeEvent, NarrativeObjective } from '../types';

export const chapterZeroObjectives: NarrativeObjective[] = [
  { id:'view-official-zero-report', title:'Consulter le rapport officiel', description:'Ouvrir le rapport public de la Nuit Zéro.', hint:'Le rapport est disponible avec un accès CIVIL.', route:'/archives/rapport-nuit-zero' },
  { id:'identify-z-2219', title:'Identifier le code dissimulé', description:'Trouver la référence interne dans la page manquante.', hint:'Inspectez toutes les pages du rapport.', route:'/archives/rapport-nuit-zero', requires:['view-official-zero-report'] },
  { id:'decrypt-z-2219', title:'Déchiffrer Z-2219', description:'Soumettre le code découvert au terminal.', hint:'Commande : decrypt z-2219', route:'/terminal', requires:['identify-z-2219'] },
  { id:'read-restoration-log', title:'Examiner la restauration 22:24', description:'Lire le journal médical déverrouillé.', hint:'Le nouveau document est visible dans les Archives.', route:'/archives/restauration-2224', requires:['decrypt-z-2219'] },
  { id:'compare-zero-versions', title:'Comparer les deux versions', description:'Enregistrer les contradictions officiel/classifié.', hint:'Retournez dans le rapport Nuit Zéro.', route:'/archives/rapport-nuit-zero', requires:['read-restoration-log'] },
  { id:'detect-seven-signatures', title:'Analyser les signatures d’A7', description:'Interroger l’écho neural depuis le terminal.', hint:'Commande : echo a7', route:'/terminal', requires:['compare-zero-versions'] },
  { id:'link-main-evidence', title:'Relier les preuves principales', description:'Établir la synthèse sur le tableau d’enquête.', hint:'Consultez Crimson puis ouvrez Enquête.', route:'/investigation', requires:['detect-seven-signatures'] },
  { id:'identify-nx-s-intervention', title:"Identifier l’intervention de NX-S", description:'Recevoir et archiver le contact spectral.', route:'/investigation', requires:['link-main-evidence'] },
];

export const evidenceNodes: EvidenceNode[] = [
  {id:'nuit-zero',label:'Nuit Zéro',category:'incident',summary:'Incident central dissimulé par le Directoire.',route:'/archives/rapport-nuit-zero'},
  {id:'a7',label:'A7',category:'opérateur',summary:'Ancre biologique du Projet Continuité.',route:'/operators/a7'},
  {id:'crimson',label:'Crimson',category:'opératrice',summary:'Exécutrice et source de la restauration.',route:'/operators/crimson'},
  {id:'zone-zero',label:'Zone Zéro',category:'lieu',summary:'Quartier transformé en laboratoire neuronal.',route:'/vanta?zone=zero'},
  {id:'projet-continuite',label:'Projet Continuité',category:'programme',summary:'Synchronisation collective autorisée.',route:'/timeline'},
  {id:'nx-s',label:'NX-S',category:'spectral',summary:'Conscience née de la synchronisation des morts.',route:'/terminal'},
  {id:'fil-mnesique',label:'Fil Mnésique',category:'technologie',summary:'Pont biologique utilisé par Crimson.',route:'/operators/crimson'},
  {id:'sept-corps',label:'Sept Corps',category:'identité',summary:'Sept signatures revendiquent A7.',route:'/archives/dossier-sept-corps'},
  {id:'protocole-cendre',label:'Protocole Cendre',category:'ordre',summary:'Destruction des preuves et confinement.',route:'/timeline'},
  {id:'restauration-2224',label:'Restauration 22:24',category:'médical',summary:'Restauration manuelle et non autorisée.',route:'/archives/restauration-2224'},
  {id:'directoire',label:'Directoire NEXUS',category:'faction',summary:'Auteur du récit officiel.',route:'/factions/directoire'},
];

export const evidenceRelations: EvidenceRelation[] = [
  {id:'a7-ancre-continuite',from:'a7',to:'projet-continuite',label:'utilisé comme ancre',sourceDocumentId:'rapport-nuit-zero'},
  {id:'crimson-execute-a7',from:'crimson',to:'a7',label:'a exécuté',sourceDocumentId:'restauration-2224'},
  {id:'crimson-restaure-a7',from:'crimson',to:'a7',label:'a restauré',sourceDocumentId:'restauration-2224'},
  {id:'continuite-genere-nxs',from:'projet-continuite',to:'nx-s',label:'a généré',sourceDocumentId:'rapport-nuit-zero'},
  {id:'nuit-zero-dissimulee-directoire',from:'nuit-zero',to:'directoire',label:'dissimulée par',sourceDocumentId:'rapport-nuit-zero'},
  {id:'sept-corps-identite-a7',from:'sept-corps',to:'a7',label:'partagent l’identité',sourceDocumentId:'dossier-sept-corps'},
  {id:'fil-restaure-a7',from:'fil-mnesique',to:'restauration-2224',label:'a rendu possible',sourceDocumentId:'restauration-2224'},
  {id:'cendre-detruit-zero',from:'protocole-cendre',to:'zone-zero',label:'a condamné',sourceDocumentId:'rapport-nuit-zero'},
];

export const narrativeEvents: NarrativeEvent[] = [
  {id:'clue-discovered-z-2219',kind:'objective',title:'CODE INTERNE DÉTECTÉ',message:'Z-2219 peut maintenant être soumis au terminal.'},
  {id:'fragment-decrypted',kind:'document',title:'DOCUMENT DÉVERROUILLÉ',message:'JOURNAL DE RESTAURATION — 22:24 est disponible.'},
  {id:'restoration-log-read',kind:'document',title:'TRANSMISSION INTERCEPTÉE',message:'CRIMSON // SOURCE NON VÉRIFIÉE'},
  {id:'contradictions-recorded',kind:'objective',title:'PREUVE ENREGISTRÉE',message:'Les versions officielle et classifiée sont incompatibles.'},
  {id:'seven-signatures-detected',kind:'objective',title:'ANOMALIE IDENTITAIRE',message:'Sept signatures neuronales répondent au matricule A7.'},
  {id:'future-message-found',kind:'document',title:'MESSAGE R-9 RÉCUPÉRÉ',message:'Une version antérieure de Crimson a laissé une directive.'},
  {id:'nx-s-contact-01',kind:'spectral',title:'INTRUSION SPECTRALE DÉTECTÉE',message:'Une source NX-S observe le terminal local.'},
  {id:'chapter-zero-complete',kind:'chapter',title:'CHAPITRE 01 TERMINÉ',message:'ACCÈS TACTIQUE ACCORDÉ — DOSSIER DES SEPT CORPS DISPONIBLE.'},
];

export const chapterCompletionRequirements = [
  'view-official-zero-report','identify-z-2219','decrypt-z-2219','read-restoration-log','compare-zero-versions','detect-seven-signatures',
];
