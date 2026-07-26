import type { ArchiveDocument } from '../types';

export const archiveDocuments: ArchiveDocument[] = [
  {
    id: 'rapport-nuit-zero', title: 'RAPPORT D’INCIDENT — NUIT ZÉRO', code: 'DIR-Z0-001',
    classification: 'CIVIL', category: 'incident', date: '1 P.Z. // 08:40', issuer: 'Directoire NEXUS',
    author: 'Bureau de stabilité civile', status: 'PUBLIÉ — RÉVISION 04',
    summary: 'Version publique de la destruction de Zone Zéro. Plusieurs incohérences restent visibles.', chapterId: 'chapter-zero',
    terminalCodes: ['Z-2219'],
    pages: [
      { id: 'official-summary', title: 'Synthèse officielle', blocks: [
        { type: 'warning', title: 'COMMUNIQUÉ PUBLIC', text: 'Toute reproduction non autorisée constitue une atteinte à la stabilité civile.' },
        { type: 'heading', text: 'OBJET DE L’INCIDENT' },
        { type: 'paragraph', text: 'À 21 h 41, une cellule terroriste a attaqué le réacteur expérimental de Zone Zéro. La rupture énergétique a rendu toute évacuation impossible.' },
        { type: 'metadata', entries: [
          { label: 'CAUSE', value: 'Attaque terroriste' }, { label: 'VICTIMES CONFIRMÉES', value: '8 400' },
          { label: 'OPÉRATEUR A7', value: 'Disparu pendant l’incident' }, { label: 'RÉACTEUR', value: 'Détruit à 21 h 17' },
        ] },
        { type: 'quote', text: 'Le Directoire a contenu une attaque visant la continuité de VANTA.', source: 'Archonte Elara Voss' },
      ] },
      { id: 'official-timeline', title: 'Chronologie publiée', blocks: [
        { type: 'heading', text: 'SÉQUENCE DES ÉVÉNEMENTS' },
        { type: 'table', headers: ['HEURE', 'ÉVÉNEMENT', 'STATUT'], rows: [
          ['21:17', 'Rupture du réacteur', 'CONFIRMÉ'], ['21:23', 'Ordre d’évacuation', 'ÉCHEC'],
          ['21:41', 'Attaque revendiquée', 'SOURCE ABSENTE'], ['22:19', 'Perte du signal A7', 'CONFIRMÉ'], ['23:02', 'Zone neutralisée', 'CONFIRMÉ'],
        ] },
        { type: 'warning', title: 'ANOMALIE TEMPORELLE', text: 'Le réacteur est déclaré détruit vingt-quatre minutes avant le début officiel de l’attaque.' },
        { type: 'redacted', text: 'Activation du Projet Continuité autorisée.', revealSecret: 'contradiction-zero' },
      ] },
      { id: 'missing-page', title: 'Page 03 — récupération partielle', blocks: [
        { type: 'system-log', lines: ['PAGE 03/04 : ABSENTE', 'INDEX DE RÉCUPÉRATION : Z-2219', 'SIGNATURE DE VALIDATION : 1 P.Z. // 03:12', 'SIGNATAIRE : ELARA_VOSS'] },
        { type: 'clue', clueId: 'clue-z-2219', label: 'CODE INTERNE DÉTECTÉ', text: 'Z-2219 — référence absente de l’index public. Ce code peut être soumis au terminal.' },
        { type: 'evidence', nodeId: 'nuit-zero', title: 'PREUVE ENREGISTRABLE', text: 'Le rapport public a été validé après la disparition des témoins et contient une page manquante.' },
      ] },
      { id: 'validation', title: 'Validation et annexes', blocks: [
        { type: 'metadata', entries: [
          { label: 'PUBLICATION', value: '1 P.Z. // 08:40' }, { label: 'VALIDATION', value: '1 P.Z. // 03:12' },
          { label: 'DOSSIER SOURCE', value: 'CONTINUITÉ / Z-2219' }, { label: 'INTÉGRITÉ', value: '72 %' },
        ] },
        { type: 'paragraph', text: 'La validation précède la publication, mais la signature biométrique utilisée appartient à une session ouverte après la fermeture du secteur.' },
      ] },
    ],
    attachments: [
      { id: 'zone-zero-public', label: 'Capture publique de Zone Zéro', type: 'IMAGE // EMPLACEMENT RÉSERVÉ', status: 'CORROMPUE' },
      { id: 'evacuation-map', label: 'Plan d’évacuation civil', type: 'CARTE', status: 'PAGE MANQUANTE' },
    ],
    references: [
      { type: 'location', id: 'zero', label: 'Zone Zéro', route: '/vanta?zone=zero' },
      { type: 'operator', id: 'a7', label: 'Dossier A7', route: '/operators/a7' },
      { type: 'timeline', id: 'nuit-zero', label: 'Chronologie Nuit Zéro', route: '/timeline' },
    ],
    onOpenEffects: [
      { type: 'unlock-secret', id: 'clue-z-2219' }, { type: 'discover-clue', id: 'clue-z-2219' },
      { type: 'complete-objective', id: 'view-official-zero-report' }, { type: 'add-evidence-node', id: 'nuit-zero' },
      { type: 'add-evidence-node', id: 'zone-zero' }, { type: 'add-evidence-node', id: 'directoire' },
      { type: 'narrative-event', id: 'clue-discovered-z-2219' },
    ],
    comparison: {
      id: 'zero-official-classified', officialTitle: 'VERSION OFFICIELLE', classifiedTitle: 'VERSION CLASSIFIÉE',
      summary: 'Cinq contradictions majeures démontrent que le rapport public a été construit pour masquer le Projet Continuité.',
      requirement: { type: 'objective', value: 'read-restoration-log' },
      differences: [
        { id: 'cause', label: 'CAUSE', official: 'Attaque terroriste contre un réacteur.', classified: 'Activation autorisée du Projet Continuité.', evidenceNodeId: 'projet-continuite', evidenceRelationId: 'nuit-zero-dissimulee-directoire' },
        { id: 'reactor', label: 'INSTALLATION', official: 'Réacteur expérimental détruit.', classified: 'Centre de synchronisation activé.' },
        { id: 'a7', label: 'A7', official: 'Mort pendant l’incident.', classified: 'Utilisé comme ancre biologique.' , evidenceRelationId: 'a7-ancre-continuite'},
        { id: 'crimson', label: 'CRIMSON', official: 'Absente des opérations.', classified: 'Responsable de l’arrêt puis de la restauration.', evidenceRelationId: 'crimson-restaure-a7' },
        { id: 'victims', label: 'BILAN', official: '8 400 victimes confirmées.', classified: '63 218 morts ou disparus.' },
      ],
      onRecordEffects: [
        { type: 'unlock-secret', id: 'contradiction-zero' }, { type: 'unlock-secret', id: 'access-progress-tactique' },
        { type: 'complete-objective', id: 'compare-zero-versions' }, { type: 'add-evidence-node', id: 'projet-continuite' },
        { type: 'add-evidence-relation', id: 'nuit-zero-dissimulee-directoire' }, { type: 'add-evidence-relation', id: 'a7-ancre-continuite' },
        { type: 'add-evidence-relation', id: 'crimson-restaure-a7' }, { type: 'narrative-event', id: 'contradictions-recorded' },
      ],
    },
  },
  {
    id: 'restauration-2224', title: 'JOURNAL DE RESTAURATION — 22:24', code: 'MED-R9-2224',
    classification: 'TACTIQUE', category: 'médical', date: 'ANNÉE 0 // 22:24–22:31', issuer: 'HELIX // Interface d’urgence',
    author: 'Session manuelle R-9', status: 'RÉCUPÉRÉ — NON AUTORISÉ', summary: 'Journal médical de la restauration externe du noyau A7.', chapterId: 'chapter-zero',
    requirements: [{ type: 'secret', value: 'document-restauration-2224' }],
    pages: [
      { id: 'clinical-log', title: 'État clinique', blocks: [
        { type: 'system-log', lines: ['22:19:07 — ACTIVITÉ NEURONALE NULLE', '22:24:18 — INTERFACE R-9 CONNECTÉE', '22:24:21 — AUTORISATION DIRECTOIRE : ABSENTE', '22:30:49 — RESTAURATION EXTERNE DÉTECTÉE', '22:31:02 — ACTIVITÉ NEURONALE RÉTABLIE'] },
        { type: 'warning', title: 'MORT CLINIQUE', text: 'Durée mesurée : onze minutes et quarante-deux secondes. La continuité identitaire ne peut être garantie.' },
      ] },
      { id: 'backups', title: 'Sauvegardes disponibles', blocks: [
        { type: 'table', headers: ['IMAGE', 'ÂGE', 'INTÉGRITÉ', 'SÉLECTION'], rows: [
          ['A7-RÉCENTE', '00:17:08', '91 %', 'REJETÉE PAR R-9'], ['A7-04', '4 A.Z.', '83 %', 'SÉLECTION MANUELLE'], ['A7-03', '9 A.Z.', '62 %', 'DISPONIBLE'], ['A7-ORIGINE', 'INCONNU', '14 %', 'VERROUILLÉE'],
        ] },
        { type: 'evidence', nodeId: 'restauration-2224', title: 'SÉLECTION VOLONTAIRE', text: 'R-9 a ignoré la sauvegarde la plus récente pour restaurer une version antérieure d’A7.' },
        { type: 'quote', text: 'Crimson t’a tué. Crimson t’a sauvé. Les deux sont vrais.', source: 'Annotation non signée' },
      ] },
      { id: 'mnemonic-thread', title: 'Interface R-9', blocks: [
        { type: 'paragraph', text: 'Le Fil Mnésique a servi de pont biologique. Des souvenirs de R-9 ont été copiés dans le noyau A7 pendant la reprise.' },
        { type: 'metadata', entries: [{ label: 'COMMANDE', value: 'MANUELLE R-9' }, { label: 'SAUVEGARDE', value: 'A7-04' }, { label: 'COÛT', value: 'PERTE MNÉSIQUE 17 %' }] },
        { type: 'transmission', sender: 'CRIMSON', text: 'Ne crois pas tout ce que les archives disent sur A7. Ne crois pas non plus tout ce qu’il dit sur lui-même.' },
      ] },
    ],
    attachments: [{ id: 'a7-medical', label: 'Schéma médical du noyau A7', type: 'SCHÉMA // EMPLACEMENT RÉSERVÉ', status: 'DISPONIBLE' }],
    references: [
      { type: 'operator', id: 'a7', label: 'Dossier A7', route: '/operators/a7' },
      { type: 'operator', id: 'crimson', label: 'Dossier Crimson', route: '/operators/crimson' },
      { type: 'archive', id: 'ordre-execution-a7', label: 'Ordre d’exécution', route: '/archives/ordre-execution-a7' },
    ],
    onOpenEffects: [
      { type: 'unlock-secret', id: 'restauration-2224' }, { type: 'unlock-secret', id: 'transmission-crimson-02' },
      { type: 'complete-objective', id: 'read-restoration-log' }, { type: 'add-evidence-node', id: 'a7' },
      { type: 'add-evidence-node', id: 'crimson' }, { type: 'add-evidence-node', id: 'fil-mnesique' },
      { type: 'add-evidence-node', id: 'restauration-2224' }, { type: 'add-evidence-relation', id: 'crimson-execute-a7' },
      { type: 'add-evidence-relation', id: 'crimson-restaure-a7' }, { type: 'narrative-event', id: 'restoration-log-read' },
    ],
  },
  {
    id: 'ordre-execution-a7', title: 'ORDRE D’EXÉCUTION — NX5-00-A7', code: 'DIR-EX-A7', classification: 'TACTIQUE',
    category: 'ordre', date: 'ANNÉE 0 // 22:19', issuer: 'Directoire NEXUS', author: 'ELARA_VOSS', status: 'ACTIF — PARTIELLEMENT CENSURÉ',
    summary: 'Ordre transmis à R-9 : interrompre A7 tout en préservant son noyau.', chapterId: 'chapter-zero',
    pages: [{ id: 'order', title: 'Directive', blocks: [
      { type: 'warning', title: 'ORDRE IMMÉDIAT', text: 'Neutraliser l’ancre NX5-00-A7 avant propagation de la synchronisation.' },
      { type: 'metadata', entries: [{ label: 'EXÉCUTRICE', value: 'NX5-01-R9' }, { label: 'CIBLE', value: 'NX5-00-A7' }, { label: 'NOYAU', value: 'À PRÉSERVER' }, { label: 'IDENTITÉ BIOLOGIQUE', value: 'NON PRIORITAIRE' }] },
      { type: 'redacted', text: 'Phrase d’arrêt : SEPTIÈME █████ REVIENS AU █████', revealSecret: 'phrase-arret-a7' },
    ] }],
    references: [{ type: 'operator', id: 'a7', label: 'A7', route: '/operators/a7' }, { type: 'operator', id: 'crimson', label: 'Crimson', route: '/operators/crimson' }],
  },
  {
    id: 'protocole-fil-rouge', title: 'PROGRAMME R — FIL ROUGE', code: 'HELIX-R9', classification: 'OMEGA', category: 'programme',
    date: '4 A.Z.', issuer: 'HELIX Biodyne', status: 'VERROUILLÉ', summary: 'Création d’une mémoire impossible à supprimer.',
    pages: [{ id: 'program', title: 'Programme R', blocks: [{ type: 'paragraph', text: 'Les fibres neuroconductrices enregistrent souvenirs, émotions, effacements et paramètres biométriques.' }, { type: 'redacted', text: 'R-9 désigne la neuvième reconstruction.', revealSecret: 'r9' }] }],
  },
  {
    id: 'dossier-sept-corps', title: 'DOSSIER DES SEPT CORPS', code: 'A7-SEPT', classification: 'TACTIQUE', category: 'identité',
    date: 'INCOHÉRENTE', issuer: 'Archiviste des Absents', status: 'OUVERTURE PARTIELLE', summary: 'Sept signatures neuronales revendiquent le matricule A7.',
    requirements: [{ type: 'chapter', value: 'chapter-zero' }],
    pages: [{ id: 'signatures', title: 'Index des signatures', blocks: [{ type: 'system-log', lines: ['A7-01 — DÉTRUITE', 'A7-02 — ABSENTE', 'A7-03 — ARCHIVÉE', 'A7-04 — ACTIVE', 'A7-05 — CORROMPUE', 'A7-06 — INCONNUE', 'A7-07 — VOUS REGARDE'] }, { type: 'redacted', text: 'Origine biologique commune : aucune.', revealSecret: 'seven-bodies-origin' }] }],
  },
  {
    id: 'message-future-crimson', title: 'MESSAGE À LA PROCHAINE VERSION', code: 'R9-FUTURE', classification: 'TACTIQUE', category: 'transmission',
    date: 'HORODATAGE IMPOSSIBLE', issuer: 'R-9', status: 'RÉCUPÉRÉ', summary: 'Message d’une version antérieure de Crimson.',
    requirements: [{ type: 'secret', value: 'message-future-crimson' }],
    pages: [{ id: 'message', title: 'Transmission personnelle', blocks: [{ type: 'transmission', sender: 'CRIMSON // VERSION ANTÉRIEURE', text: 'Tu ne te souviens probablement pas de moi. C’est normal. Je suis toi. A7 ne doit pas être restauré depuis la sauvegarde la plus récente. Ne demande pas pourquoi avant d’avoir retrouvé le dossier des Sept Corps. Et si le Spectre utilise ma voix, coupe la connexion.' }] }],
  },
  {
    id: 'liste-63218', title: 'LISTE DES 63 218', code: 'Z0-CASUALTIES', classification: 'NOIR ABSOLU', category: 'registre', date: 'ANNÉE 0', issuer: 'Sentinelles de Cendre', status: 'SCELLÉ', summary: 'Les noms ont été remplacés par des signatures neuronales.', pages: [{ id: 'index', title: 'Registre', blocks: [{ type: 'redacted', text: '63 218 identités indexées.', revealSecret: 'victims-list' }] }],
  },
  {
    id: 'projet-ascendant', title: 'PROJET ASCENDANT', code: 'NX6-OMEGA', classification: 'NOIR ABSOLU', category: 'programme', date: '6 P.Z.', issuer: 'Directoire NEXUS', status: 'SCELLÉ', summary: 'Un corps destiné à une conscience collective.', pages: [{ id: 'abstract', title: 'Résumé', blocks: [{ type: 'redacted', text: 'Hôte collectif en attente.', revealSecret: 'ascendant' }] }],
  },
  {
    id: 'verite-originale', title: 'VÉRITÉ ORIGINALE', code: 'MIRROR-00', classification: 'NOIR ABSOLU', category: 'incident', date: 'INCONNUE', issuer: 'Ordre du Miroir', status: 'SCELLÉ', summary: 'Une version antérieure à toutes les versions officielles.', pages: [{ id: 'truth', title: 'Archive', blocks: [{ type: 'redacted', text: 'La vérité originale a été remplacée avant la Nuit Zéro.', revealSecret: 'original-truth' }] }],
  },
  {
    id: 'enfant-cimetiere', title: 'ENFANT DU CIMETIÈRE', code: 'ECHO-CHILD', classification: 'NOIR ABSOLU', category: 'identité', date: '29 A.Z.', issuer: 'Chœur Zéro', status: 'SCELLÉ', summary: 'Une voix sans dossier répond depuis le noyau A7.', pages: [{ id: 'voice', title: 'Voix', blocks: [{ type: 'redacted', text: 'Je me souviens de la neige.', revealSecret: 'enfant-cimetiere' }] }],
  },
];
