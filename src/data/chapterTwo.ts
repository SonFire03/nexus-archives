import type { EvidenceNode, EvidenceRelation, NarrativeEvent, NarrativeObjective } from '../types';

export const chapterTwoObjectives: NarrativeObjective[] = [
  { id:'open-seven-bodies', title:'Ouvrir le Dossier des Sept Corps', description:'Examiner l’index neuronal laissé par l’Archiviste des Absents.', hint:'Le dossier est disponible avec l’accès TACTIQUE.', route:'/archives/dossier-sept-corps' },
  { id:'scan-signature-a7-03', title:'Localiser la signature A7-03', description:'Soumettre la signature archivée au terminal.', hint:'Commande : scan signature a7-03', route:'/terminal', requires:['open-seven-bodies'] },
  { id:'read-helix-register', title:'Examiner le registre HELIX K-13', description:'Identifier le corps associé à la signature retrouvée.', hint:'Le registre récupéré est visible dans les Archives.', route:'/archives/registre-helix-k13', requires:['scan-signature-a7-03'] },
  { id:'reconstruct-memory-0417', title:'Reconstruire la mémoire 04:17', description:'Remettre quatre fragments neuronaux dans leur ordre causal.', hint:'Utilisez le reconstructeur mnésique.', route:'/memory', requires:['read-helix-register'] },
  { id:'verify-crimson-memory', title:'Vérifier la directive de Crimson', description:'Comparer le fragment restauré au Fil Mnésique R-9.', hint:'Commande : verify memory crimson', route:'/terminal', requires:['reconstruct-memory-0417'] },
  { id:'compare-a7-identities', title:'Comparer A7 et A7-04', description:'Enregistrer les contradictions entre les deux identités.', hint:'Ouvrez l’archive MÉMOIRE SOURCE — A7-04.', route:'/archives/memoire-source-a7-04', requires:['verify-crimson-memory'] },
  { id:'locate-body-04', title:'Localiser le Corps 04', description:'Tracer la chambre biologique dissimulée par HELIX.', hint:'Commande : trace body-04', route:'/terminal', requires:['compare-a7-identities'] },
  { id:'decide-body-04', title:'Statuer sur le Corps 04', description:'Choisir de réveiller, isoler ou effacer la reconstruction.', hint:'Aucune option ne garantit la continuité de l’identité.', route:'/chapter-two', requires:['locate-body-04'] },
];

export const chapterTwoEvidenceNodes: EvidenceNode[] = [
  {id:'signature-a7-03',label:'Signature A7-03',category:'empreinte',summary:'Empreinte archivée qui émet encore depuis K-13.',route:'/archives/dossier-sept-corps'},
  {id:'laboratoire-k13',label:'Laboratoire K-13',category:'lieu',summary:'Annexe HELIX condamnée sous les anciennes voies.',route:'/archives/registre-helix-k13'},
  {id:'helix-biodyne',label:'HELIX Biodyne',category:'faction',summary:'Cultive des corps sans conscience pour la continuité biologique.',route:'/factions/helix'},
  {id:'corps-a7-04',label:'Corps A7-04',category:'identité',summary:'Corps viable associé à une sauvegarde antérieure à la Nuit Zéro.',route:'/chapter-two'},
  {id:'memoire-0417',label:'Mémoire 04:17',category:'souvenir',summary:'Séquence reconstruite révélant un ordre de Crimson.',route:'/memory'},
  {id:'sauvegarde-a7-04',label:'Sauvegarde A7-04',category:'identité',summary:'Version sélectionnée pendant la restauration 22:24.',route:'/archives/memoire-source-a7-04'},
];

