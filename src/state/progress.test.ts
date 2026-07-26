import { defaultProgress, deriveAccessLevel, loadProgress, mergeUnique, migrateV1ToV2, saveProgress, STORAGE_KEY, validateProgress } from './progress';

describe('progression locale', () => {
  it('sauvegarde et recharge la progression', () => { saveProgress({ ...defaultProgress, introSeen: true }); expect(loadProgress().introSeen).toBe(true); });
  it('retombe sur les valeurs par défaut si les données sont invalides', () => { localStorage.setItem(STORAGE_KEY, '{"version":99}'); expect(loadProgress()).toEqual(defaultProgress); });
  it('rejette un import incomplet', () => { expect(validateProgress({ version: 1 })).toBeNull(); });
  it('fusionne les déblocages sans doublon', () => { expect(mergeUnique(['a'], ['a','b'])).toEqual(['a','b']); });
  it('accorde TACTIQUE uniquement après le chapitre', () => { expect(deriveAccessLevel(defaultProgress)).toBe('CIVIL'); expect(deriveAccessLevel({ ...defaultProgress, completedChapters:['chapter-zero'] })).toBe('TACTIQUE'); });
  it('migre la V1 sans perdre les données', () => { const migrated=migrateV1ToV2({ version:1,introSeen:true,accessLevel:'TACTIQUE',viewedDocuments:['sept-corps'],unlockedSecrets:['legacy'],terminalHistory:['help'],completedObjectives:['old'],audioEnabled:true,reducedEffects:false,selectedTransmission:null,lastVisitedRoute:'/archives' }); expect(migrated).toEqual(expect.objectContaining({version:2,introSeen:true,viewedDocuments:['dossier-sept-corps'],unlockedSecrets:['legacy'],terminalHistory:['help']})); });
});
