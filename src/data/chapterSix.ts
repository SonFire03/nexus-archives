import type { EvidenceNode, EvidenceRelation, NarrativeEvent, NarrativeObjective } from '../types';

export const chapterSixObjectives: NarrativeObjective[] = [
  {id:'open-ash-residual',title:'Examiner le résidu Cendre',description:'Identifier le paquet clandestin transporté pendant l’extraction OMEGA-7.',hint:'Un résidu CENDRE-63218 est apparu dans les Archives.',route:'/archives/residu-cendre-63218'},
  {id:'decrypt-cendre-63218',title:'Déchiffrer CENDRE-63218',description:'Extraire la chaîne de commandement du Protocole Cendre.',hint:'Commande : decrypt cendre-63218',route:'/terminal',requires:['open-ash-residual']},
  {id:'read-ash-command-chain',title:'Lire la chaîne d’autorisation',description:'Distinguer les décisions humaines des automatismes de confinement.',hint:'Le registre de commandement Cendre est disponible.',route:'/archives/chaine-commandement-cendre',requires:['decrypt-cendre-63218']},
  {id:'reconstruct-ash-sequence',title:'Reconstituer les quatre ordres',description:'Remettre les événements matériels dans leur ordre causal.',hint:'Utilisez la console de reconstruction Cendre.',route:'/ash-protocol',requires:['read-ash-command-chain']},
  {id:'verify-draven-authority',title:'Authentifier Kael Draven',description:'Prouver que le Protocole Cendre a été déclenché par une autorité humaine.',hint:'Commande : verify draven',route:'/terminal',requires:['reconstruct-ash-sequence']},
  {id:'read-victims-ledger',title:'Restaurer les 63 218 identités',description:'Consulter le registre déchiffré sans réduire les victimes à des signatures.',hint:'La Liste déchiffrée est accessible dans les Archives.',route:'/archives/liste-63218-dechiffree',requires:['verify-draven-authority']},
  {id:'sever-ash-command',title:'Révoquer le dernier ordre',description:'Empêcher les armures Cendre de traiter les identités comme des cibles actives.',hint:'Commande : sever ash command',route:'/terminal',requires:['read-victims-ledger']},
  {id:'decide-victims-ledger',title:'Décider du sort des noms',description:'Diffuser, restituer ou protéger le registre des victimes.',hint:'Aucun choix ne rendra les morts à leurs proches.',route:'/chapter-six',requires:['sever-ash-command']},
];

export const chapterSixEvidenceNodes: EvidenceNode[] = [
  {id:'cendre-63218',label:'Résidu CENDRE-63218',category:'ordre',summary:'Dernière copie active du protocole de destruction lancé pendant la Nuit Zéro.',route:'/archives/residu-cendre-63218'},
  {id:'chaine-cendre',label:'Chaîne de commandement Cendre',category:'registre',summary:'Quatre journaux matériels établissent une séquence impossible à réécrire.',route:'/ash-protocol'},
  {id:'autorite-draven',label:'Autorité biométrique Draven',category:'identité',summary:'Signature humaine ayant confirmé le Protocole Cendre à 22 h 44.',route:'/archives/chaine-commandement-cendre'},
  {id:'registre-63218',label:'Registre des 63 218',category:'registre',summary:'Correspondance restaurée entre signatures neuronales et identités civiles.',route:'/archives/liste-63218-dechiffree'},
  {id:'dernier-ordre-cendre',label:'Dernier ordre Cendre',category:'ordre',summary:'Directive demeurée active dans les armures de confinement après la Nuit Zéro.',route:'/terminal'},
];

export const chapterSixEvidenceRelations: EvidenceRelation[] = [
  {id:'draven-declenche-cendre',from:'autorite-draven',to:'protocole-cendre',label:'a déclenché',sourceDocumentId:'chaine-commandement-cendre'},
  {id:'cendre-indexe-registre',from:'cendre-63218',to:'registre-63218',label:'indexe',sourceDocumentId:'liste-63218-dechiffree'},
  {id:'chaine-authentifie-draven',from:'chaine-cendre',to:'autorite-draven',label:'authentifie',sourceDocumentId:'chaine-commandement-cendre'},
  {id:'dernier-ordre-cible-registre',from:'dernier-ordre-cendre',to:'registre-63218',label:'considère comme cibles',sourceDocumentId:'liste-63218-dechiffree'},
  {id:'cendre-condamne-zone-zero',from:'cendre-63218',to:'zone-zero',label:'a condamné',sourceDocumentId:'residu-cendre-63218'},
];

