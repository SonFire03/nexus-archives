# NEXUS // ARCHIVES OMEGA

> TERMINAL CLASSIFIÉ DU DIRECTOIRE

Expérience narrative cyberpunk statique en français. Le visiteur infiltre les archives de VANTA, enquête sur la Nuit Zéro, confronte les identités concurrentes d’A7 puis recherche l’Enfant du Cimetière.

## Aperçu

L’interface Omega V3 emploie un shell de centre de commandement, une grille responsive jusqu’à 5120 px et des illustrations originales locales. Les captures de contrôle sont produites par Playwright comme pièces jointes de test ; les visuels narratifs peuvent être remplacés sans modifier les données.

## Fonctionnalités

- introduction interactive, tableau de bord opérationnel et shell classifié ;
- carte SVG accessible des cinq niveaux de VANTA ;
- dossiers A7/Crimson, 18 armures filtrables et 8 factions reliées ;
- chronologie A.Z./P.Z. et Nuit Zéro minute par minute ;
- Chapitre 01 jouable : consulter, déchiffrer, comparer et relier les preuves de la Nuit Zéro ;
- Chapitre 02 jouable : localiser A7-03, infiltrer un registre HELIX, reconstruire une mémoire et statuer sur le Corps 04 ;
- Chapitre 03 jouable : retrouver R-0, authentifier sa voix face aux imitations de NX-S et statuer sur la Porte de Continuité ;
- décisions persistantes aux Chapitres 02 et 03, accordant successivement les accès OMEGA et NOIR ABSOLU ;
- terminal contextuel, lecteur de documents paginé et comparateur officiel/classifié ;
- tableau d’enquête SVG doublé d’une vue textuelle accessible ;
- objectifs narratifs, contact NX-S et progression locale importable/exportable ;
- barre de commandement, navigation latérale réductible et tiroir mobile accessible ;
- panneaux, métriques, jauge réseau et graphe spectral déterministe du système Omega V3 ;
- 45 illustrations WebP locales pour les opérateurs, armures, factions, secteurs et archives ;
- son synthétique opt-in, responsive mobile/ultrawide et effets réduits.

## Stack

React 19, TypeScript strict, Vite, React Router (`HashRouter`), CSS personnalisé, Vitest, React Testing Library, Playwright et ESLint. Aucun backend, CDN, tracking ou appel réseau au runtime.

## Installation et commandes

Node 22 LTS et npm sont requis.

```bash
nvm use
npm install
npm run dev
```

- `npm run build` : typecheck puis bundle de production ;
- `npm run preview` : prévisualise `dist/` ;
- `npm run lint` : analyse statique ;
- `npm run typecheck` : validation TypeScript ;
- `npm test` / `npm run test:watch` : tests ponctuels/continus ;
- `npm run test:e2e` : parcours Chromium complets des Chapitres 01, 02 et 03 ;
- `npm run test:e2e:ui` : ouvre l’interface Playwright ;
- `npm run check` : lint, types, tests unitaires et build (E2E séparé).

## Structure

`src/data/` contient le canon, les documents, objectifs et preuves. `src/components/layout/` et `src/components/navigation/` composent le shell Omega ; `src/components/dashboard/` porte les visualisations métier. `src/components/archive/` rend les blocs typés et `src/components/investigation/` affiche le graphe. Les tokens et couches visuelles sont centralisés dans `src/styles/`. `src/state/` gère migration et effets narratifs, `src/services/` le terminal. Voir [`docs/narrative-system.md`](docs/narrative-system.md).

Le registre `src/data/visualAssets.ts` centralise les chemins compatibles avec le `base` Vite. Les PNG maîtres restent dans `assets-source/images/`, ignoré par Git, tandis que seuls les WebP optimisés de `public/assets/images/` sont déployés.

## Étendre le contenu

Pour ajouter un opérateur, une armure ou une faction, compléter respectivement `operators.ts`, `armors.ts` ou `factions.ts` avec un identifiant stable en kebab-case. Ajouter les références croisées, puis exécuter `npm test` : les tests d’intégrité contrôlent unicité, statistiques et liens.

## Documents et chapitres

Ajouter un document dans `src/data/archives.ts` sans JSX, avec pages et blocs typés. Déclarer ses indices, effets et références, puis compléter le module `chapterZero.ts`, `chapterTwo.ts` ou `chapterThree.ts`. Un chapitre définit ses objectifs et conditions déterministes ; les tests d’intégrité doivent rester verts.

## Progression locale

La clé stable `nexus-archives:v1` contient un état de schéma V4. Les migrations V1 → V2 → V3 → V4 préservent documents, secrets, historique, réglages, puzzles et décisions, puis initialisent les drapeaux narratifs du Chapitre 03. Les imports JSON sont validés et limités en taille. Aucun cookie ni donnée personnelle n’est utilisé.

## Tester le Chapitre 01

Après `npx playwright install chromium`, lancer `npm run test:e2e`. Le scénario réinitialise le stockage, ouvre le rapport, déchiffre Z-2219, consulte la restauration, compare les versions, analyse A7, établit la synthèse et vérifie l’accès TACTIQUE après rechargement. La même suite contrôle le shell, le tiroir mobile, les pages majeures, l’absence de débordement et neuf formats de 390 × 844 à 5120 × 1440.

## Tester le Chapitre 02

Lancer `npm run test:e2e -- chapter-two.spec.ts`. Le scénario part d’une sauvegarde TACTIQUE, analyse A7-03, ouvre le registre K-13, reconstruit la séquence 04:17, vérifie Crimson, compare A7-04, localise le corps et confirme la persistance d’une décision OMEGA.

## Tester le Chapitre 03

Lancer `npm run test:e2e -- chapter-three.spec.ts`. Le scénario part d’une sauvegarde OMEGA, consulte le Programme R, localise R-0, authentifie trois fragments humains, démasque l’imitation de NX-S, contacte Mère Écho et confirme la persistance d’une décision NOIR ABSOLU.

## Accessibilité

Navigation clavier, lien d’évitement, focus visible, régions sémantiques, carte textuelle, descriptions de graphiques, sorties terminal annoncées et censure compréhensible sont intégrés. Le tiroir mobile restitue le focus à sa fermeture. `prefers-reduced-motion` désactive les animations non essentielles. Le son est désactivé par défaut.

## Déploiement GitHub Pages

1. Créer le dépôt `nexus-archives` et pousser sur `main`.
2. Dans GitHub, ouvrir **Settings**, puis **Pages**.
3. Choisir **GitHub Actions** comme source.
4. Vérifier le workflow **Déployer sur GitHub Pages**.
5. Ouvrir `https://sonfire03.github.io/nexus-archives/` après succès.

Vite utilise `base: "/nexus-archives/"` et le routage par hash. Ne pas créer de branche `gh-pages`.

## Assets et limites actuelles

Consulter `public/assets/README.md` pour les futurs médias. Les embranchements modifient la progression locale et les conclusions, sans backend, multijoueur ni synchronisation cloud.

## Sécurité, fiction et licence

Ce projet est une œuvre originale. La connexion et les systèmes militaires sont fictifs. Aucun secret ne doit être ajouté : tout contenu publié est public. Aucune donnée n’est envoyée hors du navigateur.

Sauf mention contraire, le contenu narratif et visuel est réservé à son auteur. Les dépendances conservent leurs licences respectives.

## Roadmap

- illustrer la chambre HELIX K-13 et le Corps A7-04 ;
- développer le Chapitre 04 à partir des conséquences de la Porte de Continuité ;
- réaliser un audit manuel multi-navigateurs et lecteur d’écran ;
- ajouter une suite visuelle de non-régression.
