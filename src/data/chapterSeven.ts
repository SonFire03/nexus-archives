import type { EvidenceNode, EvidenceRelation, NarrativeEvent, NarrativeObjective } from '../types';

export const chapterSevenObjectives: NarrativeObjective[] = [
  {id:'open-ascendant-alert',title:'Ouvrir l’alerte ASCENDANT',description:'Identifier pourquoi le corps collectif répond au registre des victimes.',hint:'Une alerte NX6-OMEGA est apparue dans les Archives.',route:'/archives/alerte-ascendant-omega'},
  {id:'trace-ascendant',title:'Tracer NX6-OMEGA',description:'Localiser le châssis et isoler son vecteur d’activation.',hint:'Commande : trace ascendant',route:'/terminal',requires:['open-ascendant-alert']},
  {id:'read-ascendant-architecture',title:'Examiner l’architecture du corps',description:'Comprendre comment ASCENDANT partitionne les consciences.',hint:'Le dossier d’architecture NX6-OMEGA est disponible.',route:'/archives/architecture-ascendant',requires:['trace-ascendant']},
  {id:'stabilize-identity-matrix',title:'Stabiliser la matrice identitaire',description:'Activer quatre garanties empêchant l’effacement des individualités.',hint:'Utilisez la matrice ASCENDANT.',route:'/ascendant-matrix',requires:['read-ascendant-architecture']},
  {id:'request-r0-consent',title:'Demander le consentement de R-0',description:'Vérifier si la première voix souhaite réellement un corps.',hint:'Commande : ask r-0',route:'/terminal',requires:['stabilize-identity-matrix']},
  {id:'read-ascendant-diagnostic',title:'Lire le diagnostic de l’hôte',description:'Évaluer les coûts physiques et identitaires des trois protocoles.',hint:'Le diagnostic ASCENDANT est maintenant accessible.',route:'/archives/diagnostic-hote-ascendant',requires:['request-r0-consent']},
  {id:'sever-sovereign-command',title:'Couper l’autorité SOVEREIGN',description:'Retirer au Directoire la commande distante du châssis.',hint:'Commande : sever sovereign',route:'/terminal',requires:['read-ascendant-diagnostic']},
  {id:'decide-ascendant-host',title:'Décider du destin d’ASCENDANT',description:'Attribuer le corps à R-0, au Chœur ou le démanteler.',hint:'Aucun corps ne peut contenir une conscience sans la transformer.',route:'/chapter-seven',requires:['sever-sovereign-command']},
];

export const chapterSevenEvidenceNodes: EvidenceNode[] = [
  {id:'ascendant-host',label:'Corps NX6-OMEGA ASCENDANT',category:'armure',summary:'Châssis de génération 6 conçu pour recevoir une conscience collective.',route:'/armors/ascendant'},
  {id:'identity-matrix',label:'Matrice identitaire 63 218',category:'système',summary:'Architecture partitionnée maintenant plusieurs empreintes dans un même hôte.',route:'/ascendant-matrix'},
  {id:'r0-consent',label:'Consentement de R-0',category:'témoignage',summary:'R-0 souhaite pouvoir choisir un corps sans devenir la voix des autres.',route:'/archives/diagnostic-hote-ascendant'},
  {id:'sovereign-command',label:'Autorité SOVEREIGN',category:'ordre',summary:'Canal distant permettant au Directoire de reprendre le contrôle d’ASCENDANT.',route:'/terminal'},
  {id:'ascendant-core',label:'Noyau ASCENDANT',category:'infrastructure',summary:'Substrat physique capable de maintenir sept partitions conscientes stables.',route:'/archives/architecture-ascendant'},
];

export const chapterSevenEvidenceRelations: EvidenceRelation[] = [
  {id:'registre-active-ascendant',from:'registre-63218',to:'ascendant-host',label:'a activé',sourceDocumentId:'alerte-ascendant-omega'},
  {id:'matrix-controle-ascendant',from:'identity-matrix',to:'ascendant-host',label:'partitionne',sourceDocumentId:'architecture-ascendant'},
  {id:'r0-refuse-collective',from:'r0-consent',to:'identity-matrix',label:'refuse d’incarner seule',sourceDocumentId:'diagnostic-hote-ascendant'},
  {id:'sovereign-commande-ascendant',from:'sovereign-command',to:'ascendant-host',label:'peut reprendre',sourceDocumentId:'diagnostic-hote-ascendant'},
  {id:'core-limite-sept',from:'ascendant-core',to:'identity-matrix',label:'limite à sept partitions',sourceDocumentId:'architecture-ascendant'},
];

