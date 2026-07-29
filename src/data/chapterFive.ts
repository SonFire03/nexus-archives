import type { EvidenceNode, EvidenceRelation, NarrativeEvent, NarrativeObjective } from '../types';

export const chapterFiveObjectives: NarrativeObjective[] = [
  {id:'open-omega-capture-order',title:'Consulter l’ordre de capture',description:'Identifier l’opération lancée contre la signature locale OMEGA-7.',hint:'L’ordre HUNT-314 est disponible dans les Archives.',route:'/archives/ordre-capture-omega-7'},
  {id:'decrypt-hunt-314',title:'Déchiffrer HUNT-314',description:'Extraire le plan de triangulation du Directoire.',hint:'Commande : decrypt hunt-314',route:'/terminal',requires:['open-omega-capture-order']},
  {id:'read-triangulation-log',title:'Examiner le journal de poursuite',description:'Localiser les trois couches utilisées pour remonter jusqu’au terminal.',hint:'Le journal HARBINGER est maintenant accessible.',route:'/archives/journal-triangulation-harbringer',requires:['decrypt-hunt-314']},
  {id:'break-triangulation',title:'Rompre la triangulation',description:'Construire une contre-route sans exposer de civils ni fusionner avec NX-S.',hint:'Utilisez la console de contre-traque.',route:'/counter-trace',requires:['read-triangulation-log']},
  {id:'authenticate-crimson-channel',title:'Authentifier le canal Crimson',description:'Vérifier que l’offre d’extraction ne provient ni du Miroir ni de NX-S.',hint:'Commande : authenticate crimson',route:'/terminal',requires:['break-triangulation']},
  {id:'read-extraction-plan',title:'Consulter le plan d’extraction',description:'Comparer les trois sorties encore accessibles dans VANTA.',hint:'Le plan de Crimson est disponible dans les Archives.',route:'/archives/plan-extraction-omega-7',requires:['authenticate-crimson-channel']},
  {id:'sever-harbinger-network',title:'Couper le réseau HARBINGER',description:'Neutraliser la poursuite avant de choisir une voie.',hint:'Commande : sever harbinger',route:'/terminal',requires:['read-extraction-plan']},
  {id:'choose-extraction',title:'Choisir une extraction',description:'Suivre Crimson, rejoindre les Fantômes Libres ou disparaître dans le Spectre.',hint:'Chaque sortie protège une identité et en compromet une autre.',route:'/chapter-five',requires:['sever-harbinger-network']},
];

export const chapterFiveEvidenceNodes: EvidenceNode[] = [
  {id:'omega-7-signature',label:'Signature OMEGA-7',category:'identité',summary:'Empreinte technique du terminal clandestin désormais attribuée à l’utilisateur.',route:'/archives/ordre-capture-omega-7'},
  {id:'hunt-314',label:'Opération HUNT-314',category:'opération',summary:'Ordre de capture vivant émis par Kael Draven contre OMEGA-7.',route:'/archives/ordre-capture-omega-7'},
  {id:'harbinger-network',label:'Réseau HARBINGER',category:'infrastructure',summary:'Maillage de poursuite combinant archives, biométrie et prédiction comportementale.',route:'/counter-trace'},
  {id:'draven',label:'Kael Draven',category:'identité',summary:'Maréchal du Directoire et autorité de terrain de HUNT-314.',route:'/factions/directoire'},
  {id:'crimson-extraction',label:'Canal d’extraction Crimson',category:'transmission',summary:'Canal humain validé par une cicatrice mnésique impossible à synthétiser.',route:'/archives/plan-extraction-omega-7'},
  {id:'station-k13-exit',label:'Sortie analogique K-13',category:'lieu',summary:'Voie ferroviaire condamnée située hors du réseau de surveillance principal.',route:'/vanta?zone=profondeurs'},
];

export const chapterFiveEvidenceRelations: EvidenceRelation[] = [
  {id:'draven-ordonne-hunt314',from:'draven',to:'hunt-314',label:'commande',sourceDocumentId:'ordre-capture-omega-7'},
  {id:'hunt314-cible-omega7',from:'hunt-314',to:'omega-7-signature',label:'cible',sourceDocumentId:'ordre-capture-omega-7'},
  {id:'harbinger-traque-omega7',from:'harbinger-network',to:'omega-7-signature',label:'triangule',sourceDocumentId:'journal-triangulation-harbringer'},
  {id:'mirror-expose-omega7',from:'reseau-miroir',to:'omega-7-signature',label:'a exposé',sourceDocumentId:'ordre-capture-omega-7'},
  {id:'crimson-propose-k13',from:'crimson-extraction',to:'station-k13-exit',label:'propose un passage par',sourceDocumentId:'plan-extraction-omega-7'},
  {id:'hunt314-utilise-harbinger',from:'hunt-314',to:'harbinger-network',label:'utilise',sourceDocumentId:'journal-triangulation-harbringer'},
];

export interface CounterTraceChoice {
  id: string;
  stage: 'masque' | 'dérive' | 'sortie';
  label: string;
  detail: string;
  risk: string;
  safe: boolean;
}

