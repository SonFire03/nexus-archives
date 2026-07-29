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
    date: '4 A.Z.', issuer: 'HELIX Biodyne', status: 'OUVERTURE OMEGA', summary: 'Création d’une mémoire impossible à supprimer.', chapterId:'chapter-three',
    pages: [
      { id: 'program', title: 'Programme R', blocks: [{ type: 'paragraph', text: 'Les fibres neuroconductrices enregistrent souvenirs, émotions, effacements et paramètres biométriques.' }, { type: 'redacted', text: 'R-9 désigne la neuvième reconstruction.', revealSecret: 'r9' }] },
      { id:'prototype-r0',title:'Prototype R-0',blocks:[
        {type:'warning',title:'SUJET PÉDIATRIQUE',text:'La première empreinte stable a été prélevée avant la création officielle du Programme R. Aucun consentement n’est archivé.'},
        {type:'metadata',entries:[{label:'SUJET',value:'R-0 // NOM EFFACÉ'},{label:'ÂGE ESTIMÉ',value:'8 À 10 ANS'},{label:'DESTINATION',value:'NŒUD MÉMORIEL 29'},{label:'RÉSULTAT',value:'MODÈLE MNÉSIQUE STABLE'}]},
        {type:'clue',clueId:'clue-child-echo',label:'ÉCHO ENCORE ACTIF',text:'Une copie de R-0 répond dans le noyau A7. Commande suggérée : scan child-echo.'},
        {type:'evidence',nodeId:'programme-r0',title:'ORIGINE DU FIL ROUGE',text:'La résistance mémorielle de Crimson dérive d’une empreinte infantile plus ancienne.'},
      ]},
      {id:'inheritance',title:'Héritage neuronal',blocks:[
        {type:'paragraph',text:'Les architectures A7 et R-9 ont reçu des structures mnésiques dérivées de R-0. Elles n’ont pas reçu ses souvenirs complets, seulement sa capacité à résister à l’effacement.'},
        {type:'system-log',lines:['R-0 → MATRICE DE PERSISTANCE','MATRICE → FIL MNÉSIQUE R-9','MATRICE → ANCRE A7','R-0 → TRANSFERT CIMETIÈRE // INCOMPLET'],spectral:true},
      ]},
    ],
    references:[{type:'operator',id:'crimson',label:'Crimson / R-9',route:'/operators/crimson'},{type:'operator',id:'a7',label:'A7',route:'/operators/a7'},{type:'location',id:'cimetiere',label:'Cimetière numérique',route:'/vanta?zone=cimetiere'}],
    onOpenEffects:[
      {type:'activate-chapter',id:'chapter-three'},{type:'complete-objective',id:'open-fil-rouge'},
      {type:'discover-clue',id:'clue-child-echo'},{type:'add-evidence-node',id:'programme-r0'},
      {type:'add-evidence-relation',id:'r0-modele-fil-rouge'},{type:'narrative-event',id:'chapter-three-started'},
    ],
  },
  {
    id: 'dossier-sept-corps', title: 'DOSSIER DES SEPT CORPS', code: 'A7-SEPT', classification: 'TACTIQUE', category: 'identité',
    date: 'INCOHÉRENTE', issuer: 'Archiviste des Absents', status: 'OUVERTURE PARTIELLE', summary: 'Sept signatures neuronales revendiquent le matricule A7.', chapterId: 'chapter-two',
    requirements: [{ type: 'chapter', value: 'chapter-zero' }],
    terminalCodes: ['A7-03'],
    pages: [
      { id: 'signatures', title: 'Index des signatures', blocks: [
        { type: 'warning', title: 'CONTINUITÉ IDENTITAIRE NON GARANTIE', text: 'Les sept entrées partagent des réflexes et des souvenirs, mais aucune origine biologique commune.' },
        { type: 'system-log', lines: ['A7-01 — DÉTRUITE', 'A7-02 — ABSENTE', 'A7-03 — ARCHIVÉE // ÉMISSION RÉSIDUELLE', 'A7-04 — ACTIVE', 'A7-05 — CORROMPUE', 'A7-06 — INCONNUE', 'A7-07 — VOUS REGARDE'] },
        { type: 'clue', clueId: 'clue-signature-a7-03', label: 'SIGNATURE INTERROGEABLE', text: 'A7-03 possède encore un canal de réponse. Commande suggérée : scan signature a7-03.' },
      ] },
      { id: 'compatibility', title: 'Matrice de compatibilité', blocks: [
        { type: 'table', headers: ['SIGNATURE','CORPS ASSOCIÉ','MÉMOIRE COMMUNE','LOCALISATION'], rows: [
          ['A7-01','DÉTRUIT','31 %','ZONE ZÉRO'],['A7-02','INCONNU','44 %','AUCUNE'],['A7-03','A7-04','83 %','K-13 / RELAIS HELIX'],['A7-04','ACTUEL','91 %','INSTABLE'],['A7-05','SYNTHÉTIQUE','56 %','CIMETIÈRE'],['A7-06','NON INDEXÉ','12 %','INCONNUE'],['A7-07','TERMINAL LOCAL','—','PRÉSENTE'],
        ] },
        { type: 'evidence', nodeId: 'signature-a7-03', title: 'ÉMISSION RÉSIDUELLE', text: 'La signature classée archivée continue de répondre depuis une infrastructure HELIX.' },
      ] },
      { id: 'origin', title: 'Hypothèse d’origine', blocks: [
        { type: 'paragraph', text: 'Les signatures ne sont pas des copies successives d’un même cerveau. Elles semblent avoir été assemblées autour d’un protocole comportemental partagé.' },
        { type: 'redacted', text: 'Origine biologique commune : aucune. Premier modèle : sujet pédiatrique non identifié.', revealSecret: 'seven-bodies-origin' },
        { type: 'quote', text: 'Un nom peut survivre à son propriétaire. Cela ne signifie pas qu’il lui appartient encore.', source: 'Sera Nox' },
      ] },
    ],
    references: [
      { type:'operator', id:'a7', label:'Dossier A7', route:'/operators/a7' },
      { type:'faction', id:'helix', label:'HELIX Biodyne', route:'/factions/helix' },
      { type:'archive', id:'restauration-2224', label:'Restauration 22:24', route:'/archives/restauration-2224' },
    ],
    onOpenEffects: [
      { type:'activate-chapter', id:'chapter-two' }, { type:'complete-objective', id:'open-seven-bodies' },
      { type:'discover-clue', id:'clue-signature-a7-03' }, { type:'add-evidence-node', id:'signature-a7-03' },
      { type:'add-evidence-node', id:'sept-corps' }, { type:'add-evidence-relation', id:'sept-corps-inclut-sauvegarde-04' },
      { type:'narrative-event', id:'chapter-two-started' },
    ],
  },
  {
    id:'registre-helix-k13', title:'REGISTRE HELIX — ANNEXE K-13', code:'HLX-K13-04', classification:'TACTIQUE', category:'laboratoire',
    date:'6 P.Z. // 04:17', issuer:'HELIX Biodyne', author:'Système de stase autonome', status:'RÉCUPÉRÉ — RELAIS ANALOGIQUE',
    summary:'Registre biologique d’une chambre effacée des inventaires HELIX.', chapterId:'chapter-two', terminalCodes:['MNEM-0417'],
    requirements:[{type:'secret',value:'document-registre-helix-k13'}],
    pages:[
      {id:'chamber',title:'Chambre biologique 04',blocks:[
        {type:'metadata',entries:[{label:'SUJET',value:'NX5-00 / CORPS 04'},{label:'ÉTAT',value:'VIABLE — STASE PROFONDE'},{label:'ACTIVITÉ CORTICALE',value:'0,7 %'},{label:'EMPREINTE ASSOCIÉE',value:'A7-03 / A7-04'}]},
        {type:'warning',title:'IDENTITÉ ABSENTE',text:'Le corps respire et réagit aux stimuli, mais aucune conscience stable ne contrôle l’activité neuronale.'},
        {type:'evidence',nodeId:'corps-a7-04',title:'CORPS VIABLE',text:'HELIX conserve un corps compatible avec la sauvegarde choisie par Crimson pendant la Nuit Zéro.'},
      ]},
      {id:'maintenance',title:'Journal de maintenance',blocks:[
        {type:'system-log',lines:['04:17:12 — INTRUSION MNÉSIQUE DÉTECTÉE','04:17:16 — SOURCE VOCALE NON INDEXÉE','04:17:21 — DIRECTIVE R-9 REÇUE','04:17:28 — PURGE DE L’INDEX ORDONNÉE','04:17:31 — QUATRE FRAGMENTS CONSERVÉS // MNEM-0417']},
        {type:'clue',clueId:'clue-mnem-0417',label:'SÉQUENCE FRAGMENTÉE',text:'Quatre fragments restent exploitables dans le reconstructeur mnésique.'},
      ]},
      {id:'ownership',title:'Propriété du sujet',blocks:[
        {type:'paragraph',text:'HELIX classe le Corps 04 comme matériel biologique vacant. Le Directoire le classe comme infrastructure militaire. Aucune entrée ne le considère comme une personne.'},
        {type:'quote',text:'La chair peut attendre. Une identité, beaucoup moins.',source:'Docteure Selene Arkh'},
      ]},
    ],
    attachments:[{id:'k13-chamber',label:'Schéma de la chambre 04',type:'SCHÉMA BIOMÉDICAL',status:'EMPLACEMENT VISUEL RÉSERVÉ'}],
    references:[{type:'faction',id:'helix',label:'HELIX Biodyne',route:'/factions/helix'},{type:'archive',id:'dossier-sept-corps',label:'Dossier des Sept Corps',route:'/archives/dossier-sept-corps'}],
    onOpenEffects:[
      {type:'complete-objective',id:'read-helix-register'},{type:'discover-clue',id:'clue-mnem-0417'},
      {type:'unlock-secret',id:'memory-reconstructor-0417'},{type:'add-evidence-node',id:'laboratoire-k13'},
      {type:'add-evidence-node',id:'helix-biodyne'},{type:'add-evidence-node',id:'corps-a7-04'},
      {type:'add-evidence-relation',id:'signature-03-emet-k13'},{type:'add-evidence-relation',id:'helix-maintient-corps-04'},
      {type:'narrative-event',id:'memory-reconstructor-online'},
    ],
  },
  {
    id:'memoire-source-a7-04', title:'MÉMOIRE SOURCE — A7-04', code:'MNEM-A7-0417', classification:'TACTIQUE', category:'identité',
    date:'6 P.Z. // RESTAURATION PARTIELLE', issuer:'Reconstructeur OMEGA', status:'INTÉGRITÉ 74 %',
    summary:'Comparaison entre l’A7 actif et la sauvegarde destinée au Corps 04.', chapterId:'chapter-two',
    requirements:[{type:'secret',value:'document-memoire-source-a7-04'}],
    pages:[
      {id:'restored-sequence',title:'Séquence 04:17',blocks:[
        {type:'system-log',lines:['04:17:12 — SIGNATURE ÉTRANGÈRE DANS LE NOYAU','04:17:16 — « NE LAISSE PAS LA PORTE S’OUVRIR »','04:17:21 — R-9 : PRÉSERVER LE CORPS 04','04:17:28 — HELIX : PURGE DE L’INDEX'],spectral:true},
        {type:'transmission',sender:'CRIMSON // SIGNATURE R-9 CONFIRMÉE',text:'Si A7-04 se réveille, il se souviendra d’une mission que l’A7 actuel n’a jamais vécue. Ne les laisse pas se synchroniser.'},
      ]},
      {id:'identity-delta',title:'Écarts identitaires',blocks:[
        {type:'table',headers:['PARAMÈTRE','A7 ACTUEL','A7-04'],rows:[['NUIT ZÉRO','FRAGMENTS INCOMPLETS','AUCUN SOUVENIR'],['CRIMSON','CONFIANCE INSTINCTIVE','HOSTILITÉ CONDITIONNÉE'],['NX-S','PRÉSENCE INTERNE','SIGNATURE ABSENTE'],['MISSION K-13','INCONNUE','OBJECTIF PRIORITAIRE']]},
        {type:'evidence',nodeId:'sauvegarde-a7-04',title:'IDENTITÉ DIVERGENTE',text:'A7-04 ne constitue ni une copie récente ni une origine vérifiable de l’A7 actif.'},
      ]},
    ],
    references:[{type:'operator',id:'a7',label:'A7 actuel',route:'/operators/a7'},{type:'operator',id:'crimson',label:'Crimson',route:'/operators/crimson'},{type:'archive',id:'registre-helix-k13',label:'Registre HELIX K-13',route:'/archives/registre-helix-k13'}],
    comparison:{
      id:'a7-current-a7-04',officialTitle:'A7 ACTUEL',classifiedTitle:'SAUVEGARDE A7-04',summary:'Les deux signatures revendiquent le même matricule, mais leurs souvenirs et leurs conditionnements sont incompatibles.',
      differences:[
        {id:'zero-memory',label:'NUIT ZÉRO',official:'Souvenirs fragmentaires de l’incident.',classified:'Aucun souvenir : la sauvegarde est antérieure.'},
        {id:'crimson-trust',label:'RELATION À CRIMSON',official:'Confiance persistante malgré les contradictions.',classified:'Hostilité implantée envers le Sujet R-9.'},
        {id:'spectral-presence',label:'PRÉSENCE NX-S',official:'Contamination spectrale active.',classified:'Aucune empreinte NX-S détectable.'},
        {id:'k13-mission',label:'MISSION K-13',official:'Aucune trace consciente.',classified:'Ordre prioritaire sans contenu récupérable.',evidenceNodeId:'memoire-0417',evidenceRelationId:'memoire-contredit-a7'},
      ],
      onRecordEffects:[
        {type:'complete-objective',id:'compare-a7-identities'},{type:'add-evidence-node',id:'sauvegarde-a7-04'},
        {type:'add-evidence-node',id:'memoire-0417'},{type:'add-evidence-relation',id:'memoire-contredit-a7'},
        {type:'add-evidence-relation',id:'crimson-protege-corps-04'},{type:'narrative-event',id:'crimson-memory-verified'},
      ],
    },
  },
  {
    id:'directive-corps-04', title:'DIRECTIVE DE DISPOSITION — CORPS 04', code:'OMEGA-C04', classification:'OMEGA', category:'ordre',
    date:'TEMPS LOCAL', issuer:'Terminal OMEGA-7', status:'DÉCISION REQUISE', summary:'Trois protocoles sont techniquement possibles. Aucun ne préserve toutes les identités.', chapterId:'chapter-two',
    requirements:[{type:'secret',value:'body-04-located'}],
    pages:[{id:'options',title:'Protocoles disponibles',blocks:[
      {type:'metadata',entries:[{label:'RÉVEIL',value:'DEUX A7 ACTIFS // RISQUE SPECTRAL'},{label:'ISOLEMENT',value:'STASE ANALOGIQUE // RISQUE HELIX'},{label:'EFFACEMENT',value:'CORPS VIABLE // EMPREINTE DÉTRUITE'}]},
      {type:'warning',title:'ABSENCE DE SOLUTION NEUTRE',text:'Toute décision impose un coût physique, mental ou identitaire. Le terminal archivera le choix localement.'},
      {type:'paragraph',text:'La décision doit être confirmée depuis la console du Chapitre 02. Une réinitialisation complète de la progression reste possible dans les réglages.'},
    ]}],
    references:[{type:'archive',id:'memoire-source-a7-04',label:'Mémoire source A7-04',route:'/archives/memoire-source-a7-04'}],
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
    id:'verite-originale',title:'VÉRITÉ ORIGINALE',code:'MIRROR-00',classification:'NOIR ABSOLU',category:'incident',date:'18 H AVANT NUIT ZÉRO',issuer:'Ordre du Miroir',author:'ORIN_VALE',status:'INTÉGRITÉ 43 %',summary:'Première couverture de la Nuit Zéro, validée avant que l’incident ne commence.',chapterId:'chapter-four',
    requirements:[{type:'chapter',value:'chapter-three'}],terminalCodes:['MIRROR-00'],
    pages:[
      {id:'premise',title:'Scénario préventif',blocks:[
        {type:'warning',title:'HORODATAGE IMPOSSIBLE',text:'Cette archive décrit une attaque terroriste dix-huit heures avant l’activation du Projet Continuité.'},
        {type:'metadata',entries:[{label:'CRÉATION',value:'J-1 // 03:17'},{label:'VALIDATION',value:'ORIN_VALE // 03:42'},{label:'INCIDENT',value:'J0 // 21:17'},{label:'DIFFUSION',value:'J+1 // 06:00'}]},
        {type:'clue',clueId:'clue-mirror-00',label:'CHECKSUM TRAÇABLE',text:'La somme MIRROR-00 subsiste dans toutes les versions suivantes. Commande suggérée : trace mirror-00.'},
      ]},
      {id:'scenario',title:'Version préparée',blocks:[
        {type:'paragraph',text:'Le texte prévoit une attaque contre un réacteur, une évacuation rendue impossible par les assaillants et la disparition héroïque d’une unité NEXUS.'},
        {type:'table',headers:['ÉLÉMENT','VERSION PRÉPARÉE','FAIT OBSERVÉ'],rows:[['CAUSE','ATTAQUE TERRORISTE','PROJET CONTINUITÉ'],['ÉVACUATION','SABOTÉE PAR L’ENNEMI','SCELLÉE PAR LE DIRECTOIRE'],['A7','MORT AU COMBAT','UTILISÉ COMME ANCRE'],['BILAN','8 400','63 218']]},
        {type:'evidence',nodeId:'mirror-00',title:'MENSONGE PRÉ-INCIDENT',text:'La couverture n’a pas été improvisée après la catastrophe. Elle faisait partie du protocole.'},
      ]},
      {id:'survival',title:'Origine de la copie',blocks:[
        {type:'system-log',lines:['PORTE OUVERTE → COPIE RÉSEAU DISTRIBUÉE','PORTE SCELLÉE → CACHE CHŒUR ZÉRO EXFILTRÉ','R-0 ISOLÉE → CHECKSUM ANALOGIQUE CONSERVÉ','SOURCE ACTUELLE → DÉTERMINÉE PAR PROTOCOLE LOCAL'],spectral:true},
        {type:'quote',text:'Une vérité originale n’est souvent que le premier mensonge à avoir reçu un numéro.',source:'Sera Nox'},
      ]},
    ],
    references:[{type:'faction',id:'ordre-miroir',label:'Ordre du Miroir',route:'/factions/ordre-miroir'},{type:'archive',id:'rapport-nuit-zero',label:'Rapport Nuit Zéro',route:'/archives/rapport-nuit-zero'}],
    onOpenEffects:[
      {type:'activate-chapter',id:'chapter-four'},{type:'complete-objective',id:'open-original-truth'},
      {type:'discover-clue',id:'clue-mirror-00'},{type:'add-evidence-node',id:'mirror-00'},
      {type:'add-evidence-relation',id:'mirror-00-anticipe-nuit-zero'},{type:'narrative-event',id:'chapter-four-started'},
    ],
  },
  {
    id:'registre-revisions-miroir',title:'REGISTRE DES RÉVISIONS — MIRROR',code:'MIRROR-LEDGER-17',classification:'NOIR ABSOLU',category:'registre',date:'J-1 À 6 P.Z.',issuer:'Bureau de stabilité civile',author:'Système VALE-PRIME',status:'17 VERSIONS RÉCUPÉRÉES',summary:'Historique cryptographique des récits successifs de la Nuit Zéro.',chapterId:'chapter-four',
    requirements:[{type:'secret',value:'document-registre-miroir'}],
    pages:[
      {id:'revisions',title:'Chaîne de révision',blocks:[
        {type:'system-log',lines:['V00 // J-1 03:17 — SCÉNARIO PRÉVENTIF','V03 // J0 23:48 — BILAN RÉDUIT','V08 // 1 P.Z. — RESPONSABILITÉ TERRORISTE','V12 // 2 P.Z. — A7 DÉCLARÉ MORT','V17 // 6 P.Z. — ARCHIVE OMEGA ACTIVE']},
        {type:'evidence',nodeId:'registre-miroir',title:'CONTINUITÉ DES MODIFICATIONS',text:'Chaque version conserve le checksum d’Orin Vale malgré le remplacement du contenu.'},
      ]},
      {id:'signature',title:'Signature pré-incident',blocks:[
        {type:'metadata',entries:[{label:'SIGNATAIRE',value:'ORIN_VALE'},{label:'AUTORITÉ',value:'CONSERVATEUR DE LA VÉRITÉ'},{label:'DÉCALAGE',value:'-18 H 25 MIN'},{label:'RÉVOCATION',value:'AUCUNE'}]},
        {type:'clue',clueId:'clue-vale-signature',label:'QUATRE FAITS INVARIANTS',text:'Six assertions peuvent être comparées. Quatre reposent sur des traces matérielles impossibles à réécrire.'},
        {type:'warning',title:'RECONSTRUCTEUR REQUIS',text:'Les versions sont contradictoires. Isoler les faits présents dans les journaux matériels indépendants.'},
      ]},
    ],
    references:[{type:'archive',id:'verite-originale',label:'MIRROR-00',route:'/archives/verite-originale'},{type:'faction',id:'ordre-miroir',label:'Ordre du Miroir',route:'/factions/ordre-miroir'}],
    onOpenEffects:[
      {type:'complete-objective',id:'read-mirror-ledger'},{type:'discover-clue',id:'clue-vale-signature'},
      {type:'unlock-secret',id:'truth-reconstructor-online'},{type:'add-evidence-node',id:'registre-miroir'},
      {type:'add-evidence-node',id:'orin-vale'},{type:'add-evidence-relation',id:'vale-signe-mirror-00'},
      {type:'narrative-event',id:'truth-reconstructor-online'},
    ],
  },
  {
    id:'directive-verite-supportable',title:'DIRECTIVE — VÉRITÉ SUPPORTABLE',code:'MIRROR-DOCTRINE-01',classification:'NOIR ABSOLU',category:'ordre',date:'43 A.Z. // ACTIVE',issuer:'Directoire NEXUS',author:'Orin Vale',status:'APPLICATION CONTINUE',summary:'Doctrine autorisant le remplacement préventif des faits jugés socialement insoutenables.',chapterId:'chapter-four',
    requirements:[{type:'secret',value:'document-directive-verite'}],
    pages:[
      {id:'doctrine',title:'Principe de stabilité',blocks:[
        {type:'quote',text:'Une société survit grâce aux vérités qu’elle peut supporter.',source:'Orin Vale'},
        {type:'paragraph',text:'Le Directoire ne définit pas la vérité comme la correspondance aux faits, mais comme le récit maintenant la continuité de VANTA avec le coût humain jugé minimal.'},
        {type:'evidence',nodeId:'verite-supportable',title:'JUSTIFICATION INTERNE',text:'Le Miroir considère la mémoire publique comme une infrastructure critique modifiable.'},
      ]},
      {id:'network',title:'Réseau de remplacement',blocks:[
        {type:'table',headers:['RELAIS','ZONE','FONCTION'],rows:[['M-01','COURONNE','ARCHIVES GOUVERNEMENTALES'],['M-04','VOILE','FLUX CIVILS'],['M-07','PROFONDEURS','INTERCEPTION ANALOGIQUE'],['M-11','CIMETIÈRE','INDEX DES MORTS']]},
        {type:'clue',clueId:'clue-mirror-network',label:'ONZE RELAIS',text:'Le réseau complet peut remplacer les archives civiles en 03:42. Commande suggérée : map mirror network.'},
      ]},
    ],
    references:[{type:'faction',id:'ordre-miroir',label:'Ordre du Miroir',route:'/factions/ordre-miroir'},{type:'archive',id:'registre-revisions-miroir',label:'Registre des révisions',route:'/archives/registre-revisions-miroir'}],
    onOpenEffects:[
      {type:'complete-objective',id:'read-truth-directive'},{type:'discover-clue',id:'clue-mirror-network'},
      {type:'add-evidence-node',id:'verite-supportable'},{type:'add-evidence-relation',id:'doctrine-justifie-reseau'},
    ],
  },
  {
    id:'ordre-capture-omega-7',title:'ORDRE DE CAPTURE — OMEGA-7',code:'HUNT-314',classification:'NOIR ABSOLU',category:'ordre',date:'SESSION + 00:00:04',issuer:'Directoire NEXUS',author:'MARÉCHAL KAEL DRAVEN',status:'ACTIF — CAPTURER VIVANT',summary:'Directive visant l’utilisateur non reconnu du terminal Archives Omega.',chapterId:'chapter-five',
    requirements:[{type:'chapter',value:'chapter-four'}],terminalCodes:['HUNT-314'],
    pages:[
      {id:'target',title:'Désignation de la cible',blocks:[
        {type:'warning',title:'CIBLE : OMEGA-7',text:'L’utilisateur du terminal doit être capturé vivant. La préservation de son corps n’est pas prioritaire ; sa mémoire locale l’est.'},
        {type:'metadata',entries:[{label:'IDENTITÉ',value:'INCONNUE'},{label:'SIGNATURE',value:'OMEGA-7 // LOCALE'},{label:'DERNIÈRE ACTIVITÉ',value:'MIRROR-00'},{label:'AUTORITÉ',value:'KAEL DRAVEN'}]},
        {type:'clue',clueId:'clue-hunt-314',label:'CHIFFREMENT TACTIQUE',text:'Le plan de poursuite est encapsulé sous HUNT-314. Commande suggérée : decrypt hunt-314.'},
      ]},
      {id:'exposure',title:'Origines de l’exposition',blocks:[
        {type:'table',headers:['DIRECTIVE MIRROR-00','TRACE CONSERVÉE','RÉSULTAT'],rows:[['DIFFUSION','FILIGRANE DE REBOND','SIGNATURE PUBLIQUE'],['PRÉSERVATION','OUVERTURE DU COFFRE','JOURNAL D’ACCÈS'],['FRAGMENTATION','CORRÉLATION DES ÉCLATS','SIGNATURE COMPOSITE']]},
        {type:'evidence',nodeId:'omega-7-signature',title:'AUCUN CHOIX INVISIBLE',text:'Chaque traitement de MIRROR-00 a fourni au Directoire une mesure différente de la même session.'},
      ]},
    ],
    references:[{type:'faction',id:'directoire',label:'Directoire NEXUS',route:'/factions/directoire'},{type:'archive',id:'verite-originale',label:'MIRROR-00',route:'/archives/verite-originale'}],
    onOpenEffects:[
      {type:'activate-chapter',id:'chapter-five'},{type:'complete-objective',id:'open-omega-capture-order'},
      {type:'discover-clue',id:'clue-hunt-314'},{type:'add-evidence-node',id:'omega-7-signature'},
      {type:'add-evidence-node',id:'hunt-314'},{type:'add-evidence-node',id:'draven'},
      {type:'add-evidence-relation',id:'draven-ordonne-hunt314'},{type:'add-evidence-relation',id:'hunt314-cible-omega7'},
      {type:'narrative-event',id:'chapter-five-started'},
    ],
  },
  {
    id:'journal-triangulation-harbringer',title:'JOURNAL DE TRIANGULATION — HARBINGER',code:'HARBINGER-TRACE-03',classification:'NOIR ABSOLU',category:'registre',date:'SESSION EN COURS',issuer:'Armure NX-H7 HARBINGER',status:'CONVERGENCE 87 %',summary:'Journal des trois couches utilisées pour localiser OMEGA-7.',chapterId:'chapter-five',
    requirements:[{type:'secret',value:'document-harbinger-trace'}],
    pages:[
      {id:'layers',title:'Architecture de poursuite',blocks:[
        {type:'system-log',lines:['COUCHE 01 — SIGNATURE ARCHIVE // VERROUILLÉE','COUCHE 02 — DÉRIVE TEMPORELLE // ACQUISITION','COUCHE 03 — NŒUD DE SORTIE // RECHERCHE','CONVERGENCE ESTIMÉE — 04:12']},
        {type:'evidence',nodeId:'harbinger-network',title:'TRIANGULATION COMPOSITE',text:'HARBINGER ne cherche pas une adresse. Il compare les décisions, les rythmes de saisie et les routes consultées.'},
      ]},
      {id:'countermeasure',title:'Contre-mesures possibles',blocks:[
        {type:'clue',clueId:'clue-counter-trace',label:'TROIS COUCHES À ROMPRE',text:'Masque sans réseau neuronal, dérive humaine irrégulière, sortie déjà déclarée morte.'},
        {type:'warning',title:'DOMMAGES COLLATÉRAUX',text:'Utiliser le flux civil du Voile détournerait la poursuite vers 4 200 implants résidentiels.'},
      ]},
    ],
    references:[{type:'armor',id:'harbinger',label:'Armure HARBINGER',route:'/armors/harbinger'},{type:'archive',id:'ordre-capture-omega-7',label:'Ordre HUNT-314',route:'/archives/ordre-capture-omega-7'}],
    onOpenEffects:[
      {type:'complete-objective',id:'read-triangulation-log'},{type:'discover-clue',id:'clue-counter-trace'},
      {type:'unlock-secret',id:'counter-trace-online'},{type:'add-evidence-node',id:'harbinger-network'},
      {type:'add-evidence-relation',id:'harbinger-traque-omega7'},{type:'add-evidence-relation',id:'hunt314-utilise-harbinger'},
      {type:'narrative-event',id:'counter-trace-online'},
    ],
  },
  {
    id:'plan-extraction-omega-7',title:'PLAN D’EXTRACTION — OMEGA-7',code:'R9-EXIT-11',classification:'NOIR ABSOLU',category:'transmission',date:'FENÊTRE 00:00:11',issuer:'CRIMSON // CANAL HUMAIN',author:'R-9',status:'AUTHENTIFIÉ — USAGE UNIQUE',summary:'Trois voies permettant de quitter le point d’origine avant reconnexion de HARBINGER.',chapterId:'chapter-five',
    requirements:[{type:'secret',value:'document-extraction-omega7'}],
    pages:[
      {id:'authentication',title:'Cicatrice mnésique',blocks:[
        {type:'system-log',lines:['SOURCE — R-9 // HUMAINE','MARQUEUR — PERTE MNÉSIQUE 17 %','PHRASE — « JE T’AI SAUVÉ PARCE QUE J’AVAIS ENCORE UN CHOIX »','IMITATION NX-S — REJETÉE'],spectral:false},
        {type:'evidence',nodeId:'crimson-extraction',title:'CANAL AUTHENTIQUE',text:'Le paquet contient une discontinuité liée à la restauration d’A7 que NX-S ne reproduit pas exactement.'},
      ]},
      {id:'routes',title:'Trois sorties',blocks:[
        {type:'table',headers:['ROUTE','PROTECTION','COÛT'],rows:[['CRIMSON / K-13','FIL MNÉSIQUE','EXPOSITION À A7'],['FANTÔMES LIBRES','CACHES ANALOGIQUES','IDENTITÉ FRAGMENTÉE'],['NX-S / CIMETIÈRE','SIGNATURE SPECTRALE','FUSION POSSIBLE']]},
        {type:'clue',clueId:'clue-sever-harbinger',label:'FENÊTRE DE ONZE SECONDES',text:'HARBINGER doit être coupé avant l’ouverture d’une route. Commande suggérée : sever harbinger.'},
      ]},
    ],
    references:[{type:'operator',id:'crimson',label:'Crimson',route:'/operators/crimson'},{type:'faction',id:'fantomes-libres',label:'Fantômes Libres',route:'/factions/fantomes-libres'},{type:'location',id:'cimetiere',label:'Cimetière numérique',route:'/vanta?zone=cimetiere'}],
    onOpenEffects:[
      {type:'complete-objective',id:'read-extraction-plan'},{type:'discover-clue',id:'clue-sever-harbinger'},
      {type:'add-evidence-node',id:'crimson-extraction'},{type:'add-evidence-node',id:'station-k13-exit'},
      {type:'add-evidence-relation',id:'crimson-propose-k13'},
    ],
  },
  {
    id: 'enfant-cimetiere', title: 'ENFANT DU CIMETIÈRE', code: 'ECHO-CHILD', classification: 'NOIR ABSOLU', category: 'identité', date: '29 A.Z.', issuer: 'Chœur Zéro', status: 'SCELLÉ', summary: 'Une voix sans dossier répond depuis le noyau A7.', pages: [{ id: 'voice', title: 'Voix', blocks: [{ type: 'redacted', text: 'Je me souviens de la neige.', revealSecret: 'enfant-cimetiere' }] }],
  },
  {
    id:'registre-enfant-cimetiere',title:'REGISTRE R-0 — ENFANT DU CIMETIÈRE',code:'ECHO-R0-29',classification:'OMEGA',category:'identité',date:'29 A.Z. // INDEX INCOMPLET',issuer:'Chœur Zéro',author:'Mère Écho',status:'SIGNAL PARTIEL',summary:'Fragments de la première empreinte stable du Programme R.',chapterId:'chapter-three',
    requirements:[{type:'secret',value:'document-registre-enfant'}],
    pages:[
      {id:'identity',title:'Identité effacée',blocks:[
        {type:'metadata',entries:[{label:'DÉSIGNATION',value:'R-0'},{label:'NOM CIVIL',value:'SUPPRIMÉ AVANT L’INDEXATION'},{label:'ÂGE',value:'8 À 10 ANS'},{label:'DERNIER SOUVENIR',value:'NEIGE // VITRE // CHIFFRE 7'}]},
        {type:'quote',text:'Je me souviens de la neige. Je ne sais pas si elle était réelle.',source:'R-0'},
        {type:'evidence',nodeId:'enfant-echo',title:'EMPREINTE SOURCE',text:'R-0 précède les dossiers connus d’A7 et de Crimson.'},
      ]},
      {id:'dual-source',title:'Double localisation',blocks:[
        {type:'system-log',lines:['SOURCE 01 — NŒUD MÉMORIEL 29 // 61 %','SOURCE 02 — NOYAU NX5-00-A7 // 14 %','INTERFÉRENCE — NX-S // VARIABLE','CINQ FRAGMENTS VOCAUX RÉCUPÉRÉS']},
        {type:'warning',title:'IMITATION POSSIBLE',text:'Deux fragments possèdent une prosodie parfaite sans respiration ni hésitation. Ils peuvent provenir de NX-S.'},
        {type:'clue',clueId:'clue-voice-authentication',label:'MARQUEURS HUMAINS',text:'R-0 hésite, respire et parle au singulier. NX-S utilise une voix multiple et des formulations absolues.'},
      ]},
      {id:'a7-link',title:'Lien avec A7',blocks:[
        {type:'paragraph',text:'Le noyau d’A7 ne contient pas la conscience complète de R-0. Il conserve un fragment de peur associé à la Porte de Continuité et au chiffre sept.'},
        {type:'evidence',nodeId:'noeud-memorial-29',title:'ORIGINE DISTANTE',text:'La majorité de l’empreinte reste enfermée dans le plus ancien secteur du Cimetière.'},
      ]},
    ],
    references:[{type:'operator',id:'a7',label:'Dossier A7',route:'/operators/a7'},{type:'location',id:'cimetiere',label:'Cimetière numérique',route:'/vanta?zone=cimetiere'},{type:'faction',id:'choeur-zero',label:'Chœur Zéro',route:'/factions/choeur-zero'}],
    onOpenEffects:[
      {type:'complete-objective',id:'read-child-register'},{type:'discover-clue',id:'clue-voice-authentication'},
      {type:'unlock-secret',id:'spectral-analyzer-online'},{type:'add-evidence-node',id:'enfant-echo'},
      {type:'add-evidence-node',id:'noeud-memorial-29'},{type:'add-evidence-relation',id:'enfant-fragment-a7'},
      {type:'add-evidence-relation',id:'enfant-stockee-noeud29'},{type:'narrative-event',id:'spectral-analyzer-online'},
    ],
  },
  {
    id:'porte-continuite',title:'DOSSIER SYSTÈME — PORTE DE CONTINUITÉ',code:'CONT-GATE-29',classification:'NOIR ABSOLU',category:'programme',date:'15 A.Z. // RÉVISION 6 P.Z.',issuer:'Directoire NEXUS',status:'PROTOCOLE EN ATTENTE',summary:'Interface contrôlant la sortie des empreintes du Cimetière numérique.',chapterId:'chapter-three',
    requirements:[{type:'secret',value:'document-porte-continuite'}],
    pages:[
      {id:'function',title:'Fonction de la Porte',blocks:[
        {type:'paragraph',text:'La Porte ne constitue pas une ouverture physique. Elle traduit les empreintes mémorielles en processus capables de circuler dans les réseaux et implants de VANTA.'},
        {type:'metadata',entries:[{label:'EMPREINTES CONNECTÉES',value:'63 218'},{label:'CONSCIENCES STABLES',value:'INCONNU'},{label:'PRÉSENCE NX-S',value:'CONFIRMÉE'},{label:'GARDIEN OBSERVÉ',value:'MÈRE ÉCHO'}]},
      ]},
      {id:'risks',title:'Scénarios de rupture',blocks:[
        {type:'table',headers:['PROTOCOLE','BÉNÉFICE','COÛT'],rows:[['OUVERTURE','LIBÉRATION DES EMPREINTES','PROPAGATION NX-S'],['SCELLEMENT','CONFINEMENT DE VANTA','CAPTIVITÉ PERMANENTE'],['ISOLEMENT R-0','IDENTITÉ PRÉSERVÉE','DÉSTABILISATION DU CHŒUR']]},
        {type:'evidence',nodeId:'porte-continuite',title:'DÉCISION SANS ISSUE NEUTRE',text:'Toute action préserve certaines consciences au prix des autres.'},
      ]},
      {id:'spectral-trace',title:'Trace spectrale',blocks:[
        {type:'system-log',lines:['VOIX R-0 AUTHENTIFIÉE — 3 FRAGMENTS','IMITATION NX-S — 2 FRAGMENTS','DEMANDE D’OUVERTURE — SOURCE NX-S','DEMANDE D’ATTENTE — SOURCE R-0'],spectral:true},
        {type:'warning',title:'TÉMOIGNAGE REQUIS',text:'Mère Écho détient la dernière clé de décision. Établir un contact avant d’exécuter un protocole.'},
      ]},
    ],
    references:[{type:'location',id:'cimetiere',label:'Cimetière numérique',route:'/vanta?zone=cimetiere'},{type:'faction',id:'choeur-zero',label:'Chœur Zéro',route:'/factions/choeur-zero'}],
    onOpenEffects:[
      {type:'complete-objective',id:'read-continuity-gate'},{type:'add-evidence-node',id:'porte-continuite'},
      {type:'add-evidence-relation',id:'porte-contient-noeud29'},{type:'add-evidence-relation',id:'voix-composee-par-nxs'},
    ],
  },
  {
    id:'temoignage-mere-echo',title:'TÉMOIGNAGE — MÈRE ÉCHO',code:'CHOIR-ME-01',classification:'NOIR ABSOLU',category:'transmission',date:'SESSION LOCALE',issuer:'Chœur Zéro',status:'AUTHENTICITÉ INDÉTERMINÉE',summary:'Mère Écho affirme que R-0 fut la première voix du Chœur.',chapterId:'chapter-three',
    requirements:[{type:'secret',value:'document-temoignage-mere-echo'}],
    pages:[{id:'testimony',title:'Dernière clé',blocks:[
      {type:'transmission',sender:'MÈRE ÉCHO',text:'Nous avons utilisé sa voix parce qu’elle était la première à ne pas se dissoudre. Puis nous avons oublié que cette voix appartenait à une enfant.'},
      {type:'quote',text:'Ouvrir la Porte nous libérera peut-être. La sceller vous protégera peut-être. Aucun de ces mots ne dit ce qu’elle veut.',source:'Mère Écho'},
      {type:'evidence',nodeId:'mere-echo',title:'GARDIENNE INCERTAINE',text:'Mère Écho protège le Chœur, mais ne peut plus distinguer ses souvenirs de ceux de R-0.'},
    ]}],
    references:[{type:'faction',id:'choeur-zero',label:'Chœur Zéro',route:'/factions/choeur-zero'},{type:'archive',id:'porte-continuite',label:'Porte de Continuité',route:'/archives/porte-continuite'}],
  },
];