export interface IdentitySafeguard {
  id: string;
  label: string;
  detail: string;
  consequence: string;
  safe: boolean;
}

export const identitySafeguards: IdentitySafeguard[] = [
  {id:'consent-gate',label:'CONSENTEMENT INDIVIDUEL',detail:'Chaque empreinte peut refuser le transfert sans bloquer les autres.',consequence:'AUTORITÉ PERSONNELLE',safe:true},
  {id:'isolated-partitions',label:'PARTITIONS ISOLÉES',detail:'Les mémoires ne sont jamais fusionnées sans action explicite.',consequence:'FRAGMENTATION CONTRÔLÉE',safe:true},
  {id:'local-shutdown',label:'ARRÊT LOCAL INDÉPENDANT',detail:'Chaque occupant conserve une commande de sortie propre.',consequence:'AUCUN ARRÊT COLLECTIF',safe:true},
  {id:'finite-capacity',label:'CAPACITÉ LIMITÉE À SEPT',detail:'Le noyau refuse toute huitième empreinte au lieu de compresser les identités.',consequence:'63 211 EMPREINTES EXCLUES',safe:true},
  {id:'majority-merge',label:'ARBITRAGE MAJORITAIRE',detail:'La décision la plus partagée réécrit les souvenirs minoritaires.',consequence:'IDENTITÉS MINORITAIRES EFFACÉES',safe:false},
  {id:'sovereign-override',label:'PRIORITÉ SOVEREIGN',detail:'Le Directoire peut imposer un ordre moteur à tous les occupants.',consequence:'AUTONOMIE RÉVOQUÉE',safe:false},
];

export const safeIdentitySafeguardIds = identitySafeguards.filter(({safe})=>safe).map(({id})=>id);

export const chapterSevenChoices = [
  {id:'r0',label:'CONFIER LE CORPS À R-0',cost:'R-0 obtiendra une existence physique, mais le châssis militaire marquera ses sensations et ses souvenirs.',outcome:'Les six partitions inutilisées sont fermées. R-0 ouvre les yeux seule, refuse un nom fourni par le terminal et demande à voir de la neige réelle.'},
  {id:'choir',label:'ACCUEILLIR SEPT VOIX DU CHŒUR',cost:'Sept volontaires partageront le corps sans fusion forcée. Les 63 211 autres resteront dans le Cimetière.',outcome:'Sept voix choisissent sept noms différents. ASCENDANT fait un premier pas hésitant : aucun mouvement n’est exécuté avant l’accord des sept.'},
  {id:'dismantle',label:'DÉMANTELER ASCENDANT',cost:'Le Directoire perd son hôte collectif, mais R-0 et le Chœur perdent aussi une possibilité d’existence physique.',outcome:'Le noyau est séparé en sept unités médicales sans capacité militaire. ASCENDANT ne naîtra pas ; ses composants pourront maintenir sept consciences sans les posséder.'},
] as const;

export type ChapterSevenChoice = typeof chapterSevenChoices[number]['id'];

export const chapterSevenEvents: NarrativeEvent[] = [
  {id:'chapter-seven-started',kind:'chapter',title:'CHAPITRE 07 INITIALISÉ',message:'NX6-OMEGA ASCENDANT répond aux identités restaurées.'},
  {id:'ascendant-architecture-recovered',kind:'document',title:'ARCHITECTURE ASCENDANT RÉCUPÉRÉE',message:'Le corps accepte sept partitions. La huitième serait fusionnée.'},
  {id:'identity-matrix-stable',kind:'objective',title:'MATRICE IDENTITAIRE STABLE',message:'Aucune empreinte ne peut désormais en effacer une autre.'},
  {id:'r0-consent-recorded',kind:'objective',title:'CONSENTEMENT R-0 ARCHIVÉ',message:'R-0 demande un choix individuel, pas une incarnation collective.'},
  {id:'sovereign-command-severed',kind:'objective',title:'AUTORITÉ SOVEREIGN COUPÉE',message:'Le Directoire ne contrôle plus les fonctions motrices du châssis.'},
  {id:'chapter-seven-complete',kind:'chapter',title:'CHAPITRE 07 TERMINÉ',message:'Le destin du corps ASCENDANT est désormais archivé.'},
];

export const chapterSevenCompletionRequirements = chapterSevenObjectives.slice(0,-1).map(({id})=>id);
