# NEXUS // ARCHIVES OMEGA

> TERMINAL CLASSIFIÉ DU DIRECTOIRE

Expérience narrative cyberpunk statique en français. Le visiteur infiltre les archives de VANTA, enquête sur la Nuit Zéro et débloque localement des fragments autour d’A7, Crimson et du réseau spectral NX-S.

## Aperçu

Les captures définitives seront ajoutées dans `docs/screenshots/`. La V1 utilise des silhouettes SVG et schémas techniques originaux, conçus pour être remplacés sans modifier les données narratives.

## Fonctionnalités

- introduction interactive, tableau de bord opérationnel et shell classifié ;
- carte SVG accessible des cinq niveaux de VANTA ;
- dossiers A7/Crimson, 18 armures filtrables et 8 factions reliées ;
- chronologie A.Z./P.Z. et Nuit Zéro minute par minute ;
- terminal à commandes, historique et déblocages ;
- archives censurées, objectifs et progression locale importable/exportable ;
- son synthétique opt-in, responsive mobile/ultrawide et effets réduits.

## Stack

React 19, TypeScript strict, Vite, React Router (`HashRouter`), CSS personnalisé, Vitest, React Testing Library et ESLint. Aucun backend, CDN, tracking ou appel réseau au runtime.

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
- `npm run check` : lint, types, tests et build.

## Structure

`src/data/` contient le canon narratif, `src/pages/` les écrans, `src/components/` les briques réutilisables, `src/state/` la progression, `src/services/` le terminal et `src/styles/` le design system. `public/assets/` accueille les médias futurs.

## Étendre le contenu

Pour ajouter un opérateur, une armure ou une faction, compléter respectivement `operators.ts`, `armors.ts` ou `factions.ts` avec un identifiant stable en kebab-case. Ajouter les références croisées, puis exécuter `npm test` : les tests d’intégrité contrôlent unicité, statistiques et liens.

## Progression locale

La clé `nexus-archives:v1` stocke uniquement progression, réglages et historique du terminal. Les imports JSON sont validés. La réinitialisation est disponible dans Réglages. Aucun cookie ni donnée personnelle n’est utilisé.

## Accessibilité

Navigation clavier, lien d’évitement, focus visible, régions sémantiques, carte textuelle, sorties terminal annoncées et censure compréhensible sont intégrés. `prefers-reduced-motion` désactive les animations non essentielles. Le son est désactivé par défaut.

## Déploiement GitHub Pages

1. Créer le dépôt `nexus-archives` et pousser sur `main`.
2. Dans GitHub, ouvrir **Settings**, puis **Pages**.
3. Choisir **GitHub Actions** comme source.
4. Vérifier le workflow **Déployer sur GitHub Pages**.
5. Ouvrir `https://sonfire03.github.io/nexus-archives/` après succès.

Vite utilise `base: "/nexus-archives/"` et le routage par hash. Ne pas créer de branche `gh-pages`.

## Assets et limites de la V1

Consulter `public/assets/README.md` pour les futurs portraits, armures, factions et sons. La V1 emploie des visuels abstraits, ne comporte ni backend, ni multijoueur, ni synchronisation cloud.

## Sécurité, fiction et licence

Ce projet est une œuvre originale. La connexion et les systèmes militaires sont fictifs. Aucun secret ne doit être ajouté : tout contenu publié est public. Aucune donnée n’est envoyée hors du navigateur.

Sauf mention contraire, le contenu narratif et visuel est réservé à son auteur. Les dépendances conservent leurs licences respectives.

## Roadmap

- remplacer les placeholders par des illustrations originales finales ;
- enrichir les documents déchiffrables et les embranchements ;
- réaliser un audit manuel multi-navigateurs et lecteur d’écran ;
- ajouter une suite visuelle de non-régression.
