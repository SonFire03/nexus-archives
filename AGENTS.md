# Repository Guidelines

## Project Vision

NEXUS // ARCHIVES OMEGA is a cyberpunk narrative site built with React, strict TypeScript, Vite, custom CSS, and Vitest. Preserve its classified military-interface aesthetic: dominant black, NEXUS red, off-white, and blue reserved for NX-S. Keep animation restrained, glitches rare, and interactions usable on desktop and mobile.

## Project Structure & Module Organization

Organize implementation under `src/`: reusable UI in `src/components/`, views in `src/pages/`, narrative data in `src/data/` as TypeScript modules, styles in `src/styles/`, and shared types in `src/types/`. Place static files in `public/` and tests beside their subjects as `*.test.ts` or `*.test.tsx`. Avoid embedding substantial narrative copy in components.

## Build, Test, and Development Commands

Use these standard scripts:

- `npm install` installs locked dependencies.
- `npm run dev` starts the local Vite server.
- `npm test` runs the Vitest suite.
- `npm run build` type-checks and creates the production bundle.
- `npm run preview` serves the production build locally.

Run tests after every significant change and always run `npm run build` before completing a task. Verify image URLs and Vite's `base` setting against the GitHub Pages repository path.

## Coding Style & Naming Conventions

Keep TypeScript strict and avoid `any`. Use two-space indentation, functional React components, `PascalCase` component files (`ArchiveCard.tsx`), `camelCase` functions and variables, and descriptive CSS class names. Prefer small, reusable components and CSS custom properties for the visual system. Respect `prefers-reduced-motion` for every animation and glitch effect.

## Testing Guidelines

Use Vitest, adding React Testing Library when component behavior requires DOM interaction. Test narrative rendering, navigation, responsive state changes, and accessible reduced-motion behavior. Name tests after observable outcomes rather than implementation details. No coverage threshold exists yet; prioritize meaningful coverage for new behavior and regressions.

## Commit & Pull Request Guidelines

There is no commit history yet. Use clear, focused, imperative commits, for example `Add archive dossier navigation`. Never rewrite history or force-push. Keep unrelated features unchanged unless the PR explains why modification was necessary. PRs should summarize user-visible changes, link relevant issues, list tests and `npm run build`, and include desktop/mobile screenshots for visual work.

## Security & Deployment

Never commit API keys, secrets, or local environment files. V1 has no backend; do not introduce one without explicit agreement. Keep routing, assets, and generated URLs compatible with static GitHub Pages hosting.
