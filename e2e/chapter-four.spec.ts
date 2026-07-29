import { expect, test } from '@playwright/test';

const chapterThreeCompleteV4 = {
  version:4,introSeen:true,accessLevel:'NOIR ABSOLU',viewedDocuments:['rapport-nuit-zero','dossier-sept-corps','protocole-fil-rouge','registre-enfant-cimetiere','porte-continuite'],
  unlockedSecrets:['chapter-two-decision','chapter-three-decision','verite-enfant-r0'],terminalHistory:[],
  completedObjectives:['open-seven-bodies','decide-body-04','open-fil-rouge','scan-child-echo','read-child-register','authenticate-child-voice','verify-spectral-source','read-continuity-gate','contact-mother-echo','decide-continuity-gate'],
  audioEnabled:false,volume:.25,reducedEffects:true,selectedTransmission:'nx-s-gate-final',lastVisitedRoute:'/chapter-three',
  activeChapter:'chapter-three',completedChapters:['chapter-zero','chapter-two','chapter-three'],discoveredClues:['clue-mirror-placeholder'],
  evidenceNodes:['nuit-zero','a7','crimson','nx-s','porte-continuite','enfant-echo'],evidenceRelations:['mirror-placeholder'],
  spectralContactCount:3,lastNarrativeEvent:'chapter-three-complete',documentReadingProgress:{},solvedPuzzles:['memory-0417','voice-authentication'],
  narrativeChoices:{'body-04':'isolate','continuity-gate':'seal'},narrativeFlags:['gate-seal'],
};

test('termine Vérité originale et conserve le destin de MIRROR-00', async ({page}) => {
  await page.goto('/nexus-archives/#/');
  await page.evaluate((progress) => localStorage.setItem('nexus-archives:v1',JSON.stringify(progress)),chapterThreeCompleteV4);
  await page.reload();

  await page.goto('/nexus-archives/#/archives/verite-originale');
  await expect(page.getByRole('heading',{name:'VÉRITÉ ORIGINALE'})).toBeVisible();

  await page.goto('/nexus-archives/#/terminal');
  await page.getByLabel('COMMANDE').fill('trace mirror-00');
  await page.getByLabel('COMMANDE').press('Enter');
  await expect(page.getByText('REGISTRE MIRROR-LEDGER-17 RÉCUPÉRÉ')).toBeVisible();

  await page.goto('/nexus-archives/#/archives/registre-revisions-miroir');
  await expect(page.getByRole('heading',{name:'REGISTRE DES RÉVISIONS — MIRROR'})).toBeVisible();
  await page.goto('/nexus-archives/#/truth-reconstruction');
  for (const fragment of [/sorties de Zone Zéro/,/A7 servait d’ancre/,/R-9 a rétabli/,/thèse terroriste/]) await page.getByRole('button',{name:fragment}).click();
  await page.getByRole('button',{name:'ISOLER LES FAITS INVARIANTS'}).click();
  await expect(page.getByText('LE MENSONGE PRÉCÈDE LA CATASTROPHE.')).toBeVisible();

  await page.goto('/nexus-archives/#/terminal');
  await page.getByLabel('COMMANDE').fill('verify vale signature');
  await page.getByLabel('COMMANDE').press('Enter');
  await expect(page.getByText('SIGNATAIRE : ORIN_VALE')).toBeVisible();

  await page.goto('/nexus-archives/#/archives/directive-verite-supportable');
  await expect(page.getByRole('heading',{name:'DIRECTIVE — VÉRITÉ SUPPORTABLE'})).toBeVisible();
  await page.goto('/nexus-archives/#/terminal');
  await page.getByLabel('COMMANDE').fill('map mirror network');
  await page.getByLabel('COMMANDE').press('Enter');
  await expect(page.getByText('11 RELAIS ACTIFS')).toBeVisible();

  await page.goto('/nexus-archives/#/chapter-four');
  await page.getByRole('radio',{name:/FRAGMENTER LA VÉRITÉ/}).click();
  await page.getByRole('button',{name:/CONFIRMER FRAGMENTER LA VÉRITÉ/}).click();
  await expect(page.getByRole('heading',{name:'DESTIN DE MIRROR-00 ARCHIVÉ'})).toBeVisible();
  await page.reload();
  await expect(page.locator('.truth-decision-result').getByText(/CHAPITRE 04 TERMINÉ/)).toBeVisible();

  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('nexus-archives:v1') ?? '{}') as {version?:number;completedChapters?:string[];narrativeChoices?:Record<string,string>});
  expect(saved.version).toBe(5);
  expect(saved.completedChapters).toContain('chapter-four');
  expect(saved.narrativeChoices?.['mirror-00']).toBe('fragment');

  await page.setViewportSize({width:390,height:844});
  for (const route of ['/truth-reconstruction','/chapter-four']) {
    await page.goto(`/nexus-archives/#${route}`);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  }
});
