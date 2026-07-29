import { defaultProgress, deriveAccessLevel, loadProgress, mergeUnique, migrateV1ToV2, migrateV2ToV3, migrateV3ToV4, migrateV4ToV5, migrateV5ToV6, saveProgress, STORAGE_KEY, validateProgress } from './progress';

describe('progression locale', () => {
  it('sauvegarde et recharge la progression', () => { saveProgress({ ...defaultProgress, introSeen: true }); expect(loadProgress().introSeen).toBe(true); });
  it('retombe sur les valeurs par défaut si les données sont invalides', () => { localStorage.setItem(STORAGE_KEY, '{"version":99}'); expect(loadProgress()).toEqual(defaultProgress); });
  it('rejette un import incomplet', () => { expect(validateProgress({ version: 1 })).toBeNull(); });
  it('fusionne les déblocages sans doublon', () => { expect(mergeUnique(['a'], ['a','b'])).toEqual(['a','b']); });
  it('accorde TACTIQUE uniquement après le chapitre', () => { expect(deriveAccessLevel(defaultProgress)).toBe('CIVIL'); expect(deriveAccessLevel({ ...defaultProgress, completedChapters:['chapter-zero'] })).toBe('TACTIQUE'); });
  it('migre la V1 sans perdre les données', () => { const migrated=migrateV1ToV2({ version:1,introSeen:true,accessLevel:'TACTIQUE',viewedDocuments:['sept-corps'],unlockedSecrets:['legacy'],terminalHistory:['help'],completedObjectives:['old'],audioEnabled:true,reducedEffects:false,selectedTransmission:null,lastVisitedRoute:'/archives' }); expect(migrated).toEqual(expect.objectContaining({version:2,introSeen:true,viewedDocuments:['dossier-sept-corps'],unlockedSecrets:['legacy'],terminalHistory:['help']})); });
  it('migre la V2 vers la V3 et active le Chapitre 02 sans perte', () => { const v2=migrateV1ToV2({version:1,introSeen:true,accessLevel:'TACTIQUE',viewedDocuments:['sept-corps'],unlockedSecrets:['legacy'],terminalHistory:['help'],completedObjectives:['old'],audioEnabled:true,reducedEffects:false,selectedTransmission:null,lastVisitedRoute:'/archives'}); v2.completedChapters=['chapter-zero']; const migrated=migrateV2ToV3(v2); expect(migrated).toEqual(expect.objectContaining({version:3,activeChapter:'chapter-two',viewedDocuments:['dossier-sept-corps'],solvedPuzzles:[],narrativeChoices:{}})); });
  it('accorde OMEGA après le Chapitre 02', () => { expect(deriveAccessLevel({...defaultProgress,completedChapters:['chapter-zero','chapter-two']})).toBe('OMEGA'); });
  it('migre la V3 vers la V4 et prépare le Chapitre 03', () => {
    const v2=migrateV1ToV2({version:1,introSeen:true,accessLevel:'OMEGA',viewedDocuments:['dossier-sept-corps'],unlockedSecrets:['chapter-two-decision'],terminalHistory:['scan signature a7-03'],completedObjectives:['decide-body-04'],audioEnabled:false,reducedEffects:true,selectedTransmission:null,lastVisitedRoute:'/chapter-two'});
    v2.completedChapters=['chapter-zero','chapter-two'];
    const v3=migrateV2ToV3(v2);
    v3.narrativeChoices={'body-04':'isolate'};
    expect(migrateV3ToV4(v3)).toEqual(expect.objectContaining({version:4,activeChapter:'chapter-three',narrativeFlags:[],narrativeChoices:{'body-04':'isolate'}}));
  });
  it('accorde NOIR ABSOLU après le Chapitre 03', () => { expect(deriveAccessLevel({...defaultProgress,completedChapters:['chapter-zero','chapter-two','chapter-three']})).toBe('NOIR ABSOLU'); });
  it('migre la V4 vers la V5 et active le Chapitre 04', () => {
    const v2=migrateV1ToV2({version:1,introSeen:true,accessLevel:'NOIR ABSOLU',viewedDocuments:['porte-continuite'],unlockedSecrets:['chapter-three-decision'],terminalHistory:['verify nx-s'],completedObjectives:['decide-continuity-gate'],audioEnabled:false,reducedEffects:true,selectedTransmission:'nx-s-gate-final',lastVisitedRoute:'/chapter-three'});
    v2.completedChapters=['chapter-zero','chapter-two'];
    const v4=migrateV3ToV4(migrateV2ToV3(v2));
    v4.completedChapters.push('chapter-three');
    v4.narrativeChoices['continuity-gate']='isolate';
    expect(migrateV4ToV5(v4)).toEqual(expect.objectContaining({version:5,activeChapter:'chapter-four',narrativeChoices:{'continuity-gate':'isolate'}}));
  });
  it('migre la V5 vers la V6 et active le Chapitre 05', () => {
    const v2=migrateV1ToV2({version:1,introSeen:true,accessLevel:'NOIR ABSOLU',viewedDocuments:['verite-originale'],unlockedSecrets:['chapter-four-decision'],terminalHistory:['map mirror network'],completedObjectives:['decide-original-truth'],audioEnabled:false,reducedEffects:true,selectedTransmission:'orin-vale-final',lastVisitedRoute:'/chapter-four'});
    v2.completedChapters=['chapter-zero','chapter-two'];
    const v5=migrateV4ToV5(migrateV3ToV4(migrateV2ToV3(v2)));
    v5.completedChapters.push('chapter-three','chapter-four');
    v5.narrativeChoices['mirror-00']='fragment';
    expect(migrateV5ToV6(v5)).toEqual(expect.objectContaining({version:6,activeChapter:'chapter-five',narrativeChoices:{'mirror-00':'fragment'}}));
  });
});
