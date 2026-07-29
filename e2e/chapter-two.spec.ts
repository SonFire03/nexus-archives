import { expect, test } from '@playwright/test';

const chapterOneComplete = {
  version:3,introSeen:true,accessLevel:'TACTIQUE',viewedDocuments:['rapport-nuit-zero','restauration-2224'],
  unlockedSecrets:['message-future-crimson','nx-s-contact-01','document-dossier-sept-corps'],terminalHistory:[],
  completedObjectives:['view-official-zero-report','identify-z-2219','decrypt-z-2219','read-restoration-log','compare-zero-versions','detect-seven-signatures','link-main-evidence','identify-nx-s-intervention'],
  audioEnabled:false,volume:.25,reducedEffects:true,selectedTransmission:'nx-s-contact-01',lastVisitedRoute:'/investigation',
  activeChapter:'chapter-two',completedChapters:['chapter-zero'],discoveredClues:['clue-z-2219'],
  evidenceNodes:['nuit-zero','a7','crimson','sept-corps'],evidenceRelations:['sept-corps-identite-a7'],
  spectralContactCount:1,lastNarrativeEvent:'chapter-zero-complete',documentReadingProgress:{},solvedPuzzles:[],narrativeChoices:{},
};

test('termine Les Sept Corps et conserve la décision OMEGA', async ({page}) => {
  await page.goto('/nexus-archives/#/');
  await page.evaluate((progress) => localStorage.setItem('nexus-archives:v1',JSON.stringify(progress)),chapterOneComplete);
  await page.reload();
  await page.goto('/nexus-archives/#/archives/dossier-sept-corps');
  await expect(page.getByRole('heading',{name:'DOSSIER DES SEPT CORPS'})).toBeVisible();

  await page.goto('/nexus-archives/#/terminal');
  await page.getByLabel('COMMANDE').fill('scan signature A7-03');
  await page.getByLabel('COMMANDE').press('Enter');
  await expect(page.getByText('REGISTRE HLX-K13-04 RÉCUPÉRÉ')).toBeVisible();

  await page.goto('/nexus-archives/#/archives/registre-helix-k13');
  await expect(page.getByRole('heading',{name:'REGISTRE HELIX — ANNEXE K-13'})).toBeVisible();
  await page.goto('/nexus-archives/#/memory');
  for (const source of ['A7-03','INCONNUE','R-9','HELIX']) await page.getByRole('button',{name:new RegExp(source)}).click();
  await page.getByRole('button',{name:'STABILISER LA MÉMOIRE'}).click();
  await expect(page.getByText('SÉQUENCE RESTAURÉE')).toBeVisible();

  await page.goto('/nexus-archives/#/terminal');
  await page.getByLabel('COMMANDE').fill('verify memory crimson');
  await page.getByLabel('COMMANDE').press('Enter');
  await expect(page.getByText('SIGNATURE R-9 : CONFIRMÉE')).toBeVisible();

  await page.goto('/nexus-archives/#/archives/memoire-source-a7-04');
  await page.getByRole('button',{name:'ENREGISTRER COMME PREUVE'}).click();
  await expect(page.getByRole('button',{name:'PREUVE ENREGISTRÉE'})).toBeDisabled();

  await page.goto('/nexus-archives/#/terminal');
  await page.getByLabel('COMMANDE').fill('trace body-04');
  await page.getByLabel('COMMANDE').press('Enter');
  await expect(page.getByText('CORPS 04 : VIABLE')).toBeVisible();

  await page.goto('/nexus-archives/#/chapter-two');
  await page.getByRole('radio',{name:/ISOLER LE CORPS/}).click();
  await page.getByRole('button',{name:/CONFIRMER ISOLER LE CORPS/}).click();
  await expect(page.getByRole('heading',{name:'DÉCISION ARCHIVÉE'})).toBeVisible();
  await expect(page.locator('.decision-result').getByText(/ACCÈS OMEGA/)).toBeVisible();
  await page.reload();
  await expect(page.locator('.decision-result').getByText(/ACCÈS OMEGA/)).toBeVisible();
  const storedChoice = await page.evaluate(() => {
    const raw=localStorage.getItem('nexus-archives:v1');
    if (!raw) return null;
    const parsed: unknown=JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || !('narrativeChoices' in parsed)) return null;
    const choices=(parsed as {narrativeChoices?:unknown}).narrativeChoices;
    return choices && typeof choices === 'object' && 'body-04' in choices ? (choices as {'body-04'?:unknown})['body-04'] : null;
  });
  expect(storedChoice).toBe('isolate');
  await page.setViewportSize({width:390,height:844});
  for (const route of ['/memory','/chapter-two']) {
    await page.goto(`/nexus-archives/#${route}`);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  }
});
