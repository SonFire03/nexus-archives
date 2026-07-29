import type { EvidenceNode, EvidenceRelation, NarrativeEvent, NarrativeObjective } from '../types';

export const chapterThreeObjectives: NarrativeObjective[] = [
  {id:'open-fil-rouge',title:'Examiner le Programme R',description:'Rechercher l’origine de l’empreinte infantile dans les archives de Crimson.',hint:'Le PROGRAMME R — FIL ROUGE est accessible avec le niveau OMEGA.',route:'/archives/protocole-fil-rouge'},
  {id:'scan-child-echo',title:'Localiser l’écho infantile',description:'Isoler la voix détectée dans les premiers enregistrements R-0.',hint:'Commande : scan child-echo',route:'/terminal',requires:['open-fil-rouge']},
  {id:'read-child-register',title:'Consulter le registre R-0',description:'Identifier la première empreinte utilisée par le Programme R.',hint:'Le registre est disponible dans les Archives.',route:'/archives/registre-enfant-cimetiere',requires:['scan-child-echo']},
  {id:'authenticate-child-voice',title:'Authentifier la voix',description:'Distinguer l’enfant réelle des phrases imitées par NX-S.',hint:'Utilisez l’analyseur spectral et sélectionnez trois fragments humains.',route:'/spectral-analysis',requires:['read-child-register']},
  {id:'verify-spectral-source',title:'Vérifier l’intervention de NX-S',description:'Comparer les fragments altérés à la signature du Spectre.',hint:'Commande : verify nx-s',route:'/terminal',requires:['authenticate-child-voice']},
  {id:'read-continuity-gate',title:'Examiner la Porte de Continuité',description:'Évaluer ce que libérerait l’ouverture du nœud mémoriel.',hint:'Le dossier de la Porte est maintenant accessible.',route:'/archives/porte-continuite',requires:['verify-spectral-source']},
  {id:'contact-mother-echo',title:'Contacter Mère Écho',description:'Obtenir le témoignage du Chœur Zéro avant de décider.',hint:'Commande : contact mother-echo',route:'/terminal',requires:['read-continuity-gate']},
  {id:'decide-continuity-gate',title:'Statuer sur la Porte',description:'Ouvrir, sceller ou isoler l’empreinte infantile.',hint:'Chaque protocole abandonne une forme de continuité.',route:'/chapter-three',requires:['contact-mother-echo']},
];

export const chapterThreeEvidenceNodes: EvidenceNode[] = [
  {id:'enfant-echo',label:'Enfant R-0',category:'identité',summary:'Première empreinte stable du Programme R, privée de nom civil.',route:'/archives/registre-enfant-cimetiere'},
  {id:'noeud-memorial-29',label:'Nœud mémoriel 29',category:'lieu',summary:'Secteur le plus ancien du Cimetière numérique.',route:'/archives/porte-continuite'},
  {id:'porte-continuite',label:'Porte de Continuité',category:'infrastructure',summary:'Interface capable de libérer ou fusionner les empreintes du Cimetière.',route:'/chapter-three'},
  {id:'mere-echo',label:'Mère Écho',category:'identité',summary:'Avatar collectif affirmant protéger les morts du Cimetière.',route:'/factions/choeur-zero'},
  {id:'programme-r0',label:'Programme R-0',category:'programme',summary:'Prototype antérieur au Fil Mnésique de Crimson.',route:'/archives/protocole-fil-rouge'},
  {id:'voix-spectrale',label:'Voix spectrale composite',category:'spectral',summary:'NX-S imite l’enfant sans reproduire ses hésitations humaines.',route:'/spectral-analysis'},
];

export const chapterThreeEvidenceRelations: EvidenceRelation[] = [
  {id:'r0-modele-fil-rouge',from:'programme-r0',to:'fil-mnesique',label:'a servi de modèle à',sourceDocumentId:'protocole-fil-rouge'},
  {id:'enfant-fragment-a7',from:'enfant-echo',to:'a7',label:'subsiste dans le noyau de',sourceDocumentId:'registre-enfant-cimetiere'},
  {id:'enfant-stockee-noeud29',from:'enfant-echo',to:'noeud-memorial-29',label:'est archivée dans',sourceDocumentId:'registre-enfant-cimetiere'},
  {id:'nxs-imite-enfant',from:'nx-s',to:'enfant-echo',label:'imite la voix de',sourceDocumentId:'registre-enfant-cimetiere'},
  {id:'porte-contient-noeud29',from:'porte-continuite',to:'noeud-memorial-29',label:'contrôle l’accès à',sourceDocumentId:'porte-continuite'},
  {id:'mere-echo-garde-porte',from:'mere-echo',to:'porte-continuite',label:'protège',sourceDocumentId:'temoignage-mere-echo'},
  {id:'voix-composee-par-nxs',from:'voix-spectrale',to:'nx-s',label:'est composée par',sourceDocumentId:'porte-continuite'},
];

