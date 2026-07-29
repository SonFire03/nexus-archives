import { expect, test } from '@playwright/test';

const chapterFourCompleteV5 = {
  version:5,introSeen:true,accessLevel:'NOIR ABSOLU',viewedDocuments:['verite-originale','registre-revisions-miroir','directive-verite-supportable'],
  unlockedSecrets:['chapter-four-decision','mirror-network-compromised'],terminalHistory:[],
  completedObjectives:['open-original-truth','trace-mirror-00','read-mirror-ledger','reconstruct-original-truth','verify-vale-signature','read-truth-directive','map-mirror-network','decide-original-truth'],
  audioEnabled:false,volume:.25,reducedEffects:true,selectedTransmission:'orin-vale-final',lastVisitedRoute:'/chapter-four',
  activeChapter:'chapter-four',completedChapters:['chapter-zero','chapter-two','chapter-three','chapter-four'],discoveredClues:['clue-mirror-00','clue-vale-signature','clue-mirror-network'],
  evidenceNodes:['nuit-zero','a7','crimson','nx-s','mirror-00','orin-vale','reseau-miroir'],evidenceRelations:['vale-signe-mirror-00','mirror-00-anticipe-nuit-zero'],
  spectralContactCount:3,lastNarrativeEvent:'chapter-four-complete',documentReadingProgress:{},solvedPuzzles:['memory-0417','voice-authentication','mirror-truth-invariants'],
  narrativeChoices:{'body-04':'isolate','continuity-gate':'seal','mirror-00':'fragment'},narrativeFlags:['gate-seal','truth-fragment'],
};

test('termine Traque Omega et conserve la route d’extraction', async ({page}) => {
  await page.goto('/nexus-archives/#/');
  await page.evaluate((progress) => localStorage.setItem('nexus-archives:v1',JSON.stringify(progress)),chapterFourCompleteV5);
  await page.reload();

  await page.goto('/nexus-archives/#/archives/ordre-capture-omega-7');
  await expect(page.getByRole('heading',{name:'ORDRE DE CAPTURE — OMEGA-7'})).toBeVisible();

  await page.goto('/nexus-archives/#/terminal');
  await page.getByLabel('COMMANDE').fill('decrypt hunt-314');
  await page.getByLabel('COMMANDE').press('Enter');
  await expect(page.getByText('JOURNAL HARBINGER-TRACE-03 RÉCUPÉRÉ')).toBeVisible();

  await page.goto('/nexus-archives/#/archives/journal-triangulation-harbringer');
  await expect(page.getByRole('heading',{name:'JOURNAL DE TRIANGULATION — HARBINGER'})).toBeVisible();
  await page.goto('/nexus-archives/#/counter-trace');
  await page.getByRole('radio',{name:/RELAIS ANALOGIQUE K-13/}).click();
  await page.getByRole('radio',{name:/IMPULSION MNÉSIQUE R-9/}).click();
  await page.getByRole('radio',{name:/CANAL MORT DU CIMETIÈRE/}).click();
  await page.getByRole('button',{name:'EXÉCUTER LA CONTRE-TRAQUE'}).click();
  await expect(page.getByText('HARBINGER CONNAÎT VOTRE SIGNATURE. PLUS VOTRE POSITION.')).toBeVisible();

  await page.goto('/nexus-archives/#/terminal');
  await page.getByLabel('COMMANDE').fill('authenticate crimson');
  await page.getByLabel('COMMANDE').press('Enter');
  await expect(page.getByText('SOURCE HUMAINE : CRIMSON')).toBeVisible();

  await page.goto('/nexus-archives/#/archives/plan-extraction-omega-7');
  await expect(page.getByRole('heading',{name:'PLAN D’EXTRACTION — OMEGA-7'})).toBeVisible();
  await page.goto('/nexus-archives/#/terminal');
  await page.getByLabel('COMMANDE').fill('sever harbinger');
  await page.getByLabel('COMMANDE').press('Enter');
  await expect(page.getByText('HARBINGER : HORS LIGNE')).toBeVisible();

  await page.goto('/nexus-archives/#/chapter-five');
  await page.getByRole('radio',{name:/REJOINDRE LES FANTÔMES LIBRES/}).click();
  await page.getByRole('button',{name:/CONFIRMER REJOINDRE LES FANTÔMES LIBRES/}).click();
  await expect(page.getByRole('heading',{name:'EXTRACTION ARCHIVÉE'})).toBeVisible();
  await page.reload();
  await expect(page.locator('.extraction-result').getByText(/CHAPITRE 05 TERMINÉ/)).toBeVisible();

  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('nexus-archives:v1') ?? '{}') as {version?:number;completedChapters?:string[];narrativeChoices?:Record<string,string>});
  expect(saved.version).toBe(7);
  expect(saved.completedChapters).toContain('chapter-five');
  expect(saved.narrativeChoices?.['omega7-extraction']).toBe('ghosts');

  await page.setViewportSize({width:390,height:844});
  for (const route of ['/counter-trace','/chapter-five']) {
    await page.goto(`/nexus-archives/#${route}`);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  }
});
