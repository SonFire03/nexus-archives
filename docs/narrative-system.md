# Système narratif

## Principe

Le Chapitre 01 suit une boucle déterministe : document → indice → commande → preuve → relation → événement. Les données restent dans `src/data/`; les composants ne contiennent pas de logique canonique.

## Progression et migration

`ProgressState` utilise le schéma V2 dans la clé stable `nexus-archives:v1`. `migrateV1ToV2` conserve la progression V1 et initialise les indices, preuves, relations, chapitres et positions de lecture. `src/state/narrative.ts` applique les effets de manière idempotente. L’accès TACTIQUE dépend des conditions du chapitre, jamais d’un score arbitraire.

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

`chapterZero.ts` déclare les nœuds et relations canoniques. Leur visibilité dépend des identifiants présents dans la progression. Le SVG est une vue secondaire : la liste textuelle fournit les mêmes relations et accès aux sources.

## Événements NX-S

La synthèse finale vérifie toutes les conditions, enregistre une seule occurrence de contact, termine `chapter-zero` et accorde TACTIQUE. Les notifications sont récupérables via les transmissions et n’altèrent jamais silencieusement les données.

## Préparer le Chapitre 02

Créer un nouveau module de chapitre avec objectifs, preuves, relations et conditions propres. Réutiliser les effets existants, ajouter seulement les nouveaux types indispensables, prévoir une migration avant tout changement de schéma et couvrir le parcours avec Vitest puis un scénario Playwright ciblé.
