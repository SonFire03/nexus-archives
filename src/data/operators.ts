import type { Operator } from '../types';

export const operators: Operator[] = [
  {
    id: 'a7', matricule: 'NX5-00-A7', name: 'A7', callsign: "L’Ombre", civilName: 'Inconnu',
    gender: 'Masculin', age: '28 à 32 ans', height: '1,95 m', officialStatus: 'Décédé pendant la Nuit Zéro',
    realStatus: 'Actif, localisation instable', className: 'Infiltrateur neural de cinquième génération',
    compatibility: 99.7, threat: 'OMEGA', order: 'Capturer vivant',
    description: "Silhouette athlétique, cheveux noirs mi-longs, cicatrices d’interfaces neuronales. Ses yeux gris virent au bleu pendant les intrusions de NX-S.",
    profile: ['Calme et méthodique', 'Loyal envers les individus', 'Souvenirs contradictoires', 'Peur des espaces médicaux blancs', 'Fragmentation identitaire critique'],
    origins: ['Ancien soldat effacé', 'Corps cloné ou réutilisé', 'Ancre biologique artificielle', 'Réceptacle de plusieurs empreintes'],
    roles: ['Infiltration', 'Extraction', 'Sabotage', 'Piratage tactique', 'Neutralisation silencieuse'],
    armorId: 'ombre', weapons: ['Fusil modulaire NX-R7', 'Pistolet NX-P4', 'Lames rétractables', 'Katana tactique haute fréquence'],
    weaknesses: ['Surchauffe', 'Dépendance neuronale', 'Fragmentation identitaire', 'Vulnérabilité à NX-S', 'Réaction irrationnelle si Crimson est menacée'],
    nightZero: ['Ancre biologique du Projet Continuité', 'Mort clinique pendant 11 min 42 s', 'Fragment de NX-S probablement fixé au noyau'],
    relationships: [
      { target: 'Crimson', detail: "Partenaire et exécutrice désignée, elle l’a tué puis restauré." },
      { target: 'NX-S', detail: 'Le désigne comme Le Premier Fragment.' },
      { target: 'Elara Voss', detail: 'Affirme avoir supervisé sa création.' },
    ],
    secrets: [
      { id: 'sept-corps', label: 'Plusieurs A7 ont existé.', access: 'OMEGA' },
      { id: 'enfant-cimetiere', label: "Son noyau contient la conscience d’un enfant.", access: 'NOIR ABSOLU' },
      { id: 'phrase-arret-a7', label: 'Une phrase peut désactiver son système nerveux.', access: 'NOIR ABSOLU' },
    ],
    quotes: ["Je ne cherche pas mon passé. Je cherche celui qui l’a écrit.", 'Une mémoire peut mentir. Une cicatrice, rarement.', 'Je ne suis pas le fantôme dans la machine. Je suis la machine qui refuse de mourir.'],
  },
  {
    id: 'crimson', matricule: 'NX5-01-R9', name: 'Crimson', callsign: "L’Écarlate", civilName: 'Mara Veyr — identité falsifiée',
    gender: 'Féminin', age: '27 à 30 ans', height: '1,78 m', officialStatus: 'Agente active du Directoire',
    realStatus: 'Compromise', className: 'Assassin, saboteuse et spécialiste d’extraction', compatibility: 98.9,
    threat: 'OMEGA-ROUGE', order: 'Surveillance et récupération',
    description: 'Cheveux rouge profond, yeux verts et longue tresse neuroconductrice. Son armure noire et rouge porte une cape fragmentée.',
    profile: ['Déterminée et ironique', 'Tactiquement brillante', 'Empathique sous une apparence froide', 'Résistante aux manipulations', 'Loyauté extrême envers A7'],
    origins: ['Sujet R-9 du Programme FIL ROUGE', 'Mémoire conçue pour résister aux effacements', 'Identité d’origine inconnue'],
    roles: ['Assassinat', 'Sabotage', 'Extraction', 'Résonance jumelle', 'Analyse prédictive'],
    armorId: 'crimson', weapons: ['Système ÉCARLATE multimode', 'Micro-lames', 'Fil monomoléculaire', 'Charges fantômes', 'Pistolet CR-P9'],
    weaknesses: ['Dégradation neurologique en REDLINE', 'Blindage limité', 'Douleurs de résonance', 'Effacements mémoriels cumulés'],
    nightZero: ['22 h 19 — transperce le noyau d’A7', '22 h 24 — connecte son Fil Mnésique', '22 h 31 — activité neuronale restaurée'],
    relationships: [
      { target: 'A7', detail: 'Partenaire lié par Résonance Jumelle.' },
      { target: 'Directoire', detail: 'Agente officiellement active, désormais compromise.' },
      { target: 'Programme FIL ROUGE', detail: 'Sa tresse conserve souvenirs, émotions et effacements.' },
    ],
    secrets: [
      { id: 'restauration-2224', label: 'Crimson a choisi quelle sauvegarde d’A7 restaurer.', access: 'OMEGA' },
      { id: 'r9', label: 'R-9 pourrait désigner sa neuvième reconstruction.', access: 'NOIR ABSOLU' },
      { id: 'commande-crimson', label: 'A7 possède probablement sa commande d’arrêt.', access: 'NOIR ABSOLU' },
    ],
    quotes: ["Ils ont effacé ma mémoire. Pas mes raisons.", "Je t’ai tué parce que je n’avais plus le choix. Je t’ai sauvé parce que j’en avais encore un.", "Le fil ne me ramène pas celle que j’étais. Il me rappelle seulement pourquoi elle s’est battue."],
  },
];
