# Système narratif

## Principe

Les chapitres suivent une boucle déterministe : document → indice → commande → preuve → relation → événement. Les Chapitres 02 à 05 ajoutent puzzle → décision → conséquence. Les données restent dans `src/data/`; les composants ne contiennent pas de logique canonique.

## Progression et migration

`ProgressState` utilise le schéma V6 dans la clé stable `nexus-archives:v1`. Les migrations V1 → V2 → V3 → V4 → V5 → V6 conservent la progression et initialisent `solvedPuzzles`, `narrativeChoices` et `narrativeFlags`. `src/state/narrative.ts` applique les effets de manière idempotente. Les accès TACTIQUE, OMEGA et NOIR ABSOLU dépendent des conditions de chapitre, jamais d’un score arbitraire.

## Documents et effets

Un `ArchiveDocument` contient des pages composées de blocs typés, sans JSX ni HTML injecté. `requirements` contrôle l’accès et `onOpenEffects` produit des effets déclaratifs : objectif, indice, secret, transmission ou preuve. Le renderer choisit le composant sûr correspondant au type du bloc.

Pour ajouter un document :

1. créer un identifiant kebab-case dans `src/data/archives.ts` ;
2. déclarer pages, références, conditions et effets ;
3. relier chaque indice à son document source ;
4. ajouter les tests d’intégrité et de comportement.

## Terminal contextuel

`executeCommand(rawCommand, context)` normalise uniquement des alias explicites. Il ne fait ni `eval`, ni interprétation HTML. Le résultat décrit sortie, navigation, déblocages, objectifs et éventuelle altération spectrale ; le contexte React applique ensuite ces effets.

## Graphe de preuves

Les modules `chapterZero.ts` à `chapterFive.ts` déclarent les nœuds et relations canoniques. Leur visibilité dépend des identifiants présents dans la progression. Le SVG est une vue secondaire : la liste textuelle fournit les mêmes relations et accès aux sources.

## Événements NX-S

La synthèse finale vérifie toutes les conditions, enregistre une seule occurrence de contact, termine `chapter-zero` et accorde TACTIQUE. Les notifications sont récupérables via les transmissions et n’altèrent jamais silencieusement les données.

## Chapitres 02 à 05

`MemoryReconstructionPage` valide une séquence déterministe sans glisser-déposer obligatoire. `ChapterTwoPage` enregistre exactement une décision dans `narrativeChoices['body-04']`; `SpectralAnalysisPage` authentifie trois fragments humains et `ChapterThreePage` enregistre le protocole de la Porte dans `narrativeChoices['continuity-gate']`. La réinitialisation globale reste le seul moyen de remplacer ces décisions. Les fonctions de complétion vérifient toutes les preuves avant d’accorder OMEGA puis NOIR ABSOLU.

`TruthReconstructionPage` conserve quatre faits matériels parmi six assertions et adapte l’origine de MIRROR-00 au choix de la Porte. `ChapterFourPage` archive la directive finale dans `narrativeChoices['mirror-00']`. Les embranchements modifient les conséquences sans dupliquer l’ensemble du chapitre.

`CounterTracePage` demande une contre-mesure par couche et refuse les routes exposant des civils ou l’identité du joueur. L’origine de la traque dépend de `narrativeChoices['mirror-00']`. `ChapterFivePage` archive l’extraction dans `narrativeChoices['omega7-extraction']`.

Pour préparer le Chapitre 06, créer un module autonome et brancher ses conséquences sur `extraction-crimson`, `extraction-ghosts` et `extraction-spectral`. Ajouter ses documents et effets, puis étendre la progression uniquement si les effets existants ne suffisent pas. Couvrir d’abord les conditions avec Vitest, puis le parcours avec un scénario Playwright ciblé.
