# NEXUS // ARCHIVES OMEGA

> TERMINAL CLASSIFIÉ DU DIRECTOIRE

Expérience narrative cyberpunk statique en français. Le visiteur infiltre les archives de VANTA, enquête sur la Nuit Zéro et débloque localement des fragments autour d’A7, Crimson et du réseau spectral NX-S.

## Aperçu

L’interface Omega V3 emploie un shell de centre de commandement, une grille responsive jusqu’à 5120 px et des silhouettes SVG originales. Les captures de contrôle sont produites par Playwright comme pièces jointes de test ; les visuels narratifs finaux pourront les remplacer sans modifier les données.

## Fonctionnalités

- introduction interactive, tableau de bord opérationnel et shell classifié ;
- carte SVG accessible des cinq niveaux de VANTA ;
- dossiers A7/Crimson, 18 armures filtrables et 8 factions reliées ;
- chronologie A.Z./P.Z. et Nuit Zéro minute par minute ;
- Chapitre 01 jouable : consulter, déchiffrer, comparer et relier les preuves de la Nuit Zéro ;
- terminal contextuel, lecteur de documents paginé et comparateur officiel/classifié ;
- tableau d’enquête SVG doublé d’une vue textuelle accessible ;
- objectifs narratifs, contact NX-S et progression locale importable/exportable ;
- barre de commandement, navigation latérale réductible et tiroir mobile accessible ;
- panneaux, métriques, jauge réseau et graphe spectral déterministe du système Omega V3 ;
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
- `npm run test:e2e` : parcours Chromium complet du Chapitre 01 ;
- `npm run test:e2e:ui` : ouvre l’interface Playwright ;
- `npm run check` : lint, types, tests unitaires et build (E2E séparé).

## Structure

`src/data/` contient le canon, les documents, objectifs et preuves. `src/components/layout/` et `src/components/navigation/` composent le shell Omega ; `src/components/dashboard/` porte les visualisations métier. `src/components/archive/` rend les blocs typés et `src/components/investigation/` affiche le graphe. Les tokens et couches visuelles sont centralisés dans `src/styles/`. `src/state/` gère migration et effets narratifs, `src/services/` le terminal. Voir [`docs/narrative-system.md`](docs/narrative-system.md).

## Étendre le contenu

Pour ajouter un opérateur, une armure ou une faction, compléter respectivement `operators.ts`, `armors.ts` ou `factions.ts` avec un identifiant stable en kebab-case. Ajouter les références croisées, puis exécuter `npm test` : les tests d’intégrité contrôlent unicité, statistiques et liens.

## Documents et chapitres

Ajouter un document dans `src/data/archives.ts` sans JSX, avec pages et blocs typés. Déclarer ses indices, effets et références, puis compléter les nœuds et relations de `chapterZero.ts`. Un chapitre définit ses objectifs et conditions déterministes ; les tests d’intégrité doivent rester verts.

## Progression locale

La clé stable `nexus-archives:v1` contient un état de schéma V2. `migrateV1ToV2` préserve documents, secrets, historique et réglages. Les imports JSON sont validés et limités en taille. Aucun cookie ni donnée personnelle n’est utilisé.

## Tester le Chapitre 01

Après `npx playwright install chromium`, lancer `npm run test:e2e`. Le scénario réinitialise le stockage, ouvre le rapport, déchiffre Z-2219, consulte la restauration, compare les versions, analyse A7, établit la synthèse et vérifie l’accès TACTIQUE après rechargement. La même suite contrôle le shell, le tiroir mobile, les pages majeures, l’absence de débordement et neuf formats de 390 × 844 à 5120 × 1440.

## Accessibilité

Navigation clavier, lien d’évitement, focus visible, régions sémantiques, carte textuelle, descriptions de graphiques, sorties terminal annoncées et censure compréhensible sont intégrés. Le tiroir mobile restitue le focus à sa fermeture. `prefers-reduced-motion` désactive les animations non essentielles. Le son est désactivé par défaut.

## Déploiement GitHub Pages

1. Créer le dépôt `nexus-archives` et pousser sur `main`.
2. Dans GitHub, ouvrir **Settings**, puis **Pages**.
3. Choisir **GitHub Actions** comme source.
4. Vérifier le workflow **Déployer sur GitHub Pages**.
5. Ouvrir `https://sonfire03.github.io/nexus-archives/` après succès.

Vite utilise `base: "/nexus-archives/"` et le routage par hash. Ne pas créer de branche `gh-pages`.

## Assets et limites de la V2

Consulter `public/assets/README.md` pour les futurs médias. La V2 couvre un chapitre linéaire, sans backend, embranchements irréversibles, multijoueur ni synchronisation cloud.

## Sécurité, fiction et licence

Ce projet est une œuvre originale. La connexion et les systèmes militaires sont fictifs. Aucun secret ne doit être ajouté : tout contenu publié est public. Aucune donnée n’est envoyée hors du navigateur.

Sauf mention contraire, le contenu narratif et visuel est réservé à son auteur. Les dépendances conservent leurs licences respectives.

## Roadmap

- remplacer les placeholders par des illustrations originales finales ;
- développer le Chapitre 02 autour du Dossier des Sept Corps ;
- réaliser un audit manuel multi-navigateurs et lecteur d’écran ;
- ajouter une suite visuelle de non-régression.