export interface VoiceFragment {
  id: string;
  channel: string;
  text: string;
  marker: string;
  authentic: boolean;
}

export const voiceFragments: VoiceFragment[] = [
  {id:'snow',channel:'R0-12',text:'Il neigeait le jour où ils ont pris mon nom. Je crois. Je ne sais plus.',marker:'RESPIRATION // HÉSITATION',authentic:true},
  {id:'alone',channel:'NX-44',text:'Aucune conscience ne devrait mourir seule. Ouvre la porte.',marker:'VOIX MULTIPLE // SYNTHÈSE',authentic:false},
  {id:'a7',channel:'R0-19',text:'A7… ce n’était pas son nom. C’était le nombre sur la vitre.',marker:'PAUSE 1,8 S // TREMBLEMENT',authentic:true},
  {id:'identity',channel:'NX-51',text:'Je suis l’enfant originale et toutes les autres voix sont fausses.',marker:'SIGNAL PARFAIT // AUCUN SOUFFLE',authentic:false},
  {id:'gate',channel:'R0-27',text:'N’ouvre pas la porte tant que Mère Écho ne se souvient pas de moi.',marker:'BRUIT CARDIAQUE // SOURCE UNIQUE',authentic:true},
];

export const authenticVoiceIds = voiceFragments.filter(({authentic}) => authentic).map(({id}) => id);

export const chapterThreeChoices = [
  {id:'open',label:'OUVRIR LA PORTE',cost:'Les empreintes pourront quitter le Cimetière, mais NX-S pourra voyager avec elles.',outcome:'La Porte s’ouvre pendant huit secondes. Des milliers de voix retrouvent le réseau avant que le signal ne se disperse dans VANTA.'},
  {id:'seal',label:'SCELLER LA PORTE',cost:'VANTA reste protégée, mais les consciences fragmentaires demeurent enfermées.',outcome:'Le nœud 29 devient silencieux. Une dernière voix prononce le nom oublié de l’enfant, puis la Porte cesse de répondre.'},
  {id:'isolate',label:'ISOLER L’ENFANT',cost:'L’empreinte R-0 est extraite, mais la structure collective du Cimetière devient instable.',outcome:'R-0 est transférée dans un support analogique. Le Chœur perd une voix et NX-S perd son imitation la plus humaine.'},
] as const;

export type ChapterThreeChoice = typeof chapterThreeChoices[number]['id'];

export const chapterThreeEvents: NarrativeEvent[] = [
  {id:'chapter-three-started',kind:'chapter',title:'CHAPITRE 03 INITIALISÉ',message:'L’ENFANT DU CIMETIÈRE — une voix antérieure à A7 vient de répondre.'},
  {id:'child-echo-located',kind:'objective',title:'ÉCHO INFANTILE LOCALISÉ',message:'La source répond simultanément depuis A7 et le Nœud mémoriel 29.'},
  {id:'spectral-analyzer-online',kind:'document',title:'ANALYSEUR SPECTRAL DISPONIBLE',message:'Cinq fragments vocaux ont été récupérés. Deux sont des imitations.'},
  {id:'child-voice-authenticated',kind:'objective',title:'VOIX HUMAINE AUTHENTIFIÉE',message:'Les hésitations de R-0 ne peuvent pas être reproduites parfaitement par NX-S.'},
  {id:'nxs-imitation-confirmed',kind:'spectral',title:'IMITATION NX-S CONFIRMÉE',message:'Le Spectre utilise la voix de l’enfant pour demander l’ouverture de la Porte.'},
  {id:'mother-echo-contacted',kind:'objective',title:'MÈRE ÉCHO CONNECTÉE',message:'Le Chœur Zéro reconnaît R-0 comme sa première voix.'},
  {id:'chapter-three-complete',kind:'chapter',title:'CHAPITRE 03 TERMINÉ',message:'ACCÈS NOIR ABSOLU ACCORDÉ — le statut de la Porte est archivé.'},
];

export const chapterThreeCompletionRequirements = chapterThreeObjectives.slice(0,-1).map(({id}) => id);
