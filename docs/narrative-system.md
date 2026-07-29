# Système narratif

## Principe

Les chapitres suivent une boucle déterministe : document → indice → commande → preuve → relation → événement. Le Chapitre 02 ajoute puzzle → décision → conséquence. Les données restent dans `src/data/`; les composants ne contiennent pas de logique canonique.

## Progression et migration

`ProgressState` utilise le schéma V3 dans la clé stable `nexus-archives:v1`. Les migrations V1 → V2 → V3 conservent la progression et initialisent `solvedPuzzles` et `narrativeChoices`. `src/state/narrative.ts` applique les effets de manière idempotente. Les accès TACTIQUE et OMEGA dépendent des conditions de chapitre, jamais d’un score arbitraire.

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

`chapterZero.ts` et `chapterTwo.ts` déclarent les nœuds et relations canoniques. Leur visibilité dépend des identifiants présents dans la progression. Le SVG est une vue secondaire : la liste textuelle fournit les mêmes relations et accès aux sources.

## Événements NX-S

La synthèse finale vérifie toutes les conditions, enregistre une seule occurrence de contact, termine `chapter-zero` et accorde TACTIQUE. Les notifications sont récupérables via les transmissions et n’altèrent jamais silencieusement les données.

## Chapitre 02 et décisions

`MemoryReconstructionPage` valide une séquence déterministe sans glisser-déposer obligatoire. `ChapterTwoPage` enregistre exactement une décision dans `narrativeChoices['body-04']`; la réinitialisation globale reste le seul moyen de la remplacer. `completeChapterTwo` vérifie toutes les preuves, termine le chapitre et accorde OMEGA.

Pour préparer le Chapitre 03, créer un module autonome, ajouter ses documents et effets, puis étendre la progression uniquement si les effets existants ne suffisent pas. Couvrir d’abord les conditions avec Vitest, puis le parcours avec un scénario Playwright ciblé.
