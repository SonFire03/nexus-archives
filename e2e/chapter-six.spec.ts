import { expect, test } from '@playwright/test';

const chapterFiveCompleteV6 = {
  version:6,introSeen:true,accessLevel:'NOIR ABSOLU',viewedDocuments:['ordre-capture-omega-7','journal-triangulation-harbringer','plan-extraction-omega-7'],
  unlockedSecrets:['chapter-five-decision','omega7-extracted'],terminalHistory:[],
  completedObjectives:['open-omega-capture-order','decrypt-hunt-314','read-triangulation-log','break-triangulation','authenticate-crimson-channel','read-extraction-plan','sever-harbinger-network','choose-extraction'],
  audioEnabled:false,volume:.25,reducedEffects:true,selectedTransmission:'crimson-extraction',lastVisitedRoute:'/chapter-five',
  activeChapter:'chapter-five',completedChapters:['chapter-zero','chapter-two','chapter-three','chapter-four','chapter-five'],discoveredClues:['clue-hunt-314','clue-counter-trace','clue-sever-harbinger'],
  evidenceNodes:['nuit-zero','a7','crimson','nx-s','protocole-cendre','zone-zero','omega-7-signature','hunt-314','harbinger-network'],evidenceRelations:['cendre-detruit-zero','hunt314-cible-omega7'],
  spectralContactCount:3,lastNarrativeEvent:'chapter-five-complete',documentReadingProgress:{},solvedPuzzles:['harbinger-counter-trace'],
  narrativeChoices:{'body-04':'isolate','continuity-gate':'seal','mirror-00':'fragment','omega7-extraction':'ghosts'},narrativeFlags:['extraction-ghosts'],
};

test('termine Les Noms de Cendre et conserve la destination du registre', async ({page}) => {
  await page.goto('/nexus-archives/#/');
  await page.evaluate((progress)=>localStorage.setItem('nexus-archives:v1',JSON.stringify(progress)),chapterFiveCompleteV6);
  await page.reload();

  await page.goto('/nexus-archives/#/archives/residu-cendre-63218');
  await expect(page.getByRole('heading',{name:'RÉSIDU OPÉRATIONNEL — CENDRE-63218'})).toBeVisible();
  await page.goto('/nexus-archives/#/terminal');
  await page.getByLabel('COMMANDE').fill('decrypt cendre-63218');
  await page.getByLabel('COMMANDE').press('Enter');
  await expect(page.getByText('CHAÎNE ASH-CHAIN-2244 RÉCUPÉRÉE')).toBeVisible();

  await page.goto('/nexus-archives/#/archives/chaine-commandement-cendre');
  await expect(page.getByRole('heading',{name:'CHAÎNE DE COMMANDEMENT — PROTOCOLE CENDRE'})).toBeVisible();
  await page.goto('/nexus-archives/#/ash-protocol');
  await expect(page.getByText('ÉCLAT ANALOGIQUE K-13 // TRACE MATÉRIELLE')).toBeVisible();
  await page.getByRole('button',{name:/ACTIVATION CONTINUITÉ/}).click();
  await page.getByRole('button',{name:/SCELLEMENT DES SORTIES/}).click();
  await page.getByRole('button',{name:/SYNCHRONISATION COLLECTIVE/}).click();
  await page.getByRole('button',{name:/PROTOCOLE CENDRE/}).click();
  await page.getByRole('button',{name:'STABILISER LA SÉQUENCE'}).click();
  await expect(page.getByText('LES SORTIES ONT ÉTÉ SCELLÉES AVANT LA SYNCHRONISATION.')).toBeVisible();

  await page.goto('/nexus-archives/#/terminal');
  await page.getByLabel('COMMANDE').fill('verify draven');
  await page.getByLabel('COMMANDE').press('Enter');
  await expect(page.getByText('AUTORITÉ HUMAINE : CONFIRMÉE')).toBeVisible();
  await page.goto('/nexus-archives/#/archives/liste-63218-dechiffree');
  await expect(page.getByRole('heading',{name:'REGISTRE RESTAURÉ — 63 218 IDENTITÉS'})).toBeVisible();

  await page.goto('/nexus-archives/#/terminal');
  await page.getByLabel('COMMANDE').fill('sever ash command');
  await page.getByLabel('COMMANDE').press('Enter');
  await expect(page.getByText('DERNIER ORDRE : RÉVOQUÉ')).toBeVisible();
  await page.goto('/nexus-archives/#/chapter-six');
  await page.getByRole('radio',{name:/CONFIER LE REGISTRE À SERA NOX/}).click();
  await page.getByRole('button',{name:/CONFIRMER CONFIER LE REGISTRE À SERA NOX/}).click();
  await expect(page.getByRole('heading',{name:'LES NOMS ONT QUITTÉ LE REGISTRE'})).toBeVisible();
  await page.reload();
  await expect(page.locator('.victims-result').getByText(/CHAPITRE 06 TERMINÉ/)).toBeVisible();

  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('nexus-archives:v1')??'{}') as {version?:number;completedChapters?:string[];narrativeChoices?:Record<string,string>});
  expect(saved.version).toBe(8);
  expect(saved.completedChapters).toContain('chapter-six');
  expect(saved.narrativeChoices?.['victims-ledger']).toBe('analog');

  await page.setViewportSize({width:390,height:844});
  for (const route of ['/ash-protocol','/chapter-six']) {
    await page.goto(`/nexus-archives/#${route}`);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  }
});