export const chapterTwoEvidenceRelations: EvidenceRelation[] = [
  {id:'signature-03-emet-k13',from:'signature-a7-03',to:'laboratoire-k13',label:'émet depuis',sourceDocumentId:'dossier-sept-corps'},
  {id:'helix-maintient-corps-04',from:'helix-biodyne',to:'corps-a7-04',label:'maintient en stase',sourceDocumentId:'registre-helix-k13'},
  {id:'corps-04-contient-sauvegarde',from:'corps-a7-04',to:'sauvegarde-a7-04',label:'devrait recevoir',sourceDocumentId:'registre-helix-k13'},
  {id:'memoire-contredit-a7',from:'memoire-0417',to:'a7',label:'contredit les souvenirs de',sourceDocumentId:'memoire-source-a7-04'},
  {id:'crimson-protege-corps-04',from:'crimson',to:'corps-a7-04',label:'a ordonné de protéger',sourceDocumentId:'memoire-source-a7-04'},
  {id:'sept-corps-inclut-sauvegarde-04',from:'sept-corps',to:'sauvegarde-a7-04',label:'inclut',sourceDocumentId:'dossier-sept-corps'},
];

export interface MemoryFragment {
  id: string;
  time: string;
  source: string;
  text: string;
}

export const memoryFragments: MemoryFragment[] = [
  {id:'signal',time:'04:17:12',source:'A7-03',text:'Une signature étrangère est détectée dans le noyau du Corps 04.'},
  {id:'voice',time:'04:17:16',source:'INCONNUE',text:'Une voix d’enfant demande à A7 de ne pas ouvrir la Porte de Continuité.'},
  {id:'crimson',time:'04:17:21',source:'R-9',text:'Crimson ordonne de préserver le Corps 04 et de rejeter la sauvegarde la plus récente.'},
  {id:'purge',time:'04:17:28',source:'HELIX',text:'HELIX efface l’index de la chambre et déclare le sujet biologiquement vide.'},
];

export const memorySolution = memoryFragments.map(({id}) => id);

export const chapterTwoChoices = [
  {id:'wake',label:'RÉVEILLER LE CORPS',cost:'Deux identités A7 seront actives. NX-S pourra tenter une synchronisation.',outcome:'La chambre reçoit un ordre de réveil différé. Une seconde respiration apparaît sur le canal médical.'},
  {id:'isolate',label:'ISOLER LE CORPS',cost:'La stase est maintenue, mais HELIX pourra retrouver la chambre.',outcome:'Tous les relais numériques sont coupés. Le Corps 04 reste vivant dans un silence analogique.'},
  {id:'erase',label:'EFFACER LA SAUVEGARDE',cost:'Le corps survivra, mais l’empreinte A7-04 sera détruite sans certitude de copie.',outcome:'L’empreinte est dissociée du corps. Avant de disparaître, elle transmet un mot : « sept ».'},
] as const;

export type ChapterTwoChoice = typeof chapterTwoChoices[number]['id'];

export const chapterTwoEvents: NarrativeEvent[] = [
  {id:'chapter-two-started',kind:'chapter',title:'CHAPITRE 02 INITIALISÉ',message:'LES SEPT CORPS — une signature archivée émet encore.'},
  {id:'signature-a7-03-located',kind:'objective',title:'SIGNATURE LOCALISÉE',message:'A7-03 répond depuis une annexe HELIX sous Station K-13.'},
  {id:'memory-reconstructor-online',kind:'document',title:'RECONSTRUCTEUR DISPONIBLE',message:'Quatre fragments de la séquence 04:17 ont été récupérés.'},
  {id:'memory-0417-restored',kind:'objective',title:'MÉMOIRE RESTAURÉE',message:'La séquence 04:17 révèle une directive antérieure de Crimson.'},
  {id:'crimson-memory-verified',kind:'objective',title:'SIGNATURE R-9 CONFIRMÉE',message:'La directive a été enregistrée avant la Nuit Zéro.'},
  {id:'body-04-located',kind:'objective',title:'CHAMBRE BIOLOGIQUE LOCALISÉE',message:'Le Corps A7-04 est viable. Une décision est requise.'},
  {id:'chapter-two-complete',kind:'chapter',title:'CHAPITRE 02 TERMINÉ',message:'ACCÈS OMEGA ACCORDÉ — la décision concernant A7-04 est archivée.'},
];

export const chapterTwoCompletionRequirements = chapterTwoObjectives.slice(0,-1).map(({id}) => id);
