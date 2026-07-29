import { expect, test } from '@playwright/test';

const chapterSixCompleteV7 = {
  version:7,introSeen:true,accessLevel:'NOIR ABSOLU',viewedDocuments:['residu-cendre-63218','chaine-commandement-cendre','liste-63218-dechiffree'],
  unlockedSecrets:['chapter-six-decision','names-63218-restored'],terminalHistory:[],
  completedObjectives:['open-ash-residual','decrypt-cendre-63218','read-ash-command-chain','reconstruct-ash-sequence','verify-draven-authority','read-victims-ledger','sever-ash-command','decide-victims-ledger'],
  audioEnabled:false,volume:.25,reducedEffects:true,selectedTransmission:'sera-nox-names',lastVisitedRoute:'/chapter-six',
  activeChapter:'chapter-six',completedChapters:['chapter-zero','chapter-two','chapter-three','chapter-four','chapter-five','chapter-six'],discoveredClues:['clue-cendre-63218','clue-ash-sequence','clue-sever-ash'],
  evidenceNodes:['nuit-zero','a7','crimson','nx-s','registre-63218','cendre-63218','chaine-cendre','autorite-draven'],evidenceRelations:['cendre-indexe-registre','draven-declenche-cendre'],
  spectralContactCount:3,lastNarrativeEvent:'chapter-six-complete',documentReadingProgress:{},solvedPuzzles:['ash-command-sequence'],
  narrativeChoices:{'body-04':'isolate','continuity-gate':'seal','mirror-00':'fragment','omega7-extraction':'ghosts','victims-ledger':'analog'},narrativeFlags:['victims-analog'],
};

test('termine ASCENDANT et conserve le destin du corps collectif', async ({page}) => {
  await page.goto('/nexus-archives/#/');
  await page.evaluate((progress)=>localStorage.setItem('nexus-archives:v1',JSON.stringify(progress)),chapterSixCompleteV7);
  await page.reload();

  await page.goto('/nexus-archives/#/archives/alerte-ascendant-omega');
  await expect(page.getByRole('heading',{name:'ALERTE D’ACTIVATION — NX6-OMEGA ASCENDANT'})).toBeVisible();
  await page.goto('/nexus-archives/#/terminal');
  await page.getByLabel('COMMANDE').fill('trace ascendant');
  await page.getByLabel('COMMANDE').press('Enter');
  await expect(page.getByText('ARCHITECTURE NX6-IDMATRIX-07 RÉCUPÉRÉE')).toBeVisible();

  await page.goto('/nexus-archives/#/archives/architecture-ascendant');
  await expect(page.getByRole('heading',{name:'ARCHITECTURE IDENTITAIRE — ASCENDANT'})).toBeVisible();
  await page.goto('/nexus-archives/#/ascendant-matrix');
  await expect(page.getByText('COPIE INTERCEPTÉE K-13 // REGISTRE ANALOGIQUE')).toBeVisible();
  for (const name of [/CONSENTEMENT INDIVIDUEL/,/PARTITIONS ISOLÉES/,/ARRÊT LOCAL INDÉPENDANT/,/CAPACITÉ LIMITÉE À SEPT/]) await page.getByRole('checkbox',{name}).click();
  await page.getByRole('button',{name:'STABILISER LES QUATRE GARANTIES'}).click();
  await expect(page.getByText('SEPT PARTITIONS. SEPT CONSENTEMENTS. SEPT SORTIES.')).toBeVisible();

  await page.goto('/nexus-archives/#/terminal');
  await page.getByLabel('COMMANDE').fill('ask r-0');
  await page.getByLabel('COMMANDE').press('Enter');
  await expect(page.getByText('CONSENTEMENT : CONDITIONNEL')).toBeVisible();
  await page.goto('/nexus-archives/#/archives/diagnostic-hote-ascendant');
  await expect(page.getByRole('heading',{name:'DIAGNOSTIC D’HÔTE — ASCENDANT'})).toBeVisible();

  await page.goto('/nexus-archives/#/terminal');
  await page.getByLabel('COMMANDE').fill('sever sovereign');
  await page.getByLabel('COMMANDE').press('Enter');
  await expect(page.getByText('ASCENDANT : LIBRE DE TOUTE AUTORITÉ DISTANTE')).toBeVisible();
  await page.goto('/nexus-archives/#/chapter-seven');
  await page.getByRole('radio',{name:/DÉMANTELER ASCENDANT/}).click();
  await page.getByRole('button',{name:/CONFIRMER DÉMANTELER ASCENDANT/}).click();
  await expect(page.getByRole('heading',{name:'DESTIN ASCENDANT ARCHIVÉ'})).toBeVisible();
  await page.reload();
  await expect(page.locator('.ascendant-final').getByText(/CHAPITRE 07 TERMINÉ/)).toBeVisible();

  await page.goto('/nexus-archives/#/investigation');
  await expect(page.getByRole('heading',{name:'TABLEAU D’ENQUÊTE'})).toBeVisible();
  await expect(page.getByRole('button',{name:/Corps NX6-OMEGA ASCENDANT, armure/})).toBeVisible();

  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('nexus-archives:v1')??'{}') as {version?:number;completedChapters?:string[];narrativeChoices?:Record<string,string>});
  expect(saved.version).toBe(8);
  expect(saved.completedChapters).toContain('chapter-seven');
  expect(saved.narrativeChoices?.['ascendant-host']).toBe('dismantle');

  await page.setViewportSize({width:390,height:844});
  for (const route of ['/ascendant-matrix','/chapter-seven']) {
    await page.goto(`/nexus-archives/#${route}`);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  }
});
