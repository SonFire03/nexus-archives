import { expect, test, type Page, type TestInfo } from '@playwright/test';

const stableProgress = {
  version:2,introSeen:true,accessLevel:'CIVIL',viewedDocuments:[],unlockedSecrets:[],terminalHistory:[],completedObjectives:[],audioEnabled:false,volume:.25,reducedEffects:true,selectedTransmission:null,lastVisitedRoute:'/dashboard',activeChapter:'chapter-zero',completedChapters:[],discoveredClues:[],evidenceNodes:[],evidenceRelations:[],spectralContactCount:0,lastNarrativeEvent:null,documentReadingProgress:{},
};

async function prepare(page: Page, route: string) {
  await page.emulateMedia({ reducedMotion:'reduce' });
  await page.addInitScript((progress) => localStorage.setItem('nexus-archives:v1',JSON.stringify(progress)),stableProgress);
  await page.goto(`/nexus-archives/#${route}`);
  await page.waitForLoadState('networkidle');
  await page.locator('.command-status time strong').evaluate((element) => { element.textContent='21:17'; }).catch(() => undefined);
}

async function attachScreenshot(page: Page, testInfo: TestInfo, name: string) {
  await page.locator('img').evaluateAll(async (images) => Promise.all(images.map(async (image) => { if (image instanceof HTMLImageElement) { image.loading='eager'; await image.decode().catch(() => undefined); } })));
  const body = await page.screenshot({ animations:'disabled',path:`/tmp/nexus-v3-final-${name}.png` });
  await testInfo.attach(name,{body,contentType:'image/png'});
}

test.describe('captures UI Omega V3', () => {
  for (const [width,height] of [[390,844],[768,1024],[1024,768],[1280,720],[1440,900],[1920,1080],[2560,1440],[3440,1440],[5120,1440]] as const) {
    test(`dashboard ${width} × ${height}`, async ({ page },testInfo) => {
      await page.setViewportSize({width,height});
      const errors:string[]=[];
      page.on('pageerror',(error) => errors.push(error.message));
      await prepare(page,'/dashboard');
      await expect(page.getByRole('heading',{name:/SITUATION CRITIQUE/})).toBeVisible();
      const layout = await page.evaluate(() => ({content:document.documentElement.scrollWidth,viewport:window.innerWidth}));
      expect(layout.content).toBeLessThanOrEqual(layout.viewport);
      expect(errors).toEqual([]);
      await attachScreenshot(page,testInfo,`dashboard-${width}x${height}`);
    });
  }

  test('shell, objectif et pages principales', async ({ page },testInfo) => {
    await page.setViewportSize({width:1440,height:900});
    await prepare(page,'/dashboard');
    await attachScreenshot(page,testInfo,'sidebar-ouverte');
    await testInfo.attach('objectif-prioritaire',{body:await page.locator('.primary-objective').screenshot({animations:'disabled'}),contentType:'image/png'});
    await page.getByRole('button',{name:'Réduire la navigation'}).click();
    await expect(page.getByRole('button',{name:'Déployer la navigation'})).toHaveAttribute('aria-pressed','true');
    await attachScreenshot(page,testInfo,'sidebar-reduite');
    for (const [route,name,heading] of [['/archives','archives','ARCHIVES CLASSIFIÉES'],['/operators/a7','dossier-a7','A7'],['/armors','armures','CHÂSSIS ET ARMURES'],['/factions','factions','FACTIONS ACTIVES'],['/vanta?zone=zero','vanta-zone-zero','VANTA'],['/terminal','terminal','TERMINAL OMEGA'],['/investigation','enquete','TABLEAU D’ENQUÊTE']] as const) {
      await page.goto(`/nexus-archives/#${route}`);
      await expect(page.getByRole('heading',{name:new RegExp(heading)}).first()).toBeVisible();
      await attachScreenshot(page,testInfo,name);
    }
  });

  test('navigation mobile accessible', async ({ page }) => {
    await page.setViewportSize({width:390,height:844});
    await prepare(page,'/dashboard');
    const menu=page.locator('.mobile-menu-button');
    await menu.click();
    await expect(menu).toHaveAttribute('aria-expanded','true');
    await expect(page.getByRole('navigation',{name:'Navigation principale'})).toBeVisible();
    await page.getByRole('button',{name:'Fermer la navigation'}).click({position:{x:380,y:120}});
    await expect(menu).toBeFocused();
  });

  test('les routes principales chargent sans erreur ni ressource manquante', async ({ page }) => {
    await page.setViewportSize({width:1280,height:720});
    const failures:string[]=[];
    page.on('response',(response) => {
      if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`);
    });
    page.on('pageerror',(error) => failures.push(error.message));
    for (const route of ['/dashboard','/vanta','/operators','/operators/a7','/operators/crimson','/armors','/armors/ombre','/factions','/factions/directoire','/timeline','/terminal','/archives','/archives/rapport-nuit-zero','/investigation','/settings','/segment-inexistant']) {
      await prepare(page,route);
      await expect(page.locator('.fatal-error')).toHaveCount(0);
    }
    expect(failures).toEqual([]);
  });

  test('les médias WebP publiés se chargent et possèdent des dimensions', async ({ page }) => {
    await page.setViewportSize({width:1440,height:900});
    for (const route of ['/operators/a7','/armors','/factions','/vanta?zone=zero','/archives','/archives/rapport-nuit-zero']) {
      await prepare(page,route);
      const images = page.locator('.asset-image img');
      await expect(images.first()).toBeVisible();
      await page.locator('body').evaluate((body) => window.scrollTo(0,body.scrollHeight));
      await page.waitForTimeout(150);
      expect(await images.evaluateAll((elements) => elements.every((element) => element instanceof HTMLImageElement && element.complete && element.naturalWidth > 0 && element.currentSrc.endsWith('.webp')))).toBe(true);
    }
  });

  test('les pages illustrées restent lisibles sans débordement sur mobile', async ({ page },testInfo) => {
    await page.setViewportSize({width:390,height:844});
    for (const route of ['/operators/a7','/armors','/factions','/vanta?zone=zero','/archives']) {
      await prepare(page,route);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
      await expect(page.locator('.asset-image img').first()).toBeVisible();
    }
    await prepare(page,'/operators/a7');
    await attachScreenshot(page,testInfo,'dossier-a7-mobile');
    await prepare(page,'/armors');
    await attachScreenshot(page,testInfo,'armures-mobile');
  });
});