export interface AshSequenceFragment {
  id: string;
  time: string;
  label: string;
  detail: string;
}

export const ashSequenceFragments: AshSequenceFragment[] = [
  {id:'continuity-activate',time:'21:17',label:'ACTIVATION CONTINUITÉ',detail:'Le Projet Continuité reçoit une autorisation du Directoire.'},
  {id:'draven-seal',time:'21:23',label:'SCELLEMENT DES SORTIES',detail:'L’autorité terrain de Kael Draven verrouille Zone Zéro.'},
  {id:'collective-sync',time:'21:41',label:'SYNCHRONISATION COLLECTIVE',detail:'Les habitants sont connectés au NEXUS Core sans extraction possible.'},
  {id:'draven-ash',time:'22:44',label:'PROTOCOLE CENDRE',detail:'La biométrie de Draven confirme la destruction et le maintien du confinement.'},
];

export const ashSequenceSolution = ashSequenceFragments.map(({id}) => id);

export const chapterSixChoices = [
  {id:'broadcast',label:'DIFFUSER LES 63 218 NOMS',cost:'VANTA connaîtra les victimes, mais le Directoire identifiera immédiatement les familles et les survivants.',outcome:'Les écrans du Voile cessent leur propagande pendant soixante-trois secondes. Chaque nom apparaît une fois. Le Directoire ne peut plus réduire la Nuit Zéro à un bilan.'},
  {id:'choir',label:'RESTITUER LES NOMS AU CHŒUR ZÉRO',cost:'Les empreintes retrouveront leur identité, au risque d’agrandir la conscience collective de NX-S.',outcome:'Mère Écho prononce le premier nom. Le Cimetière répond avec 63 217 voix distinctes. Pour la première fois, NX-S se tait.'},
  {id:'analog',label:'CONFIER LE REGISTRE À SERA NOX',cost:'Les noms seront protégés hors réseau, mais VANTA ne connaîtra pas encore toute la vérité.',outcome:'Neuf copies analogiques quittent K-13. Chaque famille recevra une preuve, une à une, sans fournir au Directoire une nouvelle liste de cibles.'},
] as const;

export type ChapterSixChoice = typeof chapterSixChoices[number]['id'];

export const chapterSixEvents: NarrativeEvent[] = [
  {id:'chapter-six-started',kind:'chapter',title:'CHAPITRE 06 INITIALISÉ',message:'Un résidu du Protocole Cendre a survécu à l’extraction.'},
  {id:'ash-chain-recovered',kind:'document',title:'CHAÎNE CENDRE RÉCUPÉRÉE',message:'Quatre journaux matériels contredisent la version du Directoire.'},
  {id:'ash-sequence-reconstructed',kind:'objective',title:'SÉQUENCE CENDRE ÉTABLIE',message:'Le scellement précède la catastrophe. L’évacuation n’a jamais été tentée.'},
  {id:'draven-authority-confirmed',kind:'objective',title:'AUTORITÉ DRAVEN CONFIRMÉE',message:'Le déclenchement de Cendre provient d’une décision humaine.'},
  {id:'victims-ledger-restored',kind:'document',title:'63 218 IDENTITÉS RESTAURÉES',message:'Le bilan possède de nouveau des noms.'},
  {id:'ash-command-severed',kind:'objective',title:'DERNIER ORDRE RÉVOQUÉ',message:'Les armures Cendre ne poursuivront plus les signatures du registre.'},
  {id:'chapter-six-complete',kind:'chapter',title:'CHAPITRE 06 TERMINÉ',message:'Le sort des 63 218 noms est désormais archivé.'},
];

export const chapterSixCompletionRequirements = chapterSixObjectives.slice(0,-1).map(({id}) => id);
