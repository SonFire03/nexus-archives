import { expect, test } from '@playwright/test';

const chapterTwoComplete = {
  version:4,introSeen:true,accessLevel:'OMEGA',viewedDocuments:['rapport-nuit-zero','restauration-2224','dossier-sept-corps','registre-helix-k13','memoire-source-a7-04'],
  unlockedSecrets:['nx-s-contact-01','document-dossier-sept-corps','chapter-two-decision','document-protocole-fil-rouge'],terminalHistory:[],
  completedObjectives:['view-official-zero-report','identify-z-2219','decrypt-z-2219','read-restoration-log','compare-zero-versions','detect-seven-signatures','link-main-evidence','identify-nx-s-intervention','open-seven-bodies','scan-signature-a7-03','read-helix-register','reconstruct-memory-0417','verify-crimson-memory','compare-a7-identities','locate-body-04','decide-body-04'],
  audioEnabled:false,volume:.25,reducedEffects:true,selectedTransmission:'nx-s-body-04',lastVisitedRoute:'/chapter-two',
  activeChapter:'chapter-three',completedChapters:['chapter-zero','chapter-two'],discoveredClues:['clue-z-2219','clue-signature-a7-03','clue-mnem-0417'],
  evidenceNodes:['nuit-zero','a7','crimson','sept-corps','signature-a7-03','corps-a7-04'],evidenceRelations:['sept-corps-identite-a7','corps-04-contient-sauvegarde'],
  spectralContactCount:2,lastNarrativeEvent:'chapter-two-complete',documentReadingProgress:{},solvedPuzzles:['memory-0417'],narrativeChoices:{'body-04':'isolate'},narrativeFlags:[],
};

test('termine L’Enfant du Cimetière et conserve la décision NOIR ABSOLU', async ({page}) => {
  await page.goto('/nexus-archives/#/');
  await page.evaluate((progress) => localStorage.setItem('nexus-archives:v1',JSON.stringify(progress)),chapterTwoComplete);
  await page.reload();

  await page.goto('/nexus-archives/#/archives/protocole-fil-rouge');
  await expect(page.getByRole('heading',{name:'PROGRAMME R — FIL ROUGE'})).toBeVisible();

  await page.goto('/nexus-archives/#/terminal');
  await page.getByLabel('COMMANDE').fill('scan child-echo');
  await page.getByLabel('COMMANDE').press('Enter');
  await expect(page.getByText('REGISTRE ECHO-R0-29 RÉCUPÉRÉ')).toBeVisible();

  await page.goto('/nexus-archives/#/archives/registre-enfant-cimetiere');
  await expect(page.getByRole('heading',{name:'REGISTRE R-0 — ENFANT DU CIMETIÈRE'})).toBeVisible();
  await page.goto('/nexus-archives/#/spectral-analysis');
  for (const fragment of [/Il neigeait/,/A7… ce n’était pas/,/N’ouvre pas la porte/]) await page.getByRole('button',{name:fragment}).click();
  await page.getByRole('button',{name:'AUTHENTIFIER LES TROIS FRAGMENTS'}).click();
  await expect(page.getByText('LES IMPERFECTIONS ONT SERVI DE SIGNATURE.')).toBeVisible();

  await page.goto('/nexus-archives/#/terminal');
  await page.getByLabel('COMMANDE').fill('verify nx-s');
  await page.getByLabel('COMMANDE').press('Enter');
  await expect(page.getByText('2 FRAGMENTS : IMITATION NX-S')).toBeVisible();

  await page.goto('/nexus-archives/#/archives/porte-continuite');
  await expect(page.getByRole('heading',{name:'DOSSIER SYSTÈME — PORTE DE CONTINUITÉ'})).toBeVisible();
  await page.goto('/nexus-archives/#/terminal');
  await page.getByLabel('COMMANDE').fill('contact mother-echo');
  await page.getByLabel('COMMANDE').press('Enter');
  await expect(page.getByText('TÉMOIGNAGE ARCHIVÉ // DÉCISION AUTORISÉE')).toBeVisible();

  await page.goto('/nexus-archives/#/chapter-three');
  await page.getByRole('radio',{name:/ISOLER L’ENFANT/}).click();
  await page.getByRole('button',{name:/CONFIRMER ISOLER L’ENFANT/}).click();
  await expect(page.getByRole('heading',{name:'STATUT DE LA PORTE ARCHIVÉ'})).toBeVisible();
  await expect(page.locator('.gate-result').getByText('CHAPITRE 03 TERMINÉ // NOIR ABSOLU')).toBeVisible();
  await page.reload();
  await expect(page.locator('.gate-result').getByText(/NOIR ABSOLU/)).toBeVisible();

  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('nexus-archives:v1') ?? '{}') as {accessLevel?:string;completedChapters?:string[];narrativeChoices?:Record<string,string>});
  expect(saved.accessLevel).toBe('NOIR ABSOLU');
  expect(saved.completedChapters).toContain('chapter-three');
  expect(saved.narrativeChoices?.['continuity-gate']).toBe('isolate');

  await page.setViewportSize({width:390,height:844});
  for (const route of ['/spectral-analysis','/chapter-three']) {
    await page.goto(`/nexus-archives/#${route}`);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  }
});
