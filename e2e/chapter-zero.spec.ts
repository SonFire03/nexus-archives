import { expect, test } from '@playwright/test';

test('termine le Chapitre 01 et conserve l’accès TACTIQUE', async ({ page }) => {
  const mainNavigation = page.getByRole('navigation', { name: 'Navigation principale' });
  await page.goto('/nexus-archives/#/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.getByRole('button', { name: 'PASSER LA SÉQUENCE' }).click();
  await expect(page.getByRole('heading', { name: /SITUATION/ })).toBeVisible();

  await page.getByRole('link', { name: 'SUIVRE LA PISTE →' }).click();
  await expect(page.getByRole('heading', { name: 'RAPPORT D’INCIDENT — NUIT ZÉRO' })).toBeVisible();
  await page.getByRole('button', { name: 'PAGE SUIVANTE →' }).click();
  await page.getByRole('button', { name: 'PAGE SUIVANTE →' }).click();
  await expect(page.getByText(/Z-2219 — référence absente/)).toBeVisible();

  await mainNavigation.getByRole('link', { name: /Terminal$/ }).click();
  await page.getByLabel('COMMANDE').fill('decrypt Z2219');
  await page.getByLabel('COMMANDE').press('Enter');
  await expect(page.getByText('FRAGMENT Z-2219 DÉCHIFFRÉ')).toBeVisible();

  await mainNavigation.getByRole('link', { name: /Archives$/ }).click();
  const restorationCard = page.getByRole('article').filter({ hasText: 'JOURNAL DE RESTAURATION — 22:24' });
  await restorationCard.getByRole('link', { name: /OUVRIR LE DOCUMENT/ }).click();
  await expect(page.getByRole('heading', { name: 'JOURNAL DE RESTAURATION — 22:24' })).toBeVisible();

  await page.goto('/nexus-archives/#/archives/rapport-nuit-zero');
  await page.getByRole('button', { name: 'ENREGISTRER COMME PREUVE' }).click();
  await expect(page.getByRole('button', { name: 'PREUVE ENREGISTRÉE' })).toBeDisabled();

  await mainNavigation.getByRole('link', { name: /Terminal$/ }).click();
  await page.getByLabel('COMMANDE').fill('echo a7');
  await page.getByLabel('COMMANDE').press('Enter');
  await expect(page.getByText('SEPT SIGNATURES RÉPONDENT')).toBeVisible();

  await page.goto('/nexus-archives/#/operators/crimson');
  await expect(page.getByRole('link', { name: /MESSAGE À LA PROCHAINE VERSION/ })).toBeVisible();
  await mainNavigation.getByRole('link', { name: /Enquête$/ }).click();
  await page.getByRole('button', { name: 'ÉTABLIR LA SYNTHÈSE FINALE' }).click();
  await expect(page.getByRole('heading', { name: 'CHAPITRE 01 TERMINÉ' })).toBeVisible();
  await expect(page.getByText('ACCÈS TACTIQUE ACCORDÉ')).toBeVisible();

  await page.reload();
  await expect(page.getByRole('heading', { name: 'CHAPITRE 01 TERMINÉ' })).toBeVisible();
  await expect(page.getByText('ACCÈS TACTIQUE ACCORDÉ')).toBeVisible();
});
