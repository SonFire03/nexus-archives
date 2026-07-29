import type { EvidenceNode, EvidenceRelation, NarrativeEvent, NarrativeObjective } from '../types';

export const chapterFourObjectives: NarrativeObjective[] = [
  {id:'open-original-truth',title:'Ouvrir MIRROR-00',description:'Examiner la première version archivée du récit de la Nuit Zéro.',hint:'Le dossier VÉRITÉ ORIGINALE est accessible en NOIR ABSOLU.',route:'/archives/verite-originale'},
  {id:'trace-mirror-00',title:'Tracer le checksum MIRROR-00',description:'Retrouver le registre des révisions qui ont produit la version publique.',hint:'Commande : trace mirror-00',route:'/terminal',requires:['open-original-truth']},
  {id:'read-mirror-ledger',title:'Consulter le registre des révisions',description:'Comparer les versions préparées avant et après l’incident.',hint:'Le registre MIRROR est maintenant disponible dans les Archives.',route:'/archives/registre-revisions-miroir',requires:['trace-mirror-00']},
  {id:'reconstruct-original-truth',title:'Reconstruire les faits invariants',description:'Isoler quatre faits ayant résisté à toutes les réécritures.',hint:'Utilisez le reconstructeur de vérité.',route:'/truth-reconstruction',requires:['read-mirror-ledger']},
  {id:'verify-vale-signature',title:'Authentifier Orin Vale',description:'Vérifier qui a signé le récit terroriste avant la Nuit Zéro.',hint:'Commande : verify vale signature',route:'/terminal',requires:['reconstruct-original-truth']},
  {id:'read-truth-directive',title:'Lire la Directive supportable',description:'Comprendre pourquoi le Directoire a préparé une version publique avant l’expérience.',hint:'La directive d’Orin Vale a été déverrouillée.',route:'/archives/directive-verite-supportable',requires:['verify-vale-signature']},
  {id:'map-mirror-network',title:'Cartographier le réseau du Miroir',description:'Identifier les relais capables de remplacer simultanément les archives de VANTA.',hint:'Commande : map mirror network',route:'/terminal',requires:['read-truth-directive']},
  {id:'decide-original-truth',title:'Statuer sur MIRROR-00',description:'Diffuser, préserver ou fragmenter la vérité originale.',hint:'Une vérité publiée peut encore devenir un instrument de contrôle.',route:'/chapter-four',requires:['map-mirror-network']},
];

export const chapterFourEvidenceNodes: EvidenceNode[] = [
  {id:'mirror-00',label:'Archive MIRROR-00',category:'archive',summary:'Première couverture de la Nuit Zéro, rédigée avant l’activation du Projet Continuité.',route:'/archives/verite-originale'},
  {id:'orin-vale',label:'Orin Vale',category:'identité',summary:'Conservateur de la Vérité et auteur cryptographique des versions publiques.',route:'/factions/ordre-miroir'},
  {id:'registre-miroir',label:'Registre des révisions',category:'registre',summary:'Chaîne de modifications reliant le scénario préventif au rapport officiel.',route:'/archives/registre-revisions-miroir'},
  {id:'reseau-miroir',label:'Réseau du Miroir',category:'infrastructure',summary:'Onze relais capables de remplacer les archives civiles de VANTA en moins de quatre minutes.',route:'/investigation'},
  {id:'verite-supportable',label:'Doctrine supportable',category:'doctrine',summary:'Le Directoire adapte les faits à ce que la société peut survivre sans s’effondrer.',route:'/archives/directive-verite-supportable'},
  {id:'preuve-preincident',label:'Signature pré-incident',category:'preuve',summary:'Orin Vale a validé la couverture terroriste dix-huit heures avant la Nuit Zéro.',route:'/truth-reconstruction'},
];

export const chapterFourEvidenceRelations: EvidenceRelation[] = [
  {id:'vale-signe-mirror-00',from:'orin-vale',to:'mirror-00',label:'a signé',sourceDocumentId:'registre-revisions-miroir'},
  {id:'mirror-00-anticipe-nuit-zero',from:'mirror-00',to:'nuit-zero',label:'a anticipé le récit de',sourceDocumentId:'verite-originale'},
  {id:'registre-produit-rapport-zero',from:'registre-miroir',to:'nuit-zero',label:'a produit la version officielle de',sourceDocumentId:'registre-revisions-miroir'},
  {id:'doctrine-justifie-reseau',from:'verite-supportable',to:'reseau-miroir',label:'justifie l’emploi de',sourceDocumentId:'directive-verite-supportable'},
  {id:'vale-dirige-reseau',from:'orin-vale',to:'reseau-miroir',label:'contrôle',sourceDocumentId:'directive-verite-supportable'},
  {id:'preuve-authentifie-vale',from:'preuve-preincident',to:'orin-vale',label:'authentifie la signature de',sourceDocumentId:'registre-revisions-miroir'},
];