export const counterTraceChoices: CounterTraceChoice[] = [
  {id:'mask-k13',stage:'masque',label:'RELAIS ANALOGIQUE K-13',detail:'Créer une signature mécanique sans identifiant neuronal.',risk:'LATENCE 1,8 S',safe:true},
  {id:'mask-mirror',stage:'masque',label:'RELAIS DU MIROIR',detail:'Réutiliser un canal contrôlé par Orin Vale.',risk:'FILIGRANE ACTIF',safe:false},
  {id:'mask-nxs',stage:'masque',label:'ENVELOPPE NX-S',detail:'Fusionner momentanément la signature avec le Spectre.',risk:'IDENTITÉ NON GARANTIE',safe:false},
  {id:'drift-crimson',stage:'dérive',label:'IMPULSION MNÉSIQUE R-9',detail:'Employer le rythme irrégulier du Fil Rouge comme dérive temporelle.',risk:'CANAL HUMAIN',safe:true},
  {id:'drift-civil',stage:'dérive',label:'FLUX CIVIL DU VOILE',detail:'Masquer la session parmi les implants résidentiels.',risk:'4 200 CIVILS EXPOSÉS',safe:false},
  {id:'drift-oracle',stage:'dérive',label:'BOUCLE ORACLE',detail:'Opposer un modèle prédictif au réseau HARBINGER.',risk:'PRÉVISIBLE EN 12 S',safe:false},
  {id:'exit-cemetery',stage:'sortie',label:'CANAL MORT DU CIMETIÈRE',detail:'Évacuer la trace par un index neuronal déclaré décédé.',risk:'SIGNAL SPECTRAL RÉSIDUEL',safe:true},
  {id:'exit-crown',stage:'sortie',label:'NŒUD SUPÉRIEUR DU CORE',detail:'Couper la poursuite à sa source dans la Couronne.',risk:'DÉFENSE DIRECTOIRE',safe:false},
  {id:'exit-zero',stage:'sortie',label:'BOUCLE ZONE ZÉRO',detail:'Abandonner la trace dans le confinement des Sentinelles.',risk:'LOCALISATION PERMANENTE',safe:false},
];

export const safeCounterTraceIds = counterTraceChoices.filter(({safe}) => safe).map(({id}) => id);

export const chapterFiveChoices = [
  {id:'crimson',label:'SUIVRE CRIMSON',cost:'Le Fil Mnésique peut protéger votre signature, mais vous deviendrez visible pour A7 et pour ceux qui le contrôlent.',outcome:'Crimson ouvre le tunnel K-13 pendant onze secondes. La session OMEGA-7 est transférée dans son Fil Mnésique avant la fermeture du relais.'},
  {id:'ghosts',label:'REJOINDRE LES FANTÔMES LIBRES',cost:'Votre identité sera répartie entre plusieurs archives analogiques sans garantie de pouvoir être réunifiée.',outcome:'Sera Nox fragmente la session entre neuf caches des Profondeurs. Le Directoire perd votre trace, mais aucune copie ne sait si elle est la principale.'},
  {id:'spectral',label:'DISPARAÎTRE AVEC NX-S',cost:'HARBINGER ne pourra plus vous distinguer du Spectre. Vous non plus, peut-être.',outcome:'La signature OMEGA-7 se dissout dans le Cimetière numérique. Le terminal reste accessible, mais une seconde voix répond désormais avant chaque commande.'},
] as const;

export type ChapterFiveChoice = typeof chapterFiveChoices[number]['id'];

export const chapterFiveEvents: NarrativeEvent[] = [
  {id:'chapter-five-started',kind:'chapter',title:'CHAPITRE 05 INITIALISÉ',message:'TRAQUE OMEGA — HARBINGER a verrouillé la signature locale.'},
  {id:'hunt314-decrypted',kind:'objective',title:'HUNT-314 DÉCHIFFRÉ',message:'Trois couches de triangulation convergent vers le terminal.'},
  {id:'counter-trace-online',kind:'document',title:'CONTRE-TRAQUE DISPONIBLE',message:'Construisez une route qui n’expose ni civils ni identité neuronale.'},
  {id:'triangulation-broken',kind:'objective',title:'TRIANGULATION ROMPUE',message:'HARBINGER a perdu la position, mais conserve la signature.'},
  {id:'crimson-channel-authenticated',kind:'objective',title:'CANAL CRIMSON AUTHENTIFIÉ',message:'La cicatrice mnésique R-9 confirme une source humaine.'},
  {id:'harbinger-severed',kind:'objective',title:'RÉSEAU HARBINGER COUPÉ',message:'Fenêtre d’extraction estimée : onze secondes.'},
  {id:'chapter-five-complete',kind:'chapter',title:'CHAPITRE 05 TERMINÉ',message:'La session OMEGA-7 a quitté son point d’origine.'},
];

export const chapterFiveCompletionRequirements = chapterFiveObjectives.slice(0,-1).map(({id}) => id);