export interface TruthFragment {
  id: string;
  version: string;
  text: string;
  marker: string;
  invariant: boolean;
}

export const truthFragments: TruthFragment[] = [
  {id:'lockdown',version:'TOUTES VERSIONS',text:'Les sorties de Zone Zéro ont été scellées à 21 h 23.',marker:'HORODATAGE MATÉRIEL // INALTÉRABLE',invariant:true},
  {id:'anchor',version:'INTERNE + MIRROR-00',text:'A7 servait d’ancre biologique au Projet Continuité.',marker:'TÉLÉMÉTRIE NX5-00 // CONFIRMÉE',invariant:true},
  {id:'restoration',version:'JOURNAL MÉDICAL',text:'R-9 a rétabli l’activité neuronale d’A7 à 22 h 31.',marker:'SIGNATURE BIOMÉTRIQUE // CONFIRMÉE',invariant:true},
  {id:'prewritten',version:'MIRROR-00',text:'La thèse terroriste a été validée dix-huit heures avant l’activation.',marker:'SIGNATURE VALE // PRÉ-INCIDENT',invariant:true},
  {id:'reactor',version:'VERSION PUBLIQUE',text:'Un réacteur expérimental a provoqué la destruction du quartier.',marker:'AUCUNE TÉLÉMÉTRIE CORRESPONDANTE',invariant:false},
  {id:'evacuation',version:'COMMUNIQUÉ CIVIL',text:'Le Directoire a maintenu toutes les voies d’évacuation ouvertes.',marker:'CONTREDIT PAR VERROUILLAGE 21:23',invariant:false},
];

export const invariantTruthIds = truthFragments.filter(({invariant}) => invariant).map(({id}) => id);

export const chapterFourChoices = [
  {id:'broadcast',label:'DIFFUSER MIRROR-00',cost:'VANTA découvrira la préméditation du Directoire, au risque d’un effondrement civil immédiat.',outcome:'Les onze relais diffusent simultanément MIRROR-00. La Couronne coupe ses réseaux, mais les copies analogiques circulent déjà dans les Profondeurs.'},
  {id:'preserve',label:'PRÉSERVER L’ARCHIVE',cost:'La preuve restera intacte et secrète ; le mensonge public continuera de protéger le Directoire.',outcome:'MIRROR-00 est isolée dans un coffre analogique. Orin Vale conserve le contrôle du récit public, sans pouvoir détruire l’original.'},
  {id:'fragment',label:'FRAGMENTER LA VÉRITÉ',cost:'Chaque faction recevra une partie vérifiable, mais aucune ne possédera seule le contexte complet.',outcome:'La preuve est divisée entre les Fantômes Libres, les Sentinelles et le Chœur Zéro. Aucun pouvoir ne peut plus la supprimer ni la publier seul.'},
] as const;

export type ChapterFourChoice = typeof chapterFourChoices[number]['id'];

export const chapterFourEvents: NarrativeEvent[] = [
  {id:'chapter-four-started',kind:'chapter',title:'CHAPITRE 04 INITIALISÉ',message:'VÉRITÉ ORIGINALE — une archive antérieure à la Nuit Zéro vient de répondre.'},
  {id:'mirror-ledger-recovered',kind:'document',title:'REGISTRE MIRROR RÉCUPÉRÉ',message:'Dix-sept révisions relient MIRROR-00 au rapport officiel.'},
  {id:'truth-reconstructor-online',kind:'document',title:'RECONSTRUCTEUR DE VÉRITÉ DISPONIBLE',message:'Six assertions ont été récupérées. Deux sont des insertions du Miroir.'},
  {id:'original-truth-reconstructed',kind:'objective',title:'FAITS INVARIANTS ISOLÉS',message:'La couverture terroriste existait avant l’incident.'},
  {id:'vale-signature-confirmed',kind:'objective',title:'SIGNATURE ORIN VALE CONFIRMÉE',message:'Validation enregistrée dix-huit heures avant la Nuit Zéro.'},
  {id:'mirror-network-mapped',kind:'objective',title:'RÉSEAU DU MIROIR CARTOGRAPHIÉ',message:'Onze relais contrôlent la mémoire publique de VANTA.'},
  {id:'chapter-four-complete',kind:'chapter',title:'CHAPITRE 04 TERMINÉ',message:'Le destin de MIRROR-00 est archivé. Le Directoire connaît désormais votre signature.'},
];

export const chapterFourCompletionRequirements = chapterFourObjectives.slice(0,-1).map(({id}) => id);
